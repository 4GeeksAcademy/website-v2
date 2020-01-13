import React from 'react';
import Layout from '../global/Layout';
import {Card} from '../components/Card'
import {Container, Row, Column} from '../components/Sections'
import {Title, H2, H3, Span, Paragraph} from '../components/Heading'
import {Button, Colors, Check, ArrowRight} from '../components/Styling'

const Program = ({data}) => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Column size="1" />
          <Column border="bottom" bottom size="11" padding="10%" image="yes" url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80" height="450px">
            <Row>
              <Column size="1" />
              <Column size="8">
                <Title
                  size="7"
                  title="FULL-STACK DEVELOPER"
                  paragraph="with payments made after you get a job"
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
                  <Column size="6">
                    <Card padding="15px" shadow height="330px" width="330px" move="up" up="100px" >
                      <Row height="300px">
                        <Column size="10">
                          <Row marginLeft="0px" marginBottom="15px"><H3 primary>GEEK<Span color={Colors.blue}>PAL</Span></H3></Row>
                          <Row marginLeft="0px" marginBottom="15px"><Paragraph primary>Get a job in tech</Paragraph></Row>
                          <Row >
                            <Column size="12">
                              {data.geek.edges[0].node.geek_pal.map((pal, index) => {
                                return (
                                  <Row key={index} marginBottom="4px">
                                    <Column size="1">
                                      <Check width="12px" color={Colors.blue} fill={Colors.blue} />
                                    </Column>
                                    <Column size="8" paddingRight="0px" paddingLeft="5px">
                                      <Paragraph fontSize="11px" color={Colors.gray}>{pal}</Paragraph>
                                    </Column>
                                  </Row>)
                              })}
                            </Column>
                          </Row>
                        </Column>
                        <Column size="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.blue} fill={Colors.blue} /></Column>
                      </Row>
                    </Card>
                  </Column>
                  <Column size="6">
                    <Card padding="15px" shadow height="330px" width="330px" move="up" up="100px" >
                      <Row height="300px">
                        <Column size="10">
                          <Row marginLeft="0px" marginBottom="15px"><H3 primary>GEEK<Span color={Colors.blue}>FORCE</Span></H3></Row>
                          <Row marginLeft="0px" marginBottom="15px"><Paragraph primary>Never code on your own again</Paragraph></Row>
                          <Row >
                            <Column size="12">
                              {data.geek.edges[0].node.geek_force.map((pal, index) => {
                                return (
                                  <Row key={index} marginBottom="2px" >
                                    <Column size="1">
                                      <Check width="12px" color={Colors.blue} fill={Colors.blue} />
                                    </Column>
                                    <Column size="8" paddingRight="0px" paddingLeft="5px">
                                      <Paragraph fontSize="11px" color={Colors.gray}>{pal}</Paragraph>
                                    </Column>
                                  </Row>)
                              })}
                            </Column>
                          </Row>
                        </Column>
                        <Column size="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.blue} fill={Colors.blue} /></Column>
                      </Row>
                    </Card>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Column>
        </Row>
      </Container>

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