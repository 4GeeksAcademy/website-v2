import React, { useRef } from "react";
import { H2, H3, H4, Paragraph } from "../Heading";
import Slider from "react-slick";
import { Div, HR } from "../Sections";
import { StyledBackgroundSection } from "../Styling";
import { Button, Colors } from "../Styling";
import Icon from "../Icon";
import { smartRedirecting } from "../../utils/utils.js";

const JobGuaranteeSmall = ({ content }) => {
  return <Div>{content.title}</Div>;
};

export default JobGuaranteeSmall;
