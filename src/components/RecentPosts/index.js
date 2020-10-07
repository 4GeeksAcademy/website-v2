import React, {useState, useEffect} from 'react';
import {useStaticQuery, graphql, navigate} from 'gatsby';
import styled from 'styled-components';
import {Row, Container, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, ArrowRight, Button, RoundImage} from '../Styling';
import {Card} from '../Card';

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

    const [posts, setPosts] = useState([])
    useEffect(() => {
        let newArray = [];
        for (let i = 0; i < 3; i++) {
            newArray.push(post[Math.floor(Math.random() * post.length)]);
        }
        setPosts(newArray);
    }, []);

    return (
        <Row github="/blog">
            {posts.map((i, index) => (
                <Column size="4" size_sm="12" key={index} margin="10px 0">
                    <Card
                        onClick={() => navigate(`/${i.node.frontmatter.slug}`)}
                        shadow
                        bgHover={Colors.lightGray}
                        position="relative"
                        height="350px"
                        width="430px"
                        h_lg="400px"
                        h_md="370px"
                        h_sm="170px"
                        h_xs="200px"
                    >
                        <RoundImage
                            url={i.node.frontmatter.image}
                            bsize="cover"
                            position="center center"
                            mb="10px"
                            height="39%"
                            minHeight="100px"
                            border="1.25rem 1.25rem 0 0 "
                        />
                        <H4
                            fs_xs="20px"
                            fs_sm="16px"
                            fs_md="14px"
                            fs_lg="20px"
                            fontSize="20px"
                            padding="5px"
                            uppercase align="center">{i.node.frontmatter.title}</H4>
                        <Paragraph
                            display_sm="none"
                            padding="10px"
                            fontSize="12px"
                            color="gray" align="left" margin="10px 0">{i.node.frontmatter.excerpt}</Paragraph>
                        <ArrowRight width="32" color={Colors.blue} fill={Colors.blue}
                            style={{
                                position: "absolute",
                                bottom: "10px",
                                right: "10px",
                            }}
                        />
                    </Card>
                </Column>
            ))}
        </Row>
    )
};

export default RecentPosts;
