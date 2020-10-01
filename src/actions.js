import { save_form } from "./utils/leads";
import dayjs from "dayjs"
import 'dayjs/locale/es'

const GOOGLE_KEY = "AIzaSyB6NEbEyhDU_U1z_XoyRwEu0Rc1XXeZK6c"

const getFirstBrowserLanguage = () => {
    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
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
        if (language == null) {continue;}
        len = language.length;
        if (!shortLanguage && len) {
            shortLanguage = language;
        }
        if (language && len > 2) {
            return language;
        }
    }

    return shortLanguage;
}

export const defaultSession = {
    v6: null,
    v4: null,
    latitude: null,
    longitude: null,
    upcoming: [], //upcoming cohorts
    course_type: "Part-Time",
    email: null,
    location: null,
    language: "en",
    utm: {
        gclid: undefined,
        utm_campaign: undefined,
        utm_source: undefined,
        utm_medium: undefined,
        utm_content: undefined,
        referral_code: undefined
    }
};

 /*  removeStorage: removes a key from localStorage and its sibling expiracy key
    params:
        key <string>     : localStorage key to remove
    returns:
        <boolean> : telling if operation succeeded
 */
function removeStorage(name) {
    try {
        localStorage.removeItem(name);
        localStorage.removeItem(name + '_expiresIn');
    } catch(e) {
        console.log('removeStorage: Error removing key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
        return false;
    }
    return true;
}
/*  getStorage: retrieves a key from localStorage previously set with setStorage().
    params:
        key <string> : localStorage key
    returns:
        <string> : value of localStorage key
        null : in case of expired key or failure
 */
function getStorage(key) {

    var now = Date.now();  //epoch time, lets deal only with integer
    // set expiration for storage
    var expiresIn = localStorage.getItem(key+'_expiresIn');
    if (expiresIn===undefined || expiresIn===null) { expiresIn = 0; }

    if (expiresIn < now) {// Expired
        removeStorage(key);
        return {};
    } else {
        try {
            var value = JSON.parse(localStorage.getItem(key)) || {};
            return value;
        } catch(e) {
            console.log('getStorage: Error reading key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
            return null;
        }
    }
}
/*  setStorage: writes a key into localStorage setting a expire time
    params:
        key <string>     : localStorage key
        value <string>   : localStorage value
        expires <number> : number of seconds from now to expire the key
    returns:
        <boolean> : telling if operation succeeded
 */
function setStorage(key, value, expires=null) {

    if (!expires) {
        expires = (24*60*60);  // default: seconds for 1 day
    } else {
        expires = Math.abs(expires); //make sure it's positive
    }

    var now = Date.now();  //millisecs since epoch time, lets deal only with integer
    var schedule = now + expires*1000; 
    try {
        localStorage.setItem(key, JSON.stringify(value));
        localStorage.setItem(key + '_expiresIn', schedule);
    } catch(e) {
        console.log('setStorage: Error setting key ['+ key + '] in localStorage: ' + JSON.stringify(e) );
        return false;
    }
    return true;
}


function distance (lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {dist = dist * 1.609344}
        if (unit == "N") {dist = dist * 0.8684}
        return dist;
    }
}

const getClosestLoc = (locations, lat, lon) => {
    let lowerDistance = 10000000;
    let tempLocation = 0;
    let location = null;
    for (var i = 0; i < locations.length; i++) {
        tempLocation = distance(locations[i].latitude, locations[i].longitude, lat, lon)
        if (tempLocation <= lowerDistance) {
            lowerDistance = tempLocation;
            location = locations[i]
        }
    }
    console.log("The closest location is: ", location)
    return location;
}

export const setTagManaerVisitorInfo = (session) => {
    if (typeof dataLayer != 'undefined') {
        const info = { 
            location_city: session.location.city, 
            location_country: session.location.country, 
            location_slug: session.location.active_campaign_location_slug, 
            language: session.language,
            latitude: session.latitude,
            longitude: session.longitude,
        }
        dataLayer.push(info);
        // THIS BELOW DOEST NOT WORK RIGHT NOW, NEEDS MORE WORK
        // if(session.latitude && session.longitude){
        //     const resp = fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${session.latitude},${session.longitude}&sensor=false&key=${GOOGLE_KEY}`)
        //     const data = await resp.json()
        //     if(data && data.results) data.results.address_components.forEach(comp => {
        //         if(comp.types.includes("country")) dataLayer.push({  country_name: comp.short_name.toLowerCase() })
        //         if(comp.types.includes("locality")) dataLayer.push({  city: comp.short_name.toLowerCase() })
        //     })
        //     else console.log("Error adding aditional information to the dataLayer")
        // }
        console.log('Datalayer successfully set with ', session);
    }
    else console.log('TagManager:dataLayer not found');
}

export function tagManager (eventName) {
    if (typeof dataLayer != 'undefined') {
        dataLayer.push({'event': eventName});
        console.log('Event successfully triggered: ' + eventName);
    }
    else console.log('TagManager:dataLayer not found to trigger event ' + eventName);
}

export const apply = async (data, session) => {
    console.log("Apply action called with session: ", session);
    tagManager('student_application');
    let body = {};
    for (let key in data) body[key] = data[key].value;

    if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, ['website-lead'], ['strong'], session);
    return true;
}

