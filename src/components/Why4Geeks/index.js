import React from 'react';
import {useStaticQuery, graphql} from "gatsby"
import {Title, H4, Paragraph} from '../Heading'
import {Column, Row, Divider} from '../Sections'
import {Address, HandMoney, Laptop, Colors, StyledBackgroundSection} from '../Styling'
import ReactPlayer from 'react-player'
import Fragment from "../Fragment"

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
                  fluid(maxWidth: 300){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                  fixed(width: 300, height: 60) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
              alt
              slug
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
      {info.why.map((i, index) => (
        <Column size="4" size_sm="12" key={index}>
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
          <Row align="around" marginTop="20px">
            <Column size size="2" p_xs="0 5px 0 0" p_sm="0 5px 0 0" customRespSize respSize="2" t_align="right" alignSelf="center">
              {(i.slug === "job-in-tech" || i.slug === "trabaja-en-tecnologia") && <Address width="32" color={Colors.yellow} fill={Colors.yellow} />}
              {(i.slug === "finance-your-career" || i.slug === "financiamos-tu-carrera") && <HandMoney width="32" color={Colors.yellow} fill={Colors.yellow} />}
              {(i.slug === "never-code-alone-again" || i.slug === "nunca-programes-solo-otra-vez") && <Laptop width="32" color={Colors.yellow} fill={Colors.yellow} />}
            </Column>
            <Column size size="8" p_xs="0" p_sm="0" customRespSize respSize="10" alignSelf="center" >
              <H4
                align="left"
                uppercase
                fs_xs="20px"
                fs_sm="24px"
                fs_md="14px"
                fs_lg="18px"
                fs_xl="20px"
              >{i.title}</H4>
            </Column>
          </Row>
          <Paragraph color="gray" align="left" margin="10px 0" fontSize="12px">{i.description}</Paragraph>
        </Column>
      ))}
    </Row>
  </Fragment>
  )
}