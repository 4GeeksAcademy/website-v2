import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import { Button, Colors } from "../Styling";
import { Grid, Div } from "../Sections";
import { H4, H3, H2, Paragraph } from "../Heading";
import Icon from "../Icon";

const ChooseYourProgram = ({
  lang,
  programs,
  title,
  paragraph,
  chooseProgramRef,
  landingTemplate,
  id,
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
  const linearGradient = (color1, color2) => {
    return `linear-gradient(to right, ${color1}, ${color2})`;
  };
  if (info) info = info.node;
  return (
    <Div
      //background={landingTemplate ? Colors.white : Colors.verylightGray}
      position="relative"
      id={id}
    >
      <Div
        background={Colors.verylightGray}
        display_xxs="none"
        display_tablet={landingTemplate ? "none" : "flex"}
        height_tablet="50%"
        width_tablet="100%"
        position="absolute"
      />
      <Grid
        ref={chooseProgramRef}
        gridTemplateColumns_md={
          landingTemplate ? "repeat(14, 1fr)" : "repeat(14, 1fr)"
        }
        gridTemplateColumns_tablet={
          landingTemplate ? "4fr repeat(12, 1fr) 4fr" : "repeat(14, 1fr)"
        }
        gridTemplateColumns_xs="1fr" //{landingTemplate && "1fr"}
        gridAutoRows_tablet="auto" //"minmax(100px, auto)"
        background_tablet={landingTemplate ? Colors.white : "transparent"}
        padding_lg="10px 0 50px 0"
        padding_md="10px 80px 50px 80px"
        padding_tablet="10px 40px 50px 40px"
        padding_xxs="0 20px 40px 20px "
        maxWidth_tablet="1366px"
        margin_tablet="0 auto 50px auto"
        margin_lg="0 auto 50px auto"
      >
        <Div
          margin_tablet="50px 0 30px 0"
          margin_xs="30px 0 0 0"
          padding_tablet="0 20px"
          paddin_xs="0px 20px"
          gridColumn_tablet="2 / 14"
          gridColumn_xs="5 / 11"
          textAlign="center"
          gridRow_tablet="1 / 1"
          flexDirection="column"
          width="100%"
          zIndex="1"
        >
          <H2
            //margin="0 0 10px 0"
            fontWeight="700"
            fontSize_tablet="30px"
            fontSize_xs="24px"
            lineHeight_tablet="36px"
            lineHeight_xs="28.8px"
          >
            {title || info.title}
          </H2>
          <Paragraph
            margin="10px 0px"
            padding_xs="0 20px"
            fontWeight="400"
            fontSize="21px"
            lineHeight="22px"
          >
            {paragraph || info.paragraph}
          </Paragraph>
        </Div>
        <Grid
          gridColumn_tablet={landingTemplate ? "1 / 15" : "1 / 15"}
          padding_tablet={landingTemplate ? "0 17px" : "0"}
          padding_md="0"
          gridColumn_md="1 / 15"
          gridRow_tablet="2 / 4"
          gridTemplateColumns_md={
            landingTemplate ? "repeat(2, 4fr)" : "repeat(3, 4fr)"
          }
          gridTemplateColumns_tablet={
            landingTemplate ? "repeat(2, 4fr)" : "repeat(3 , 32%)"
          }
          zIndex="1"
          margin="0px auto"
          margin_tablet={!landingTemplate && "0 0 0 0"}
          margin_md="0"
        >
          {Array.isArray(programs) &&
            programs.map((program, index) => {
              return (
                <Div
                  key={index}
                  display="flex"
                  padding=" 24px 24px"
                  //margin_xs="20px 0px"
                  margin_tablet="0px"
                  border="3px solid black"
                  flexDirection_tablet="column"
                  flexDirection_xs="column"
                  alignItems="center"
                  justifyContent="space-between"
                  //alignItems_tablet="flex-end"
                  background="#ffffff"
                  style={{ position: "relative" }}
                  flexWrap_sm="nowrap"
                  flexWrap="wrap"
                  zIndex="1"
                  width_md="100%"
                  width_tablet="100%"
                  width_xxs="95%"
                  width_xs="100%"
                >
                  <Div
                    placeSelf_tablet={landingTemplate && "flex-start"}
                    display="flex"
                    justifyContent="space-between"
                    margin_xs="10px 0 0 0"
                    margin_tablet="0"
                    width="100%"
                    width_tablet="100%"
                  >
                    <Div display="inline" width="75%" padding="0 5px 0 0">
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
                      {program.title.split("\n").map((title, index) => (
                        <Link key={index} to={program.link}>
                          <H3
                            textAlign="left"
                            fontSize="22px"
                            lineHeight="26px"
                          >
                            {title}
                          </H3>
                        </Link>
                      ))}
                    </Div>
                    <Div display="flex" justifyContent_sm="end" width="25%">
                      <Icon
                        className="choose-your-program-icon"
                        icon={program.icon}
                        padding="0 0 0 20px"
                        height="40px"
                        width="52px"
                      />
                    </Div>
                  </Div>
                  <Div
                    display="flex"
                    flexDirection="column"
                    width="100%"
                    alignContent="flex-start"
                    margin_tablet={
                      landingTemplate ? "10px 0 50px 0" : "10px 0 0 0"
                    }
                    margin_xs={landingTemplate ? "10px 0 50px 0" : "10px 0 0 0"}
                    padding={
                      landingTemplate
                        ? "10px 0px 20px 0px"
                        : "10px 0px 15px 0px"
                    }
                  >
                    {program.description &&
                      program.description
                        .split("\n")
                        .map((paragraph, index) => (
                          <Paragraph
                            key={index}
                            letterSpacing="0.05em"
                            display_tablet="inline"
                            display_xs="inline"
                            textAlign="left"
                            fontSize="15px"
                            lineHeight="22px"
                            fontWeight="400"
                            opacity="1"
                            margin={index == 0 && "10px 0px 10px 0"}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          />
                        ))}

                    {program.description_mobile && (
                      <Paragraph
                        letterSpacing="0.05em"
                        display="block"
                        display_tablet="none"
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
                  <Div margin="20px 0 0 0" width_xs="100%" width_tablet="150px">
                    {!program.comming_soon ? (
                      <Link to={program.link} style={{ width: "100%" }}>
                        {landingTemplate ? (
                          <Button
                            display="flex"
                            float="left"
                            background={Colors.black}
                            colorHover={Colors.black}
                            color={Colors.white}
                            justifyContent="center"
                            //className="mobile"
                            width_xs="auto"
                            width_tablet="150px"
                            style={{
                              position: "absolute",
                              bottom: "24px",
                              left: "24px",
                              right: "24px",
                            }}
                          >
                            {program.text_link}
                          </Button>
                        ) : (
                          <Div displey="flex">
                            <Icon
                              //className="mobile"
                              style={{
                                position: "absolute",
                                bottom: "24px",
                                right: "24px",
                              }}
                              icon="arrowright"
                              height="32px"
                              width="32px"
                            />
                          </Div>
                        )}
                      </Link>
                    ) : (
                      <Link to={program.link}>
                        <Button
                          variant="outline"
                          color="black"
                          font='"Lato", sans-serif'
                          width="fit-content"
                          pointer
                          textColor={Colors.black}
                          fontSize={"13px"}
                          borderRadius="3px"
                          //margin_xs="5px 0 0 0"
                          padding="10px"
                          position="absolute"
                          bottom="24px"
                          right="24px"
                        >
                          {program.text_link}
                        </Button>
                      </Link>
                    )}
                  </Div>
                </Div>
              );
            })}
        </Grid>
      </Grid>
    </Div>
  );
};

export default ChooseYourProgram;
