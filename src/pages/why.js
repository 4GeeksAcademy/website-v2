import React from 'react';
import Layout from '../global/Layout';
import {Container, Column, Row, Wrapper, Divider} from '../components/Sections';
import QueryTest from '../components/QueryTest';
import {Title} from '../components/Heading'


const Why = () => (
  <Layout>
    <Wrapper style="default" image="yes" height="400px" border="bottom" url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80">
      <Title size="8" title="ENABLING FUTURE AND CURRENT SOFTWARE BUILDERS TO ADAPT TO THE NEEDS OF THE REAL WORLD" />
    </Wrapper>
    <Wrapper style="default"><QueryTest /></Wrapper>
    <Divider height="100px" />
    <Wrapper style="default">
      <Title size="8" title="OUR FOUR CORNERSTONES" primary />
    </Wrapper>
  </Layout>
);

export default Why;