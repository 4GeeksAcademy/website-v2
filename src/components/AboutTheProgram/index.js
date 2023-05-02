import React, { useState, useEffect } from "react";
import {
  GridContainer,
  Div,
} from "../Sections";
import {
  H2,
  H3,
  H4,
  Paragraph,
} from "../Heading";
import { Colors, Anchor } from "../Styling";
import Icon from "../Icon";

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

  return (
    <>
      <GridContainer
        id={props.id}
        columns_tablet="2"
        background={props.background || Colors.verylightGray}
        padding_tablet="76px 0"
        padding="50px 10px"
        gridGap="50px"
      >
        <Div flexDirection="column">
          <H3 textAlign="left" margin="0 0 20px 0">
            {props.details.about?.title && props.details.about?.title}
          </H3>
          {props.details.about?.sub_title.split("\n").map((m, i) => (
            <Paragraph
              key={i}
              textAlign="left"
              margin="10px 0 "
              fontSize="15px"
              lineHeight="26px"
            >
              {m}
            </Paragraph>
          ))}
        </Div>
        <Div flexDirection="column" justifyContent="start">
          {Array.isArray(props.details.about?.list) &&
            props.details.about?.list.map((m, i) => {
              return (
                <Div
                  key={i}
                  borderBottom="1px solid #ebebeb"
                  gap_tablet="0"
                  gap="20px"
                  padding="15px 0"
                >
                  <Div minWidth="120px" minWidth_tablet="32%" gap="15px">
                    {/* Icon here */}
                    {m.icon && (
                      <Icon icon={m.icon} width="32px" height="32px" />
                    )}
                    <H4 type="h4" fontWeight="700" textAlign="left">
                      {`${m.label}: `}
                    </H4>
                  </Div>
                  <Div flexDirection={m.link && "column"}>
                    <Paragraph textAlign="left">{m.content}</Paragraph>
                    {m.link && (
                      <Anchor to={m.link} cursor="pointer">
                        <Paragraph
                          textAlign="left"
                          width="150px"
                          color={Colors.blue}
                        >{`${m.link_text}`}</Paragraph>
                      </Anchor>
                    )}
                  </Div>
                </Div>
              );
            })}
        </Div>
      </GridContainer>
    </>
  );
};

export default ProgramDetails;
