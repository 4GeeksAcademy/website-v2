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
  background: rgba(16, 16, 16, 0.6);
  z-index: 999;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const Close = styled.div`
  font-family: "Helvetica", "Arial", sans-serif;
  position: fixed;
  right: 25px;
  top: 15px;
  color: white;
  font-size: 50px;
  cursor: pointer;
  z-index: 1001;
`;

const ModalBox = styled.div`
  position: fixed;
  padding: ${(props) => props.padding || "20px 0"};
  left: 50%;
  top: ${(props) => props.top || "50%"};
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 900px;
  height: auto;
  z-index: 1000;
  background: #1a1a1a;
  overflow-y: auto;
  border: 1px solid #000;
  border-radius: 15px;
  display: ${(props) => (props.open ? "block" : "none")};

  @media ${Devices.md} {
    overflow: hidden;
  }
`;

const Title = styled.h4`
  font-family: "Archivo", sans-serif;
  font-size: 45px;
  font-weight: 400;
  color: white;
  margin: 20px 0 10px 0;
  letter-spacing: 0.05em;

  @media ${Devices.md} {
    margin: 0 0 18px 0;
  }
`;

const Form = styled.form`
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 0 0 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  font-family: "Archivo", sans-serif;
  opacity: 1;
`;

const Button = styled.button`
  font-size: 21px;
  height: auto;
  justify-content: center;
  background: #000000;
  border-radius: 3px;
  color: #ffffff;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
`;

const Terms = styled.p`
  font-size: 10px;
  color: #3a3a3a;
  font-family: "Lato", sans-serif;
  margin-top: 10px;

  a {
    color: rgb(0, 132, 255);
    text-decoration: none;
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
