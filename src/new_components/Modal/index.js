import React, {useEffect, useState, useContext} from 'react';
import PropTypes from "prop-types"
import styled, {css, keyframes} from 'styled-components';
import {Button, Colors} from '../Styling';

const Close = styled.div`
    font-family: 'Helvetica', 'Arial', sans-serif;
    position: fixed;
    right: 20px;
    top: 10px;
    color: black;
    font-size: 80px;
    cursor: pointer;
`

const ModalBox = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: white;
    overflow: hidden;
    display: ${props => props.open ? "block" : "none"};
`
//display: ${props => props.open === true ? "inline-block" : "none"};
const Modal = (props) => {
    return (
        <ModalBox open={props.open}>
            <Close onClick={props.onClose}>&#xd7;</Close>
            {props.children}
        </ModalBox>
    )
};
Modal.propTypes = {
    open: PropTypes.bool
}
Modal.defaultProps = {
    open: false
};
export default Modal;