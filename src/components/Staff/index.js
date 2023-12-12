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
import "../../assets/css/staff-slick-slide.css"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

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

  var coords = 0;

  useEffect(() => {
    coords = document.querySelector(".scroll-items").getBoundingClientRect();

  })
  const scrollL = (scroll) => {
    var left = document.querySelector(".scroll-items");
    left?.scrollBy(-1 * scroll, 0);
  };

  const scrollC = (coords) => {
    var center = document.querySelector(".scroll-items");
    center?.scrollBy(coords.width / 2, 0);
  };

  const scrollR = (scroll) => {
    var right = document.querySelector(".scroll-items");
    right?.scrollBy(scroll, 0);
  };

  return (
    <Fragment github="/components/staff">
      <Div
        columns_tablet="12"
        flexDirection="column"
        padding_xxs="20px 20px"
        padding_md="40px 80px"
        padding_lg="40px 0px"
        padding_tablet="40px 40px 10px 40px"
        margin_tablet="0 auto 30px auto"
        margin="0 0 36px 0"
        maxWidth="1366px"
        containerColumns_tablet="repeat(12,1fr)"
        gridColumn_tablet="1 / span 12"
        gap="36px 0px"
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
          className="main-scroll-div"
          //width="90%"
          alignItems="center"
          justifyContent="between"
          position="relative"
        >

          <Div
            className="cover"
            position="relative"
            width="90%"
            width_md="95%"
          >

            <Div
              className="scroll-items"
              alignItems="start"
              justifyContent="left"
              overflow="auto"
              position="relative"
              gap="36px"
            >
              {staffFilteredByLocation?.map((item, index) => {
                return (
                  <Div
                    className="child"
                    key={index}
                    minWidth="220px"
                    height="fit-content"
                    overflow="hidden"
                    flexDirection="column"
                    gap="8px"
                    id={`slide${index}`}
                  >
                    <Div
                      //minWidth="184px"
                      width="100%"
                      height="240px"
                      //margin="0 10px 0 0"
                      alignItems_tablet="center"
                    >
                      <GatsbyImage
                        image={getImage(
                          item.image && item.image.childImageSharp.gatsbyImageData
                        )}
                        style={{
                          height: "100%",
                          //width: "220px",
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
                    <Anchor
                      to={item.linkdin}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      textAlign="center"
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

            </Div>
          </Div>
          <Button
            padding="0"
            padding_xs="0"
            padding_tablet="0"
            position="absolute"
            zIndex="101"
            top="50%"
            right="0%"
            right_md="0%"
            right_lg="2%"
            right_tablet="0%"
            height="38px"
            width="24px"
            height_tablet="44px"
            onClick={() => scrollR(256)}
          >
            <Icon width="100%" height="100%" icon="arrow-right" />
          </Button>
        </Div>

        <Div
          className="dots"
          justifyContent="center"
          gap="16px"
        >
          <Anchor className="dot" onClick={() => scrollL(10000)}></Anchor>
          <Anchor className="dot" onClick={() => scrollC(coords)}></Anchor>
          <Anchor className="dot" onClick={() => scrollR(10000)}></Anchor>
        </Div>

      </Div>
    </Fragment >
  );
};

export default Staff;
