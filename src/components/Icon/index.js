import React, { useEffect } from "react";
import loadable from "@loadable/component";
import PropTypes from "prop-types";

const Icon = ({ icon, ...rest }) => {
  if (typeof window === "undefined" || !window) return "";

  const Comp = loadable(() =>
    import(`./set/${icon}`).catch((err) => console.error(err))
  );
  return <Comp {...rest} />;
};
Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
};
Icon.defaultProps = {
  color: "black",
};
export default Icon;
