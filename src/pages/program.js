import React from 'react';
import Layout from '../global/Layout';
import {Card} from '../components/Card'
import {Container, Row, Column} from '../components/Sections'
<<<<<<< HEAD
import {Title, H2, H3, Span} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
=======
import {Title} from '../components/Heading'
import {Button} from '../components/Styling'
>>>>>>> e83afba14acaf91624362aa4de2103f6e6ad1b7c

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
<<<<<<< HEAD
                <Column align="right" size="6"><Button color={Colors.white} margin="15px 0" textColor={Colors.black}>REQUEST SYLLABUS</Button></Column>
                <Column align="left" size="6"><Button color="red" margin="15px 0" textColor=" white">APPLY NOW</Button></Column>
=======
                <Column size="6"><Button color="red" textColor="white">BE A HIRING PARTNER</Button></Column>
                <Column size="6"><Button color="red" textColor="white">BE A HIRING PARTNER</Button></Column>
>>>>>>> e83afba14acaf91624362aa4de2103f6e6ad1b7c
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
<<<<<<< HEAD
                    <Column size="6"><Card shadow height="400px" width="400px" move="up" up="100px" margin="10px 0"><H3 primary>GEEK<Span color={Colors.blue}>PAL</Span></H3></Card></Column>
                    <Column size="6"><Card shadow height="400px" width="400px" move="up" up="100px" margin="10px 0"><H3 primary>GEEKTALK</H3></Card></Column>
=======
                    <Column size="6"><Card shadow height="400px" width="400px" move="up" up="100px" margin="10px 0">d</Card></Column>
                    <Column size="6"><Card shadow height="400px" width="400px" move="up" up="100px" margin="10px 0">d</Card></Column>
>>>>>>> e83afba14acaf91624362aa4de2103f6e6ad1b7c
                  </Row>
                </Column>
              </Row>
            </Column>
          </Row>
<<<<<<< HEAD
=======

>>>>>>> e83afba14acaf91624362aa4de2103f6e6ad1b7c
        </Column>
      </Row>
    </Container>

  </Layout>
);

export default Program;