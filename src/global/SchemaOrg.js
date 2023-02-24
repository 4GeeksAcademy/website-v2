import React from "react";
import { Helmet } from "react-helmet";

const SchemaOrg = ({
  author,
  canonicalUrl,
  datePublished,
  description,
  image,
  type,
  organization,
  title,
  url,
}) => {
  const baseSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url,
      name: title,
    },
  ];
  const page = [...baseSchema];
  const blog = [
    ...baseSchema,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": url,
            name: title,
            image,
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      url,
      name: title,
      headline: title,
      image: {
        "@type": "ImageObject",
        url: image,
      },
      description,
      author: {
        "@type": "Person",
        name: author,
      },
      publisher: {
        "@type": "Organization",
        url: organization.url,
        logo: organization.logo,
        name: organization.name,
      },
      mainEntityOfPage: {
        "@type": "WebSite",
        "@id": canonicalUrl,
      },
      datePublished,
    },
  ];

  const schemaWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "4Geeks Academy",
    url: `https://4geeksacademy.com`,
  };

  const schemaCourse = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description,
    provider: {
      "@type": "Organization",
      name: "4Geeks Academy",
      sameAs: "https://4geeksacademy.com/",
    },
  };

  const schemaType = {
    page,
    course: schemaCourse,
  };
  const getSchemeType = () => {
    if (type in schemaType) return schemaType[type];
    return blog;
  };

  return (
    <Helmet>
      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(getSchemeType())}
      </script>
      {/* {type === "page" && (
        <script type="application/ld+json">
          {JSON.stringify(schemaWebsite)}
        </script>
      )} */}
    </Helmet>
  );
};
SchemaOrg.defaultProps = {
  title: null,
  description: null,
  image: null,
  twitterUsername: null,
  pathname: null,
  article: false,
  author: "",
};
export default React.memo(SchemaOrg);
