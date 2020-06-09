import React, {useContext} from 'react'
import Link from 'gatsby-link'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowLeft} from '../components/Styling'
import Layout from '../global/Layout'
import {Card} from '../components/Card'
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

    // console.log("filt", filtered)
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
    let postDate = GetFormattedDate(post.frontmatter.date);
    // console.log("Frontmatter", data.markdownRemark.frontmatter);
    return (
        <Layout type="post" seo={data.markdownRemark.frontmatter} context={pageContext}>
            <Wrapper
                style="custom"
                innerLeftCol="2"
                innerRightCol="9"
                full

                content={<Row align="end" padding="0 20px 0 0" style={{position: "sticky", top: "12%"}}>
                    <Column size="" customRespSize respSize="10" >
                        <Row>

                            <TwitterShareButton
                                className="network__share-button"
                                url={`https://www.4geeksacademy.co/${pageContext.slug}`}
                                title={"share"}
                            >
                                <TwitterIcon
                                    size={24} round={true}
                                />
                            </TwitterShareButton>
                            <FacebookShareButton
                                className="network__share-button"
                                url={`https://www.4geeksacademy.co/${pageContext.slug}`}
                                title={"share"}
                            >
                                <FacebookIcon
                                    size={24} round={true}
                                />
                            </FacebookShareButton>
                            <Link to="/blog"><ArrowLeft width="24px" color={Colors.yellow} fill={Colors.yellow} /></Link>
                        </Row>
                    </Column></Row>}>
                <Row align="left">
                    <Column size="10">
                        <Row height="100%" align="around">
                            <Column size="2" customRespSize respSize="2" alignSelf="center" >
                                <RoundImage border="100%" width="75px" height="75px" bsize="contain" url={filtered.avatar} />
                            </Column>
                            <Column size="8" customRespSize respSize="8" alignSelf="center">
                                <Row><Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px"><a href={`https://twitter.com/${filtered.name || "4GeeksAcademy"}`} rel="author noopener noreferrer nofollow">{`${postDate} - ${filtered.name || '4Geeks Academy'}`}</a></Paragraph></Row>
                                <Row><Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${filtered.bio}`}</Paragraph></Row>
                                <Row><Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${post.fields.readingTime.text}`}</Paragraph></Row>
                                {filtered.username && <Row>
                                    <TwitterFollowButton
                                        screenName={filtered.username}
                                    />
                                </Row>}

                            </Column>

                        </Row>
                        {/* <FacebookShareCount url={"shareUrl"} /> */}
                    </Column>
                </Row>
                <Divider height="30px" />
                <Row align="left" >
                    <Column size="10" align="center">
                        <Row>
                            {post.frontmatter.tags != null ? post.frontmatter.tags.map((tag, i) => {
                                return (
                                    <Card
                                        key={i}
                                        color="darkGray"
                                        padding="2px 5px"
                                        borders=".2rem"
                                        margin="5px 3px"
                                        w_xs="20px"
                                    >
                                        <Paragraph color={Colors.darkGray}>{tag}</Paragraph>
                                    </Card>
                                )
                            }) : null}

                        </Row>
                    </Column>
                </Row>
                <Divider height="30px" />
                <Row>
                    <Column size="10" align="center">
                        <H1

                            fs_sm="30px"
                            fs_md="30px"
                            fs_lg="30px"
                            fs_xl="36px">{post.frontmatter.title}</H1>
                    </Column>
                </Row>
                <Divider height="30px" />
                <Row>
                    <Column size="10" customRespSize respSize="10" alignSelf="center">
                        <RoundImage border="1.25rem" width="100%" height="300px" bsize="contain" position="center" url={post.frontmatter.image} />
                    </Column>
                </Row>
                <Row height="auto" align="left">
                    <Column size="10" >
                        <div className="single-post" dangerouslySetInnerHTML={{__html: post.html}}></div>
                    </Column>
                </Row>
                <Row align="left" >
                    <Column size="10" align="left">
                        {post.frontmatter.tags && <Row>
                            {post.frontmatter.tags.map((tag, i) => {
                                return (
                                    <Card
                                        key={i}
                                        color="darkGray"
                                        padding="2px 5px"
                                        borders=".2rem"
                                        margin="5px 3px">
                                        <Paragraph color={Colors.darkGray}>{tag}</Paragraph>
                                    </Card>
                                )
                            })}
                        </Row>}
                    </Column>
                </Row>
                <Divider height="100px" />
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
            unlisted
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