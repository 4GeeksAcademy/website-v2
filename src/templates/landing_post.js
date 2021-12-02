import React, {useEffect, useState} from 'react'
import {Paragraph} from '../components/Heading'
import {RoundImage, Colors, Button, Link} from '../components/Styling'
import CallToAction from '../components/CallToAction'
import Layout from '../global/Layout'
import "../assets/css/single-post.css"
import rehypeReact from "rehype-react"
import ScrollSpy from "../components/ScrollSpy"

//FROM components
import {GridContainer, Div, Header} from '../components/Sections'

export default function Template (props) {
  const {data, pageContext} = props;
  const [selected, setSelected] = useState(null);
  const post = data.markdownRemark;
  const lang = pageContext.lang

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { 
      "button": Button,
      "call-to-action": CallToAction,
    }
  }).Compiler

  // mdAST is a specification for representing Markdown in a syntax tree
  const markdownAST = renderAst(post.htmlAst).props.children
  const sanitizedData = markdownAST?.filter(el => el.type !== "h1")
  const filteredH2 = markdownAST?.filter(el => el.type === "h2")

  //Returns month's name
  function GetMonth (n) {
    let monthsEs = ["", "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]
    let monthsUs = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    let mes = "";

    if (pageContext.lang == "es")
      mes = monthsEs[n];
    else
      mes = monthsUs[n];

    return mes;
  }
    
  return (

    <>
      <Layout type="post" seo={data.markdownRemark.frontmatter} context={pageContext}>

        <Header
          hideArrowKey
          padding="90px 0 70px 0"
          padding_tablet="90px 0 70px 0"
          paddingParagraph="0px 14% 0px 0"   
          textAlign_tablet="left"        
          seo_title={post.frontmatter.cluster}
          title={post.frontmatter.title}
          paragraph={post.frontmatter.excerpt}
          display_mobile="flex"
          svg_image={
            <RoundImage border="0rem"
              width="100%"
              height="320px"
              width_tablet="390px"
              width_md="520px"
              width_lg="630px"
              bsize="cover"
              position="right"
              url={post.frontmatter.image} />}
          background={Colors.lightYellow}
        />

        {/* Container */}
        <GridContainer containerColumns_tablet={filteredH2.length >= 1 ? "0fr repeat(12, 1fr) 0fr" : "2fr repeat(12, 1fr) 2fr"} columns_tablet="1" gridColumn_tablet="4 / -4" columns="1" margin="0">  
          <Div flexDirection="column" margin="30px 0 0 0" background={Colors.white}>
            <Div 
                className="single-post" 
                flexDirection="Column" 
            >
              {sanitizedData}
            </Div>
          </Div>

        {
          filteredH2.length >= 1 &&
          <Div gridColumn_tablet="4 ​/ span 1" margin="54px 0 0 0" display="none" display_md="flex" style={{position: "relative"}}>
            <Div className="container-sidebar-content" padding="25px 0" flexDirection="column" justifyContent="space-around" gap="16px" flexDirection="column" position="sticky" style={{boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", top: "85px"}} borderRadius="3px" border={`1px solid #e5e5e5`} width="250px" height="fit-content">
            <ScrollSpy offsetTop={60} autoScrollOffsetTop={-50}>
              {
                filteredH2.map((heading, i) => {
                  const {id, children} = heading.props
                  return (
                    <button
                      onClick={() => setSelected(i)}
                      className={selected === i && 'selected'} 
                      ref={React.createRef()}
                      href={`#${id}`}
                      // to={`#${id}` || "#"}
                    >
                      <Paragraph
                        className={`sidebar-content ${selected === i && 'selected-border' || ''}`}
                        letterSpacing="0.05em"
                        key={id}
                        fontSize="14px"
                        textAlign="center"
                        textAlign_tablet="left"
                      >
                          {children[1].props?.children?.toString().toUpperCase() || children[1].toString().toUpperCase()}
                      </Paragraph>
                    </button >
                  )}
                )
              }
              </ScrollSpy>
              <Link style={{color: Colors.white, margin: '0 30px'}} to={lang === "us" ? '/us/apply' : '/es/aplica'}>
                <Button
                  width="100%"
                  fontSize="12px"
                  background={Colors.blue}
                  borderRadius=".25rem"
                  padding="5px"
                  flexDirection
                  justifyContent="center"
                  margin="14px 0 4px 0"
                  color={Colors.white}
                >                    
                  {lang === "us" ? 'APPLY NOW' : 'APLICA AHORA'}
                </Button>
              </Link >
            </Div>
          </Div>
        }
        </GridContainer>

      </Layout>
    </>
  )
}
export const postQuery = graphql`
query Landing_BlogPostBySlug($slug: String!){
    markdownRemark(frontmatter: {slug: {eq: $slug}}){
        html
        htmlAst
        frontmatter{
            slug
            title
            author
            date
            excerpt
            unlisted
            image
            cluster
        }
        fields{
            readingTime {
              text
            }
        }
        
    }
}
`

