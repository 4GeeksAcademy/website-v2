import React from "react";
export default (props) => (
  <svg
    style={props.style}
    width={props.width || "70"}
    height={props.height || "55"}
    viewBox="0 0 70 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M37.2734 37.756H51.895L63.8518 47.8527V37.756H69.1675V17.5625H37.2734V37.756Z"
      fill="#FFCF18"
    />
    <path
      d="M22.2627 31.2902H19.5979L8.96653 41.387V31.2902H1V1H51.4919V17.4039"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30.2305 43.9025H44.8521L56.8088 53.9992V43.9025H62.1245V23.709H30.2305V43.9025Z"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
