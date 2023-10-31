import React, { useState } from "react";
import { graphql } from "gatsby";
import { Title, H1, H2, H3, H4, H5, Paragraph } from "../components/Heading";
import BaseRender from "./_baseLayout";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";
// components
import News from "../components/News";
import Icon from "../components/Icon";
import { Colors, StyledBackgroundSection, Anchor, Img } from "../components/Styling";
import { GridContainer, Div, Header } from "../components/Sections";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Press = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  let content = data.allPageYaml.edges[0].node.content;
  let position = 0;
  return (
    <Div
      margin={isCustomBarActive(session) ? "120px auto 75px auto" : "90px auto 75px auto"}
      flexDirection="column"
      maxWidth="1366px"
      position="relative"
    >
      <Img
        src="/images/slash-light.png"
        width="44px"
        height="121px"
        style={{
          position: "absolute",
          right: "12%",
          top: "3%",
          zIndex: "0",
        }}
        display_xxs="none"
        display_tablet="flex"
      />
      <Img
        src="/images/slash-black.png"
        width="44px"
        height="121px"
        style={{
          position: "absolute",
          right: "16%",
          top: "3%",
          zIndex: "0",
        }}
        display_xxs="none"
        display_tablet="flex"
      />
      <Img
        src="/images/Vector-right-large.png"
        width="89px"
        height="121px"
        style={{
          position: "absolute",
          right: "4%",
          top: "3%",
          zIndex: "0",
        }}

      />
      <Img
        src="/images/Group-6594-e.png"
        width="50px"
        height="289px"
        style={{
          position: "absolute",
          left: "12%",
          top: "0%",
          zIndex: "1",
        }}
        display_xxs="none"
        display_tablet="flex"
      />
      <Img
        src="/images/Vector-light.png"
        width="164px"
        height="222px"
        style={{
          position: "absolute",
          left: "4%",
          top: "0%",
          zIndex: "0",
        }}
      />

      <Header
        padding="0 10px"
        padding_tablet="0 18%"
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        position="relative"
      />
      <News
        lang={pageContext.lang}
        limit={content.limit}
        height="50px"
        width="120px"
        justifyContent="evenly"
        padding="20px"
        padding_tablet="20px 40px 70px 40px"
        padding_md="20px 80px 70px 80px"
        padding_lg="20px 0 70px 0"
      />
      <Div
        display="column"
        columns="3"
        columnCount="3"
        gap="24px"
        //style={{ gridAutoFlow: "dense" }}
        padding_xxs="40px 20px"
        padding_tablet="0 40px 60px 40px"
        padding_md="0 80px 60px 80px"
        padding_lg="0 0 60px 0"
        columnCount_xxs="1"
        columnCount_tablet="3"
      >
        {Array.isArray(content.news) &&
          content.news.slice(0, content.limit).map((l, i) => {
            i == 0 ? position = 0 : (position == 2 ? position = 0 : position += 1)
            return (
              <Div
                display="column"
                background={position == 0 ? Colors.white : (position == 1 ? Colors.veryLightBlue : Colors.lightYellow2)}
                padding="17px 16px"
                margin="0 0 27px 0"
                boxShadow="0px 0px 5px 0px #0000001A"
              >
                <GatsbyImage
                  key={i}
                  style={{
                    height: "50px",
                    width: "100%",
                    minWidth: "60px",
                    margin: "0 0 12px 0",
                  }}
                  imgStyle={{
                    objectPosition: "left",
                    width: "150px",
                    objectFit: "contain",
                  }}
                  alt={l.name}
                  image={getImage(
                    l.logo != null && l.logo.childImageSharp.gatsbyImageData
                  )}
                />
                <H3
                  type="h3"
                  textAlign="left"
                  fontSize="28px"
                  lineHeight="34px"
                  margin="12px 0"
                >
                  {l.title}
                </H3>
                <Paragraph
                  textAlign="left"
                  margin="12px 0 0 0"
                  fontSize="13px"
                  lineHeight="22px"
                  letterSpacing="0.05em"
                  fontWeight="300"
                >
                  {l.text}
                </Paragraph>
                <Paragraph
                  style={{ alignItems: "center" }}
                  margin="12px 0"
                  display="flex"
                  fontWeight="700"
                  letterSpacing="0.05em"
                  lineHeight="26px"
                  textAlign="left"
                  fontSize="13px"
                  color={Colors.blue}
                >
                  <Anchor cursor="pointer" to={l.url}>
                    {l.textUrl}
                  </Anchor>
                </Paragraph>
              </Div>
            );
          })}
      </Div>
    </Div>
  );
};
export const query = graphql`
  query PressQuery($file_name: String!, $lang: String!) {
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
          content {
            limit
            heading
            news {
              name
              logo {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    height: 60
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              location
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    height: 277
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              title
              text
              textUrl
              url
            }
          }
        }
      }
    }
    allNewsYaml(filter: { fields: { lang: { eq: $lang } } }) {
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
`;
export default BaseRender(Press);
