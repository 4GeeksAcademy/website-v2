import React from "react";
// export default props => <svg style={props.style} width={props.width} height={props.height} viewBox="0 0 52 39" fill="none" xmlns="https://www.w3.org/2000/svg">
export default (props) => (
  <svg
    width={props.width || "52"}
    height={props.height || "52"}
    viewBox="0 0 52 52"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <path
      d="M36.87 18.3914L20.5656 33.6088L15.1309 28.174"
      stroke="#23C520"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 51C39.8071 51 51 39.8071 51 26C51 12.1929 39.8071 1 26 1C12.1929 1 1 12.1929 1 26C1 39.8071 12.1929 51 26 51Z"
      stroke="#23C520"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
