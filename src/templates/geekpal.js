import React, {useState} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H3, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Card} from '../components/Card'
import {makeStyles} from '@material-ui/core/styles';
import BaseRender from './_baseRender'

const GeekPal = (props) => {
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
            image
        }
      }
    }
  }
`;
export default BaseRender(GeekPal);