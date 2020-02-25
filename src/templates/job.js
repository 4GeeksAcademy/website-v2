import React, {useState, useEffect, useContext} from 'react';
import Layout from '../global/Layout';
import styled from 'styled-components';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, Divider} from '../components/Sections'
import {Title, H1, H2, H3, H4, Span, Paragraph, Separator} from '../components/Heading'
import {Button, Colors, Check, ArrowLeft, RoundImage} from '../components/Styling'
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

const Input = styled.input`
    background-color:${Colors.lightGray};
    height: 40px;
    width: 100%;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-color: ${Colors.black};
`
const Job = ({data, pageContext, yml}) => {
    const [form, setForm] = useState(false);
    const [buttonToggle, setButtonToggle] = useState();
    console.log(yml)
    const [formData, setVal] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });
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
                        {
                            form === false
                                ? <Button onClick={() => {setForm(!form), setButtonToggle(!buttonToggle)}} width="200px" color={Colors.red} textColor={Colors.white}>APPLY NOW</Button>
                                : null
                        }
                    </Column>
                </Row>
                {form === true
                    ?

                    <Row align="center" height="100%">
                        <Column size="8" height="100%">
                            <Divider height="50px" />
                            <Row height="50px">
                                <H3>APPLY FOR THIS JOB</H3>
                            </Row>
                            <Row height="50px">
                                <Input
                                    type="text" className="form-control" placeholder="First name *"
                                    onChange={(e) => setVal({...formData, first_name: e.target.value})}
                                    value={formData.firstName}
                                />
                            </Row>
                            <Row height="50px">
                                <Input type="text" className="form-control" placeholder="Last Name *"
                                    onChange={(e) => setVal({...formData, last_name: e.target.value})}
                                    value={formData.lastName}
                                />
                            </Row>
                            <Row height="50px">
                                <Input type="email" className="form-control" placeholder="Email *"
                                    onChange={(e) => setVal({...formData, email: e.target.value})}
                                    value={formData.email}
                                />
                            </Row>
                            <Row height="50px">
                                <Input
                                    type="number" className="form-control" placeholder="Phone *"
                                    onChange={(e) => setVal({...formData, phone: e.target.value})}
                                    value={formData.phone}
                                />
                            </Row>
                            <Row align="center">
                                <Button
                                    move="up" up="15px" color={Colors.blue} width="300px" textColor={Colors.white}
                                    margin="2rem 0" padding=".45rem 3rem"
                                    onClick={() => apply(formData)
                                        .then(() => {
                                            console.log("Thank you");
                                        })
                                        .catch(() => {
                                            console.log("error");
                                        })
                                    }
                                >APPLY FOR THIS JOB</Button>
                            </Row>
                        </Column>
                    </Row>

                    :
                    null}
            </Card>
        </Wrapper>
        <Wrapper style="default">

            <Row align="around" height="100%" >
                <Column size="12" alignSelf="center" >
                    <Link to="/jobs"><ArrowLeft width="32" color={Colors.blue} fill={Colors.blue} /></Link>
                </Column>
            </Row>
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
