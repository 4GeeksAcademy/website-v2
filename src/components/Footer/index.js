import React from 'react';
import {Link} from 'gatsby';
import {Container, Row, Column, Divider} from '../Sections'
import {Colors, RoundImage} from '../Styling'
import {H5, Separator, Paragraph} from '../Heading'

const Footer = () => (
    <>
        <Container width="fluid" height="auto" color={Colors.black} p_top="15px" p_bottom="15px">
            <Divider height="20%" />
            <Row height="60%">
                <Column size="2"></Column>
                <Column size="8">

                    <Row align="center">
                        <Column size="3" margin="0 0 20px 0">
                            <Row><H5 fontSize="16px" color={Colors.gray}>CONTACT</H5></Row>
                            <Row marginBottom="10px"><Separator primary></Separator></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.gray}>Monday to Friday</Paragraph></Row>
                            <Row><Paragraph fontSize="12px" color={Colors.gray}>9::00am - 6:00pm </Paragraph></Row>
                        </Column>
                        <Column size="3" margin="0 0 20px 0">
                            <Row><H5 fontSize="16px" color={Colors.gray}>COMPANY</H5></Row>
                            <Row marginBottom="10px"><Separator primary></Separator></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Program</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>The Academy</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Partners</Paragraph></Row>
                            <Row marginBottom="5px"><Paragraph fontSize="12px" color={Colors.white}>Pricing</Paragraph></Row>
                            <Row marginBottom="5px"><Link to="/jobs"><Paragraph fontSize="12px" color={Colors.white}>Careers</Paragraph></Link></Row>
                        </Column>
                        <Column size="3" margin="0 0 20px 0">
                            <Row ><H5 fontSize="16px" color={Colors.gray}>LOCATIONS</H5></Row>
                            <Row marginBottom="10px"><Separator primary></Separator></Row>
                            <Row marginBottom="5px"><Link to="/location/santiago-chile"><Paragraph fontSize="12px" color={Colors.white}>Santiago de Chile</Paragraph></Link></Row>
                            <Row marginBottom="5px"><Link to="/location/downtown-miami"><Paragraph fontSize="12px" color={Colors.white}>Miami</Paragraph></Link></Row>
                            <Row marginBottom="5px"><Link to="/location/impact-hub"><Paragraph fontSize="12px" color={Colors.white}>Caracas</Paragraph></Link></Row>
                            <Row marginBottom="5px"><Link to="/location/maracaibo"><Paragraph fontSize="12px" color={Colors.white}>Maracaibo</Paragraph></Link></Row>
                            <Row marginBottom="5px"><Link to="/location/madrid"><Paragraph fontSize="12px" color={Colors.white}>Madrid</Paragraph></Link></Row>
                        </Column>
                        <Column size="3" margin="0 0 20px 0">
                            <Row> <H5 fontSize="16px" color={Colors.gray}>FOLLOW</H5></Row>
                            <Row marginBottom="10px"><Separator primary></Separator></Row>
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
                <Column size="8">
                    <Row align="center">
                        <Column size="9" margin="5px 0" customRespSize respSize="6">
                            <Paragraph fontSize="12px" color={Colors.gray}>@ 4Geeks Academy LLC 2019 </Paragraph>
                        </Column>
                        <Column size="3" margin="5px 0" customRespSize respSize="6">
                            <Row>
                                <Column size="6" customRespSize respSize="6">
                                    <RoundImage url="/images/bitcoin.png" height="12px" backgroundColor="transparent" position="center" bsize="contain" />
                                </Column>
                                <Column size="6" customRespSize respSize="6">
                                    <RoundImage url="/images/ethereum.png" height="14px" backgroundColor="transparent" position="center" bsize="contain" />
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Container>
    </>
);

export default Footer;