import React, {useState} from 'react';
import Layout from '../global/Layout';
import styled, {css} from 'styled-components';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections";
import {Title, H2, H3, H4, H5, Paragraph} from '../components/Heading';
import {Button, Colors, RoundImage} from '../components/Styling';
import Credentials from '../components/Credentials';
import PricesAndPayment from '../components/PricesAndPayment';
import WhoIsHiring from '../components/WhoIsHiring';
import BaseRender from './_baseRender';


const Privacy = (props) => {
    const {data, pageContext, yml} = props;
    // console.log("privacy", yml)
    return (
        <>
            <Wrapper
                style="default"

                border="bottom"
                height="auto"
                backgroundSize="cover"
            >
                <Divider height="100px" />
                <Title
                    size="5"
                    color={Colors.black}
                    title={yml.banner.tagline}
                    paragraph={yml.banner.sub_heading}
                    main
                    paragraphColor={Colors.black}
                    fontSize="46px"
                    textAlign="center"

                />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper style="default">
                {yml.sections.map((section, i) => {
                    return (
                        <Row key={i} align="center" marginBottom="30px">
                            <Column size="10">
                                <H2
                                    fs_xs="24px"
                                    fs_sm="24px"
                                    fs_md="24px"
                                    fs_lg="24px"
                                    fs_xl="24px"
                                >{section.title}</H2>
                                <Paragraph
                                    fs_xs="12px"
                                    fs_sm="12px"
                                    fs_md="12px"
                                    fs_lg="12px"
                                    fs_xl="12px"
                                >{section.text}</Paragraph>
                            </Column>
                        </Row>
                    )
                })}
            </Wrapper>
            <Divider height="100px" />


        </ >
    )
};
export const query = graphql`
  query PrivacyQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            banner{
                tagline
                image
                sub_heading
            }
            header{
                title
                text
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
export default BaseRender(Privacy);