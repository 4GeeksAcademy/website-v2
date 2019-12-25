import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Link from 'gatsby-link'
import {Container, Divider, Col, Cont, Row, Column} from '../components/Sections'
import {H1, H2, Title, Separator, Paragraph} from '../components/Heading'
import {Colors} from '../components/Styling'
import {Jumbo} from '../components/Jumbotron'
import QueryTest from '../components/QueryTest'
import Why4Geeks from '../components/Why4Geeks'
import Jobs from '../components/Jobs'
import News from '../components/News'
import Locations from '../components/Locations'

const Test = ({data}) => (
  <Layout>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-1 col-md-1 col-sm-12 ">1</div>
        <div className="col-12 col-lg-11 col-md-11 col-sm-12 ">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 bg-light">2</div>
            <div className="col-12 col-lg-12 col-md-12 col-sm-12">
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <Divider height="1000px" />

    {/* <Container height="600px">
      <div className="row">
        <Col>1</Col>
        <div className="col-12 col-lg-11 col-md-11 col-sm-12 bg-primary">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 bg-primary">2</div>
            <div className="col-12 col-lg-9 col-md-9 col-sm-12 bg-success">3</div>
          </div>
        </div>
      </div>
    </Container> */}

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
        <Col color="grey" height="800px" borderTopLeft="1.25rem">
          <Divider height="150px" />
          <QueryTest />
          <Divider height="150px" />
          <Why4Geeks />
          <Divider height="50px" />
          <Jobs />
          <News />
          <Divider height="50px" />
          <Locations />
          <Container height="400px">
            <Row>
              <div className="col-lg-1 col-md-1 col-sm-12">s</div>
              <div className="col-lg-11 col-md-11 col-sm-12 bg-dark">s</div>
            </Row>
          </Container>
        </Col>
      </Row>
    </Cont>
  </Layout >
);

export default Test;
