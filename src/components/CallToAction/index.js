import React, { useState } from "react";
import { H2, Paragraph } from "../Heading";
import { Colors, Link, Button } from "../Styling";
import { Div } from "../Sections";

const CallToAction = ({
  background,
  title,
  text,
  button_text,
  button_link,
}) => (
  <Div
    background={background || Colors.lightYellow2}
    padding_tablet="0"
    flexDirection="column"
    width="100%"
    padding_tablet="30px 12% 20px"
    padding="35px 4%"
    borderRadius="3px"
  >
    <Div alignItems="center" flexDirection="column">
      <H2
        type="h3"
        fontSize="30px"
        lineHeight="36px"
        fontWeight="700"
        color={Colors.black}
      >
        {title || "Example title"}
      </H2>
      <Paragraph
        textAlign="center"
        margin="6px 0 !important"
        letterSpacing="0.05em"
        fontSize="15px"
        lineHeight="22px"
      >
        {text || "Lorem ipsum"}
      </Paragraph>
    </Div>
    <Div
      flexDirection_tablet="row"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Link to={button_link || "#"}>
        <Button
          variant="full"
          color={Colors.blue}
          margin="10px 0"
          textColor="white"
        >
          {button_text || "example button"}
        </Button>
      </Link>
    </Div>
  </Div>
);
export default CallToAction;
