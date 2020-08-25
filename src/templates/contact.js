import React, {useState, useContext, useEffect} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H3, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Card} from '../components/Card'
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import BaseRender from './_baseRender';
import {SessionContext} from '../session.js';
import {contactUs} from '../actions.js';
import {Input, Alert, TextArea} from '../components/Form';
import {useDebounce} from "../utils/debounce";

const useStyles = makeStyles({
    root: {
        background: Colors.white,
        fontSize: '10px',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 10px',
        '&$selected': {
            background: Colors.yellow,
            color: Colors.white
        },
    },
    label: {
        textTransform: 'lowercase',
    },
});


const Contact = (props) => {
    const {data, pageContext, yml} = props;
    const classes = useStyles();
    const { session } = useContext(SessionContext);
    const [alignment, setAlignment] = useState('left');
    const [ formStatus, setFormStatus ] = useState({ status: "idle", msg: "Contact Us"});
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const [formData, setVal] = useState({
        first_name: {value: '', valid: false},
        last_name: {value: '', valid: false},
        email: {value: '', valid: false},
        client_comment: {value: '', valid: false}
    });
    
    const formIsValid = (formData=null) => {
    if(!formData) return null;
    for(let key in formData){
        if(!formData[key].valid) return false;
    }
    return true;
    }

    return (
        <>
        <form onSubmit={(e) => {
            e.preventDefault();
            if(formStatus.status === "error"){
                            setFormStatus({ status: "idle", msg: "Resquest" })
                            }
            if(!formIsValid(formData)){
                setFormStatus({status: "error", msg: "There are some errors in your form"});
            } else {
                setFormStatus({status: "loading", msg: "Loading..."});
                contactUs(formData, session)
                .then((data) => {
                    if(data.error !== false && data.error !== undefined){    
                        setFormStatus({status: "error", msg: "Fix errors"});
                        console.log("submit error")
                    }else {
                        setFormStatus({status: "thank-you", msg: "Thank you"});
                        console.log("Thank you");
                    }
                })
                .catch(error => {
                      console.log("error", error);
                    setFormStatus({status: "error", msg: error.message || error});
                })
            }
        }}>
            <Divider height="100px" />
            <Wrapper
                style="default">
                <Title
                    title={yml.tagline}
                    paragraph={yml.sub_heading}
                    primary
                    size="8"
                />
                <Divider height="100px" />
                <Row>
                    <Column
                        size="12"
                        border="bottom"
                        
                        color={Colors.white}
                    >

                        <Card shadow borders="1.25rem" p_xs="0 10px" p_sm="0" p_md="0">
                            <Row
                                background="#000000"
                                height="100%"
                                marginLeft="0"
                                marginRight="0"
                                align="center"
                                borderRadius="1.25rem 1.25rem 1.25rem 1.25rem"
                            >
                                <Column size="8" alignSelf="center" height="100%"  border="bottom" color="white">
                                    <Row align="center" height="100%">
                                        <Column size="10" height="100%">
                                            <Divider height="50px" />
                                            <Row height="50px">
                                                <H3>{yml.left.heading}</H3>
                                                {formStatus.status === "error" && <Alert color="red">{formStatus.msg}</Alert>}
                                            </Row>
                                            <Row height="50px">
                                                <Input
                                                    type="text" className="form-control" placeholder={yml.left.form_section.first_name}
                                                    errorMsg="Please specify a valid first name"
                                                    required
                                                    onChange={(value, valid) => {setVal({...formData, first_name: {value, valid}})
                                                    if(formStatus.status === "error"){
                                                    setFormStatus({ status: "idle", msg: "Resquest" })
                                                }
                                                }}
                                                    value={formData.first_name.value}
                                                />
                                            </Row>
                                            <Row height="50px">
                                                <Input type="text" className="form-control" placeholder={yml.left.form_section.last_name}
                                                    onChange={(value, valid) => {setVal({...formData, last_name: {value,valid}})
                                                    if(formStatus.status === "error"){
                                                    setFormStatus({ status: "idle", msg: "Resquest" })
                                                }
                                                }}
                                                    errorMsg="Please specify a valid last name"
                                                    required
                                                    value={formData.last_name.value}
                                                />
                                            </Row>
                                            <Row height="50px">
                                                <Input type="text" className="form-control" placeholder={yml.left.form_section.email}
                                                    onChange={(value,valid) => {setVal({...formData, email: {value, valid }})
                                                    if(formStatus.status === "error"){
                                                    setFormStatus({ status: "idle", msg: "Resquest" })
                                                }
                                                }}
                                                    errorMsg="Please specify a valid email"
                                                    required
                                                    value={formData.email.value}
                                                />
                                            </Row>
                                            <Row height="200px">
                                                <TextArea type="text" rows="10" cols="50" className="form-control" 
                                                    value={formData.client_comment.value} 
                                                    placeholder={yml.left.message_section.placeholder} 
                                                    onChange={(value,valid) => {setVal({...formData, client_comment: {value,valid}})
                                                    if(formStatus.status === "error"){
                                                    setFormStatus({ status: "idle", msg: "Resquest" })
                                                }
                                                }} 
                                                    errorMsg="Please leave us a comment" 
                                                    required
                                                />
                                            </Row>
                                            <Row >
                                                {formStatus.status === "error" && <Alert color="red">{formStatus.msg}</Alert>}
                                                <Button
                                                    width="150px"
                                                    move="up" up="15px" color={formStatus.status === "loading" ? Colors.darkGray:  Colors.blue} textColor={Colors.white}
                                                    margin="2rem 0" padding=".45rem 3rem"
                                                    disabled={formStatus.status === "loading" ? true: false}
                                                    type="submit"
                                                >{yml.left.button.button_text}</Button>
                                            </Row>
                                        </Column>
                                    </Row>

                                </Column>

                                <Column size="4" customRespSize respSize="12" color={Colors.black} br_xs="1.25rem" br_sm="1.25rem" br_md="1.25rem" h_xs="auto" h_sm="auto" h_md="auto" m_xs="35px 0" m_sm="35px 0" m_md="35px 0" alignSelf="unset" height="100%"  >
                                    <Row align="center" height="100%" borderRadius="0 1.25rem 1.25rem 1.25rem">
                                        <Column size="10" height="100%">
                                            <Divider height="50px" />
                                            <Row height="60px">
                                                <H3
                                                    fs_xs="20px"
                                                    fs_sm="18px"
                                                    fs_md="18px"
                                                    fs_lg="20px"
                                                    fs_xl="24px"
                                                    color={Colors.yellow}
                                                >
                                                    {yml.right.heading}
                                                </H3>
                                            </Row>
                                            <Divider height="40px" />
                                            {yml.right.content_section.map((item, i) => {
                                                return (<Row key={i} height="50px">
                                                        <Paragraph

                                                            fs_xs="12px"
                                                            fs_sm="14px"
                                                            fs_md="10px"
                                                            fs_lg="12px"
                                                            fs_xl="14px"
                                                            lineHeight="16px"
                                                            color={Colors.lightGray}
                                                        >{item}
                                                        </Paragraph>
                                                    </Row>)
                                            })}
                                        </Column>
                                    </Row>
                                </Column>

                            </Row>
                        </Card>
                    </Column>
                </Row>
            </Wrapper>
            <Divider height="300px" />
        </form>
        </>
    )
};
export const query = graphql`
  query ContactQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            sub_heading
            meta_info{
                title
                description
                image
                keywords
            }
            left {
                heading
                locations_title
                button {
                  button_text
                  button_link
                }
                form_section {
                  
                    first_name
                    last_name
                    email
                    phone
                  
                }
                message_section {
                  placeholder
                  note
                }
              }
            right{
                heading
                content_section
            }
        }
      }
    }
  }
`;
export default BaseRender(Contact);