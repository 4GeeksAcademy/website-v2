import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Link from 'gatsby-link'
import {Container, Divider, Wrapper, Col, Cont, Row} from '../components/Sections'
import {H1, H2, Title, Separator, Paragraph} from '../components/Heading'
import {Colors} from '../components/Styling'
import {Jumbo} from '../components/Jumbotron'
import QueryTest from '../components/QueryTest'
import {Pencil} from '../components/Styling'

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
    <Container height="400px">
      <Row>
        <div className="col-lg-1"></div>
        <Col height="100%" borderTopLeft="1.25rem">
          <Jumbo height="100%">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-md-7  px-0 ">
                  <Divider height="100px" />
                  <div className="row">
                    <div className="col-md-7 offset-2">
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
        </Col>
      </Row>
    </Container>
    <Cont>
      <Row>
        <div className="col-lg-1"></div>
        <Col color="grey" height="500px" borderTopLeft="1.25rem">
          <Divider height="150px" />
          <QueryTest />
        </Col>
      </Row>
    </Cont>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-1">1</div>
        <div className="col-lg-11">2</div>
      </div>
    </div>
  </Layout >
);

export default Test;
