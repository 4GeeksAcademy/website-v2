import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';

const Test = ({ data, pageContext}) => (
  <Layout type="page" seo={yml.basic_info} context={pageContext}>
    <p>Do not delete me!!</p>
  </Layout >
);

export default Test;
