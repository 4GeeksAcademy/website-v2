import React from 'react';
import {Container, Column, Row, Wrapper, Divider} from '../components/Sections';
import {Title, H1, H2, H3, H4, Paragraph, Separator} from '../components/Heading'
import {Card} from '../components/Card'
import {Colors, Book, Teacher, Users, Sitemap, Button, RoundImage} from '../components/Styling'
import Mentors from '../components/Mentors'
import Events from '../components/Events'
import Credentials from '../components/Credentials'
import BaseRender from './_baseRender'
import WhoIsHiring from '../components/WhoIsHiring';
import RecentPosts from '../components/RecentPosts'

const Why = (props) => {
    const {data, pageContext, yml} = props;
    const cornerstone = yml.cornerstones;
    return (
        <>
            <Container fluid height="450px">
                <Row>
                    <Column size="1" />
                    <Column border="bottom" size="11" padding="10%" image="yes" url={yml.banner.image} height="600px">
                        <Row>
                            <Column size="1" />
                            <Column size="8" align="center">
                                <H1 fontSize="50px" fontSizeXs="40px" color={Colors.white}>{yml.banner.tagline}</H1>
                            </Column>
                        </Row>

                    </Column>
                </Row>
            </Container>
            <Divider height="100px" />
            <Container fluid >
                <Row>
                    <Column size="1" />
                    <Column size="11">
                        <Row>
                            <Column size="1" />
                            <Column size="9">
                                <Credentials up="80" />
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Container>
            <Divider height="100px" />
            <Wrapper
                style="default"
            >
                <Title
                    size="10"
                    title={yml.outcomes.heading}
                    paragraph={yml.outcomes.sub_heading}
                    primary
                    customParagraphSize="8"
                />
                <Divider height="20px" />
                <Row height="auto" align="center">
                    <Column size="12" customRespSize respSize="11">
                        <RoundImage
                            h_xs="200px"
                            h_sm="200px"
                            h_md="200px"
                            h_lg="400px"
                            h_xl="400px"
                            url={yml.outcomes.image}
                            height="400px"
                            width="100%"
                            bsize="contain" />
                    </Column>
                </Row>
            </Wrapper>
            <Divider height="100px" />
            <Wrapper style="default">
                <Title size="8" title={yml.cornerstones.heading} paragraph={yml.cornerstones.sub_heading} primary />
            </Wrapper>
            <Divider height="150px" />
            <Wrapper
                style="default"
                image="no"
                color={Colors.lightGray}
                border="top"
            >
                <Row marginBottom="30px">
                    {cornerstone.cornerstones_list.map((item, index) => {
                        return (
                            <Column key={index} size="6" margin="0 0 10px 0">
                                <Card
                                    width="100%"
                                    height="200px"
                                    color="black"
                                    padding="30px"
                                    move="up"
                                    up="100px"
                                    marginXs="0 0 30px 0"
                                >
                                    <Row >
                                        <Column size="3" pl_lg="0">

                                            {item.icon === "Book" && <Book width="48px" color={Colors.yellow} fill={Colors.yellow} />}
                                            {item.icon === "Teacher" && <Teacher width="48px" color={Colors.yellow} fill={Colors.yellow} />}
                                            {item.icon === "Users" && <Users width="48px" color={Colors.yellow} fill={Colors.yellow} />}
                                            {item.icon === "Sitemap" && <Sitemap width="48px" color={Colors.yellow} fill={Colors.yellow} />}

                                        </Column>
                                        <Column size="8" >
                                            <Row><H4 color={Colors.white}>{item.title}</H4></Row>
                                            <Row marginTop="15px">
                                                <Paragraph fontSize="14px" lineHeight="18px">
                                                    {item.content}
                                                </Paragraph>
                                            </Row>
                                        </Column>
                                    </Row>
                                </Card>
                            </Column>
                        )
                    })}

                </Row>
                <Divider height="50px" />
                <Title size="8" title={yml.staff.heading} paragraph={yml.staff.sub_heading} primary />
                <Mentors />

                <Divider height="150px" /></Wrapper>
            <Divider height="100px" />
            <Wrapper style="default">
            </Wrapper>
            <Divider height="150px" />
            <Wrapper style="default" image="no" color={Colors.lightGray} border="top">
                <Row>
                    <Column
                        size="12"
                        border="bottom"
                        image="no"
                    >
                        <Card shadow borders="1.25rem" height="450px" move="up" up="50%">
                            <Row
                                height="100%"
                                marginLeft="0"
                                marginRight="0"
                                customRespSize
                            >
                                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" border="bottom">
                                    <Row align="center" height="100%">
                                        <Column size="10" height="100%">
                                            <Divider height="10%" />
                                            <Row height="10%">
                                                <Column size="10">
                                                    <H3 primary align="left" >{yml.story.heading}</H3>
                                                </Column>
                                            </Row>
                                            <Row height="10%">
                                                <Column size="12">
                                                    <Separator primary />
                                                </Column>
                                            </Row>
                                            <Row height="60%">
                                                <Column size="10">
                                                    <Paragraph
                                                        color={Colors.gray}
                                                        margin="20px 0 0 0"
                                                        align="left"
                                                        fs_xs="10px"
                                                        fs_sm="10px"
                                                        fs_md="10px"
                                                        fs_lg="10px"
                                                        fs_xl="14px">
                                                        {yml.story.sub_heading_one}
                                                    </Paragraph>
                                                </Column>
                                            </Row>
                                            <Divider height="10%" />


                                        </Column>
                                    </Row>
                                </Column>
                                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" backgroundSize="cover" image="yes" url={yml.story.image} border="custom" customBorderRadius="0 1.25rem 1.25rem 0" />
                            </Row>
                        </Card>
                    </Column>
                </Row>
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default">
                <Title
                    primary
                    title={yml.posts.heading}
                    paragraph={yml.posts.sub_heading}
                    customParagraphSize="8"
                // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
                />

                <Divider height="50px" />
                <RecentPosts />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper style="default" image="no" color={Colors.lightGray} border="top">
                <Divider height="100px" />
                <WhoIsHiring source="partners" />
                <Divider height="100px" />
                <WhoIsHiring source="influencers" />
                <Divider height="100px" />
            </Wrapper>

            <Divider height="100px" />
        </>
    )
};

export const query = graphql`
  query AboutQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            banner{
                tagline
                sub_heading
                image
            }
            outcomes{
                heading
                sub_heading
                image
            }
            cornerstones {
                heading
                sub_heading
                cornerstones_list {
                  content
                  icon
                  title
                }
            }
            staff{
                heading
                sub_heading
            }
            story{
                heading
                sub_heading_one
        
                image
            }
            posts{
                heading
                sub_heading
            }
        }
      }
    }
  }
`;

export default BaseRender(Why);