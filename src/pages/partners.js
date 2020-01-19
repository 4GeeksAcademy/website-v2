import React from 'react';
import Layout from '../global/Layout';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections"
import {Title} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
import QueryTest from '../components/QueryTest';
import WhoIsHiring from '../components/WhoIsHiring';

const Partners = () => (
  <Layout>
    <Container fluid height="350px">
      <Row>
        <Column size="1" />
        <Column border="bottom" size="11" padding="10%" image url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80" height="600px">
          <Row>
            <Column size="1" />
            <Column size="8">
              <Title
                size="6"
                title="COMPANIES TRUST US AND HIRE OUR STUDENTS"
                paragraph="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
                style=""
              />
            </Column>
          </Row>
          <Row>
            <Column size="1" />
            <Column size="8">
              <Row center>
                <Button margin="15px 0px" color="red" textColor="white">BE A HIRING PARTNER</Button>
              </Row>
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
    <Container fluid >
      <Row>
        <Column size="1" />
        <Column size="11">
          <Row>
            <Column size="1" />
            <Column size="8">
              <QueryTest />
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
    <Divider height="100px" />
    <Wrapper
      style="default"
    >
      <Title
        size="10"
        title="SOME OF OUR PARTNERS AND EMPLOYERS"
        paragraph="To ensure that our students are getting hired, we work closely with both our hiring partners as well as industry leaders constantly refreshing and optimizing our program and syllabus."
        primary
        customParagraphSize="8"
      />
      <Divider height="20px" />
      <WhoIsHiring />
    </Wrapper>
    <Wrapper
      style="default"
    >
      <Divider height="50px" />
      <Title
        title="COMPANIES TRUST US AND HIRE OUR STUDENTS"
        paragraph="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
        primary
      />
      <Divider height="20px" />
      <WhoIsHiring />
    </Wrapper>
    <Wrapper
      style="default"
    >
      <Divider height="50px" />
      <Title
        title="IN PARTNERSHIP WITH THE CITY'S BIGGEST INFLUENCERS"
        paragraph="We actively organize and/or participate in the biggest coding initiatives."
        primary
      />
      <Divider height="20px" />
      <WhoIsHiring />
    </Wrapper>
  </Layout>
);

export default Partners;