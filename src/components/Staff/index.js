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
import "../../assets/css/staff-css.css";
import Carousel from "../Carousel";
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

  const sliderRef = useRef();

  return (
    <Fragment github="/components/staff">
      <Div
        columns_tablet="12"
        flexDirection="column"
        padding="20px 20px"
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
            //textTransform="uppercase"
            lineHeight="19px"
            fontWeight="500"
          >
            {props.heading || staffList.heading}
          </H4>
          <Paragraph fontSize="18px" textAlign="center" margin="20px 0 0 0">
            {props.paragraph || staffList.sub_heading}
          </Paragraph>
        </Div>

        <Div
          alignItems="center"
          justifyContent="between"
          position="relative"
          display="block"
        >
          <Carousel
            previewArrow
            nextArrow
            customSettings={{
              dotsClass: "slick-dots-staff",
              slidesToShow: 4,
              slidesToScroll: 3,
              className: "staff-class ", // staff-class | carousel-class-noprev-arrow | carousel-class-nonext-arrow | carousel-class-noarrow
              responsive: [
                {
                  breakpoint: 1439,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: true,
                  },
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: true,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: true,
                  },
                },
                {
                  breakpoint: 450,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                  },
                },
              ],
            }}
          >
            {staffFilteredByLocation?.map((item, index) => {
              return (
                <Div
                  key={index}
                  height="fit-content"
                  flexDirection="column"
                  gap="8px"
                  //padding="0 36px 0 0"
                >
                  <Div
                    width="100%"
                    height_tablet="300px"
                    height_sm="360px"
                    height="320px"
                    //margin="0 10px 0 0"
                    alignItems_tablet="center"
                  >
                    <GatsbyImage
                      image={getImage(
                        item.image && item.image.childImageSharp.gatsbyImageData
                      )}
                      style={{
                        height: "100%",
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
          </Carousel>
        </Div>
      </Div>
    </Fragment>
  );
};

export default Staff;
