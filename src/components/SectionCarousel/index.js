import React from "react";
import { Button } from "../Styling";
import { Div } from "../Sections";
import Icon from "../Icon";
import Carousel from "../Carousel";

const SectionCarousel = ({ heading, content, children, customSettings, headingProps, contentProps, ...rest }) => {

  return (
    <Div
      position="relative"
      display="block"
      {...rest}
    >
      <Carousel
        maxWidth="1280px"
        content={{
          heading,
          content,
          headingProps,
          contentProps,
        }}
        customSettings={{
          dotsClass: "slick-dots-staff",
          slidesToShow: 5,
          infinite: true,
          slidesToScroll: 5,
          ...customSettings,
        }}
        nextArrow={({ onClick }) => (
          <Button
            padding="0"
            padding_xs="0"
            padding_tablet="0"
            position="absolute"
            zIndex="9"
            bottom="-40px"
            right="1%"
            right_md="0%"
            right_lg="0%"
            right_tablet="0%"
            width="20px"
            onClick={onClick}
            style={{ height: "25px" }}
          >
            <Icon width="100%" height="100%" icon="arrow-right" />
          </Button>
        )}
        previousArrow={({ onClick }) => (
          <Button
            padding="0"
            padding_xs="0"
            padding_tablet="0"
            position="absolute"
            zIndex="9"
            bottom="-40px"
            left="1%"
            left_md="0%"
            left_lg="0%"
            left_tablet="0%"
            width="20px"
            onClick={onClick}
            style={{ height: "25px", transform: "rotate(180deg)" }}
          >
            <Icon width="100%" height="100%" icon="arrow-right" />
          </Button>
        )}
      >
        {children}
      </Carousel>
    </Div>
  );
};

export default SectionCarousel;
