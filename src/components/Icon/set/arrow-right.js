import React from "react";
export default (props) => (
  <svg
    style={props.style}
    width={props.width}
    height={props.height}
    viewBox="0 0 7 12"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L6 6L1 11"
      stroke={props.color}
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
