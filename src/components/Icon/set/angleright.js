import React from "react";
export default (props) => (
  <svg
    style={props.style}
    width={props.width}
    height={props.height}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
    <path
      stroke={props.color}
      fill={props.fill}
      d="M 12.96875 4.28125 L 11.53125 5.71875 L 21.8125 16 L 11.53125 26.28125 L 12.96875 27.71875 L 23.96875 16.71875 L 24.65625 16 L 23.96875 15.28125 Z"
    />
  </svg>
);
