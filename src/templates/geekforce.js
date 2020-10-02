import React, {useState} from 'react';
import {Column, Row, Container, Divider, Wrapper, WrapperImage, Div} from "../components/Sections";
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
      <WrapperImage

        imageData={yml.image && yml.image.childImageSharp.fluid}
        border="bottom"
        height="auto"
        paddingRight={`0`}
        customBorderRadius="0 0 0 1.25rem"
      >
        <Divider height="50px" />
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
      <Wrapper margin="50px 0px 10px 0" align="center" >
        <RoundImage
          url={yml.image_logo}
          bsize="contain"
          margin="auto"
          position="center center"
          width="300px"
          height="100px"
        />
      </Wrapper>
      <Wrapper >
        <Row>
          {yml.benefits.map((col, i) => {
            const splittedTitle = splitTitleString(col.heading)
            return (
              <Column size="4" key={i} size_sm={`12`}>
                <H3
                  fs_xl="36px"
                ><span className="text-danger split" >{splittedTitle.first}</span>{splittedTitle.remainingString}</H3>
                {col.items.map((item, index) => {
                  return (
<<<<<<< HEAD
                    <Row
                      key={index}
                      marginBottom="15px"
                      style={{position: "relative"}}
                      customRespSize
                      alignResp={`left`}
                      padding={`0 0 0 25px`}
                      align={`center`}
                      margin={`20px 0 00`}>
                      <Check width="24px" color={Colors.yellow} fill={Colors.yellow} style={{position: "absolute", left: "10px"}} />
                      <Div flexDirection={`column`} margin={`0 0 0 20px`}>
                        <H5
                          m="0px"
                          fs_xl="16px"
                          fs_lg="16px"
                          fs_md="14px"
                          fs_sm="16px"
                          fs_xs="20px"
                          align={`center`}
                          textAlign_sm={`left`}
                          textAlign_xs={`left`}
                        >{item.title}
                        </H5>
                        <Paragraph
                          fs_xl="14px"
                          fs_lg="14px"
                          fs_md="12px"
                          fs_sm="16px"
                          fs_xs="14px"
                          align_sm={`left`}
                          align={`center`}
                        >{item.sub_title}
                        </Paragraph>
                      </Div>
=======
                    <Row key={index} marginBottom="15px">
                      <Column size="2" customRespSize respSize="3" passingRight="0" >
                        <Check width="24px" color={Colors.yellow} fill={Colors.yellow} />

                      </Column>
                      <Column size="10" customRespSize respSize="9" >
                        <Row>
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
>>>>>>> 4d80b2510ba7993737a6ca439cb6878e815170e6
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
export default BaseRender(GeekForce);