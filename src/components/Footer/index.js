import React from 'react';
import {Link} from 'gatsby';
import {Container, Row, Column, Divider} from '../Sections'
import {Colors, RoundImage} from '../Styling'
import {H5, Separator, Paragraph, Anchor} from '../Heading'
import {navegate} from "@reach/router";

const Footer = (props) => {
    // let col = data.allFooterYaml.edges;
    return (
    <Container github="/components/footer" 
        width="fluid" 
        height="auto" 
        color={Colors.black} 
        p_top="25px" 
        p_bottom="135px"
        p_xs="25px 15px 155px 15px"
    >
        <Row align="center" marginLeft="8%" marginRight="8%">
            {props.footer.map((item, index) => {
                return (
                    <Column key={index} size={item.width} size_sm="6" margin={"0 0 20px 0"}>
                        <H5 align="left" type="div" fontSize="16px" color={Colors.gray}>{item.heading}&nbsp;</H5>
                        <Separator width_sm="100%" width="100%" variant={"primary"}></Separator>
                        <ul
                            style={{
                                columnCount: item.items.length > 5 ? 2 : 1,
                                columnGap: "10px"
                            }}
                        >
                        {item.items.map((ln, i) => {
                            return (
                                <Anchor
                                    cursor="pointer"
                                    to={ln.link}
                                    align="left"
                                    align_sm="left"
                                    fontSize="16px"
                                    color={Colors.white}
                                >
                                    {ln.name}
                                </Anchor>
                            )
                        })}
                        </ul>
                    </Column>
                )
            })}
        </Row>
        <Row height="20%">
            <Column size="2"></Column>
            <Column size="8">
                <Row align="center">
                    <Column size="6" margin="5px 0">
                        <Paragraph fontSize="12px" color={Colors.gray}>@ 4Geeks Academy LLC 2019 </Paragraph>
                    </Column>
                    <Column size="6" margin="5px 0" customRespSize respSize="6">
                        <Row align="around">
                            <Column size="4"  selfAlign="center">
                                <Paragraph fontSize="10px" color={Colors.gray}>We accept: </Paragraph>
                            </Column>
                            <Column size="4" >
                                <RoundImage url="/images/bitcoin.png" height="10px" backgroundColor="transparent" position="center" bsize="contain" />
                            </Column>
                            <Column size="4" >
                                <RoundImage url="/images/ethereum.png" height="12px" backgroundColor="transparent" position="center" bsize="contain" />
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Column>
        </Row>
    </Container>
    )
};

export default Footer;

