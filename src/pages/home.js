import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import QueryTest from '../components/QueryTest';
import Why4Geeks from '../components/Why4Geeks';
import GeeksVsOthers from '../components/GeeksVsOthers'
import Jobs from '../components/Jobs';
import Link from 'gatsby-link'
import {H1, H2, H3, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowRight} from '../components/Styling'
import {Card} from '../components/Card'
import WhoIsHiring from '../components/WhoIsHiring';
import Alumni from '../components/Alumni'

const Home = ({data}) => {
  return (
    <Layout>
      <Container fluid >
        <Row>
          <Column size="1" />
          <Column size="11" >
            <Row>
              <Column size="1" />
              <Column size="5">
                <Divider height="100px" />
                <Row>
                  <H1 fontSize="13px" color={Colors.gray} lato>Miami Coding Bootcamp</H1>
                </Row>
                <Row>
                  <Separator primary />
                </Row>
                <Row>
                  <H2 primary align="left" >LEARN TO CODE<Span animated color={Colors.yellow}>_</Span></H2>
                </Row>
                <Row>
                  <H2 primary align="left" >AND GET CAREER</H2>
                </Row>
                <Row>
                  <H2 primary align="left" >SUPPORT FOR LIFE</H2>
                </Row>
                <Row>
                  <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" >Join more than 500 graduates already working as coders </Paragraph>
                </Row>
                <Row>
                  <Paragraph color={Colors.gray} margin="5px 0 0 0" align="left" >and become a part of one of the world's biggest coding community.</Paragraph>
                </Row>
                <Row center>
                  <Link to="/program">
                    <div className="btn text-white btn-md rounded-pill jumbo-button" role="button">CHOOSE YOUR PROGRAM </div>
                  </Link>
                </Row>
              </Column>
              <Column size="1" />
              <Column
                size="5"
                border="bottom"
                padding="20%"
                image="yes"
                url="../home-bg.png"
                height="500px"
                backgroundSize="cover">
              </Column>
            </Row>
          </Column>
        </Row>
      </Container>
      <Wrapper
        style="default">
        <QueryTest up="80" />
      </Wrapper>
      <Wrapper
        style="default">
        <Divider height="100px" />
        <Why4Geeks />
        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default">
        <Jobs />
      </Wrapper>
      <Divider height="100px" />
      <Wrapper
        style="default">
        <Row>
          <Column size="4" margin="5px 0">
            <Paragraph margin="5px 0" color={Colors.gray} fontSize="12px" align="center">LICENSED BY</Paragraph>
            <RoundImage url="../images/florida-logo.png" height="100px" bsize="contain"></RoundImage>
          </Column>
          <Column size="4" margin="5px 0">
            <Paragraph margin="5px 0" color={Colors.gray} fontSize="12px" align="center">TOP CODING SCHOOL</Paragraph>
            <RoundImage url="../images/newsweek-logo.png" height="100px" bsize="contain"></RoundImage>
          </Column>
          <Column size="4" margin="5px 0">
            <Paragraph margin="5px 0" color={Colors.gray} fontSize="12px" align="center">4GEEKS IN THE NEWS</Paragraph>
            <RoundImage url="../images/cnn-bbc-logo.png" height="100px" bsize="contain"></RoundImage>
          </Column>
        </Row>
      </Wrapper>
      <Divider height="100px" />
      <Wrapper
        style="default"
      >
        <GeeksVsOthers hasTitle />
        <Divider height="100px" />
        <Title
          title="JOIN 4GEEKS"
          paragraph="Duis mollis, est non commodo luctus, nisi erat porttitor ."
          primary
        />
        <Divider height="40px" />
        <Row >
          <Column size="6" >
            <Card padding="20px" shadow height="200px" width="100%" margin="10px 0px">
              <Row height="100%">
                <Column size="10" customRespSize respSize="10">
                  <Row marginLeft="0px" marginBottom="15px" height="25%">
                    <RoundImage url="../images/geekpal.png" bsize="contain" height="100%" position="left" />
                  </Row>
                  <Row >
                    <Column size="12">
                      <Paragraph
                        color={Colors.black}
                        customTextAlignSmall
                        alignXs="left">
                        Programming - Always - Limitles
                      </Paragraph>
                    </Column>
                  </Row>
                  <Row marginTop="15px">
                    <Column size="12">
                      <Paragraph
                        color={Colors.gray}
                        fontSize="14px"
                        lineHeight="18px"
                        customTextAlignSmall
                        alignXs="left">
                        Never code on your own again.
                      </Paragraph>
                      <Paragraph
                        color={Colors.gray}
                        fontSize="14px"
                        lineHeight="18px"
                        customTextAlignSmall
                        alignXs="left">
                        We will be along with lalong side your
                      </Paragraph>
                      <Paragraph
                        color={Colors.gray}
                        fontSize="14px"
                        lineHeight="18px"
                        customTextAlignSmall
                        alignXs="left">
                        journey and for as long as you
                      </Paragraph>
                      <Paragraph
                        color={Colors.gray}
                        fontSize="14px"
                        lineHeight="18px"
                        customTextAlignSmall
                        alignXs="left">
                        want us to be.
                      </Paragraph>
                    </Column>
                  </Row>
                </Column>
                <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.blue} fill={Colors.blue} /></Column>
              </Row>
            </Card>
          </Column>
          <Column size="6">
            <Card padding="20px" shadow height="200px" width="100%" margin="10px 0px">
              <Row height="100%">
                <Column size="10" customRespSize respSize="10">
                  <Row marginLeft="0px" marginBottom="15px" height="25%">
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
                      <Paragraph
                        color={Colors.gray}
                        fontSize="14px"
                        lineHeight="18px"
                        customTextAlignSmall
                        alignXs="left">
                        We'll do everything in our hands
                      </Paragraph>
                      <Paragraph
                        color={Colors.gray}
                        fontSize="14px"
                        lineHeight="18px"
                        customTextAlignSmall
                        alignXs="left">
                        to help you get a job in the field.
                      </Paragraph>
                      <Paragraph
                        color={Colors.gray}
                        fontSize="14px"
                        lineHeight="18px"
                        customTextAlignSmall
                        alignXs="left">
                        Includes Career Support Track,
                      </Paragraph>
                      <Paragraph
                        color={Colors.gray}
                        fontSize="14px"
                        lineHeight="18px"
                        customTextAlignSmall
                        alignXs="left">
                        GeekPAL, and GeekTALK.
                      </Paragraph>
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
        style="default">
        <Title
          title="WHO IS HIRING OUR STUDENTS"
          paragraph="Our hiring partners are growing everyday, and our students have been hired from dozens of companies in the U.S. and worldwide."
          primary
          customParagraphSize="8"
        >
        </Title>
        <Divider height="50px" />
        <WhoIsHiring source="partners" />
      </Wrapper>
      <Divider height="100px" />
      <Wrapper
        style="default">

        <Divider height="50px" />
        <Alumni hasTitle />
      </Wrapper>
      <Divider height="100px" />

    </Layout>
  )
};
export const myQuer = graphql`
query myQueryy{
  geek: allGeekPalYaml {
    edges {
    node {
    geek_pal
    geek_force
}
}
}
  alumni:   allAlumniYaml{
    edges{
      node{
        name
        image
        content
        title
      }
    }
  }
  partners: allPartnersYaml{
    edges{
      node{
        partners{
          name
          image
        }
      }
    }
  }
  mentors: allTeachersYaml{
    edges{
      node{
        name
        image
        last_name
        nick_name
        coding_skills
      }
    }
  }
}
`
export default Home;