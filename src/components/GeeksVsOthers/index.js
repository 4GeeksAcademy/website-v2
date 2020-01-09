import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column} from '../Sections'
import {H5} from '../Heading';
import {Colors} from '../Styling';

const GeeksVsOthers = () => {
    const data = useStaticQuery(graphql`
      query my4GeeksDataQuery{
        geeks: allGeeksDataYaml {
            edges {
              node {
                miami {
                  features
                  industry_average
                  icon
                  tooltip
                  at4_Geeks
                }
              }
            }
          }
        }
      `)
    console.log(data)
    return (
        <Row>
            <Column
                size="10"
                border="bottom"
                image="no"
                color={Colors.white}
            >
                <Row>
                    <Column size="6" image="no" color={Colors.black} border="top">
                        <H5 fontSize="12px">FEATURED</H5>
                    </Column>
                    <Column size="3" image="no" color={Colors.lightGray}><H5 fontSize="12px">AT 4GEEKS</H5></Column>
                    <Column size="3"><H5 fontSize="12px">INDUSTRY AVERAGE</H5></Column>
                </Row>
                {data.geeks.edges[0].node.miami.map((item, index) => (
                    <Row key={index}>
                        <Column size="6" image="no" color={Colors.black} ><H5>{item.features}</H5></Column>
                        <Column size="3" image="no" color={Colors.lightGray}>{item.at4_Geeks}</Column>
                        <Column size="3">{item.industry_average}</Column>
                    </Row>
                )
                )}
            </Column>
        </Row>
    )
};

export default GeeksVsOthers;