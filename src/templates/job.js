import React, {useState, useEffect, useContext} from 'react';
import Layout from '../global/Layout';
import styled from 'styled-components';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, Divider} from '../components/Sections'
import {Title, H1, H2, H3, H4, Span, Paragraph, Separator} from '../components/Heading'
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
import {Link} from 'gatsby';

const Job = ({data, pageContext, yml}) => {
    console.log(yml)
    return (<>
        <Wrapper
            style="default"
            image="yes"
            url={yml.banner_image}
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
                title={yml.banner_heading}
                main
                color={Colors.white}
                fontSize="46px"
                textAlign="center"
            // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
            />

        </Wrapper>
        <Divider height="100px" />
        <Wrapper style="default">
            <Card height="auto"
                width="100%"
                shadow
                padding="30px"
                margin="5px 0 10px 0">
                <Row align="center">
                    <Column size="12">
                        <H3 align="center" uppercase fontSize="28px" color={Colors.blue}>{yml.title}</H3>
                    </Column>
                </Row>
                <Divider height="20px" />
                <Row align="center">
                    <Column size="12">
                        <Paragraph color={Colors.gray} align="center" fontSize="12px">{yml.description}</Paragraph>
                    </Column>
                </Row>
                <Divider height="30px" />
                {yml.content.map((item, index) => {
                    return (
                        <>
                            <Row key={index} align="center">
                                <Column size="12">
                                    <H4 align="center" fontSize="28px" color={Colors.black}>{item.label}</H4>
                                </Column>
                            </Row>
                            <Row height="5%" align="center">

                                <Separator primary />

                            </Row>
                            <Divider height="10px" />
                            <Row align="center">
                                <Column size="8">
                                    <ul>
                                        {item.list.map((item) => {
                                            return (
                                                <li key={index}><Paragraph margin="10px 0" color={Colors.gray} align="left" fontSize="12px">{item}</Paragraph></li>
                                            )
                                        })}
                                    </ul>
                                </Column>
                            </Row>
                            <Divider height="30px" />
                        </>
                    )
                })

                }
                <Row align="center">
                    <Column size="12" align="center">
                        <Link to="/apply"><Button width="200px" color={Colors.red} textColor={Colors.white}>APPLY NOW</Button></Link>
                    </Column>
                </Row>
            </Card>
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
            banner_heading
            banner_image
            cities
            title
            description
            content{
                label
                list
            }
            
        }
      }
    }
  }
`;

export default BaseRender(Job);
