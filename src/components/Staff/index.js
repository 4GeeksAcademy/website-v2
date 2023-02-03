import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { H1, H2, H3, H4, Title, Separator, Paragraph } from "../Heading";
import { Anchor, Colors } from "../Styling";
import { Row, GridContainer, Div } from "../Sections";
import Fragment from "../Fragment";
import styled from "styled-components";
import Icon from "../Icon";
import DraggableDiv from "../DraggableDiv";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SessionContext } from "../../session";

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
                  # fluid(maxWidth: 800){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
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

  // console.log("staff", staffFilteredByLocation);
  // console.log("staffList", staffList);
  return (
    <Fragment github="/components/staff">
      <GridContainer
        columns_tablet="12"
        padding_tablet="0"
        margin_tablet="0 0 72px 0"
        margin="0 0 36px 0"
      >
        <Div
          alignItems="center"
          flexDirection="column"
          gridColumn_tablet="3 /11"
        >
          <H4
            fontSize="15px"
            textTransform="uppercase"
            lineHeight="19px"
            fontWeight="900"
          >
            {props.heading || staffList.heading}
          </H4>
          <Paragraph textAlign="center" margin="14px 0 50px 0">
            {props.paragraph || staffList.sub_heading}
          </Paragraph>
        </Div>
        <DraggableDiv
          gridColumn_tablet="1/span 12"
          className="testimonial-slider"
          height="auto"
          padding="0 17px 59px 17px"
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
                    // fluid={item.image && item.image.childImageSharp.fluid}
                    style={{
                      height: "100%",
                      minWidth: "100%",
                      backgroundSize: `cover`,
                    }}
                    alt={item.name}
                  />
                </Div>
                <H3 fontSize="15px" lineHeight="19px" margin="14px 0 0 0">
                  {item.name}
                </H3>
                <H4 fontSize="14px" lineHeight="22px" margin="0 0 6px 0">
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
                    icon="linkedin"
                    width="14px"
                    fill="#2867b2"
                    stroke="#2867b2"
                  />
                </Anchor>
              </Div>
            );
          })}
        </DraggableDiv>
      </GridContainer>
    </Fragment>
  );
};

export default Staff;
