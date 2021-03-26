import React, {useEffect, useState, useContext} from 'react';
import PropTypes from "prop-types";
import {Button, Colors, StyledBackgroundSection} from '../Styling';
import {Break} from '../Responsive'
import {Devices} from '../Responsive'
import {GridContainer, GridContainerWithImage, Grid, Div} from '../Sections'
import {H2, H4, H3, Paragraph} from '../Heading'
import {useStaticQuery, navigate, Link} from "gatsby"
import styled from 'styled-components';
import Icon from "../Icon"
import {SessionContext} from '../../session.js'

const About4Geeks = (props) => {
    const about = props.lang[0].node
    console.log("about", about)
    return (
        <GridContainerWithImage columns_tablet="2">
            <Div
                flexDirection="column"
            >
                <H2
                    textAlign="left"
                    margin="0 0 20px 0"
                >{about.heading}</H2>
                {about.sub_heading.split("\n").map((m, i) =>
                    <H4
                        textAlign="left"
                        fontSize="15px"
                        lineHeight="22px"
                        color={Colors.darkGray}
                    >
                        {m}
                    </H4>
                )}
                {about.list != null && about.list.map((m, i) => {
                    return (
                        <Div
                            key={i}
                            margin={i == 0 && "20px 0 0 0"}
                            padding="10px 0"
                            display="flex"
                            alignItems="center"
                            style={{borderBottom: "1px solid #EBEBEB"}}
                        >
                            <Icon icon="check" width="14px" height="14px" style={{marginRight: "10px"}} color={Colors.yellow} fill={Colors.yellow} />
                            <H4
                                textAlign="left"
                                fontSize="15px"
                                lineHeight="26px"
                                color={Colors.darkGray}
                            >{m.title}</H4>
                        </Div>
                    )
                })}
                <Paragraph
                    dangerouslySetInnerHTML={{__html: about.paragraph}}
                    margin="22px 0 0 0"
                    color={Colors.darkGray}
                    textAlign="left"
                    fontSize="15px"
                    lineHeight="22px"
                ></Paragraph>
                {<Link to={about.button_link}>
                    <Div display="flex" justifyContent_lg="flex-start">
                        <Button
                            font='"Lato", sans-serif'
                            width="fit-content"
                            colorHover={Colors.black}
                            background={Colors.black}
                            margin="20px 0"
                            pointer
                            textColor={Colors.white}
                            fontSize={"13px"}
                            borderRadius="3px" padding="10px"
                        >
                            {about.button_text}
                        </Button>
                    </Div>
                </Link>
                }
            </Div>
            <Div style={{position: "relative"}} height="468px">
                <Div style={{position: "absolute", background: "#00A0DA", width: "101%", height: "216px", top: "-10px", left: "-10px", borderRadius: "3px"}}></Div>
                <Div style={{position: "absolute", background: "#FFB718", width: "50%", height: "216px", bottom: "-10px", right: "-10px", borderRadius: "3px"}}></Div>
                <StyledBackgroundSection
                    className={`image`}
                    height={`468px`}
                    image={about.image.childImageSharp.fluid}
                    bgSize={`cover`}
                    alt="Cnn Logo"
                    borderRadius={`0 0 0 3px`}
                />

            </Div>
        </GridContainerWithImage>
    )
};

export default About4Geeks;