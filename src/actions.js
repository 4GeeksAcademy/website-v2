import { save_form } from "./utils/leads";
import dayjs from "dayjs"
import 'dayjs/locale/es'

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
        gclid: null,
        utm_campaign: null,
        utm_source: null,
        utm_medium: null,
        utm_content: null,
        referral_code: null
    }
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

const getClosestLoc = (locations, lat, lon) => {
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

function tagManager (eventName) {
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

    return await save_form(body, ['website-lead'], ['strong'], session);

    throw Error('Unexpected error');
}

export const requestSyllabus = async (data,session) => {
    console.log("Succesfully requested Syllabus", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;

    return await save_form(body, ['request_more_info'], ['soft'], session);
    // return fetch('/api/acp_apply', {
    //     headers: new Headers({'content-type': 'application/json'}),
    //     method: "POST",
    //     body: JSON.stringify({ ...data, tags: ['syllabus_request'] }),
    // })
    //     .then(resp => {
    //         if( resp.status >= 200 && resp.status < 400) return resp.json();
    //         throw Error('Unexpected error');
    //     });
}
export const reviewGuidebook = async (data,session) => {
    console.log("Succesfully requested Guidebook", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;

    return await save_form(body, ['download-guidebook'], ['soft'], session);
    // return fetch('/api/acp_apply', {
    //     headers: new Headers({'content-type': 'application/json'}),
    //     method: "POST",
    //     body: JSON.stringify({ ...data, tags: ['review_guidebook'] }),
    // })
    //     .then(resp => {
    //         if( resp.status >= 200 && resp.status < 400) return resp.json();
    //         throw Error('Unexpected error');
    //     });
}
export const beHiringPartner = async (data,session) => {
    console.log("Succesfully requested Be Hiring Partner", data);
    let body = {};
    for (let key in data) body[key] = data[key].value;

    return await save_form(body, ['hiring-partner'], ['hiring-partner'], session);
    
}
export const contactUs = async (data,session) => {
    console.log("Succesfully contact us", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;

    return await save_form(body, ['contact us'], ['contact-us'], session);
}

export const initSession = async (previousSession, locationsArray, seed=null) => {
    var v4 = null;
    let storedSession = JSON.parse(localStorage.getItem("academy_session"));
    let location = null;

    console.log("seed", seed)
    if(seed.location){
        location = locationsArray.edges.find(({ node }) => node.breathecode_location_slug === seed.location)
        if(location) location = location.node;
        else location = null;
        console.log("Hardcoded location", location)
    } 
    else if(storedSession && storedSession.location != null){
        location = storedSession.location;
        console.log("Location already found on session location", location)
    } 
    
    if(location === null){
        console.log("Calculating nearest location because it was null...")
        try{
            const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB6NEbEyhDU_U1z_XoyRwEu0Rc1XXeZK6c`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });
            let data = await response.json() || null;
            if(data){
                // v4 = data.ip;
                location = getClosestLoc(locationsArray.edges, data.location.lat, data.location.lng)
            }else throw Error("Error when connecting t Google Geolocation API")
        }catch(e){
            console.log("Error retrieving IP information: ", e)
        }
    }
    console.log("New updated location", location)
    // const location = "Santiago de Chile"
    const browserLang = getFirstBrowserLanguage();
    
    // get the language
    let language = null;
    if (location){
        language = location.defaultLanguage;
        location.reliable = true;
    } 
    else {
        location = locationsArray.edges.find(({ node }) => node.breathecode_location_slug == "downtown-miami").node;
        console.log("Location could not be loaded, using browserlanguage as default language");
        language = browserLang.substring(0, 2);
        if(language === "en") language = "us";
        location.reliable = false;
    }
    
    dayjs.locale(language == "us" ? "en" : language)

    let repeated = [];
    const _session = {
        ...previousSession, v4, location, browserLang, language,
        upcoming: [], 
        
        // marketing utm info
        utm: {
            gclid: seed.gclid, 
            utm_campaign: seed.utm_campaign, 
            utm_source: seed.utm_source, 
            utm_medium: seed.utm_medium, 
            utm_content: seed.utm_content, 
            referral_code: seed.referral_code,
        },

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
    console.log("locationsArray: ", locationsArray);
    
    localStorage.setItem("academy_session", JSON.stringify(_session));
    return _session

};