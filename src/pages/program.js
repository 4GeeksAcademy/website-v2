import React from 'react';
import Layout from '../global/Layout';
import {Card} from '../components/Card'
import {Container, Row, Column} from '../components/Sections'
import {Title, H2, H3, Span} from '../components/Heading'
import {Button, Colors} from '../components/Styling'

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
                <Column align="right" size="6"><Button color={Colors.white} margin="15px 0" textColor={Colors.black}>REQUEST SYLLABUS</Button></Column>
                <Column align="left" size="6"><Button color="red" margin="15px 0" textColor=" white">APPLY NOW</Button></Column>
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
                    <Column size="6"><Card shadow height="300px" width="300px" move="up" up="100px" ><H3 primary>GEEK<Span color={Colors.blue}>PAL</Span></H3></Card></Column>
                    <Column size="6"><Card shadow height="300px" width="300px" move="up" up="100px" ><H3 primary>GEEKTALK</H3></Card></Column>
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