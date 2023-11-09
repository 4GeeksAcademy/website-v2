import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import { Button, Colors, Img, StyledBackgroundSection } from "../Styling";
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
  image,
}) => {
  const data = useStaticQuery(graphql`
    {
      allOverlapedYaml {
        edges {
          node {
            heading
            content
            button {
              text
              color
            }
            background
            image {
              src
            }
          }
        }
      }
    }
  `);

  return (
    <Div maxWidth_tablet="1366px" margin_tablet="50px auto">
      <Div
        display_xxs="none"
        display_tablet="flex"
        position="relative"
        justifyContent="center"
        padding_tablet="0 40px"
        padding_md="0 80px"
        padding_lg="0"
        width="100%"
      >
        <Grid
          gridTemplateColumns_lg="1fr repeat(32,1fr) 1fr"
          gridTemplateColumns_md="1fr repeat(24,1fr) 1fr"
          gridTemplateColumns_tablet="1fr repeat(14,1fr) 1fr"
          gridGap="0px"
        >
          <Div
            gridColumn_tablet="1 / 9"
            gridColumn_md="1 / 14"
            gridColumn_lg="1 / 14"
          >
            {image?.src ? (
              <Img src={image?.src} width="33.3em" height="533px" />
            ) : (
              <StyledBackgroundSection
                width_tablet="33.3em"
                height_tablet="533px"
                image={image}
                bgSize="cover"
                alt="geekforce image"
              />
            )}
          </Div>

          <Div
            gridColumn_tablet="9 / 17"
            gridColumn_md="14 / 27"
            gridColumn_lg="14 / 35"
            position="relative"
          >
            <Div width="100%">
              <Img
                src="/images/landing/vector-stroke.png"
                width="114px"
                height="162px"
                style={{
                  position: "absolute",
                  right: "0%",
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
                right: "0%",
                bottom: "0%",
                zIndex: "1",
              }}
            />
          </Div>
        </Grid>

        <Div
          border="3px solid black"
          flexWrap="wrap"
          position="absolute"
          top_tablet="6.5em"
          right_tablet="15%"
          left_tablet="45%"
          top_lg="6.5em"
          right_lg="11%"
          left_lg="50%"
          zIndex="1"
          padding="20px"
          margin_lg="0 0 0 0"
          background={Colors.white}
          boxShadow="20px 15px 0px 0px rgba(0,0,0,1)"
        >
          <H2 textAlign="start" lineHeight_tablet="36px" margin="0 0 12px 0">
            {heading}
          </H2>
          {content && /<\/?[a-z0-9]+>/g.test(content) ? (
            <Paragraph
              textAlign="start"
              margin="12px 0 0 0"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : content ? (
            <Paragraph textAlign="start" margin="12px 0 0 0">
              {content}
            </Paragraph>
          ) : null}

          {button?.text && (
            <Button
              background={button.color}
              color={Colors.white}
              margin="20px 0 0 0"
            >
              {button.text}
            </Button>
          )}
        </Div>
      </Div>

      {/* Version mobile */}

      <Div
        display_xxs="flex"
        display_tablet="none"
        position="relative"
        flexDirection="Column"
        margin_sm="0 auto"
        padding_sm="40px 20px 45% 20px"
        margin_xxs="40px 20px 65% 20px" // Modify the bottom margin if the floating box of the overlapped element overlaps the other component.
        margin_xs="40px 20px 60% 20px"
      >
        {image?.src ? (
          <Img src={image?.src} width="33.3em" height="533px" />
        ) : (
          <StyledBackgroundSection
            width_xxs="280px"
            width_xs="335px"
            width_sm="385px"
            height_xxs="450px"
            image={image}
            //bgSize={`contain`}
            alt="geekforce image"
          />
        )}
        <Img
          src="/images/landing/vector-stroke2.png"
          width="106px"
          height="151px"
          style={{
            position: "absolute",
            left: "10%",
            bottom: "5%",
          }}
        />

        <Img
          src="/images/landing/group-2.png"
          width="49px"
          height="286px"
          style={{
            position: "absolute",
            right: "10%",
            bottom: "5%",
          }}
        />

        <Div
          border="3px solid black"
          flexWrap="wrap"
          position="absolute"
          top="50%"
          zIndex="1"
          padding="20px"
          margin="10px"
          background={Colors.white}
          boxShadow="20px 15px 0px 0px rgba(0,0,0,1)"
        >
          <H2 textAlign="start" lineHeight_xxs="36px" margin="0 0 12px 0">
            {heading}
          </H2>
          {content && /<\/?[a-z0-9]+>/g.test(content) ? (
            <Paragraph
              textAlign="start"
              margin="12px 0 0 0"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : content ? (
            <Paragraph textAlign="start" margin="12px 0 0 0">
              {content}
            </Paragraph>
          ) : null}
          {button?.text && (
            <Button
              width="100%"
              background={button.color}
              color={Colors.white}
              margin="20px 0 0 0"
            >
              {button.text}
            </Button>
          )}
        </Div>
      </Div>
    </Div>
  );
};

export default Overlaped;
