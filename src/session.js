import React, {createContext, useState, useEffect} from "react";
import {useStaticQuery, graphql} from 'gatsby';
import { initSession, defaultSession, setTagManaerVisitorInfo } from "./actions"

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
                breathecode_location_slug
                active_campaign_location_slug
                gdpr_compliant
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
                    lang
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
              gclid: urlParams.get('gclid') || urlParams.get('fbclid'),
              utm_medium: urlParams.get('utm_medium'),
              utm_campaign: urlParams.get('utm_campaign'),
              utm_content: urlParams.get('utm_content'),
              utm_source: urlParams.get('utm_source'),
            })
              .then(_session => {
                setSession(_session)
                // setTagManaerVisitorInfo(_session)
              })
              .catch(error => console.error("Error initilizing session", error))
        }, []);

        return <SessionContext.Provider value={{session, setSession}}>
            <Component {...props} />
        </SessionContext.Provider>
    }
    return SessionComponent;
};

