import React, {useState, useEffect, useContext} from 'react';
import Layout from '../global/Layout';
import styled from 'styled-components';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, Divider} from '../components/Sections'
import {Title, H1, H2, H3, Span, Paragraph} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, RoundImage} from '../components/Styling'
import GeeksVsOthers from '../components/GeeksVsOthers'
import Mentors from '../components/Mentors'
import PricesAndPayment from '../components/PricesAndPayment'
import Alumni from '../components/Alumni'
import Credentials from '../components/Credentials'
import Scrollspy from 'react-scrollspy'
import BaseRender from './_baseRender'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {SessionContext} from '../session.js'
import ProgramSelector from '../components/ProgramSelector'
import {BrowserView} from "react-device-detect";

const Job = ({data, pageContext, yml}) => {
    return (<>
        <Wrapper
            style="default"
            image="yes"
            url={yml.meta_info.image}
            border="bottom"
            height="300px"
            backgroundSize="cover"
        >
            <Divider height="50px" />
            <Row>
                <Column size="12">
                    <H1 color={Colors.white} fontSize="12px" align="center">{yml.seo_title}</H1>
                </Column>
            </Row>
            {/* <ProgramSelector week={week} /> */}
            <Divider height="20px" />

            <Title
                size="5"
                title={yml.tagline}
                main
                color={Colors.white}
                fontSize="46px"
                textAlign="center"
            />
        </Wrapper>

        <Divider height="100px" />
    </>
    )
};

export const query = graphql`
  query JobQuery($file_name: String!, $lang: String!) {
    allJobYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            seo_title
            meta_info{
                title
                description
                image
                keywords
            }
        }
      }
    }
  }
`;

export default BaseRender(Job);
