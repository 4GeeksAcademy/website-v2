import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Break } from "../Responsive";
import { Devices } from "../Responsive";
import BackgroundImage from "gatsby-background-image";
import { Link } from "gatsby";
import { Location } from "@reach/router";
import { getImage } from "gatsby-plugin-image";

const getBgImageType = (imageData) =>
  imageData.layout === "fixed" ? "fixed" : "fluid";
const getAspectRatio = (imageData) => imageData.width / imageData.height;
const getPlaceholder = (imageData) => {
  if (imageData.placeholder) {
    return imageData.placeholder.fallback.includes(`base64`)
      ? { base64: imageData.placeholder.fallback }
      : { tracedSvg: imageData.placeholder.fallback };
  }
  return {};
};

const convertToBgImage = (imageData) => {
  if (imageData && imageData.layout) {
    const returnBgObject = {};
    const bgType = getBgImageType(imageData);
    const aspectRatio = getAspectRatio(imageData);
    const placeholder = getPlaceholder(imageData);
    returnBgObject[bgType] = {
      ...imageData.images.fallback,
      ...placeholder,
      aspectRatio,
    };
    return returnBgObject;
  }
  return {};
};

export const Colors = {
  blue: "#00A0DA",
  lightBlue: "#BBEAFC",
  lightBlue2: "rgba(199, 243, 253, 0.5)",
  blue2: "#0097CD",
  veryLightBlue: "#C7F3FD",
  veryLightBlue2: "#E3F9FE",
  grayBrown: "#333333",
  gray2: "#A4A4A466",
  gray: "#898a8b",
  gray3: "#828282",
  verylightGray: "#F5F5F5",
  verylightGray2: "#FBFBFB",
  lightGray: "#ebebeb",
  lightGreen: "#c4f7b7",
  green: "#20630d",
  darkGray: "#3A3A3A",
  darkGray2: "#606060",
  borderGray: "#ececec",
  yellow: "#FFC718",
  lightYellow: "rgba(255, 183, 24, 0.1)",
  lightYellow2: "rgba(255, 183, 24, 0.2)",
  darkYellow: "#FFECBF",
  black: "#000000",
  white: "#FFFFFF",
  red: "red",
  lightRed: "#ffcdc9",
  whitePink: "#FFF1D1",
  shadow: "0px 0px 16px rgba(0, 0, 0, 0.15)",
};

export const Select = styled.select`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  appearance: none;
  width: ${(props) => props.width};
  text-align-last: center;
  border: ${(props) => props.border};
  font-family: lato, sans-serif;
  padding: 5px;
`;
export const Option = styled.option`
  background: green;
  color: black;
`;
export const Tooltip = styled.div`
  position: absolute;
  left: 30px;
  bottom: 0;
  transform: translateY(50%);
  height: auto;
  z-index: 1;
  width: 300px;
  opacity: 1;
  border-radius: 0.25rem;
  margin-bottom: 1em;
  padding: 1em;
  background-color: rgba(137, 138, 139, 1);
  color: white;
  font-size: 1em;
  line-height: 1.2;
  text-align: center;
  -webkit-transition: all 0.15s ease-in-out;
`;
export const RoundImage = styled.div`
  display: ${(props) => props.display || "block"};
  position: ${(props) => props.pos};
  background-image: url(${(props) => props.url});
  margin-bottom: ${(props) => props.mb};
  background-repeat: no-repeat;
  background-size: ${(props) => props.bsize};
  border-radius: ${(props) => props.border};
  margin: ${(props) => props.margin};
  background-position: ${(props) => props.position};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  :hover {
    opacity: ${(props) => props.opacity};
  }

  ${(props) =>
    props.move &&
    css`
      transform: translateY(-${(props) => props.up});
    `}
  @media ${Break.lg} {
    width: ${(props) => props.w_lg};
    height: ${(props) => props.h_lg};
    border-radius: ${(props) => props.br_lg};
  }
  @media ${Break.md} {
    height: ${(props) => props.h_md};
    width: ${(props) => props.w_md};
    border-radius: ${(props) => props.br_md};
  }
  @media ${Break.sm} {
    height: ${(props) => props.h_sm};
    width: ${(props) => props.w_sm};
    border-radius: ${(props) => props.br_sm};
  }
  @media ${Break.xs} {
    height: ${(props) => props.h_xs};
    width: ${(props) => props.w_xs};
    border-radius: ${(props) => props.br_xs};
  }

  @media ${Devices.tablet} {
    width: ${(props) => props.width_tablet};
    height: ${(props) => props.height_tablet};
  }
  @media ${Devices.md} {
    width: ${(props) => props.width_md};
  }
  @media ${Devices.lg} {
    width: ${(props) => props.width_lg};
  }
`;
export const Span = styled.div`
  color: ${(props) => props.color};
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  ${Tooltip}:hover {
    opacity: ${(props) => props.opacity};
  }
`;

