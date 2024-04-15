import React, { useRef } from "react";
import { H2, H3, H4, Paragraph } from "../Heading";
import Slider from "react-slick";
import { Div, HR } from "../Sections";
import { StyledBackgroundSection } from "../Styling";
import { Button, Colors } from "../Styling";
import Icon from "../Icon";
import { smartRedirecting } from "../../utils/utils.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ScholarshipProjects = ({ content, maxWidth }) => {
  const sliderRef = useRef();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Div
      display="block"
      position="relative"
      maxWidth={maxWidth || "1280px"}
      margin="auto"
      padding_xxs="20px"
      padding_tablet="50px 40px"
      padding_md="50px 80px"
      padding_lg="70px 0px"
    >
      <H2
        margin="0 0 10px 0"
        fontFamily="Archivo, Lato, sans-serif"
        fontSize="30px"
        fontSize_md="45px"
        fontWeight="400"
        lineHeight="48.96px"
      >
        {content.title}
      </H2>
      <Paragraph
        margin="18px 0 32px 0"
        fontFamily="Archivo, Lato, sans-serif"
        fontSize="15px"
        fontSize_md="21px"
        lineHeight="22.85px"
      >
        {content.description}
      </Paragraph>
      <Button
        display="none"
        display_tablet="block"
        variant="empty"
        padding="0"
        padding_xs="0"
        padding_tablet="0"
        position="absolute"
        zIndex="99"
        top="50%"
        left="5%"
        left_md="3%"
        left_lg="0%"
        left_tablet="0%"
        width="12px"
        height="20px"
        width_tablet="35px"
        height_tablet="62px"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <Icon width="100%" height="100%" icon="arrowleft" />
      </Button>
      <Button
        display="none"
        display_tablet="block"
        variant="empty"
        padding="0"
        padding_xs="0"
        padding_tablet="0"
        position="absolute"
        zIndex="99"
        top="50%"
        right="5%"
        right_md="3%"
        right_lg="0%"
        right_tablet="0%"
        width="12px"
        height="20px"
        width_tablet="35px"
        height_tablet="62px"
        onClick={() => sliderRef.current.slickNext()}
      >
        <Icon width="100%" height="100%" icon="arrow-right" />
      </Button>
      <Slider {...settings} ref={sliderRef}>
        {content?.projects.map((project) => (
          <Div margin_md="0px auto">
            <Div
              padding="15px"
              padding_tablet="0"
              margin="auto"
              width_tablet="100%"
              width_lg="90%"
              minHeight_tablet="605px"
              border_tablet="2px solid #000000"
              flexDirection_tablet="row"
              flexDirection="column"
              borderRadius="4px"
            >
              <Div width="100%" width_tablet="50%">
                <StyledBackgroundSection
                  height_tablet="100%"
                  height_sm="390px"
                  height="249px"
                  width="100%"
                  image={
                    project.image.src &&
                    project.image.src.childImageSharp.gatsbyImageData
                  }
                  alt={project.image.alt}
                  bgSize="cover"
                />
              </Div>
              <Div
                margin="20px 0 0 0"
                margin_tablet="0"
                width_tablet="50%"
                padding_tablet="15px"
                display="block"
              >
                <Div margin="0 0 10px 0" display="block">
                  <H3 textAlign="left" margin="0 0 10px 0">
                    {project.name}
                  </H3>
                  <Paragraph color={Colors.black} textAlign="left">
                    {project.description}
                  </Paragraph>
                </Div>
                <Div margin="20px 0 0 0" display="block">
                  <H4
                    fontWeight="600"
                    fontSize="16px"
                    textAlign="left"
                    margin="0 0 10px 0"
                  >
                    {content.project_details}
                  </H4>
                  <Div gap="10px">
                    <Div
                      display="block"
                      padding="10px"
                      background={Colors.black}
                    >
                      <Paragraph
                        fontSize="12px"
                        textTransform="uppercase"
                        color={Colors.white}
                      >
                        {content.total_cost}
                      </Paragraph>
                      <HR
                        marginBottom="5px"
                        background={Colors.white}
                        width="100%"
                        height="1px"
                      />
                      <Paragraph
                        opacity="1"
                        fontWeight="500"
                        color={Colors.white}
                      >
                        {project.details.cost}
                      </Paragraph>
                    </Div>
                    <Div
                      display="block"
                      padding="10px"
                      background={Colors.black}
                    >
                      <Paragraph
                        fontSize="12px"
                        textTransform="uppercase"
                        color={Colors.white}
                      >
                        {content.geeks_benefited}
                      </Paragraph>
                      <HR
                        marginBottom="5px"
                        background={Colors.white}
                        width="100%"
                        height="1px"
                      />
                      <Paragraph
                        opacity="1"
                        fontWeight="500"
                        color={Colors.white}
                      >
                        {project.details.geeks_benefited}
                      </Paragraph>
                    </Div>
                  </Div>
                </Div>

                <Div margin="20px 0 0 0" display="block">
                  <H4
                    fontWeight="600"
                    fontSize="16px"
                    textAlign="left"
                    margin="0 0 10px 0"
                  >
                    {content.institutions}
                  </H4>
                  <Div flexWrap="wrap" gap="10px" gap_tablet="5px">
                    {project.institutions.map((institution) => (
                      <Div alignItems="center">
                        <Div
                          margin="0 5px 0 0"
                          width="31px"
                          flexShrink="0"
                          flexShrink_tablet="0"
                        >
                          <StyledBackgroundSection
                            height="31px"
                            width="31px"
                            borderRadius="15px"
                            image={
                              institution.logo &&
                              institution.logo.childImageSharp.gatsbyImageData
                            }
                            bgSize="cover"
                          />
                        </Div>
                        <H4 fontWeight="600" fontSize="14px" textAlign="left">
                          {institution.name}
                        </H4>
                      </Div>
                    ))}
                  </Div>
                </Div>

                <Div margin="20px 0 0 0" display="block">
                  <H4
                    fontWeight="600"
                    fontSize="16px"
                    textAlign="left"
                    margin="0 0 10px 0"
                  >
                    {content.press}
                  </H4>
                  <Div flexWrap="wrap" gap="16px">
                    {project.press.map((obj) => (
                      <Button
                        // width="200px"
                        padding="5px"
                        padding_xs="5px"
                        padding_tablet="7px"
                        width_tablet="fit-content"
                        variant="full"
                        onClick={(e) => smartRedirecting(e, obj.link)}
                        borderRadius="4px"
                        color={Colors.lightBlue3}
                        textColor={Colors.black}
                        icon={
                          <Icon
                            icon="link"
                            stroke={Colors.black}
                            style={{ marginRight: "5px" }}
                          />
                        }
                      >
                        {obj.name}
                      </Button>
                    ))}
                  </Div>
                </Div>

                {project.pdf && (
                  <Button
                    padding_xs="0"
                    padding_tablet="0"
                    padding="0"
                    margin="25px 0 0 0"
                    width="fit-content"
                    variant="empty"
                    onClick={(e) => smartRedirecting(e, project.pdf)}
                    icon={
                      <Icon
                        icon="pdf"
                        stroke={Colors.black}
                        style={{ marginRight: "5px" }}
                      />
                    }
                    color={`${Colors.black} !important`}
                    textColor={`${Colors.black} !important`}
                  >
                    <u>{content.see_project}</u>
                  </Button>
                )}
              </Div>
            </Div>
          </Div>
        ))}
      </Slider>
    </Div>
  );
};

export default ScholarshipProjects;
