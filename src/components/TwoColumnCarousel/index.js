import React, { useRef } from "react";
import { Div } from "../Sections";
import { H2, Paragraph, SubTitle } from "../Heading";
import Icon from "../Icon";
import CarouselV2 from "../CarouselV2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TwoColumnCarousel = ({
  title,
  text,
  background,
  children,
  settings,
  carouselProps,
}) => {
  const sliderRef = useRef();

  const customSettings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [],
    ...settings,
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
            <H2 textAlign="left" margin="0 0 10px 0">
              {title}
            </H2>
            <SubTitle
              textAlign="left"
              fontFamily="Archivo"
            >
              {text}
            </SubTitle>
          </Div>
          <Icon icon="longarrow-right" />
        </Div>
        <Div
          display="block"
          width="100%"
          maxWidth="1020px"
          padding="0 0 20px 0"
          padding_tablet="0"
        >
          {/* <Slider {...customSettings} ref={sliderRef}>
            {children}
          </Slider> */}
          <CarouselV2
            width="100%"
            settings={customSettings}
            carouselProps={carouselProps}
          >
            {children}
          </CarouselV2>
        </Div>
      </Div>
    </Div>
  );
};

export default TwoColumnCarousel;
