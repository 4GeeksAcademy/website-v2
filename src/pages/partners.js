import React from 'react';
import Layout from '../global/Layout';
import {Column, Row, Container, Divider} from "../components/Sections"
import {Title} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
import QueryTest from '../components/QueryTest';
import WhoIsHiring from '../components/WhoIsHiring';

const Partners = () => (
  <Layout>
    <Container fluid height="400px">
      <Row>
        <Column size="1" />
        <Column border size="11" padding="10%" image url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80" height="600px">

          <Row>
            <Column size="1" />
            <Column size="8">
              <Title
                title="COMPANIES TRUST US AND HIRE OUR STUDENTS"
                paragraph="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
                style=""
              />
              <Button color="red" textColor="white">BE A HIRING PARTNER</Button>
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>

    <Container fluid height="100%">
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
                title="COMPANIES TRUST US AND HIRE OUR STUDENTS"
                paragraph="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
                style="light"
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
        <Column size="11" color={Colors.lightGray}>
          <Row>
            <Column size="1" />
            <Column size="8">
              <WhoIsHiring />
              <Divider height="50px" />
              <Title
                title="COMPANIES TRUST US AND HIRE OUR STUDENTS"
                paragraph="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
                style="light"
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