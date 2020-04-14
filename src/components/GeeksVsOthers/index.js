import React, {useState} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider} from '../Sections'
import {H3, H4, H5, Title} from '../Heading';
import {Colors, Address, Teacher, Glasses, Clock, Users, Comments, Button, Question, Tooltip, Span} from '../Styling';
import {Card} from '../Card';
import Link from 'gatsby-link'



const GeeksVsOthers = props => {
  const [tooltip, setTooltip] = useState(false)
  const [tooltipOpacity, setTooltipOpacity] = useState(0)
  const [tooltipIndex, setTooltipIndex] = useState()
  const geeks = props.lang[0].node;
  return (
    <>

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
                <Row height="100%" borderBottom={"1px solid " + Colors.darkGray}><Column size size="12" alignSelf="center" ><H5 fontSize="12px" align="center" color={Colors.gray}>{geeks.titles.featured}</H5></Column></Row>
              </Column>
              <Column size="3" customRespSize respSize="3" alignSelf="center" height="100%" image="no" color={Colors.lightGray}>
                <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H5 fontSize="12px" align="center" color={Colors.gray}>{geeks.titles.at_geeks}</H5></Column></Row>
              </Column>
              <Column size="3" customRespSize respSize="3" alignSelf="center" height="100%" image="no" color={Colors.white} border="custom" customBorderRadius="0 1.25rem 0  0">
                <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H5 fontSize="12px" align="center" color={Colors.gray}>{geeks.titles.average}</H5></Column></Row>
              </Column>
            </Row>
            {geeks.info.map((item, index) => {
              return (
                <>
                  {index == geeks.info.length - 1
                    ?
                    <Row
                      key={item.slug}
                      height="80px"
                      marginLeft="0"
                      marginRight="0"
                      customRespSize
                      alignResp="end"
                    >
                      <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" color={Colors.black} border="bottom">
                        <Row align="around" height="100%" >
                          <Column size size="2" customRespSize respSize="2" alignSelf="center">
                            {(item.slug === "one-teacher-every-five" || item.slug === "apoyo-profesional") && <Teacher width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "senior-teacher-per-student" || item.slug === "mentores-senior-por-estudiante") && <Glasses width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "average-time-to-get-help" || item.slug === "tiempo-promedio-para-recibir-ayuda") && <Clock width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "one-on-one-mentoring" || item.slug === "mentorias-uno-a-uno") && <Users width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "interview-preparation" || item.slug === "preparacion-para-entrevistas") && <Comments width="32" color={Colors.yellow} fill={Colors.yellow} />}
                          </Column>
                          <Column size size="8" customRespSize respSize="6" alignSelf="center" paddingRight="0" paddingLeft="0">
                            {tooltip === true && index === tooltipIndex ? <Tooltip opacity={tooltipOpacity}>{item.tooltip}</Tooltip> : null}
                            <H4
                              fs_xs="12px"
                              fs_sm="16px"
                              fs_md="16px"
                              fs_lg="18px"
                              fs_xl="24px"
                              color={Colors.white}
                            >{item.features} <span onMouseOver={() => {setTooltip(!tooltip), setTooltipIndex(index), setTooltipOpacity(1)}} onMouseOut={() => {setTooltip(!tooltip), setTooltipIndex(null), setTooltipOpacity(0)}} ><Question width="16" color={Colors.gray} fill={Colors.gray} /></span></H4>
                          </Column>
                        </Row>
                      </Column>
                      <Column size="3" customRespSize respSize="3" width="100%" height="100%" alignSelf="center" image="no" color={Colors.lightGray}>
                        <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" >
                          <H4 align="center"
                            fs_xs="12px"
                            fs_sm="16px"
                            fs_md="16px"
                            fs_lg="18px"
                            fs_xl="24px"
                            color={Colors.gray}>{item.at4_Geeks}</H4></Column></Row>
                      </Column>
                      <Column size="3" customRespSize respSize="3" width="100%" height="100%" alignSelf="center">
                        <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" >
                          <H4
                            align="center"
                            fs_xs="12px"
                            fs_sm="16px"
                            fs_md="16px"
                            fs_lg="18px"
                            fs_xl="24px"
                            color={Colors.gray}>{item.industry_average}</H4></Column></Row>
                      </Column>
                    </Row>
                    :
                    <Row
                      key={item.slug}
                      height="80px"
                      marginLeft="0" marginRight="0"
                      customRespSize
                      alignResp="end"
                    >
                      <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" color={Colors.black}>
                        <Row align="around" height="100%" borderBottom={"1px solid " + Colors.darkGray}>
                          <Column size size="2" customRespSize respSize="2" alignSelf="center" >
                            {(item.slug === "one-teacher-every-five" || item.slug === "apoyo-profesional") && <Teacher width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "senior-teacher-per-student" || item.slug === "mentores-senior-por-estudiante") && <Glasses width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "average-time-to-get-help" || item.slug === "tiempo-promedio-para-recibir-ayuda") && <Clock width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "one-on-one-mentoring" || item.slug === "mentorias-uno-a-uno") && <Users width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "interview-preparation" || item.slug === "preparacion-para-entrevistas") && <Comments width="32" color={Colors.yellow} fill={Colors.yellow} />}
                          </Column>
                          <Column size size="8" customRespSize respSize="6" alignSelf="center" paddingRight="0" paddingLeft="0">
                            {tooltip === true && index === tooltipIndex ? <Tooltip opacity={tooltipOpacity}>{item.tooltip}</Tooltip> : null}
                            <H4
                              fs_xs="12px"
                              fs_sm="16px"
                              fs_md="16px"
                              fs_lg="18px"
                              fs_xl="24px"
                              color={Colors.white}>{item.features} <span onMouseOver={() => {setTooltip(!tooltip), setTooltipIndex(index), setTooltipOpacity(1)}} onMouseOut={() => {setTooltip(!tooltip), setTooltipIndex(null), setTooltipOpacity(0)}} ><Question width="16" color={Colors.gray} fill={Colors.gray} /></span></H4>

                          </Column>
                        </Row>
                      </Column>
                      <Column size="3" customRespSize respSize="3" width="100%" height="100%" alignSelf="center" image="no" color={Colors.lightGray}>
                        <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" >
                          <H4
                            align="center"
                            fs_xs="12px"
                            fs_sm="16px"
                            fs_md="16px"
                            fs_lg="18px"
                            fs_xl="24px"
                            color={Colors.gray}>{item.at4_Geeks}</H4></Column></Row>
                      </Column>
                      <Column size="3" customRespSize respSize="3" width="100%" height="100%" alignSelf="center">
                        <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" >
                          <H4 align="center"
                            fs_xs="12px"
                            fs_sm="16px"
                            fs_md="16px"
                            fs_lg="18px"
                            fs_xl="24px"
                            color={Colors.gray}>{item.industry_average}</H4></Column></Row>
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
        {geeks.button.button_link != "" ? <Link to={geeks.button.button_link}><Button width="300px" color={Colors.blue} textColor={Colors.white} margin="2rem 0" padding=".85rem">{geeks.button.button_text}</Button></Link> : null}
      </Row>
    </>
  )
};

export default GeeksVsOthers;