const StyledImage = styled.div`
  display: ${(props) => props.display};
  position: ${(props) => props.position};
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: ${(props) => props.backgroundSize || "cover"};
  border-radius: ${(props) => props.borderRadius};
  background-position: ${(props) => props.position || "center center"};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  border: ${(props) => props.border};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "none")};
  min-width: ${(props) => props.minWidth};
  margin: ${(props) => props.margin};
  box-shadow: ${(props) => props.boxShadow};
  @media ${Break.sm} {
    height: ${(props) => props.h_sm};
    min-height: ${(props) => props.minHeight_sm};
    width: ${(props) => props.w_sm};
  }
  @media ${Devices.xxs} {
    display: ${(props) => props.display_xxs};
    height: ${(props) => props.height_xxs};
    right: ${(props) => props.right_xxs};
    bottom: ${(props) => props.bottom_xxs};
    left: ${(props) => props.left_xxs};
  }
  @media ${Devices.xs} {
    display: ${(props) => props.display_xs};
    height: ${(props) => props.height_xs};
    left: ${(props) => props.left_xs};
    right: ${(props) => props.right_xs};
    top: ${(props) => props.top_xs};
    bottom: ${(props) => props.bottom_xs};
  }
  @media ${Devices.sm} {
    width: ${(props) => props.width_sm};
  }
  @media ${Devices.tablet} {
    display: ${(props) => props.display_tablet};
    height: ${(props) => props.height_tablet};
    left: ${(props) => props.left_tablet};
    right: ${(props) => props.right_tablet};
    top: ${(props) => props.top_tablet};
    bottom: ${(props) => props.bottom_tablet};
  }
  @media ${Devices.md} {
    display: ${(props) => props.display_md};
    left: ${(props) => props.left_md};
    right: ${(props) => props.right_md};
    top: ${(props) => props.top_md};
    bottom: ${(props) => props.bottom_md};
  }
  @media ${Devices.lg} {
    display: ${(props) => props.display_lg};
    left: ${(props) => props.left_lg};
    right: ${(props) => props.right_lg};
    top: ${(props) => props.top_lg};
    bottom: ${(props) => props.bottom_lg};
  }
`;
export const Img = React.memo(StyledImage);

const StyledImageV2 = styled.div`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: ${(props) => props.backgroundSize || "cover"};
  border-radius: ${(props) => props.borderRadius};
  background-position: ${(props) => props.position || "center center"};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "none")};
  min-width: ${(props) => props.minWidth};
  margin: ${(props) => props.margin};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  rotate: ${(props) => props.rotate};
  @media ${Break.xs} {
    height: ${(props) => props.height_xs};
    min-height: ${(props) => props.minHeight_xs};
    width: ${(props) => props.with_xs};
    top: ${(props) => props.top_xs};
    left: ${(props) => props.left_xs};
  }
  @media ${Devices.tablet} {
    height: ${(props) => props.height_tablet};
    min-height: ${(props) => props.minHeight_tablet};
    width: ${(props) => props.width_tablet};
    top: ${(props) => props.top_tablet};
    left: ${(props) => props.left_tablet};
    rotate: ${(props) => props.rotate_tablet};
  }
  @media ${Devices.md} {
    height: ${(props) => props.height_md};
    min-height: ${(props) => props.minHeight_md};
    width: ${(props) => props.width_md};
    top: ${(props) => props.top_md};
    left: ${(props) => props.left_md};
  }
`;
export const ImgV2 = React.memo(StyledImageV2);

export const BackgroundSection = ({
  id,
  children,
  alt,
  className,
  image,
  height,
  width,
  bgSize,
  borderRadius,
  margin,
  withOverlay,
  style,
}) => {
  const thisImage = getImage(image);

  // Use like this:
  const bgImage = convertToBgImage(thisImage);

  return (
    <BackgroundImage
      id={id}
      alt={alt}
      Tag="section"
      loading="eager"
      // fadeIn={false}
      className={className}
      borderRadius={borderRadius}
      {...bgImage}
      preserveStackingContext
      style={style}
    >
      {children}
    </BackgroundImage>
  );
};

