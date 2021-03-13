import React, {useState, useEffect} from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';
import styled from "styled-components"
import {Row, Column} from '../Sections'
import { getStorage } from "../../actions"
import graphic from "../../assets/images/graphic.png"
import Img from "gatsby-image"

const Helper = styled.span`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`
export default ({location, lang, limit, filter, autoTagLocation }) => {

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
  
  const [news, setNews] = useState(locationNews);
  if (filter) setNews(locationNews.filter(filter))
  else if (location) setNews(locationNews.filter(n => !n.location || !location || n.location.includes(location)));


    useEffect(() => {
        if(!location && !filter && autoTagLocation){
            const store = getStorage("academy_session");
            console.log("getStorage", store)
            if(store && store.location) setNews(locationNews.filter(n => !n.location || n.location.includes(store.location.breathecode_location_slug)));
        }
    },[])

  if (locationNews.length === 0) {
    console.error(`No news to display for location `, location, locationNews)
    return null;
  }

  return (
    <Row github="/components/news" display={`flex`}>
      {news.slice(0, limit).map((l, i) => (
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
