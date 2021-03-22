import React, {useState} from 'react';
import {Row, Column, Wrapper, Divider, Div} from '../components/Sections'
import {Title} from '../components/Heading'
import {Colors} from '../components/Styling'
import GeeksVsOthers from '../new_components/GeeksVsOthers'
import BaseRender from './_baseLayout'
import {graphql} from 'gatsby'

const View = (props) => {
  const {data, pageContext, yml} = props;
  return (
    // <Wrapper margin="50px">
    //   <Title
    //     title={yml.tagline}
    //     paragraph={yml.sub_heading}
    //     paragraphColor={Colors.darkGray}
    //     variant="primary"
    //   />
    <GeeksVsOthers lang={pageContext.lang} />
    // </Wrapper>
  )
};
export const query = graphql`
  query GeeksQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            tagline
            sub_heading
        }
      }
    }
  }
`;
export default BaseRender(View);