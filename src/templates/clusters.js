import React from "react";
import PropTypes from "prop-types";
import {graphql} from 'gatsby';
import {H1, H2, H3, H4, H5, Title, Separator, Paragraph, Span} from '../new_components/Heading';
import {Container, Row, Grid, Div, GridContainerWithImage, GridContainer} from '../new_components/Sections';
import {StyledBackgroundSection, Colors} from '../new_components/Styling'
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
    const clusterTitle = pageContext && pageContext.cluster.replace("-", " ")
    return (
        <>
            <GridContainerWithImage background="rgba(199, 243, 253, 0.5)" padding="24px 0 " padding_tablet="36px 40px 54px 0" columns_tablet="14" margin="120px 0 24px 0">
                <Div flexDirection="column" justifyContent_tablet="start" padding_tablet="70px 0 0 0" gridColumn_tablet="1 / 7">
                    <H1 textAlign_tablet="left" margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1>
                    <H2 textAlign_tablet="left" fontSize="50px" lineHeight="60px" textTransform="capitalize">{`${clusterTitle}`}</H2>
                    <Paragraph textAlign_tablet="left" margin="26px 0">{yml.header.paragraph} </Paragraph>
                </Div>
                <Div display="none" display_tablet="flex" height="auto" width="100%" gridColumn_tablet="8 / 15" style={{position: "relative"}}>
                    <StyledBackgroundSection
                        height="450px"
                        width="100%"
                        image={yml.header.image && yml.header.image.childImageSharp.fluid}
                        bgSize={`contain`}
                        alt={yml.header.alt}
                    />
                </Div>
            </GridContainerWithImage>
            <GridContainer columns_tablet="3">
                <Grid gridColumn_tablet="1/3" gridTemplateColumns_tablet="repeat(2, 1fr)">
                    {
                        Array.isArray(edges) && edges.map((m, i) => {
                            return (
                                <Div key={i}>{i}</Div>
                            )
                        })
                    }
                </Grid>
                <Div background={Colors.verylightGray} flexDirection_tablet="column" padding_tablet="20px">
                    {
                        <>
                            <H3 textAlign="left">{yml.sidebar.title}</H3>
                            {Array.isArray(edges) && edges.map((m, i) => {
                                return (
                                    <Link to={`/${pageContext.lang}/${m.node.frontmatter.cluster}/${m.node.frontmatter.slug}`}>
                                        <H4 borderBottom="1px solid #ebebeb" padding="20px 0" margin="20px 0" textAlign="left" lineHeight="19px" fontWeight="700" color={Colors.darkGray} key={i}>
                                            {m.node.frontmatter.title}
                                        </H4>
                                    </Link>
                                )
                            })}
                        </>
                    }
                </Div>
            </GridContainer>
        </>
    )
}

export const pageQuery = graphql`
  query clusterPage($cluster: String, $file_name: String, $lang: String) {
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
          seo_title 
          header {
            title
            paragraph
            image{
                childImageSharp {
                  fluid(maxWidth: 1500, quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            image_alt
          }  
          sidebar{
            title
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
      filter: { frontmatter: { cluster: { in: [$cluster] } } }
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
            cluster
          }
        }
      }
    }
  }
`;

export default BaseBlogRender(Tags);


{/* <Container>
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
                                            <Link to={`/${item.node.frontmatter.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}>
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
                                                <Link to={`/${item.node.frontmatter.lang}/${item.node.frontmatter.cluster || "post"}/${item.node.frontmatter.slug}`}><H5
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
                                                <Link to={`/${item.node.frontmatter.lang}/${item.node.frontmatter.cluster || "post"}/${item.node.frontmatter.slug}`}><Icon icon="arrowright" width="24" color={Colors.yellow} fill={Colors.yellow} /></Link>
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
                                            <Link to={`/${item.node.frontmatter.lang}/${item.node.frontmatter.cluster || "post"}/${item.node.frontmatter.slug}`}>
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
                                                <Link to={`/${item.node.frontmatter.lang}/${item.node.frontmatter.cluster || "post"}/${item.node.frontmatter.slug}`}><H5
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
                                                <Link to={`/${item.node.frontmatter.lang}/${item.node.frontmatter.cluster || "post"}/${item.node.frontmatter.slug}`}><Icon icon="arrowright" width="24" color={Colors.yellow} fill={Colors.yellow} /></Link>
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
                                            <Link to={`/${item.node.frontmatter.lang}/${item.node.frontmatter.cluster || "post"}/${item.node.frontmatter.slug}`}>
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
                                                <Link to={`/${item.node.frontmatter.lang}/${item.node.frontmatter.cluster || "post"}/${item.node.frontmatter.slug}`}><H5
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
                                                <Link to={`/${item.node.frontmatter.lang}/${item.node.frontmatter.cluster || "post"}/${item.node.frontmatter.slug}`}><Icon icon="arrowright" width="24" color={Colors.yellow} fill={Colors.yellow} /></Link>
                                            </Column>
                                        </Row>

                                    </Column>
                                )
                            })}
                        </div>
                    </Row>
                </Wrapper>
                This links to a page that does not yet exist.
            We'll come back to it!
            <Link to="/tags">All tags</Link>
            </Container> */}