export const StyledBackgroundSection = styled(BackgroundSection)`
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.align};
  border-radius: ${(props) => props.borderRadius};
  box-shadow: ${(props) => props.boxShadow};
  position: ${(props) => props.position};
  background-repeat: no-repeat;
  margin: ${(props) => props.margin || "auto"};
  z-index: ${(props) => props.zIndex || 1};
  opacity: 1;
  background-size: ${(props) => props.bgSize || "cover"};
  height: ${(props) => props.height};
  max-width: ${(props) => props.maxWidth};
  min-height: ${(props) => props.minHeight};
  flex-shrink: ${(props) => props.flexShrink};
  display: ${(props) => props.display};
  &:before {
    background-size: ${(props) => props.bgSize};
  }
  ,
  &:after {
    min-height: ${(props) => props.minHeight};
    border-radius: ${(props) => props.borderRadius};
    filter: ${(props) => props.filter};
    height: ${(props) => props.h_sm};
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    background-color: ${(props) => props.backgroundColor};
    background-position: ${(props) => props.backgroundPosition} !important;
  }
  @media ${Devices.xxs} {
    height: ${(props) => props.height_xxs};
    width: ${(props) => props.width_xxs};
    margin: ${(props) => props.margin_xxs};
    &:before,
    &:after {
      filter: ${(props) => props.filter_xxs};
    }
  }
  @media ${Devices.xs} {
    height: ${(props) => props.height_xs};
    margin: ${(props) => props.margin_xs};
    width: ${(props) => props.width_xs || "100%"};
  }
  @media ${Devices.sm} {
    height: ${(props) => props.height_sm};
    width: ${(props) => props.width_sm};
  }
  @media ${Devices.tablet} {
    border-radius: ${(props) => props.borderRadius_tablet};
    height: ${(props) => props.height_tablet};
    width: ${(props) => props.width_tablet || "100%"};
    display: ${(props) => props.display_tablet};
    margin: ${(props) => props.margin_tablet};
    &:before,
    &:after {
      border-radius: ${(props) => props.borderRadius_tablet};
    }
  }
  @media ${Devices.md} {
    width: ${(props) => props.width_md};
    height: ${(props) => props.height_md};
  }
  @media ${Devices.lg} {
    height: ${(props) => props.height_lg};
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;
// @media ${Break.lg}{
//     &:before, &:after {
//         background-position: ${props => props.bp_lg} !important;
//     }
// }
// @media ${Break.md}{
//     &:before, &:after {
//         background-position: ${props => props.bp_md} !important;
//     }
// }
// @media ${Break.sm}{
//     height: ${props => props.h_sm};
//     width: ${props => props.w_sm};
//     &:before, &:after {
//         border-radius: ${props => props.borderRadius_sm};
//         background-position: ${props => props.bp_sm} !important;
//     }
// }
// @media ${Break.xs}{
//     width: ${props => props.w_xs};
//     &:before, &:after {
//         background-position: ${props => props.bp_xs} !important;
//     }
// }

export const Small = styled.small`
  display: ${(props) => props.display};
