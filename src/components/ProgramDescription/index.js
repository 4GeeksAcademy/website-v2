import React, {useState, useEffect} from 'react';
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
const ProgramDescription = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ind, setInd] = useState(0)
    const [type, setType] = useState("full_time")
    useEffect(() => {
        setType(props.type)
    }, [])
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
    console.log("program", program)
    return (
        <>
            {props.type === "part_time" ? <Card width="100%" height="400px" color="white" shadow >
                {/* <Row marginLeft="0px" marginRight="0px" background="black"> */}
                <Tabs className="testy">
                    <Header>
                        <TabList >
                            {program.part_time.map((item, index) => {
                                return (<Tab key={index} onClick={() => setCurrentIndex(index)}>{item.module_name}</Tab>)
                            })
                            }
                        </TabList>
                    </Header>
                    <Body>
                        {program.part_time.map((item, i) => {

                            return (
                                <TabPanel key={i} onChange={() => setInd(i)}>
                                    <Container width="fluid">
                                        <Row height="75px">
                                            <Column size="3" paddingLeft="20px" padding="15px 0" alignXs="left">
                                                <Paragraph color={Colors.black} fontSize="20px">{item.title}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="45px">
                                            <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                                                <Paragraph color={Colors.gray} fontSize="14px">DESCRIPTION:</Paragraph>
                                            </Column>
                                            <Column size="6" customRespSize respSize="6" alignXs="left">
                                                <Paragraph color={Colors.gray} fontSize="14px">{item.description}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="45px">
                                            <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                                                <Paragraph color={Colors.gray} fontSize="14px">PROJECTS:</Paragraph>
                                            </Column>
                                            <Column size="6" customRespSize respSize="6" alignXs="left">
                                                <Paragraph color={Colors.gray} fontSize="14px">{item.projects}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="65px">
                                            <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                                                <Paragraph color={Colors.gray} fontSize="14px">DURATION:</Paragraph>
                                            </Column>
                                            <Column size="6" customRespSize respSize="6" alignXs="left">
                                                <Paragraph color={Colors.gray} fontSize="14px">{item.duration}</Paragraph>
                                            </Column>
                                        </Row>

                                        <Row height="70px">
                                            <Column size="3" customRespSize respSize="3" padding="15px 0" image="no" color={Colors.lightGray} border="custom" customBorderRadius="0 0 0 1.25rem">
                                                <Row align="around" height="100%">
                                                    <Column size="12" alignSelf="center">
                                                        <Paragraph align="center" color={Colors.gray} fontSize="16px">Skills / Weeks:</Paragraph>
                                                    </Column>
                                                </Row>
                                            </Column>
                                            <Column size="1" image="no" color={Colors.lightGray} customRespSize respSize="1" >
                                                <Row align="around" height="100%">
                                                    <Column size="12" alignSelf="center">
                                                        <Paragraph align="center" color={Colors.gray} >1</Paragraph>
                                                    </Column>
                                                </Row>

                                            </Column>
                                            <Column size="1" image="no" color={Colors.lightGray} customRespSize respSize="1">
                                                <Row align="around" height="100%">
                                                    <Column size="12" alignSelf="center">
                                                        <Paragraph align="center" color={Colors.gray} >2</Paragraph>
                                                    </Column>
                                                </Row>
                                            </Column>

                                            <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 0 ? Colors.lightGray : undefined}>
                                                <Row align="around" height="100%">
                                                    <Column size="12" alignSelf="center">
                                                        <Paragraph align="center" color={Colors.gray} >3</Paragraph>
                                                    </Column>
                                                </Row>
                                            </Column>
                                            <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 0 ? Colors.lightGray : undefined}>
                                                <Row align="around" height="100%">
                                                    <Column size="12" alignSelf="center">
                                                        <Paragraph align="center" color={Colors.gray} >4</Paragraph>
                                                    </Column>
                                                </Row>
                                            </Column>
                                            <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 1 ? Colors.lightGray : undefined}>
                                                <Row align="around" height="100%">
                                                    <Column size="12" alignSelf="center">
                                                        <Paragraph align="center" color={Colors.gray} >5</Paragraph>
                                                    </Column>
                                                </Row>
                                            </Column>
                                            <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 1 ? Colors.lightGray : undefined}>
                                                <Row align="around" height="100%">
                                                    <Column size="12" alignSelf="center">
                                                        <Paragraph align="center" color={Colors.gray} >6</Paragraph>
                                                    </Column>
                                                </Row>
                                            </Column>
                                            <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined}>
                                                <Row align="around" height="100%" align="center">
                                                    <Column size="12" alignSelf="center">
                                                        <Paragraph align="center" color={Colors.gray} >7</Paragraph>
                                                    </Column>
                                                </Row>
                                            </Column>
                                            <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined}>
                                                <Row align="around" height="100%">
                                                    <Column size="12" alignSelf="center">
                                                        <Paragraph align="center" color={Colors.gray} >8</Paragraph>
                                                    </Column>
                                                </Row>
                                            </Column>
                                            <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined} border="custom" customBorderRadius="0 0 1.25rem 0">
                                                <Row align="around" height="100%">
                                                    <Column size="12" alignSelf="center">
                                                        <Paragraph align="center" color={Colors.gray} >9</Paragraph>
                                                    </Column>
                                                </Row>
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
                : props.type === "full_time" &&
                <Card width="100%" height="400px" color="white" shadow >
                    {/* <Row marginLeft="0px" marginRight="0px" background="black"> */}
                    <Tabs className="testy">
                        <Header>
                            <TabList >
                                {program.full_time.map((item, index) => {
                                    return (<Tab key={index} onClick={() => setCurrentIndex(index)}>{item.module_name}</Tab>)
                                })
                                }
                            </TabList>
                        </Header>
                        <Body>
                            {program.full_time.map((item, i) => {

                                return (
                                    <TabPanel key={i} onChange={() => setInd(i)}>
                                        <Container width="fluid">
                                            <Row height="75px">
                                                <Column size="3" paddingLeft="20px" padding="15px 0" alignXs="left">
                                                    <Paragraph color={Colors.black} fontSize="20px">{item.title}</Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="45px">
                                                <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                                                    <Paragraph color={Colors.gray} fontSize="14px">DESCRIPTION:</Paragraph>
                                                </Column>
                                                <Column size="6" customRespSize respSize="6" alignXs="left">
                                                    <Paragraph color={Colors.gray} fontSize="14px">{item.description}</Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="45px">
                                                <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                                                    <Paragraph color={Colors.gray} fontSize="14px">PROJECTS:</Paragraph>
                                                </Column>
                                                <Column size="6" customRespSize respSize="6" alignXs="left">
                                                    <Paragraph color={Colors.gray} fontSize="14px">{item.projects}</Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="65px">
                                                <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                                                    <Paragraph color={Colors.gray} fontSize="14px">DURATION:</Paragraph>
                                                </Column>
                                                <Column size="6" customRespSize respSize="6" alignXs="left">
                                                    <Paragraph color={Colors.gray} fontSize="14px">{item.duration}</Paragraph>
                                                </Column>
                                            </Row>

                                            <Row height="70px">
                                                <Column size="3" customRespSize respSize="3" padding="15px 0" image="no" color={Colors.lightGray} border="custom" customBorderRadius="0 0 0 1.25rem">
                                                    <Row align="around" height="100%">
                                                        <Column size="12" alignSelf="center">
                                                            <Paragraph align="center" color={Colors.gray} fontSize="16px">Skills / Weeks:</Paragraph>
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size="1" image="no" color={Colors.lightGray} customRespSize respSize="1" >
                                                    <Row align="around" height="100%">
                                                        <Column size="12" alignSelf="center">
                                                            <Paragraph align="center" color={Colors.gray} >1</Paragraph>
                                                        </Column>
                                                    </Row>

                                                </Column>
                                                <Column size="1" image="no" color={Colors.lightGray} customRespSize respSize="1">
                                                    <Row align="around" height="100%">
                                                        <Column size="12" alignSelf="center">
                                                            <Paragraph align="center" color={Colors.gray} >2</Paragraph>
                                                        </Column>
                                                    </Row>
                                                </Column>

                                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 0 ? Colors.lightGray : undefined}>
                                                    <Row align="around" height="100%">
                                                        <Column size="12" alignSelf="center">
                                                            <Paragraph align="center" color={Colors.gray} >3</Paragraph>
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 0 ? Colors.lightGray : undefined}>
                                                    <Row align="around" height="100%">
                                                        <Column size="12" alignSelf="center">
                                                            <Paragraph align="center" color={Colors.gray} >4</Paragraph>
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 1 ? Colors.lightGray : undefined}>
                                                    <Row align="around" height="100%">
                                                        <Column size="12" alignSelf="center">
                                                            <Paragraph align="center" color={Colors.gray} >5</Paragraph>
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 1 ? Colors.lightGray : undefined}>
                                                    <Row align="around" height="100%">
                                                        <Column size="12" alignSelf="center">
                                                            <Paragraph align="center" color={Colors.gray} >6</Paragraph>
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined}>
                                                    <Row align="around" height="100%" align="center">
                                                        <Column size="12" alignSelf="center">
                                                            <Paragraph align="center" color={Colors.gray} >7</Paragraph>
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined}>
                                                    <Row align="around" height="100%">
                                                        <Column size="12" alignSelf="center">
                                                            <Paragraph align="center" color={Colors.gray} >8</Paragraph>
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined} border="custom" customBorderRadius="0 0 1.25rem 0">
                                                    <Row align="around" height="100%">
                                                        <Column size="12" alignSelf="center">
                                                            <Paragraph align="center" color={Colors.gray} >9</Paragraph>
                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>

                                        </Container>

                                    </TabPanel>
                                )
                            })
                            }
                        </Body>
                    </Tabs>
                </Card >}
        </>
    )
};
ProgramDescription.defaultProps = {
    type: "full_time",
};
export default ProgramDescription;
