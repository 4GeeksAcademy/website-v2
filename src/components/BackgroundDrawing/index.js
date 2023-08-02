import React from "react";
import styled from "styled-components";
import { Devices } from "../Responsive";

const Color = {
  blue: "#0097CD",
  grey: "#F5F5F5",
  black: "#000000",
  red: "#CD0000",
  yellow: "#FFB718",
  white: "#FFFFFF",
  darkGray: "#3A3A3A",
  lightBlue: "#C7F3FD",
};
const Figure = styled.div`
  z-index: ${(props) => props.zIndex || "-1"};
  display: ${(props) => props.display};
  position: ${(props) => props.zIndex || "absolute"};
  background-color: ${(props) => Color[props.color]};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  transform: scale(${(props) => props.scale}, ${(props) => props.scale});
  opacity: ${(props) => props.opacity};
  border-radius: ${(props) => props.border || "50%"};
  @media ${Devices.xxs} {
  }
  @media ${Devices.xs} {
  }
  @media ${Devices.sm} {
  }
  @media ${Devices.tablet} {
    width: ${(props) => props.width_tablet};
    height: ${(props) => props.height_tablet};
    display: ${(props) => props.display_tablet};
    top: ${(props) => props.top_tablet};
    left: ${(props) => props.left_tablet};
  }
  @media ${Devices.md} {
    width: ${(props) => props.width_md};
    height: ${(props) => props.height_md};
  }
  @media ${Devices.lg} {
  }
  @media ${Devices.xl} {
  }
`;
export const Circle = styled(Figure)``;
