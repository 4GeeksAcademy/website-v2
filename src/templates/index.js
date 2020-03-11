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
                                <Row  >
                                    <Column size="10" customRespSize respSize="10">
                                        <H1 fontSize="13px" color={Colors.gray} lato>{yml.tagline}</H1>
                                    </Column>
                                </Row>
                                <Row>

                                    <Separator primary />

                                </Row>
                                <Row >
                                    <Column size="10" customRespSize respSize="10">
                                        <H2
                                            fs_xs="38px"
                                            fs_sm="38px"
                                            fs_md="30px"
                                            fs_lg="32px"
                                            fs_xl="38px"
                                            // primary
                                            align="left" >{yml.title}<Span animated color={Colors.yellow}>_</Span></H2>
                                    </Column>
                                </Row>
                                <Row RespSm>
                                    <Column size="10" customRespSize respSize="10">
                                        <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="13px">{yml.sub_heading}</Paragraph>
                                    </Column>
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

            {/* CREDENTIALS CARDS */}

            <Wrapper
                style="default">
                <Credentials up="80" lang={data.allCredentialsYaml.edges} />
            </Wrapper>

            {/* WHY 4GEEKS SECTION */}

            <Wrapper
                style="default">
                <Divider height="100px" />
                <Why4Geeks lang={data.allWhy4GeeksYaml.edges} />
                <Divider height="50px" />
            </Wrapper>

            {/* JOBS STATISTICS SECTION */}

            <Wrapper
                style="default">
                <JobsStatistics lang={data.allJobsStatisticsYaml.edges} />
            </Wrapper>
            <Divider height="100px" />



            <Wrapper
                style="default">
                <Row align="center">
                    <Column size="4" customRespSize respSize="4" margin="5px 0">
                        <Paragraph margin="5px 0" color={Colors.gray} fontSize="12px" align="center">{yml.education.left_box.heading}</Paragraph>
                        <RoundImage
                            h_xs="40px"
                            h_sm="60px"
                            h_md="50px"
                            h_lg="70px"
                            h_xl="90px"
                            width="100%"
                            url={yml.education.left_box.image}
                            bsize="contain"
                            position="center" />
                    </Column>
                    <Column size="4" customRespSize respSize="4" margin="5px 0">
                        <Paragraph margin="5px 0" color={Colors.gray} fontSize="12px" align="center">{yml.education.center_box.heading}</Paragraph>
                        <RoundImage
                            h_xs="50px"
                            h_sm="50px"
                            h_md="50px"
                            h_lg="70px"
                            h_xl="100px"
                            width="100%"
                            url={yml.education.center_box.image}
                            bsize="contain" />
                    </Column>
                    <Column size="4" customRespSize respSize="4" margin="5px 0">
                        <Paragraph margin="5px 0" color={Colors.gray} fontSize="12px" align="center">{yml.education.right_box.heading}</Paragraph>
                        <RoundImage
                            h_xs="50px"
                            h_sm="90px"
                            h_md="50px"
                            h_lg="70px"
                            h_xl="100px"
                            width="100%"
                            url={yml.education.right_box.image}
                            bsize="contain" />
                    </Column>
                </Row>
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default"
            >
                <GeeksVsOthers hasTitle lang={data.allGeeksVsOthersYaml.edges} />
                <Divider height="100px" />
                <Title
                    title={yml.join_geeks.heading}
                    paragraph={yml.join_geeks.sub_heading}
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
                                                {yml.join_geeks.geek_data.geek_pal_heading}
                                            </Paragraph>
                                        </Column>
                                    </Row>
                                    <Row marginTop="15px">
                                        <Column size="12">
                                            {yml.join_geeks.geek_data.geek_pal_data.map((item, index) => {
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
                                                alignXs="left">{yml.join_geeks.geek_data.geek_force_heading}</Paragraph>
                                        </Column>
                                    </Row>
                                    <Row marginTop="15px">
                                        <Column size="12">
                                            {yml.join_geeks.geek_data.geek_force_data.map((item, index) => {
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
                <Title
                    size="10"
                    title={yml.alumni_header.heading}
                    paragraph={yml.alumni_header.sub_heading}
                    customParagraphSize="8"
                    primary
                />
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
            join_geeks {
                heading
                sub_heading
                geek_data {
                  geek_force_data
                  geek_pal_data
                  geek_force_heading
                  geek_pal_heading
                }
            }
            education{
                left_box{
                    heading
                    image
                    alt
                }
                center_box{
                    heading
                    image
                    alt
                }
                right_box{
                    heading
                    image
                    alt
                }
            }
            locations{
                heading
                sub_heading
            }
            alumni_header{
                heading
                sub_heading
            }
        }
      }
    }
    allCredentialsYaml(filter: {lang: {eq: $lang}}) {
        edges {
          node {
            lang
            credentials {
              title
              slug
              value
              symbol
              symbol_position
            }
          }
        }
      }
      allWhy4GeeksYaml(filter: {lang: {eq: $lang}}) {
        edges {
          node {
            lang
            heading
            sub_heading
            why {
              title
              description
              image
              slug
            }
          }
        }
      }
      allJobsStatisticsYaml(filter: {lang: {eq: $lang}}) {
        edges {
          node {
            id
            lang
            jobs {
              title
              slug
              sub_title
              value
              value_symbol
              chart_data
            }
          }
        }
     }
     allGeeksVsOthersYaml(filter: {lang: {eq: $lang}}) {
        edges {
          node {
            lang
            headings {
              heading_home
              sub_heading_home
              sub_heading_home_link
              heading_program
              sub_heading_program
              sub_heading_program_link
            }
            info {
              features
              at4_Geeks
              industry_average
              tooltip
              icon
              slug
            }
            titles{
                featured
                at_geeks
                average
            }
            button{
                button_text
                button_link
            }
          }
        }
      }
     
  }
`;

export default BaseRender(Home);