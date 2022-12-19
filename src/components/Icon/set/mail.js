import React from "react";
export default (props) => (
  <svg
    style={props.style}
    width={props.width || "18px"}
    height={props.width || "13px"}
    viewBox="0 0 18 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 1.40234V11.6062L5.10192 6.50426L0 1.40234Z"
      fill={props.color || "black"}
    />
    <path
      d="M1.01373 0.380005L7.47285 6.83912C8.28861 7.65488 9.71133 7.65488 10.5271 6.83912L16.9862 0.380005H1.01373Z"
      fill={props.color || "black"}
    />
    <path
      d="M11.5452 7.85726C10.8662 8.53694 9.96192 8.91206 9 8.91206C8.03808 8.91206 7.13376 8.53694 6.4548 7.85726L6.12 7.52246L1.0224 12.6201H16.9776L11.88 7.52246L11.5452 7.85726Z"
      fill={props.color || "black"}
    />
    <path
      d="M12.8981 6.50426L18 11.6062V1.40234L12.8981 6.50426Z"
      fill={props.color || "black"}
    />
  </svg>
);
