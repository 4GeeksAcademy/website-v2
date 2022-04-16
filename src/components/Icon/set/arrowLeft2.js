import React from "react";

export default (props) => (
  <svg
    style={props.style}
    width={props.width || "24px"}
    height={props.height || "15px"}
    viewBox="0 0 24 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M7.35156 13.7L1.00156 7.35L7.35156 1"
        stroke="black"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <line
      x1="2"
      y1="7"
      x2="23"
      y2="7"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <clipPath id="clip0">
        <rect
          width="14.7"
          height="8.35"
          fill="white"
          transform="translate(8.35156) rotate(90)"
        />
      </clipPath>
    </defs>
  </svg>
);
