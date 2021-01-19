import React, {useContext} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Title, H1, H2, H3, H4, Span, Paragraph, Separator} from '../Heading';
import {Container, Row, Column, Wrapper, Divider, Grid, Div} from '../Sections'
import {Button, Colors, RoundImage, StyledBackgroundSection} from '../Styling'
import styled from 'styled-components';
import Icon from "../Icon"
import Card from '../Card';
import Link from 'gatsby-link'

const Loc = (props) => {

  let loc = props.locations.filter(l => l.node.meta_info.unlisted != true).sort((a, b) => a.node.meta_info.position > b.node.meta_info.position ? 1 : -1)
  return (
    <Grid columns="2" gridGap="0" >
      {/* <Row
        github={"/location"}
        display="flex"
      > */}

      {loc != null &&
        loc.map((item, index) => {
          return (
            <Div
              style={{border: `1px solid ${Colors.black}`, position: "relative"}}
              display="flex"
              flexDirection="column"
              justifyContent="between"
              height="207px"
              padding="24px"
              background={index === 3 && Colors.lightYellow}
            >
              <H3
                align="left"
              >{item.node.city}
                <Span animated color={Colors.yellow}>_</Span>
              </H3>
              <Div
                display="none"
                display_tablet="block"
              >
                <Paragraph fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                  Next Cohort in this location
                </Paragraph >
                <Paragraph fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                  Full Stack Developer
                </Paragraph>
                <Paragraph fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                  13 Jan 2021
                </Paragraph>
              </Div>
              <Icon style={{position: "absolute", bottom: "35px", right: "27px"}} icon="arrowright" height="32px" width="32px" />
            </Div>

          )
        })

      }

      {/* </Row> */}
    </Grid>)
};


export default Loc;