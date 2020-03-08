

export const apply = (data) => {
    return fetch('/api/acp_apply', {
        headers: new Headers({'content-type': 'application/json'}),
        method: "POST",
        body: JSON.stringify({...data, tags: ['website_lead']}),
    })
        .then(resp => {
            if (resp.status >= 200 && resp.status < 400) return resp.json();
            throw Error('Unexpected error');
        });
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