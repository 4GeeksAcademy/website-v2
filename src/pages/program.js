import React from 'react';
import Layout from '../global/Layout';
import {Card} from '../components/Card'
import {Container, Row, Column} from '../components/Sections'
import {Title} from '../components/Heading'
import {Button} from '../components/Styling'

const Program = () => (
  <Layout>
    <Container fluid>
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
              />
            </Column>
          </Row>
          <Row>
            <Column size="1" />
            <Column size="8">
              <Row>
                <Column size="6"><Button color="red" textColor="white">BE A HIRING PARTNER</Button></Column>
                <Column size="6"><Button color="red" textColor="white">BE A HIRING PARTNER</Button></Column>
              </Row>
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
    <Container fluid height="400px">
      <Row>
        <Column size="1" />
        <Column size="11" >
          <Row>
            <Column size="1" />
            <Column size="8">
              <Row>
                <Column size="1" />
                <Column size="11">
                  <Row>
                    <Column size="6"><Card shadow height="400px" width="400px" move="up" up="100px" margin="10px 0">d</Card></Column>
                    <Column size="6"><Card shadow height="400px" width="400px" move="up" up="100px" margin="10px 0">d</Card></Column>
                  </Row>
                </Column>
              </Row>
            </Column>
          </Row>

        </Column>
      </Row>
    </Container>

  </Layout>
);

export default Program;