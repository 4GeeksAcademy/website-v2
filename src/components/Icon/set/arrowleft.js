import React from "react";
// export default props => <svg style={props.style} width={props.width} height={props.height} xmlns="https://www.w3.org/2000/svg" viewBox="0 0 32 32"><path stroke={props.color} fill={props.fill} d="M 13.28125 6.78125 L 4.78125 15.28125 L 4.09375 16 L 4.78125 16.71875 L 13.28125 25.21875 L 14.71875 23.78125 L 7.9375 17 L 28 17 L 28 15 L 7.9375 15 L 14.71875 8.21875 Z" /></svg>
export default (props) => (
  <svg
    onClick={props.onClick}
    style={props.style}
    width={props.width || "9"}
    height={props.height || "15"}
    viewBox="3.5 0 1 15"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <path
      d="M7.35001 13.7L1.00001 7.35L7.35001 1"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
