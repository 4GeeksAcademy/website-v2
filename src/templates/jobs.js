import React, {useState} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H3, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Card} from '../components/Card'
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {makeStyles} from '@material-ui/core/styles';

const Jobs = ({data, pageContext}) => {
    let yml = null;
    try {
        yml = data.allPageYaml.edges[0].node;
    }
    catch (err) {
        console.error("There was a problem loading the data", data);
        console.error(err);
        return <div className="alert alert-danger">There was a problem loading the data</div>
    }
    return (
        <Layout>
            <Wrapper
                style="default">
                <Title
                    title={yml.tagline}
                    paragraph="Cras mattis consectetur purus sit amet fermentum. Nulla vitae elit libero, a pharetra augue. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
                    primary
                    size="8"
                />
            </Wrapper>
        </Layout>
    )
};
export const query = graphql`
  query JobsQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
        }
      }
    }
  }
`;
export default Jobs;