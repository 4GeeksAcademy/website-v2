import React, { useState, useRef } from "react";
import { GridContainer, GridContainerWithImage, Div, Grid } from "../Sections";
import PropTypes from "prop-types";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Img, Colors, StyledBackgroundSection, Button } from "../Styling";
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

  const about = {
    'us': 'ABOUT',
    'es': 'ACERCA DE'
  }

  const sliderRef = useRef();

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
      position="relative"
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
      <Button
        variant="empty"
        padding="0"
        padding_xs="0"
        padding_tablet="0"
        position="absolute"
        zIndex="99"
        top="50%"
        left="5%"
        left_md="20%"
        left_tablet="15%"
        width="12px"
        height="20px"
        width_tablet="21px"
        height_tablet="35px"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <Icon width="100%" height="100%" icon="arrowleft"/>
      </Button>
      <Button
        variant="empty"
        padding="0"
        padding_xs="0"
        padding_tablet="0"
        position="absolute"
        zIndex="99"
        top="50%"
        right="5%"
        right_md="20%"
        right_tablet="15%"
        width="12px"
        height="20px"
        width_tablet="21px"
        height_tablet="35px"
        onClick={() => sliderRef.current.slickNext()}
      >
        <Icon width="100%" height="100%" icon="arrow-right"/>
      </Button>
      {instructors?.length >= 1 ? (
        <Slider {...settings} ref={sliderRef}>
          {instructors?.map((item, index) => {
            return (
              <Div
                className="instructor-container"
                display="block"
                // width="70%"
                // margin="auto"
                padding="0 10%"
                padding_md="0 25%"
                padding_tablet="0 20%"
                padding_xs="0 10%"
              >
                <Div
                  className="instructor-presentation"
                  background="#FAF9E3"
                  padding="20px"
                  display="block"
                  borderRadius="10px 10px 0px 0px"
                >
                  <Div className="picture-and-heading">
                    <StyledBackgroundSection
                      image={item.image.childImageSharp.gatsbyImageData}
                      // borderRadius={"1.25rem"}
                      // className="pointer"
                      alt={"4Geeks Academy Section"}
                      margin="0 20px 0 0"
                      borderRadius="12px"
                      width_tablet="140px"
                      height_tablet="140px"
                      width_xs="100px"
                      height_xs="100px"
                      width="100px"
                      height="100px"
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
                        margin="0 0 10px 0"
                        fontSize_tablet="22px"
                        fontSize="18px"
                      >
                        {item.name}
                      </H3>
                      <Paragraph
                        // width="90%"
                        textAlign="left"
                        fontSize_tablet="15px"
                        fontWeight_tablet="900"
                        fontSize="14px"
                        fontWeight="700"
                        lineHeight="19px"
                        color={Colors.darkGray}
                        margin="0 0 15px 0"
                        letterSpacing="0.05em"
                      >
                        {item.sub_title.toUpperCase()}
                      </Paragraph>
                      {item.job && <Paragraph
                        fontSize="15px"
                        textAlign="left"
                        fontWeight="500"
                        color={Colors.black}
                        letterSpacing="0.05em"
                        lineHeight="19px"
                        margin="0 0 10px 0"
                        display_tablet="block"
                        display="none"
                      >
                        <Icon style={{ verticalAlign: 'bottom' }} icon="briefcase" />
                        {'  '}
                        {item.job}
                      </Paragraph>}
                      {item.degree && <Paragraph
                        fontSize="15px"
                        textAlign="left"
                        fontWeight="500"
                        color={Colors.black}
                        letterSpacing="0.05em"
                        lineHeight="19px"
                        margin="0 0 10px 0"
                        display_tablet="block"
                        display="none"
                      >
                        <Icon width="20" height="19" fill={Colors.black} style={{ verticalAlign: 'bottom' }} icon="graduation" />
                        {'  '}
                        {item.degree}
                      </Paragraph>}
                    </Div>

                  </Div>
                  <Div
                    display="block"
                    className="responsive-degree-and-job"
                    display_tablet="none"
                    display_xs="block"
                    margin="10px 0 0 0"
                  >
                    {item.job && <Paragraph
                      width="100%"
                      fontSize="15px"
                      textAlign="left"
                      fontWeight="500"
                      color={Colors.black}
                      letterSpacing="0.05em"
                      lineHeight="19px"
                      margin="0 0 10px 0"
                    >
                      <Icon style={{ verticalAlign: 'bottom' }} icon="briefcase" />
                      {'  '}
                      {item.job}
                    </Paragraph>}
                    {item.degree && <Paragraph
                      width="100%"
                      fontSize="15px"
                      textAlign="left"
                      fontWeight="500"
                      color={Colors.black}
                      letterSpacing="0.05em"
                      lineHeight="19px"
                      margin="0 0 10px 0"
                    >
                      <Icon width="20" height="19" fill={Colors.black} style={{ verticalAlign: 'bottom' }} icon="graduation" />
                      {'  '}
                      {item.degree}
                    </Paragraph>}
                  </Div>

                </Div>
                <Div
                  display="block"
                  className="instructor-about"
                  background={Colors.white}
                  padding="20px"
                  borderRadius="0px 0px 10px 10px"
                >
                  <H4
                    textAlign="left"
                    fontWeight="700"
                    margin="0 0 10px 0"
                  >
                    {about[lang.lang]}
                  </H4>
                  <Paragraph
                    textAlign="left"
                    color={Colors.gray3}
                    lineHeight="26px"
                    margin="0 0 20px 0"
                    fontSize_tablet="15px"
                    fontSize_xs="12px"
                  >
                    {item.bio}
                  </Paragraph>
                  <Div
                    className="social-container"
                    alignItems="center"
                  >
                    <Div
                      width_tablet="22px"
                      height_tablet="22px"
                      margin="0 15px 0 0"
                      width="37px"
                      height="37px"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      {item.linkedin != "" && (
                        <a
                          target="_blank"
                          href={item.linkedin}
                          rel="noopener noreferrer nofollow"
                          style={{ width: "fit-content", verticalAlign: "middle" }}
                        >
                          <Icon
                            icon="linkedin"
                            width="100%"
                            color={Colors.blue}
                            fill={Colors.blue}
                          />
                        </a>
                      )}
                    </Div>

                    <Div
                      width_tablet="25px"
                      height_tablet="25px"
                      width="40px"
                      height="40px"
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
                            width="100%"
                            color={Colors.black}
                            fill={Colors.black}
                          />
                        </a>
                      )}
                    </Div>

                  </Div>
                </Div>
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
