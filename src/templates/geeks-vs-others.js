import React, {useState} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider, Div} from '../components/Sections'
import {H3, H4, H5, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button, Teacher, Glasses, Clock, Users, Comments, Question, Tooltip} from '../components/Styling'
import {Card} from '../components/Card'
import {makeStyles} from '@material-ui/core/styles';
import BaseRender from './_baseRender'

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

const GeeksVsOthers = (props) => {
  const {data, pageContext, yml} = props;
  const [tooltip, setTooltip] = useState(false)
  const [tooltipOpacity, setTooltipOpacity] = useState(1)
  const [tooltipIndex, setTooltipIndex] = useState()
  const [globeTooltip, setGlobeTooltip] = useState(true)
  const [globeTooltipOpacity, setGlobeTooltipOpacity] = useState(0)
  const [columnDisplay, setColumnDisplay] = useState(false)
  const [columnDisplayIndex, setColumnDisplayIndex] = useState()
  let info_len = yml.info.length
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
                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" color={Colors.black} border="top" >
                  <Row height="100%" borderBottom={"1px solid " + Colors.darkGray}>
                    <Column size size="12" alignSelf="center" >
                      <H5
                        fs_xs="10px"
                        fs_sm="12px"
                        fs_md="12px"
                        fs_lg="12px"
                        fs_xl="14px"
                        m="0"
                        align="center"
                        color={Colors.gray}>{yml.titles.featured}
                      </H5>
                    </Column>
                  </Row>
                </Column>
                <Column size="3" customRespSize respSize="3" alignSelf="center" height="100%" image="no" color={Colors.lightGray}>
                  <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}>
                    <Column size size="12" alignSelf="center" >
                      <H5
                        fs_xs="10px"
                        fs_sm="12px"
                        fs_md="12px"
                        fs_lg="12px"
                        fs_xl="14px"
                        m="0"
                        align="center"
                        color={Colors.gray}>{yml.titles.at_geeks}
                      </H5>
                    </Column>
                  </Row>
                </Column>
                <Column size="3" customRespSize respSize="3" alignSelf="center" height="100%" image="no" color={Colors.lightGray}>
                  <Row height="100%" borderBottom={"1px solid " + Colors.borderGray}>
                    <Column size size="12" alignSelf="center" >
                      <H5
                        fs_xs="10px"
                        fs_sm="12px"
                        fs_md="12px"
                        fs_lg="12px"
                        fs_xl="14px"
                        m="0"
                        align="center"
                        color={Colors.gray}>{yml.titles.average}
                      </H5>
                    </Column>
                  </Row>
                </Column>
              </Row>
              {yml.info.map((item, index) => {
                return (
                  <>
                    {columnDisplay === true && columnDisplayIndex === index ?
                      <Row
                        onMouseOut={() => {setColumnDisplay(!columnDisplay), setColumnDisplayIndex(null)}}
                        key={item.slug}
                        height="120px"
                        marginLeft="0"
                        marginRight="0"
                        customRespSize
                        alignResp="end"
                      >
                        <Column size size="12" alignSelf="center" >
                          <Paragraph align="center"
                            fs_xs="16px"
                            fs_sm="16px"
                            fs_md="16px"
                            fs_lg="18px"
                            fs_xl="22px"
                            color={Colors.gray}
                          >
                            {item.why_important}
                            {/* {columnDisplay === true && columnDisplayIndex === index ? item.why_important : null} */}
                          </Paragraph>
                        </Column>

                      </Row>
                      :
                      <Row
                        key={item.slug}
                        height="120px"
                        marginLeft="0"
                        marginRight="0"
                        customRespSize
                        alignResp="end"
                      >
                        <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" color={Colors.black}>
                          <Row
                            align="center"
                            height="100%"
                            borderBottom={"1px solid " + Colors.darkGray}
                            // onClick={() => {setColumnDisplay(!columnDisplay), setColumnDisplayIndex(index)}}
                            onMouseOver={() => {setColumnDisplay(false), setColumnDisplayIndex(index)}}
                          >
                            <Div flexDirection={`column`} justifyContent={`center`} >
                              <Div alignItems={`baseline`}>
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
                                        {yml.globe_text}
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
                            {/* </Column> */}
                          </Row>
                        </Column>
                        <Column size="3" customRespSize respSize="3" width="100%" height="100%" alignSelf="center" image="no" color={Colors.lightGray}>
                          <Row
                            height="100%"
                            borderBottom={"1px solid " + Colors.borderGray}
                            onClick={() => {setColumnDisplay(!columnDisplay), setColumnDisplayIndex(index)}}
                            onMouseOver={() => {setColumnDisplay(true), setColumnDisplayIndex(index)}}
                            onMouseOut={() => {setColumnDisplay(false), setColumnDisplayIndex(null)}}
                          >
                            <Column size size="12" alignSelf="center" >
                              <H4
                                align="center"
                                fs_xs="12px"
                                fs_sm="16px"
                                fs_md="16px"
                                fs_lg="18px"
                                fs_xl="16px"
                                color={Colors.gray}
                              >
                                {item.at4_Geeks}
                              </H4>
                            </Column>
                          </Row>
                        </Column>
                        <Column size="3" customRespSize respSize="3" width="100%" height="100%" alignSelf="center" image="no" color={Colors.lightGray}>
                          <Row
                            height="100%"
                            borderBottom={"1px solid " + Colors.borderGray}
                            onClick={() => {setColumnDisplay(!columnDisplay), setColumnDisplayIndex(index)}}
                            onMouseOver={() => {setColumnDisplay(true), setColumnDisplayIndex(index)}}
                            onMouseOut={() => {setColumnDisplay(false), setColumnDisplayIndex(null)}}>
                            <Column size size="12" alignSelf="center" >
                              <H4
                                align="center"
                                fs_xs="12px"
                                fs_sm="16px"
                                fs_md="16px"
                                fs_lg="18px"
                                fs_xl="16px"
                                color={Colors.gray}
                              >
                                {item.industry_average}
                              </H4>
                            </Column>
                          </Row>
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
            globe_text
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