import React, {useState} from 'react'
import Link from 'gatsby-link'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../new_components/Heading'
import {Container, Row, Column, Divider, Wrapper, WrapperImage} from '../new_components/Sections'
import {RoundImage, Colors} from '../new_components/Styling'
import LazyLoad from 'react-lazyload';
import BaseBlogRender from './_baseBlogLayout'
import Icon from '../new_components/Icon'
import twitterUser from '../utils/twitter'
import { Grid, Div, Header } from '../new_components/Sections'

import Banner from '../new_components/Blog/Banner' 
import Careers from '../new_components/Blog/Careers'
import Article from '../new_components/Blog/Article'

const Blog = ({data, pageContext, yml}) => {

    //Format a Post Card
    function drawCard(item,i){
      
      return (
        
        <Column masonry size="12" key={i} height="auto" margin="0 8px 40px 8px">
          {item.node.frontmatter.image &&
            <Link to={`/${pageContext.lang}/post/${item.node.frontmatter.slug}`}>
              <LazyLoad height={10} scroll={true} once={true}>
                <RoundImage
                  url={item.node.frontmatter.image}
                  bsize="cover"
                  mb="10px"
                  border="0px"
                  position="center"
                  width="100%"
                  height="329px"
                  h_lg="140px"
                  h_md="120px"
                  h_sm="200px"
                  h_xs="150px"
                />
              </LazyLoad>
            </Link>
          }
          
          <Row display="flex" >
            <Column size size="12" textAlign="left">
              <Link to={`/${pageContext.lang}/post/${item.node.frontmatter.slug}`}>
                <H4             
                  style={{fontFamily:"Lato"}}     
                  textAlign="left" 
                  align_sm="left"
                  uppercase
                  fs_xs="20px"
                  fs_sm="24px"
                  fs_md="16px"
                  fs_lg="20px"
                  fontSize="22px"
                >
                  {item.node.frontmatter.title}
                </H4>                
              </Link>
            </Column>            
          </Row>
          
          <Divider height="35px" />

          <Row display="flex" height="auto" margin="0 0 0 0">
            <Column size="12" align="center">
              <Paragraph fontFamily="Lato" fontWeight="300" fontSize="15px" color="#3A3A3A" textAlign="left" margin="0 0 0px 0">
                {item.node.frontmatter.excerpt}
              </Paragraph>
            </Column>
          </Row>
          
          <Divider height="15px" />

          <Row display="flex" height="auto" style={{"top": "1469px"}}>
            <Column size="12">
              <Paragraph fontSize="13px" color="#0097cd" margin="0 0 0 0" textAlign="left">            
                <Link to={`/${pageContext.lang}/post/${item.node.frontmatter.slug}`}>
                  Leer artículo &gt; 
                </Link>
              </Paragraph>
            </Column>
          </Row>

        </Column>
      ) 
    }

    //---------------------------------------------------

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

    function OrganizeColumns(arr){
        let posts = [[],[],[]];
        for(let i = 0; i < arr.length; i += 3){
            posts[0].push(arr[i])
        }
        for(let i = 1; i < arr.length; i += 3){
            posts[1].push(arr[i])
        }
        for(let i = 2; i < arr.length; i += 3){
            posts[2].push(arr[i])
        }
        return posts;
    }
       
    const blog_posts = OrganizeColumns(data.featured.edges);
    const story_posts = OrganizeColumns(data.posts.edges.filter(post => post.node.frontmatter.status === "published"));
    
    data.pageContext = pageContext

    return (
        <>
         
          <Grid>
                                
            <Banner yml={yml}/>
              
            <Divider height="40px"/>           
                   
            <Careers yml={yml} story_posts={story_posts} page_context={data.pageContext}/>
            
            <Divider height="78px"/>
                        
            <Div justifyContent="center" github={`/blog`} padding="0 167px 0 167px">
              
              <div style={{ 'display': 'inline-block', "width": "33%" }}>
                {
                  blog_posts[0].map((item, i) => {
                    //COMPLETED: ahora no se necesita importar avatar en cada markdown
                    const allowed = [`${item.node.frontmatter.author}`];
                    const filtered = Object.keys(twitterUser)
                          .filter(key => allowed.includes(key))
                          .reduce((obj, key) => {
                            obj = twitterUser[key];
                            return obj;
                          },{});
                        
                    return drawCard(item,i)
                  })
                }
              </div>
              
            <div style={{ 'display': 'inline-block', "width": "33%" }}>
                {
                  blog_posts[1].map((item, i) => {

                    return drawCard(item, i)
                        
                  })                
                }
              </div>

              <div style={{ 'display': 'inline-block', "width": "33%" }}>
                {
                  blog_posts[2].map((item, i) => {

                    return drawCard(item, i)

                  })
                }
              </div>                  
               
            </Div>
            
          </Grid>

            {/*
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
                
                        {blog_posts[0].map((item, i) => {
                            //COMPLETED: ahora no se necesita importar avatar en cada markdown
                            const allowed = [`${item.node.frontmatter.author}`];
                            const filtered = Object.keys(twitterUser)
                                .filter(key => allowed.includes(key))
                                .reduce((obj, key) => {
                                    obj = twitterUser[key];
                                    return obj;
                                }, {});
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
                                                <RoundImage border="100%" width="30px" height="30px" bsize="contain" url={filtered.avatar} />
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
                    <div className="card-columns" >
                        {blog_posts[1].map((item, i) => {
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
                    <div className="card-columns" >
                        {blog_posts[2].map((item, i) => {
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
            */}

            {/*
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
                        {story_posts[0].map((item, i) => {
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
                    <div className="card-columns" >
                        {story_posts[1].map((item, i) => {
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
                    <div className="card-columns" >
                        {story_posts[2].map((item, i) => {
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
            */}

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
                  fluid( maxWidth: 400, quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }  
          }
          question
          topics
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
export default BaseBlogRender(Blog);