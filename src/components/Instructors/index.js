import React, { useState } from "react";
import { GridContainer, GridContainerWithImage, Div, Grid } from "../Sections";
import PropTypes from "prop-types";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Img, Colors, StyledBackgroundSection, Span } from "../Styling";
import Icon from "../Icon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Instructors = ({
  lang,
  showThumbs,
  limit,
  playerHeight,
  title,
  paragraph,
}) => {
  const [instructors, setInstructors] = useState(
    lang.instructors?.slice(0, limit || lang.instructors?.length)
  );
  // const [value, setValue] = useState(0);

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          fontSize: "30px",
          background: "black",
          right: "120px",
          zIndex: 99,
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  };
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          fontSize: "30px",
          background: "black",
          left: "120px",
          zIndex: 99,
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <GridContainer
      display="block"
      display_tablet="grid"
      displayChild="block"
      displayChild_tablet="block"
      style={{ display: "block" }}
      background={Colors.verylightGray}
      padding="73px 0 60px 0"
      padding_tablet="73px 0 60px 0"
    >
      <Div display="flex" flexDirection="column" alignItems="center">
        {/* <H1 type="h1">{lang[0].node.seo_title}</H1> */}
        <H2
          type="h2"
          fontSize="15px"
          lineHeight="19px"
          padding="0 0 35px 0"
          letterSpacing="0.05em"
          margin="0 0 15px 0"
          fontWeight="900"
        >
          {lang.header.title.toUpperCase()}
        </H2>
        <Paragraph>{lang.header.paragraph}</Paragraph>
      </Div>

      {instructors?.length >= 1 ? (
        <Slider {...settings}>
          {instructors?.map((item, index) => {
            return (
              <Div
                className="instructor-container"
                display="block"
                // width="70%"
                // margin="auto"
                padding="0 25%"
              >
                <Div
                  className="instructor-presentation"
                  background="#FAF9E3"
                  padding="10px"
                >
                  <StyledBackgroundSection
                    image={item.image.childImageSharp.gatsbyImageData}
                    // borderRadius={"1.25rem"}
                    // className="pointer"
                    alt={"4Geeks Academy Section"}
                    margin="0 10px 0 0"
                    borderRadius="12px"
                    width="140px"
                    height="140px"
                    backgroundSize="contain"
                    flexShrink="0"
                  />
                  <Div
                    className="instructor-header"
                    display="block"
                  >
                    <H3
                      type="h3"
                      textAlign="left"
                    >
                      {item.name}
                    </H3>
                    <Paragraph
                      // width="90%"
                      fontSize="15px"
                      textAlign="left"
                      fontWeight="bold"
                      // padding="0 0 26px 0"
                    >
                      {item.sub_title.toUpperCase()}
                    </Paragraph>
                  </Div>
                </Div>
                 
              {/*
              <GridContainerWithImage
                background={Colors.verylightGray}
                imageSide="left"
                columns_tablet="14"
                gridGap_tablet="0"
                padding_tablet="0 0 36px 0"
                padding="0 0 50px 0"
              >
                <Div
                  height_tablet="auto"
                  padding="0"
                  padding_tablet="17px 51px"
                  gridColumn_tablet="1 / 8"
                >
                  <StyledBackgroundSection
                    height={`300px`}
                    width={`400px`}
                    image={item.image.childImageSharp.gatsbyImageData}
                    bgSize={`cover`}
                    alt="Cnn Logo"
                  />
                </Div>
                <Div
                  alignSelf="center"
                  alignSelf_tablet="flex-start"
                  flexDirection="column"
                  gridColumn_tablet="8 / 15 "
                >
                  <H3
                    width="85%"
                    width_tablet="100%"
                    alignSelf="center"
                    alignSelf_tablet="inherit"
                    type="h3"
                    textAlign="left"
                    margin={`10px 0`}
                  >
                    {`> ${item.name}`}
                  </H3>
                  <H4
                    width="85%"
                    width_tablet="100%"
                    alignSelf="center"
                    alignSelf_tablet="inherit"
                    fontSize="15px"
                    type="h4"
                    textAlign="left"
                    fontWeight="bold"
                    padding="0 0 26px 0"
                  >
                    {`${item.sub_title.toUpperCase()}`}
                  </H4>

                  <Paragraph
                    margin_tablet="0"
                    margin=""
                    alignSelf="center"
                    alignSelf_tablet="inherit"
                    textAlign="center"
                    lineHeight="26px"
                    width="90%"
                    width_tablet="100%"
                    padding="0 40px 0 0"
                    padding_tablet="0"
                    color={Colors.black}
                    textAlign_tablet="left"
                  >
                    {item.bio}
                  </Paragraph>
                  <Div
                    flexDirection="column"
                    margin="40px 35px 0"
                    margin_tablet="40px 0 0 0"
                  >
                    {item.github != "" && (
                      <a
                        target="_blank"
                        href={item.github}
                        rel="noopener noreferrer nofollow"
                        style={{ width: "fit-content" }}
                      >
                        <Icon
                          icon="github"
                          width="22"
                          color={Colors.black}
                          fill={Colors.black}
                        />
                      </a>
                    )}
                    {item.linkedin != "" && (
                      <a
                        target="_blank"
                        href={item.linkedin}
                        rel="noopener noreferrer nofollow"
                        style={{ width: "fit-content" }}
                      >
                        <Icon
                          icon="linkedin"
                          width="22"
                          color={Colors.blue}
                          fill={Colors.blue}
                        />
                      </a>
                    )}
                  </Div>
                </Div>
              </GridContainerWithImage>
              */}
              </Div>
            );
          })}
        </Slider>
      ) : (
        <H4
          fontSize="15px"
          type="h4"
          textAlign="left"
          fontWeight="bold"
          padding="0 0 26px 0"
          textAlign="center"
        >
          At the moment there is no instructor for this course.
        </H4>
      )}
    </GridContainer>
  );
};
Instructors.propTypes = {
  limit: PropTypes.number,
};
Instructors.defaultProps = {
  limit: 0,
  playerHeight: "100%",
};
export default Instructors;
