import React from "react";
import { graphql } from "gatsby";
import BaseRender from "./_baseLayout";
import FaqCard from "../components/FaqCard";
import { Divider, GridContainer, Header } from "../components/Sections";

const Faq = (props) => {
  const { pageContext, yml, data } = props;

  return (
    <>
      <Header
        fontSize="40px"
        seo_title={yml.seo_title}
        title={yml.banner.tagline}
        paragraph={yml.banner.sub_heading}
        // padding_tablet="142px 0 15px 0"
        // padding="142px 0 15px 0"
      />

      <GridContainer
        padding="0 4%"
        gridGap="0px"
        padding_tablet="0 20%"
        padding_lg="0 26%"
        github={`/page/faq.${pageContext.lang}.yml`}
      >
        <FaqCard faqs={data.allFaqYaml.edges[0].node.faq} />
      </GridContainer>
      <Divider height="50px" />
    </>
  );
};
export const query = graphql`
  query FaqsQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            slug
            title
            description
            image
            keywords
          }
          seo_title
          banner {
            tagline
            sub_heading
            sub_heading_contact
            pathContact
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          fields {
            lang
          }
        }
      }
    }
    allFaqYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          faq {
            topic
            questions {
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
  }
`;
export default BaseRender(Faq);
