import React, {useContext} from 'react'
import Link from 'gatsby-link'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Div, Row, Column, Divider, WrapperCustom} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowLeft} from '../components/Styling'
import Layout from '../global/Layout'
import {Card} from '../components/Card'
import LazyLoad from 'react-lazyload';
import twitterUser from '../utils/twitter'
import {TwitterFollowButton} from 'react-twitter-embed';
import "../assets/css/single-post.css"
import {
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    FacebookIcon,
    FacebookShareCount
} from "react-share";

{/* <Row>

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
</Row> */}

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
    return (
        <Layout type="post" seo={data.markdownRemark.frontmatter} context={pageContext}>
            <Column size="10" margin="50px auto 0px auto">
                <Column size="12" margin="auto">
                    <Div height="100%" align="around" justifyContent="center">
                        <LazyLoad scroll={true} height={100} once={true}>
                            <RoundImage border="100%" width="75px" height="75px" bsize="contain" url={filtered.avatar} />
                        </LazyLoad>
                        <Div width="400px" w_sm="200px" margin="0 0 0 20px" display="block" align="left" alignSelf="center">
                            <Paragraph color={Colors.gray} fontWeight="900" fs_sm="12px" align="left" align_sm="left" fontSize="16px" lineHeight="20px"><a href={`https://twitter.com/${filtered.name || "4GeeksAcademy"}`} rel="author noopener noreferrer nofollow">{`${filtered.name || '4Geeks Academy'} on ${postDate}`}</a></Paragraph>
                            <Paragraph color={Colors.gray} align="left" fs_sm="10px" align_sm="left" fontSize="14px" lineHeight="14px">{`${filtered.bio}`}</Paragraph>
                            <Paragraph color={Colors.gray} margin="0 0 10px 0" fs_sm="10px" fontWeight="900" align="left" align_sm="left" fontSize="14px" lineHeight="14px">{`${post.fields.readingTime.text}`}</Paragraph>
                        </Div>
                    </Div>
                    {filtered.username &&
                        <Div width="400px" w_sm="100%" margin="auto" align="center" padding="0 0 0 50px" p_sm="0" display="block" align="left" alignSelf="center">
                            <TwitterFollowButton screenName={filtered.username} />
                        </Div>
                    }
                </Column>
                <Column size="12" align="center" margin="30px 0px">
                    {post.frontmatter.tags != null && post.frontmatter.tags.map((tag, i) => {
                        return (
                            <Card
                                key={i}
                                color="darkGray"
                                display="inline-block"
                                padding="5px 8px"
                                borders=".2rem"
                                margin="7px"
                            >
                                <Link to={"/us/blog/tag/" + tag}>{tag}</Link>
                            </Card>
                        )
                    })}
                </Column>
                <Column size="12" align="center">
                    <H1
                        type="h1"
                        fontSize="36px"
                        fs_lg="30px"
                        textShadow="none">{post.frontmatter.title}</H1>
                </Column>
                <Column size="12" margin="10px 0px">
                    <LazyLoad scroll={true} height={100} once={true} >
                        <RoundImage border="1.25rem" width="100%" height="300px" bsize="contain" position="center" url={post.frontmatter.image} />
                    </LazyLoad>
                </Column>
                <Column size="12" margin="10px 0px" >
                    <div className="single-post" dangerouslySetInnerHTML={{__html: post.html.replace(/<h1>.*<\/h1>/gm, "")}}></div>
                </Column>
                <Column size="12" margin="10px 0px 50px 0px" align="left">
                    {post.frontmatter.tags && post.frontmatter.tags.map((tag, i) => {
                        return (
                            <Card
                                key={i}
                                color="darkGray"
                                cursor="pointer"
                                padding="5px 8px"
                                display="inline-block"
                                borders=".2rem"
                                margin="7px">
                                {tag}
                            </Card>
                        )
                    })}
                </Column>
            </Column>
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