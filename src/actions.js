

export const apply = (data) => {
    return fetch('/api/acp_apply', {
        headers: new Headers({'content-type': 'application/json'}),
        method: "POST",
        body: JSON.stringify({ ...data, tags: ['website_lead'] }),
    })
        .then(resp => {
            if( resp.status >= 200 && resp.status < 400) return resp.json();
            throw Error('Unexpected error');
        });
}

export const requestSyllabus = (data) => {
    return fetch('/api/acp_apply', {
        headers: new Headers({'content-type': 'application/json'}),
        method: "POST",
        body: JSON.stringify({ ...data, tags: ['syllabus_request'] }),
    })
        .then(resp => {
            if( resp.status >= 200 && resp.status < 400) return resp.json();
            throw Error('Unexpected error');
        });
}