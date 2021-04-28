import React, {useEffect, useState, useContext} from 'react';
import PropTypes from "prop-types";
import {Button, Colors} from '../Styling';
import {Break} from '../Responsive'
import {Row, GridContainer, Grid, Div} from '../Sections'
import {H4, H3, H2, Paragraph} from '../Heading'
import {navigate, Link, useStaticQuery} from "gatsby"
import styled from 'styled-components';
import Icon from "../Icon"
import {SessionContext} from '../../session.js'

const ChooseYourProgram = ({lang, programs, title, paragraph, chooseProgramRef}) => {
    const data = useStaticQuery(graphql`
    {
      allChooseYourProgramYaml {
        edges {
          node {
            programs {
              title
              sub_title
              description
              link
              icon
            }
            title
            paragraph
            fields {
              lang
            }
          }
        }
      }
    }
  `)
    let info = data.allChooseYourProgramYaml.edges.find(({node}) => node.fields.lang === lang);
    if (info) info = info.node;
    console.log("INFO:", info)
    return (
            <Grid
                ref={chooseProgramRef}
                gridTemplateColumns_tablet="2fr repeat(12, 1fr) 2fr"
                gridAutoRows_tablet="minmax(100px, auto)"
                background={Colors.verylightGray}
                background_tablet="transparent"
                padding="59px 17px 83px 17px"
                padding_tablet=" 0 "
                margin="0 0 50px 0"

            >
                <Div margin_tablet="0 0 45px 0" margin="0 0 35px 0" padding_tablet="75px 0 0 0" gridColumn_tablet="5 / 11" gridRow_tablet="1 / 1" flexDirection="column">
                    <H2 margin="0 0 10px 0" fontWeight="700">{title || info.title}</H2>
                    <Paragraph>{paragraph || info.paragraph}</Paragraph>
                </Div>
                <Grid gridColumn_tablet="2 / 14" gridRow_tablet="2 / 4" zIndex="1" gridTemplateColumns_tablet="repeat(3, 4fr)" >
                    {Array.isArray(programs) && programs.map((program, i) => {
                        return (
                            <Div
                                key={i}
                                display="flex"
                                height="145px"
                                height_tablet="265px"
                                borderRadius="3px"
                                padding="1rem"
                                border="1px solid black"
                                borderLeft="6px solid black"
                                borderTop="1px solid black"
                                borderLeft_tablet="1px solid black"
                                borderTop_tablet="6px solid black"
                                flexDirection_tablet="column"
                                alignItems="center"
                                justifyContent="space-between"
                                alignItems_tablet="flex-end"
                                background="#ffffff"
                                style={{position: "relative"}}
                            >
                                <Div
                                    display="flex"
                                    justifyContent="end"
                                >
                                    <Icon className="choose-your-program-icon" icon="fullstack" height="40px" width="52px" />
                                </Div>
                                <Div
                                    display="flex"
                                    flexDirection="column"
                                    width="100%"
                                    alignContent="flex-start"
                                    margin="10px 0 0 0"
                                    padding="0 0 0 15px"
                                >
                                    {/* {program.sub_title.toLowerCase() != "online" &&  */}
                                    <H4
                                        textTransform="uppercase"
                                        textAlign="left"
                                        fontSize="15px"
                                        lineHeight="19px"
                                        letterSpacing="0.05em"
                                        color={Colors.darkGray}
                                        margin="0 0 5px 0"
                                    >
                                        {program.sub_title}
                                    </H4>

                                    {/* // } */}
                                    {program.title.split("\n").map((m, i) =>

                                        <Link to={program.link}><H3
                                            key={i}
                                            textAlign="left"
                                            fontSize="22px"
                                            lineHeight="26px"

                                        >
                                            {m}
                                        </H3></Link>
                                    )}
                                    {program.description.split("\n").map((m, i) =>
                                        <Paragraph
                                            key={i}
                                            textAlign="left"
                                            fontSize="15px"
                                            lineHeight="19px"
                                            fontWeight="400"
                                            margin={i == 0 && "10px 0 0 0"}
                                        // margin_tablet="0 0 5px 0"
                                        >{m}</Paragraph>
                                    )}
                                </Div>
                                <Link to={program.link}><Icon className="mobile " style={{position: "absolute", bottom: "35px", right: "27px"}} icon="arrowright" height="32px" width="32px" /></Link>
                            </Div>
                        )
                    })}
                </Grid>
                <Div display="none" display_tablet="flex" padding_tablet="75px 0 0 0" background={Colors.verylightGray} zIndex="-1" gridColumn_tablet="1 / 15" gridRow_tablet="1 / 3" gridRow="1 / 4" />
            </Grid>
    )
};

export default ChooseYourProgram;


