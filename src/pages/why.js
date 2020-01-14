import React from 'react';
import Layout from '../global/Layout';
import {Container, Column, Row, Wrapper, Divider} from '../components/Sections';
import QueryTest from '../components/QueryTest';
import {Title, H3, H4, Paragraph} from '../components/Heading'
import {Card} from '../components/Card'
import {Colors, Book, Teacher, Users, Sitemap} from '../components/Styling'


const Why = () => (
  <Layout>
    <Wrapper style="default" image="yes" height="400px" border="bottom" url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80">
      <Title size="8" title="ENABLING FUTURE AND CURRENT SOFTWARE BUILDERS TO ADAPT TO THE NEEDS OF THE REAL WORLD" />
    </Wrapper>
    <Wrapper style="default"><QueryTest /></Wrapper>
    <Divider height="100px" />
    <Wrapper style="default">
      <Title size="8" title="OUR FOUR CORNERSTONES" primary />
    </Wrapper>
    <Divider height="150px" />
    <Wrapper
      style="default"
      image="no"
      color={Colors.lightGray}
      border="top"
    >
      <Row marginBottom="30px">
        <Column size="6">
          <Card
            width="100%"
            height="200px"
            color="black"
            padding="30px"
            move="up"
            up="100px"
          >
            <Row>
              <Column size="3"><Book width="72px" color={Colors.yellow} fill={Colors.yellow} /></Column>
              <Column size="8" >
                <Row><H4 color={Colors.white}>FLIPPED CLASSROOM</H4></Row>
                <Row marginTop="15px">
                  <Paragraph fontSize="14px" lineHeight="18px">
                    Theory is delivered trough video, animation, images and infographics. Class time is then used to debate, create and build projects, and mentor over practicalexercises.
                  </Paragraph>
                </Row>
              </Column>
            </Row>
          </Card>
        </Column>
        <Column size="6">
          <Card
            width="100%"
            height="200px"
            color="black"
            padding="30px"
            move="up"
            up="100px"
          >
            <Row>
              <Column size="3"><Teacher width="72px" color={Colors.yellow} fill={Colors.yellow} /></Column>
              <Column size="8" >
                <Row><H4 color={Colors.white}>1:7 MENTOR-STUDENT RATIO</H4></Row>
                <Row marginTop="15px">
                  <Paragraph fontSize="14px" lineHeight="18px">
                    An intimate setting provides the faculty with the opportunity to adapt to each student's particular pace.
                  </Paragraph>
                </Row>
              </Column>
            </Row>
          </Card>
        </Column>
      </Row>
      <Row>
        <Column size="6">
          <Card
            width="100%"
            height="200px"
            color="black"
            padding="30px"
            move="up"
            up="100px"
          >
            <Row>
              <Column size="3"><Users width="72px" color={Colors.yellow} fill={Colors.yellow} /></Column>
              <Column size="8" >
                <Row><H4 color={Colors.white}>1:1 MENTORSHIP</H4></Row>
                <Row marginTop="15px">
                  <Paragraph fontSize="14px" lineHeight="18px">
                    Every student has the opportunity to have regular conversations with a mentor.
                  </Paragraph>
                </Row>
              </Column>
            </Row>
          </Card>
        </Column>
        <Column size="6">
          <Card
            width="100%"
            height="200px"
            color="black"
            padding="30px"
            move="up"
            up="100px"
          >
            <Row>
              <Column size="3"><Sitemap width="72px" color={Colors.yellow} fill={Colors.yellow} /></Column>
              <Column size="8" >
                <Row><H4 color={Colors.white}>TALENT TREE</H4></Row>
                <Row marginTop="15px">
                  <Paragraph fontSize="14px" lineHeight="18px">
                    The syllabus maps out 44 skills; students earn points towards each skill in a gamified fashion..
                  </Paragraph>
                </Row>
              </Column>
            </Row>
          </Card>
        </Column>
      </Row>
      <Divider height="50px" />
      <Title size="8" title="MEET THE TEAM" primary />
      <Divider height="150px" />
    </Wrapper>
    <Divider height="100px" />


    <Wrapper
      style="default">

    </Wrapper>
  </Layout>
);

export default Why;