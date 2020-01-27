import React from 'react';
import {Row, Container, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, Address, Teacher, Glasses, Clock, Users, Comments, Button} from '../Styling';
import {Card} from '../Card';

const Alumni = props => {
    return (
        <>
            {props.hasTitle &&
                <>
                    <Title
                        title="MEET THE ALUMNI AND PROJECTS"
                        primary
                        size="8"
                        paragraph="Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue."
                    />
                    <Divider height="50px" />
                </>}
            <Row>
                <Column
                    size="12"
                    border="bottom"
                    image="no"
                    color={Colors.white}
                >
                    <Card shadow borders="1.25rem" height="426px">
                        <Row
                            height="100%"
                            marginLeft="0"
                            marginRight="0"
                            customRespSize

                        >
                            <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" border="bottom">
                                <Row align="center" height="100%">
                                    <Column size="8" height="100%">
                                        <Divider height="50px" />
                                        <Row height="100px">
                                            <H3 primary align="left" >LEOREM IPSUM</H3>
                                            <H3 primary align="left" >AND GET CAREER</H3>
                                            <H3 primary align="left" >SUPPORT FOR LIFE</H3>
                                        </Row>
                                        <Row>
                                            <Separator primary />
                                        </Row>
                                        <Row height="20%">
                                            <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="13px">Join more than 500 graduates already working as coders and become a part of one of the world's biggest coding community.</Paragraph>
                                        </Row>
                                        <Row>
                                            <Paragraph color={Colors.blue} margin="20px 0 0 0" align="left" fontSize="13px">Ligula Vulputate Sem ></Paragraph>
                                        </Row>
                                        <Row >
                                            <Button move="down" down="75px" outline color={Colors.gray} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">VIEW ALL PROJECTS</Button>
                                        </Row>
                                    </Column>
                                </Row>

                            </Column>
                            <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="yes" url="../images/alumni-bg.png" border="custom" customBorderRadius="0 1.25rem 1.25rem 0" />
                        </Row>
                    </Card>
                </Column>
            </Row>

        </>)

};

export default Alumni;