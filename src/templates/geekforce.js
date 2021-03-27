import React, {useState} from 'react';
import Icon from '../components/Icon'
import BaseRender from './_baseLayout'
import TestimonialsCarrousel from '../components/Testimonials';

//new components
import {Colors} from '../new_components/Styling'
import { Div, Grid } from '../new_components/Sections'
import OurPartners from '../new_components/OurPartners'
import {Button, RoundImage} from '../new_components/Styling'
import {H3, H4, H5, Title, Separator, Paragraph} from '../new_components/Heading'
import {Column, Row, Container, Divider, Wrapper, WrapperImage} from "../new_components/Sections";

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
  const partnersData = data.allPartnerYaml.edges[0].node;
  console.log(data)
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
            width="256px"
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
      
      <Div margin="120px 0px">
        <OurPartners
          images={partnersData.partners.images}
          title={partnersData.partners.tagline}
          paragraph={partnersData.partners.sub_heading}
          showFeatured={false}
          props={partnersData.partners}
          />
      </Div>
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
    allPartnerYaml(filter: { fields: { lang: { eq: $lang }}}) {
      edges {
        node {
          partners {
            images {
              name
              image {
                childImageSharp {
                  fluid(maxWidth: 150){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              featured
            }
            tagline
            sub_heading
            footer_button
            footer_link
          }
        }
      }
    }
  }
`;
export default BaseRender(GeekForce);