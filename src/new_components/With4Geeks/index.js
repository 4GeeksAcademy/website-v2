import React from 'react';
import {useStaticQuery, graphql} from "gatsby"
import {Title, H4, H3, Paragraph} from '../Heading'
import {Column, Row, Div, Grid} from '../Sections'
import {RoundImage, Colors} from '../../components/Styling'
import ReactPlayer from '../../components/ReactPlayer'
import Fragment from "../../components/Fragment"
import Icon from "../../components/Icon"

export default ({lang, playerHeight}) => {
  const data = useStaticQuery(graphql`
    query With4Geeks{
      allWith4GeeksYaml{
        edges {
          node {
            fields {
              lang
            }
            with {
              name
              title
              description
              image {
                childImageSharp {
                  fluid(maxWidth: 800, quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              alt
              icon
              video
              footer{
                is_image
                image
                image_link
                text
                text_link
              }
            }
          }
        }
      }
    }
    `)
  let info = data.allWith4GeeksYaml.edges.find(({node}) => node.fields.lang === lang);
  if (info) info = info.node;

  return (<Fragment github="/new_components/with_4geeks">

    <Grid columns_md="3">
      {info.with.map((i, index) => {
        return (
          <Div
            display="flex"
            flexDirection="column"
            justifyContent="spece-between"
            key={index}
            style={{border: `1px solid ${Colors.lightGray}`, borderRadius: `3px`}}
          >
            <Div>
              <ReactPlayer
                thumb={i.image}
                style={{height: playerHeight}}
                id={i.video}
                width='100%'
                height='158px'
              />
            </Div>
            <Div
              marginTop="20px"
              padding="19px 25px"
              display={`flex`}
              flexDirection="column">
              {/* <Icon width="32" icon={i.icon}
              style={{position: "absolute"}}
              color={Colors.yellow} fill={Colors.yellow}
            /> */}
              <H4
                align="left"
                align_sm="center"
                width="100%"
                margin="0"
                uppercase
                fontSize="15px"
                fontWeight="400"
                color={Colors.darkGray}
              >
                {i.name}
              </H4>
              <H3
                align="left"
                align_sm="center"
                width="100%"
                margin="0"
                fontSize="22px"
                fontWeight="700"
              >
                {`“${i.title}”`}
              </H3>
              <Paragraph
                color="gray"
                align="left"
                margin="10px 0 10px 0"
                fontWeight="400"
                lineHeight="20px"
                fontSize="16px">
                {i.description}
              </Paragraph>

              {i.footer.is_image ?
                <RoundImage url={i.footer.image} bsize="contain" height="20px" position="left" />
                :
                <H4
                  align="left"
                  align_sm="center"
                  width="100%"
                  margin="0 0 0 10px"
                  uppercase
                  fontSize="15px"
                  fontWeight="400"
                  color={Colors.darkGray}
                >{i.name}
                </H4>
              }
            </Div>
          </Div>
        )
      })}

    </Grid>
  </Fragment>
  )
}