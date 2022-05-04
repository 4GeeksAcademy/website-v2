import React from "react";
// export default props => <svg style={props.style} width={props.width} height={props.height} viewBox="0 0 48 48" fill="none" xmlns="https://www.w3.org/2000/svg">
export default (props) => (
  <svg
    width="19"
    height="19"
    style={props.style}
    viewBox="0 0 19 19"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <path
      d="M9.49988 0.791656V12.6667"
      stroke={props.stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.33325 9.5L9.49992 12.6667L12.6666 9.5"
      stroke={props.stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.89788 1.5675C2.88954 2.93708 0.791626 5.97708 0.791626 9.5C0.791626 14.3133 4.68663 18.2083 9.49996 18.2083C14.3133 18.2083 18.2083 14.3133 18.2083 9.5C18.2083 5.96125 16.0945 2.91333 13.0625 1.55167"
      stroke={props.stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
