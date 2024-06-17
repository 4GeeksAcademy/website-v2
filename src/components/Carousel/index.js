import React, { useRef } from "react";
import { H2, Paragraph } from "../Heading";
import { Button } from "../Styling";
import { Div } from "../Sections";
import Icon from "../Icon";
import Slider from "react-slick";
import "../../assets/css/carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomNextArrow = ({ nextArrow, ...props }) => {
  const { className, style, onClick } = props;

  if (typeof nextArrow === "function") return nextArrow({ onClick });
  return (
    <>
      {nextArrow && (
        <Button
          padding="0"
          padding_xs="0"
          padding_tablet="0"
          position="absolute"
          zIndex="9"
          top="50%"
          right="1%"
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

const CustomPrevArrow = ({ previousArrow, ...props }) => {
  const { className, style, onClick } = props;

  if (typeof previousArrow === "function") return previousArrow({ onClick });

  return (
    <>
      {previousArrow && (
        <Button
          padding="0"
          padding_xs="0"
          padding_tablet="0"
          position="absolute"
          zIndex="9"
          top="50%"
          left="1%"
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
  settings,
  previousArrow,
  nextArrow,
  className,
  children,
  ...rest
}) => {
  const sliderRef = useRef();

  const customSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    nextArrow: <CustomNextArrow nextArrow={nextArrow} />,
    prevArrow: <CustomPrevArrow previousArrow={previousArrow} />,
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
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
    ...settings,
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
      {...rest}
    >
      {(content?.heading || content?.content) && (
        <Div
          flexDirection="column"
          alignItems="center"
          gap="32px"
          margin="0 0 30px 0"
        >
          {content?.heading && (
            <H2 lineHeight="36px" {...content.headingProps}>
              {content?.heading}
            </H2>
          )}

          {content?.content && (
            <Div flexDirection="column" margin="0 0 10px 0">
              <Paragraph
                margin="0 0 0 0"
                fontSize="16px"
                lineHeight="20px"
                dangerouslySetInnerHTML={{ __html: content.content }}
                {...content.contentProps}
              />
            </Div>
          )}
        </Div>
      )}
      <Div className="main-scroll-div" position="relative" display="block">
        <Slider {...customSettings} ref={sliderRef}>
          {children}
        </Slider>
      </Div>
    </Div>
  );
};

export default Carousel;
