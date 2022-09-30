{
  /* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="https://www.w3.org/2000/svg">
<g clipPath="url(#clip0)">
<path d="M6 0.5L7.5 4.5H11.5L8.5 7L9.5 11L6 8.5L2.5 11L3.5 7L0.5 4.5H4.5L6 0.5Z" fill="#3A3A3A" stroke="#3A3A3A" strokeMiterlimit="10" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="12" height="11.5" fill="white"/>
</clipPath>
</defs>
</svg> */
}
import React from "react";
// export default props => <svg style={props.style} width={props.width} height={props.height} viewBox="0 0 52 39" fill="none" xmlns="https://www.w3.org/2000/svg">
export default (props) => (
  <svg
    style={props.style}
    width={props.width}
    height={props.height}
    viewBox="0 0 12 12"
    fill={props.fill}
    xmlns="https://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M6 0.5L7.5 4.5H11.5L8.5 7L9.5 11L6 8.5L2.5 11L3.5 7L0.5 4.5H4.5L6 0.5Z"
        strokeMiterlimit="10"
        stroke="#3a3a3a"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="12" height="11.5" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
