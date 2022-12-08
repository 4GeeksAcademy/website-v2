import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import SchemaOrg from "./SchemaOrg.js";

const SEO = (props) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          defaultKeywords,
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
        keywords,
        visibility,
      } = props;
      const { lang, type, pagePath } = context;
      const url = `${siteUrl}${pagePath || "/"}`;
      const _keywords = keywords
        ? keywords + [].join(",")
        : defaultKeywords[lang].join(",");
      const previewImage = `${
        RegExp("http").test(image || defaultImage) ? "" : siteUrl
      }${image || defaultImage}`;
      return (
        <>
          <Helmet title={title || defaultTitle} titleTemplate={titleTemplate}>
            <html lang={langCountries[lang]} />
            <link rel="canonical" href={`${siteUrl}${pagePath}`} />
            <meta
              name="description"
              content={description || excerpt || defaultDescription[lang]}
            />
            <meta name="keywords" content={_keywords} />
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
  query SEO {
    site {
      siteMetadata {
        defaultTitle
        titleTemplate
        defaultDescription {
          es
          us
        }
        defaultKeywords {
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
