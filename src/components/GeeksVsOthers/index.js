import React, {useState} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider, Div} from '../Sections'
import {H3, H4, H5, Title, Paragraph} from '../Heading';
import {Colors, Address, Teacher, Glasses, Clock, Users, Comments, Button, Question, Tooltip, Span} from '../Styling';
import {Card} from '../Card';
import Link from 'gatsby-link'
import Fragment from "../Fragment"

const Globe = styled.div`
opacity: 1;
width: 170px;
height: 120px;
background: #ffffff;
font-family: "Lato, sans-serif";
position: absolute;
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
border-radius: 50%;
bottom: 40px;
z-index: 100;
left: 20px;
box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.2);
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
&:before {
  content: "";
  position: absolute;
  right: 67%;
  top: 117px;
  transform: rotate(-45deg);
  width: 0;
  height: 0;
  border-top: 1px solid transparent;
  border-right: 46px solid #ffffff;
  border-bottom: 13px solid transparent;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
`

const GeeksVsOthers = props => {
  const [tooltip, setTooltip] = useState(false);
  const [globe, setGlobe] = useState(true)
  const [tooltipOpacity, setTooltipOpacity] = useState(0)
  const [tooltipIndex, setTooltipIndex] = useState()
  const [globeTooltip, setGlobeTooltip] = useState(true)
  const [globeTooltipOpacity, setGlobeTooltipOpacity] = useState(0)
  const geeks = props.lang[0].node;
  return (
    <Fragment github="/components/geeks_vs_others">
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
                <div key={item.slug}>
                  {index == geeks.info.length - 1
                    ?
                    <Row

                      height="80px"
                      marginLeft="0"
                      marginRight="0"
                      customRespSize
                      alignResp="end"
                    >
                      <Column
                        size="6"
                        customRespSize
                        respSize="6"
                        alignSelf="center"
                        height="100%"
                        image="no"
                        color={Colors.black}
                        border="bottom"
                      >
                        <Row
                          align="center"
                          height="100%"
                        // borderBottom={"1px solid " + Colors.darkGray}
                        // onClick={() => {setColumnDisplay(!columnDisplay), setColumnDisplayIndex(index)}}
                        // onMouseOver={() => {setColumnDisplay(false), setColumnDisplayIndex(index)}}
                        >
                          <Div flexDirection={`column`} justifyContent={`center`} >
                            <Div alignItems={`center`}>
                              <Div margin={`0 10px 0 0`}>
                                {(item.slug === "one-teacher-every-five" || item.slug === "apoyo-profesional") && <Teacher width="32" color={Colors.yellow} fill={Colors.yellow} />}
                                {(item.slug === "senior-teacher-per-student" || item.slug === "mentores-senior-por-estudiante") && <Glasses width="32" color={Colors.yellow} fill={Colors.yellow} />}
                                {(item.slug === "average-time-to-get-help" || item.slug === "tiempo-promedio-para-recibir-ayuda") && <Clock width="32" color={Colors.yellow} fill={Colors.yellow} />}
                                {(item.slug === "one-on-one-mentoring" || item.slug === "mentorias-uno-a-uno") && <Users width="32" color={Colors.yellow} fill={Colors.yellow} />}
                                {(item.slug === "interview-preparation" || item.slug === "preparacion-para-entrevistas") && <Comments width="32" color={Colors.yellow} fill={Colors.yellow} />}
                              </Div>
                              <Div margin={`0 3px`}>
                                <H4
                                  fs_xs="12px"
                                  fs_sm="16px"
                                  fs_md="16px"
                                  fs_lg="18px"
                                  fs_xl="24px"
                                  color={Colors.white}
                                >
                                  {item.features}
                                </H4>
                              </Div>
                              <Div position={`relative`}>
                                {tooltip === true && index === tooltipIndex ?
                                  <Tooltip opacity={tooltipOpacity}>
                                    <Paragraph align="center"
                                      fs_xs="16px"
                                      fs_sm="16px"
                                      fs_md="16px"
                                      fs_lg="16px"
                                      fs_xl="16px"
                                      color={Colors.white}
                                    >
                                      {item.tooltip}
                                    </Paragraph>
                                  </Tooltip>
                                  : null}
                                {globeTooltip === true && index === 0 ?
                                  <Globe opacity={globeTooltipOpacity}>
                                    <Paragraph align="center"
                                      fs_xs="16px"
                                      fs_sm="16px"
                                      fs_md="16px"
                                      fs_lg="16px"
                                      fs_xl="16px"
                                      color={Colors.black}
                                    >
                                      {geeks.globe_text}
                                    </Paragraph>
                                  </Globe> : null}
                                <span
                                  onMouseOver={() => {setTooltip(!tooltip), setTooltipIndex(index), setTooltipOpacity(1), setGlobeTooltip(false)}}
                                  onMouseOut={() => {setTooltip(!tooltip), setTooltipIndex(null), setTooltipOpacity(0), setGlobeTooltip(false)}}
                                  onClick={() => {setTooltip(!tooltip), setTooltipIndex(index), setTooltipOpacity(0), setGlobeTooltip(false)}}

                                >
                                  <Question width="20" color={Colors.lightBlue} fill={Colors.lightBlue} />
                                </span>
                              </Div>
                            </Div>
                          </Div>

                          {/* <Row align="around" height="100%" >
                          <Column size size="2" customRespSize respSize="2" alignSelf="center" p_xs="0" align="right">
                            {(item.slug === "one-teacher-every-five" || item.slug === "apoyo-profesional") && <Teacher width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "senior-teacher-per-student" || item.slug === "mentores-senior-por-estudiante") && <Glasses width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "average-time-to-get-help" || item.slug === "tiempo-promedio-para-recibir-ayuda") && <Clock width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "one-on-one-mentoring" || item.slug === "mentorias-uno-a-uno") && <Users width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "interview-preparation" || item.slug === "preparacion-para-entrevistas") && <Comments width="32" color={Colors.yellow} fill={Colors.yellow} />}

                          </Column>
                          <Column size size="10" customRespSize respSize="8" alignSelf="center" paddingRight="0" paddingLeft="0">
                            {tooltip === true && index === tooltipIndex ? <Tooltip opacity={tooltipOpacity}>{item.tooltip}</Tooltip> : null}
                            <H4
                              fs_xs="12px"
                              fs_sm="16px"
                              fs_md="16px"
                              fs_lg="18px"
                              fs_xl="20px"
                              color={Colors.white}
                            >{item.features} <span onMouseOver={() => {setTooltip(!tooltip), setTooltipIndex(index), setTooltipOpacity(1)}} onMouseOut={() => {setTooltip(!tooltip), setTooltipIndex(null), setTooltipOpacity(0)}} ><Question width="16" color={Colors.lightBlue} fill={Colors.lightBlue} ></Question></span></H4>
                          </Column>
                        </Row> */}
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
                          <Div flexDirection={`column`} justifyContent={`center`} >
                            <Div alignItems={`center`}>
                              <Div margin={`0 10px 0 0`}>
                                {(item.slug === "one-teacher-every-five" || item.slug === "apoyo-profesional") && <Teacher width="32" color={Colors.yellow} fill={Colors.yellow} />}
                                {(item.slug === "senior-teacher-per-student" || item.slug === "mentores-senior-por-estudiante") && <Glasses width="32" color={Colors.yellow} fill={Colors.yellow} />}
                                {(item.slug === "average-time-to-get-help" || item.slug === "tiempo-promedio-para-recibir-ayuda") && <Clock width="32" color={Colors.yellow} fill={Colors.yellow} />}
                                {(item.slug === "one-on-one-mentoring" || item.slug === "mentorias-uno-a-uno") && <Users width="32" color={Colors.yellow} fill={Colors.yellow} />}
                                {(item.slug === "interview-preparation" || item.slug === "preparacion-para-entrevistas") && <Comments width="32" color={Colors.yellow} fill={Colors.yellow} />}
                              </Div>
                              <Div margin={`0 3px`}>
                                <H4
                                  fs_xs="12px"
                                  fs_sm="16px"
                                  fs_md="16px"
                                  fs_lg="18px"
                                  fs_xl="24px"
                                  color={Colors.white}
                                >
                                  {item.features}
                                </H4>
                              </Div>
                              <Div position={`relative`}>
                                {tooltip === true && index === tooltipIndex ?
                                  <Tooltip opacity={tooltipOpacity}>
                                    <Paragraph align="center"
                                      fs_xs="16px"
                                      fs_sm="16px"
                                      fs_md="16px"
                                      fs_lg="16px"
                                      fs_xl="16px"
                                      color={Colors.white}
                                    >
                                      {item.tooltip}
                                    </Paragraph>
                                  </Tooltip>
                                  : null}
                                {globeTooltip === true && index === 0 ?
                                  <Globe opacity={globeTooltipOpacity}>
                                    <Paragraph align="center"
                                      fs_xs="16px"
                                      fs_sm="16px"
                                      fs_md="16px"
                                      fs_lg="16px"
                                      fs_xl="16px"
                                      color={Colors.black}
                                    >
                                      {geeks.globe_text}
                                    </Paragraph>
                                  </Globe> : null}
                                <span
                                  onMouseOver={() => {setTooltip(!tooltip), setTooltipIndex(index), setTooltipOpacity(1), setGlobeTooltip(false)}}
                                  onMouseOut={() => {setTooltip(!tooltip), setTooltipIndex(null), setTooltipOpacity(0), setGlobeTooltip(false)}}
                                  onClick={() => {setTooltip(!tooltip), setTooltipIndex(index), setTooltipOpacity(0), setGlobeTooltip(false)}}

                                >
                                  <Question width="20" color={Colors.lightBlue} fill={Colors.lightBlue} />
                                </span>
                              </Div>
                            </Div>
                          </Div>
                          {/* <Column size size="2" customRespSize respSize="2" alignSelf="center" p_xs="0" align="right">
                            {(item.slug === "one-teacher-every-five" || item.slug === "apoyo-profesional") && <Teacher width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "senior-teacher-per-student" || item.slug === "mentores-senior-por-estudiante") && <Glasses width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "average-time-to-get-help" || item.slug === "tiempo-promedio-para-recibir-ayuda") && <Clock width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "one-on-one-mentoring" || item.slug === "mentorias-uno-a-uno") && <Users width="32" color={Colors.yellow} fill={Colors.yellow} />}
                            {(item.slug === "interview-preparation" || item.slug === "preparacion-para-entrevistas") && <Comments width="32" color={Colors.yellow} fill={Colors.yellow} />}
                          </Column>
                          <Column size size="10" customRespSize respSize="8" alignSelf="center" paddingRight="0" paddingLeft="0">
                            {tooltip === true && index === tooltipIndex ? <Tooltip opacity={tooltipOpacity}>{item.tooltip}</Tooltip> : null}
                            <H4

                              fs_xs="12px"
                              fs_sm="16px"
                              fs_md="16px"
                              fs_lg="18px"
                              fs_xl="20px"
                              color={Colors.white}>{item.features} <span onMouseOver={() => {setTooltip(!tooltip), setTooltipIndex(index), setTooltipOpacity(1)}} onMouseOut={() => {setTooltip(!tooltip), setTooltipIndex(null), setTooltipOpacity(0)}} ><Question width="16" color={Colors.lightBlue} fill={Colors.lightBlue} /></span></H4>

                          </Column> */}
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
                </div>
              )
            }
            )}
          </Card>
        </Column>
      </Row>
      <Row align="center">
        {geeks.button.button_link != "" ? <Link to={geeks.button.button_link}><Button width="300px" color={Colors.blue} textColor={Colors.white} margin="2rem 0" padding=".85rem">{geeks.button.button_text}</Button></Link> : null}
      </Row>
    </Fragment>
  )
};

export default GeeksVsOthers;

