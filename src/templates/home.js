import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Why4Geeks from '../components/Why4Geeks';
import GeeksVsOthers from '../components/GeeksVsOthers'
import ChooseProgram from '../components/ChooseProgram'
import JobsStatistics from '../components/JobsStatistics';
import Link from 'gatsby-link'
import {H1, H2, H3, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowRight} from '../components/Styling'
import {Card} from '../components/Card'
import WhoIsHiring from '../components/WhoIsHiring';
import Alumni from '../components/Alumni'
import Credentials from '../components/Credentials'

const Home = ({data, pageContext}) => {
    let yml = null;
    try {
        yml = data.allPageYaml.edges[0].node;
    }
    catch (err) {
        console.error("There was a problem loading the data", data);
        console.error(err);
        return <div className="alert alert-danger">There was a problem loading the data</div>
    }
    console.log("yml", yml.join_4geeks[0])
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
                                    <H1 fontSize="13px" color={Colors.gray} lato>{yml.tagline}</H1>
                                </Row>
                                <Row>
                                    <Separator primary />
                                </Row>
                                <Row>
                                    <H2 primary align="left" >{yml.title_first_line}<Span animated color={Colors.yellow}>_</Span></H2>
                                </Row>
                                <Row>
                                    <H2 primary align="left" >{yml.title_second_line}</H2>
                                </Row>
                                <Row>
                                    <H2 primary align="left" >{yml.title_thir_line}</H2>
                                </Row>
                                <Row>
                                    <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="13px">{yml.sub_heading}</Paragraph>
                                </Row>

                                <Divider height="20px" />
                                <Row center>
                                    <ChooseProgram />
                                </Row>
                                <Divider height="20px" />
                            </Column>
                            <Column size="1" />
                            <Column
                                size="5"
                                border="bottom"
                                padding="20%"
                                image="yes"
                                url={yml.image}
                                height="500px"
                                backgroundSize="cover">
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Container>
            <Divider height="45px" />
            <Wrapper
                style="default">
                <Credentials up="80" />
            </Wrapper>
            <Wrapper
                style="default">
                <Divider height="100px" />
                <Why4Geeks />
                <Divider height="100px" />
            </Wrapper>
            <Wrapper
                style="default">
                <JobsStatistics />
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
                {/* <GeeksVsOthers hasTitle /> */}
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
                                                {yml.join_4geeks[0].geek_data.geek_pal_heading}
                                            </Paragraph>
                                        </Column>
                                    </Row>
                                    <Row marginTop="15px">
                                        <Column size="12">


                                            {yml.join_4geeks[0].geek_data.geek_pal_data.map((item, index) => {
                                                return (
                                                    <Paragraph
                                                        key={index}
                                                        color={Colors.gray}
                                                        fontSize="14px"
                                                        lineHeight="18px"
                                                        customTextAlignSmall
                                                        alignXs="left">
                                                        {item}
                                                    </Paragraph>
                                                )
                                            })}

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
                                                alignXs="left">{yml.join_4geeks[0].geek_data.geek_force_heading}</Paragraph>
                                        </Column>
                                    </Row>
                                    <Row marginTop="15px">
                                        <Column size="12">
                                            {yml.join_4geeks[0].geek_data.geek_force_data.map((item, index) => {
                                                return (
                                                    <Paragraph
                                                        key="index"
                                                        color={Colors.gray}
                                                        fontSize="14px"
                                                        lineHeight="18px"
                                                        customTextAlignSmall
                                                        alignXs="left">
                                                        {item}
                                                    </Paragraph>
                                                )
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
                style="default">
                <Title
                    title="WHO IS HIRING OUR STUDENTS"
                    paragraph="Our hiring partners are growing everyday, and our students have been hired from dozens of companies in the U.S. and worldwide."
                    primary
                    customParagraphSize="8"
                >
                </Title>
                <Divider height="50px" />
                {/* <WhoIsHiring source="partners" /> */}
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default">

                <Divider height="50px" />
                {/* <Alumni hasTitle /> */}
            </Wrapper>
            <Divider height="100px" />

        </Layout>
    )
};
export const query = graphql`
  query HomeQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            title_first_line
            title_second_line
            title_thir_line
            sub_heading
            image
            join_4geeks {
                heading
                sub_heading
                geek_data {
                  geek_force_data
                  geek_pal_data
                  geek_force_heading
                  geek_pal_heading
                }
              }
        }
      }
    }
  }
`;

export default Home;