import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Why4Geeks from '../components/Why4Geeks';
import GeeksVsOthers from '../components/GeeksVsOthers'
import ChooseProgram from '../components/ChooseProgram'
import JobsStatistics from '../components/JobsStatistics';
import {H1, H2, H3, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowRight} from '../components/Styling'
import {Card} from '../components/Card'
import WhoIsHiring from '../components/WhoIsHiring';
import Alumni from '../components/Alumni'
import Credentials from '../components/Credentials'
import BaseRender from './_baseRender'
import Events from '../components/Events'
import Loc from '../components/Loc'


const Home = (props) => {
    const {data, pageContext, yml} = props;
    return (
        <>
            <Container fluid >
                <Row>
                    <Column size="1" />
                    <Column size="11" >
                        <Row>
                            <Column size="1" />
                            <Column size="5">
                                <Divider height="100px" />
                                <Row RespSm>
                                    <H1 fontSize="13px" color={Colors.gray} lato>{yml.tagline}</H1>
                                </Row>
                                <Row>
                                    <Separator primary />
                                </Row>
                                <Row >
                                    <H2 primary align="left" >{yml.title}<Span animated color={Colors.yellow}>_</Span></H2>
                                </Row>
                                <Row RespSm>
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
                <Divider height="50px" />
            </Wrapper>
            <Wrapper
                style="default">
                <JobsStatistics />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default">
                <Row align="center">
                    <Column size="4" customRespSize respSize="4" margin="5px 0">
                        <Paragraph margin="5px 0" color={Colors.gray} fontSize="12px" align="center">LICENSED BY</Paragraph>
                        <RoundImage
                            h_xs="40px"
                            h_sm="60px"
                            h_md="50px"
                            h_lg="70px"
                            h_xl="90px"
                            width="100%"
                            url="/images/florida-logo.png"
                            bsize="contain"
                            position="center" />
                    </Column>
                    <Column size="4" customRespSize respSize="4" margin="5px 0">
                        <Paragraph margin="5px 0" color={Colors.gray} fontSize="12px" align="center">TOP CODING SCHOOL</Paragraph>
                        <RoundImage
                            h_xs="50px"
                            h_sm="50px"
                            h_md="50px"
                            h_lg="70px"
                            h_xl="100px"
                            width="100%"
                            url="/images/newsweek-logo.png"
                            bsize="contain" />
                    </Column>
                    <Column size="4" customRespSize respSize="4" margin="5px 0">
                        <Paragraph margin="5px 0" color={Colors.gray} fontSize="12px" align="center">4GEEKS IN THE NEWS</Paragraph>
                        <RoundImage
                            h_xs="50px"
                            h_sm="90px"
                            h_md="50px"
                            h_lg="70px"
                            h_xl="100px"
                            width="100%"
                            url="/images/cnn-bbc-logo.png"
                            bsize="contain" />
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
                <Row>
                    <Column size="6" >
                        <Card
                            padding="20px"
                            shadow
                            width="100%"
                            margin="10px 0px"
                            h_xs="180px"
                            h_sm="190px"
                            h_md="300px"
                            h_lg="200px"
                            h_xl="210px"
                        >
                            <Row height="100%">
                                <Column size="10" customRespSize respSize="10">
                                    <Row marginLeft="0px" marginBottom="15px" height="25%">
                                        <RoundImage url="/images/geekpal.png" bsize="contain" height="100%" position="left" />
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
                        <Card
                            padding="20px"
                            shadow
                            h_xs="180px"
                            h_sm="190px"
                            h_md="300px"
                            h_lg="200px"
                            h_xl="210px"
                            width="100%"
                            margin="10px 0px"

                        >
                            <Row height="100%">
                                <Column size="10" customRespSize respSize="10">
                                    <Row marginLeft="0px" marginBottom="15px" height="25%">
                                        <RoundImage url="/images/geekforce.png" bsize="contain" height="100%" position="left" />
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
            <Wrapper
                style="default">
                <Title
                    primary
                    title={yml.locations.heading}
                    paragraph={yml.locations.sub_heading}
                    customParagraphSize="8"
                // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
                />

                <Divider height="50px" />
                <Loc />
            </Wrapper>
            <Divider height="100px" />

        </>
    )
};
export const query = graphql`
  query HomeQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            tagline
            title
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
            locations{
                heading
                sub_heading
            }
        }
      }
    }
  }
`;

export default BaseRender(Home);