import React from 'react';
import Layout from '../global/Layout';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections"
import {Title} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
import BaseRender from './_baseRender'


const Calendar = (props) => {
  const {data, pageContext, yml} = props;
  return (
    <>
      <Row> {yml.tagline}</Row>
    </>
  )
};
export const query = graphql`
  query CalendarQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            basic_info{
              title
              description
              image
              keywords
          }
        }
      }
    }
  }
`;

export default BaseRender(Calendar);