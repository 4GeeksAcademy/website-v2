import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GridContainerWithImage, Div, GridContainer } from "../Sections";
import { H2, H4, Paragraph } from "../Heading";
import { Colors, RoundImage, StyledBackgroundSection } from "../Styling";
import TwoColumn from "../TwoColumn/index.js";
const GeeksInfo = ({ lang }) => {
  const data = useStaticQuery(graphql`
    {
      allGeeksInfoYaml {
        edges {
          node {
            heading
            sub_heading
            header {
              image
              image_link
            }
            bullets {
              items {
                heading
                text
              }
            }
            paragraph
            button {
              text
              path
              color
              background
              hover
            }
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1000
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
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
  let content = data.allGeeksInfoYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (content) content = content.node;
  else return null;

  return (
    <>
    {content.heading &&
      <H2
        padding="30px 0 0 0"
        margin_tablet="60px auto 0 auto"
        margin_xxs="15px auto 0px auto"
        width_tablet="100%"
        maxWidth="1366px"
        lineHeight="35px"
      >
        {content.heading}
      </H2>
    }
      <TwoColumn
        left={{
          //heading: yml.heading,
          //sub_heading: yml.sub_heading,
          bullets: content.bullets,
          //content: yml.content,
          button: content.button,
          //paragraph: content.paragraph,
          //header: content.header
        }}
        right={{ image: content.image }}
        //proportions={yml.proportions}
        //session={session}
      />
    </>
  );
};

export default GeeksInfo;
