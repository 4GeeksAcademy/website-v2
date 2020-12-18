import React, {useState, useEffect, useContext} from 'react';
import {graphql} from 'gatsby'
import styled from 'styled-components';
import Card from '../components/Card'
import Icon from '../components/Icon'
import {Container, Row, Column, Wrapper, Divider} from '../components/Sections'
import {Title, H1, H2, H3, H4, Span, Paragraph, Separator} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
import BaseRender from './_baseLayout'
import {Link} from 'gatsby';
import {applyJob} from "../actions";

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
    const [formData, setVal] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });
    return (<>
        <Wrapper


            url={yml.banner_image}
            border="bottom"
            height="200px"
            backgroundSize="cover"
        >
            <Divider height="50px" />
            <Row display="flex">
                <Column size="12">
                    <H1 color={Colors.white} fontSize="12px" align="center">{yml.seo_title}</H1>
                </Column>
            </Row>
            {/* <ProgramSelector week={week} /> */}
            <Divider height="20px" />

            <Title
                size="5"
                title={yml.banner_heading}
                variant="main"
                color={Colors.black}
                fontSize="46px"
                textAlign="center"
            // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
            />

        </Wrapper>
        <Divider height="100px" />
        <Wrapper >
            <Card height="auto"
                width="100%"
                shadow
                padding="30px"
                margin="5px 0 10px 0">
                <Row justifyContent="center" display="flex">
                    <Column size="12">
                        <H3 align="center" uppercase fontSize="28px" color={Colors.blue}>{yml.title}</H3>
                    </Column>
                </Row>
                <Divider height="20px" />
                <Row justifyContent="center" display="flex">
                    <Column size="8">
                        <Paragraph color={Colors.gray} align="center" fontSize="16px">{yml.description}</Paragraph>
                    </Column>
                </Row>
                <Divider height="30px" />
                {yml.content.map((item, index) => {
                    return (
                        <>
                            <Row key={index} justifyContent="center" display="flex">
                                <Column size="12">
                                    <H4 align="center" fontSize="28px" color={Colors.black}>{item.label}</H4>
                                </Column>
                            </Row>
                            <Row height="5%" justifyContent="center" display="flex">

                                <Separator variant="primary" />

                            </Row>
                            <Divider height="10px" />
                            <Row justifyContent="center" display="flex">
                                <Column size="8">
                                    <ul>
                                        {item.list.map((item) => {
                                            return (
                                                <li key={index}><Paragraph margin="10px 0" color={Colors.gray} align="left" fontSize="14px">{item}</Paragraph></li>
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
                <Row justifyContent="center" display="flex">
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

                    <Row justifyContent="center" height="100%" display="flex">
                        <Column size="8" height="100%">
                            <Divider height="50px" />
                            <Row display="flex" height="50px">
                                <H3>APPLY FOR THIS JOB</H3>
                            </Row>
                            <Row display="flex" height="50px">
                                <Input
                                    type="text" className="form-control" placeholder="First name *"
                                    onChange={(e) => setVal({...formData, first_name: e.target.value})}
                                    value={formData.firstName}
                                />
                            </Row>
                            <Row display="flex" height="50px">
                                <Input type="text" className="form-control" placeholder="Last Name *"
                                    onChange={(e) => setVal({...formData, last_name: e.target.value})}
                                    value={formData.lastName}
                                />
                            </Row>
                            <Row display="flex" height="50px">
                                <Input type="email" className="form-control" placeholder="Email *"
                                    onChange={(e) => setVal({...formData, email: e.target.value})}
                                    value={formData.email}
                                />
                            </Row>
                            <Row display="flex" height="50px">
                                <Input
                                    type="number" className="form-control" placeholder="Phone *"
                                    onChange={(e) => setVal({...formData, phone: e.target.value})}
                                    value={formData.phone}
                                />
                            </Row>
                            <Row display="flex" justifyContent="center" height="100%">
                                <Column size="3"></Column>
                                <Column size="6">
                                    <Row display="flex" justifyContent="around" height="100%">
                                        <Column size="12" alignSelf="center">
                                            <Button
                                                color={Colors.blue} width="auto" textColor={Colors.white}
                                                margin="2rem 0" padding=".45rem 3rem"
                                                onClick={() => applyJob(formData)
                                                    .then(() => {
                                                        console.log("Thank you");
                                                    })
                                                    .catch((error) => {
                                                        console.log("error", error);
                                                    })
                                                }
                                            >APPLY FOR THIS JOB</Button>
                                        </Column>
                                    </Row>
                                </Column>
                                <Column size="3" align="right">
                                    <Row display="flex" justifyContent="around" height="100%">
                                        <Column size="12" alignSelf="center">
                                            <Paragraph onClick={() => setForm(!form)} margin="10px 0" color={Colors.gray} align="right" fontSize="14px">Close</Paragraph>
                                            {/* <Icon icon="arrowup" width="24" color={Colors.red} fill={Colors.red} /> */}
                                        </Column>
                                    </Row>
                                </Column>

                            </Row>
                        </Column>
                    </Row>

                    :
                    null}
            </Card>
        </Wrapper>
        <Wrapper >

            <Row display="flex" justifyContent="around" height="100%" >
                <Column size="12" alignSelf="center" >
                    <Link to="/jobs"><Icon icon="arrowleft" width="32" color={Colors.blue} fill={Colors.blue} /></Link>
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
