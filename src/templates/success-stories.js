import React from "react";
import { graphql } from "gatsby";
import {
  Header,
  Div,
} from "../components/Sections";
import { Colors } from "../components/Styling";
import SuccessStoriesComponent from "../components/SuccessStories";
import BaseRender from "./_baseLayout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const SuccessStories = (props) => {
  const { data, pageContext, yml } = props;

  return (
    <>
      {yml.header && (
        <Header
          seo_title={yml.seo_title}
          title={yml.header.title}
          paragraph={yml.header.paragraph}
          padding_tablet="72px 0 40px 0"
          padding="66px 17px 85px 0"
        />
      )}
      {yml.images && (
        <Div
          display="flex"
          flexDirection="row"
          borderRadius="3px"
          style={{ flexWrap: "wrap" }}
          // columnGap="70px"
          justifyContent="center"
          background={Colors.white}
          padding="25px 0 0 0"
          margin="0 0 50px 0"
        >
          {yml.images.map((l, i) => {
            return (
              <Div
                key={`${i}-${l.name}`}
                margin="0 20px 40px 20px"
                margin_tablet={`0 ${i >= 4 ? "30px" : "30px"} 30px ${
                  i >= 4 ? "30px" : "30px"
                }`}
              >
                <GatsbyImage
                  key={i}
                  style={{ height: "60px", minWidth: "90px" }}
                  imgStyle={{ objectFit: "contain" }}
                  alt={l.name}
                  fluid={l.image.childImageSharp.fluid}
                  image={getImage(l.image.childImageSharp.gatsbyImageData)}
                />
              </Div>
            );
          })}
        </Div>
      )}
      <SuccessStoriesComponent
        lang={pageContext.lang}
        filterIndexes={yml.filter_indexes}
      />
    </>
  );
};
export const query = graphql`
  query SuccessQuery($file_name: String!, $lang: String!) {
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
            title
            paragraph
          }
          images {
            name
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 150
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
export default BaseRender(SuccessStories);
