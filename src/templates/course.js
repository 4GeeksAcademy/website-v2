import React, {useState, useEffect, useContext} from 'react';
import Layout from '../global/Layout';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, Divider} from '../components/Sections'
import {Title, H2, H3, Span, Paragraph} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, RoundImage} from '../components/Styling'
import ProgramDescription from '../components/ProgramDescription'
import GeeksVsOthers from '../components/GeeksVsOthers'
import Mentors from '../components/Mentors'
import PricesAndPayment from '../components/PricesAndPayment'
import Alumni from '../components/Alumni'
import Scrollspy from 'react-scrollspy'
import '../assets/css/style.scss'
import {SessionContext} from '../session.js'
import ProgramSelector from '../components/ProgramSelector'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const Program = () => {
  const data = {banner: {title: "bobo"}};
  const [test, setTest] = useState()
  const [weeks, setWeeks] = useState();
  return (
    <Layout>
      {/* {session.location} */}
      <Wrapper
        style="default"
        image="yes"
        url="../bg/bg-pr.jpg"
        border="bottom"
        height="700px"
        backgroundSize="cover"
      >
        <Divider height="240px" />
        <ProgramSelector />
        <Divider height="20px" />
        <Title
          size="5"
          title={data.banner.title}
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
                        <RoundImage url="../images/geekpal.png" bsize="contain" height="100%" position="left" />
                      </Row>
                      <Row marginTop="15px">
                        <Column size="12">
                          <Paragraph fontSize="16px" color={Colors.black} customTextAlignSmall
                            alignXs="left">Get a job in tech</Paragraph>
                        </Column>
                      </Row>
                      <Row marginTop="15px">
                        <Column size="12">
                          {/* {data.geek.edges[0].node.geek_pal.map((pal, index) => { */}
                          {/* return ( */}
                          <Row key={1} marginBottom="4px">
                            <Column size="1" customRespSize respSize="1" alignSelf="center">
                              <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                            </Column>
                            <Column size="8" customRespSize respSize="8" test paddingRight="0px" paddingLeft="5px" alignSelf="center">
                              <Paragraph color={Colors.gray}>{"wiwliwli"}</Paragraph>
                            </Column>
                          </Row>
                          {/* ) */}
                          {/* })} */}
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
                        <RoundImage url="../images/geekforce.png" bsize="contain" height="100%" position="left" />
                      </Row>
                      <Row >
                        <Column size="12">
                          <Paragraph fontSize="16px" color={Colors.black} customTextAlignSmall
                            alignXs="left">FOR Career Empowerment</Paragraph>
                        </Column>
                      </Row>
                      <Row marginTop="15px">
                        <Column size="12">
                          {/* {data.geek.edges[0].node.geek_force.map((pal, index) => {
                            return ( */}
                          <Row key={1} marginBottom="2px" >
                            <Column size="1" customRespSize respSize="1" alignSelf="center">
                              <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                            </Column>
                            <Column size="8" customRespSize respSize="8" paddingRight="0px" paddingLeft="5px" alignSelf="center">
                              <Paragraph fontSize="13px" color={Colors.gray}>{"Welelele"}</Paragraph>
                            </Column>
                          </Row>
                          {/* ) */}
                          {/* })} */}
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
      <Wrapper
        style="custom"
        full
      >
        <Title
          size="10"
          title="PROGRAM DETAILS"
          primary
        />
        <Divider height="50px" />
        {/* <ProgramDescription /> */}
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
        {/* <GeeksVsOthers /> */}
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
    </Layout >
  )
};

// export const geekQuery = graphql`
//     query geekQuery{
//             geek: allGeekPalYaml {
//             edges {
//             node {
//             geek_pal
//             geek_force
//         }
//     }
//     }
// }
// `

export default Program;