import React from 'react';
import Layout from '../global/Layout';
import {Column, Row, Container, Divider} from "../components/Sections"
import {Title, H5} from '../components/Heading'
import {Button, Colors, RoundImage} from '../components/Styling'
import PricesAndPayment from '../components/PricesAndPayment';

const Pricing = () => (
  <Layout>
    <Container fluid >
      <Row>
        <Column size="1" />
        <Column border bottom size="11" padding="7% 0" image url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80" height="100%">
          <Row>
            <Column size="2" />
            <Column size="6">
              <Title
                size="7"
                title="CELEBRATE THE BEST PRICE IN TOWN"
                paragraph="We never stop trying until we mastered a real premium affordable program. Our philosophy is rooted in making coding education available to everyone."
                style="light"
              />
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
    <Divider height="100px" />
    <Container fluid >
      <Row>
        <Column size="1" />
        <Column size="11" >
          <Row>
            <Column size="1" />
            <Column size="10">
              <Row>
                <Column size="5" height="300px">
                  <RoundImage url="../pricing.png" height="400px" bsize="contain" />
                </Column>
                <Column size="4">
                  <Divider height="100px" />
                  <H5 uppercase align="left" fontSize="20px" fontHeight="30px">Our program was specifically built to efficiently deliver the most current and essential  tech knowledge and skills while remaining affordable. </H5>
                </Column>
              </Row>
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
    <Divider height="150px" />
    <Container fluid >
      <Row>
        <Column size="1" />
        <Column size="11" color={Colors.lightGray} border top>
          <Row>
            <Column size="1" />
            <Column size="8">

              <Divider height="50px" />
              <Title
                title="PRICING AND FINANCING"
                paragraph="Currently review prices for Miami"
                primary
              />
              <Divider height="50px" />
            </Column>
          </Row>
          <PricesAndPayment />
        </Column>
      </Row>
    </Container>

  </Layout >
);

export default Pricing;