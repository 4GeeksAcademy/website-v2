import React, {useState, useContext, useEffect} from 'react';
import Layout from '../global/Layout';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H2, H3, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Card} from '../components/Card'
import BaseRender from './_baseRender';
import {SessionContext} from '../session.js';
import {contactUs} from '../actions.js';
import {Input, Alert, TextArea} from '../components/Form';
import {useDebounce} from "../utils/debounce";

const Contact = (props) => {
    const {data, pageContext, yml} = props;
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
                    }else {
                        setFormStatus({status: "thank-you", msg: "Thank you 🤣 Gracias"});
                    }
                })
                .catch(error => {
                    console.error("error", error);
                    setFormStatus({status: "error", msg: error.message || error});
                })
            }
        }}>
            <Wrapper
                margin="100px 0"
                >
                <Title
                    type="h1"
                    title={yml.tagline}
                    paragraph={yml.sub_heading}
                    paragraphColor={Colors.gray}
                    variant="primary"
                    size="8"
                />
                <Card shadow borders="1.25rem" p_sm="0" p_md="0">
                    <Row
                        background="#000000"
                        height="100%"
                        marginLeft="0"
                        marginRight="0"
                        align="center"
                        borderRadius="1.25rem 1.25rem 1.25rem 1.25rem"
                    >
                        {formStatus.status === "thank-you" ? 
                            <Column size="7" size_sm="12"
                                alignSelf="center"
                                padding="40%"
                                align="left"
                                borderRadius="0 0 0 1.25rem" 
                                color="white"
                            >
                                <H3 align="left" color={Colors.green}>{formStatus.msg}</H3>
                                <Paragraph margin="10px 0">{yml.left.thankyou}</Paragraph>
                            </Column>
                            :
                            <Column size="7" size_sm="12" padding="30px 0px 100px 0px" paddingRight="40px" paddingLeft="40px" alignSelf="center" height="100%"  borderRadius="0 0 0 1.25rem" color="white">
                                <Divider height="50px" />
                                <Row height="50px">
                                    <H3 align="left" fs_xl="25px">{yml.left.heading}</H3>
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
                                <Row height="50px" margin="0 0 10px 0">
                                    <Input type="email" className="form-control" placeholder={yml.left.form_section.email}
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
                                        required
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
                                        transform="translate(-15px)" color={formStatus.status === "loading" ? Colors.darkGray:  Colors.blue} textColor={Colors.white}
                                        margin="2rem 0" padding=".45rem 3rem"
                                        disabled={formStatus.status === "loading" ? true: false}
                                        type="submit"
                                    >{yml.left.button.button_text}</Button>
                                </Row>
                            </Column>
                        }

                        <Column size="5" size_sm="12" customRespSize respSize="12" color={Colors.black} br_xs="1.25rem" br_sm="1.25rem" br_md="1.25rem" h_xs="auto" h_sm="auto" h_md="auto" m_xs="35px 0" m_sm="35px 0" m_md="35px 0" alignSelf="unset" height="100%"  >
                            <Row align="center" height="100%" borderRadius="0 1.25rem 1.25rem 1.25rem">
                                <Column size="10" height="100%" padding="30px 0px 50px 0px" paddingLeft="0" paddingRight="0" p_md="10px 0px">
                                    <Row height="60px" padding="0 20px" margin="0 0 40px 0">
                                        {yml.right.heading.split("\n").map(text => 
                                            <H3
                                                key={text}
                                                fs_sm="20px"
                                                fs_md="20px"
                                                fs_lg="22px"
                                                fs_xl="25px"
                                                align="left"
                                                width="100%"
                                                color={Colors.yellow}
                                            >{text}
                                            </H3>
                                        )}
                                    </Row>
                                    {yml.right.content_section.map((item, i) => {
                                        return <Paragraph
                                                    key={i}
                                                    fs_sm="16px"
                                                    fontSize="16px"
                                                    margin="5px"
                                                    m_sm="2px"
                                                    align="left"
                                                    color={Colors.lightGray}
                                                >{item}
                                        </Paragraph>;
                                    })}
                                </Column>
                            </Row>
                        </Column>

                    </Row>
                </Card>
            </Wrapper>
        </form>
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
                thankyou
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