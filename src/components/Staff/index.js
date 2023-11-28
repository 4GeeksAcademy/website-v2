import React, { useState, useRef } from "react";
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Staff = (props) => {
  const data = useStaticQuery(graphql`
    query myNewStaffQuery {
      allStaffYaml {
        edges {
          node {
            fields {
              lang
            }
            heading
            sub_heading
            staff {
              name
              last_name
              nick_name
              bio
              slug
              job_title
              github
              linkdin
              twitter
              website
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 800
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              age
              location
              interests
              coding_skills
            }
          }
        }
      }
    }
  `);
  let staffList = data.allStaffYaml.edges.find(
    ({ node }) => node.fields.lang === props.lang
  );
  const { session } = React.useContext(SessionContext);
  let staffFilteredByLocation;
  let sessionLocation =
    session && session.location && session.location.breathecode_location_slug;

  if (staffList) staffList = staffList.node;

  if (sessionLocation)
    staffFilteredByLocation = staffList.staff.filter(
      (n) =>
        n.location.length <= 0 ||
        n.location.includes("") ||
        n.location === "all" ||
        n.location.includes("all") ||
        n.location.includes(sessionLocation)
    );

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

  const settings = {
    //className: "slider variable-width",
    //variableWidth: true,
    dots: true,
    infinite: false,
    //autoplay: true,
    //autoplaySpeed: 6000,
    //speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: <CustomNextArrow />,
    //pauseOnHover: true,
  };

  return (
    <Fragment github="/components/staff">
      <GridContainer
        columns_tablet="12"
        padding_xxs="40px 20px"
        padding_md="40px 80px"
        padding_lg="40px 0px"
        padding_tablet="40px 40px"
        margin_tablet="0 auto 72px auto"
        margin="0 0 36px 0"
        maxWidth="1366px"
        containerColumns_tablet="repeat(12,1fr)"
        gridColumn_tablet="1 / span 12"
      >
        <Div
          alignItems="center"
          flexDirection="column"
          gridColumn_tablet="2 /12"
        >
          <H4
            fontSize="30px"
            textTransform="uppercase"
            lineHeight="19px"
            fontWeight="500"
          >
            {props.heading || staffList.heading}
          </H4>
          <Paragraph fontSize="18px" textAlign="center" margin="14px 0 50px 0">
            {props.paragraph || staffList.sub_heading}
          </Paragraph>
        </Div>

        <Div
          gridColumn_tablet="1/span 11"
          padding="0 17px 59px 17px"
          gap_tablet="36px"
          position="relative"
          display="block"
          //className="badge-slider hideOverflowX__"
        >
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
            <Icon width="100%" height="100%" icon="arrow-right" />
          </Button>

          <Slider {...settings} ref={sliderRef}>
            {staffFilteredByLocation?.map((item, index) => {
              return (
                <Div
                  key={index}
                  flexDirection="column"
                  alignItems="center"
                  width="220px"
                >
                  <Div
                    //minWidth="184px"
                    width="220px"
                    height="184px"
                    //margin="0 10px 0 0"
                    alignItems_tablet="center"
                  >
                    <GatsbyImage
                      image={getImage(
                        item.image && item.image.childImageSharp.gatsbyImageData
                      )}
                      style={{
                        height: "100%",
                        width: "220px",
                        //minWidth: "100%",
                        backgroundSize: `cover`,
                      }}
                      alt={item.name}
                    />
                  </Div>
                  <H3 fontSize="18px" lineHeight="22px" margin="14px 0 0 0">
                    {item.name}
                  </H3>
                  <H4 fontSize="15px" lineHeight="18px" margin="8px 0">
                    {item.job_title}
                  </H4>
                  {/* <Paragraph
                                    fontSize="14px"
                                    lineHeight="22px"
                                    margin="0 0 6px 0"
                                >
                                    {item.bio}
                  </Paragraph> */}
                  <Anchor
                    to={item.linkdin}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <Icon
                      icon="linkedin-new"
                      width="24px"
                      fill="#2867b2"
                      stroke="#2867b2"
                    />
                  </Anchor>
                </Div>
              );
            })}
          </Slider>
        </Div>

        {/* <DraggableDiv
          gridColumn_tablet="1/span 12"
          height="auto"
          padding="0 17px 59px 17px"
          gap_tablet="36px"
        >
          {staffFilteredByLocation?.map((item, index) => {
            return (
              <Div key={index} flexDirection="column" alignItems="center">
                <Div
                  minWidth="184px"
                  height="184px"
                  margin="0 10px 0 0"
                  alignItems="center"
                >
                  <GatsbyImage
                    image={getImage(
                      item.image && item.image.childImageSharp.gatsbyImageData
                    )}
                    style={{
                      height: "100%",
                      minWidth: "100%",
                      backgroundSize: `cover`,
                    }}
                    alt={item.name}
                  />
                </Div>
                <H3 fontSize="18px" lineHeight="22px" margin="14px 0 0 0">
                  {item.name}
                </H3>
                <H4 fontSize="15px" lineHeight="18px" margin="8px 0">
                  {item.job_title}
                </H4>
                {/* <Paragraph
                                    fontSize="14px"
                                    lineHeight="22px"
                                    margin="0 0 6px 0"
                                >
                                    {item.bio}
                                </Paragraph>
                <Anchor
                  to={item.linkdin}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <Icon
                    icon="linkedin-new"
                    width="24px"
                    fill="#2867b2"
                    stroke="#2867b2"
                  />
                </Anchor>
              </Div>
            );
          })}
        </DraggableDiv> */}
      </GridContainer>
    </Fragment>
  );
};

export default Staff;
