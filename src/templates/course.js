import React, {useState, useEffect, useContext} from 'react';
import Layout from '../global/Layout';
import styled from 'styled-components';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, Divider} from '../components/Sections'
import {Title, H2, H3, Span, Paragraph} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, RoundImage} from '../components/Styling'
import GeeksVsOthers from '../components/GeeksVsOthers'
import Mentors from '../components/Mentors'
import PricesAndPayment from '../components/PricesAndPayment'
import Alumni from '../components/Alumni'
import Credentials from '../components/Credentials'
import Scrollspy from 'react-scrollspy'
import BaseRender from './_baseRender'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {SessionContext} from '../session.js'
import ProgramSelector from '../components/ProgramSelector'
import {BrowserView} from "react-device-detect";

const Program = ({data, pageContext, yml}) => {
  const [weeks, setWeeks] = useState(week)
  const [currentIndex, setCurrentIndex] = useState(0);
  const geek = data.allCourseYaml.edges[0].node;
  const details = data.allCourseYaml.edges[0].node.details[0];
  let week = "";
  {
    pageContext.slug === "full-stack-web-development-bootcamp-full-time"
      ? week = 9
      : pageContext.slug === "full-stack-web-development-bootcamp-part-time"
        ? week = 16
        : pageContext.slug === "coding-introduction"
        && null
  }
  return (<>
    <Wrapper
      style="default"
      image="yes"
      url={yml.basic_info.image}
      border="bottom"
      height="700px"
      backgroundSize="cover"
    >
      <Divider height="240px" />
      <ProgramSelector week={week} />
      <Divider height="20px" />
      <Title
        size="5"
        title={yml.tagline}
        main
        color={Colors.white}
        fontSize="46px"
        textAlign="center"

      />
      <Row align="center">
        <Column align="right" size="6"><Button width="200px" color={Colors.white} margin="15px 0" textColor={Colors.black}>REQUEST SYLLABUS</Button></Column>
        <Column align="left" size="6"><Button width="200px" color="red" margin="15px 0" textColor=" white">APPLY NOW</Button></Column>
      </Row>
    </Wrapper>
    <Wrapper
      style="default">
      <Credentials up="80" />
    </Wrapper>
    <BrowserView>
      <Scrollspy style={{fontSize: "12px", position: "sticky", top: "10%", fontFamily: "Lato-Bold, sans-serif", color: Colors.blue}} items={['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6',]} currentClassName="nav__item--active">
        <li><a className="nav-item nav-link side" href="#section-1" >MEMBERSHIPS</a></li>
        <li><a className="nav-item nav-link side" href="#section-2">PROGRAM</a></li>
        <li><a className="nav-item nav-link side" href="#section-3">4GEEKS vs OTHERS</a></li>
        <li><a className="nav-item nav-link side" href="#section-4">PRICING</a></li>
        {/* <li><a className="nav-item nav-link side" href="#section-5">TYPICAL DAY</a></li> */}
        <li><a className="nav-item nav-link side" href="#section-6">THE ALUMNI</a></li>
      </Scrollspy>
    </BrowserView>
    <section className="section" id="section-1"></section>
    <Container fluid>
      <Row>
        <Column size="2">
        </Column>
        <Column size="7">
          <Row >
            <Column size="6" >
              <Card padding="20px" shadow height="400px" width="100%" margin="10px 0px" move="up" up="100px">
                <Row height="100%">
                  <Column size="10" customRespSize respSize="10">
                    <Row marginLeft="0px" marginBottom="15px" height="15%">
                      <RoundImage url="/images/geekpal.png" bsize="contain" height="100%" position="left" />
                    </Row>
                    <Row marginTop="15px">
                      <Column size="12">
                        <Paragraph fontSize="16px" color={Colors.black} customTextAlignSmall
                          alignXs="left">{geek.geek_data.geek_pal_heading}</Paragraph>
                      </Column>
                    </Row>
                    <Row marginTop="15px">
                      <Column size="12">
                        {geek.geek_data.geek_pal.map((pal, index) => {
                          return (
                            <Row key={1} marginBottom="4px">
                              <Column size="1" customRespSize respSize="1" alignSelf="center">
                                <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                              </Column>
                              <Column size="8" customRespSize respSize="8" test paddingRight="0px" paddingLeft="5px" alignSelf="center">
                                <Paragraph color={Colors.gray}>{pal}</Paragraph>
                              </Column>
                            </Row>
                          )
                        })}
                      </Column>
                    </Row>
                  </Column>
                  <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.yellow} fill={Colors.yellow} /></Column>
                </Row>
              </Card>
            </Column>
            <Column size="6">
              <Card padding="20px" shadow height="400px" width="100%" margin="10px 0px" move="up" up="100px">
                <Row height="100%">
                  <Column size="10" customRespSize respSize="10">
                    <Row marginLeft="0px" marginBottom="15px" height="15%">
                      <RoundImage url="/images/geekforce.png" bsize="contain" height="100%" position="left" />
                    </Row>
                    <Row >
                      <Column size="12">
                        <Paragraph fontSize="16px" color={Colors.black} customTextAlignSmall
                          alignXs="left">{geek.geek_data.geek_force_heading}</Paragraph>
                      </Column>
                    </Row>
                    <Row marginTop="15px">
                      <Column size="12">
                        {geek.geek_data.geek_force.map((pal, index) => {
                          return (
                            <Row key={1} marginBottom="2px" >
                              <Column size="1" customRespSize respSize="1" alignSelf="center">
                                <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                              </Column>
                              <Column size="8" customRespSize respSize="8" paddingRight="0px" paddingLeft="5px" alignSelf="center">
                                <Paragraph fontSize="13px" color={Colors.gray}>{pal}</Paragraph>
                              </Column>
                            </Row>
                          )
                        })}
                      </Column>
                    </Row>
                  </Column>
                  <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.yellow} fill={Colors.yellow} /></Column>
                </Row>
              </Card>
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
    {/* </Wrapper> */}
    <Divider height="100px" />

    {/* PROGRAM DETAILS */}
    <Wrapper
      style="custom"
      full
    >
      <Title
        size="10"
        title={details.heading}
        paragraph={details.sub_heading}
        primary
      />
      <Divider height="50px" />
      <Card width="100%" height="400px" color="white" shadow >
        <Tabs className="testy">
          <Header>
            <TabList >
              {details.details_modules.map((item, index) => {
                return (<Tab key={index} onClick={() => setCurrentIndex(index)}>{item.module_name}</Tab>)
              })
              }
            </TabList>
          </Header>
          <Body>
            {details.details_modules.map((item, i) => {
              return (
                <TabPanel key={i + 1} onChange={() => setInd(i)}>
                  <Container width="fluid">
                    <Row height="75px">
                      <Column size="3" paddingLeft="20px" padding="15px 0" alignXs="left">
                        <Paragraph color={Colors.black} fontSize="20px">{item.title}</Paragraph>
                      </Column>
                    </Row>
                    <Row height="45px">
                      <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                        <Paragraph color={Colors.gray} fontSize="14px">DESCRIPTION:</Paragraph>
                      </Column>
                      <Column size="6" customRespSize respSize="6" alignXs="left">
                        <Paragraph color={Colors.gray} fontSize="14px">{item.description}</Paragraph>
                      </Column>
                    </Row>
                    <Row height="45px">
                      <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                        <Paragraph color={Colors.gray} fontSize="14px">PROJECTS:</Paragraph>
                      </Column>
                      <Column size="6" customRespSize respSize="6" alignXs="left">
                        <Paragraph color={Colors.gray} fontSize="14px">{item.projects}</Paragraph>
                      </Column>
                    </Row>
                    <Row height="65px">
                      <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                        <Paragraph color={Colors.gray} fontSize="14px">DURATION:</Paragraph>
                      </Column>
                      <Column size="6" customRespSize respSize="6" alignXs="left">
                        <Paragraph color={Colors.gray} fontSize="14px">{item.duration}</Paragraph>
                      </Column>
                    </Row>
                    <Row height="70px">
                      <Column size="3" customRespSize respSize="3" padding="15px 0" image="no" color={Colors.lightGray} border="custom" customBorderRadius="0 0 0 1.25rem">
                        <Row align="around" height="100%">
                          <Column size="12" alignSelf="center">
                            <Paragraph align="center" color={Colors.gray} fontSize="16px">Skills / Weeks:</Paragraph>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="1" image="no" color={Colors.lightGray} customRespSize respSize="1" >
                        <Row align="around" height="100%">
                          <Column size="12" alignSelf="center">
                            <Paragraph align="center" color={Colors.gray} >1</Paragraph>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="1" image="no" color={Colors.lightGray} customRespSize respSize="1">
                        <Row align="around" height="100%">
                          <Column size="12" alignSelf="center">
                            <Paragraph align="center" color={Colors.gray} >2</Paragraph>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 0 ? Colors.lightGray : undefined}>
                        <Row align="around" height="100%">
                          <Column size="12" alignSelf="center">
                            <Paragraph align="center" color={Colors.gray} >3</Paragraph>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 0 ? Colors.lightGray : undefined}>
                        <Row align="around" height="100%">
                          <Column size="12" alignSelf="center">
                            <Paragraph align="center" color={Colors.gray} >4</Paragraph>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 1 ? Colors.lightGray : undefined}>
                        <Row align="around" height="100%">
                          <Column size="12" alignSelf="center">
                            <Paragraph align="center" color={Colors.gray} >5</Paragraph>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 1 ? Colors.lightGray : undefined}>
                        <Row align="around" height="100%">
                          <Column size="12" alignSelf="center">
                            <Paragraph align="center" color={Colors.gray} >6</Paragraph>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined}>
                        <Row align="around" height="100%" align="center">
                          <Column size="12" alignSelf="center">
                            <Paragraph align="center" color={Colors.gray} >7</Paragraph>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined}>
                        <Row align="around" height="100%">
                          <Column size="12" alignSelf="center">
                            <Paragraph align="center" color={Colors.gray} >8</Paragraph>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined} border="custom" customBorderRadius="0 0 1.25rem 0">
                        <Row align="around" height="100%">
                          <Column size="12" alignSelf="center">
                            <Paragraph align="center" color={Colors.gray} >9</Paragraph>
                          </Column>
                        </Row>
                      </Column>
                    </Row>
                  </Container>
                </TabPanel>
              )
            })
            }
          </Body>
        </Tabs>
      </Card >
      <section className="section" id="section-2"></section>
    </Wrapper>
    <Divider height="100px" />
    <Wrapper
      style="default"
    >
      <section className="section" id="section-3"></section>
      <Title
        size="10"
        title="4GEEKS VS OTHER IN NUMBERS"
        paragraph="View full comparison table >"
        primary
      />
      <Divider height="50px" />
      <GeeksVsOthers />
      <Divider height="100px" />
    </Wrapper>
    <Wrapper
      style="default"
    >
      {/* <Title
          size="10"
          title="PRICING AND FINANCING"
          primary
        />
        <Divider height="50px" /> */}
      <section className="section" id="section-4"></section>
      {/* <PricesAndPayment /> */}
      <Divider height="100px" />
    </Wrapper>
    {/* <Wrapper
        style="default"
      >
        <Title
          size="10"
          title="TYPICAL DAY AT THE ACADEMY"
          paragraph="Venenatis Ligula Ullamcorper Nibh Tellus"
          primary
        />
        <Divider height="50px" />
        <section className="section" id="section-5"></section>
        <Divider height="100px" />
      </Wrapper> */}
    <Wrapper
      style="default"
    >
      <Title
        size="10"
        title="MEET THE ALUMNI AND PROJECTS"
        paragraph="Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam."
        primary
      />
      <Divider height="50px" />
      <section className="section" id="section-6"></section>
      <Alumni />
      <Divider height="100px" />
    </Wrapper>
    <Divider height="100px" />
  </>
  )
};

export const query = graphql`
  query CourseQuery($file_name: String!, $lang: String!) {
    allCourseYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            basic_info{
                title
                description
                image
                keywords
            }
            geek_data {
              geek_force
              geek_pal
              geek_pal_heading
              geek_force_heading
            }
            details {
              heading
              sub_heading
              details_modules {
                title
                projects
                slug
                module_name
                duration
                description
              }
            }
        }
      }
    }
  }
`;

export default BaseRender(Program);

const Header = styled.div`
    background: black;
    border-radius: 1.25rem 1.25rem 0 0;
    height: 100px;
    color: white;
    font-family: 'lato', sans-serif;
    font-size: 14px;
    font-weight: 800;
    align-items: center;
`;
const Body = styled.div`
    background: white;
    height:300px;
    border-radius: 0 0 1.25rem 1.25rem;`