import React, {useState} from 'react';
import BaseRender from './_baseLayout'
// import TestimonialsCarrousel from '../components/Testimonials';

//new components
import Icon from '../new_components/Icon'
import {Colors} from '../new_components/Styling'
import ReactPlayer from '../new_components/ReactPlayer'
import OurPartners from '../new_components/OurPartners'
import IconsBanner from '../new_components/IconsBanner'
import {Div, Grid, HR, GridContainerWithImage, GridContainer} from '../new_components/Sections'
import {H1, H2, H3, Paragraph} from '../new_components/Heading'
import {Button, RoundImage} from '../new_components/Styling'
import {StyledBackgroundSection} from '../new_components/Styling'

const GeekForce = (props) => {
  const {data, pageContext, yml} = props;
  const partnersData = data.allPartnerYaml.edges[0].node;
  const content = data.allPageYaml.edges[0].node

  return (
    <>
      <GridContainerWithImage padding="24px 0 " padding_tablet="100px 0" columns_tablet="14" margin="120px 0 24px 0" margin_tablet="0">
        <Div flexDirection="column" justifyContent_tablet="start" gridColumn_tablet="1 / 6">
          <H1 textAlign_tablet="left" margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1>

         <Div alignSelf="center" alignSelf_tablet="initial
         " >
          <RoundImage
            alignItems="inherit"
            alignItems_sm="center"
            url={yml.header.image_logo}
            bsize="contain"
            position="center center"
            width="256px"
            height="74px"
            />
          </Div> 
          <Paragraph fontSize="22px" lineHeight="38px" fontWeight="300" textAlign="inherit" padding="40px 10px" textAlign="center" textAlign_md="left" padding_md="30px 0px 0 0" 
              dangerouslySetInnerHTML={{__html: yml.header.paragraph}}
          />
        </Div>
        <Div height="auto" width="100%" gridColumn_tablet="7 / 15" style={{position: "relative"}}>
          <Div display="none" display_md="flex" style={{position: "absolute", background: "#F5F5F5", width: "101%", height: "424px", top: "-40px", left: "25px", borderRadius: "3px"}}
               displayAfter="none" displayAfter_tablet="flex" positionAfter="absolute" contentAfter="''" marginLeftAfter="auto" widthAfter="80%" rightAfter="0" bottomAfter="-10px" heightAfter="10px" backgroundColorAfter={Colors.yellow}
          />
          {yml.geekForce.map(item => {
            return (
              <>
                {item.videoId === "" ?
                  <StyledBackgroundSection
                    height={`350px`}
                    // width={`85%`}
                    borderRadius={`3px`}
                    image={item.image.childImageSharp.fluid}
                    bgSize={`contain`}
                    alt="geekforce image"
                  />
                  :
                  <ReactPlayer
                    id={item.videoId}
                    thumb={item.image}
                    imageSize="maxresdefault"
                    style={{
                      width: "85%",
                      height: "350px",
                    }}
                  />
                }
              </>
            )
          })}
        </Div>
      </GridContainerWithImage>

      <GridContainer background={Colors.lightYellow} columns="2" rows="2" columns_tablet="4" margin="0 0 58px 0" height="470px" height_tablet="320px" margin_tablet="0 0 78px 0">
        {Array.isArray(content.icons) && content.icons?.map((item, i) => {
          return (
            <IconsBanner icon={item.icon} index={i} title={item.title} />
          )
        })}
      </GridContainer>

      {Array.isArray(content.list) && content.list.map((m, i) => {
        return (
          <>
            <GridContainerWithImage imageSide={i % 2 != 0 ? "left" : "right"} padding="24px 0 " padding_tablet="36px 0 100px 0" columns_tablet="14" margin="120px 0 24px 0" margin_tablet="0">
              <Div flexDirection="column" justifyContent_tablet="start" padding="0px 40px 48px" padding_tablet="0" gridArea_tablet={i % 2 == 0 ? "1/1/1/6" : "1/7/1/13"}>
                <H2 key={i} type="h2" padding="20px 0" lineHeight="36px" textAlign="center" textAlign_tablet="left" margin="0" fontWeight="900" fontSize="30px">{m.title}</H2>
                {
                  m.sub ? (
                    <>
                      {
                        m.sub?.map(sub => {
                          return (
                            <>
                              <H3 type="h3" padding="10px 0px" textAlign="left" margin="0" fontWeight="900" textTransform="uppercase" fontSize="15px">{sub?.title}</H3>
                              <Paragraph letterSpacing="0.05em" textAlign="left" margin="0 0 20px 0" fontSize="15px" lineHeight="26px"
                                dangerouslySetInnerHTML={{__html: sub?.text}}
                              />
                            </>
                          )
                        })
                      }
                    </>
                  ) : (
                    <>
                      <Paragraph letterSpacing="0.05em" fontSize="15px" textAlign="left" margin="0 0 20px 0" lineHeight="22px" 
                        dangerouslySetInnerHTML={{__html: m?.text}}
                      />
                    </>
                  )
                }
              </Div>
              <Div height="auto" width="100%" gridArea_tablet={i % 2 == 0 ? "1/7/1/13" : "1/1/1/6"} style={{position: "relative"}}>
                {
                  i === 0 ? (
                    <>
                      <Div display="none" display_md="flex" style={{position: "absolute", background: "#F5F5F5", width: "101%", height: "282px", top: "-25px", left: "-35px", borderRadius: "3px"}}/>
                      <Div display="none" display_md="flex" style={{position: "absolute", background: "#FFB718", width: "256px", height: "256px", bottom: "-20px", right: "-45px", borderRadius: "3px"}}/>
                    </>
                  ) : (
                    i===1 ? (
                      <>
                        <Div display="none" display_md="flex" style={{position: "absolute", background: "#F5F5F5", width: "101%", height: "282px", top: "-25px", left: "25px", borderRadius: "3px"}}/>
                        <Div display="none" display_md="flex" style={{position: "absolute", background: "#0097CD", width: "256px", height: "256px", bottom: "-20px", right: "0px", borderRadius: "3px"}}/>
                      </>
                      ) : (
                          <>
                            <Div display="none" display_md="flex" style={{position: "absolute", background: "#F5F5F5", width: "101%", height: "282px", top: "-25px", left: "75px", borderRadius: "3px"}}/>
                          </>
                      )
                  )
                }
                <StyledBackgroundSection
                  height={`350px`}
                  // width={`85%`}
                  borderRadius={`3px`}
                  image={m.image.childImageSharp.fluid}
                  bgSize={`contain`}
                  alt="geekforce image"
                />
              </Div>
            </GridContainerWithImage>
          </>
        )
      })}
      <HR background={Colors.verylightGray} margin="0px 0 70px 0" />

      <OurPartners
        images={partnersData.partners.images}
        title={partnersData.partners.tagline}
        paragraph={partnersData.partners.sub_heading}
        showFeatured={false}
        props={partnersData.partners}
        />

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
          seo_title
          header{
            title
            paragraph
            image{
              childImageSharp {
                fluid(maxWidth: 800, quality: 100){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            image_alt
            image_logo
          }
          tagline
          sub_heading
          list {
            title
            text
            sub {
              title
              text
            }
            image {
              childImageSharp {
                fluid(maxWidth: 800, quality: 100){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            position
          }
          icons {
            icon
            title
          }
          geekForce {
            videoId
            image {
              childImageSharp {
                fluid(maxWidth: 800, quality: 100){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
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