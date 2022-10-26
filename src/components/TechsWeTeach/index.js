import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import {
  GridContainer,
  GridContainerWithImage,
  Column,
  Divider,
  Grid,
  Div,
} from "../Sections";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  Title,
  Separator,
  Span,
  Paragraph,
} from "../Heading";
import { Colors, StyledBackgroundSection, Anchor } from "../Styling";
import Icon from "../Icon";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Marquee_v2 from "../Marquee_v2";

const TechsWeTeach = ({ lang, data }) => {
  let content = data.edges[0].node;

  return (
    <>
      <GridContainerWithImage
        imageSide="right"
        columns_tablet="2"
        background={Colors.lightYellow}
      >
        <Div
          flexDirection="column"
          padding="36px 0 0 0"
          padding_md="84px 0 0 0"
        >
          <H3 textAlign="left" margin="0 0 20px 0">
            {content.title}
          </H3>
          {content.sub_title.split("\n").map((m, i) => (
            <Paragraph
              key={i}
              textAlign="left"
              margin="10px 0 "
              fontSize="15px"
              lineHeight="26px"
            >
              {m}
            </Paragraph>
          ))}
          {content.button && (
            <Anchor to={content.button.url} color={Colors.blue}>
              {content.button.label}
            </Anchor>
          )}
        </Div>
        <Div padding="20px 0 0 0" padding_md="45px 0 0 0">
          <StyledBackgroundSection
            // className={`image`}
            height={`289px`}
            width={`100%`}
            image={content.image.childImageSharp.gatsbyImageData}
            bgSize={`contain`}
            alt="Tech Logo"
            borderRadius={`0 0 0 3px`}
          />
        </Div>

        {/* ?icons */}
      </GridContainerWithImage>
      <GridContainer
        fluid
        background={Colors.lightYellow}
        margin_tablet="0 0 68px 0"
        margin="0 0 35px 0"
      >
        <Marquee_v2
          speed={1.5}
          reversed={false}
          containerstyle={{ height: "160px" }}
        >
          <Div
            className="badge-slider"
            justifyContent="center"
            padding="44px 0"
            style={{ borderTop: `1px solid ${Colors.lightGray}` }}
          >
            {/* <> */}
            {Array.isArray(content.tech_list) &&
              content.tech_list.map((l, i) => {
                return (
                  <GatsbyImage
                    key={i}
                    draggable={false}
                    style={{
                      height: "40px",
                      minWidth: "40px",
                      margin: "0 25px",
                    }}
                    imgStyle={{ objectFit: "contain" }}
                    alt={l.alt}
                    // fluid={l.image != null && l.image.childImageSharp.fluid}
                    image={getImage(
                      l.image != null && l.image.childImageSharp.gatsbyImageData
                    )}
                  />
                );
              })}
            {/* </> */}
          </Div>
        </Marquee_v2>
      </GridContainer>
    </>
  );
};

export default TechsWeTeach;
