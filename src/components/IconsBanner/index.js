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

export default ({ icon, title, content, index }) => {
  return (
    <Div
      key={index}
      background="#FFF"
      border="3px solid #000"
      width="100%"
      width_md="320px"
      width_tablet="200px"
      boxShadow="6px 6px 0px 0px rgba(0,0,0,1)"
      boxShadow_tablet="9px 8px 0px 0px rgba(0,0,0,1)"
      flexDirection_tablet="column"
      justifyContent_tablet="start"
      padding="15px"
      alignItems="center"
      alignItems_tablet="start"
      borderRadius="4px"
    >
      {icon && <Icon icon={icon} width="56px" height="56px" color={null} />}
      <Div
        margin="0 0 0 15px"
        margin_tablet="30px 0 0 0"
        display="flex"
        flexDirection="column"
        display_tablet="block"
      >
        {title && (
          <H3
            textAlign="left"
            fontSize="16px"
            fontFamily="Archivo-Black"
            // lineHeight="20px"
            margin="0"
          >
            {title}
          </H3>
        )}
        {content && (
          <Paragraph textAlign="left" color="#000" opacity="1" fontSize="24px">
            {content}
          </Paragraph>
        )}
      </Div>
    </Div>
  );
};
