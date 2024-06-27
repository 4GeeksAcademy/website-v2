import React from "react";
import { graphql } from "gatsby";
import BaseRender from "./_baseLayout";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";
import { Colors } from "../components/Styling";

// components
import { Div, GridContainer } from "../components/Sections";
import { H1, H2, H4, Paragraph } from "../components/Heading";

const Terms = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  return (
    <GridContainer
      github="/components/privacy"
      columns_tablet="12"
      margin={isCustomBarActive(session) ? "170px 0 0 0" : "120px 0 0 0"}
    >
      <Div flexDirection="column" gridColumn_tablet=" 2 / 12">
        <H1
          type="h1"
          fontSize="13px"
          lineHeight="16px"
          fontWeight="700"
          letterSpacing="0.05em"
          color={Colors.darkGray2}
        >
          4GEEKS ACADEMY
        </H1>

        <H2
          type="h2"
          zIndex="5"
          fontSize="50px"
          lineHeight="60px"
          margin="16px 0px 19px 0px"
        >
          {yml.header.tagline}
        </H2>
        <Div flexDirection="column">
          {yml.sections.map((section, index) => {
            return (
              <React.Fragment key={index}>
                <H4
                  type="h3"
                  fontSize="22px"
                  fontWeight="bold"
                  borderBottom="1px solid #C4C4C4"
                  margin="0 0 15px 0"
                  padding="74px 0 20px 0"
                >
                  {section.title}
                </H4>
                {section.text.split("\n").map((m, i) => (
                  <Paragraph
                    letterSpacing="0.05em"
                    textAlign="left"
                    key={i}
                    align="left"
                    align_sm="left"
                    margin="15px 0"
                    dangerouslySetInnerHTML={{ __html: m }}
                  ></Paragraph>
                ))}
              </React.Fragment>
            );
          })}
        </Div>
        <Paragraph
          dangerouslySetInnerHTML={{ __html: yml.date_release }}
          margin="20px 0"
        ></Paragraph>
      </Div>
    </GridContainer>
  );
};
export const query = graphql`
  query TermsQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            title
            description
            image
            keywords
          }
          seo_title
          header {
            tagline
            sub_heading
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            alt
          }

          sections {
            title
            text
          }
        }
      }
    }
  }
`;
export default BaseRender(Terms);
