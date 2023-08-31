import React from "react";
import { graphql } from "gatsby";
import { Header } from "../components/Sections";
import BaseRender from "./_baseLayout";
import JobInfo from "../components/JobInfo";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";

const Jobs = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const { lang } = pageContext;

  return (
    <>
      <Header
        seo_title={yml.seo_title}
        title={yml.header.title}
        margin={isCustomBarActive(session) ? "120px 0 0 0" : "70px 0 0 0"}
        paragraph={yml.header.paragraph}
        padding_tablet="72px 0 40px 0"
      />
      <JobInfo lang={lang} />
    </>
  );
};
export const query = graphql`
  query JobsQuery($file_name: String!, $lang: String!) {
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
          header {
            title
            paragraph
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
        }
      }
    }
  }
`;
export default BaseRender(Jobs);
