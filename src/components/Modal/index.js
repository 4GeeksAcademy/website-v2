import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Devices } from "../Responsive";

// background
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const Close = styled.div`
  font-family: "Helvetica", "Arial", sans-serif;
  position: fixed;
  right: 20px;
  top: 10px;
  color: black;
  font-size: 80px;
  cursor: pointer;
  z-index: 1001;
`;

const ModalBox = styled.div`
  position: fixed;
  padding: ${(props) => props.padding};
  left: 50%;
  top: ${(props) => props.top || "50%"};
  transform: translate(-50%, -50%);
  width: 90%;
  height: auto;
  z-index: 1000;
  background: white;
  overflow-y: auto;
  border: 3px solid #000;
  border-radius: 15px;
  display: ${(props) => (props.open ? "block" : "none")};

  @media ${Devices.md} {
    overflow: hidden;
  }
`;

const Modal = (props) => {
  return (
    <>
      <Overlay open={props.open} onClick={props.onClose} />

      {/* Modal */}
      <ModalBox top={props.top} padding={props.boxPadding} open={props.open}>
        <Close onClick={props.onClose}>&#xd7;</Close>
        {props.children}
      </ModalBox>
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  open: false,
};

export default Modal;
