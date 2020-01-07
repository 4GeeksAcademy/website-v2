import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Link from 'gatsby-link'
import {Container, Divider, Col, Cont, Row, Column, Wrapper} from '../components/Sections'
import {H1, H2, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Jumbo} from '../components/Jumbotron'
import QueryTest from '../components/QueryTest'
import Why4Geeks from '../components/Why4Geeks'
import Jobs from '../components/Jobs'
import News from '../components/News'
import Locations from '../components/Locations'
import ChooseProgram from '../components/ChooseProgram'

const Test = ({data}) => (
  <Layout>
    <Wrapper
      style="custom"
      outerLeftCol="1"
      outerRightCol="11"
      full>full
    </Wrapper>
    <Wrapper
      style="custom"
      outerLeftCol="1"
      outerRightCol="11">
      empty
    </Wrapper>
    <Wrapper
      style="default"
      outerLeftCol="1"
      outerRightCol="11"
    >
    </Wrapper>
    <Wrapper
      style="custom"
      border="bottom"
      image="yes"
      url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80">
      <Button color="blue">Ciao</Button>
    </Wrapper>
    <div className="container-fluid">
      <div className="row tt">
        <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
        <div className="col-12 col-lg-11 col-md-11 col-sm-12 col-xl-11">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
            <div className="col-12 col-lg-5 col-md-5 col-sm-12 col-xl-5 ">
              <Divider height="100px" />
              <div className="row justify-content-center">
                <div className="col-md-7">
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
                    <ChooseProgram />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
            <div className="col-12 col-lg-5 col-md-5 col-sm-12 col-xl-5 p-0">
              <img src="https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80" width="100%" height="600px" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* QUERY TEST */}
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
        <div className="col-12 col-lg-11 col-md-11 col-sm-12 col-xl-11">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xl-9 ">
              <Divider height="100px" />
              <QueryTest />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* WHY 4GEEKS */}
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
        <div className="col-12 col-lg-11 col-md-11 col-sm-12 col-xl-11">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xl-9 ">
              <Divider height="100px" />
              <Why4Geeks />
              <Divider height="100px" />
              <Jobs />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* TEST */}
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
        <div className="col-12 col-lg-11 col-md-11 col-sm-12 col-xl-11 bg-info">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xl-9 ">
              <Divider height="100px" />
              <Why4Geeks />
              <Divider height="100px" />
              <Jobs />
            </div>
          </div>
        </div>
      </div>
    </div>






  </Layout >
);

export default Test;
