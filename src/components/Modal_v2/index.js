import React from "react";
import styled from "styled-components";
import { H3 } from "../Heading";
import Icon from "../Icon";

const Modal = ({
  children,
  show,
  onClose,
  title,
  showHeader,
  showOverlay = true,
  positionModal,
  padding,
}) => {
  return (
    <>
      {show && (
        <Overlay showOverlay={showOverlay} positionModal={positionModal}>
          <ModalContainer>
            {showHeader && (
              <ModalHeader>
                <H3
                  fontSize_tablet="22px"
                  fontSize_xs="16px"
                >{title}</H3>
              </ModalHeader>
            )}
            <CloseButton onClick={onClose}>
              <Icon icon="close" />
            </CloseButton>
            <ModalChildren padding={padding}>{children}</ModalChildren>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};

export default Modal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  background: ${(props) =>
    props.showOverlay ? "rgba(0,0,0,.5)" : "rgba(0,0,0,0)"};
  padding: 40px;
  display: flex;
  align-items: ${(props) =>
    props.positionModal ? props.positionModal : "center"};
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 500px;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  /* padding: ${(props) => (props.padding ? props.padding : "20px")}; */
`;

const ModalChildren = styled.div`
  padding: ${(props) => (props.padding ? props.padding : "20px")};
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 20px; */
  padding: 10px;
  border-bottom: 1px solid #a9a9a9;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 13px;
  height: 13px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  &:hover {
    background: #f2f2f2;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;
