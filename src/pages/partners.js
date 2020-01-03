import React from 'react';
import Layout from '../global/Layout';
import {Column, Row, Container} from "../components/Sections"
import {Title} from '../components/Heading'
import {Button, Colors} from '../components/Styling'

const Partners = () => (
  <Layout>
    {/* <div className="container-fluid"> */}
    <Container fluid>
      <Row>
        <Column size="1" />
        <Column size="11">
          <Row>
            <Column size="1" />
            <Column border size="11" padding="15%" color={Colors.blue} url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80" height="600px">
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
    {/* </div> */}
  </Layout>
);

export default Partners;