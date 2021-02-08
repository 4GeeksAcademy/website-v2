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
                padding="0"
            >
                <Container
                    variant="fixed"
                    padding="70px 20px 42px 20px"
                >
                    <Grid columns_tablet="2" >
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
                        <Div>
                            <Div height="340px" width="100%" background={Colors.blue}></Div>
                            {/* <Icon icon={content.icon} width="38px" height="48px" /> */}
                        </Div>
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
                <Div className="badge-slider" justifyContent="center" padding="44px 0" style={{borderTop: `1px solid ${Colors.lightGray}`}}>
                    {Array.isArray(content.tech_list) && content.tech_list.map((l, i) => {
                        return (
                            <Img
                                style={{height: "80px", minWidth: "80px", margin: "0 25px"}}
                                imgStyle={{objectFit: "contain"}}
                                alt={l.name}
                                fluid={l.image != null && l.image.childImageSharp.fluid}
                            />
                        )
                    })}
                </Div>
                {/* ?icons */}
            </Container>

        </>

    )
};

export default TechsWeTeach;


