import React from "react";
import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { Break } from "../Responsive";
import { FadeIn } from "../Animations";
import Fragment from "../Fragment";
import { navigate } from "gatsby";
import { RoundImage, Colors } from "../Styling";
import { Row, Column } from "../Sections";
import { Paragraph } from "../Heading";
import Icon from "../Icon";

const _colors = () => ({
  black: Colors.black,
  grey: Colors.lightGray,
  darkGray: Colors.borderGray,
  blue: Colors.blue,
  verylightGray: Colors.verylightGray,
});
const Card = styled(Fragment)`
    :focus {outline: none;};
    cursor: ${(props) => (props.onClick ? "pointer" : "inherit")};
    overflow: ${(props) => props.overflow};
    position: ${(props) => props.position};
    z-index: ${(props) => props.index};
    text-align: ${(props) => props.align || "initial"};
    flex-direction: column;
    min-height: ${(props) => props.minHeight};
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    height: ${(props) => props.height};
    padding: ${(props) => props.padding};
    background: ${(props) => _colors()[props.color] || Colors.white};
    border-radius: ${(props) => props.borders};
    border-top: ${(props) => props.borderTop};
    border-bottom: ${(props) => props.borderBottom};
    border-color: ${(props) => props.borderColor};
    transform: ${(props) => props.transform};
    display: ${(props) => props.display};
    box-shadow: ${(props) =>
      props.shadow === true
        ? `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);`
        : props.shadow}
    &:hover{
        background-color: ${(props) => props.bgHover};
    }
    @media ${Break.xl} {
        width: ${(props) => props.w_xl};
        height: ${(props) => props.h_xl};
        margin: ${(props) => props.margin_xl || props.margin};
    }
    @media ${Break.lg}{
        width: ${(props) => props.w_lg};
        height: ${(props) => props.h_lg};
        margin: ${(props) => props.margin_lg || props.margin};
    }
    @media ${Break.md}{
        height: ${(props) => props.h_md};
        width: ${(props) => props.w_md};
        padding: ${(props) => props.p_md};
        margin: ${(props) => props.margin_md || props.margin};
    }
    @media ${Break.sm}{
        height: ${(props) => props.h_sm};
        width: ${(props) => props.w_sm};
        margin: ${(props) => props.margin_sm || props.margin};
        padding: ${(props) => props.p_sm};
        display: ${(props) => props.display_sm};
        transform: none;
    }
    @media ${Break.xs}{
        height: ${(props) => props.h_xs};
        width: ${(props) => props.w_xs};
        padding: ${(props) => props.p_xs};
        margin: ${(props) => props.margin_xs || props.margin};
        display: ${(props) => props.display_xs};
        
    }
`;
Card.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borders: PropTypes.string,
  shadow: PropTypes.bool,
  move: PropTypes.string,
  up: PropTypes.string,
  down: PropTypes.string,
};
Card.defaultProps = {
  borders: "1.25rem",
  margin_sm: null,
  margin_xs: null,
};
export default Card;

export const GeekCard = ({ heading, bullets, image, to, icon }) => {
  return (
    <Card
      shadow
      cursor="pointer"
      style={{ position: "relative" }}
      bgHover={Colors.lightGray}
      onClick={() => navigate(to)}
      h_xs="auto"
      h_sm="370px"
      height="500px"
      padding="20px"
      width="100%"
      margin="10px 0px"
    >
      <RoundImage
        url={image}
        bsize="contain"
        height="80px"
        margin="0 0 30px 0"
        position="left"
      />
      {Array.isArray(bullets) &&
        bullets.map((pal, index) => {
          return (
            <Row display="flex" key={index} marginBottom="5px">
              <Column size="1" alignSelf="top">
                <Icon
                  icon="check"
                  width="12px"
                  color={Colors.yellow}
                  fill={Colors.yellow}
                />
              </Column>
              <Column
                size="10"
                test
                paddingRight="0px"
                paddingLeft="5px"
                alignSelf="center"
              >
                <Paragraph
                  fs_sm="14px"
                  fs_md="16px"
                  fs_lg="16px"
                  fontSize="16px"
                  align_sm="left"
                  color={Colors.gray}
                >
                  {pal}
                </Paragraph>
              </Column>
            </Row>
          );
        })}
      <Icon
        icon={icon}
        style={{ position: "absolute", right: "10px", bottom: "5px" }}
        width="32"
        color={Colors.yellow}
        fill={Colors.yellow}
      />
    </Card>
  );
};
