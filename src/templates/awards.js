import React, { useState } from "react";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import Layout from "../global/Layout";
import {
  Grid,
  Div,
  GridContainerWithImage,
  GridContainer,
} from "../components/Sections";
import { H1, H2, H3, Paragraph } from "../components/Heading";
import { Colors, Button, StyledBackgroundSection } from "../components/Styling";
import Badges from "../components/Badges";
import BaseRender from "./_baseLayout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const SVGBubblesLeft = () => (
  <svg
    style={{ top: "85px", left: "0", position: "absolute" }}
    width="321"
    height="433"
    viewBox="0 0 321 433"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="176.5" cy="185.5" r="13.5" fill="#CD0000" />
    <circle cx="16" cy="375" r="58" fill="#FFB718" />
    <circle
      cx="43.5"
      cy="40.5"
      r="8.5"
      transform="rotate(-90 43.5 40.5)"
      fill="#FFB718"
      fillOpacity="0.2"
    />
    <circle
      cx="98.5"
      cy="8.5"
      r="8.5"
      transform="rotate(-90 98.5 8.5)"
      fill="white"
    />
    <circle
      cx="78.5"
      cy="40.5"
      r="8.5"
      transform="rotate(-90 78.5 40.5)"
      fill="black"
    />
    <circle
      cx="133.5"
      cy="8.5"
      r="8.5"
      transform="rotate(-90 133.5 8.5)"
      fill="black"
    />
    <circle
      cx="133.5"
      cy="40.5"
      r="8.5"
      transform="rotate(-90 133.5 40.5)"
      fill="white"
    />
    <circle
      cx="176.5"
      cy="8.5"
      r="8.5"
      transform="rotate(-90 176.5 8.5)"
      fill="white"
    />
    <circle
      cx="176.5"
      cy="40.5"
      r="8.5"
      transform="rotate(-90 176.5 40.5)"
      fill="white"
    />
    <circle
      cx="213.5"
      cy="8.5"
      r="8.5"
      transform="rotate(-90 213.5 8.5)"
      fill="white"
    />
    <circle
      cx="257.5"
      cy="40.5"
      r="8.5"
      transform="rotate(-90 257.5 40.5)"
      fill="#0097CD"
    />
    <circle
      cx="312.5"
      cy="8.5"
      r="8.5"
      transform="rotate(-90 312.5 8.5)"
      fill="white"
    />
  </svg>
);

const SVGBubblesRight = () => (
  <svg
    style={{ right: "0px", position: "absolute", top: "100px" }}
    width="315"
    height="432"
    viewBox="0 0 315 432"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="274" cy="313" r="119" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="14" cy="14" r="14" fill="#FFB718" />
    <circle cx="227.5" cy="45.5" r="26.5" fill="#0097CD" />
    <circle
      cx="269.5"
      cy="131.5"
      r="8.5"
      transform="rotate(90 269.5 131.5)"
      fill="#F5F5F5"
    />
    <circle
      cx="230.5"
      cy="131.5"
      r="8.5"
      transform="rotate(90 230.5 131.5)"
      fill="black"
    />
    <circle
      cx="191.5"
      cy="131.5"
      r="8.5"
      transform="rotate(90 191.5 131.5)"
      fill="#F5F5F5"
    />
    <rect x="78" y="212" width="77" height="11" rx="5.5" fill="black" />
    <rect x="169" y="212" width="119" height="11" rx="5.5" fill="black" />
  </svg>
);

