import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { Button, Colors } from "../Styling";
import { Break } from "../Responsive";
import { Row, GridContainer, Grid, Div } from "../Sections";
import { H4, H3, H2, Paragraph } from "../Heading";
import { navigate, Link, useStaticQuery } from "gatsby";
import styled from "styled-components";
import Icon from "../Icon";
import { SessionContext } from "../../session.js";

const ChooseYourProgram = ({
  lang,
  programs,
  title,
  paragraph,
  chooseProgramRef,
  landingTemplate,
}) => {
  const data = useStaticQuery(graphql`
    {
      allChooseYourProgramYaml {
        edges {
          node {
            programs {
              title
              sub_title
              description
              description_mobile
              link
              icon
            }
            title
            paragraph
            fields {
              lang
            }
          }
        }
      }
    }
  `);
  let info = data.allChooseYourProgramYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (info) info = info.node;
  return (
    <Grid
      ref={chooseProgramRef}
      gridTemplateColumns_md={landingTemplate && "4fr repeat(12,1fr) 4fr"}
      gridTemplateColumns_tablet={
        landingTemplate ? "1fr repeat(12,1fr) 1fr" : "2fr repeat(12, 1fr) 2fr"
      }
      gridAutoRows_tablet="minmax(100px, auto)"
      background={landingTemplate ? Colors.white : Colors.verylightGray}
      background_tablet={landingTemplate ? Colors.white : "transparent"}
      padding="59px 17px 83px 17px"
      padding_tablet=" 0 "
      margin="0 0 50px 0"
      margin_tablet="0 0 100px 0"
    >
      <Div
        margin_tablet="0 0 45px 0"
        margin="0 0 35px 0"
        padding_tablet="75px 0 0 0"
        gridColumn_tablet="5 / 11"
        gridRow_tablet="1 / 1"
        flexDirection="column"
      >
        <H2 margin="0 0 10px 0" fontWeight="700">
          {title || info.title}
        </H2>
        <Paragraph margin="10px 0">{paragraph || info.paragraph}</Paragraph>
      </Div>
      <Grid
        gridColumn_tablet="2 / 14"
        gridRow_tablet="2 / 4"
        zIndex="1"
        gridTemplateColumns_tablet={
          landingTemplate ? "repeat(2, 4fr)" : "repeat(3, 4fr)"
        }
      >
        {Array.isArray(programs) &&
          programs.map((program, i) => {
            return (
              <Div
                key={i}
                display="flex"
                // height="145px"
                // minHeight_tablet="285px"
                borderRadius="3px"
                padding={landingTemplate ? "1rem 2.5rem 1rem 2rem" : "1rem"}
                border="1px solid black"
                borderLeft="6px solid black"
                borderTop="1px solid black"
                borderLeft_tablet="1px solid black"
                borderTop_tablet="6px solid black"
                flexDirection_tablet="column"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                alignItems_tablet="flex-end"
                background="#ffffff"
                style={{ position: "relative" }}
              >
                <Div
                  placeSelf_tablet={landingTemplate && "flex-start"}
                  display="flex"
                  justifyContent="end"
                  alignSelf="flex-start"
                  margin="10px 0 0 0"
                  margin_tablet="0"
                  alignSelf_tablet="flex-end"
                  width="90px"
                  width_tablet="120px"
                >
                  <Icon
                    className="choose-your-program-icon"
                    icon={program.icon}
                    height="40px"
                    width="52px"
                  />
                </Div>
                <Div
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  alignContent="flex-start"
                  margin="10px 0 0 0"
                  padding={landingTemplate ? "0 0 100px 15px" : "0 0 30px 15px"}
                >
                  {/* {program.sub_title.toLowerCase() != "online" &&  */}
                  <H4
                    textTransform="uppercase"
                    textAlign="left"
                    fontSize="15px"
                    lineHeight="19px"
                    letterSpacing="0.05em"
                    color={Colors.darkGray}
                    margin="0 0 5px 0"
                  >
                    {program.sub_title}
                  </H4>

                  {/* // } */}
                  {program.title.split("\n").map((m, i) => (
                    <Link key={i} to={program.link}>
                      <H3 textAlign="left" fontSize="22px" lineHeight="26px">
                        {m}
                      </H3>
                    </Link>
                  ))}
                  {program.description &&
                    program.description.split("\n").map((m, i) => (
                      <Paragraph
                        key={i}
                        letterSpacing="0.05em"
                        display_tablet="block"
                        display="none"
                        // lineHeight="22px"
                        textAlign="left"
                        fontSize="15px"
                        lineHeight="19px"
                        fontWeight="400"
                        opacity="1"
                        margin={i == 0 && "10px 0px 25px 0"}
                        dangerouslySetInnerHTML={{ __html: m }}
                      />
                    ))}

                  {program.description_mobile && (
                    <Paragraph
                      letterSpacing="0.05em"
                      display="block"
                      display_tablet="none"
                      // lineHeight="22px"
                      textAlign="left"
                      fontSize="15px"
                      lineHeight="19px"
                      fontWeight="400"
                      opacity="1"
                      margin="10px 0px 25px 0"
                    >
                      {program.description_mobile}
                    </Paragraph>
                  )}
                </Div>
                {!program.comming_soon ? (
                  <Link to={program.link}>
                    {landingTemplate ? (
                      <Button
                        background={Colors.black}
                        colorHover={Colors.black}
                        color={Colors.white}
                        className="mobile"
                        style={{
                          position: "absolute",
                          bottom: "40px",
                          left: "46px",
                        }}
                        // backgroundColor="#000" width="184" height="40"
                      >
                        {program.text_link}
                      </Button>
                    ) : (
                      <Icon
                        className="mobile"
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                        }}
                        icon="arrowright"
                        height="32px"
                        width="32px"
                      />
                    )}
                  </Link>
                ) : (
                  <Link to={program.link}>
                    <Button
                      variant="outline"
                      color="black"
                      font='"Lato", sans-serif'
                      width="fit-content"
                      margin="20px 10px 0 0"
                      pointer
                      textColor={Colors.black}
                      fontSize={"13px"}
                      borderRadius="3px"
                      padding="10px"
                    >
                      {program.text_link}
                    </Button>
                  </Link>
                )}
              </Div>
            );
          })}
      </Grid>
      <Div
        display="none"
        display_tablet="flex"
        padding_tablet="75px 0 0 0"
        background={Colors.verylightGray}
        zIndex="-1"
        gridColumn_tablet="1 / 15"
        gridRow_tablet="1 / 3"
        gridRow="1 / 4"
      />
    </Grid>
  );
};

export default ChooseYourProgram;
