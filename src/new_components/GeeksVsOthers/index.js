import React, {useState} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {GridContainer, Container, Column, Grid, Div} from '../Sections'
import {H3, H4, H5, Title, Paragraph} from '../Heading';
import {Colors, Button, Tooltip, Span} from '../Styling';
import Card from '../Card';
import Icon from '../Icon';
import Link from 'gatsby-link'
import Fragment from "../Fragment"



const GeeksVsOthers = props => {
  const data = useStaticQuery(graphql`
  query newGeeksVsOthersQuery{
    allGeeksVsOthersYaml{
      edges {
        node {
          fields{
            lang
          }
          info {
            features
            at4_Geeks
            industry_average
            why_important
            icon
          }
          globe_text
          titles{
            featured
            at_geeks
            average
          }

          button{
            button_text
            button_link
          }
        }
      }
    }
  }
    `)


  let geeks = data.allGeeksVsOthersYaml.edges.find(({node}) => node.fields.lang === props.lang);
  if (geeks) geeks = geeks.node;

  return (
    <Fragment github="/components/geeks_vs_others">
      <GridContainer columns_tablet="12" backgroundChild={Colors.lightYellow} gridGap="0" padding_tabletChild="11px 11px 0 44px">
        {/* <Div justifyContent="between" background={Colors.lightYellow}> */}
        <Div gridColumn_tablet="1 / 7" height="74px" alignItems="center"><H3 textAlign="left" fontSize="15px" fontWeight="900" lineHeight="19px">{geeks.titles.featured}</H3></Div>
        <Div gridColumn_tablet="7 / 10" height="74px" alignItems="center" background={Colors.veryLightBlue} padding_tablet="0 5px 0 40px"><H3 textAlign="left" fontSize="15px" fontWeight="900" lineHeight="19px">{geeks.titles.at_geeks}</H3></Div>
        <Div gridColumn_tablet="10 / 13" height="74px" alignItems="center" background={Colors.white} padding_tablet="0 5px 0 40px"><H3 textAlign="left" fontSize="15px" fontWeight="900" lineHeight="19px">{geeks.titles.average}</H3></Div>
        {/* </Div> */}
      </GridContainer>

      <GridContainer columns_tablet="12" gridGap="0" backgroundChild={Colors.lightYellow} padding_tabletChild="0 11px 11px 44px">
        {geeks.info.map((m, i) => {
          return (
            <React.Fragment key={i}>
              {/* // <Div display="grid" key={i} gridColumn_tablet="12" height="74px" alignItems="center" background={Colors.lightYellow}> */}
              {/* <Div display="grid" key={i} gridArea_tablet={`${i + 1}/1/${i + 1}/13`} height="74px" alignItems="center" background={Colors.lightYellow}> */}
              <Div gridColumn_tablet="1 / 7" height="74px" alignItems="center" ><H3 textAlign="left" fontSize="15px" fontWeight="700" lineHeight="22px" textTransform="uppercase">{m.features}</H3></Div>
              <Div gridColumn_tablet="7 / 10" height="74px" alignItems="center" background={Colors.veryLightBlue} padding_tablet="0 5px 0 40px"><H3 textAlign="left" fontSize="15px" fontWeight="700" lineHeight="22px" textTransform="uppercase">{m.at4_Geeks}</H3></Div>
              <Div gridColumn_tablet="10 / 13" height="74px" alignItems="center" background={Colors.white} padding_tablet="0 5px 0 40px"><H3 textAlign="left" fontSize="15px" fontWeight="700" lineHeight="22px" textTransform="uppercase">{m.industry_average}</H3></Div>
              {/* // </Div> */}
            </React.Fragment>
          )
        })}
      </GridContainer>
    </Fragment>
  )
};

export default GeeksVsOthers;

