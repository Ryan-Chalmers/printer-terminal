
export async function fetchPrintStatus() {
    const url = process.env.HOME_ASSISTANT_URL;
    const headers: Headers = new Headers({
        'Authorization': `Bearer ${process.env.HOME_ASSISTANT_API_KEY}`
    })

    return fetch(`${url}/api/states/sensor.p1p_01s00c450400639_print_status`, {
        method: 'GET',
        headers: headers
    }).then(response => {
        return response.json();
    }).then(json => json.state)
        .catch(error => {
            console.error(error);
        });

}

export async function fetchPrintStage() {
    const url = process.env.HOME_ASSISTANT_URL;
    const headers: Headers = new Headers({
        'Authorization': `Bearer ${process.env.HOME_ASSISTANT_API_KEY}`
    })
    
    return fetch(`${url}/api/states/sensor.p1p_01s00c450400639_current_stage`, {
        method: 'GET',
        headers: headers
    }).then(response => {
        return response.json();
    }).then(json => json.state)
        .catch(error => {
            console.error(error);
        });
}