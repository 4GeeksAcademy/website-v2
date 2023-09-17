import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GridContainer, Grid, Div } from "../Sections";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Colors, Anchor } from "../Styling";
import Icon from "../Icon";
import Link from "gatsby-link";

const ContainerStyle = styled.div`
  height: 0.5px;
  width: 100%;
  background-color: ${Colors.black};
  border-radius: 50px;
`;
const FillerStyles = styled.div`
  height: 8px;
  width: ${(props) => props.completed}%;
  background-color: ${Colors.yellow};
  border-radius: inherit;
  text-align: right;
  transform: translateY(-50%);
`;

const weeks = [];
for (let i = 1; i <= 16; i++) {
  weeks.push(i.toString() + "sm.")
};

const strings = {
  us: {
    Projects: "Projects",
    Duration: "Duration",
  },
  es: {
    Projects: "Proyectos",
    Duration: "Duración",
  },
};
const ProgramDetails = (props) => {
  const [selected, setSelected] = useState({ index: 0, manual: false });
  const lang = props.lang || "en";
  if (!props.details) {
    console.log(
      "Warning! Ignoring Program Details because it came null form the graphql query"
    );
    return null;
  }
  const steps = props.details.details_modules.reduce(
    (total, current, i) => [...total, (total[i - 1] || 0) + current.step],
    []
  );

  const { title, sub_title, list } = props.details.about

  useEffect(() => {
    const inter = setInterval(() => {
      setSelected((current) =>
        current.manual
          ? current
          : current.index < steps.length - 1
            ? { index: current.index + 1, manual: false }
            : { index: 0, manual: false }
      );
    }, 2000);
    return () => clearInterval(inter);
  }, []);
  return (
    <>
      <Grid
        gridTemplateColumns_tablet="2fr repeat(14,1fr) 2fr"
        maxWidth="1366px"
        margin_xs="0 auto 45px auto"
      >
        <Div
          flexDirection="column"
          gridColumn_tablet="2/10"
          gap="22px"
          padding_tablet="0 13px 0 0"
          margin_tablet="100px 0 0 0"
          margin="40px 20px 13px 20px"
        >
          <H3
            textAlign="start"
          >
            {title}
          </H3>
          {sub_title && /<\/?[a-z0-9]+>/g.test(sub_title) &&
            <Paragraph
              textAlign="start"
              lineHeight="26px"
              dangerouslySetInnerHTML={{ __html: sub_title }}
            />
          }

        </Div>
        <Div
          flexDirection="column"
          gridColumn_tablet="10/16"
          padding="15px"
          margin_tablet="100px 0 0 0"
          background={Colors.veryLightBlue}
          margin="13px 20px 40px 20px"
        >
          {list.map((item, index) => {
            return (
              <Div flexWrap="wrap">
                <Div alignItems="start" margin="10px 0" key={index}>
                  <Icon icon={item.icon} width="20px" height="20px" color="black" />
                  <H4
                    fontSize="16px"
                    textAlign="start"
                    fontFamily="Inter"
                    lineHeight="19px"
                    margin="0 0 0 9px"
                  >
                    <strong style={{ fontWeight: "700" }}>{item.label}: </strong>
                    {item.content}
                  </H4>
                </Div>
                {
                  item.link_text && (

                    <a
                      href={item.link}
                      style={{
                        textAlign: "start",
                        margin: "0 0 0 30px",
                        textDecoration: "underline",
                        fontFamily: "Lato",
                        color: Colors.blue,
                        fontSize: "16px",
                      }}

                    >{item.link_text}</a>
                  )
                }
              </Div>
            );
          })}
        </Div>
      </Grid>
      <Div flexWrap="wrap" margin_xs="0 20px" margin_tablet="100px 0 0 0">
        <H2
          lineHeight="36px"
        >
          {props.heading || props.details.heading}
        </H2>
        <Paragraph
          padding="20px 0 0 0"
          lineHeight_xs="22px"
          fontSize_tablet="15px"
          fontSize_xs="18px"
        >
          {props.sub_heading || props.details.sub_heading}
        </Paragraph>
      </Div>
      {props.withoutAnimation !== true && (
        <Grid
          padding_tablet="0"
          margin="0 auto 83px auto"
          justifyItems="center"
          maxWidth="1366px"

        >
          <Div
            flexDirection="column"
            margin="0 0 0 0"
            minHeight="475px"
            height="auto"
            borderBottom_tablet="1px solid black"
            gridColumn_tablet="2/14"
            display="none"
            display_md="block"
          >
            <Div
              justifyContent="between"
              margin="50px 0 20px 0"
              className="badge-slider hideOverflowX__"
            >
              {props.details.details_modules.map((item, index) => {
                return (
                  <Div
                    key={index}
                    onClick={() => setSelected({ index, manual: true })}
                    cursor="pointer"
                    flexDirection={`column`}
                    alignItems={`center`}
                    backgroundHover={Colors.grayBrown}
                    background={selected.index === index ? Colors.grayBrown : null}
                    padding={"10px"}
                    borderRadius={"3px"}
                    display="flex"
                  >
                    <Div
                      alignItems={`center`}
                      margin={`0 0 5px 0`}
                      display="flex"
                    >
                      <H4
                        color={
                          selected.index === index ? "#ffffff" : Colors.darkGray
                        }
                        colorHover="#ffffff"
                        fontWeight="900"
                        cursor={`pointer`}
                        lineHeight="19px"
                      >
                        {item.module_name}
                      </H4>
                    </Div>
                  </Div>
                );
              })}
            </Div>
            <ContainerStyle>
              <FillerStyles
                completed={
                  (steps[selected.index] * 100) / steps[steps.length - 1]
                }
              />
            </ContainerStyle>
            <Div
              flexDirection="row"
              padding="32px"
            >{
                weeks.map((sm, index) => (
                  <H4
                    margin="0 5px"
                    fontSize="15px"
                    lineHeight="22px"
                    color={Colors.darkGray}
                  >
                    {sm}
                  </H4>))
              }
            </Div>
            <Div display_tablet="flex" display="block">
              <Div margin="20px 20px 0 0" width="50%" height="250px">
                <Icon
                  style={{ flexShrink: 0 }}
                  icon="laptop"
                  width="52px"
                  height="39px"
                />
                <Div flexDirection="column" margin="0 0 0 15px">
                  <H3
                    textAlign="left"
                    textTransform="uppercase"
                    margin="0 0 10px 0"
                  >
                    {props.details.details_modules[selected.index].title}
                  </H3>
                  {props.details.details_modules[selected.index].description
                    .split("\\n")
                    .map((detail, i) => (
                      <Paragraph
                        key={i}
                        textAlign="left"
                        color={Colors.darkGray}
                        fontSize="18px"
                        lineHeight="19px"
                      >
                        {detail}
                      </Paragraph>
                    ))}
                </Div>
              </Div>
              <Div margin="20px 0 20px 20px" display="inline" width="50%">
                <Div margin="0 10px 0 0" width="100%" height="150px">
                  <Div>
                    <Icon icon="rocket" width="46px" height="46px" />
                  </Div>
                  <Div flexDirection="column" margin="0 0 0 15px">
                    <H3
                      textAlign="left"
                      textTransform="uppercase"
                      margin="0 0 10px 0"
                    >
                      {strings[lang]["Projects"]}
                    </H3>
                    {props.details.details_modules[selected.index].projects
                      .split("\\n")
                      .map((detail, i) => (
                        <Paragraph
                          key={i}
                          textAlign="left"
                          color={Colors.darkGray}
                          fontSize="18px"
                          lineHeight="19px"
                        >
                          {detail}
                        </Paragraph>
                      ))}
                  </Div>
                </Div>
                <Div width="100%" height="50px">
                  <Div>
                    <Icon icon="clock" width="46px" height="46px" />
                  </Div>
                  <Div flexDirection="column" margin="0 0 0 20px">
                    <H3
                      textAlign="left"
                      textTransform="uppercase"
                      margin="0 0 10px 0"
                    >
                      {strings[lang]["Duration"]}
                    </H3>
                    <Paragraph
                      textAlign="left"
                      color={Colors.darkGray}
                      fontSize="18px"
                      lineHeight="19px"
                    >
                      {props.details.details_modules[selected.index].duration}
                    </Paragraph>
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
        </Grid>
      )}
    </>
  );
};

export default ProgramDetails;
