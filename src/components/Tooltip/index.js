import React from "react";
import styled from "styled-components";

const Tooltip = (props) => {
  const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
    .tooltiptext {
      visibility: hidden;
      width: 190px;
      background-color: ${props.background || "black"};
      color: ${props.color || "#fff"};
      text-align: center;
      padding: 7px;
      border-radius: 6px;
      font-family: Lato, sans-serif;
      font-weight: 400;
      line-height: 12px;
      text-align: left;
      font-size: 10px;
      /* Position the tooltip text - see examples below! */
      position: absolute;
      left: ${props.left};
      z-index: 1;
    }

    .tooltiptext::after {
      content: " ";
      position: absolute;
      top: 50%;
      right: 100%; /* To the left of the tooltip */
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent ${props.background || "black"} transparent
        transparent;
    }

    &:hover {
      .tooltiptext {
        visibility: visible;
      }
    }
  `;

  return (
    <TooltipContainer className="tooltip">
      {props.children}
      <span class="tooltiptext" style={{ ...props.styles }}>
        {props.text}
      </span>
    </TooltipContainer>
  );
};

export default Tooltip;
