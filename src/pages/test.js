import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Link from 'gatsby-link'
import {Container, Divider, Col, Cont, Row, Column, Wrapper} from '../components/Sections'
import {H1, H2, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Jumbo} from '../components/Jumbotron'
import Why4Geeks from '../components/Why4Geeks'
import JobsStatistics from '../components/JobsStatistics'
import GeeksVsOthers from '../components/GeeksVsOthers'
import News from '../components/News'
import Locations from '../components/Locations'
import ChooseProgram from '../components/ChooseProgram'
import Scrollspy from 'react-scrollspy'
import ProgramDescription from '../components/ProgramDescription'
import ProgramSelector from '../components/ProgramSelector'
import Events from '../components/Events'
import TypicalDay from '../components/TypicalDay'

const Test = ({data}) => (
  <Layout>

    <Wrapper
      style="default">
      <TypicalDay />
    </Wrapper>

    <ProgramSelector />
    <Wrapper
      style="custom"
      full
    >
      <svg>
        <circle cx={50} cy={50} r={10} fill="red" />
      </svg>
    </Wrapper>
    <Divider height="100px" />
    <Wrapper
      id="section-2"
      style="custom"
      full
      innerRightCol="11"
    >
      <Row>
        <Column
          size="7"
          align="left"
        >
          <Row>
            <Column size="8">
              <Row          >
                <H1>Miami Coding Bootcamp</H1>
              </Row>
              <Row><Separator primary /></Row>
              <Row>
                <H2>LEARN TO CODE<Span color={Colors.blue}>_</Span></H2>
              </Row>
              <Row>
                <H2>AND GET CAREER</H2>
              </Row>
              <Row>
                <H2>SUPPORT FOR LIFE</H2>
              </Row>
              <Paragraph primary align="left" margin="15px 0px">
                Join more than 500 graduates already working as coders and become a part of one of the world's biggest coding community.
              </Paragraph>
            </Column>
          </Row>
        </Column>
        <Column
          size="5"
          image="yes"
          url="../localImage.png"
          height="500px"
          backgroundSize="cover"
          border="bottom"
        >
        </Column>
      </Row>
    </Wrapper>
    <Row align="center">
      <section className="section" id="section-2">section 1</section>
    </Row>
    <Wrapper
      style="default">
      <GeeksVsOthers />
    </Wrapper>

    {/* QUERY TEST */}
    <div className="container-fluid bg-light" id="section-1">
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
    <div className="container-fluid" id="section-2">
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
    <div className="container-fluid" id="section-3">
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
