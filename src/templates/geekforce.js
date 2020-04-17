import React, {useState} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H3, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Card} from '../components/Card'
import {makeStyles} from '@material-ui/core/styles';
import BaseRender from './_baseRender'

const GeekForce = (props) => {
    const {data, pageContext, yml} = props;

    return (
        <>
            <H3>GeekForce</H3>
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
            
        }
      }
    }
  }
`;
export default BaseRender(GeekForce);