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
export default ({location, lang, limit, filter}) => {
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

  const languageNews = data.allNewsYaml.edges.find(({node}) => node.fields.lang === lang);
  let locationNews = typeof (languageNews) !== "object" ? [] : languageNews.node.news;
  if (filter) locationNews = locationNews.filter(filter)
  else if (location) locationNews = locationNews.filter(n => n.location === "all" || !location || n.location.includes(location));

  if (limit) locationNews = locationNews.slice(0, limit)

  if (locationNews.length === 0) {
    console.error(`No news to display for location `, location, locationNews)
    return null;
  }

  return (
    <Row github="/components/news" display={`flex`}>
      {locationNews.map((l, i) => (
        <Column margin="auto" style={{whiteSpace: "nowrap", height: "60px"}} key={i} size="2" size_md="3">
          <a href={l.url} target="_blank" rel="noopener noreferrer nofollow">
            <Img
              style={{height: "100%"}}
              imgStyle={{objectFit: "contain"}}
              alt={l.name}
              fluid={l.image.childImageSharp.fluid}
            />
          </a>
        </Column>
      ))}
    </Row>
  )
}