const SVGImage = () => (
  <svg
    width="100%"
    height="284"
    viewBox="0 0 419 284"
    fill="none"
    xmlns="https:://www.w3.org/2000/svg"
  >
    <rect
      x="419"
      y="284"
      width="419"
      height="11"
      rx="5.49998"
      transform="rotate(-180 419 284)"
      fill="#A4A4A4"
    />
    <rect
      x="133"
      y="257"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 133 257)"
      fill="#A4A4A4"
    />
    <rect
      x="276"
      y="257"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 276 257)"
      fill="#A4A4A4"
    />
    <rect
      x="133"
      y="229"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 133 229)"
      fill="#A4A4A4"
    />
    <rect
      x="276"
      y="229"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 276 229)"
      fill="#A4A4A4"
    />
    <rect
      x="276"
      y="199"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 276 199)"
      fill="#A4A4A4"
    />
    <rect
      x="419"
      y="257"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 419 257)"
      fill="#A4A4A4"
    />
    <circle cx="209.5" cy="81.5" r="58.5" fill="#FFB718" />
    <circle cx="238.5" cy="23.5" r="23.5" fill="#0097CD" />
    <circle cx="336.5" cy="81.5" r="8.5" fill="#C7F3FD" />
    <circle cx="368.5" cy="136.5" r="8.5" fill="#C7F3FD" />
    <circle cx="336.5" cy="116.5" r="8.5" fill="black" />
    <circle cx="368.5" cy="171.5" r="8.5" fill="black" />
    <circle cx="336.5" cy="171.5" r="8.5" fill="#C7F3FD" />
    <circle cx="368.5" cy="214.5" r="8.5" fill="#C7F3FD" />
    <circle
      cx="368.5"
      cy="100.5"
      r="8.5"
      transform="rotate(90 368.5 100.5)"
      fill="#C7F3FD"
    />
    <circle cx="336.5" cy="214.5" r="8.5" fill="#C7F3FD" />
    <circle cx="14" cy="122" r="14" fill="#FFB718" />
    <circle
      cx="95.5"
      cy="81.5"
      r="8.5"
      transform="rotate(90 95.5 81.5)"
      fill="#C7F3FD"
    />
    <rect
      x="74"
      y="119"
      width="77"
      height="11"
      rx="5.5"
      transform="rotate(90 74 119)"
      fill="black"
    />
    <circle cx="53.5" cy="67.5" r="13.5" fill="#CD0000" />
    <path
      d="M206.902 129.5C208.057 127.5 210.943 127.5 212.098 129.5L232.45 164.75C233.604 166.75 232.161 169.25 229.852 169.25H189.148C186.839 169.25 185.396 166.75 186.55 164.75L206.902 129.5Z"
      fill="#CD0000"
    />
    <path
      d="M184.5 147.5L156.5 153.5V132.5L134 121.5L142 104.5L124 85.5L138.5 68.5L124 54.5L148.5 41"
      stroke="#FFB718"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M236 148.027L263.769 154V133.093L286.083 122.142L278.149 105.218L296 86.3022L281.62 69.3778L296 55.44L271.702 42"
      stroke="#FFB718"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const Awards = ({ data, pageContext, yml }) => {
  return (
    <>
      <Div
        display="none"
        position="absolute"
        width="100%"
        zIndex="0"
        display_tablet="flex"
      >
        <SVGBubblesLeft />
        <SVGBubblesRight />
      </Div>
      <GridContainer
        padding_tablet="80px 0"
        padding="60px 17px 80px 17px"
        background="rgba(199, 243, 253, 0.5)"
        margin="60px 0 0 0"
      >
        <Div
          // gridColumn_tablet="1 / 6"
          flexDirection="column"
          justifyContent_tablet="start"
          padding_tablet="60px 0"
        >
          <H1
            type="h1"
            textAlign_tablet="center"
            margin="0 0 11px 0"
            color="#606060"
          >
            {yml.seo_title}
          </H1>
          <H2
            type="h2"
            fontSize="40px"
            fontSize_tablet="50px"
            textAlign_tablet="center"
            lineHeight="60px"
          >{`${yml.header.title}`}</H2>
          <Paragraph
            textAlign_tablet="center"
            padding_tablet="0 28%"
            margin="26px 0"
          >
            {yml.header.paragraph}{" "}
          </Paragraph>
        </Div>
        <Div
          display="flex"
          alignItems="center"
          justifyContent="center"
          display_tablet="none"
          height="auto"
          width="100%"
        >
          <SVGImage />
        </Div>
      </GridContainer>
      <Badges
        lang={pageContext.lang}
        background={Colors.lightYellow}
        padding="60px 0"
        padding_tablet="68px 0"
        margin="0 0 58px 0"
        margin_tablet="0 0 78px 0"
      />
      <GridContainer
        padding="17px"
        columns="1"
        rows="1"
        columns_tablet="12"
        gridGap_tablet="11px"
        gridGap="0"
      >
        <Div gridArea_tablet="1/1/1/13" flexDirection="column">
          {Array.isArray(yml.awards_list) &&
            yml.awards_list.map((m, i) => {
              console.log("m", m);
              return (
                <Div
                  key={i}
                  flexDirection="column"
                  flexDirection_tablet="row"
                  margin="0 0 75px 0"
                >
                  <GatsbyImage
                    style={{
                      height: "85px",
                      minWidth: "150px",
                      margin: "0 24px",
                    }}
                    imgStyle={{ objectFit: "contain" }}
                    loading="eager"
                    alt={m.title}
                    image={getImage(m.image.childImageSharp.gatsbyImageData)}
                  />
                  <Div flexDirection="column" width="100%">
                    <H3
                      textAlign_tablet="left"
                      margin="49px 0 0 "
                      margin_tablet="0"
                    >
                      {m.title}
                    </H3>
                    <Div
                      background="#c4c4c4"
                      height=".5px"
                      margin="35px 0 25px 0"
                      width="100%"
                    />
                    {m.paragraph.split("\n").map((p, i) => (
                      <Paragraph
                        textAlign_tablet="left"
                        margin="10px 0"
                        key={i}
                        dangerouslySetInnerHTML={{ __html: p }}
                      ></Paragraph>
                    ))}
                  </Div>
                </Div>
              );
            })}
        </Div>
      </GridContainer>
    </>
  );
};
export const query = graphql`
  query AwardsQuery($file_name: String!, $lang: String!) {
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
          badges {
            paragraph
          }
          awards_list {
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  breakpoints: [200, 340, 520, 890]
                )
                #   fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                #     ...GatsbyImageSharpFluid_withWebp_noBase64 # Without Blur effect
                # }
              }
            }
            title
            paragraph
          }
        }
      }
    }
  }
`;
export default BaseRender(Awards);
