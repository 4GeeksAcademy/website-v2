import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider, Grid, Div} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors} from '../Styling';
import Img from "gatsby-image"
import Icon from '../Icon';


const TechsWeTeach = ({lang}) => {
    const data = useStaticQuery(graphql`
    {
      allTechsWeTeachYaml {
        edges {
          node {
            title
            sub_title
            icon
            tech_list {
              image{
                childImageSharp {
                  fluid(maxHeight: 60, maxWidth: 100){
                    ...GatsbyImageSharpFluid_withWebp
                  }
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
            <Container
                variant="fluid"
                background={Colors.lightYellow}
                padding="50px 0"
            >
                <Container
                    variant="fixed"
                >
                    <Grid columns_lg="2" gridGap="100px">
                        <Div flexDirection="column" >
                            <H3 textAlign="left" margin="0 0 20px 0">{content.title}</H3>
                            {content.sub_title.split("\n").map((m, i) =>
                                <Paragraph
                                    textAlign="left"
                                    margin="10px 0 "
                                    fontSize="15px"
                                    lineHeight="26px"
                                >
                                    {m}
                                </Paragraph>
                            )}
                        </Div>
                        <Div><Icon icon={content.icon} width="38px" height="48px" /></Div>
                        {/* <Div flexDirection="column" justifyContent="between" >
                            {Array.isArray(content.tech_list) && content.tech_list.map((m, i) => {
                                return (
                                    <Div key={i} borderBottom="1px solid #ebebeb" >
                                        {m}
                                    </Div>
                                )
                            })}
                        </Div> */}

                    </Grid>
                </Container>
                <Div>
                    {Array.isArray(content.tech_list) && content.tech_list.map((l, i) => {
                        return (
                            <Div key={i} width="100px" height="60px" >
                                <Img
                                    style={{height: "100%"}}
                                    imgStyle={{objectFit: "cover"}}
                                    objectFit="cover"
                                    alt={l.name}
                                    fluid={l.image != null && l.image.childImageSharp.fluid}
                                />
                            </Div>
                        )
                    })}
                </Div>
                {/* ?icons */}
            </Container>

        </>

    )
};

export default TechsWeTeach;


