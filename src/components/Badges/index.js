import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';
import styled from "styled-components"
import {Row, Column} from '../Sections'
import Img from "gatsby-image"

export default ({ location, lang }) => {
  const data = useStaticQuery(graphql`
    query myQueryBadges{
      allBadgesYaml{
        edges {
          node {
            badges {
              name
              url
              image{
                childImageSharp {
                  fluid(maxHeight: 120){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            fields {
              lang
            }
          }
        }
      }
    }
    `)

  let content = data.allBadgesYaml.edges.find(({ node }) => node.fields.lang === lang);
  if(content) content = content.node;
  else return null;

  return (
      <Row github="/components/badges">
        {content.badges.map((l,i) => (
          <Column margin="auto" style={{ whiteSpace: "nowrap", height: "100px" }} key={i} size="3" size_md="6">
            <a href={l.url || "#"} target="_blank" rel="noopener noreferrer nofollow">
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
