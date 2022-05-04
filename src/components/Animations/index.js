import React from "react";
import styled, { css, keyframes } from "styled-components";

export const Blink = keyframes`
    0%{     color: ${(props) => props.color};    }
    50%{    color: transparent; }
    100%{   color: ${(props) => props.color};    }
`;
export const FadeIn = keyframes`
    0% {
    opacity: 0;
    }
    100% {
    opacity: 1;
    }
`;
