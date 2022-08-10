import React from "react";

export default (props) => (
  <svg 
    width={props.width || "20"} 
    height={props.height || "19" }
    style={props.style}
    viewBox="0 0 20 19" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 4H14V2C14 0.89 13.11 0 12 0H8C6.89 0 6 0.89 6 2V4H2C0.89 4 0.00999999 4.89 0.00999999 6L0 17C0 18.11 0.89 19 2 19H18C19.11 19 20 18.11 20 17V6C20 4.89 19.11 4 18 4ZM12 4H8V2H12V4Z" fill="black" />
  </svg>
);