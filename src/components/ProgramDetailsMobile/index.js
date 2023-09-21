import React, { useState, useEffect } from "react";
import { Div, Grid } from "../Sections";
import { H3, H4, H5, Title, Separator, Span, Paragraph } from "../Heading";
import { Colors } from "../Styling";
import Card from "../Card";
import Icon from "../Icon";

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

const ProgramDetailsMobile = (props) => {
  const [selected, setSelected] = useState({ index: null, manual: false });
  const lang = props.lang || "us";
  if (!props.details) {
    console.log(
      "Warning! Ignoring Program Details because it came null form the graphql query"
    );
    return null;
  }
  return (
    <>
      <Div
        //className="program-details-mobile"
        flexWrap="wrap"
        padding_xs="0 20px"
        padding_tablet="0 35px"
        gridGap="10px"
      >
        {props.details.details_modules.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Div
                key={index}
                width="100%"
                height={selected.index === index ? "auto" : "76px"}
                padding_xs="10px 20px"
                border={`1px solid ${Colors.black}`}
                borderRadius="3px"
                borderLeft={`6px solid ${Colors.black}`}
                margin_xs="5px 0"
                display_md="none"
                cursor={`pointer`}
                onClick={() =>
                  selected.index === index
                    ? setSelected({ index: null, manual: true })
                    : setSelected({ index: index, manual: true })
                }
                justifyContent={`between`}
                flexDirection={selected.index === index && "column"}
              >
                <Div
                  display="flex"
                  flexDirection={`column`}
                  alignItems={`flex-start`}
                  style={{ position: "relative" }}
                >
                  <H3 textAlign="left">{item.module_name}</H3>
                  <Paragraph textAlign="left" margin="0 0 20px 0">
                    {item.duration}
                  </Paragraph>
                </Div>
                <Icon
                  icon="arrowdown"
                  width="32px"
                  style={{ position: "absolute", right: "35px" }}
                />
                {selected.index === index && (
                  <Div flexDirection="column">
                    <Div alignItems={`center`} margin={`10px 0`}>
                      <Icon
                        icon="laptop"
                        width="36px"
                        fill={Colors.blue}
                        stroke={Colors.blue}
                      />
                      <H3 textAlign="left" margin="0 0 0 16px" fontWeight="700">
                        {item.title}
                      </H3>
                    </Div>
                    <Paragraph textAlign="left" margin="0 0 20px 0">
                      {item.description}
                    </Paragraph>
                    <Div display="flex" alignItems={`center`} margin="10px 0">
                      <Icon
                        icon="rocket"
                        width="36px"
                        fill={Colors.blue}
                        stroke={Colors.blue}
                      />
                      <H3 margin={`0 10px`} fontWeight="700" textAlign="left">
                        {strings[lang]["Projects"]}
                      </H3>
                    </Div>
                    <Paragraph textAlign="left" margin="0 0 20px 0">
                      {item.projects}
                    </Paragraph>
                    <Div display="flex" alignItems={`center`} margin={`10px 0`}>
                      <Icon
                        icon="clock"
                        width="36px"
                        fill={Colors.blue}
                        stroke={Colors.blue}
                      />
                      <H3 margin={`0 10px`} fontWeight="700" textAlign="left">
                        {strings[lang]["Duration"]}
                      </H3>
                    </Div>
                    <Paragraph textAlign="left">{item.duration}</Paragraph>
                  </Div>
                )}
              </Div>
            </React.Fragment>
          );
        })}
      </Div>
    </>
  );
};

export default ProgramDetailsMobile;
