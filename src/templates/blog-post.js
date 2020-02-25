import React from 'react'
import Link from 'gatsby-link'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowRight} from '../components/Styling'

export default function Template ({data}) {
    const post = data.markdownRemark

    return (

        <>
            <Wrapper
                style="default">
                <Title
                    title="Blog"
                    primary
                    size="8"
                />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default">

                <Row align="center">
                    <Column size="8"><H1>{post.frontmatter.title}</H1></Column>
                </Row>
                <Row height="50px" align="center">
                    <Column size="8">
                        <Row height="100%" align="around">
                            <Column size="2" alignSelf="center">
                                <RoundImage border="100%" width="30px" height="30px" bsize="contain" url={post.frontmatter.avatar} />
                            </Column>
                            <Column size="10" alignSelf="center">
                                <Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${post.frontmatter.date} ${post.frontmatter.author}`}</Paragraph>
                                <Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${post.frontmatter.read_time} read`}</Paragraph>
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row height="30px" align="around">
                    <Column size="8" alignSelf="center">
                        <Separator primary />
                    </Column>
                </Row>
                <Divider height="30px" />
                <Row height="10%" align="around">
                    <Column size="8" alignSelf="center">
                        <Paragraph color={Colors.gray} align="left" fontSize="12px" lineHeight="20px">{post.rawMarkdownBody}</Paragraph>
                    </Column>
                </Row>
                {/* <Row align="center">
                    <Column size="12">
                        <Paragraph align="center" fontSize="14px" color={Colors.gray}>{`${post.frontmatter.date}`}</Paragraph>
                    </Column>
                </Row> */}
            </Wrapper>


            {/* <div>
                <Link to="/blog">Go Back</Link>
                <hr />

                <h4>Posted by {post.frontmatter.author} on {post.frontmatter.date}</h4>
                <div dangerouslySetInnerHTML={{__html: post.html}} />


            </div> */}
        </>
    )
}
export const postQuery = graphql`
    query BlogPostByPath($path: String!){
                markdownRemark(frontmatter: {path: {eq: $path}}){
                html
            frontmatter{
                path
                title
                author
                date
                avatar
                read_time
        }
        rawMarkdownBody
        
    }
}


`