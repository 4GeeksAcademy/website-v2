import React, { useRef } from "react";
import { Div } from "../Sections";
import { H3, Paragraph } from "../Heading";
import Icon from "../Icon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TwoColumnCarousel = ({ title, text, background, children }) => {

  const sliderRef = useRef();

  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Div background={background}>
      <Div
        padding="30px"
        padding_tablet="80px 130px"
        padding_lg="80px 0px"
        margin="auto"
        width="100%"
        maxWidth="1280px"
        gap="10px"
        display="block"
        display_tablet="flex"
        justifyContent="center"
      >
        <Div
          height_md="299px"
          flexDirection="column"
          justifyContent_md="between"
          width_tablet="300px"
          width_md="395px"
          width_lg="450px"
          gap="10px"
          margin="0 0 15px 0"
          margin_tablet="0"
        >
          <Div display="block">
            <H3 textAlign="left" margin="0 0 10px 0">
              {title}
            </H3>
            <Paragraph
              color="#000"
              opacity="1"
              textAlign="left"
              fontSize="18px"
            >
              {text}
            </Paragraph>
          </Div>
          <Icon icon="longarrow-right" />
        </Div>
        <Div display="block" width="100%" maxWidth="1020px">
          <Slider {...settings} ref={sliderRef}>
            {children}
          </Slider>
        </Div>
      </Div>
    </Div>
  );
};

export default TwoColumnCarousel;
