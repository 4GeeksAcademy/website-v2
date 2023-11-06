import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GridContainerWithImage, Div, GridContainer } from "../Sections";
import { H2, H4, Paragraph } from "../Heading";
import { Colors, RoundImage, StyledBackgroundSection } from "../Styling";
//import TwoColumn from "../components/TwoColumn/index.js";
import { TwoColumn } from "../Landing";
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
                  width: 800
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
      <H2
        padding="15px 0 20px 0"
        margin_tablet="30px auto 15px auto"
        margin_xxs="15px auto 30px auto"
        width_tablet="100%"
      >
        {content.heading}
      </H2>

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
        right={{ image: content.image.childImageSharp.gatsbyImageData }}
        //proportions={yml.proportions}
        //session={session}
      />
    </>
  );
};

export default GeeksInfo;
