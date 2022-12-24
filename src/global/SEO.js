import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { StaticQuery, graphql, } from "gatsby";
import SchemaOrg from "./SchemaOrg.js";

const getCanonical = (path) => {
  const mapping = {
    "us/index": "",
  };

  if (typeof mapping[path] === "string") return mapping[path];
  else return path;
};

const SEO = (props) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage,
          social: {
            defaultFacebookUsername,
            defaultInstagramUsername,
            defaultTwitterUsername,
            youtube,
            github,
          },
          org: { name, logo },
        },
      },
    }) => {
      const {
        title,
        description,
        excerpt,
        image,
        article,
        social,
        author,
        context,
        visibility,
      } = props;
      const { lang, type, pagePath, translations, locations } = context;
      const url = `${siteUrl}${pagePath || "/"}`;
      const previewImage = `${
        RegExp("http").test(image || defaultImage) ? "" : siteUrl
      }${image || defaultImage}`;

      console.log("translations");
      console.log(translations);
      console.log("props");
      console.log(props);

      const currentLocation = locations.find(({ node }) => node.meta_info.slug === context.slug);

      const getCountryLang = (lang) => {
        if (!currentLocation) return lang;
        // if (currentLocation.node.fields.lang === lang)
        const countryLang = langCountries[currentLocation.node.country_shortname];
        if (lang === countryLang) return `${lang}-${currentLocation.node.country_shortname}`;
        if (langCountries[lang] === countryLang) return `${langCountries[lang]}-${currentLocation.node.country_shortname}`;
        return langCountries[lang] ? `${langCountries[lang]}-${lang}` : lang
      };

      const hreflangs =
        translations == undefined
          ? []
          : Object.keys(translations)
              .filter((t) => t != lang)
              .map((t) => ({ lang: t, path: translations[t], countryLang: getCountryLang(t) }));
      console.log("hreflangs");
      console.log(hreflangs);
      console.log(locations.find(({ node }) => node.meta_info.slug === context.slug));
      return (
        <>
          <Helmet title={title || defaultTitle} titleTemplate={titleTemplate}>
            <html lang={langCountries[lang]} />
            <link
              rel="canonical"
              href={`${siteUrl}${getCanonical(pagePath)}`}
            />
            {hreflangs.map((h) => (
              <link
                rel="alternate"
                hrefLang={
                  type === "location"
                    ? h.countryLang
                    : langCountries[h.lang]
                }
                href={`${siteUrl}${getCanonical(h.path)}`}
              />
            ))}
            <meta
              name="description"
              content={description || excerpt || defaultDescription[lang]}
            />
            {["hidden", "unlisted"].includes(
              context.visibility || visibility
            ) && <meta name="robots" content="noindex" />}
            <meta name="image" content={previewImage} />
            {type === "blog" ? (
              <meta property="og:type" content="article" />
            ) : (
              <meta property="og:type" content="website" />
            )}
            <meta name="og:title" content={title || defaultTitle} />
            <meta name="og:url" content={url} />
            <meta
              property="og:description"
              content={description || defaultDescription[lang]}
            />
            <meta property="og:image" content={previewImage} />
            <meta name="twitter:card" content={previewImage} />
            <meta
              name="twitter:site"
              content={`${siteUrl}${getCanonical(pagePath)}`}
            />
            <meta
              name="twitter:creator"
              content={social.twitterUsername || defaultTwitterUsername}
            />
            <meta name="twitter:title" content={title || defaultTitle} />
            <meta
              name="twitter:description"
              content={description || defaultDescription[lang]}
            />
            <meta name="twitter:image" content={previewImage} />
          </Helmet>
          <SchemaOrg
            author={author}
            // canonicalUrl=""
            // datePublished={}
            description={description || defaultDescription}
            image={previewImage}
            type={type}
            title={title || defaultTitle}
            url={url}
            organization={{
              url: siteUrl,
              logo: `${siteUrl}/${logo}`,
              name: name,
            }}
          />
        </>
      );
    }}
  />
);

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  keywords: PropTypes.string,
  social: PropTypes.object,
  pathname: PropTypes.string,
  author: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  author: "",
  lang: "us",
  description: null,
  keywords: null,
  image: null,
  social: {},
  pathname: null,
  article: false,
};

const query = graphql`
  query SEO{
    site {
      siteMetadata {
        defaultTitle
        titleTemplate
        defaultDescription {
          es
          us
        }
        siteUrl
        defaultImage
        social {
          defaultTwitterUsername
          defaultFacebookUsername
          defaultInstagramUsername
          youtube
          github
        }
        org {
          name
          logo
        }
      }
    }
  }
`;

const langCountries = {
  us: "en",
  cl: "es",
  mx: "es",
  es: "es",
  ve: "es",
  co: "es",
  fr: "fr",
  it: "it",
  ca: "en",
  br: "pt",
};
