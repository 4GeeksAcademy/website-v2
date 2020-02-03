import React from 'react';
import {Link} from 'gatsby';
import {Container, Row, Column, Divider} from '../Sections'
import {Colors, RoundImage} from '../Styling'
import {H5, Separator, Paragraph} from '../Heading'

const Footer = () => (
    <>
        <Container width="fluid" height="300px" color={Colors.black}>
            <Divider height="20%" />
            <Row height="60%">
                <Column size="2"></Column>
                <Column size="7">
                    <Row align="center">
                        <Column size="3" customRespSize respSize="6" margin="5px 0">
                            <Row marginBottom="20px"><H5 fontSize="16px" color={Colors.gray}>CONTACT</H5></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.gray}>Monday to Friday</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.gray}>9::00am - 6:00pm </Paragraph></Row>
                        </Column>
                        <Column size="3" customRespSize respSize="6" margin="5px 0">
                            <Row marginBottom="20px"><H5 fontSize="16px" color={Colors.gray}>COMPANY</H5></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Program</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>The Academy</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Partners</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Pricing</Paragraph></Row>
                        </Column>
                        <Column size="3" customRespSize respSize="6" margin="5px 0">
                            <Row marginBottom="20px"><H5 fontSize="16px" color={Colors.gray}>LOCATIONS</H5></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Santiago de Chile</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Miami</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Caracas</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Maracaibo</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Madrid</Paragraph></Row>
                        </Column>
                        <Column size="3" customRespSize respSize="6" margin="5px 0">
                            <Row marginBottom="20px"> <H5 fontSize="16px" color={Colors.gray}>FOLLOW</H5></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Github</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Facebook</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Instagram</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Twitter</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Youtube</Paragraph></Row>
                        </Column>
                    </Row>
                </Column>
            </Row>
            <Row height="20%">
                <Column size="2"></Column>
                <Column size="7">
                    <Row align="center">
                        <Column size="3">

                        </Column>
                        <Column size="3">

                        </Column>
                        <Column size="3">

                        </Column>
                        <Column size="3">
                            {/* <RoundImage url="../images/bitcoin.png" width="100px" bsize="cover" height="100px"></RoundImage> */}
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Container>
    </>
);

export default Footer;