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

  const weeks = [];
  const totalWeeks = props.details.weeks || 16;
  for (let i = 1; i <= totalWeeks; i++) {
    weeks.push(i.toString() + "sm.");
  }

  const steps = props.details.details_modules.reduce(
    (total, current, i) => [...total, (total[i - 1] || 0) + current.step],
    []
  );

  const { title, sub_title, list } = props.details.about;

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
        gridTemplateColumns_tablet="repeat(14,1fr)"
        maxWidth="1366px"
        margin_xs="0 auto 45px auto"
        padding_tablet="0 40px"
        padding_md="0 80px"
        padding_lg="0"
      >
        <Div
          flexDirection="column"
          gridColumn_tablet="1/8"
          gap="22px"
          padding_tablet="0 13px 0 0"
          margin_tablet="100px 0 0 0"
          margin="40px 20px 13px 20px"
        >
          <H3 textAlign="start">{title}</H3>
          {sub_title && /<\/?[a-z0-9]+>/g.test(sub_title) ? (
            <Paragraph
              textAlign="start"
              lineHeight="26px"
              dangerouslySetInnerHTML={{ __html: sub_title }}
            />
          ) : (
            <Paragraph textAlign="start" lineHeight="26px">
              {sub_title}
            </Paragraph>
          )}
        </Div>
        <Div
          flexDirection="column"
          gridColumn_tablet="8/16"
          padding="15px"
          margin_tablet="100px 0 0 0"
          background={Colors.veryLightBlue}
          margin="13px 20px 40px 20px"
        >
          {list.map((item, index) => {
            return (
              <Div flexWrap="wrap" alignItems="center">
                <Div alignItems="start" margin="10px 0" key={index}>
                  <Icon icon={item.icon} width="20px" height="20px" />
                  <H4
                    fontSize="16px"
                    textAlign="start"
                    fontFamily="Inter"
                    lineHeight="19px"
                    margin="0 0 0 9px"
                  >
                    <strong style={{ fontWeight: "700" }}>
                      {item.label}:{" "}
                    </strong>
                    {item.content}
                  </H4>
                </Div>
                {item.link_text && (
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
                  >
                    {item.link_text}
                  </a>
                )}
              </Div>
            );
          })}
        </Div>
      </Grid>

      <Div flexWrap="wrap" margin_xxs="20px" margin_tablet="100px 0 0 0">
        <H2 lineHeight="36px">{props.heading || props.details.heading}</H2>
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
          //padding_tablet="0"
          gridTemplateColumns_tablet="repeat(14,1fr)"
          margin="0 auto"
          justifyItems="center"
          maxWidth="1366px"
          padding_tablet="0 40px"
          padding_md="0 80px"
          padding_lg="0"
        >
          <Div
            flexDirection="column"
            margin="0 0 0 0"
            minHeight="475px"
            height="auto"
            gridColumn_tablet="1/15"
            display="none"
            display_md="block"
          >
            <Div
              justifyContent="between"
              margin="50px 0 20px 0"
              className="badge-slider hideOverflowX__"
              display_xs="none"
              display_tablet="flex"
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
                    background={
                      selected.index === index ? Colors.grayBrown : null
                    }
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
            <Div display_xs="none" display_tablet="flex">
              <ContainerStyle>
                <FillerStyles
                  completed={
                    (steps[selected.index] * 100) / steps[steps.length - 1]
                  }
                />
              </ContainerStyle>
            </Div>
            <Div
              flexDirection="row"
              padding="32px"
              display_xs="none"
              display_tablet="flex"
            >
              {weeks.map((sm, index) => (
                <H4
                  margin="0 5px"
                  fontSize="15px"
                  lineHeight="22px"
                  color={Colors.darkGray}
                >
                  {sm}
                </H4>
              ))}
            </Div>
            <Div
              display_tablet="flex"
              display_xs="flex" // aqui
              flexDirection_xs="column"
              flexDirection_md="row"
              margin_xxs="20px"
            >
              <Div
                margin_md="20px 20px 0 0"
                margin_tablet="auto"
                margin_xs="0 0 20px 20px"
                width_md="50%"
                width_xs="300px"
                width_tablet="80%"
                height_md="fit-content"
                height_xs="auto"
              >
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
                    fontSize_xs="18px"
                    fontSize_tavlet="22px"
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
                        fontSize_tablet="18px"
                        fontSize_xs="14px"
                        lineHeight_tablet="19px"
                        lineHeight_xs="17px"
                        margin="0 0 10px 0"
                      >
                        {detail}
                      </Paragraph>
                    ))}
                </Div>
              </Div>
              <Div
                margin_md="20px 0 20px 20px"
                margin_tablet="auto"
                margin_xs="0 0 0 20px"
                display="inline"
                width_tablet="80%"
                width_md="50%"
                width_xs="320px"
              >
                <Div
                  margin_md="0 10px 0 0"
                  margin_xs="0 0 20px 0"
                  width="100%"
                  height_md="fit-content"
                  height_xs="auto"
                >
                  <Div>
                    <Icon icon="rocket" width="46px" height="46px" />
                  </Div>
                  <Div flexDirection="column" margin="0 0 0 15px">
                    <H3
                      textAlign="left"
                      textTransform="uppercase"
                      margin="0 0 10px 0"
                      fontSize_xs="18px"
                      fontSize_tavlet="22px"
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
                          fontSize_tablet="18px"
                          fontSize_xs="14px"
                          lineHeight_tablet="19px"
                          lineHeight_xs="17px"
                          margin="0 0 10px 0"
                        >
                          {detail}
                        </Paragraph>
                      ))}
                  </Div>
                </Div>
                <Div
                  margin="0 10px 0 0"
                  width="100%"
                  height_md="50px"
                  height_xs="auto"
                >
                  <Div>
                    <Icon icon="clock" width="46px" height="46px" />
                  </Div>
                  <Div flexDirection="column" margin="0 0 0 20px">
                    <H3
                      textAlign="left"
                      textTransform="uppercase"
                      margin="0 0 10px 0"
                      fontSize_xs="18px"
                      fontSize_tavlet="22px"
                    >
                      {strings[lang]["Duration"]}
                    </H3>
                    <Paragraph
                      textAlign="left"
                      color={Colors.darkGray}
                      fontSize="18px"
                      lineHeight="19px"
                      margin="0 0 10px 0"
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
