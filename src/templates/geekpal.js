import React, {useState} from 'react';
import {Column, Row, Divider, Wrapper, WrapperImage, Div} from "../components/Sections";
import {H3, H4, H5, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button, Check, RoundImage, Span, StyledBackgroundSection} from '../components/Styling'
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

const GeekPal = (props) => {
  const {data, pageContext, yml} = props;
  return (
    <>
      <WrapperImage
        imageData={yml.image && yml.image.childImageSharp.fluid}
        height="auto"
        filter="brightness(0.4)"
        customBorderRadius="0 0 0 1.25rem"
      >
        <Divider height="100px" />
        <Title
          size="5"
          title={yml.tagline}
          paragraph={yml.sub_heading}
          variant="main"
          color={Colors.white}
          fontSize="46px"
          textAlign="center"
          paragraphColor={Colors.white}
        />
        <Divider height="100px" />
      </WrapperImage>
      <Wrapper margin="50px 0px" align="center">
        <RoundImage
          url={yml.image_logo}
          bsize="contain"
          margin="auto"
          position="center center"
          width="300px"
          height="200px"
        />
      </Wrapper>
      <Wrapper >
        <Row>
          {yml.benefits.map((col, i) => {
            const splittedTitle = splitTitleString(col.heading)
            return (
              <Column size="4" key={i} size_sm={`12`}>
                {/* <Row align="around" height="80px">
                  <Column size="12" selfAlign="center" align="center"> */}

                <H3
                  fs_xl="36px"
                ><span className="text-danger split" >{splittedTitle.first}</span>{splittedTitle.remainingString}
                </H3>
                {/* </Column>
                </Row> */}
                {col.items.map((item, index) => {
                  return (
                    <Row key={index} marginBottom="15px" style={{position: "relative"}} padding={`0 0 0 22px`} align={`center`} margin={`20px 0 00`}>
                      {/* <Column size="2" size_sm={`2`} paddingRight="0" > */}
                      <Check width="24px" color={Colors.yellow} fill={Colors.yellow} style={{position: "absolute", left: "10px"}} />

                      {/* </Column> */}
                      <Div flexDirection={`column`} margin={`0 0 0 10px`}>
                        {/* <Row> */}
                        {/* <Column size="12"> */}

                        <H5
                          m="0px"
                          fs_xl="16px"
                          fs_lg="16px"
                          fs_md="14px"
                          fs_sm="16px"
                          fs_xs="20px"
                        >{item.title}
                        </H5>
                        {/* </Column> */}
                        {/* </Row> */}
                        {/* <Row> */}
                        {/* <Column size="12"> */}
                        <Paragraph
                          fs_xl="14px"
                          fs_lg="14px"
                          fs_md="12px"
                          fs_sm="16px"
                          fs_xs="14px"
                          align={`center`}
                        >{item.sub_title}
                        </Paragraph>
                      </Div>
                      {/* </Row> */}
                      {/* </Column> */}
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
        <Testimonials lang={data.allTestimonialsYaml.edges} />
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
export default BaseRender(GeekPal);