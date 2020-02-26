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
                      path
                      date
                      author
                      image
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

    console.log("post", data)
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
            <Row>
                {post.map((i, index) => (
                    <Column size="4" key={index}>
                        <Card shadow height="500px" width="auto" padding="0 0 10px 0">
                            <RoundImage url={i.node.frontmatter.image} bsize="cover" mb="10px" height="40%" border="1.25rem 1.25rem 0 0 "></RoundImage>
                            <Divider height="5%" />
                            <Row align="center" height="10%">
                                <Column size size="10" customRespSize respSize="10" >
                                    <H4 uppercase align="center">{i.node.frontmatter.title}</H4>
                                </Column>
                            </Row>
                            <Row align="center" height="40%">
                                <Column size="10">
                                    <Paragraph color="gray" align="left" margin="10px 0" fontSize="12px">{i.node.rawMarkdownBody}</Paragraph>
                                </Column>
                            </Row>
                            <Row height="5%" align="center">
                                <Column size="10">
                                    <Row>
                                        <Column size="10"></Column>
                                        <Column size="2"> <Link to={`${i.node.frontmatter.path}`}><ArrowRight width="32" color={Colors.blue} fill={Colors.blue} /></Link></Column>

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
