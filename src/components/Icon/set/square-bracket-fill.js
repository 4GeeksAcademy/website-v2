import React from "react";
export default (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    style={props.style}
    viewBox="0 0 7 17"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 0L7 0V2.84916L2.59259 2.84916L2.59259 14.1508H7V17H0L0 0Z"
      fill={props.color}
    />
  </svg>
);
