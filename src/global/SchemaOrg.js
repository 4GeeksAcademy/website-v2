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
  seoTitle,
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
    name: seoTitle,
    description,
    provider: {
      "@type": "Organization",
      name: "4Geeks Academy",
      sameAs: "https://4geeksacademy.com/",
    },
  };

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "School",
    name: "4Geeks Academy",
    url: `https://4geeksacademy.com`,
    logo: "https://storage.googleapis.com/media-breathecode/b25a096eb14565c0c5e75d72442f888c17ac06fcfec7282747bf6c87baaf559c",
    sameAs: [
      "https://twitter.com/4GeeksAcademy",
      "https://www.instagram.com/4geeksacademy/",
      "https://www.facebook.com/4geeksacademy",
      "https://4geeksacademy.com/",
      "https://www.youtube.com/@4GeeksAcademy",
    ],
  };

  const schemaType = {
    page,
    location: page,
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
