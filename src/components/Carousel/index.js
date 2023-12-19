import React, { useState, useRef, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { H1, H2, H3, H4, Title, Separator, Paragraph } from "../Heading";
import { Anchor, Colors, Button } from "../Styling";
import { Row, GridContainer, Div } from "../Sections";
import Fragment from "../Fragment";
import styled from "styled-components";
import Icon from "../Icon";
import DraggableDiv from "../DraggableDiv";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SessionContext } from "../../session";
import Slider from "react-slick";
import "../../assets/css/carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({
  content,
  flexDirection,
  padding_xxs,
  padding_md,
  padding_lg,
  padding_tablet,
  margin_tablet,
  margin,
  maxWidth,
  customSettings,
  previewArrow,
  nextArrow,
  className,
  children,
}) => {
  const sliderRef = useRef();

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <>
        {nextArrow && (
          <Button
            padding="0"
            padding_xs="0"
            padding_tablet="0"
            position="absolute"
            zIndex="101"
            top="50%"
            right="-2%"
            right_md="0%"
            right_lg="0%"
            right_tablet="0%"
            height="30px"
            width="24px"
            height_tablet="44px"
            onClick={onClick}
          >
            <Icon width="100%" height="100%" icon="arrow-right" />
          </Button>
        )}
      </>
    );
  };
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <>
        {previewArrow && (
          <Button
            padding="0"
            padding_xs="0"
            padding_tablet="0"
            position="absolute"
            zIndex="101"
            top="50%"
            left="-2%"
            left_md="0%"
            left_lg="0%"
            left_tablet="0%"
            height="30px"
            width="24px"
            height_tablet="44px"
            style={{ transform: "rotate(180deg)" }}
            onClick={onClick}
          >
            <Icon width="100%" height="100%" icon="arrow-right" />
          </Button>
        )}
      </>
    );
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    ...customSettings,
  };

  return (
    <Div
      flexDirection="column"
      padding_xxs={padding_xxs || "0px"}
      padding_md={padding_md || "0px"}
      padding_lg={padding_lg || "0px"}
      padding_tablet={padding_tablet || "0px"}
      margin_tablet={margin_tablet || "30px auto"}
      margin={margin || "0 0 36px 0"}
      maxWidth={maxWidth}
    >
      {(content?.heading || content?.content) && (
        <Div
          flexDirection_md="row"
          flexDirection="column"
          alignItems="center"
          gap="32px"
        >
          {content?.heading && (
            <H2 textAlign="left" lineHeight="36px">
              {content?.heading}
            </H2>
          )}

          {content?.content && (
            <Div flexDirection="column" margin="0 0 10px 0">
              {content?.content.split("\n").map((m, i) => (
                <Paragraph
                  key={i}
                  textAlign="left"
                  margin="0 0 0 0"
                  fontSize="15px"
                  lineHeight="20px"
                >
                  {m}
                </Paragraph>
              ))}
            </Div>
          )}
        </Div>
      )}
      <Div className="main-scroll-div" position="relative" display="block">
        <Slider {...settings} ref={sliderRef}>
          {children}
        </Slider>
      </Div>
    </Div>
  );
};

export default Carousel;
