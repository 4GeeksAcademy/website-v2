import React, {useState} from 'react';
// import {Column, Row, Container, Divider, Wrapper} from "../components/Sections";
// import {Title, H2, H3, H4, H5, Paragraph} from '../components/Heading';
import {Button, Colors, RoundImage} from '../components/Styling';
import BaseRender from './_baseLayout';

// new_components
import {Div, GridContainer} from "../new_components/Sections";
import {H1, H2, H4, Paragraph} from '../new_components/Heading'

const Cookies = (props) => {
  const {data, pageContext, yml} = props;
  return (
    <>
      <GridContainer
        github="/components/privacy"
        columns_tablet="12"
        margin_tablet="50px 0 0 0"
        margin="25px 0 0 0"

      >
        <Div flexDirection="column" gridColumn_tablet=" 2 / 12">
          <H1
            type="h1"
            fontSize="13px"
            lineHeight="16px"
            fontWeight="700"
            letterSpacing="0.05em"
            color="#606060"
          >{yml.seo_title}</H1>
          <H2 type="h2" zIndex="5" fontSize="50px" lineHeight="60px" margin="16px 0px 19px 0px">
            {yml.header.tagline}
          </H2>
          <Div flexDirection="column">
            {yml.sections.map((section, i) => {
              return (
                <>
                  <H4 type="h3" fontSize="22px" key={i} fontWeight="bold" borderBottom="1px solid #C4C4C4" margin="0 0 15px 0" padding="74px 0 20px 0">{section.title}</H4>
                  {section.text.split("\n").map((m, i) =>
                    <Paragraph letterSpacing="0.05em" textAlign="left" key={i} align="left" align_sm="left" margin="15px 0" dangerouslySetInnerHTML={{__html: m}}></Paragraph>
                  )}
                </>
              )
            })}
          </Div>
          <Paragraph letterSpacing="0.05em" margin="45px 0 0 0" dangerouslySetInnerHTML={{__html: yml.date_release}}></Paragraph>
        </Div>
      </GridContainer>
    </>
  )
};
export const query = graphql`
    query CookiesQuery($file_name: String!, $lang: String!) {
      allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
        edges{
          node{
              meta_info{
                  title
                  description
                  image
                  keywords
              }
              seo_title
              header{
                  tagline
                  sub_heading
                  image{
                      childImageSharp {
                        gatsbyImageData(
                          layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                          width: 800
                          placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                        )
                        # fluid(maxWidth: 800){
                        #   ...GatsbyImageSharpFluid_withWebp
                        # }
                      }
                    } 
                  alt
              }
             
            sections{
                title
                text
            }
             
              
          }
        }
      }
      
    }
  `;
export default BaseRender(Cookies);