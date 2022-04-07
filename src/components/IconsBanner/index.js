import React from "react";
import { H2, H3, H4 } from "../Heading";
import { Colors } from "../Styling";
import { Div } from "../Sections";
import Icon from "../Icon";

const positions = [
  {
    position: "1/3/1/5",
  },
  {
    position: "1/5/1/7",
  },
  {
    position: "1/7/1/9",
  },
  {
    position: "1/9/1/11",
  },
];

export default (props) => {
  return (
    <Div
      gridGap="0"
      alignItems="center"
      justifyContent="center"
      justifyContent_tablet="center"
      flexDirection="column"
      flexDirection_tablet="column"
    >
      <Div flexDirection="column" alignItems="center">
        <Icon icon={props.icon} width="94" height="98" />
        <H2
          type="h2"
          fontSize="15px"
          width="140px"
          width_md="auto"
          textTransform="uppercase"
          lineHeight="19px"
          padding="20px 0"
          padding_tablet="20px 15%"
        >
          {props.title}
        </H2>
      </Div>
    </Div>
  );
};
