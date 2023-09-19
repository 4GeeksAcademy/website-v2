import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import { Button, Colors, Img } from "../Styling";
import { Grid, Div } from "../Sections";
import { H4, H3, H2, H1, Paragraph } from "../Heading";
import Icon from "../Icon";
import { DirectiveLocation } from "graphql";

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
      maxWidth_tablet="1366px"
      margin_tablet="100px auto"
    >
      <Div
        display_xss="none"
        display_tablet="flex"
        position="relative"
        justifyContent="center"
        margin_tablet="auto"
      >
        <Grid
          gridTemplateColumns_tablet="1fr repeat(14, 1fr) 1fr"
          gridGap="0px"
        >
          <Div
            gridColumn="2 / 9"
          >
            <Img
              src={image.src}
              width="33.3em"
              height="533px"
            />
          </Div>

          <Div
            gridColumn="9 / 16"
            position="relative"
          >
            <Div width="100%" >
              <Img
                src="/images/landing/vector-stroke.png"
                width="114px"
                height="162px"
                style={{
                  position: "absolute",
                  right: "3.7em",
                  top: "20px",
                }}
              />
              <Img
                src="/images/landing/vector-stroke1.png"
                width="70px"
                height="181px"
                style={{
                  position: "absolute",
                  right: "11.25em",
                  top: "20px",
                }}
              />
              <Img
                src="/images/landing/vector-stroke2.png"
                width="106px"
                height="151px"
                style={{
                  position: "absolute",
                  left: "0%",
                  bottom: "0.8em",
                }}
              />
            </Div>

            <Img
              src="/images/landing/group-2.png"
              width="49px"
              height="286px"
              style={{
                position: "absolute",
                right: "5%",
                bottom: "0%",
                zIndex: "1"
              }}
            />

          </Div>

        </Grid>

        <Div
          border="3px solid black"
          flexWrap="wrap"
          position="absolute"
          top="6.5em"
          right="15%"
          left="45%"
          zIndex="1"
          padding="20px"
          background={Colors.white}
          boxShadow="20px 15px 0px 0px rgba(0,0,0,1)"
        >
          <H2
            textAlign="start"
            lineHeight_tablet="36px"
            margin="0 0 12px 0"
          >
            {heading}
          </H2>
          {
            content && /<\/?[a-z0-9]+>/g.test(content) ?
            <Paragraph 
              textAlign="start" 
              margin="12px 0 0 0"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            : 
            <Paragraph 
              textAlign="start" 
              margin="12px 0 0 0"
            >
            {content}
            </Paragraph>
          }

          {
            button &&
            <Button 
              background={button.color}
              color={Colors.white}
              margin="12px 0 0 0"
              >
              {button.text}
            </Button>
          }
        </Div>
      </Div>



      {/* Version mobile */}



      <Div
        display_xss="flex"
        display_tablet="none"
        position="relative"
        flexDirection="Column"
        margin="0 auto 30% auto"
      >
        {/* <Div
          width="100%"
        > */}
        <Img
          src={image.src}
          width="23.43em"
          height="533px"
          backgroundSize="contain"
        />
        {/* </Div> */}

        <Img
          src="/images/landing/vector-stroke2.png"
          width="106px"
          height="151px"
          style={{
            position: "absolute",
            left: "5%",
            bottom: "-30%",
          }}
        />

        <Img
          src="/images/landing/group-2.png"
          width="49px"
          height="286px"
          style={{
            position: "absolute",
            right: "14%",
            bottom: "-25%",
            zIndex: "1"
          }}
        />

        <Div
          border="3px solid black"
          flexWrap="wrap"
          position="absolute"
          top="60%"
          zIndex="1"
          padding="20px"
          margin="10px"
          background={Colors.white}
          boxShadow="20px 15px 0px 0px rgba(0,0,0,1)"
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

    </Div >
  );
};

export default Overlaped;