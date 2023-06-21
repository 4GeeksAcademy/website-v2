import React from "react";

export default (props) => (
  <svg
    width={props.width || "233px"}
    height={props.height || "24px"}
    style={props.style}
    viewBox="0 0 233 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M232.061 13.0607C232.646 12.4749 232.646 11.5251 232.061 10.9393L222.515 1.3934C221.929 0.807611 220.979 0.807611 220.393 1.3934C219.808 1.97919 219.808 2.92893 220.393 3.51472L228.879 12L220.393 20.4853C219.808 21.0711 219.808 22.0208 220.393 22.6066C220.979 23.1924 221.929 23.1924 222.515 22.6066L232.061 13.0607ZM0 13.5H231V10.5H0V13.5Z"
      fill={props.color || "black"}
    />
  </svg>
);
