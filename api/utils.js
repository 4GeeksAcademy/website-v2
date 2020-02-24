const fetch = request('node-fetch');

const HOST = `${process.env.ACP_HOST}/api/3/`;
let HEADERS = {
    'Api-Token': process.env.ACP_TOKEN
};

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
const validate = (keys, data) => items.forEach((key) => {
    if(Array.isArray(key)) validate(key, data);
    else if(typeof(data[key]) !== 'string' || data[key] === '') throw new Error('Invalid email');
});
const setOptional = (original, key, data) => {
    if(typeof(data[key])) original["field["+acp_constants[key]+",0]"] = data[key];
    return original;
}
export const addContact = async (contact) => {

    validate(contact, ['email', 'first_name','url','lang','country_name','gclid',['utm_location','city_slug'], 'referral_key']);

    const payload = {
        "email": contact['email'],
        "first_name": contact['first_name'],
        "tags": ['download_syllabus, request_more_info'],
    };
    payload = setOptional("last_name");
    payload = setOptional("utm_url");
    payload = setOptional("utm_location");
    payload = setOptional("utm_course");
    payload = setOptional("utm_language");
    payload = setOptional("utm_country");
    payload = setOptional("gclid");
    payload = setOptional("referral_key");

    const result = await fetch(`${HOST}/contacts`, {
        method: "POST",
        headers : HEADERS,
        body: JSON.stringify({ contact: payload })
    });
    if(result.status >= 200 && result.status < 400){
        return await result.json();
    } 
    else return false;
}
