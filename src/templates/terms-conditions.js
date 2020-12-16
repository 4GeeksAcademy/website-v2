import React, {useState} from 'react';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections";
import {Title, H2, H3, H4, H5, Paragraph} from '../components/Heading';
import {Button, Colors, RoundImage} from '../components/Styling';
import BaseRender from './_baseLayout';

const Terms = (props) => {
    const {data, pageContext, yml} = props;
    return (<Wrapper
        // github="/components/privacy"
        border="bottom"
        height="auto"
        margin="100px 0"
        backgroundSize="cover"
        paddingRight={`0`}
    >
        <Title
            size="5"
            color={Colors.black}
            title={yml.header.tagline}
            paragraph={yml.header.sub_heading}
            variant="main"
            paragraphColor={Colors.black}
            fontSize="46px"
            textAlign="center"
        />
        <Divider height="40px" />
        {yml.sections.map((section, i) => {
            return (
                <>
                    <H4 margin="10px 0">{section.title}</H4>
                    {section.text.split("\n").map((m, i) =>
                        <Paragraph key={i} align="left" align_sm="left" margin="15px 0" dangerouslySetInnerHTML={{__html: m}}></Paragraph>
                    )}
                </>)
        })}
        <Paragraph dangerouslySetInnerHTML={{__html: yml.date_release}} margin="20px 0"></Paragraph>
    </Wrapper>
    )
};
export const query = graphql`
    query TermsQuery($file_name: String!, $lang: String!) {
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
export default BaseRender(Terms);