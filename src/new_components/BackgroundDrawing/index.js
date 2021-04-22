import React from "react";
import styled from "styled-components";

const Color = {
  blue: "#0097CD",
  grey: "#F5F5F5",
  black: "#000000",
  red: "#CD0000",
  yellow: "#FFB718",
  lightBlue: "#C7F3FD"
};
const Figure = styled.div`
  z-index: ${props => props.zIndex || "-1"};
  position: absolute;
  background-color: ${(props) => Color[props.color]};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  transform: scale(${(props) => props.scale}, ${(props) => props.scale});
  opacity: ${(props) => props.opacity};
  border-radius: ${props => props.border || "50%"};
`;
export const Circle = styled(Figure)`
`;


