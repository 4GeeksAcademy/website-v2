import React, {useState} from 'react';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections";
import {H3, H4, H5, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button, Check, RoundImage, Span} from '../components/Styling'
import Testimonials from '../components/Testimonials'
import BaseRender from './_baseRender'

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

const GeekForce = (props) => {
  const {data, pageContext, yml} = props;
  return (
    <>
      <Wrapper
        style="default"
        image="yes"
        url={yml.image}
        border="bottom"
        height="auto"
      >
        <Divider height="50px" />
        <Title
          size="5"
          title={yml.tagline}
          paragraph={yml.sub_heading}
          main
          color={Colors.white}
          fontSize="46px"
          textAlign="center"
          paragraphColor={Colors.white}
        />
        <Divider height="100px" />
      </Wrapper>
      <Divider height="50px" />
      <Wrapper
        style="default"
        border="bottom"
        height="auto"
      >
        <Row align="center">
          <RoundImage
            url={yml.image_logo}
            bsize="contain"
            position="center center"
            width="300px"
            height="200px"
          />
        </Row>
        <Divider height="50px" />
      </Wrapper>
      <Wrapper style="default">
        <Row>
          {yml.benefits.map((col, i) => {
            const splittedTitle = splitTitleString(col.heading)
            return (
              <Column size="4" key={i}>
                <Row align="around" height="80px">
                  <Column size="12" selfAlign="center" align="center">

                    <H3
                      fs_xl="36px"
                    ><span className="text-danger split" >{splittedTitle.first}</span>{splittedTitle.remainingString}</H3>
                  </Column>
                </Row>
                <Divider height="50px" />
                {col.items.map((item, index) => {
                  return (
                    <Row key={index} marginBottom="15px">
                      <Column size="2" customRespSize respSize="3" passingRight="0" >
                        <Check width="24px" color={Colors.yellow} fill={Colors.yellow} />

                      </Column>
                      <Column size="10" customRespSize respSize="9" >
                        <Row>
                          <Column size="12">
                            <H5
                              m="0px"
                              fs_xl="16px"
                              fs_lg="16px"
                              fs_md="14px"
                              fs_sm="16px"
                              fs_xs="20px"
                            >{item.title}
                            </H5>
                          </Column>
                        </Row>
                        <Row>
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
      <Wrapper style="default">
        {/* <Title
          primary
          title={yml.testimonial_header.heading}
          paragraph={yml.testimonial_header.sub_heading}
          customParagraphSize="8"
        // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
        /> */}
        <Divider height="20px" />
        <Testimonials lang={data.allTestimonialsYaml.edges} />
      </Wrapper>
      <Divider height="100px" />
    </>
  )
};
export const query = graphql`
  query GeekForceQuery($file_name: String!, $lang: String!) {
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
            image
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
    allTestimonialsYaml(filter: {lang: {eq: $lang}}) {
      edges {
        node {
          lang
          testimonials {
            student_name
            testimonial_date
            student_thumb
            starts
            content
            source_url
            source_url_text
          }
        }
      }
    }
  }
`;
export default BaseRender(GeekForce);