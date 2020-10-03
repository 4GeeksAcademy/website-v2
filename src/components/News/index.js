import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';
import styled from "styled-components"
import {Row, Column} from '../Sections'
import graphic from "../../assets/images/graphic.png"
import Img from "gatsby-image"

const Helper = styled.span`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`
export default ({ location, lang }) => {
  const data = useStaticQuery(graphql`
    query myQueryNews{
      allNewsYaml{
        edges {
          node {
            news {
              name
              url
              image{
                childImageSharp {
                  fluid(maxHeight: 60){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              location
            }
            fields {
              lang
            }
          }
        }
      }
    }
    `)

  const languageNews = data.allNewsYaml.edges.find(({ node }) => node.fields.lang === lang);
  const locationNews = typeof(languageNews) !== "object" ? [] : languageNews.node.news.filter(n => n.location === "all" || n.location.includes(location));

  if(locationNews.length === 0){
    console.error( `No news to display for location ${location}`, languageNews)
    return null;
  } 
  return (
      <Row github="/components/news">
        {locationNews.map((l,i) => (
          <Column margin="auto" style={{ whiteSpace: "nowrap", height: "60px" }} key={i} size="2" size_md="3" size_sm="4">
            <a href={l.url} target="_blank" rel="noopener noreferrer nofollow">
              <Img 
                style={{ height: "100%" }} 
                imgStyle={{ objectFit: "contain" }} 
                alt={l.name} 
                fluid={l.image.childImageSharp.fluid} 
                />
              </a>
          </Column>
        ))}
      </Row>
  )
}
