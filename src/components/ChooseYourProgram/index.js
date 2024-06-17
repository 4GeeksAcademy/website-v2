import React, { useContext } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Button, Colors } from "../Styling";
import { Grid, Div } from "../Sections";
import { H4, H3, H2, Paragraph, SubTitle } from "../Heading";
import { SessionContext } from "../../session.js";
import Icon from "../Icon";

const ChooseYourProgram = ({
  lang,
  programs,
  title,
  paragraph,
  chooseProgramRef,
  landingTemplate,
  id,
  background,
}) => {
  const { session } = useContext(SessionContext);
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
    <Div
      id={id}
      ref={chooseProgramRef}
      background={background}
      // padding_lg="10px 0 50px 0"
      // padding_tablet="10px 40px 50px 40px"
      padding="40px"
    >
      <Grid
        gridTemplateColumns_md={
          landingTemplate ? "repeat(14, 1fr)" : "repeat(14, 1fr)"
        }
        gridTemplateColumns_tablet={
          landingTemplate ? "4fr repeat(12, 1fr) 4fr" : "repeat(14, 1fr)"
        }
        gridTemplateColumns_xs="1fr" //{landingTemplate && "1fr"}
        gridAutoRows_tablet="auto" //"minmax(100px, auto)"
        background_tablet={landingTemplate ? Colors.white : "transparent"}
        maxWidth_tablet="1280px"
        margin_tablet="0 auto"
        margin_lg="0 auto"
      >
        <Div
          margin_tablet="0 0 32px 0"
          gridColumn_tablet="2 / 14"
          gridColumn_xs="5 / 11"
          textAlign="center"
          gridRow_tablet="1 / 1"
          flexDirection="column"
          width="100%"
          zIndex="1"
        >
          <H2>{title || info.title}</H2>
          <SubTitle margin="10px 0px" padding_xs="0 20px">
            {paragraph || info.paragraph}
          </SubTitle>
        </Div>
        <Grid
          padding_tablet={landingTemplate ? "0 17px" : "0"}
          padding_md="0"
          gridColumn_tablet="1 / 15"
          gridColumn_md="1 / 15"
          gridRow_tablet="2 / 4"
          gridTemplateColumns_md={
            landingTemplate ? "repeat(2, 4fr)" : "repeat(4fr)"
          }
          gridTemplateColumns_tablet={
            landingTemplate ? "repeat(2, 4fr)" : "repeat(4 , 25%)"
          }
          zIndex="1"
          margin="0px auto"
        >
          {Array.isArray(programs) &&
            programs.map((program, index) => {
              return (
                <Div
                  key={`${index}-program`}
                  display="flex"
                  padding="20px"
                  border={!background && "1px solid black"}
                  borderRadius="4px"
                  flexDirection="column"
                  justifyContent="between"
                  background="#ffffff"
                  // flexWrap_sm="nowrap"
                  // flexWrap="wrap"
                  zIndex="1"
                  width="100%"
                >
                  <Div display="block">
                    <Div
                      display="flex"
                      justifyContent="between"
                      gap="5px"
                      width="100%"
                    >
                      <Div display="block">
                        <H4
                          textTransform="uppercase"
                          textAlign="left"
                          fontSize="14px"
                          lineHeight="16.8px"
                          letterSpacing="0.05em"
                          color={Colors.darkGray}
                          margin="0 0 5px 0"
                        >
                          {program.sub_title}
                        </H4>
                        {program.title.split("\n").map((title, index) => (
                          <Link key={index} to={program.link}>
                            <H3 textAlign="left">{title}</H3>
                          </Link>
                        ))}
                      </Div>
                      <Div>
                        <Icon
                          className="choose-your-program-icon"
                          icon={program.icon}
                          padding="0 0 0 20px"
                          height="75px"
                          width="68px"
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
                      margin_xs={
                        landingTemplate ? "10px 0 50px 0" : "10px 0 0 0"
                      }
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
                              fontSize="14px"
                              lineHeight="22px"
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
                  </Div>

                  <Div
                    margin="10px auto 0 auto"
                    width="100%"
                    width_tablet="150px"
                  >
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
                            width="auto"
                            width_tablet="150px"
                            borderRadius="4px"
                          >
                            {program.text_link}
                          </Button>
                        ) : (
                          <Button
                            background="none"
                            colorHover="none"
                            color={Colors.blue}
                            justifyContent="center"
                            width="auto"
                            width_tablet="150px"
                            borderRadius="4px"
                            style={{
                              bottom: "24px",
                              left: "24px",
                              right: "24px",
                              gap: "10px",
                              margin: "auto",
                            }}
                          >
                            {program.text_link}
                          </Button>
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
                          fontSize="13px"
                          padding="10px"
                          bottom="24px"
                          borderRadius="4px"
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
