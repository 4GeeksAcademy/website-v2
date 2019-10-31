import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Image from '../components/Image';

const Page = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #555;
  margin-top: 60px;
`;

const Label = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-top: 12px;
  letter-spacing: 10px;
  text-transform: uppercase;
`;

const Test = ({data}) => (
  <Layout>
    <Page>
      <Image />
      <Heading>Test Page</Heading>
      <Label>Starter</Label>
      {data.allCredentialsDataYaml.edges.map((item) => (
        <div key={item.node.id}>{item.node.rating}</div>
      ))}
    </Page>
  </Layout>
);

export const my = graphql`
    query myQuery{
        allCredentialsDataYaml {
            edges {
              node {
                rating
                hired_students
                alumni_number
                campuses
              }
            }
          }
    }
`;
export default Test;
