import React, {createContext, useState, useEffect} from "react";
import {useStaticQuery, graphql} from 'gatsby';
import { initSession, defaultSession } from "./actions"

export const SessionContext = createContext(null);
export const withSession = Component => {
    const SessionComponent = (props) => {
        const data = useStaticQuery(graphql`
      query myQuerySession{
          allLocationYaml{
            edges{
              node{
                city
                name
                latitude
                longitude
                country
                defaultLanguage
                meta_info{
                    slug
                    unlisted
                    position
                }
              }
            }
            nodes{
                fields {
                    file_name
                    slug
                }
            }
          }
        }
        `);

        const [session, setSession] = useState(defaultSession);
        //get ip address
        useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            initSession(session, data.allLocationYaml, {
              location: urlParams.get('location') || null,
              gclid: urlParams.get('GCLID') || urlParams.get('gclid'),
              utm_medium: urlParams.get('utm_medium'),
              utm_campaign: urlParams.get('utm_campaign'),
              utm_content: urlParams.get('utm_content'),
              utm_source: urlParams.get('utm_source'),
            })
              .then(_session => setSession(_session))
              .catch(error => console.error("Error initilizing session", error))
        }, []);

        return <SessionContext.Provider value={{session, setSession}}>
            <Component {...props} />
        </SessionContext.Provider>
    }
    return SessionComponent;
};

