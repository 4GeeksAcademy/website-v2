import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {GridContainer, GridContainerWithImage, Column, Divider, Grid, Div} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, StyledBackgroundSection} from '../Styling';
import Icon from '../Icon';
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const TechsWeTeach = ({lang}) => {
  const data = useStaticQuery(graphql`
    {
      allTechsWeTeachYaml {
        edges {
          node {
            title
            sub_title
            image{
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 390
                    height: 289
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxHeight: 289, maxWidth: 390){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
            }
            tech_list {
              image{
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    height: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxHeight: 100, maxWidth: 100){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              alt
            }
            fields {
                lang
              }
          }
        }
      }
    }
  `)
  let content = data.allTechsWeTeachYaml.edges.find(({node}) => node.fields.lang === lang);
  if (content) content = content.node;
  else return null;

  return (
    <>

      <GridContainerWithImage imageSide="right" columns_tablet="2" background={Colors.lightYellow}>
        <Div flexDirection="column" padding="36px 0 0 0" padding_md="84px 0 0 0">
          <H3 textAlign="left" margin="0 0 20px 0">{content.title}</H3>
          {content.sub_title.split("\n").map((m, i) =>
            <Paragraph
              key={i}
              textAlign="left"
              margin="10px 0 "
              fontSize="15px"
              lineHeight="26px"
            >
              {m}
            </Paragraph>
          )}
        </Div>
        <Div padding="20px 0 0 0" padding_md="45px 0 0 0">
          <StyledBackgroundSection
            // className={`image`}
            height={`289px`}
            image={content.image.childImageSharp.gatsbyImageData}
            bgSize={`contain`}
            alt="Cnn Logo"
            borderRadius={`0 0 0 3px`}
          />
        </Div>

        {/* ?icons */}
      </GridContainerWithImage >
      <GridContainer fluid background={Colors.lightYellow} margin_tablet="0 0 68px 0" margin="0 0 35px 0">
        <Div className="badge-slider" justifyContent="center" padding="44px 0" style={{borderTop: `1px solid ${Colors.lightGray}`}}>
          {Array.isArray(content.tech_list) && content.tech_list.map((l, i) => {
            return (
              <GatsbyImage
                key={i}
                style={{height: "40px", minWidth: "40px", margin: "0 25px"}}
                imgStyle={{objectFit: "contain"}}
                alt={l.name}
                // fluid={l.image != null && l.image.childImageSharp.fluid}
                image={getImage(l.image != null && l.image.childImageSharp.gatsbyImageData)}
              />
            )
          })}
        </Div>
      </GridContainer>

    </>

  )
};

export default TechsWeTeach;


