import React from "react";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Colors } from "../Styling";
import { Div } from "../Sections";
import { Link } from "gatsby";
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

export default ({ icon, title, content }) => {
  return (
    <Div
      gridGap="0"
      //alignItems="stretch"
      justifyContent_tablet="flex-start"
      justifyContent_xs="flex-start"
      flexDirection="column"
      flexDirection_tablet="column"
      height="auto"
      width_tablet="100%"
      minWidth_tablet="120px"
      minWidth_md="180px"
      //minWidth_lg="240px"
      width_xs="100%"
      margin_tablet="0 10px"
      margin_xs="20px 0"
      padding_xs="0"
    >
      <Div
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding_tablet="0"
        padding_xs="0 10%"
        width="100%"
      >
        <Icon 
          icon={icon} 
          width="94" 
          height="98" 
          margin="0 0 20px 0" 
        />
        {
          title &&
          <H2
            type="h2"
            fontSize="16px"
            width="140px"
            width_md="auto"
            lineHeight="19px"
            padding="0"
            padding_tablet="20px 15%"
            textAlign="center"
          >
            {title}
          </H2>
        }
        {
          content &&
          <Paragraph
            fontSize="14px"
            lineHeight="17px"
            color={Colors.black}
            padding="0 15%"
            margin_xs="10px 0 0 0"
            width="100%"
            textAlign="center"
          >
            {content}
          </Paragraph>
        }

      </Div>
    </Div>
  );
};
