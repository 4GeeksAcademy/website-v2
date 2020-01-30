import React, {useState} from 'react';
import styled from 'styled-components';
import {Card} from '../Card'
import {useStaticQuery, graphql} from 'gatsby';

import {Row, Container, Column} from '../Sections'
import {H5, Paragraph} from '../Heading'
import {Button, Colors} from '../Styling'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Header = styled.div`
    background: black;
    border-radius: 1.25rem 1.25rem 0 0;
    height: 100px;
    color: white;
    font-family: 'lato', sans-serif;
    font-size: 14px;
    font-weight: 800;
    align-items: center;
`;
const Body = styled.div`
    background: white;
    height:300px;
    border-radius: 0 0 1.25rem 1.25rem;
    
`
const ProgramDescription = () => {
    const data = useStaticQuery(graphql`
    query myQueryDetails{
        program: allProgramDetailsYaml {
            edges {
              node {
                part_time {
                  module_name
                  title
                  description
                  duration
                  slug
                  projects
                }
                full_time {
                  module_name
                  title
                  description
                  duration
                  slug
                  projects
                }
              }
            }
          }
      }
    `)
    let program = data.program.edges[0].node
    return (
        <>
            <Card width="100%" height="400px" color="white" shadow >
                {/* <Row marginLeft="0px" marginRight="0px" background="black"> */}
                <Tabs className="testy">
                    <Header>
                        <TabList >
                            {program.full_time.map((item, index) => {
                                return (<Tab key={index}>{item.module_name}</Tab>)
                            })
                            }
                        </TabList>
                    </Header>
                    <Body>
                        {program.full_time.map((item, index) => {
                            return (
                                <TabPanel key={index}>
                                    <Container width="fluid">
                                        <Row height="75px">
                                            <Column size="3" paddingLeft="20px" padding="15px 0">
                                                <Paragraph color={Colors.black} fontSize="20px">{item.title}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="45px">
                                            <Column size="3" paddingLeft="20px">
                                                <Paragraph color={Colors.gray} fontSize="14px">DESCRIPTION:</Paragraph>
                                            </Column>
                                            <Column size="6">
                                                <Paragraph color={Colors.gray} fontSize="14px">{item.description}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="45px">
                                            <Column size="3" paddingLeft="20px">
                                                <Paragraph color={Colors.gray} fontSize="14px">PROJECTS:</Paragraph>
                                            </Column>
                                            <Column size="6">
                                                <Paragraph color={Colors.gray} fontSize="14px">{item.projects}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="65px">
                                            <Column size="3" paddingLeft="20px">
                                                <Paragraph color={Colors.gray} fontSize="14px">DURATION:</Paragraph>
                                            </Column>
                                            <Column size="6">
                                                <Paragraph color={Colors.gray} fontSize="14px">{item.duration}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="70px">
                                            <Column size="3" paddingLeft="20px" padding="15px 0" image="no" color={Colors.lightGray} border="custom" customBorderRadius="0 0 0 1.25rem">
                                                <Paragraph color={Colors.gray} fontSize="16px">Skills / Weeks:</Paragraph>
                                            </Column>
                                            <Column size="1" image="no" color={Colors.lightGray}>
                                                <Paragraph color={Colors.gray} fontSize="14px">1</Paragraph>
                                            </Column>
                                            <Column size="1" image="no" color={Colors.lightGray}>
                                                <Paragraph color={Colors.gray} fontSize="14px">2</Paragraph>
                                            </Column>

                                            <Column size="1" >
                                                <Paragraph color={Colors.gray} fontSize="14px">3</Paragraph>
                                            </Column>
                                            <Column size="1" >
                                                <Paragraph color={Colors.gray} fontSize="14px">4</Paragraph>
                                            </Column>
                                            <Column size="1" >
                                                <Paragraph color={Colors.gray} fontSize="14px">5</Paragraph>
                                            </Column>
                                            <Column size="1" >
                                                <Paragraph color={Colors.gray} fontSize="14px">6</Paragraph>
                                            </Column>
                                            <Column size="1" >
                                                <Paragraph color={Colors.gray} fontSize="14px">7</Paragraph>
                                            </Column>
                                            <Column size="1" >
                                                <Paragraph color={Colors.gray} fontSize="14px">8</Paragraph>
                                            </Column>
                                            <Column size="1" border="custom" customBorderRadius="0 0 1.25rem 0">
                                                <Paragraph color={Colors.gray} fontSize="14px">9</Paragraph>
                                            </Column>
                                        </Row>

                                    </Container>

                                </TabPanel>
                            )
                        })
                        }
                    </Body>
                </Tabs>
            </Card >
        </>
    )
};

export default ProgramDescription;
