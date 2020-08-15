import React, {useState, useEffect} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import styled from 'styled-components';
import {Row, Container, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, ArrowRight, Button, RoundImage} from '../Styling';
import {Card} from '../Card';
import Link from 'gatsby-link'

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]
const RecentPosts = () => {
    const data = useStaticQuery(graphql`
        query myPostsQuery{
            allMarkdownRemark {
                edges {
                  node {
                    frontmatter {
                      title
                      slug
                      date
                      author
                      image
                      avatar
                      excerpt
                    }
                    rawMarkdownBody
                    html
                    htmlAst
                    headings {
                      depth
                      value
                    }
                  }
                }
              }
            }
        `)
    let post = data.allMarkdownRemark.edges;
    function randomArray () {
        let newArray = [];
        let tempIndex = ""
        for (let i = 0; i < 3; i++) {
            newArray.push(post[Math.floor(Math.random() * post.length)]);
        }
        return newArray;
    }
    // const [event, setEvent] = useState([])
    // useEffect(() => {
    //     fetch(
    //         'https://assets.breatheco.de/apis/event/all',
    //     )
    //         .then(response => response.json())
    //         .then(data => setEvent(data))
    // }, []);
    // let today = new Date();
    // let newEventArray = event.filter((item) => new Date(item.event_date).getTime() >= today.getTime())
    return (
        <>
            <Row github="/blog">
                {randomArray().map((i, index) => (
                    <Column size="4" customRespSize respSize="12" key={index} margin="10px 0">
                        <Card
                            shadow
                            padding="0 0 25px 0"
                            width="100%"
                            h_xs="320px"
                            h_sm="320px"
                            h_md="370px"
                            h_lg="440px"
                            h_xl="430px"
                        >
                            <RoundImage
                                url={i.node.frontmatter.image}
                                bsize="cover"
                                position="top"
                                mb="10px"
                                height="39%"
                                border="1.25rem 1.25rem 0 0 "
                            // h_xs="auto"
                            // h_sm="auto"
                            // h_md="170px"
                            // h_lg="160px"
                            // h_xl="130px"
                            />
                            <Divider height="3%" />
                            <Row align="center" height="20%">
                                <Column size size="11" customRespSize respSize="10" >
                                    <H4
                                        fs_xs="20px"
                                        fs_sm="16px"
                                        fs_md="14px"
                                        fs_lg="20px"
                                        fs_xl="20px"
                                        uppercase align="center">{i.node.frontmatter.title}</H4>
                                </Column>
                            </Row>
                            <Divider height="1%" />
                            <Row align="center" height="30%">
                                <Column size="10" customRespSize respSize="10">
                                    <Paragraph
                                        fs_xs="20px"
                                        fs_sm="18px"
                                        fs_md="10px"
                                        fs_lg="10px"
                                        fs_xl="12px"
                                        color="gray" align="left" margin="10px 0" fontSize="12px">{i.node.frontmatter.excerpt}</Paragraph>
                                </Column>
                            </Row>
                            <Row height="5%" align="center">
                                <Column size="10" >
                                    <Row>
                                        <Column size="7"></Column>
                                        <Column size="5" align="right">
                                            <Link to={`/${i.node.frontmatter.slug}`}><ArrowRight width="32" color={Colors.blue} fill={Colors.blue} /></Link>
                                        </Column>

                                    </Row>
                                </Column>

                            </Row>
                        </Card>
                    </Column>
                ))}
            </Row>
        </>
    )
};

export default RecentPosts;
