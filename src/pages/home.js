import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import QueryTest from '../components/QueryTest';
import Why4Geeks from '../components/Why4Geeks';
import GeeksVsOthers from '../components/GeeksVsOthers'
import Jobs from '../components/Jobs';
import Link from 'gatsby-link'
import {H1, H2, H5, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors} from '../components/Styling'

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
                  <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="13px">Join more than 500 graduates already working as coders </Paragraph>
                </Row>
                <Row>
                  <Paragraph color={Colors.gray} margin="5px 0 0 0" align="left" fontSize="13px">and become a part of one of the world's biggest coding community.</Paragraph>
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
                url="../localImage.png"
                height="500px"
                backgroundSize="cover">
              </Column>
            </Row>
          </Column>
        </Row>
      </Container>
      <Wrapper
        style="default">
        <QueryTest up="40px" />
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
        style="default">
        <GeeksVsOthers />
      </Wrapper>
      <Divider height="100px" />
    </Layout>
  )
};
export const myQuer = graphql`
query myQueryy{
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