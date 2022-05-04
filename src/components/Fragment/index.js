import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";
import { parseQueryString } from "../../utils/utils";
import styled from "styled-components";
import { checkPropTypes } from "prop-types";

export const An = styled.a`
  color: black;
  background: yellow;
  padding: 10px 20px;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
  position: absolute;
  z-index: 2000;
`;

const GITHUB_REPO =
  "https://github.com/4GeeksAcademy/website-v2/tree/master/src/data";
const Fragment = ({ github, style, onClick, className, children }) => {
  let { edit } = parseQueryString(useLocation().search);
  const [editMode, setEditMode] = React.useState(false);
  const [status, setStatus] = React.useState({ toggle: false, hovered: false });
  React.useEffect(() => {
    if (edit !== undefined) {
      localStorage.setItem("edit-mode", "true");
      setEditMode(true);
    } else setEditMode(localStorage.getItem("edit-mode") === "true");
  }, []);
  if (editMode && github)
    return (
      <div
        style={{
          ...style,
          position: "relative",
          background: status.hovered ? "rgba(0,0,0,0.3)" : "none",
        }}
        className={className}
      >
        <An
          onMouseLeave={() => {
            setStatus({ ...status, hovered: false });
            setTimeout(() => {
              setStatus((_status) => ({ ..._status, toggle: _status.hovered }));
            }, 300);
          }}
          onMouseEnter={() => setStatus({ ...status, hovered: true })}
          href={`${GITHUB_REPO}${github}`}
          target="blank"
          rel="noopener noreferrer nofollow"
        >
          edit
        </An>
        {children}
      </div>
    );
  else
    return (
      <div
        onClick={(e) => onClick && onClick(e)}
        style={{ ...style }}
        className={className}
      >
        {children}
      </div>
    );
};
const FakeFragment = ({ style, className, onClick, children }) => (
  <div
    onClick={(e) => onClick && onClick(e)}
    style={{ ...style }}
    className={className}
  >
    {children}
  </div>
);
Fragment.propTypes = {
  github: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};
Fragment.defaultValues = {
  github: null,
  style: {},
  className: "",
  children: null,
};

export default process.env.GATSBY_EDIT_MODE === "TRUE"
  ? Fragment
  : FakeFragment;
