import React from 'react';
import {useStaticQuery, graphql} from "gatsby"
import {Title, H4, Paragraph} from '../Heading'
import {Column, Row, Div} from '../Sections'
import {Colors} from '../Styling'
import ReactPlayer from '../ReactPlayer'
import Fragment from "../Fragment"
import Icon from "../Icon"

export default ({lang, playerHeight}) => {
  const data = useStaticQuery(graphql`
    query why4Geeks{
      allWhy4GeeksYaml{
        edges {
          node {
            fields {
              lang
            }
            why {
              title
              description
              image {
                childImageSharp {
                  fluid(maxWidth: 400){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              alt
              icon
              video
            }
          }
        }
      }
    }
    `)
  let info = data.allWhy4GeeksYaml.edges.find(({node}) => node.fields.lang === lang);
  if (info) info = info.node;

return (<Fragment github="/components/geeks_vs_others">
    <Row height="auto" marginTop="50px">
      {info.why.map((i, index) => {
        return (<Column size="4" size_sm="12" key={index}>
          <ReactPlayer
            thumb={i.image}
            style={{height: playerHeight}}
            id={i.video}
            width='100%'
            height='250px'
          />
          <Div position="relative" marginTop="20px" padding="10px 0">
              <Icon width="32" icon={i.icon}
                style={{ position: "absolute" }} 
                color={Colors.yellow} fill={Colors.yellow} 
              />
              <H4
                align="left"
                align_sm="center"
                width="100%"
                margin="0 0 0 38px"
                uppercase
                fs_xs="20px"
                fs_sm="24px"
                fs_md="14px"
                fs_lg="18px"
                fontSize="20px"
              >{i.title}</H4>
          </Div>
          <Paragraph color="gray" align="left" margin="10px 0" fontSize="16px">{i.description}</Paragraph>
        </Column>
      )})}
    </Row>
  </Fragment>
  )
}