const fetch = require('node-fetch');

const HOST = `${process.env.ACP_HOST}/api/3/`;
let HEADERS = {
    'Api-Token': process.env.ACP_TOKEN
};
// console.log(HOST);
const acp_constants = {
    soft_leads_list: 8,
    newsletter_list: 3,
    utm_url: 15,
    utm_location: 18,
    utm_course: 2,
    utm_language: 16,
    utm_country: 19,
    gclid: 26,
    referral_key: 27
};

// TEST API credentials
const test = async () => {
    const result = await ac.credentials_test();
    if(result.success) return true;
    else return false;
}

/**
 * 
    {
        "contact": {
            "email": "johndoe@example.com",
            "firstName": "John",
            "lastName": "Doe",
            "phone": "7223224241"
        }
    }
 */
const validate = (data, keys) => keys.forEach((key) => {
    if(Array.isArray(key)) validate(data, key);
    else if(typeof(data[key]) !== 'string' && data[key] === '') throw new Error('Invalid '+key);
});
const mandatory = (data, keys) => keys.forEach((key) => {
    if(Array.isArray(key)) validate(data, key);
    else if(typeof(data[key]) === 'undefined' || data[key] === '') throw new Error('Missing mandatory property '+key);
});
const setOptional = (original, data, key) => {
    if(typeof(acp_constants[key]) === 'undefined') throw new Error('Property uknown: '+key);
    
    if(typeof(data[key]) !== 'undefined'){
        original["field["+acp_constants[key]+",0]"] = data[key];
    } 
    return original;
}
export const addContact = async (contact) => {

    validate(contact, ['email', 'tags', 'first_name','url','lang','country_name','gclid', 'utm_location', 'referral_key']);
    mandatory(contact, ['email', 'tags', 'lang', 'utm_location']);

    let payload = {
        "email": contact['email'],
        "first_name": contact['first_name'],
        "tags": contact['tags'],
    };
    
    if(typeof(contact["last_name"])==='undefined') 
        payload["last_name"] = contact["last_name"];
    
    payload = setOptional(payload, contact, "utm_url");
    payload = setOptional(payload, contact, "utm_location");
    payload = setOptional(payload, contact, "utm_course");
    payload = setOptional(payload, contact, "utm_language");
    payload = setOptional(payload, contact, "utm_country");
    payload = setOptional(payload, contact, "gclid");
    payload = setOptional(payload, contact, "referral_key");

    console.log(payload);
    const result = await fetch(`${HOST}/contact/sync`, {
        method: "POST",
        headers : HEADERS,
        body: JSON.stringify({ contact: payload })
    });
    if(result.status >= 200 && result.status < 400){
        return await result.json();
    } 
    else{
        const err = await result.json();
        const msg = err.errors.pop();
        throw new Error(msg ? msg.title : "Uknown error");
    }
}
