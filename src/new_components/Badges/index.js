import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';
import {Row, Div} from '../Sections'
import {Paragraph} from '../Heading'
import {Colors} from '../Styling'
import Img from "gatsby-image"
import Fragment from "../Fragment"

export default ({location, lang, loading}) => {
  const data = useStaticQuery(graphql`
    query myNewQueryBadges{
      allBadgesYaml{
        edges {
          node {
            paragraph
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

  let content = data.allBadgesYaml.edges.find(({node}) => node.fields.lang === lang);
  if (content) content = content.node;
  else return null;

  return (
    <Fragment github="/new_components/badges">
      <Div justifyContent="center">
        <Paragraph
          margin="32px 0 32px 0"
          padding="0 auto"
          letteSpacing="0.05em"
          fontSize_tablet="22px"
          fontWeight="300"
          color={Colors.black}
          textAlign="center"
          dangerouslySetInnerHTML={{__html: content.paragraph}}
        ></Paragraph>
      </Div>
      <Div className="badge-slider" justifyContent="between">
        {content.badges.map((l, i) => {
          return (
            <Img
              style={{height: "85px", minWidth: "150px", margin: "0 24px"}}
              imgStyle={{objectFit: "contain"}}
              loading="eager"
              fadeIn={false}
              alt={l.name}
              fluid={l.image.childImageSharp.fluid}
            />
          )
        })}

      </Div>
    </Fragment>

    // <Row github="/components/badges" display={`flex`}>
    //   {content.badges.map((l, i) => (
    //     <Column margin="auto" style={{whiteSpace: "nowrap", height: "100px"}} key={i} size="3" size_md="6">
    //       <a href={l.url != "" && l.url} target={l.url != "" && "_blank"} rel={l.url != "" && "noopener noreferrer nofollow"}>
    //         <Img
    //           style={{height: "100%"}}
    //           imgStyle={{objectFit: "contain"}}
    //           loading="eager"
    //           fadeIn={false}
    //           alt={l.name}
    //           fluid={l.image.childImageSharp.fluid}
    //         />
    //       </a>
    //     </Column>
    //   ))}
    // </Row>
  )
}
