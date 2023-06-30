import { defaultSession, locByLanguage } from "./actions";
import countriesList from "./components/LeadForm/PhoneInput/countriesList";
const dictionaryOf = require("./utils/dictionaries/pages.json");

const GOOGLE_KEY = "AIzaSyB6NEbEyhDU_U1z_XoyRwEu0Rc1XXeZK6c";

const getFirstBrowserLanguage = (navigator) => {
  var nav = JSON.parse(navigator),
    browserLanguagePropertyKeys = [
      "language",
      "browserLanguage",
      "systemLanguage",
      "userLanguage",
    ],
    i,
    language,
    len,
    shortLanguage = null;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      len = language.length;
      if (!shortLanguage && len) {
        shortLanguage = language;
      }
      if (language && len > 2) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    //skip this loop iteration if property is null/undefined.  IE11 fix.
    if (language == null) {
      continue;
    }
    len = language.length;
    if (!shortLanguage && len) {
      shortLanguage = language;
    }
    if (language && len > 2) {
      return language;
    }
  }

  return shortLanguage;
};

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

const getClosestLoc = (locations, lat, lon) => {
  let lowerDistance = 10000000;
  let tempLocation = 0;
  let location = null;
  for (var i = 0; i < locations.length; i++) {
    // ignore unlisted locations on the ymls
    if (locations[i].meta_info.visibility === "unlisted") continue;

    tempLocation = distance(
      locations[i].latitude,
      locations[i].longitude,
      lat,
      lon
    );
    if (tempLocation <= lowerDistance) {
      lowerDistance = tempLocation;
      location = locations[i];
    }
  }

  return location;
};

const getRegion = (shortName, regions) => {
  const country = countriesList.filter((c) =>
    c.includes(shortName.toLowerCase())
  );
  const latamValues = ["central-america", "south-america", "carribean"];

  if (country[0][1].some((i) => latamValues.includes(i))) return "latam";
  else if (country[0][1].includes("america")) return "usa-canada";

  const region = regions.filter((reg) => country[0][1].includes(reg));
  return region.length === 1 ? region[0] : null;
};

export const initSession = async (locationsArray, storedSession, seed = {}) => {
  console.log('function initSession started');
  var v4 = null;
  var latitude = null;
  var longitude = null;
  var langDestination = null;
  let geoCode = null;
  var pathsDictionary = {
    ...dictionaryOf.yml[0],
    ...dictionaryOf.md[0],
  };
  // session.pathDictionary[`${window.location?.pathname}`]
  // langDestination = pathsDictionary
  // const params = new URLSearchParams(window.location.pathname);

  let { location, language, navigator, ...utm } = seed;
  const browserLang = getFirstBrowserLanguage(navigator);
  if (!language) {
    if (storedSession) language = storedSession.language;
    else language = browserLang.substring(0, 2);
  }
  if (language != "es") language = "us";

  //cleanup the locations array and add all the data I need for locations
  let languageToFilter = language || "us";
  const locations = locByLanguage(locationsArray, languageToFilter);

  // remove undefineds from the seed utm's to avoid overriding the originals with undefined
  Object.keys(utm).forEach((key) => utm[key] === undefined && delete utm[key]);

  if (location) {
    location = locations.find((l) => l.breathecode_location_slug === location);
    if (!location) location = null;
    console.log("Hardcoded location", location);
  } else if (storedSession && storedSession.location != null) {
    location = locations.find(
      (l) =>
        l.breathecode_location_slug ===
        storedSession.location.breathecode_location_slug
    );
    latitude = location.latitude;
    longitude = location.longitude;
  }

  if (location === null) {
    console.log("Calculating nearest location because it was null...");
    try {
      const response = await fetch(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_KEY}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      let data = (await response.json()) || null;
      if (data && data.location) {
        const lang = {
          us: "en",
          es: "es",
        };

        const responseGC = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.location.lat},${data.location.lng}&key=${GOOGLE_KEY}&language=${lang[languageToFilter]}`,
          {
            method: "POST",
          }
        );

        let filteredLocations = [];
        let dataGC = (await responseGC.json()) || null;

        if (dataGC.results) {
          geoCode = {};
          // get country and city from geocoding
          dataGC.results[0].address_components.map((comp) => {
            if (comp.types.includes("locality")) geoCode.city = comp.long_name;
            if (comp.types.includes("country")) {
              geoCode.country = comp.long_name;
              geoCode.countryShort = comp.short_name;
            }
          });

          // Check if we have locations in user's country
          const locsInCountry = locations.filter(
            (location) =>
              location.country_shortname === geoCode.countryShort.toLowerCase()
          );

          if (locsInCountry.length !== 0) {
            const campus = locsInCountry.find(
              (location) => location.city === geoCode.city
            );

            if (campus) location = campus;
            else filteredLocations = locsInCountry;
          } else {
            // If there are no locations in the user's country, we get the locations from its region
            const regions = [
              ...new Set(locations.map((item) => item.meta_info.region)),
            ];
            const region = getRegion(geoCode.countryShort, regions);
            if (region)
              filteredLocations = locations.filter(
                (location) => location.meta_info.region === region
              );
          }
        }
        if (!location) {
          latitude = data.location.lat;
          longitude = data.location.lng;
          // Filtered locations are used to filter from the locations in the user's country or region
          location = getClosestLoc(
            filteredLocations.length !== 0 ? filteredLocations : locations,
            data.location.lat,
            data.location.lng
          );
        }
      } else throw Error("Error when connecting to Google Geolocation API");
    } catch (e) {
      console.log("Error retrieving IP information: ", e);
    }
  }

  // get the language
  if (location) {
    location.reliable = true;
  } else {
    location = locations.find(
      (l) => l.breathecode_location_slug == "downtown-miami"
    );
    console.log(
      "Location could not be loaded, using miami as default location",
      location
    );
    if (location) {
      location.reliable = false;
    }
  }

  if (!language) language = location.defaultLanguage;
  const _session = {
    ...defaultSession,
    ...storedSession,
    v4,
    location,
    country: geoCode && geoCode.country,
    city: geoCode && geoCode.city,
    browserLang,
    language,
    latitude,
    longitude,
    pathsDictionary,

    // marketing utm info
    utm: { ...storedSession.utm, ...utm },

    locations: locations
      .filter((l) => {
        // filter inlisted locations
        if (l.meta_info.visibility === "unlisted") return false;
        return true;
      })
      .sort((a, b) => (a.meta_info.position > b.meta_info.position ? 1 : -1)),
  };
  return _session;
};
