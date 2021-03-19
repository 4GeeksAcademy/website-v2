import React, {useState} from 'react';
// import {Column, Row, Container, Divider, Wrapper} from "../components/Sections";
// import {Title, H2, H3, H4, H5, Paragraph} from '../components/Heading';
import {Button, Colors, RoundImage} from '../components/Styling';
import BaseRender from './_baseLayout';

// new_components
import {Div, Grid} from "../new_components/Sections";
import {H1, H2, H4, Paragraph} from '../new_components/Heading'

const Cookies = (props) => {
    const {data, pageContext, yml} = props;
    return (
    <>
      <Grid
        // github="/components/privacy"
        margin="64px 0 0 0"
        padding="0 4%"
        gridGap="0px"
        padding_tablet="0 20%"
        padding_lg="0 26%"
      >
        <H1
          fontSize="13px"
          lineHeight="16px"
          fontWeight="700"
          letterSpacing="0.05em"
          color="#606060"
          >4GEEKS ACADEMY</H1>
          <H2 zIndex="5" fontSize="50px" lineHeight="60px" margin="16px 0px 19px 0px">
            {yml.header.tagline}
          </H2>
          <Div flexDirection="column">
            {yml.sections.map((section, i) => {
              return (
                <>
                  <H4 fontSize="22px" key={i} fontWeight="bold" borderBottom="1px solid #C4C4C4" margin="0 0 15px 0" padding="74px 0 20px 0">{section.title}</H4>
                  {section.text.split("\n").map((m, i) =>
                    <Paragraph letterSpacing="0.05em" textAlign="left" key={i} align="left" align_sm="left" margin="15px 0" dangerouslySetInnerHTML={{__html: m}}></Paragraph>
                  )}
                </>
                    )
            })}
          </Div>
          <Paragraph letterSpacing="0.05em" margin="45px 0 0 0" dangerouslySetInnerHTML={{__html: yml.date_release}}></Paragraph>
      </Grid>
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
              header{
                  tagline
                  sub_heading
                  image{
                      childImageSharp {
                        fluid(maxWidth: 800){
                          ...GatsbyImageSharpFluid_withWebp
                        }
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