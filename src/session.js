import React, { createContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useStaticQuery, graphql } from "gatsby";
import {
  defaultSession,
  setStorage,
  getStorage,
  setTagManaerVisitorInfo,
  locByLanguage,
} from "./actions";

import ActionsWorker from "./actions.worker.js";
export const SessionContext = createContext(defaultSession);

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query myQuerySession {
      allLocationYaml {
        edges {
          node {
            city
            name
            latitude
            longitude
            phone
            socials {
              name
              icon
              link
            }
            country
            defaultLanguage
            breathecode_location_slug
            active_campaign_location_slug
            gdpr_compliant
            in_person_available
            online_available
            meta_info {
              slug
              visibility
              position
              region
            }
            button {
              apply_button_text
              syllabus_button_text
            }
            custom_bar {
              active
            }
          }
        }
        nodes {
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
    ActionsWorker()
      .initSession(data.allLocationYaml, getStorage("academy_session"), {
        navigator: JSON.stringify(window.navigator),
        location:
          urlParams.get("location") ||
          urlParams.get("city") ||
          urlParams.get("utm_location") ||
          null,
        gclid: urlParams.get("gclid") || urlParams.get("fbclid") || undefined,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
        utm_content: urlParams.get("utm_content") || undefined,
        utm_source: urlParams.get("utm_source") || undefined,
        referral_code: urlParams.get("referral_code") || undefined,
        utm_test: urlParams.get("utm_test") || undefined,
        language:
          urlParams.get("lang") || urlParams.get("language") || undefined,
      })
      .then((_session) => {
        setStorage(_session);
        setSession(_session);
        setTagManaerVisitorInfo(_session);
        dayjs.locale(_session.language == "us" ? "en" : _session.language);
      })
      .catch((error) => console.error("Error initilizing session", error));
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession: (_s) => {
          const location = locByLanguage(
            data.allLocationYaml,
            _s.language
          ).find(
            (l) =>
              l.breathecode_location_slug ===
              _s.location.breathecode_location_slug
          );
          const _session = { ..._s, location };
          setStorage(_session);
          setSession(_session);
          dayjs.locale(_session.language == "us" ? "en" : _session.language);
        },
        setLocation: (slug) => {
          const location = locByLanguage(
            data.allLocationYaml,
            session.language
          ).find((l) => l.breathecode_location_slug === slug);
          if (location) {
            const _session = { ...session, location };
            setSession(_session);
            setStorage(_session);
            dayjs.locale(_session.language == "us" ? "en" : _session.language);
          } else
            console.error(
              `Location ${slug} with language ${session.language} not found to be set`
            );
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
