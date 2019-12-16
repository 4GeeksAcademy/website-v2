import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Image from '../components/Image';
import Link from 'gatsby-link'
import {Container, Section} from '../components/Sections'
import {H1, H2, Title, Separator, Paragraph} from '../components/Heading'
import {Jumbo} from '../components/Jumbotron'

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
    <Jumbo height="400px" marginLeft="100px">
      <div class="container-fluid">
        <div className="row ">
          <div className="col-md-6  px-0 ">
            <Section height="100px" />
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="row">
                  <H1>Miami Coding Bootcamp</H1>
                </div>
                <div className="row">
                  <Separator primary />
                </div>
                <div className="row">
                  <H2 primary>LEARN TO CODE AND GET CAREER SUPPORT FOR LIFE</H2>
                </div>
                <div className="row">
                  <Paragraph primary>Join more than 500 graduates already working as coders and become a part of one of the world's biggest coding community.</Paragraph>
                </div>
                <div className="row mt-3">
                  <Link to="/program">
                    <div className="btn text-white btn-md rounded-pill jumbo-button" role="button">CHOOSE YOUR PROGRAM </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 img-top p-0">
            <img src="https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80" width="100%" height="600px" />
          </div>
        </div>
      </div>
    </Jumbo>
    <Container
      color="grey"
      height="600px"
      marginLeft="100px"
      borderTopLeft="1.25rem"
    />
    <Container

      height="500px"
      marginLeft="100px"
    />
    <Container

      height="1225px"
      marginLeft="100px"
      borderTopLeft="1.25rem"
    />
    <Container />
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
