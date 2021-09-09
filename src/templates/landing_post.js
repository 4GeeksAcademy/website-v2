import React, {useContext} from 'react'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../new_components/Heading'
import {RoundImage, Colors, Button, Link} from '../new_components/Styling'
import Layout from '../global/Layout'
import "../assets/css/single-post.css"

//FROM new_components
import {GridContainer, Grid, Div, Header, Row, Column} from '../new_components/Sections'

import parse from 'html-react-parser';

export default function Template (props) {
  const {data, pageContext} = props;
  const post = data.markdownRemark;
  const lang = pageContext.lang
  const doc = parse(post.html);
  const h2 = doc.filter(el => el.type == "h2");

  //Returns month's name
  function GetMonth (n) {
    let monthsEs = ["", "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]
    let monthsUs = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    let mes = "";

    if (pageContext == "es")
      mes = monthsEs[n];
    else
      mes = monthsUs[n];

    return mes;
  }

  const langSwitcher = {
    es: "blog-en-espanol",
    us: "blog"
}

  //Date Formatter
  function GetFormattedDate (date) {

    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    let mes = d.getMonth() + 1
    let mesName = GetMonth(mes)

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    let res = "";

    if (pageContext == "es")
      //mes dia, año
      res = mesName + " " + day + ", " + year
    else
      //mes dia, año
      res = mesName + " " + day + ", " + year

    return res;

  }

  //Formatted post date
  let postDate = GetFormattedDate(post.frontmatter.date);

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
        <GridContainer containerColumns_tablet={h2.length >= 1 ? "0fr repeat(12, 1fr) 0fr" : "2fr repeat(12, 1fr) 2fr"} columns_tablet="1" gridColumn_tablet="4 / -4" columns="1" margin="0">

  
          <Div flexDirection="column" margin="30px 0 0 0" background={Colors.white}>
            <Div className="single-post" flexDirection="Column" dangerouslySetInnerHTML={{__html: post.html.replace(/<h1>.*<\/h1>/gm, "")}}>
            </Div>
          </Div>

        {
          h2.length >= 1 &&
          <Div gridColumn_tablet="4 ​/ span 1" margin="54px 0 0 0" display="none" display_md="flex" style={{position: "relative"}}>
            <Div flexDirection="column" padding="0 30px" position="sticky" style={{boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", top: "85px"}} borderRadius="3px" border={`1px solid #e5e5e5`} width="250px" height="fit-content">
              <Div margin="25px 0" flexDirection="column" justifyContent="space-around" gap="16px">
                {
                  h2.map((heading) => {
                    const {id, children} = heading.props
                    return (
                      <Paragraph
                        className="sidebar-content"
                        letterSpacing="0.05em"
                        key={id}
                        fontSize="14px"
                        textAlign="center"
                        textAlign_tablet="left"
                      >
                        <Link to={ `#${id}` || "#"}>
                          {children[0].props?.children?.toUpperCase() || children[0].toString().toUpperCase()}
                        </Link >
                      </Paragraph>
                    )}
                  )
                }
                <Link style={{color: Colors.white}} to={lang === "us" ? '/us/apply' : '/es/aplica'}>
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