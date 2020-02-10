import React, {createContext, useState, useEffect} from "react";
import publicIp from 'public-ip';
import {useStaticQuery, graphql} from 'gatsby';


const defaultSession = {
    v6: null,
    v4: null,
    latitude: null,
    longitude: null,
    email: null,
    location: "Miami",
    language: null,
    gclid: null,
    utm_campaign: null,
    utm_source: null,
    utm_medium: null,
    referral_code: null
};
const markers = [
    {
        "id": "1",
        "lat": "10.484845",
        "lng": "-66.826593",
        "name": "Caracas",
        "slug": "caracas"
    },
    {
        "id": "2",
        "lat": "10.664500",
        "lng": "-71.617705",
        "name": "Maracaibo"
    },
    {
        "id": "3",
        "lat": "33.408837",
        "lng": "-70.567958",
        "name": "Santiago de Chile"
    },
    {
        "id": "4",
        "lat": "40.439769",
        "lng": "-3.680207",
        "name": "Madrid"
    },
    {
        "id": "5",
        "lat": "25.760158",
        "lng": "-80.200154",
        "name": "Miami"
    }
];
function distance (lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {dist = dist * 1.609344}
    if (unit == "N") {dist = dist * 0.8684}
    return dist
}
function closestLoc (locations, lat, lon) {
    let closestLocation = 10000000;
    let city = ""
    for (var i = 0; i < locations.length; i++) {
        let tempLocation = distance(lat, lon, locations[i].node.latitude, locations[i].node.longitude, "K")
        if (tempLocation <= closestLocation) {closestLocation = tempLocation, city = locations[i].node.city}
    }
    console.log("city: ", city)
    return city;
}
export const SessionContext = createContext(null);
export const withSession = Component => {
    const SessionComponent = (props) => {
        const data = useStaticQuery(graphql`
      query myQuerySession{
          loc: allLocationsYaml{
            edges{
              node{
                city
                slug
                name
                latitude
                longitude
                country
              }
            }
          }
        }
      `)
        const locationsArray = data.loc.edges;
        const [session, setSession] = useState(defaultSession);
        //get ip address
        useEffect(() => {
            const loadIp = async () => {
                const v4 = await publicIp.v4();
                const v6 = "v6";
                setSession({...session, v6, v4});

                const response = await fetch(`http://api.ipstack.com/${session.v4}?access_key=9b1771a432a0ca7c933a9a641b63bb00`);
                const data = response.status === 200 && await response.json();
                const location = closestLoc(locationsArray, data.latitude, data.longitude)
                console.log("location: ", location)
                setSession({...session, v4, v6, location})
            };
            loadIp();
        }, []);

        return <SessionContext.Provider value={{session, setSession}}>
            <Component {...props} />
        </SessionContext.Provider>
    }
    return SessionComponent;
};

