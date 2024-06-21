import React from "react";
import { graphql } from "gatsby";
import BaseRender from "./_baseLayout";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";
// components
import News from "../components/News";
import TestimonialCard from "../components/TestimonialCard";
import {
  Colors,
  Img,
} from "../components/Styling";
import { Div, Header } from "../components/Sections";

const Press = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  let content = data.allPageYaml.edges[0].node.content;
  let position = 0;
  return (
    <Div
      margin={
        isCustomBarActive(session)
          ? "120px auto 75px auto"
          : "90px auto 75px auto"
      }
      flexDirection="column"
      maxWidth="1280px"
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
        //margin={isCustomBarActive(session) ? "120px auto 0 auto" : "90px auto 0 auto"}
        margin="0"
        paragraphMargin="26px 20px"
        paragraphMargin_Tablet="26px 22%"
        paddingParagraph_tablet="0 40px"
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        padding_xxs="40px 20px"
        padding_md="40px 80px"
        padding_lg="40px 0px"
        padding_tablet="40px 40px"
        position="relative"
        fontSize_title="40px"
        fontSizeTitle_tablet="60px"
        fontFamily_title="Archivo-Black"
        fontSize_paragraph="21px"
        gridTemplateColumns_tablet="repeat(14, 1fr)"
        maxWidth="1280px"
        uppercase
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
        gap_tablet="24px"
        //style={{ gridAutoFlow: "dense" }}
        padding_xxs="40px 20px"
        padding_tablet="0 40px 60px 40px"
        padding_md="0 80px 60px 80px"
        padding_lg="0 0 60px 0"
        columnCount_xxs="1"
        columnCount_tablet="3"
        height="auto"
      >
        {Array.isArray(content.news) &&
          content.news.slice(0, content.limit).map((l, i) => {
            i == 0
              ? (position = 0)
              : position == 2
              ? (position = 0)
              : (position += 1);
            return (
              <TestimonialCard
                key={i}
                background={
                  position == 0
                    ? Colors.white
                    : position == 1
                    ? Colors.veryLightBlue
                    : Colors.lightYellow2
                }
                image={l.logo && l.logo}
                imgStyle={{
                  objectPosition: "left",
                  objectFit: "contain",
                  height: "40px",
                  width: "150px",
                  minWidth: "60px",
                  margin: "0 0 0 0",
                }}
                name={l.title}
                textUrl={l.textUrl}
                url={l.url}
                location={l.location}
                //short_content={l.text}
                description={l.text}
                starRating={false}
              />
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
