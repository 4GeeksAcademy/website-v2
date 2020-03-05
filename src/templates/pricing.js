import React, {useState} from 'react';
import Layout from '../global/Layout';
import styled, {css} from 'styled-components';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections";
import {Title, H3, H4, H5, Paragraph} from '../components/Heading';
import {Button, Colors, RoundImage} from '../components/Styling';
import Credentials from '../components/Credentials';
import PricesAndPayment from '../components/PricesAndPayment';
import WhoIsHiring from '../components/WhoIsHiring';
import BaseRender from './_baseRender';
import {Card} from '../components/Card';
import ToggleButton from '../components/ToggleButton';
import Modal from '../components/Modal';
import {reviewGuidebook} from "../actions";

const Input = styled.input`
    background-color:${Colors.lightGray};
    height: 40px;
    width: 100%;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-color: ${Colors.black};
`

const Pricing = (props) => {
    const {data, pageContext, yml} = props;
    const [showModal, setShowModal] = useState(false)
    const [formMessage, setFormMessage] = useState()
    const [formData, setVal] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });
    return (
        <>
            {/* HEADER SECTION */}
            <Wrapper
                style="default"
                image="yes"
                url={yml.banner.image}
                border="bottom"
                height="500px"
                backgroundSize="cover"
            >
                <Divider height="100px" />
                <Title
                    size="5"
                    color={Colors.white}
                    title={yml.banner.tagline}
                    paragraph={yml.banner.sub_heading}
                    main
                    paragraphColor={Colors.white}
                    fontSize="46px"
                    textAlign="center"

                />
            </Wrapper>
            {/* CREDENTIALS SECTION */}
            <Wrapper
                style="default">
                <Credentials up="80" />
            </Wrapper>
            <Divider height="100px" />
            {/*  */}
            <Container fluid >
                <Row>
                    <Column size="1" />
                    <Column size="11" >
                        <Row>
                            <Column size="1" />
                            <Column size="10">
                                <Row>
                                    <Column size="5" height="300px">
                                        <RoundImage url={yml.intro.image} height="400px" bsize="contain" />
                                    </Column>
                                    <Column size="4">
                                        <Divider height="100px" />
                                        <H5 uppercase align="left" fontSize="20px" fontHeight="30px">{yml.intro.content}</H5>
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Container>
            <Divider height="100px" />
            <Wrapper
                style="default"
                image="no"
                color={Colors.lightGray}
                border="top"

            >
                <Title
                    size="10"
                    title={yml.prices.heading}
                    primary
                />
                <PricesAndPayment type={pageContext.slug} lang={pageContext.lang} />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default"

            >
                <Title
                    size="10"
                    title={yml.payment_guide.heading}
                    paragraph={yml.payment_guide.sub_heading}
                    primary
                />
                <Divider height="30px" />
                <Row align="center">
                    <Modal showModal={showModal} shadow >
                        <Row height="20%" align="center">
                            <Column size="12" align="center"><H4>REVIEW GUIDEBOOK</H4></Column>
                        </Row>
                        <Row height="70%">
                            <Column size="12">
                                <Row height="30%" align="center">
                                    <Column size="11" >
                                        <Input
                                            type="text" className="form-control" placeholder="First name *"
                                            onChange={(e) => setVal({...formData, first_name: e.target.value})}
                                            value={formData.firstName}
                                        />
                                    </Column>
                                </Row>
                                <Row height="30%" align="center">
                                    <Column size="11">
                                        <Input type="text" className="form-control" placeholder="Last Name *"
                                            onChange={(e) => setVal({...formData, last_name: e.target.value})}
                                            value={formData.lastName}
                                        />
                                    </Column>
                                </Row>
                                <Row height="30%" align="center">
                                    <Column size="11">
                                        <Input type="email" className="form-control" placeholder="Email *"
                                            onChange={(e) => setVal({...formData, email: e.target.value})}
                                            value={formData.email}
                                        />
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                        <Row height="10%" padding="5px 0 0 0" borderTop={`1px solid ${Colors.blue}`}>

                            <Column size="6" customRespSize respSize="6">
                                <Paragraph>{formMessage}</Paragraph>
                            </Column>
                            <Column size="3" customRespSize respSize="3" align="right">
                                <Button width="100%" padding=".2rem .45rem" color={Colors.blue} textColor={Colors.white}
                                    onClick={() => {
                                        reviewGuidebook(formData)
                                            .then(() => {
                                                setFormMessage("Thank you");
                                            })
                                            .catch(() => {
                                                setFormMessage("error");
                                            })
                                    }}>Submit</Button>
                            </Column>
                            <Column size="3" customRespSize respSize="3" align="right">
                                <Button outline width="100%" padding=".2rem .45rem" color={Colors.red} textColor={Colors.white} onClick={() => setShowModal(!showModal)}>Close</Button>
                            </Column>
                        </Row>



                    </Modal>
                    <Button outline position="relative" width="300px" onClick={() => setShowModal(!showModal)} color={Colors.blue}>{yml.payment_guide.button_text}</Button>
                </Row>
                <Divider height="100px" />
            </Wrapper>
            <Wrapper
                style="default"
                image="no"
                color={Colors.lightGray}
                border="top"
            >
                <Divider height="20px" />
                <WhoIsHiring source={yml.ecosystem.partners_name} />
                <Divider height="150px" />
            </Wrapper>

        </ >
    )
};
export const query = graphql`
  query PricingQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            banner{
                tagline
                image
                sub_heading
            }
            intro{
                image
                content
            }
            prices{
                heading
            }
            payment_guide{
                heading
                sub_heading
                button_text
                button_link
                submit_button_text
                submit_button_link
            }
            ecosystem{
                heading
                sub_heading
                partners_name
            }
        }
      }
    }
  }
`;
export default BaseRender(Pricing);