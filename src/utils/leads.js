/**
 * 
 * @param {Information to send to the backend} formData 
 * @param {Any tag from active campaign} tags 
 * @param {hard, soft, newsletter, etc} automations 
 * @param {session information object} session 
 */
export const save_form = async (formData=null, tags=[], automations=[], session=null) => {

    if(!Array.isArray(tags)) throw Error("Tags must be an array");
    if(typeof(session) !== 'object') throw Error("Missing session");
    if(typeof(formData) !== 'object') throw Error("Missing formData");

    const resp = await fetch(`${process.env.GATSBY_BREATHECODE_HOST}/marketing/lead`, {
        headers: new Headers({'content-type': 'application/json'}),
        method: "POST",
        body: JSON.stringify({
            ...formData, 
            ...session.utm,
            tags: tags.join(","), 
            automations: automations.join(","), 
            utm_language: session.language,
            language: session.language,
            city: session.location.city, 
            location: formData.location || session.location.meta_info.slug, 
            country: session.location.country, 
            utm_url: window.location.href,
        }),
    })
    if (resp.status >= 200 && resp.status < 400) {
        return await resp.json();
    }
    else{
        const error = await resp.json();
        if(typeof(error.detail) === 'string') throw Error(error.detail);
        if(typeof(error.details) === 'string') throw Error(error.details);
        for(let key in error){
            throw Error(error[key][0]);
        }
    }
}