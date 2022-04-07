import React from "react";
// export default props => <svg style={props.style} width={props.width} height={props.height} xmlns="https://www.w3.org/2000/svg" viewBox="0 0 32 32"><path stroke={props.color} fill={props.fill} d="M 18.71875 6.78125 L 17.28125 8.21875 L 24.0625 15 L 4 15 L 4 17 L 24.0625 17 L 17.28125 23.78125 L 18.71875 25.21875 L 27.21875 16.71875 L 27.90625 16 L 27.21875 15.28125 Z" /></svg>
export default (props) => (
  <svg
    className={props.className}
    style={props.style}
    width={props.width}
    height={props.height}
    viewBox="0 0 32 31"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <rect width="32" height="30.8213" fill="black" />
    <g clipPath="url(#clip0)">
      <path
        d="M13 9.63164L19.35 15.7477L13 21.8638"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="14.1584"
          height="8.35001"
          fill="white"
          transform="translate(12 22.8269) rotate(-90)"
        />
      </clipPath>
    </defs>
  </svg>
);
