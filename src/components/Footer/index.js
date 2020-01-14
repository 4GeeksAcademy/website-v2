import React from 'react';
import {Link} from 'gatsby';
import {Container, Row, Column, Divider} from '../Sections'
import {Colors} from '../Styling'
import {H5} from '../Heading'

const Footer = () => (
    <>
        <Container width="fluid" height="400px" color={Colors.black}>
            <Divider height="100px" />
            <Row center >
                <Column size="2">
                    <Row><H5 fontSize="16px" color={Colors.gray}>CONTACT</H5></Row>
                </Column>
                <Column size="3">
                    <Row><H5 fontSize="16px" color={Colors.gray}>COMPANY</H5></Row>
                </Column>
                <Column size="2">
                    <Row><H5 fontSize="16px" color={Colors.gray}>LOCATION</H5></Row>
                </Column>
                <Column size="2">
                    <Row><H5 fontSize="16px" color={Colors.gray}>FOLLOW</H5></Row>
                </Column>

            </Row>
        </Container>
    </>
);

export default Footer;