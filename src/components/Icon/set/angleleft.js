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
      d="M 19.03125 4.28125 L 8.03125 15.28125 L 7.34375 16 L 8.03125 16.71875 L 19.03125 27.71875 L 20.46875 26.28125 L 10.1875 16 L 20.46875 5.71875 Z"
    />
  </svg>
);
