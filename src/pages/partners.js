import React from 'react';
import Layout from '../global/Layout';
import {Column, Row, Container, Divider} from "../components/Sections"
import {Title} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
import QueryTest from '../components/QueryTest';
import WhoIsHiring from '../components/WhoIsHiring';
<<<<<<< HEAD

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
=======

const Partners = () => (
  <Layout>
    <Container fluid height="400px">
      <Row>
        <Column size="1" />
        <Column border bottom size="11" padding="10%" image url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80" height="600px">
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
                <Button color="red" textColor="white">BE A HIRING PARTNER</Button>
              </Row>
            </Column>
          </Row>

        </Column>
      </Row>
    </Container>
    <Container fluid height="100%">
>>>>>>> e83afba14acaf91624362aa4de2103f6e6ad1b7c
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
    <Container fluid height="100px">
      <Row>
        <Column size="1" />
        <Column size="11">
          <Row>
            <Column size="1" />
            <Column size="8">
              <Title
                size="10"
                title="SOME OF OUR PARTNERS AND EMPLOYERS"
                paragraph="To ensure that our students are getting hired, we work closely with both our hiring partners as well as industry leaders constantly refreshing and optimizing our program and syllabus."
                primary
              />
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
    <Divider height="150px" />
    <Container fluid height="100%">
      <Row>
        <Column size="1" />
        <Column size="11" color={Colors.lightGray} border top>
          <Row>
            <Column size="1" />
            <Column size="8">
              <WhoIsHiring />
              <Divider height="50px" />
              <Title
                title="COMPANIES TRUST US AND HIRE OUR STUDENTS"
                paragraph="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
                primary
              />
              <Divider height="50px" />
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
  </Layout>
);

export default Partners;