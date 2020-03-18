import React from 'react'
import Link from 'gatsby-link'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowRight} from '../components/Styling'
import Layout from '../global/Layout'
import twitterUser from '../utils/twitter'
import {TwitterFollowButton} from 'react-twitter-embed';
import {
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    FacebookIcon,
    FacebookShareCount
} from "react-share";


export default function Template (props) {
    const {data, pageContext} = props;
    const post = props.data.markdownRemark;
    const allowed = [`${post.frontmatter.author}`];
    const filtered = Object.keys(twitterUser)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj = twitterUser[key];
            return obj;
        }, {});

    console.log("filt", filtered)
    function GetFormattedDate (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    let postDate = GetFormattedDate(post.frontmatter.date)
    return (
        <Layout type="post" seo={data.markdownRemark.frontmatter} context={pageContext}>
            <Wrapper
                style="default">
                <Row align="center">
                    <Column size="8">
                        <Row height="100%" align="around">
                            <Column size="2" customRespSize respSize="2" alignSelf="center">
                                <RoundImage border="100%" width="75px" height="75px" bsize="contain" url={filtered.avatar} />
                            </Column>
                            <Column size="6" customRespSize respSize="10" alignSelf="center">
                                <Row><Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${postDate} - ${filtered.name != undefined || filtered.name != null ? filtered.name : '4Geeks Academy'}`}</Paragraph></Row>
                                <Row><Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${post.fields.readingTime.text} read`}</Paragraph></Row>
                                <Row>
                                    <TwitterFollowButton
                                        screenName={filtered.username}
                                    />
                                </Row>

                            </Column>
                            <Column size="" customRespSize respSize="10" alignSelf="center">
                                <Row>

                                    <TwitterShareButton
                                        className="network__share-button"
                                        url={`https://www.twitter.com/${filtered.username}`}
                                        title={"share"}
                                    >
                                        <TwitterIcon
                                            size={24} round={true}
                                        />
                                    </TwitterShareButton>
                                    <FacebookShareButton
                                        className="network__share-button"
                                        url={`https://www.facebook.com/${filtered.username}`}
                                        title={"share"}
                                    >
                                        <FacebookIcon
                                            size={24} round={true}
                                        />
                                    </FacebookShareButton>

                                </Row>
                            </Column>
                        </Row>
                        {/* <FacebookShareCount url={"shareUrl"} /> */}
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