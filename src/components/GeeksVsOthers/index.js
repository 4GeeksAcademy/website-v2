import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider} from '../Sections'
import {H3, H4, H5, Title} from '../Heading';
import {Colors, Address} from '../Styling';
import {Card} from '../Card';

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
  return (
    <>
      <Title
        title="WHAT MAKES THIS PROGRAM STAND OUT?"
        primary
        size="8"
      />
      <Divider height="100px" />
      <Row>
        <Column
          size="12"
          border="bottom"
          image="no"
          color={Colors.white}
        >
          <Card shadow borders="1.25rem" height="560px">
            <Row height="80px" borderBottom={"1px solid " + Colors.gray} marginLeft="0" marginRight="0px">
              <Column size="6" customRespSize respSize="6" image="no" color={Colors.black} border="top" ><H5 fontSize="12px">FEATURED</H5></Column>
              <Column size="3" customRespSize respSize="3" image="no" color={Colors.lightGray}></Column>
              <Column size="3" customRespSize respSize="3" image="no" color={Colors.white} border="custom" customBorderRadius="0 1.25rem 0  0"></Column>
            </Row>
            {data.geeks.edges[0].node.miami.map((item, index) => {
              return (
                <>
                  {index == data.geeks.edges[0].node.miami.length - 1
                    ?
                    <Row
                      key={index}
                      height="80px"
                      marginLeft="0"
                      marginRight="0px"
                    >
                      <Column size="6" customRespSize respSize="6" alignSelf="center" image="no" border="bottom">

                        <Row align="around">
                          <Column size size="2" customRespSize respSize="2" alignSelf="center">
                            <Address width="48" color={Colors.yellow} fill={Colors.yellow} />

                          </Column>
                          <Column size size="8" customRespSize respSize="8" alignSelf="center">
                            <H4>{item.features} </H4>
                          </Column>
                        </Row>

                      </Column>
                      <Column size="3" customRespSize respSize="2" alignSelf="center" image="no" ><H4>{item.at4_Geeks}</H4></Column>
                      <Column size="3" customRespSize respSize="2" alignSelf="center"><H4>{item.industry_average}</H4></Column>
                    </Row>
                    :
                    <Row
                      key={index}
                      height="80px"
                      borderBottom={"1px solid " + Colors.gray}
                      marginLeft="0" marginRight="0px"
                    >
                      <Column size="6" customRespSize respSize="6" alignSelf="center" image="no" ><H4>{item.features}</H4></Column>
                      <Column size="3" customRespSize respSize="2" alignSelf="center" image="no" ><H4>{item.at4_Geeks}</H4></Column>
                      <Column size="3" customRespSize respSize="2" alignSelf="center"><H4>{item.industry_average}</H4></Column>
                    </Row>}
                </>
              )
            }
            )}
          </Card>
        </Column>
      </Row>
    </>
  )
};

export default GeeksVsOthers;



{/* <Row height="80px" borderBottom={"1px solid " + Colors.gray} marginRight="0px">
            <Column size="6" customRespSize respSize="6" image="no" color={Colors.black} border="top">
              <H4 fontSize="12px">FEATURED</H4>
            </Column>
            <Column size="3" customRespSize respSize="3" image="no" color={Colors.lightGray}><H4 fontSize="12px">AT 4GEEKS</H4></Column>
            <Column size="3" customRespSize respSize="3"><H4 fontSize="12px">INDUSTRY AVERAGE</H4></Column>
          </Row>
          {data.geeks.edges[0].node.miami.map((item, index) => {
            return (
              <>
                {index == data.geeks.edges[0].node.miami.length - 1
                  ?
                  <Row
                    key={index}
                    height="80px"
                    marginRight="0px"
                  >
                    <Column size="6" customRespSize respSize="6" image="no" color={Colors.black} border="bottom"><H4>{item.features} </H4></Column>
                    <Column size="3" customRespSize respSize="2" image="no" color={Colors.lightGray}>{item.at4_Geeks}</Column>
                    <Column size="3" customRespSize respSize="2">{item.industry_average}</Column>
                  </Row>
                  :
                  <Row
                    key={index}
                    height="80px"
                    borderBottom={"1px solid " + Colors.gray} marginRight="0px"
                  >
                    <Column size="6" customRespSize respSize="6" image="no" color={Colors.black}><H4>{item.features}</H4></Column>
                    <Column size="3" customRespSize respSize="2" image="no" color={Colors.lightGray}>{item.at4_Geeks}</Column>
                    <Column size="3" customRespSize respSize="2">{item.industry_average}</Column>
                  </Row>}
              </>
            )
          }
          )} */}