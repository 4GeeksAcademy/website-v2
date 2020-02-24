import React, {createContext, useState, useEffect} from "react";
import publicIp from 'public-ip';
import {useStaticQuery, graphql} from 'gatsby';


const defaultSession = {
    v6: null,
    v4: null,
    latitude: null,
    longitude: null,
    default_course_type: "Part-Time",
    email: null,
    location: null,
    language: null,
    gclid: null,
    utm_campaign: null,
    utm_source: null,
    utm_medium: null,
    referral_code: null
};
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
function closestLoc (locations, lat, lon) {
    let lowerDistance = 10000000;
    let tempLocation = 0;
    let city = ""
    for (var i = 0; i < locations.length; i++) {
        tempLocation = distance(locations[i].node.latitude, locations[i].node.longitude, lat, lon)
        if (tempLocation <= lowerDistance) {lowerDistance = tempLocation, city = locations[i].node.city}
    }
    return city;
}
export const SessionContext = createContext(null);
export const withSession = Component => {
    const SessionComponent = (props) => {
        const data = useStaticQuery(graphql`
      query myQuerySession{
          loc: allLocationsYaml{
            edges{
              node{
                city
                name
                latitude
                longitude
                country
                meta_info{
                    slug
                }
              }
            }
          }
          
        }
      `);
        const locationsArray = data.loc.edges;
        const [session, setSession] = useState(defaultSession);
        //get ip address
        useEffect(() => {
            const loadIp = async () => {
                const v4 = await publicIp.v4();
                const v6 = "v6";
                const response = await fetch(`https://api.ipstack.com/${v4}?access_key=73822e5a584c041268f0e78a3253cf0d`);
                const data = response.status === 200 ? await response.json() : null;
                const location = data ? closestLoc(locationsArray, data.latitude, data.longitude) : null;
                // const location = "Madrid"
                // const language = browserLang ? browserLang : location.defaultLanguage;
                setSession({...session, v4, v6, location})
            };
            loadIp();
        }, []);

        return <SessionContext.Provider value={{session, setSession}}>
            <Component {...props} />
        </SessionContext.Provider>
    }
    return SessionComponent;
};

