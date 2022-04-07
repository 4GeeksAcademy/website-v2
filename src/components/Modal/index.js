import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Devices } from "../Responsive";

const Close = styled.div`
  font-family: "Helvetica", "Arial", sans-serif;
  position: fixed;
  right: 20px;
  top: 10px;
  color: black;
  font-size: 80px;
  cursor: pointer;
`;

const ModalBox = styled.div`
  position: fixed;
  padding: ${(props) => props.padding};
  left: 50%;
  top: ${(props) => props.top || "50%"};
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: white;
  overflow-y: auto;
  display: ${(props) => (props.open ? "block" : "none")};

  @media ${Devices.md} {
    overflow: hidden;
  }
`;
//display: ${props => props.open === true ? "inline-block" : "none"};
const Modal = (props) => {
  return (
    <ModalBox top={props.top} padding={props.boxPadding} open={props.open}>
      <Close onClick={props.onClose}>&#xd7;</Close>
      {props.children}
    </ModalBox>
  );
};
Modal.propTypes = {
  open: PropTypes.bool,
};
Modal.defaultProps = {
  open: false,
};
export default Modal;
