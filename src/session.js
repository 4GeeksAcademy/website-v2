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
            initSession(session, data.allLocationYaml, urlParams.get('location') || null)
                .then(_session => setSession(_session))
        }, []);

        return <SessionContext.Provider value={{session, setSession}}>
            <Component {...props} />
        </SessionContext.Provider>
    }
    return SessionComponent;
};

