const fetch = request('node-fetch');

const HOST = `${process.env.ACP_HOST}/api/3/`;
let HEADERS = {
    'Api-Token': process.env.ACP_TOKEN
};
const ACP_CONSTANTS = {
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
})
export const addContact = async (contact) => {

    validate(contact, ['email', 'first_name','url','lang','country_name','gclid',['utm_location','city_slug'], 'referral_key']);

    const payload = {
        "email": contact['email'],
        "first_name": contact['first_name'],
        "tags": ['download_syllabus, request_more_info'],
        `field[${ACP_CONSTANTS['utm_url']},0]`: $utmURLValue,
        "field[".$utmLanguageId.",0]" => $utmLanguageValue,
        "field[".$utmCountryId.",0]" => $utmCountryValue,
        "field[".$utmLocationId.",0]" => $utmLocationValue,
        "field[".$gclid.",0]" => $gclidValue,
    }
    if(!empty($referralId)) $contact["field[".$referralId.",0]"] = $referralValue;

    $coursesField = \TF\ActiveCampaign\ACAPI::subscribeToList($contact, $listId);

    if($coursesField){
        return [
            "status" => "ok",
            "code" => 200,
            "data" => "Check your email! In the next minutes your should receive what you asked for :)"
        ];
    }
    else return [
        "status" => "error",
        "code" => 500,
        "data" => "Something went wrong"
    ];

    const result = await fetch(`${HOST}/contacts`);
    if(result.status === 2000) return await result.json();
    else return false;
}
