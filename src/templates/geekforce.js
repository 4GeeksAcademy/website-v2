import React, {useState} from 'react';
import BaseRender from './_baseLayout'
import TestimonialsCarrousel from '../components/Testimonials';

//new components
import {Colors} from '../new_components/Styling'
import { Div, Grid, HR } from '../new_components/Sections'
import OurPartners from '../new_components/OurPartners'
import {Button, RoundImage} from '../new_components/Styling'
import {H1, H2, Paragraph} from '../new_components/Heading'
import {StyledBackgroundSection} from '../new_components/Styling'
import Icon from '../new_components/Icon'

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
  const content = data.allPageYaml.edges[0].node

  return (
    <Div margin="0" margin_md="0 0 110px 0" flexDirection="column">
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
      <Grid background={Colors.lightYellow} columns="4" overflowX="auto" alignItems="center" padding="0 15%" margin="0 0 58px 0" height="320px" width="auto" margin_md="0 0 78px 0">
          {/* <Badges lang={pageContext.lang} /> */}
        <Div flexDirection="column" alignItems="center">
          <Icon icon="contract" width="85" height="90"/>
          {/*TODO: H1 or H2? */}
          <H1 type="h1" textTransform="uppercase" lineHeight="19px" padding="20px 20%" width="250px">{yml.hiring}</H1>
        </Div>
        <Div flexDirection="column" alignItems="center">
          <Icon icon="job" width="96" height="98"/>
          <H1 type="h1" textTransform="uppercase" lineHeight="19px" padding="20px 20%" width="250px">{yml.support}</H1>
        </Div>
        <Div flexDirection="column" alignItems="center">
          <Icon icon="talk" width="79" height="98"/>
          <H1 type="h1" textTransform="uppercase" lineHeight="19px" padding="20px 20%" width="250px">{yml.preparation}</H1>
        </Div>
        <Div flexDirection="column" alignItems="center">
          <Icon icon="worker-portrait" width="98" height="98"/>
          <H1 type="h1" textTransform="uppercase" lineHeight="19px" padding="20px 20%" width="250px">{yml.resume}</H1>
        </Div>
      </Grid>

      {Array.isArray(content.list) && content.list.map((m, i) => {
        return (
          <>
          {
            m.position === "right" ? (
              <Grid direction="rtl" columns_md="2" gridGap_md="50px">
                <Div style={{position: "relative"}} height="215px" height_sm="400px" height_tablet="468px" padding="0 38px 30px 25px">
                    <Div display="none" display_md="flex" style={{position: "absolute", background: "#F5F5F5", width: "101%", height: "282px", top: "0", left: "0", borderRadius: "3px"}}></Div>
                    <Div display="none" display_md="flex" style={{position: "absolute", background: "#FFB718", width: "256px", height: "256px", bottom: "18px", right: "18px", borderRadius: "3px"}}></Div>
                    <StyledBackgroundSection
                      className={`image`}
                      height={`100%`}
                      image={m.image.childImageSharp.fluid}
                      bgSize={`contain`}
                      alt="Cnn Logo"
                      borderRadius={`0 0 0 3px`}
                    />
                  </Div>
                  <Div justifyContent="center" flexDirection="column" padding="0 5%" padding_sm="0 20%" padding_md="0 0 0 35%" >
                    <Div direction="ltr" flexDirection="column" margin="0 0 30px 0">
                      <H1 key={i} type="h1" padding="20px 0" lineHeight="36px" textAlign="center" textAlign_tablet="left" margin="0" fontWeight="900" fontSize="30px">{m.title}</H1>
                      <H2 type="h2" padding="10px 0px" textAlign="left" margin="0" fontWeight="900" textTransform="uppercase" fontSize="15px">{m.sub_title}</H2>
                        <Paragraph
                          letterSpacing="0.05em"
                          textAlign="left"
                          margin="0 0 20px 0"
                          fontSize="15px"
                          lineHeight="26px"
                          >
                          {m.text}
                        </Paragraph>
                    </Div>
                  </Div>
                </Grid>
              ) : (
                <Grid columns_md="2" gridGap_md="50px">
                  <Div style={{position: "relative"}} height="215px" height_sm="400px" height_tablet="468px" padding="0 38px 30px 25px">
                    <Div display="none" display_md="flex" style={{position: "absolute", background: "#F5F5F5", width: "101%", height: "282px", top: "0", left: "0", borderRadius: "3px"}}></Div>
                    <Div display="none" display_md="flex" style={{position: "absolute", background: "#0097CD", width: "256px", height: "256px", bottom: "18px", right: "18px", borderRadius: "3px"}}></Div>
                    <StyledBackgroundSection
                      className={`image`}
                      height={`100%`}
                      image={m.image.childImageSharp.fluid}
                      bgSize={`contain`}
                      alt="Cnn Logo"
                      borderRadius={`0 0 0 3px`}
                    />
                  </Div>
                  <Div justifyContent="center" flexDirection="column" padding="0 5%" padding_sm="0 20%" padding_md="0 35% 0 0">
                    <Div flexDirection="column" margin="0 0 30px 0">
                      <H1 key={i} type="h1" padding="20px 0" lineHeight="36px" textAlign="center" textAlign_tablet="left"  margin="0" fontWeight="900" fontSize="30px">{m.title}</H1>
                      <H2 type="h2" padding="10px 0px" textAlign="left" margin="0" fontWeight="900" textTransform="uppercase" fontSize="15px">{m.sub_title}</H2>
                        <Paragraph
                          letterSpacing="0.05em"
                          fontSize="15px"
                          textAlign="left"
                          margin="0 0 20px 0"
                          lineHeight="22px"
                          >
                          {m.text}
                        </Paragraph>
                    </Div>
                  </Div>
                </Grid>
              )
            }
            </>
          )
        })}
      <HR background={Colors.verylightGray} margin="70px 0"/>

        <OurPartners
          images={partnersData.partners.images}
          title={partnersData.partners.tagline}
          paragraph={partnersData.partners.sub_heading}
          showFeatured={false}
          props={partnersData.partners}
          />

    </Div>
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
            list {
              title
              sub_title
              text
              image {
                childImageSharp {
                  fluid(maxWidth: 800, quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              position
            }
            image_logo
            hiring
            support
            preparation
            resume
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