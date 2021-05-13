import React from "react";
import PropTypes from "prop-types";
import {graphql} from 'gatsby';
import {H1, H2, H3, H4, H5, Title, Separator, Paragraph, Span} from '../components/Heading';
import {Container, Row, Column, Divider, Wrapper, WrapperImage} from '../components/Sections';
import Icon from '../components/Icon'
import {RoundImage, Colors} from '../components/Styling'
import LazyLoad from 'react-lazyload';
import BaseBlogRender from './_baseBlogLayout';
import Link from "gatsby-link";

const Tags = ({pageContext, data, yml}) => {
    const {edges, totalCount} = data.allMarkdownRemark;
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
    function OrganizeColumns (arr) {
        let posts = [[], [], []];
        for (let i = 0; i < arr.length; i += 3) {
            posts[0].push(arr[i])
        }
        for (let i = 1; i < arr.length; i += 3) {
            posts[1].push(arr[i])
        }
        for (let i = 2; i < arr.length; i += 3) {
            posts[2].push(arr[i])
        }
        return posts;
    }
    const blog_posts = OrganizeColumns(edges);
    const tagHeader = `${yml.about.heading} "${pageContext.tag}" (${totalCount})`;
    return (
        <>
            <Container>
                <Wrapper>
                    <Row display="flex" justifyContent="left">
                        <Column size="12">
                            <H3 fontSize="30px">{tagHeader}</H3>
                        </Column>
                    </Row>
                    <Row display="flex">
                        <Separator variant="primary" />
                    </Row>
                    <Divider height="50px" />
                    <Row display="flex" github={`/blog`}>
                        <div className="card-columns" >
                            {blog_posts[0].map((item, i) => {
                                return (
                                    <Column masonry size="12" key={i} height="auto" margin="0 0 40px 0">
                                        {item.node.frontmatter.image &&
                                            <Link to={`/${item.node.frontmatter.lang}/post/${item.node.frontmatter.slug}`}>
                                                <LazyLoad height={10} scroll={true} once={true}>
                                                    <RoundImage
                                                        url={item.node.frontmatter.image}
                                                        bsize="cover"
                                                        mb="10px"
                                                        border="1.25rem"
                                                        position="center"
                                                        width="100%"
                                                        height="140px"
                                                        h_lg="140px"
                                                        h_md="120px"
                                                        h_sm="200px"
                                                        h_xs="150px"
                                                    />
                                                </LazyLoad>
                                            </Link>
                                        }
                                        <Row display="flex" justifyContent="around" >
                                            <Column size size="12" alignSelf="center" align="left">
                                                <Link to={`/${item.node.frontmatter.lang}/post/${item.node.frontmatter.slug}`}><H5
                                                    align="left" align_sm="left"
                                                    uppercase
                                                    fs_xs="20px"
                                                    fs_sm="24px"
                                                    fs_md="16px"
                                                    fs_lg="20px"
                                                    fontSize="22px"
                                                >{item.node.frontmatter.title}</H5></Link>
                                            </Column>
                                        </Row>
                                        <Row display="flex" height="auto">
                                            <Column size="12" align="center">
                                                <Paragraph color="gray" align="left" margin="10px 0">{item.node.frontmatter.excerpt}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row display="flex" height="auto" justifyContent="around">
                                            <Column size="1" alignSelf="center">
                                                <LazyLoad scroll={true} height={30} once={true}>
                                                    <RoundImage border="100%" width="30px" height="30px" bsize="contain" url={item.node.frontmatter.avatar} />
                                                </LazyLoad>
                                            </Column>
                                            <Column size="8" alignSelf="center">
                                                <Paragraph
                                                    color={Colors.gray}
                                                    align="left"
                                                    fontSize="12px"
                                                    lineHeight="20px">
                                                    {`${item.node.frontmatter.author} `}
                                                </Paragraph>
                                                <Paragraph
                                                    color={Colors.gray} align="left" fontSize="12px"
                                                    lineHeight="20px">
                                                    {`${GetFormattedDate(item.node.frontmatter.date)}`}
                                                </Paragraph>
                                            </Column>
                                            <Column size="2" align="end">
                                                <Link to={`/${item.node.frontmatter.lang}/post/${item.node.frontmatter.slug}`}><Icon icon="arrowright" width="24" color={Colors.yellow} fill={Colors.yellow} /></Link>
                                            </Column>
                                        </Row>
                                    </Column>
                                )
                            })}
                        </div>
                        <div className="card-columns" >
                            {blog_posts[1].map((item, i) => {
                                return (
                                    <Column masonry size="12" key={i} height="auto" margin="0 0 40px 0">
                                        {item.node.frontmatter.image &&
                                            <Link to={`/${item.node.frontmatter.lang}/post/${item.node.frontmatter.slug}`}>
                                                <LazyLoad height={10} scroll={true} once={true}>
                                                    <RoundImage
                                                        url={item.node.frontmatter.image}
                                                        bsize="cover"
                                                        mb="10px"
                                                        border="1.25rem"
                                                        position="center"
                                                        width="100%"
                                                        height="140px"
                                                        h_lg="140px"
                                                        h_md="120px"
                                                        h_sm="200px"
                                                        h_xs="150px"
                                                    />
                                                </LazyLoad>
                                            </Link>
                                        }
                                        <Row display="flex" justifyContent="around" >
                                            <Column size size="12" alignSelf="center" align="left">
                                                <Link to={`/${item.node.frontmatter.lang}/post/${item.node.frontmatter.slug}`}><H5
                                                    align="left" align_sm="left"
                                                    uppercase
                                                    fs_xs="20px"
                                                    fs_sm="24px"
                                                    fs_md="16px"
                                                    fs_lg="20px"
                                                    fontSize="22px"
                                                >{item.node.frontmatter.title}</H5></Link>
                                            </Column>
                                        </Row>
                                        <Row display="flex" height="auto">
                                            <Column size="12" align="center">
                                                <Paragraph color="gray" align="left" margin="10px 0">{item.node.frontmatter.excerpt}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row display="flex" height="auto" justifyContent="around">
                                            <Column size="1" alignSelf="center">
                                                <LazyLoad scroll={true} height={30} once={true}>
                                                    <RoundImage border="100%" width="30px" height="30px" bsize="contain" url={item.node.frontmatter.avatar} />
                                                </LazyLoad>
                                            </Column>
                                            <Column size="8" alignSelf="center">
                                                <Paragraph
                                                    color={Colors.gray}
                                                    align="left"
                                                    fontSize="12px"
                                                    lineHeight="20px">
                                                    {`${item.node.frontmatter.author} `}
                                                </Paragraph>
                                                <Paragraph
                                                    color={Colors.gray} align="left" fontSize="12px"
                                                    lineHeight="20px">
                                                    {`${GetFormattedDate(item.node.frontmatter.date)}`}
                                                </Paragraph>
                                            </Column>
                                            <Column size="2" align="end">
                                                <Link to={`/${item.node.frontmatter.lang}/post/${item.node.frontmatter.slug}`}><Icon icon="arrowright" width="24" color={Colors.yellow} fill={Colors.yellow} /></Link>
                                            </Column>
                                        </Row>
                                    </Column>
                                )
                            })}
                        </div>
                        <div className="card-columns" >
                            {blog_posts[2].map((item, i) => {
                                return (
                                    <Column masonry size="12" key={i} height="auto" margin="0 0 40px 0">
                                        {item.node.frontmatter.image &&
                                            <Link to={`/${item.node.frontmatter.lang}/post/${item.node.frontmatter.slug}`}>
                                                <LazyLoad height={10} scroll={true} once={true}>
                                                    <RoundImage
                                                        url={item.node.frontmatter.image}
                                                        bsize="cover"
                                                        mb="10px"
                                                        border="1.25rem"
                                                        position="center"
                                                        width="100%"
                                                        height="140px"
                                                        h_lg="140px"
                                                        h_md="120px"
                                                        h_sm="200px"
                                                        h_xs="150px"
                                                    />
                                                </LazyLoad>
                                            </Link>
                                        }
                                        <Row display="flex" justifyContent="around" >
                                            <Column size size="12" alignSelf="center" align="left">
                                                <Link to={`/${item.node.frontmatter.lang}/post/${item.node.frontmatter.slug}`}><H5
                                                    align="left" align_sm="left"
                                                    uppercase
                                                    fs_xs="20px"
                                                    fs_sm="24px"
                                                    fs_md="16px"
                                                    fs_lg="20px"
                                                    fontSize="22px"
                                                >{item.node.frontmatter.title}</H5></Link>
                                            </Column>
                                        </Row>
                                        <Row display="flex" height="auto">
                                            <Column size="12" align="center">
                                                <Paragraph color="gray" align="left" margin="10px 0">{item.node.frontmatter.excerpt}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row display="flex" height="auto" justifyContent="around">
                                            <Column size="1" alignSelf="center">
                                                <LazyLoad scroll={true} height={30} once={true}>
                                                    <RoundImage border="100%" width="30px" height="30px" bsize="contain" url={item.node.frontmatter.avatar} />
                                                </LazyLoad>
                                            </Column>
                                            <Column size="8" alignSelf="center">
                                                <Paragraph
                                                    color={Colors.gray}
                                                    align="left"
                                                    fontSize="12px"
                                                    lineHeight="20px">
                                                    {`${item.node.frontmatter.author} `}
                                                </Paragraph>
                                                <Paragraph
                                                    color={Colors.gray} align="left" fontSize="12px"
                                                    lineHeight="20px">
                                                    {`${GetFormattedDate(item.node.frontmatter.date)}`}
                                                </Paragraph>
                                            </Column>
                                            <Column size="2" align="end">
                                                <Link to={`/${item.node.frontmatter.lang}/post/${item.node.frontmatter.slug}`}><Icon icon="arrowright" width="24" color={Colors.yellow} fill={Colors.yellow} /></Link>
                                            </Column>
                                        </Row>

                                    </Column>
                                )
                            })}
                        </div>
                    </Row>
                </Wrapper>
                {/* This links to a page that does not yet exist.
            We'll come back to it!
            <Link to="/tags">All tags</Link> */}
            </Container>
        </>
    )
}

export const pageQuery = graphql`
  query TagPage($tag: String, $file_name: String, $lang: String) {
      allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
          meta_info{
            slug
            title
            description
            image
            keywords
          }
          about{
            heading
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            type
          }
          frontmatter {
            author
            date
            image
            slug
            title
            excerpt
            lang
            featured
            status
          }
        }
      }
    }
  }
`;

export default BaseBlogRender(Tags);