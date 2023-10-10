import React, { useState } from "react";
import { GridContainer, GridContainerWithImage, Div, Grid } from "../Sections";
import PropTypes from "prop-types";
import { H2, H3, H4, H5, Paragraph } from "../Heading";
import { Colors, StyledBackgroundSection, Span } from "../Styling";
import Icon from "../Icon";
import ReactPlayer from "../ReactPlayer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/utils.css"

const AlumniProjects = ({
  lang,
  showThumbs,
  containerStyle,
  limit,
  playerHeight,
  title,
  paragraph,
  yml
}) => {
  const [projects, setProjects] = useState(
    lang[0].node.projects.slice(0, limit || lang[0].node.projects.length)
  );
  const [value, setValue] = useState(0);
  const [switched, setSwitched] = useState(false);

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
    dotsClass: "slick-dotss",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    afterChange: () => {
      setSwitched(!switched);
    },
    /* OPTIONAL
            Disabled arrows becouse it's have a GrabAndSlide Functions
            And it works with the kewboard arrows (left/right) when the 
            component is clicked 
        */
    arrows: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  // Not works as expected (stop when hover outside of screen), rethink another idea
  // const stopVideo = () => {
  //     // check if document is defined
  //     if(typeof document !== "undefined") {
  //         const iframe = document.querySelector( 'iframe');
  //         const video = document.querySelector( 'video' );
  //         const containerSlider = document.querySelector('.container-slider')

  //         if ( containerSlider && iframe ) {
  //             const iframeSrc = iframe.src;
  //             iframe.src = iframeSrc;
  //         }
  //         if ( containerSlider && video ) {
  //             console.log('isOutContainerSlider')
  //             video && video.pause();
  //             // disable function for 5 seconds after paused
  //         }
  //     }
  // };
  return (
    <Div 
      flexDirection="column" 
      style={containerStyle} 
      maxWidth_lg="1366px"
      maxWidth_md="1024px"
      maxWidth_tablet="768px" 
      margin_tablet="0px auto 60px auto" 
      zIndex="1" 
    >
      {(title !== undefined && paragraph !== undefined) || yml && (
        <GridContainer margin="50px 0 50px 0">
          <Div display="flex" flexDirection="column" alignItems="center">
            <H2 margin="0 0 15px 0" fontWeight="700" lineHeight="36px">
              {yml.heading || title}
            </H2>
            <Paragraph padding="0" padding_tablet="0 16%">
              {yml.sub_heading || paragraph}
            </Paragraph>
          </Div>
        </GridContainer>
      )}
      <Slider {...settings}>
        {projects?.map((item, index) => {
          return (
            <GridContainerWithImage
              className="container-slider"
              key={`${index}-${item.project_name}`}
              imageSide="left"
              columns_tablet="14"
              gridGap_tablet="0"
              margin_tablet="0 0 36px 0"
              margin="0 0 50px 0"
              padding_tablet="0 40px"
              height_tablet="414px"
            >
              <Div
                height_tablet="414px"
                padding="0"
                //padding_tablet="17px 51px"
                padding_tablet="0"
                gridColumn_tablet="1 / 7"
              >
                {item.project_video === "" ? (
                  <StyledBackgroundSection
                    image={item.project_image.childImageSharp.gatsbyImageData}
                    bgSize={`cover`}
                    alt="Cnn Logo"
                    style={{
                      width: "100%",
                      height: "342px",
                      margin: "36px 15%",
                    }}
                  />
                ) : (
                  <ReactPlayer
                    id={item.project_video}
                    index={index}
                    thumb={item.project_image}
                    imageSize="maxresdefault"
                    right_tablet="-93px"
                    left_tablet="unset"
                    margin_tablet="36px 15%"
                    switched={switched}
                    videoHeight="342px"
                    width_play="92px"
                    height_play="92px"
                    fontSize_play="28px"
                    background_play="black"
                    opacity_play="1"
                    leftPlay_tablet="121.5%"
                    transformPlay_tablet="translateX(-115%%) translateY(-50%)"
                    transformPlay_md="translateX(-51%) translateY(-50%)"
                    transformPlay_lg="translateX(-50%) translateY(-50%)"
                    style={{
                      width: "100%",
                      height: "342px",
                    }}
                  />
                )}
              </Div>
              <Div flexDirection="column" gridColumn_tablet="8 / 15 ">
                <H3 textAlign="left" margin={`10px 0`}>
                  Project: {`${item.project_name}`}
                </H3>
                <H4 textAlign="left" fontWeight="900" lineHeight="19px" margin={`24px 0 9px 0`}>
                  {" "}
                  {`> MADE BY:`}
                </H4>
                {item.alumni.map((alumni, i) => {
                  return (
                    <Div
                      key={i}
                      justifyContent="start"
                      margin={`0 0 20px 0`}
                      gap="10px"
                      display="flex"
                    >
                      <H4
                        textAlign="left"
                        fontWeight={`400`}
                        width="fit-content"
                        margin="0 20px 0 0"
                        lineHeight="22px"
                      >
                        {`${alumni.first_name} ${alumni.last_name}`}
                      </H4>
                      {alumni.github != "" && (
                        <>
                          <a
                            target="_blank"
                            href={alumni.github}
                            rel="noopener noreferrer nofollow"
                          >
                            <Icon
                              icon="github"
                              width="22"
                              color={Colors.black}
                              fill={Colors.black}
                            />
                          </a>
                        </>
                      )}
                      {alumni.linkedin != "" && (
                        <>
                          <a
                            target="_blank"
                            href={alumni.linkedin}
                            rel="noopener noreferrer nofollow"
                          >
                            <Icon
                              icon="linkedin"
                              width="22"
                              color={Colors.blue}
                              fill={Colors.blue}
                            />
                          </a>
                        </>
                      )}
                    </Div>
                  );
                })}
                <H4
                  textAlign="left"
                  fontWeight="900"
                  margin={`20px 0 6px 0`}
                  lineHeight="19px"
                  style={{ borderTop: "1px solid #ebebeb" }}
                >
                  {" "}
                  {`> DESCRIPTION:`}
                </H4>
                <Paragraph color={Colors.gray} textAlign="left" lineHeight="22px">
                  {item.project_content}
                </Paragraph>
              </Div>
            </GridContainerWithImage>
          );
        })}
      </Slider>
    </Div>
  );
};
AlumniProjects.propTypes = {
  limit: PropTypes.number,
};
AlumniProjects.defaultProps = {
  limit: 0,
  playerHeight: "100%",
};
export default AlumniProjects;
