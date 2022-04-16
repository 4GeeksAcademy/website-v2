import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";
import { Row, Div } from "../Sections";
import { Colors } from "../Styling";
import graphic from "../../assets/images/graphic.png";
import Fragment from "../Fragment";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Helper = styled.span`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`;
export default ({
  location,
  margin,
  lang,
  limit,
  filter,
  padding,
  padding_tablet,
  height,
  width,
  maxWidth,
  overflowX,
  justifySelf,
  imgPadding,
}) => {
  const data = useStaticQuery(graphql`
    query myNewQueryNews {
      allNewsYaml {
        edges {
          node {
            news {
              name
              url
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    height: 60
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )

                  # fluid(maxHeight: 60,){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              location
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);

  const languageNews = data.allNewsYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  let locationNews =
    typeof languageNews !== "object" ? [] : languageNews.node.news;
  if (filter) locationNews = locationNews.filter(filter);
  else if (location)
    locationNews = locationNews.filter(
      (n) => n.location === "all" || !location || n.location.includes(location)
    );

  if (limit) locationNews = locationNews.slice(0, limit);

  if (locationNews.length === 0) {
    console.error(`No news to display for location `, location, locationNews);
    return null;
  }
  return (
    <Div
      width="100%"
      justifySelf={justifySelf}
      margin={margin ? margin : "35px 0"}
      margin_tablet={margin ? margin : "40px 0 0 0"}
      padding={padding}
      padding_tablet={padding_tablet}
      display="flex"
      gap="20px"
      height="auto"
      overflowX={overflowX || "auto"}
      justifyContent="around"
      justifyContent_tablet="around"
    >
      {Array.isArray(locationNews) &&
        locationNews.map((l, i) => {
          return (
            // <Div key={i} background={Colors.blue}>test</Div>
            <GatsbyImage
              key={i}
              style={{
                height: `${height}`,
                width: `${width}`,
                minWidth: "60px",
                maxWidth: `${maxWidth}`,
                margin: "0",
              }}
              imgStyle={{ objectFit: "contain" }}
              alt={l.name}
              image={getImage(
                l.image != null && l.image.childImageSharp.gatsbyImageData
              )}
              // fluid={l.image != null && l.image.childImageSharp.fluid}
            />
          );
        })}
    </Div>
    // </Fragment>
  );
};