`;

const getVariant = (props) => ({
  outline: {
    border: `1px solid ${props.color}`,
    background: props.background || "initial",
    color: props.color,
    borderRadius: "3px",
  },
  full: {
    border: "none",
    background: props.color,
    color: props.textColor || "white",
  },
  empty: {
    border: "none",
    background: "none",
    color: "#0097CD",
    textTransform: "capitalize",
  },
});
const SmartButton = ({ children, onClick, type, icon, ...rest }) => {
  const styles = getVariant(rest)[rest.variant];
  return (
    <button
      type={type || "button"}
      onClick={(e) => onClick && onClick(e)}
      className={rest.className}
      style={{ ...rest.style, ...styles }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
};
export const Button = styled(SmartButton)`
  font-size: ${(props) => props.fontSize};
  font-family: "Lato", sans-serif;
  text-transform: ${(props) => props.textTransform || "uppercase"};
  font-weight: ${(props) => props.fontWeight || "700"};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderRadius};
  position: ${(props) => props.position};
  z-index: ${(props) => props.zIndex};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding || "12px 24px"};
  transform: ${(props) => props.transform};
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border: ${(props) => props.border};
  border-left: ${(props) => props.borderLeft};
  border-top: ${(props) => props.borderTop};
  border-bottom: ${(props) => props.borderBottom};
  border-right: ${(props) => props.borderRight};
  height: ${(props) => props.height || "40px"};
  cursor: ${(props) => props.cursor || "pointer"};
  text-align: ${(props) => props.textAlign || "center"};
  letter-spacing: ${(props) => props.letterSpacing || "0px"};
  line-height: ${(props) => props.lineHeight};
  vertical-align: middle;
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  min-width: ${(props) => props.minWidth};
  align-items: ${(props) => props.alignItems};
  align-self: ${(props) => props.alignSelf};
  justify-self: ${(props) => props.justifySelf};
  justify-content: ${(props) => props.justifyContent};
  box-shadow: ${(props) => props.boxShadow};
  &:hover {
    background-color: ${(props) => props.colorHover};
    color: ${(props) => props.colorHoverText};
  }
  @media ${Devices.xxs} {
  }
  @media ${Devices.xs} {
    width: ${(props) => props.width_xs};
    height: ${(props) => props.height_xs || "40px"};
    text-align: ${(props) => props.textAlign_xs || "center"};
    padding: ${(props) => props.padding_xs || "12px 24px"};
    max-width: ${(props) => props.maxWidth_xs};
    top: ${(props) => props.top_xs};
    bottom: ${(props) => props.bottom_xs};
    left: ${(props) => props.left_xs};
    right: ${(props) => props.right_xs};
  }
  @media ${Devices.sm} {
    width: ${(props) => props.width_sm};
    height: ${(props) => props.height_sm || "40px"};
    max-width: ${(props) => props.maxWidth_sm};
    margin: ${(props) => props.margin_sm};
    font-size: ${(props) => props.fontSize_sm};
    top: ${(props) => props.top_sm};
    bottom: ${(props) => props.bottom_sm};
    left: ${(props) => props.left_sm};
    right: ${(props) => props.right_sm};
  }
  @media ${Devices.tablet} {
    width: ${(props) => props.width_tablet};
    height: ${(props) => props.height_tablet || "40px"};
    margin: ${(props) => props.margin_tablet};
    padding: ${(props) => props.padding_tablet || "12px 24px"};
    max-width: ${(props) => props.maxWidth_tablet};
    display: ${(props) => props.display_tablet};
    top: ${(props) => props.top_tablet};
    bottom: ${(props) => props.bottom_tablet};
    left: ${(props) => props.left_tablet};
    right: ${(props) => props.right_tablet};
  }
  @media ${Devices.md} {
    width: ${(props) => props.width_md};
    font-size: ${(props) => props.fontSize_md};
    margin: ${(props) => props.margin_md};
    top: ${(props) => props.top_md};
    bottom: ${(props) => props.bottom_md};
    left: ${(props) => props.left_md};
    right: ${(props) => props.right_md};
  }
  @media ${Devices.lg} {
    font-size: ${(props) => props.fontSize_lg};
    width: ${(props) => props.width_lg};
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;

Button.defaultProps = {
  fontSize: "12px",
  width: "fit-content",
  type: "button",
  colorHover: null,
  borderRadius: "3px",
  outline: false,
  onClick: null,
  display: "flex",
  alignItems: "center",
};

export const Toggle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  border-radius: ${(props) => props.b_radius};
  cursor: pointer;
  vertical-align: middle;
  display: inline-block;
  font-family: lato, sans-serif;
`;

RoundImage.defaultProps = {
  width: "100%",
};
Select.defaultProps = {
  background: Colors.white,
  color: Colors.black,
  border: "none",
};

const SmartLink = ({ children, state, ...rest }) => (
  <Location>
    {({ location }) => (
      //make sure user's state is not overwritten
      <Link {...rest} state={{ prevUrl: location.href, ...state }}>
        {children}
      </Link>
    )}
  </Location>
);

export { SmartLink as Link };

const linkRegex = new RegExp("(tel:|http)");
const StyledLink = ({ children, ...rest }) => {
  let Comp = Link;
  let props = {};
  if (linkRegex.test(rest.to)) {
    props.href = rest.to;
    props.target = "_blank";
    props.rel = "noopener noreferrer nofollow";
    Comp = "a";
  } else if (!rest.to || rest.to.charAt(0) === "#" || rest.to === "") {
    Comp = "label";
  }
  return <Comp {...Object.assign(props, rest)}>{children}</Comp>;
};
export const Anchor = styled(StyledLink)`
  display: ${(props) => props.display || "block"};
  font-family: Lato, sans-serif;
  text-align: ${(props) => props.textAlign};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  letter-spacing: 0.05em;
  text-transform: ${(props) => props.textTransform};
  maxwidth: ${(props) => props.maxWidth};
  cursor: ${(props) => props.cursor};
  margin: ${(props) => props.margin};
  max-width: ${(props) => props.maxWidth};
  padding: ${(props) => props.padding};
  padding-right: ${(props) => props.paddingRight || "innitial"};
  text-shadow: ${(props) => props.textShadow};
  line-height: ${(props) => props.lineHeight};
  color: ${(props) => props.color};
  &:hover {
    text-decoration: underline;
  }
  @media ${Devices.xxs} {
  }
  @media ${Devices.xs} {
  }
  @media ${Devices.sm} {
  }
  @media ${Devices.tablet} {
  }
  @media ${Devices.md} {
  }
  @media ${Devices.lg} {
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;
//   @media ${Break.lg}{
//     text-align: ${props => props.align_lg};
//     font-size: ${props => props.fs_lg};
//   }
//   @media ${Break.md}{
//     text-align: ${props => props.align};
//     font-size: ${props => props.fs_md};
//   }
//   @media ${Break.sm}{
//     display: ${props => props.display_sm};
//     font-size: ${props => props.fs_sm};
//     text-align: ${props => props.align_sm || 'center'};
//   }
//   @media ${Break.xs}{
//     font-size: ${props => props.fs_xs};
//     text-align: ${props => props.align_xs};
//   }
