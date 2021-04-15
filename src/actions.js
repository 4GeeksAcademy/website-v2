import { save_form } from "./utils/leads";

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

export const locByLanguage = (locations, languageToFilter) => {
    if(languageToFilter == "en") languageToFilter = "us";

    let repeated = [];
    return locations.nodes.filter(l => {
        const [ name, _lang ] = l.fields.file_name.split(".");

        //filter repetead locations and only focuse on the desired language
        if(_lang !== languageToFilter || repeated.includes(name)) return false;
        repeated.push(name);
        return true;
    }).map(l => locations.edges.find(loc => loc.node.meta_info.slug === l.fields.slug).node);
}

 /*  removeStorage: removes a key from localStorage and its sibling expiracy key
    params:
        key <string>     : localStorage key to remove
    returns:
        <boolean> : telling if operation succeeded
 */
export function removeStorage(name) {
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
export function getStorage(key) {

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
export function setStorage(value, expires=null) {
    let key = "academy_session";
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
    console.log("form data: ", data)
    Object.keys(data).forEach(key => {
        if(typeof(data[key]) === "object") body[key] = data[key].value;
        else body[key] = data[key];
    });

    const tag = body.tag || 'website-lead';
    const automation = body.automation || 'strong';
    //                                                                                      tag           automation
    if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, [tag.value || tag], [automation.value || automation], session);
    return true;
}

export const requestSyllabus = async (data,session) => {
    console.log("Succesfully requested Syllabus", data)
    tagManager('request_more_info');
    let body = {};
    Object.keys(data).forEach((key) => body[key] = data[key].value);

    const tag = body.tag || 'request_more_info';
    const automation = body.automation || 'soft';

    //                                                                                      tag                automation
    if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, [tag.value || tag], [automation.value || automation], session);
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

    //                                                                                      tag                automation
    if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, ['hiring-partner'], ['hiring-partner'], session);
    return true;
}
export const applyJob = async (data) => {
    console.log("New job application", data);
    let body = {};
    for (let key in data) body[key] = data[key].value;

    
    // if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, ['hiring-partner'], ['hiring-partner']);
    return true;
}
export const contactUs = async (data,session) => {
    console.log("Succesfully contact us", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;
    
    //                                                                                      tag       automation
    if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, ['contact-us'], ['soft'], session);
    return true;
}
export const newsletterSignup = async (data,session) => {
    tagManager('newsletter_signup')
    console.log("Succesfully newsletter signup", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;
    
    //                                                                                      tag          automation
    if(!session || !session.utm || !session.utm.utm_test) return await save_form(body, ['newsletter'], ['newsletter'], session);
    return true;
}