import React from 'react';
import styled from "styled-components";

const Tooltip = (props) => {
    return (
        <TooltipContainer className="tooltip">
            {props.children}
            <span class="tooltiptext">{props.text}</span>
        </TooltipContainer>
    )
};

const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
    .tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        font-family: Lato, sans-serif;
        /* Position the tooltip text - see examples below! */
        position: absolute;
        z-index: 1;
    }

    &:hover{
        .tooltiptext{
            visibility: visible;
        }
    }
`;

export default Tooltip;