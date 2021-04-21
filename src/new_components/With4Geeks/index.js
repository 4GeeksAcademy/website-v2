import React from 'react';
import {useStaticQuery, graphql, Link} from "gatsby"
import {Title, H2, H4, H3, Paragraph} from '../Heading'
import {Column, Row, Div, Grid, GridContainer} from '../Sections'
import {RoundImage, Colors} from '../../components/Styling'
import ReactPlayer from '../../new_components/ReactPlayer'
import Fragment from "../../components/Fragment"
import Icon from "../../components/Icon"

export default ({lang, playerHeight, title, paragraph, background}) => {
  const data = useStaticQuery(graphql`
    query With4Geeks{
      allWith4GeeksYaml{
        edges {
          node {
            fields {
              lang
            }
            header{
              title
              paragraph
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

  return (
    <Fragment github="/new_components/with_4geeks">
      {title && <GridContainer margin="0 0 40px 0"
      >
        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding_tablet="0 4em"
          padding="0 2em"
        >
          <H2 margin="0 0 15px 0" fontSize="15px" textTransform="uppercase" lineHeight="19px" fontWeight="900">{info.header.title}</H2>
          {paragraph && <Paragraph fontSize="15px" lineHeight="22px" letterSpacing="0.05em" padding="0" padding_tablet="0 12% 4% 12%">{info.header.paragraph}</Paragraph>}
        </Div>
      </GridContainer>}
      <GridContainer columns_tablet="3" margin="0 0 73px 0" margin_tablet="0 0 84px 0">
        {info.with.map((i, index) => {
          return (
            <Div
              display="flex"
              flexDirection_tablet="column"
              justifyContent="between"
              borderBottom_tablet={`1px solid ${Colors.lightGray}`}
              border_tablet={`1px solid ${Colors.lightGray}`}
              // justifyContent="spece-between"
              key={index}
              // margin_md="0 6px"
              style={{borderRadius: `3px`}}
            >
              <Div
                padding="19px 0 0 25px"
                padding_tablet="0"
                width_tablet="100%"
                height_tablet="158px"
                alignSelf="baseline"
              >
                <ReactPlayer
                  className="react-player-with4geeks"
                  thumb={i.image}
                  // style={{height: playerHeight}}
                  id={i.video}
                  width='82px'
                  width_tablet="100%"
                  height_tablet='158px'
                  height={playerHeight}
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
                  textAlign="left"
                  width="100%"
                  margin="0 0 10px 0"
                  uppercase
                  fontSize="15px"
                  fontWeight="400"
                  color={Colors.darkGray}
                >
                  {i.name}
                </H4>
                <H3
                  textAlign="left"
                  width="100%"
                  margin="0"
                  fontSize="22px"
                  fontWeight="700"
                  lineHeight="26px"
                >
                  {`“${i.title}”`}
                </H3>
                <Paragraph
                  color="gray"
                  textAlign="left"
                  margin="10px 0 10px 0"
                  fontWeight="400"
                  lineHeight="18px"
                  fontSize="14px">
                  {i.description}
                </Paragraph>

                {i.footer.is_image ?
                  <Link to={i.footer.image_link}><RoundImage url={i.footer.image} bsize="contain" height="20px" position="left" /></Link>
                  :
                  <Link to={i.footer.text_link}>
                    <H4
                      textAlign="left"
                      width="100%"
                      fontSize="13px"
                      lineHeight="15px"
                      fontWeight="400"
                      color={Colors.blue}
                    >{i.footer.text}
                    </H4>
                  </Link>
                }
              </Div>
            </Div>
          )
        })}

      </GridContainer>
    </Fragment>
  )
}