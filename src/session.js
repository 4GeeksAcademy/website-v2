import React, {createContext, useState, useEffect} from "react";
import publicIp from 'public-ip';
import {useStaticQuery, graphql} from 'gatsby';
import { identity } from "lodash-es";

function getFirstBrowserLanguage () {
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

const defaultSession = {
    v6: null,
    v4: null,
    latitude: null,
    longitude: null,
    upcoming: [], //upcoming cohorts
    course_type: "Part-Time",
    email: null,
    location: null,
    language: "en",
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
    let location = null;
    for (var i = 0; i < locations.length; i++) {
        tempLocation = distance(locations[i].node.latitude, locations[i].node.longitude, lat, lon)
        if (tempLocation <= lowerDistance) {
            lowerDistance = tempLocation;
            location = locations[i].node
        }
    }
    console.log("The closest location is: ", location)
    return location;
}
export const SessionContext = createContext(null);
export const withSession = Component => {
    const SessionComponent = (props) => {
        const data = useStaticQuery(graphql`
      query myQuerySession{
          loc: allLocationYaml{
            edges{
              node{
                city
                name
                latitude
                longitude
                country
                defaultLanguage
                meta_info{
                    slug
                    unlisted
                    position
                }
              }
            }
            nodes{
                fields {
                    file_name
                    slug
                }
            }
          }
        }
        `);
        const locationsArray = data.loc;
        const [session, setSession] = useState(defaultSession);
        //get ip address
        useEffect(() => {
            const loadIp = async (location=null) => {
                let v4 = null;
                let storedSession = JSON.parse(localStorage.getItem("academy_session"));

                if(location!==null){
                    location = locationsArray.edges.find(({ node }) => node.meta_info.slug === location).node;
                    console.log("Hardcoded location", location)
                } 
                else if(storedSession && storedSession.location != null){
                    location = storedSession.location;
                    console.log("Location already found on session location", location)
                } 
                else if(location === null){
                    console.log("Calculating your location...")

                    const v4 = await publicIp.v4();
                    const response = await fetch(`https://api.ipstack.com/${v4}?access_key=73822e5a584c041268f0e78a3253cf0d`);
                    
                    location = locationsArray.edges.find(({ node }) => node.meta_info.slug == "downtown-miami").node;
                    try{
                        let data = response.status === 200 ? await response.json() : null;
                        if(data) location = closestLoc(locationsArray.edges, data.latitude, data.longitude)
                    }catch(e){}
                }
                console.log("New updated location", location)
                // const location = "Santiago de Chile"
                const browserLang = getFirstBrowserLanguage();
                
                // get the language
                let language = null;
                if (location) language = location.defaultLanguage;
                else {
                    console.log("Location could not be loaded, using browserlanguage as default language");
                    language = browserLang.substring(0, 2);
                }
                
                let repeated = [];
                const _session = {
                    ...session, v4, location, browserLang, language,
                    upcoming: [],
                    locations: locationsArray.nodes.filter(l => {
                        const [ name, lang ] = l.fields.file_name.split(".");
                        //filter repetead and only english locations
                        if(lang !== "us" || repeated.includes(name)) return false;
                        repeated.push(name);
                        return true;
                    })
                    .map(l => locationsArray.edges.find(loc => loc.node.meta_info.slug === l.fields.slug).node)
                    .filter(l => {
                        // filter inlisted locations
                        if(l.meta_info.unlisted) return false;
                        return true;
                    })
                    .sort((a,b) => a.meta_info.position > b.meta_info.position ? 1 : -1)
                };
                console.log("Session: ", _session);
                
                setSession(_session);
                localStorage.setItem("academy_session", JSON.stringify(_session));
                return _session

            };

            const urlParams = new URLSearchParams(window.location.search);
            loadIp(urlParams.get('location') || null)
                .then(_session => {
                    fetch(`${process.env.BREATHECODE_HOST}/admissions/cohort/?upcoming=true&academy=${_session.location.meta_info.slug}`)
                        .then(resp => resp.json())
                        .then(cohorts => setSession({ ...session, upcoming }))
                        .catch(error => console.error("Error loading cohorts", error))
                })
        }, []);

        return <SessionContext.Provider value={{session, setSession}}>
            <Component {...props} />
        </SessionContext.Provider>
    }
    return SessionComponent;
};

