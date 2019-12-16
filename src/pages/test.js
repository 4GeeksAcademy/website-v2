import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Image from '../components/Image';
import {Container, Section} from '../components/Sections'
import Jumbotron from '../components/Jumbotron'

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
    <Jumbotron />
    <Container

      height="500px"
      marginLeft="100px"
      borderTopLeft="1.25rem"
    />
    <Section height="300px" />
    <Container
      primary
      height="1225px"
      marginLeft="100px"
      borderTopLeft="1.25rem"
    />

  </Layout>
);

// export const my = graphql`
//     query myQuery{
//       allCredentialsDataYaml {
//         edges {
//           node {
//             credentials
//             }
//           }
//         }
//       }
//     }
// `;
export default Test;
