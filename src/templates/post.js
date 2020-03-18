import React from 'react'
import Link from 'gatsby-link'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowRight} from '../components/Styling'
import Layout from '../global/Layout'
import twitterUser from '../utils/twitter'

export default function Template (props) {
    console.log("props", props);
    const {data, pageContext} = props;
    const post = props.data.markdownRemark;

    return (
        <Layout type="post" seo={data.markdownRemark.frontmatter} context={pageContext}>
            <Wrapper
                style="default">
                <Row align="center">
                    <Column size="8">
                        <Row height="100%" align="around">
                            <Column size="2" customRespSize respSize="2" alignSelf="center">
                                <RoundImage border="100%" width="75px" height="75px" bsize="contain" url={post.frontmatter.avatar} />
                            </Column>
                            <Column size="10" customRespSize respSize="10" alignSelf="center">
                                <Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${post.frontmatter.date} ${post.frontmatter.author}`}</Paragraph>
                                <Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${post.fields.readingTime.text} read`}</Paragraph>
                            </Column>
                        </Row>
                    </Column>
                </Row>

                <Row align="center" >
                    <Column size="8" align="center">
                        <RoundImage border="1.25rem" width="100%" height="100%" bsize="contain" position="center" url={post.frontmatter.image} />
                    </Column>
                </Row>
                <Divider height="30px" />
                <Row height="auto" align="around">
                    <Column size="8" alignSelf="center">
                        <div className="single-post" dangerouslySetInnerHTML={{__html: post.html}}></div>
                    </Column>
                </Row>

            </Wrapper>

        </Layout>)
}
export const postQuery = graphql`
query BlogPostBySlug($slug: String!){
    markdownRemark(frontmatter: {slug: {eq: $slug}}){
        html
        frontmatter{
            slug
            title
            author
            date
            avatar
            excerpt
            image
            tags
        }
        fields{
            readingTime {
              text
            }
        }
        
    }
}


`