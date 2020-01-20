import React from 'react';
import Layout from '../global/Layout';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, Divider} from '../components/Sections'
import {Title, H2, H3, Span, Paragraph} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, RoundImage} from '../components/Styling'
import QueryTest from '../components/QueryTest'
import ProgramDescription from '../components/ProgramDescription'
import GeeksVsOthers from '../components/GeeksVsOthers'
import Mentors from '../components/Mentors'
import PricesAndPayment from '../components/PricesAndPayment'
import Alumni from '../components/Alumni'

const Program = ({data}) => {
  return (
    <Layout>
      <Wrapper
        style="default"
        image="yes"
        url="../images/program-bg.png"
        border="bottom"
        height="500px"
        backgroundSize="cover"
      >
        <Divider height="100px" />
        <Title
          size="5"
          title="FULL STACK DEVELOPER"
          paragraph="I'm impressed with the level of understanding 4Geeks students have, my hire eneded becoming team leader -CuevaSocial Marketing Agency"
          main
          color={Colors.white}
          fontSize="46px"
          textAlign="center"

        />
        <Row align="center">
          <Column align="right" size="6"><Button color={Colors.white} margin="15px 0" textColor={Colors.black}>REQUEST SYLLABUS</Button></Column>
          <Column align="left" size="6"><Button color="red" margin="15px 0" textColor=" white">APPLY NOW</Button></Column>
        </Row>
      </Wrapper>
      <Wrapper
        style="default">
        <QueryTest up="80" />
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title="4GEEKS OUTCOMES"
          paragraph="out of our total students, 76% are looking to get a job right after and 24% are pursuing to improve their skills or launch startups"
          primary
          customParagraphSize="8"
        />
        <Divider height="20px" />
        <Row height="380px">
          <RoundImage url="../images/program-charts.png" height="100%" width="100%" bsize="contain" />
        </Row>
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Divider height="40px" />
        <Row >
          <Column size="6" >
            <Card padding="20px" shadow height="350px" width="100%" margin="10px 0px">
              <Row height="100%">
                <Column size="10" customRespSize respSize="10">
                  <Row marginLeft="0px" marginBottom="15px" height="15%">
                    <RoundImage url="../images/geekpal.png" bsize="contain" height="100%" position="left" />
                  </Row>
                  <Row marginTop="15px">
                    <Column size="12">
                      <Paragraph color={Colors.black} customTextAlignSmall
                        alignXs="left">Get a job in tech</Paragraph>
                    </Column>
                  </Row>
                  <Row marginTop="15px">
                    <Column size="12">

                      {data.geek.edges[0].node.geek_pal.map((pal, index) => {
                        return (
                          <Row key={index} marginBottom="4px">
                            <Column size="1" customRespSize respSize="1">
                              <Check width="12px" color={Colors.blue} fill={Colors.blue} />
                            </Column>
                            <Column size="8" customRespSize respSize="8" test paddingRight="0px" paddingLeft="5px">
                              <Paragraph fontSize="11px" color={Colors.gray}>{pal}</Paragraph>
                            </Column>
                          </Row>)
                      })}
                    </Column>
                  </Row>
                </Column>
                <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.blue} fill={Colors.blue} /></Column>
              </Row>
            </Card>
          </Column>
          <Column size="6">
            <Card padding="20px" shadow height="350px" width="100%" margin="10px 0px">
              <Row height="100%">
                <Column size="10" customRespSize respSize="10">
                  <Row marginLeft="0px" marginBottom="15px" height="15%">
                    <RoundImage url="../images/geekforce.png" bsize="contain" height="100%" position="left" />
                  </Row>
                  <Row >
                    <Column size="12">
                      <Paragraph color={Colors.black} customTextAlignSmall
                        alignXs="left">FOR Career Empowerment</Paragraph>
                    </Column>
                  </Row>
                  <Row marginTop="15px">
                    <Column size="12">
                      {data.geek.edges[0].node.geek_force.map((pal, index) => {
                        return (
                          <Row key={index} marginBottom="2px" >
                            <Column size="1" customRespSize respSize="1">
                              <Check width="12px" color={Colors.blue} fill={Colors.blue} />
                            </Column>
                            <Column size="8" customRespSize respSize="8" paddingRight="0px" paddingLeft="5px">
                              <Paragraph fontSize="11px" color={Colors.gray}>{pal}</Paragraph>
                            </Column>
                          </Row>)
                      })}
                    </Column>
                  </Row>
                </Column>
                <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.blue} fill={Colors.blue} /></Column>
              </Row>
            </Card>
          </Column>
        </Row>
      </Wrapper>
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
        <ProgramDescription />
      </Wrapper>
      <Divider height="100px" />
      <Wrapper
        style="default"
      >
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
        <Title
          size="10"
          title="GET TRAINED BY SENIOR MENTORS"
          primary
        />
        <Divider height="50px" />
        <Mentors />
        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title="PRICING AND FINANCING"
          primary
        />
        <Divider height="50px" />
        <PricesAndPayment />
        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title="TYPICAL DAY AT THE ACADEMY"
          paragraph="Venenatis Ligula Ullamcorper Nibh Tellus"
          primary
        />
        <Divider height="50px" />

        <Divider height="100px" />
      </Wrapper>
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
        <Alumni />
        <Divider height="100px" />
      </Wrapper>

    </Layout >
  )
};

export const geekQuery = graphql`
query geekQuery{
        geek: allGeekPalYaml {
        edges {
        node {
        geek_pal
        geek_force
    }
  }
}
}
`

export default Program;