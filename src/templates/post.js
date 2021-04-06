import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { H1, H2, H3, H4, Title, Separator, Paragraph, Span } from '../new_components/Heading'
import { RoundImage, Colors } from '../new_components/Styling'
import Layout from '../global/Layout'
import Card from '../new_components/Card'
import LazyLoad from 'react-lazyload';
import twitterUser from '../utils/twitter'
import Icon from '../new_components/Icon'
import { TwitterFollowButton } from 'react-twitter-embed';
import "../assets/css/single-post.css"

//FROM new_components
import { GridContainer, Grid, Div, Header, Row, Column} from '../new_components/Sections'

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

    //Returns month's name
    function GetMonth(n){
      let monthsEs = ["", "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]
      let monthsUs = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

      let mes ="";

      if (pageContext=="es")
        mes = monthsEs[n];
      else
        mes = monthsUs[n];

      return mes;
    }
    
    //Date Formatter
    function GetFormattedDate(date) {
      
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
        
          {/* Container */}
          <GridContainer columns_tablet="1" columns="1" margin="90px 0 0 0">

            {/* Top Tags */}
            <Div justifyContent="center">
              {
                post.frontmatter.tags != null && post.frontmatter.tags.map((tag, i) => {
                  return (
                    <Card
                      style={{ fontFamily: "Lato", fontWeight: "700", color: "#3A3A3A", fontSize: "13px", lineHeight: "15.6px", lineSpacing: "0.05em"}}
                      key={i}
                      display="inline-block"
                      padding="5px 8px"
                      borders=".2rem"                      
                    >
                      <Link to={"/us/blog/tag/" + tag}>{tag}</Link>
                    </Card>
                  )
                })
              }
            </Div>

            {/* Title */}
            <Div margin="28px 0 0 0">
              <H1
                type="h1"
                fontSize="40px"
                fontWeight="bold"
                lineHeight="48px"
                textAlign="center"
                style={{color:"#000000"}}

                fs_lg="30px"
                textShadow="none">{post.frontmatter.title}
              </H1>
            </Div>

            {/* Post Date */}
            <Div justifyContent="center">
              <Paragraph style={{letterSpacing:"0.05em"}} color={Colors.gray} align="center" fontSize="14px" lineHeight="14px">
                {
                  postDate
                }
              </Paragraph>
            </Div>

            {/* Realizado Por */}
            <Div color={Colors.gray} justifyContent="center" margin="31px 0 0 0">
              <Paragraph 
                          color={Colors.gray} 
                          justifyContent="center" 
                          fontSize="15px"
                          fontWeight="900"
                          style={{textTransform: "uppercase", letterSpacing: "0.05em"}}
                          >
                Realizado por:
              </Paragraph>
            </Div>

            {/* Author */}
            <Div margin="0 0 0 0" justifyContent="center">
              <Paragraph  color={Colors.gray} 
                          align="center" 
                          fontSize="14px" 
                          lineHeight="14px">
                {
                  post.frontmatter.author
                }
              </Paragraph>
            </Div>

            {/* Avatar + Main Image */}            
            <Div width="100%" justifyContent="center" flex="column">

              {/* Avatar */}
              <Div justifyContent="center" height="100%" align="around"  display="flex" style={{ zIndex: "1" }} >
                <LazyLoad scroll={true} height={100} once={true}>
                  <RoundImage border="0%" 
                              style={{ border: "4px solid white" }}                              
                              width="75px" 
                              height="75px" 
                              bsize="contain" 
                              url={filtered.avatar} />
                </LazyLoad>
              </Div>

              {/* Main image */}
              <Div justifyContent="center" margin="0 0 0 0" position="absolute" transform="translate(0%, 10%)" style={{ zIndex: "0" }}>
                <LazyLoad scroll={true} height={100} once={true} >
                  <RoundImage border="0rem"
                              width="676px"
                              height="366px"
                              bsize="contain"
                              position="center"
                              url={post.frontmatter.image} />
                </LazyLoad>
              </Div>

            </Div>
                       
            <Div height="250px"></Div>

            {/* Post Content */}
            <Div margin="100px 0 0 0" background={Colors.white}>
              <Div  className="single-post" flexDirection="Column" dangerouslySetInnerHTML={{ __html: post.html.replace(/<h1>.*<\/h1>/gm, "") }}>
              </Div>
            </Div>

          </GridContainer>

          <Div
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="43px"
            margin="0 0 89px 0"
            width="100%"
            width_tablet="100%"
            height_tablet="100%"
            borderRadius="3px"
            gridArea_tablet="1/10/2/13"
          >
            <Paragraph 
              color="#3A3A3A"
              margin="0 0 10px 0" 
              display="none" 
              display_md="block"                           
              fontWeight="900"
              fontSize="15px"
              lineHeight="19px"
              style={{ letterSpacing: "0.05em", textTransform:"uppercase" }}
            >
              Compartir Articulo
            </Paragraph>

            <Div>
              <Icon icon="twitter" 
                    style={{ margin: "0 15px 0 0" }} 
                    height="32px" 
                    width="32px"                      
                  />
              <Icon icon="facebook" 
                    style={{ margin: "0 15px 0 0" }} 
                    color={Colors.black} 
                    fill={Colors.black} 
                    height="32px" 
                    width="32px"                    
                  />              
            </Div>
          </Div>
            
        </Layout>
      </>
    )
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