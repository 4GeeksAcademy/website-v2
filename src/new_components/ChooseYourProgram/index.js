import React, {useEffect, useState, useContext} from 'react';
import PropTypes from "prop-types";
import {Button, Colors} from '../Styling';
import {Break} from '../Responsive'
import {Row, Column, Grid, Div} from '../Sections'
import {H4, H3, Paragraph} from '../Heading'
import {navigate} from "gatsby"
import styled from 'styled-components';
import Icon from "../Icon"
import {SessionContext} from '../../session.js'

const ChooseYourProgram = (props) => {
    return (
        <Grid columns_md="3">
            {Array.isArray(props.programs) && props.programs.map((program, i) => {
                console.log("program", program)
                return (
                    <Div
                        key={i}
                        display="flex"
                        height="124px"
                        height_md="245px"
                        borderRadius="3px"
                        padding="1rem"
                        border="1px solid black"
                        borderLeft="6px solid black"
                        borderTop="1px solid black"
                        borderLeft_md="1px solid black"
                        borderTop_md="6px solid black"
                        flexDirection_md="column"
                        alignItems="center"
                        justifyContent="space-between"
                        alignItems_md="flex-end"
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
                                <H3
                                    textAlign="left"
                                    fontSize="22px"
                                    lineHeight="26px"
                                >
                                    {m}
                                </H3>
                            )}
                            {program.description.split("\n").map((m, i) =>
                                <Paragraph
                                    textAlign="left"
                                    fontSize="15px"
                                    lineHeight="19px"
                                    fontWeight="400"
                                    margin="10px 0 0 0"
                                    margin_md="10px 0 0 0"
                                >{m}</Paragraph>
                            )}
                        </Div>
                        <Icon className="mobile " style={{position: "absolute", bottom: "35px", right: "27px"}} icon="arrowright" height="32px" width="32px" />
                    </Div>
                )
            })}
        </Grid>
    )
};

export default ChooseYourProgram;