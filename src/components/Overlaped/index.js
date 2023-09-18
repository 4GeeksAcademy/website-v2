import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import { Button, Colors, Img } from "../Styling";
import { Grid, Div } from "../Sections";
import { H4, H3, H2, H1, Paragraph } from "../Heading";
import Icon from "../Icon";

const Overlaped = ({
  lang,
  landingTemplate,
  heading,
  content,
  button,
  background,
  image
}) => {

  const data = useStaticQuery(graphql`
    {
      allOverlapedYaml{
        edges{
          node{
            heading
            content
            button{
              text
              color
            }
            background
            image{
              src
            }
          }
        }
      }
    }
  `);

  return (
    <Div
      position="relative"
    >
      <Grid
        gridTemplateColumns="1fr repeat(14, 1fr) 1fr"
      >
        <Div
          gridColumn_tablet="2 / 8"
        >
          <Img
            src={image.src}
            width="100%"
            height="533px"
          />
        </Div>

        <Div
          gridColumn_tablet="8 / 14"
          position="relative"
          alignItems="flex-end"
        >

          <Img
            src="/images/landing/group-1.png"
            width="528px"
            height="533px"
          />
          <Img
            src="/images/landing/group-2.png"
            width="43px"
            height="286px"
            position="absolute"
            zIndex="1"
          />

        </Div>

      </Grid>

      <Div
        border="3px solid black"
        flexWrap="wrap"
        position="absolute"
        top="100px"
        left="40%"
        right="20%"
        zIndex="1"
        padding="20px"
        background={Colors.white}
      >
        <H2 
          textAlign="start" 
          lineHeight_tablet="36px"
          margin="0 0 12px 0"
         >
          {heading}
        </H2>
        <Paragraph textAlign="start" margin="12px 0 0 0">
          {content}
        </Paragraph>
      </Div>
    </Div>
  );


};

export default Overlaped;