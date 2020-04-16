import React, {useState} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H3, H4, H5, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button, Teacher, Glasses, Clock, Users, Comments, Question, Tooltip} from '../components/Styling'
import {Card} from '../components/Card'
import {makeStyles} from '@material-ui/core/styles';
import BaseRender from './_baseRender'

const GeeksVsOthers = (props) => {
  const {data, pageContext, yml} = props;
  const [tooltip, setTooltip] = useState(false)
  const [tooltipOpacity, setTooltipOpacity] = useState(0)
  const [tooltipIndex, setTooltipIndex] = useState()
  let info_len = yml.info.length
  console.log("yml", info_len)
  return (
    <>
      <Wrapper style="default">
        <Title
          title={yml.tagline}
          paragraph={yml.sub_heading}
          primary
          size="8"
        />
        <Divider height="50px" />
        <Row>
          <Column
            size="12"
            border="bottom"
            image="no"
            color={Colors.white}
          >
            {/* <Card shadow borders="1.25rem" height={`${info_len * 80}px`}> */}
            <Card shadow borders="1.25rem" height="auto">
              <Row height="80px" marginLeft="0" marginRight="0">
                <Column size="4" customRespSize respSize="4" alignSelf="center" height="100%" image="no" color={Colors.black} border="top" >
                  <Row height="100%" borderBottom={"1px solid " + Colors.darkGray}><Column size size="12" alignSelf="center" ><H5 fontSize="12px" align="center" color={Colors.gray}>{yml.titles.featured}</H5></Column></Row>
                </Column>
                <Column size="2" customRespSize respSize="2" alignSelf="center" height="100%" image="no" color={Colors.lightGray}>
                  <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H5 fontSize="12px" align="center" color={Colors.gray}>{yml.titles.at_geeks}</H5></Column></Row>
                </Column>
                <Column size="2" customRespSize respSize="2" alignSelf="center" height="100%" image="no" color={Colors.lightGray}>
                  <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H5 fontSize="12px" align="center" color={Colors.gray}>{yml.titles.average}</H5></Column></Row>
                </Column>
                <Column size="4" customRespSize respSize="4" alignSelf="center" height="100%" image="no" color={Colors.white} border="custom" customBorderRadius="0 1.25rem 0  0">
                  <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" ><H5 fontSize="12px" align="center" color={Colors.gray}>{yml.titles.why}</H5></Column></Row>
                </Column>
              </Row>
              {yml.info.map((item, index) => {
                return (
                  <>
                    {index == yml.info.length - 1
                      ?
                      <Row
                        key={item.slug}
                        height="120px"
                        marginLeft="0"
                        marginRight="0"
                        customRespSize
                        alignResp="end"
                      >
                        <Column size="4" customRespSize respSize="4" alignSelf="center" height="100%" image="no" color={Colors.black} border="bottom">
                          <Row align="around" height="100%" >
                            {/* <Column size size="2" customRespSize respSize="2" alignSelf="center">
                              {(item.slug === "one-teacher-every-five" || item.slug === "apoyo-profesional") && <Teacher width="32" color={Colors.yellow} fill={Colors.yellow} />}
                              {(item.slug === "senior-teacher-per-student" || item.slug === "mentores-senior-por-estudiante") && <Glasses width="32" color={Colors.yellow} fill={Colors.yellow} />}
                              {(item.slug === "average-time-to-get-help" || item.slug === "tiempo-promedio-para-recibir-ayuda") && <Clock width="32" color={Colors.yellow} fill={Colors.yellow} />}
                              {(item.slug === "one-on-one-mentoring" || item.slug === "mentorias-uno-a-uno") && <Users width="32" color={Colors.yellow} fill={Colors.yellow} />}
                              {(item.slug === "interview-preparation" || item.slug === "preparacion-para-entrevistas") && <Comments width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            </Column> */}
                            <Column size size="8" customRespSize respSize="10" alignSelf="center" paddingRight="0" paddingLeft="0">
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
                        <Column size="2" customRespSize respSize="2" width="100%" height="100%" alignSelf="center" image="no" color={Colors.lightGray}>
                          <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" >
                            <H4 align="center"
                              fs_xs="12px"
                              fs_sm="16px"
                              fs_md="16px"
                              fs_lg="18px"
                              fs_xl="16px"
                              color={Colors.gray}>{item.at4_Geeks}</H4></Column></Row>
                        </Column>
                        <Column size="2" customRespSize respSize="2" width="100%" height="100%" alignSelf="center" image="no" color={Colors.lightGray}>
                          <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" >
                            <H4 align="center"
                              fs_xs="12px"
                              fs_sm="16px"
                              fs_md="16px"
                              fs_lg="18px"
                              fs_xl="16px"
                              color={Colors.gray}>{item.industry_average}</H4></Column></Row>
                        </Column>
                        <Column size="4" customRespSize respSize="4" width="100%" height="100%" alignSelf="center">
                          <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" >
                            <Paragraph
                              align="center"
                              fs_xs="6px"
                              fs_sm="8px"
                              fs_md="8px"
                              fs_lg="8px"
                              fs_xl="10px"
                              color={Colors.gray}>{item.why_important}</Paragraph></Column></Row>
                        </Column>
                      </Row>
                      :
                      <Row
                        key={item.slug}
                        height="120px"
                        marginLeft="0" marginRight="0"
                        customRespSize
                        alignResp="end"
                      >
                        <Column size="4" customRespSize respSize="4" alignSelf="center" height="100%" image="no" color={Colors.black}>
                          <Row align="around" height="100%" borderBottom={"1px solid " + Colors.darkGray}>
                            {/* <Column size size="2" customRespSize respSize="2" alignSelf="center" >
                              {(item.slug === "one-teacher-every-five" || item.slug === "apoyo-profesional") && <Teacher width="32" color={Colors.yellow} fill={Colors.yellow} />}
                              {(item.slug === "senior-teacher-per-student" || item.slug === "mentores-senior-por-estudiante") && <Glasses width="32" color={Colors.yellow} fill={Colors.yellow} />}
                              {(item.slug === "average-time-to-get-help" || item.slug === "tiempo-promedio-para-recibir-ayuda") && <Clock width="32" color={Colors.yellow} fill={Colors.yellow} />}
                              {(item.slug === "one-on-one-mentoring" || item.slug === "mentorias-uno-a-uno") && <Users width="32" color={Colors.yellow} fill={Colors.yellow} />}
                              {(item.slug === "interview-preparation" || item.slug === "preparacion-para-entrevistas") && <Comments width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            </Column> */}
                            <Column size size="8" customRespSize respSize="10" alignSelf="center" paddingRight="0" paddingLeft="0">
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
                        <Column size="2" customRespSize respSize="2" width="100%" height="100%" alignSelf="center" image="no" color={Colors.lightGray}>
                          <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" >
                            <H4
                              align="center"
                              fs_xs="12px"
                              fs_sm="16px"
                              fs_md="16px"
                              fs_lg="18px"
                              fs_xl="16px"
                              color={Colors.gray}>{item.at4_Geeks}</H4></Column></Row>
                        </Column>
                        <Column size="2" customRespSize respSize="2" width="100%" height="100%" alignSelf="center" image="no" color={Colors.lightGray}>
                          <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" >
                            <H4
                              align="center"
                              fs_xs="12px"
                              fs_sm="16px"
                              fs_md="16px"
                              fs_lg="18px"
                              fs_xl="16px"
                              color={Colors.gray}>{item.industry_average}</H4></Column></Row>
                        </Column>
                        <Column size="4" customRespSize respSize="4" width="100%" height="100%" alignSelf="center">
                          <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}><Column size size="12" alignSelf="center" >
                            <Paragraph align="center"
                              fs_xs="6px"
                              fs_sm="8px"
                              fs_md="8px"
                              fs_lg="8px"
                              fs_xl="10px"
                              color={Colors.gray}>{item.why_important}</Paragraph></Column></Row>
                        </Column>
                      </Row>}
                  </>
                )
              }
              )}
            </Card>
          </Column>
        </Row>
        <Divider height="100px" />
      </Wrapper>
      {/* <Row align="center">
        {yml.button.button_link != "" ? <Link to={yml.button.button_link}><Button width="300px" color={Colors.blue} textColor={Colors.white} margin="2rem 0" padding=".85rem">{yml.button.button_text}</Button></Link> : null}
      </Row> */}
    </>
  )
};
export const query = graphql`
  query GeeksQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
                slug
                
            }
            tagline
            sub_heading
            info {
              features
              at4_Geeks
              industry_average
              why_important
              tooltip
              icon
              slug
            }
            
            titles{
                featured
                at_geeks
                average
                why
            }
           
      
            
        }
      }
    }
  }
`;
export default BaseRender(GeeksVsOthers);