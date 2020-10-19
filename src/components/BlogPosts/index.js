import React, {useState, useEffect} from 'react';
import {useStaticQuery, graphql, navigate} from 'gatsby';
import {Row, Container, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, Button, RoundImage} from '../Styling';
import Card from '../Card';
import Icon from "../Icon"

const BlogPosts = ({ filter, limit, featured }) => {
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
                      featured
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
    const [posts, setPosts] = useState(data.allMarkdownRemark.edges)
    useEffect(() => {
        let _posts = data.allMarkdownRemark.edges;
        if(featured) _posts = _posts.filter(p => p.node.frontmatter.featured)
        
        if(filter){
            _posts = _posts.filter(p => filter.includes(p.node.frontmatter.slug));
            setPosts(_posts)
        } 
        else{
            let newArray = [];
            for (let i = 0; i < limit; i++) {
                newArray.push(_posts[Math.floor(Math.random() * _posts.length)]);
            }
            setPosts(newArray)
        } 
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
                        <Icon icon="arrowright" width="32" color={Colors.blue} fill={Colors.blue}
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
BlogPosts.defaultProps = {
    limit: 3,
    filter: null
}
export default BlogPosts;
