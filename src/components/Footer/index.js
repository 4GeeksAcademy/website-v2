import React from 'react';
import {Link} from 'gatsby';
import {Container, Row, Column, Divider} from '../Sections'
import {Colors} from '../Styling'
import {H5, Separator, Paragraph} from '../Heading'

const Footer = () => (
    <>
        <Container width="fluid" height="400px" color={Colors.black}>
            <Divider height="70px" />
            <Row >
                <Column size="2"></Column>
                <Column size="7">
                    <Row align="center">
                        <Column size="3">
                            <Row marginBottom="20px"><H5 fontSize="16px" color={Colors.gray}>CONTACT</H5></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.gray}>Monday to Friday</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.gray}>9::00am - 6:00pm </Paragraph></Row>
                        </Column>
                        <Column size="3">
                            <Row marginBottom="20px"><H5 fontSize="16px" color={Colors.gray}>COMPANY</H5></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Program</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>The Academy</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Partners</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Pricing</Paragraph></Row>
                        </Column>
                        <Column size="3">
                            <Row marginBottom="20px"><H5 fontSize="16px" color={Colors.gray}>LOCATIONS</H5></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Santiago de Chile</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Miami, Brickell</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Impact Hub, CCS, Vzla</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Maracaibo, Vzla</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Madrid, Spain</Paragraph></Row>
                        </Column>
                        <Column size="3">
                            <Row marginBottom="20px"> <H5 fontSize="16px" color={Colors.gray}>FOLLOW</H5></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Github</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Facebook</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Instagram</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Twitter</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.white}>Youtube</Paragraph></Row>
                        </Column>
                    </Row>
                </Column>


            </Row>
        </Container>
    </>
);

export default Footer;