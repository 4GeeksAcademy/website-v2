import React, {createContext, useState, useEffect} from "react";
import publicIp from 'public-ip';
// const ip = require('ip');
// import Address6 from 'ip-address'
// const Address4 = require('ip-address').Address4;
// const publicIp = require('public-ip');
const defaultSession = {
    v6: null,
    v4: null,
    latitude: null,
    longitude: null,
    email: null,
    location: null,
    language: null,
    gclid: null,
    utm_campaign: null,
    utm_source: null,
    utm_medium: null,
    referral_code: null
};
export const SessionContext = createContext(null);
export const withSession = Component => {
    const SessionComponent = (props) => {
        const [session, setSession] = useState(defaultSession);
        // const [lat, setLat] = useState("test");
        // const [lon, setLon] = useState()
        useEffect(() => {
            //get ip address
            const loadIp = async () => {
                console.log(await publicIp.v4())
                // const v4 = await ip.address();
                // const v6 = await ip.isV6Format('::ffff:127.0.0.1');
                // const v4 = await new Address4;
                // const v6 = await new Address6;
                const v4 = await publicIp.v4();
                const v6 = "ciao"
                // const latitude = "lat"
                // const v6 = await publicIp.v6();
                setSession({...session, v6, v4});
                // const response = await fetch(`http://api.ipstack.com/${session.v4}?access_key=9b1771a432a0ca7c933a9a641b63bb00`);
                // const data = await response.json();
                // console.log("data", data.latitude)
                // const latitude = data.latitude;
                // const longitude = data.longitude;
                // setSession({...session, latitude, longitude})
            };
            loadIp();
        }, []);

        return <SessionContext.Provider value={{session, setSession}}>
            <Component {...props} />
        </SessionContext.Provider>
    }
    return SessionComponent;
};

