import React, {useEffect, useState, useContext} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {SessionContext} from '../../session';
import {Button, Colors} from '../Styling';
import {Card} from '../Card'
import {Row, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../Heading'
import {useStaticQuery, graphql} from 'gatsby';
import Link from 'gatsby-link'

const Input = styled.input`
    background-color:${Colors.lightGray};
    height: 40px;
    width: 100%;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-color: ${Colors.black};
`

const ModalBox = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    border-radius: 1.25rem;
    padding: 1rem;
    height: 300px;
    z-index: 1000;
    background: white;
    box-shadow: ${props => props.shadow
        && `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);`
    }
    display: ${props => props.show === true ? "inline-block" : "none"};
    overflow: hidden;
`
const Modal = (props) => {
    const [state, setState] = useState()
    const [formData, setVal] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    return (
        <>
            <ModalBox show={props.showModal} shadow>
                {props.children}
            </ModalBox>

        </>
    )
};
Modal.defaultProps = {

};
export default Modal;