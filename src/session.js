import React, {createContext, useState, useEffect} from "react";
import {useStaticQuery, graphql} from 'gatsby';
import { initSession, defaultSession, setStorage, setTagManaerVisitorInfo, locByLanguage } from "./actions"

export const SessionContext = createContext(defaultSession);

export default ({children}) => {
    const data = useStaticQuery(graphql`
      query myQuerySession{
          allLocationYaml{
            edges{
              node{
                city
                name
                latitude
                longitude
                phone
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
                button{
                  apply_button_text
                  syllabus_button_text
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
            console.log("Use effect de layout")
            const urlParams = new URLSearchParams(window.location.search);
            initSession(data.allLocationYaml, {
              location: urlParams.get('location') || urlParams.get('city') || null,
              gclid: urlParams.get('gclid') || urlParams.get('fbclid') || undefined,
              utm_medium: urlParams.get('utm_medium') || undefined,
              utm_campaign: urlParams.get('utm_campaign') || undefined,
              utm_content: urlParams.get('utm_content') || undefined,
              utm_source: urlParams.get('utm_source') || undefined,
              referral_code: urlParams.get('referral_code') || undefined,
              utm_test: urlParams.get('utm_test') || undefined,
              language: urlParams.get('lang') || urlParams.get('language') || undefined,
            })
              .then(_session => {
                setSession(_session)
                setTagManaerVisitorInfo(_session)
              })
              .catch(error => console.error("Error initilizing session", error))
        }, []);

        return <SessionContext.Provider value={{
            session, 
            setSession: (_s) => {
              const location = locByLanguage(data.allLocationYaml, _s.language).find(l => l.breathecode_location_slug === _s.location.breathecode_location_slug)
              setSession({ ..._s, location })
            },
            setLocation: (slug) => {
              const location = locByLanguage(data.allLocationYaml, session.language).find(l => l.breathecode_location_slug === slug)
              console.log("setLocation", location)
              if(location){
                const _session = { ...session, location };
                setSession(_session)
                setStorage(_session);
              }
              else console.error(`Location ${slug} with language ${session.language} not found to be set`)
            }
          }}>
            {children}
        </SessionContext.Provider>
};

