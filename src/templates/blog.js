import React, {useState} from 'react'
import Link from 'gatsby-link'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper, WrapperImage} from '../components/Sections'
import {RoundImage, Colors} from '../components/Styling'
import LazyLoad from 'react-lazyload';
import BaseRender from './_baseLayout'
import Icon from '../components/Icon'


const Blog = ({data, pageContext, yml}) => {
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

    return (
        <>
            <WrapperImage
                github={`/page/blog.${pageContext.lang}.yml`}
                imageData={yml.banner.image && yml.banner.image.childImageSharp.fluid}
                bgSize="cover"
                className={`img-header`}
                height={`300px`}
                paddingRight={`0`}
                borderRadius="0 0 0 1.25rem"
            >
                <Divider height="100px" />
                <Title
                    title={yml.banner.tagline}
                    variant="main"
                    size="8"
                    color={Colors.white}
                    paragraph={yml.banner.sub_heading}
                    paragraphColor={Colors.white}
                    textAlign="center"

                />
            </WrapperImage>
            <Divider height="50px" />

            <Wrapper >
                <Row display="flex" justifyContent="left">
                    <Column size="12">
                        <H4 fontSize="30px">Featured</H4>
                    </Column>
                </Row>
                <Row display="flex">
                    <Separator variant="primary" />
                </Row>
                <Divider height="50px" />
                <Row display="flex" github={`/blog`}>
                    <div className="card-columns" >
                        {data.featured.edges.map((item, i) => {
                            return (
                                <Column masonry size="12" key={i} height="auto" margin="0 0 40px 0">
                                    {item.node.frontmatter.image &&
                                        <Link to={`/${pageContext.lang}/post/${item.node.frontmatter.slug}`}>
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
                                            <Link to={`/${pageContext.lang}/post/${item.node.frontmatter.slug}`}><H4
                                                align="left" align_sm="left"
                                                uppercase
                                                fs_xs="20px"
                                                fs_sm="24px"
                                                fs_md="16px"
                                                fs_lg="20px"
                                                fontSize="22px"
                                            >{item.node.frontmatter.title}</H4></Link>
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
                                            <Link to={`/${pageContext.lang}/post/${item.node.frontmatter.slug}`}><Icon icon="arrowright" width="24" color={Colors.yellow} fill={Colors.yellow} /></Link>
                                        </Column>
                                    </Row>

                                </Column>
                            )
                        })}
                    </div>
                </Row>
            </Wrapper>
            <Wrapper >
                <Row display="flex" justifyContent="left">
                    <Column size="12">
                        <H4

                            fs_xs="30px"
                            fs_sm="30px"
                            fs_md="30px"
                            fs_lg="30px"
                            fontSize="30px"
                        >All Stories</H4>
                    </Column>
                </Row>
                <Row display="flex">
                    <Separator variant="primary" />
                </Row>
                <Divider height="50px" />
                <Row display="flex">
                    <div className="card-columns" >
                        {data.posts.edges.filter(post => post.node.frontmatter.status === "published").map((item, i) => {
                            return (
                                <Column masonry size="12" key={i} height="auto" margin="0 0 40px 0">
                                    {item.node.frontmatter.image != null ?
                                        <Link to={`/${pageContext.lang}/post/${item.node.frontmatter.slug}`}>
                                            <LazyLoad scroll={true} height={200} width="100%" once={true}>
                                                <RoundImage
                                                    url={item.node.frontmatter.image}
                                                    bsize="cover"
                                                    mb="10px"
                                                    border="1.25rem"
                                                    position="center"
                                                    width="100%"
                                                    h_lg="140px"
                                                    h_md="120px"
                                                    h_sm="200px"
                                                    h_xs="150px"
                                                />
                                            </LazyLoad>
                                        </Link> : null}
                                    <Row display="flex" justifyContent="around" >

                                        <Column size size="12" alignSelf="center" align="left">
                                            <Link to={`/${pageContext.lang}/post/${item.node.frontmatter.slug}`}><H4
                                                uppercase
                                                fs_xs="20px"
                                                fs_sm="24px"
                                                fs_md="16px"
                                                fs_lg="20px"
                                                fontSize="22px"
                                            >{item.node.frontmatter.title}</H4></Link>
                                        </Column>
                                    </Row>
                                    <Row display="flex" height="auto">
                                        <Column size="12" align="center">
                                            <Paragraph color="gray" align="left" margin="10px 0" fontSize="12px">{item.node.frontmatter.excerpt}</Paragraph>
                                        </Column>
                                    </Row>
                                    <Row display="flex" height="auto" justifyContent="around">
                                        <Column size="1" alignSelf="center">
                                            <LazyLoad scroll={true} height={30} once={true}>
                                                <RoundImage border="100%" width="30px" height="30px" bsize="contain" url={item.node.frontmatter.avatar} />
                                            </LazyLoad>
                                        </Column>
                                        <Column size="8" alignSelf="center">
                                            <Paragraph color={Colors.gray} align="left"
                                                fs_xs="12px"
                                                fs_sm="12px"
                                                fs_md="10px"
                                                fs_lg="12px"
                                                fs_xl="12px" lineHeight="20px">{`${item.node.frontmatter.author} `}</Paragraph>
                                            <Paragraph color={Colors.gray} align="left" fs_xs="12px"
                                                fs_sm="12px"
                                                fs_md="10px"
                                                fs_lg="12px"
                                                fs_xl="12px" lineHeight="20px">{`${GetFormattedDate(item.node.frontmatter.date)}`}</Paragraph>
                                            {/* <Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${post.fields.readingTime.text} read`}</Paragraph> */}
                                        </Column>
                                        <Column size="2" align="end">
                                            <Link to={`/${pageContext.lang}/post/${item.node.frontmatter.slug}`}><Icon icon="arrowright" width="24" color={Colors.yellow} fill={Colors.yellow} /></Link>
                                        </Column>
                                    </Row>

                                </Column>
                            )
                        })}
                    </div>
                </Row>
            </Wrapper>
        </>
    )
}

export const postQuery = graphql`
query BlogQuery($file_name: String!, $lang: String!) {
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
          banner{
            tagline
            sub_heading
            image{
                childImageSharp {
                  fluid(maxWidth: 1500){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }  
          }
        
        }
      }
    }
    featured: allMarkdownRemark (
        sort: {fields: frontmatter___date, order: DESC},
        filter: {frontmatter: {
            featured: {eq: true}, 
            lang: {eq: $lang},
            status: {eq: "published"}
        }},
        limit: 10
    ){
        edges {
            node {
                frontmatter {
                author
                avatar
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
    posts: allMarkdownRemark (
        sort: {fields: frontmatter___date, order: DESC},
        filter: {frontmatter: {
            featured: {eq: true}, 
            lang: {eq: $lang},
            status: {eq: "published"}
        }}
    ){
        edges {
            node {
                frontmatter {
                author
                avatar
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


`
export default BaseRender(Blog);