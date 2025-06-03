import React from "react";
import { graphql, useStaticQuery } from "gatsby";
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
  context,
}) => {
  const dataQuery = useStaticQuery(graphql`
    {
      allFaqYaml {
        edges {
          node {
            faq {
              topic
              questions {
                locations
                question
                answer
              }
            }
            fields {
              lang
            }
          }
        }
      }
      allCourseYaml {
        edges {
          node {
            meta_info {
              title
              description
              slug
            }
            details {
              about {
                title
                sub_title
              }
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);

  const faqs = dataQuery.allFaqYaml.edges
    .find(({ node }) => node.fields.lang === context.lang)
    ?.node.faq.flatMap((elem) => elem.questions);

  const courses = dataQuery.allCourseYaml.edges
    .filter(({ node }) => node.fields.lang === context.lang)
    .map(({ node }) => ({
      "@type": "Course",
      name: node.meta_info.title,
      description: node.meta_info.description,
      url: `https://4geeksacademy.com/${context.lang}/coding-bootcamps/${node.meta_info.slug}`,
      timeToComplete: "PT18W", // 18 weeks in ISO 8601 duration format
      jobGuarantee: true
    }));

  const campusLocation = context.locations.find(
    ({ node }) => node.meta_info.slug === context.slug
  )?.node;
  const faqsFilteredByLocation = faqs.filter((faq) =>
    faq.locations?.includes(campusLocation?.breathecode_location_slug)
  );

  const baseSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url,
      name: title,
    },
  ];

  const educationalOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "4Geeks Academy",
    description: "4Geeks Academy is a coding bootcamp that offers comprehensive programming education with a focus on practical skills and job placement.",
    url: "https://4geeksacademy.com",
    logo: "https://storage.googleapis.com/media-breathecode/b25a096eb14565c0c5e75d72442f888c17ac06fcfec7282747bf6c87baaf559c",
    sameAs: [
      "https://twitter.com/4GeeksAcademy",
      "https://www.instagram.com/4geeksacademy/",
      "https://www.facebook.com/4geeksacademy",
      "https://4geeksacademy.com/",
      "https://www.youtube.com/@4GeeksAcademy",
    ],
    offers: courses,
    jobGuarantee: true
  };

  const page = [...baseSchema];
  const location = [
    ...baseSchema,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqsFilteredByLocation.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];
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

  const faqSchema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
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
    location,
    landing: page,
    course: schemaCourse,
  };

  return (
    <Helmet>
      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(educationalOrganizationSchema)}
      </script>
      {type in schemaType && (
        <script type="application/ld+json">
          {JSON.stringify(schemaType[type])}
        </script>
      )}
      {context.defaultTemplate === "index" ||
        (type === "location" && (
          <script type="application/ld+json">
            {JSON.stringify(schemaOrg)}
          </script>
        ))}
      {context.filePath?.includes("data/blog/") && (
        <script type="application/ld+json">{JSON.stringify(blog)}</script>
      )}
      {context.defaultTemplate === "faq" && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
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
