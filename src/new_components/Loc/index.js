import React, {useContext, useEffect} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Title, H1, H2, H3, H4, Span, Paragraph, Separator} from '../Heading';
import {Container, Row, Column, Wrapper, Divider, Grid, Div} from '../Sections'
import {Button, Colors, RoundImage, StyledBackgroundSection} from '../Styling'
import Icon from "../Icon"
import {SessionContext} from '../../session.js'
import Link from 'gatsby-link'

const Loc = (props) => {
  const {session} = useContext(SessionContext);
  useEffect(() => {
    const getData = async () => {
      let resp = await fetch(`${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true`);
      let cohorts = await resp.json();

      setData(oldData => ({
        events: {catalog: _types, all: events, filtered: events},
        cohorts: {catalog: oldData.cohorts.catalog, all: cohorts, filtered: cohorts}
      }))
    }
    getData();
  }, []);
  let loc = props.locations.filter(l => l.node.meta_info.unlisted != true).sort((a, b) => a.node.meta_info.position > b.node.meta_info.position ? 1 : -1)
  console.log("LOCSSS: ", loc)
  return (
    <Grid columns="2" columns_md="3" gridGap="0" >
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
              background={Colors.white}
            >
              <H3
                textAlign="left"
              >{item.node.city}
                <Span animated color={Colors.yellow}>_</Span>
              </H3>
              <Div
                display="none"
                display_tablet="block"
              >
                <Paragraph textAlign="left" fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                  Next Cohort in this location
                </Paragraph >
                <Paragraph textAlign="left" fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                  Full Stack Developer
                </Paragraph>
                <Paragraph textAlign="left" fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                  13 Jan 2021
                </Paragraph>
              </Div>
              <Icon style={{position: "absolute", bottom: "35px", right: "27px"}} icon="arrowright" height="32px" width="32px" />
            </Div>

          )
        })
      }
    </Grid>)
};


export default Loc;