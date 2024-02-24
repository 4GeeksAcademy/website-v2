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

// import ActionsWorker from "./actions.worker.js";
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
            country_shortname
            defaultLanguage
            breathecode_location_slug
            active_campaign_location_slug
            in_person_available
            consents {
              slug
              name
              active
              message
              error_message
            }
            online_available
            meta_info {
              slug
              visibility
              position
              region
              dialCode
              cohort_include_regex
              cohort_exclude_regex
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
    const getReferral = () => {
      // at_gd is for the adtraction referral program
      let alias = ["referral_code", "ref", "referral_key", "referral", "at_gd"];
      let referral = null;
      for (let i = 0; i < alias.length; i++) {
        referral = urlParams.get(alias[i]);
        if (typeof referral == "string" && referral.length > 0) return referral;
      }
      return undefined;
    };
    const message = {
      locationsArray: data.allLocationYaml,
      storedSession: getStorage("academy_session"),
      path: window.location.pathname,
      seed: {
        navigator: JSON.stringify(window.navigator),
        location:
          urlParams.get("location") ||
          urlParams.get("city") ||
          urlParams.get("utm_location") ||
          null,
        gclid:
          urlParams.get("gclid") ||
          urlParams.get("fbclid") ||
          urlParams.get("ttclid") ||
          undefined,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
        utm_content: urlParams.get("utm_content") || undefined,
        utm_source: urlParams.get("utm_source") || undefined,
        utm_plan: urlParams.get("utm_plan") || undefined,
        utm_placement: urlParams.get("utm_placement") || undefined,
        utm_term: urlParams.get("utm_term") || undefined,
        referral_code: getReferral(),
        utm_test: urlParams.get("utm_test") || undefined,
        language:
          urlParams.get("lang") || urlParams.get("language") || undefined,
      },
    };
    const worker = new Worker(new URL("./worker.js", import.meta.url));
    console.log("Initializing worker with: ", message);
    worker.postMessage(message);
    worker.onmessage = (e) => {
      const _session = e.data;
      setStorage(_session);
      setSession(_session);
      setTagManaerVisitorInfo(_session);
      dayjs.locale(_session.language == "us" ? "en" : _session.language);
    };
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