export const requestSyllabus = async (data,session) => {
    console.log("Succesfully requested Syllabus", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;

    if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, ['request_more_info'], ['soft'], session);
    return true;
}
export const openGuidebook = (url) => {
    tagManager('financing_guide_download')
    window.open(url);
    return true;
}
export const beHiringPartner = async (data,session) => {
    console.log("Succesfully requested Be Hiring Partner", data);
    let body = {};
    for (let key in data) body[key] = data[key].value;

    if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, ['hiring-partner'], ['hiring-partner'], session);
    return true;
}
export const applyJob = async (data) => {
    console.log("New job application", data);
    let body = {};
    for (let key in data) body[key] = data[key].value;

    
    //if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, ['hiring-partner'], ['hiring-partner']);
    return true;
}
export const contactUs = async (data,session) => {
    console.log("Succesfully contact us", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;
    
    if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, ['contact-us'], ['soft'], session);
    return true;
}
export const newsletterSignup = async (data,session) => {
    console.log("Succesfully contact us", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;
    
    if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, ['newsletter'], ['newsletter'], session);
    return true;
}

export const initSession = async (locationsArray, seed={}) => {
    var v4 = null;
    var latitude = null;
    var longitude = null;
    let storedSession = getStorage("academy_session");
    let { location, language, ...utm } = seed;

    const browserLang = getFirstBrowserLanguage();
    if(!language){
        if(storedSession) language = storedSession.language;
        else language = browserLang.substring(0, 2);
    }
    if(language === "en") language = "us";
    
    //cleanup the locations array and add all the data I need for locations
    let repeated = [];
    let languageToFilter = language || "us";
    const locations = locationsArray.nodes.filter(l => {
        const [ name, _lang ] = l.fields.file_name.split(".");
        //filter repetead locations and only focuse on the desired language
        if(_lang !== languageToFilter || repeated.includes(name)) return false;
        repeated.push(name);
        return true;
    }).map(l => locationsArray.edges.find(loc => loc.node.meta_info.slug === l.fields.slug).node);

    // remove undefineds from the seed utm's
    Object.keys(utm).forEach(key => utm[key] === undefined && delete utm[key])

    if(location){
        location = locations.find(l => l.breathecode_location_slug === location)
        if(location) location = location.node;
        else location = null;
        console.log("Hardcoded location", location)
    } 
    else if(storedSession && storedSession.location != null){
        location = locations.find(l => l.breathecode_location_slug === storedSession.location.breathecode_location_slug);
        latitude = location.latitude;
        longitude = location.longitude;
        console.log("Location already found on session location", location)
    } 
    
    if(location === null){
        console.log("Calculating nearest location because it was null...")
        try{
            const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_KEY}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });
            let data = await response.json() || null;
            if(data && data.location){
                latitude = data.location.lat;
                longitude = data.location.lng;
                location = getClosestLoc(locations, data.location.lat, data.location.lng)
            }else throw Error("Error when connecting to Google Geolocation API")
        }catch(e){
            console.log("Error retrieving IP information: ", e)
        }
    }
    
    // get the language
    if (location){
        location.reliable = true;
    } 
    else {
        console.log("Location could not be loaded, using miami as default location");
        location = locations.find(l => l.breathecode_location_slug == "downtown-miami");
        if(location){
            location = location.node;
            location.reliable = false;
        } 
    }
    
    if(!language) language = location.defaultLanguage;
    console.log("New updated location and language", language, location)
    dayjs.locale(language == "us" ? "en" : language)

    const _session = {
        ...defaultSession,
        ...storedSession, v4, location, browserLang, language, latitude, longitude,
        
        // marketing utm info
        utm: { ...storedSession.utm, ...utm },

        locations: locations.filter(l => {
            // filter inlisted locations
            if(l.meta_info.unlisted) return false;
            return true;
        })
        .sort((a,b) => a.meta_info.position > b.meta_info.position ? 1 : -1)
    };
    console.log("Session: ", _session);
    setStorage("academy_session", _session);
    return _session

};