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

const Modal = styled.div`
    possition: absolute;
    top: 200;
    width: 100px;
    height: 200px;
    background: white;
`
const ToggleButton = (props) => {
    const {session, setSession} = useContext(SessionContext)
    const [toggle, setToggle] = useState(false)
    const [toggles, setToggles] = useState(false)
    const [formData, setVal] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    return (
        <>
            {/* <Card
                w_xs="200px"
                w_sm="200px"
                w_md="200px"
                w_lg="200px"
                w_xl="200px"
                index="3"
                shadow width="230px"
                padding={toggle === false ? "0px" : "0 0 10px 0"}> */}
            {/* <Row marginRight="0" marginLeft="0" align="center"> */}
            {toggle === true
                ? <Button margin={props.margin} width="200px" outline onClick={() => setToggle(!toggle)} color={props.color} textColor={props.textColor}>{toggle === true ? "Close" : props.text}</Button>
                : <Button margin={props.margin} width="200px" onClick={() => setToggle(!toggle)} color={props.color} textColor={props.textColor}>{toggle === true ? "Close" : props.text}</Button>}
            {toggle == true
                ?
                <Row marginBottom="5px" marginRight="0" marginLeft="0" align="center">
                    <Column size="6" align="left">
                        <Card index="1" borders=".25rem" margin="2px 0" height="auto" width="100%" padding="5px">
                            <Divider height="20px" />
                            <Row height="50px" align="center">
                                <Column size="11" >
                                    <Input
                                        type="text" className="form-control" placeholder="First name *"
                                        onChange={(e) => setVal({...formData, first_name: e.target.value})}
                                        value={formData.firstName}
                                    />
                                </Column>
                            </Row>
                            <Row height="50px" align="center">
                                <Column size="11">
                                    <Input type="text" className="form-control" placeholder="Last Name *"
                                        onChange={(e) => setVal({...formData, last_name: e.target.value})}
                                        value={formData.lastName}
                                    />
                                </Column>
                            </Row>
                            <Row height="50px" align="center">
                                <Column size="11">
                                    <Input type="email" className="form-control" placeholder="Email *"
                                        onChange={(e) => setVal({...formData, email: e.target.value})}
                                        value={formData.email}
                                    />
                                </Column>
                            </Row>
                            <Divider height="20px" />
                            <Row height="30px" align="center">
                                <Column size="11" align="center">
                                    <Button margin={props.margin} width="90%" onClick={() => {setToggle(!toggle); console.log(formData)}} color={props.sub_color} textColor={props.sub_textColor}>{props.sub_text}</Button>
                                </Column>
                            </Row>
                        </Card>
                    </Column>
                </Row>
                :
                null
            }
            {/* </Row> */}
            {/* </Card> */}

        </>
    )
};
ToggleButton.defaultProps = {
    color: Colors.blue,
    textColor: Colors.white,
    sub_color: Colors.blue,
    sub_textColor: Colors.white
};
export default ToggleButton;