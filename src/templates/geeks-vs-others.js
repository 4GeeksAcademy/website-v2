import React, {useState} from 'react';
import {Header, Column, Wrapper, Divider, Div} from '../new_components/Sections'
import GeeksVsOthers from '../new_components/GeeksVsOthers'
import BaseRender from './_baseLayout'
import {graphql} from 'gatsby'

const View = (props) => {
  const {data, pageContext, yml} = props;
  return (
    <>
      <Header
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        padding_tablet="72px 0 40px 0"
        padding="66px 17px 85px 0"
      >
      </Header>
      <GeeksVsOthers lang={pageContext.lang} link={false} />
    </>
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
            seo_title
          header{
              title
              paragraph
              
          }
        }
      }
    }
  }
`;
export default BaseRender(View);