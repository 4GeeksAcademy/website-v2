import React from 'react';
import BaseRender from './_baseLayout'
import Icon from '../new_components/Icon'
import TestimonialsCarrousel from '../components/Testimonials';

//new components
import { Div, Grid } from '../new_components/Sections'
import {Button, RoundImage, Colors} from '../new_components/Styling'
import {H3, H4, H5, Title, Separator, Paragraph} from '../new_components/Heading'
import {Column, Row, Divider, Wrapper, WrapperImage} from "../new_components/Sections";

function splitTitleString (string) {
  let stringObj = {
    first: "",
    remainingString: ""
  }
  let firstLetter = "";
  let remainingString = ""
  for (let i = 0; i < string.length; i++) {
    if (i != 0) {remainingString += string[i]}
    else {firstLetter = string[i]}
  }
  stringObj["first"] = firstLetter
  stringObj["remainingString"] = remainingString
  return stringObj
}

const GeekPal = (props) => {
  const {data, pageContext, yml} = props;
  return (
    <>
      <Div
        margin="70px 10px"
        margin_md="100px 0"
        margin_tablet="100px"
        border="bottom"
        height="auto"
        flexDirection="column"
        flexDirection_md="row"
      >
        <Div size="12" size_md="6" padding_lg="0 0 0 13.2%" placeItems_md="initial" placeItems="center" padding_md="0 0 0 8%"  justifyContent_md="left" display="flex" flexDirection="column">
          <RoundImage
            url={yml.image_logo}
            bsize="contain"
            position="center center"
            width="220px"
            height="74px"
          />
          <Paragraph fontSize="25px" lineHeight="38px" fontWeight="300" textAlign="inherit" padding="40px 10px" textAlign="center" textAlign_md="left" padding_md="30px 35px 0 0">Texto que explique que GeekPal es una membresía con beneficios de apoyo profesional, que el estudiante obtiene al inscribirse en un programa con La Academia.{' '} 
            <span style={{fontWeight: 700}}>Aún despues de haberte graduado continuarás teniendo el apoyo profesional ilimitado.</span>
            </Paragraph>
        </Div>

        <Div display="flex" flexDirection="column" size="12" size_md="6" justifyContent_md="end" justifyContent="center"
            displayAfter="none" displayAfter_md="block" contentAfter="''" marginLeftAfter="auto" widthAfter="80%" heightAfter="10px" backgroundColorAfter={Colors.yellow}>
               
          <Div width="100%" width_md="100%" height="417px" borderRadius="3px" justifyContent="center" alignItems="center" background={Colors.verylightGray}>
            {''}
            Video here
            {''}
            </Div>
        </Div >
      </Div>
      <Wrapper >
        <Row display="flex" github={`/page/geekpal.${pageContext.lang}.md`}>
          {yml.benefits.map((col, i) => {
            const splittedTitle = splitTitleString(col.heading)
            return (
              <Column size="4" key={i}>
                <Row display="flex" justifyContent="around" height="80px">
                  <Column size="12" selfAlign="center" align="center">

                    <H3
                      fs_xl="36px"
                    ><span className="text-danger split" >{splittedTitle.first}</span>{splittedTitle.remainingString}</H3>
                  </Column>
                </Row>
                <Divider height="50px" />
                {col.items.map((item, index) => {
                  return (
                    <Row display="flex" key={index} marginBottom="15px">
                      <Column size="2" passingRight="0" >
                        <Icon icon="check" width="24px" color={Colors.yellow} fill={Colors.yellow} />

                      </Column>
                      <Column size="10"  >
                        <Row display="flex">
                          <Column size="12">
                            <H5
                              margin="0px"
                              fs_xl="16px"
                              fs_lg="16px"
                              fs_md="14px"
                              fs_sm="16px"
                              fs_xs="20px"
                            >{item.title}
                            </H5>
                          </Column>
                        </Row>
                        <Row display="flex">
                          <Column size="12">
                            <Paragraph
                              fs_xl="14px"
                              fs_lg="14px"
                              fs_md="12px"
                              fs_sm="16px"
                              fs_xs="14px"
                            >{item.sub_title}
                            </Paragraph>
                          </Column>
                        </Row>
                      </Column>
                    </Row>
                  )
                })}
              </Column>
            )
          })}
        </Row>
      </Wrapper>
      <Divider height="50px" />
      <Wrapper >
        <TestimonialsCarrousel lang={data.allTestimonialsYaml.edges} />
      </Wrapper>
      <Divider height="100px" />
    </>
  )
};
export const query = graphql`
  query GeekPalQuery($file_name: String!, $lang: String!) {
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
            image {
              childImageSharp {
                fluid(maxWidth: 1200){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            image_logo
            benefits {
              heading
              items {
                title
                sub_title
              }
            } 
              
        } 
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
      edges {
        node {
          testimonials {
            student_name
            testimonial_date
            hidden
            linkedin_url
            linkedin_text
            student_thumb{
              childImageSharp {
                fluid(maxWidth: 200){
                  ...GatsbyImageSharpFluid_withWebp
                }
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            content
            source_url
            source_url_text
          }
        }
      }
    }
  }
`;
export default BaseRender(GeekPal);