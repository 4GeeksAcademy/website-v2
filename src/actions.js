const API_HOST = 'http://127.0.0.1:8000/v1'

function tagManager (eventName) {
    console.log(window.dataLayer);
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

    console.log("session", session);
    const resp = await fetch(`${API_HOST}/marketing/lead`, {
        headers: new Headers({'content-type': 'application/json'}),
        method: "POST",
        body: JSON.stringify({...body, 
            tags: ['website-lead'].join(","), 
            language: session.language,
            city: session.location.city, 
            country: session.location.country, 
            utm_url: window.location.href 
        }),
    })
    if (resp.status >= 200 && resp.status < 400) {
        return await resp.json();
    }
    else if (resp.status === 400) {
        const error = await resp.json();
        if(typeof(error.details) === 'string') throw Error(error.details);
        for(let key in error){
            throw Error(error[key][0]);
        }
    }

    throw Error('Unexpected error');
}

export const requestSyllabus = (data) => {
    console.log("Succesfully requested Syllabus", data)
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
export const reviewGuidebook = (data) => {
    console.log("Succesfully requested Guidebook", data)
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
export const beHiringPartner = (data) => {
    console.log("Succesfully requested Be Hiring Partner", data)
    // return fetch('/api/acp_apply', {
    //     headers: new Headers({'content-type': 'application/json'}),
    //     method: "POST",
    //     body: JSON.stringify({ ...data, tags: ['hiring_partner] }),
    // })
    //     .then(resp => {
    //         if( resp.status >= 200 && resp.status < 400) return resp.json();
    //         throw Error('Unexpected error');
    //     });
}