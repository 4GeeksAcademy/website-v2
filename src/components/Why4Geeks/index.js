import React from 'react';
import {useStaticQuery, graphql} from "gatsby"
import {Title, H4, Paragraph} from '../Heading'
import {Column, Row, Div} from '../Sections'
import {Address, HandMoney, Laptop, Colors, StyledBackgroundSection} from '../Styling'
import ReactPlayer from 'react-player'
import Fragment from "../Fragment"

const icons = {
  job: Address,
  finance: HandMoney,
  support: Laptop
}

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
                  fixed(width: 300, height: 60) {
                    ...GatsbyImageSharpFixed
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
        const Icon = icons[i.icon];
        return (<Column size="4" size_sm="12" key={index}>
          {i.video != "" ?
            <ReactPlayer
              className='react-player'
              light={i.image}
              style={{height: playerHeight}}
              controls={true}
              url={i.video}
              width='100%'
              height='250px'
            />
            :
            <StyledBackgroundSection
              image={i.image.childImageSharp.fluid}
              alt={i.alt}
              height={`250px`}
              bgSize={`cover`}
              borderRadius={`1.25rem`}
              className={`img-border`}
            ></StyledBackgroundSection>
          }
          <Div position="relative" marginTop="20px" padding="10px 0">
              <Icon width="32" 
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