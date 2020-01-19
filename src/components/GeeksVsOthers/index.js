import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider} from '../Sections'
import {H3, H4, H5, Title} from '../Heading';
import {Colors, Address, Teacher, Glasses, Clock, Users, Comments, Button} from '../Styling';
import {Card} from '../Card';

const GeeksVsOthers = props => {
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
                  slug
                }
              }
            }
          }
        }
      `)
  return (
    <>
      {props.hasTitle &&
        <>
          <Title
            title="WHAT MAKES THIS PROGRAM STAND OUT?"
            primary
            size="8"
          />
          <Divider height="100px" />
        </>}
      <Row>
        <Column
          size="12"
          border="bottom"
          image="no"
          color={Colors.white}
        >
          <Card shadow borders="1.25rem" height="480px">
            <Row height="80px" marginLeft="0" marginRight="0">
              <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" color={Colors.black} border="top" >
                <Row height="100%" borderBottom={"1px solid " + Colors.darkGray}><Column size size="12" alignSelf="center" ><H5 fontSize="12px" align="center" color={Colors.gray}>FEATURED</H5></Column></Row>
              </Column>
              <Column size="3" customRespSize respSize="3" alignSelf="center" height="100%" image="no" color={Colors.lightGray}>
                <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H5 fontSize="12px" align="center" color={Colors.gray}>AT 4GEEKS</H5></Column></Row>
              </Column>
              <Column size="3" customRespSize respSize="3" alignSelf="center" height="100%" image="no" color={Colors.white} border="custom" customBorderRadius="0 1.25rem 0  0">
                <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H5 fontSize="12px" align="center" color={Colors.gray}>INDUSTRY AVERAGE</H5></Column></Row>
              </Column>
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
                      marginRight="0"
                      customRespSize
                      alignResp="end"
                    >
                      <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" color={Colors.black} border="bottom">
                        <Row align="around" height="100%" >
                          <Column size size="2" customRespSize respSize="2" alignSelf="center">
                            {(item.slug === "one-teacher-every-five") && <Teacher width="48" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "senior-teacher-per-student") && <Glasses width="48" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "average-time-to-get-help") && <Clock width="48" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "one-on-one-mentoring") && <Users width="48" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "interview-preparation") && <Comments width="48" color={Colors.yellow} fill={Colors.yellow} />}
                          </Column>
                          <Column size size="8" customRespSize respSize="6" alignSelf="center">
                            <H4 fontSizeXs="12px" color={Colors.white}>{item.features} </H4>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="3" customRespSize respSize="3" width="100%" height="100%" alignSelf="center" image="no" color={Colors.lightGray}>
                        <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H4 align="center" fontSizeXs="12px" color={Colors.gray}>{item.at4_Geeks}</H4></Column></Row>
                      </Column>
                      <Column size="3" customRespSize respSize="3" width="100%" height="100%" alignSelf="center">
                        <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H4 align="center" fontSizeXs="12px" color={Colors.gray}>{item.industry_average}</H4></Column></Row>
                      </Column>
                    </Row>
                    :
                    <Row
                      key={index}
                      height="80px"
                      marginLeft="0" marginRight="0"
                      customRespSize
                      alignResp="end"
                    >
                      <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" color={Colors.black}>
                        <Row align="around" height="100%" borderBottom={"1px solid " + Colors.darkGray}>
                          <Column size size="2" customRespSize respSize="2" alignSelf="center" >
                            {(item.slug === "one-teacher-every-five") && <Teacher width="48" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "senior-teacher-per-student") && <Glasses width="48" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "average-time-to-get-help") && <Clock width="48" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "one-on-one-mentoring") && <Users width="48" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "interview-preparation") && <Comments width="48" color={Colors.yellow} fill={Colors.yellow} />}
                          </Column>
                          <Column size size="8" customRespSize respSize="6" alignSelf="center" >
                            <H4 fontSizeXs="12px" color={Colors.white}>{item.features} </H4>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="3" customRespSize respSize="3" width="100%" height="100%" alignSelf="center" image="no" color={Colors.lightGray}>
                        <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H4 align="center" fontSizeXs="12px" color={Colors.gray}>{item.at4_Geeks}</H4></Column></Row>
                      </Column>
                      <Column size="3" customRespSize respSize="3" width="100%" height="100%" alignSelf="center">
                        <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H4 align="center" fontSizeXs="12px" color={Colors.gray}>{item.industry_average}</H4></Column></Row>
                      </Column>
                    </Row>}
                </>
              )
            }
            )}
          </Card>
        </Column>
      </Row>
      <Row align="center">
        <Button color={Colors.blue} textColor={Colors.white} margin="2rem 0" padding=".85rem">COMPARE 4GEEKS WITH OTHER SCHOOLS</Button>
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