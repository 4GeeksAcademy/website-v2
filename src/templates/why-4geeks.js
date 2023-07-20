import React from "react";
import { graphql } from "gatsby";
import {
  GridContainerWithImage,
  GridContainer,
  Div,
  Grid,
  Header,
} from "../components/Sections";
import { Title, H1, H2, H3, H4, Paragraph } from "../components/Heading";
import { Colors, StyledBackgroundSection } from "../components/Styling";
import { isCustomBarActive } from "../actions";
import Badges from "../components/Badges";
import With4Geeks from "../components/With4Geeks";
import Credentials from "../components/Credentials";
import GeeksVsOthers from "../components/GeeksVsOthers";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session.js";
import Staff from "../components/Staff";

const RedPin = ({ style }) => (
  <svg
    width="8"
    height="16"
    style={style}
    viewBox="0 0 8 16"
    fill="none"
    xmlns="https:://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="12" r="4" fill="#CD0000" />
    <path d="M7 3.04545L4 1V5.09091L7 3.04545Z" fill="#CD0000" />
    <path d="M4 10V5.09091M4 5.09091V1L7 3.04545L4 5.09091Z" stroke="#CD0000" />
  </svg>
);

const Why4Geeks = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  return (
    <>
      <GridContainerWithImage
        background="rgba(199, 243, 253, 0.5)"
        padding="24px 0 "
        padding_tablet="36px 40px 54px 0"
        columns_tablet="14"
        margin={isCustomBarActive(session) ? "120px 0 24px 0" : "70px 0 24px 0"}
      >
        <Div
          flexDirection="column"
          justifyContent_tablet="start"
          padding_tablet="70px 0 0 0"
          gridColumn_tablet="1 / 7"
        >
          <H1 textAlign_tablet="left" margin="0 0 11px 0" color="#606060">
            {yml.seo_title}
          </H1>
          <H2
            textAlign_tablet="left"
            fontSize="50px"
            lineHeight="60px"
          >{`${yml.header.title}`}</H2>
          <Paragraph textAlign_tablet="left" margin="26px 0">
            {yml.header.paragraph}{" "}
          </Paragraph>
        </Div>
        <Div
          display="none"
          display_tablet="flex"
          height="auto"
          width="100%"
          gridColumn_tablet="8 / 15"
          style={{ position: "relative" }}
        >
          <StyledBackgroundSection
            height="450px"
            width="100%"
            image={
              yml.header.image &&
              yml.header.image.childImageSharp.gatsbyImageData
            }
            bgSize={`contain`}
            alt={yml.header.alt}
          />
        </Div>
      </GridContainerWithImage>
      <Badges
        lang={pageContext.lang}
        paragraph={yml.badges.paragraph}
        link
        padding="58px 17px"
        padding_tablet="70px 0"
      />
      <GridContainer
        display="none"
        display_tablet="grid"
        fluid
        margin_tablet="0 0 101px 0"
        background={Colors.verylightGray}
        padding="30px 17px"
        padding_tablet="65px 17px 80px 17px"
      >
        <GridContainer columns_tablet="12" margin_tablet="0 0 30px 0">
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            gridColumn_tablet="3 /11"
          >
            <H2 margin="0 0 15px 0">{yml.community_banner.title}</H2>
            <Paragraph>{yml.community_banner.paragraph}</Paragraph>
          </Div>
        </GridContainer>
        <Div display="none" display_tablet="flex">
          <StyledBackgroundSection
            height="500px"
            width="100%"
            image={
              yml.community_banner.image &&
              yml.community_banner.image.childImageSharp.gatsbyImageData
            }
            bgSize={`contain`}
            alt={yml.community_banner.image_alt}
          />
        </Div>
        <GridContainer
          columns_tablet="12"
          margin_tablet="0 0 69px 0"
          display="none"
          display_tablet="grid"
        >
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            gridColumn_tablet="3 /11"
          >
            <Paragraph>
              <RedPin style={{ margin: "0 10px 0 0 " }} />
              {yml.community_banner.image_paragraph}
            </Paragraph>
          </Div>
        </GridContainer>
        <GridContainer columns_tablet={yml.community_banner.list.length}>
          {yml.community_banner.list.map((m, i) => {
            return (
              <Div
                key={i}
                display="flex"
                flexDirection="column"
                alignItems="center"
                borderRight={
                  i < yml.community_banner.list.length - 1 &&
                  "1px solid #C4C4C4"
                }
              >
                <H4
                  fontWeight="900"
                  lineHeight="19px"
                  textTransform="uppercase"
                >
                  {m.title}
                </H4>
              </Div>
            );
          })}
        </GridContainer>
      </GridContainer>
      <With4Geeks
        lang={pageContext.lang}
        playerHeight="125px"
        sessionLocation={
          session &&
          session.location &&
          session.location.breathecode_location_slug
        }
      />
      <Credentials lang={data.allCredentialsYaml.edges} shadow={false} />
      <GeeksVsOthers
        lang={pageContext.lang}
        link={true}
        limit={4}
        title={yml.geeksvsothers.title}
        paragraph={yml.geeksvsothers.paragraph}
      />

      <GridContainerWithImage
        height_tablet="100%"
        background="#E3F9FE"
        padding="36px 17px"
        padding_tablet="36px 0 54px 0"
        columns_tablet="14"
        margin="0 0 36px 0"
        margin_tablet="0 0 75px 0"
      >
        <Div
          flexDirection="column"
          justifyContent_tablet="start"
          padding_tablet="70px 0 0 0"
          gridColumn_tablet="2 / 8"
        >
          <H2
            textAlign_tablet="left"
            fontSize="50px"
            lineHeight="60px"
          >{`${yml.python_banner.title}`}</H2>
          {/* <Paragraph textAlign_tablet="left" margin="26px 0">{yml.python_banner.paragraph} </Paragraph> */}
          {yml.python_banner.paragraph.split("\n").map((p, i) => (
            <Paragraph textAlign_tablet="left" margin="26px 0" key={i}>
              {p}
            </Paragraph>
          ))}
        </Div>
        <Div
          display_tablet="flex"
          height="auto"
          width="100%"
          gridColumn_tablet="8 / 15"
          style={{ position: "relative" }}
        >
          <StyledBackgroundSection
            height_tablet="450px"
            height="200px"
            width="100%"
            image={
              yml.python_banner.image &&
              yml.python_banner.image.childImageSharp.gatsbyImageData
            }
            bgSize={`contain`}
            alt={yml.python_banner.image_alt}
          />
        </Div>
        {/* <Div height="auto" width="100%" gridColumn_tablet="9 / 15">
                    <StyledBackgroundSection
                        height="300px"
                        width="100%"
                        image={yml.python_banner.image && yml.python_banner.image.childImageSharp.gatsbyImageData}
                        bgSize={`contain`}
                        alt={yml.python_banner.image_alt}
                    />
                </Div> */}
      </GridContainerWithImage>
      <Staff lang={pageContext.lang} />
    </>
  );
};

export const query = graphql`
  query Why4GeeksQuery($file_name: String!, $lang: String!) {
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
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
          }
          badges {
            paragraph
          }
          community_banner {
            title
            paragraph
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
            image_alt
            image_paragraph
            list {
              title
            }
          }
          geeksvsothers {
            title
            paragraph
          }
          python_banner {
            title
            paragraph
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
            image_alt
          }
        }
      }
    }
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          credentials {
            title
            icon
            value
          }
        }
      }
    }
  }
`;

export default BaseRender(Why4Geeks);
