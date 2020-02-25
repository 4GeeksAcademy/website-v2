import React from 'react';
import Layout from '../global/Layout';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections"
import {Title, H5} from '../components/Heading'
import {Button, Colors, RoundImage} from '../components/Styling'
import Credentials from '../components/Credentials'
import PricesAndPayment from '../components/PricesAndPayment';
import WhoIsHiring from '../components/WhoIsHiring'
import BaseRender from './_baseRender'

const Pricing = (props) => {
    const {data, pageContext, yml} = props;
    console.log("yml", yml)
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
                    title={yml.banner.tagline}
                    paragraph={yml.banner.sub_heading}
                    main
                    color={Colors.white}
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
            <Divider height="200px" />
            <Wrapper
                style="default"
                image="no"
                color={Colors.lightGray}
                border="top"
                height="430px"
            >
                <Title
                    size="10"
                    title={yml.prices.heading}
                    primary
                />
                <PricesAndPayment type={pageContext.slug} lang={pageContext.lang} />
            </Wrapper>
            <Divider height="260px" />
            <Wrapper
                style="custom"
                full
            >
                <Title
                    size="10"
                    title={yml.payment_guide.heading}
                    paragraph={yml.payment_guide.sub_heading}
                    primary
                />
                <Divider height="30px" />
                <Row align="center">
                    <Button outline width="300px" color={Colors.blue}>{yml.payment_guide.button_text}</Button>
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