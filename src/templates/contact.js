import React, {useState, useContext, useEffect} from 'react';
// import {Row, Column, Wrapper, Divider} from '../components/Sections'
// import {H3, Title, Separator} from '../components/Heading'
// import Card from '../components/Card'
import BaseRender from './_baseLayout';
import {SessionContext} from '../session.js';
import {contactUs} from '../actions.js';
import {Input, Alert, TextArea} from '../components/Form';
import Icon from '../components/Icon';
import Link from 'gatsby-link'

// New components
import Card from '../new_components/Card'
import {Colors, Button} from '../new_components/Styling'
import {H1, H2, H3, Paragraph} from '../new_components/Heading'
import {Row, Column, HR, Divider, Container, Div} from '../new_components/Sections'


const Contact = (props) => {
    const {data, pageContext, yml} = props;
    const {session} = useContext(SessionContext);
    const [alignment, setAlignment] = useState('left');
    const [formStatus, setFormStatus] = useState({status: "idle", msg: "Contact Us"});
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const [formData, setVal] = useState({
        first_name: {value: '', valid: false},
        last_name: {value: '', valid: false},
        email: {value: '', valid: false},
        client_comments: {value: '', valid: false}
    });

    const formIsValid = (formData = null) => {
        if (!formData) return null;
        for (let key in formData) {
            if (!formData[key].valid) return false;
        }
        return true;
    }
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (formStatus.status === "error") {
                setFormStatus({status: "idle", msg: "Resquest"})
            }
            if (!formIsValid(formData)) {
                setFormStatus({status: "error", msg: "There are some errors in your form"});
            } else {
                setFormStatus({status: "loading", msg: "Loading..."});
                contactUs(formData, session)
                    .then((data) => {
                        if (data.error !== false && data.error !== undefined) {
                            setFormStatus({status: "error", msg: "Fix errors"});
                        } else {
                            setFormStatus({status: "thank-you", msg: "Thank you 🤣 Gracias"});
                        }
                    })
                    .catch(error => {
                        console.error("error", error);
                        setFormStatus({status: "error", msg: error.message || error});
                    })
            }
        }}>
            <Div className="circles-left" display="none" display_tablet="inherit">
                <Icon icon="landingCircles/smCircle-red" style={{zIndex: 2, position: "absolute", left: "218px", top: "225px"}}/>
                <Icon icon="landingCircles/mdCricle-lightBlue" style={{zIndex: 2, position: "absolute", left: "53px", top: "97px"}}/>
                <Icon icon="landingCircles/bigCircle-yellow" style={{zIndex: 2, position:"absolute", left: "0px", top: "250px"}}/>
            </Div>
            <Div className="circles-right" display="none" display_tablet="inherit">
                <Icon icon="landingCircles/lgCircle-mustard" style={{zIndex: 2, position: "absolute", right: "0px", top: "269px"}}/>
                <Icon icon="landingCircles/mdCircle-blue" style={{zIndex: 2, position: "absolute", right: "116px", top: "169px"}}/>
                <Icon icon="landingCircles/smCircle-mustard" style={{zIndex: 2, position: "absolute", right: "299px", top: "122px"}}/>
            </Div>
            <Divider height="64px" />
            <Container variant="fluid" padding_md="17px 8px 40px 8px">
            <Column
                paddingRight="0px"
                paddingLeft="0px"
                flexDirection="column"
                display={`flex`}
                 >  

                <H1
                zIndex="5"
                fontSize="13px"
                lineHeight="16px"
                fontWeight="700"
                letterSpacing="0.05em"
                color="#606060"
                >Coding Bootcamp</H1>

                <H2 zIndex="5" fontSize="48px" lineHeight="60px" margin="16px 0px 19px 0px">{yml.greetings}<br/>{yml.tagline}</H2>
                <Paragraph padding_sm="0 35px" padding_tablet="0 12em" padding_md="0 30%" padding_xs="0 5%" >{yml.sub_heading} 
                <Link to={`/${yml.fields.lang}/${yml.pathFAQ}`} style={{color: "#52a6d1"}}> {yml.sub_headingFAQ}</Link>
                
                </Paragraph>
                <Divider height="64px" xs="42px" />
                <Card  padding="50px 0px 0px 0px" p_sm="0" p_md="0">
                    <Row display="flex"
                        height="100%"
                        marginLeft="0"
                        marginRight="0"
                        justifyContent="center"
                        padding_sm="0 40px"
                        padding_md="0 13%"
                        
                    >
                        {formStatus.status === "thank-you" ?
                            <Column size="5" size_sm="12"
                                alignSelf="center"
                                padding="40%"
                                align="left"
                                borderRadius="0 0 0 1.25rem"
                                background="white"
                            >
                                <H3 textAlign="left" color={Colors.green}>{formStatus.msg}</H3>
                                <Paragraph margin="10px 0">{yml.left.thankyou}</Paragraph>
                            </Column>
                            :
                            // Padding top m_xs="35px 0" m_sm="35px 0" m_md="35px 0" removed
                            <Column id="contact-form" flex_tablet="1" flexDirection="column" size="6" padding_tablet="0 90px" padding_md="0px" size_md="12" alignSelf="center"  height="100%" borderRadius="0 0 0 1.25rem" background="white">

                                <Row display="flex" height="50px">
                                    <H3 textAlign="left" fs_xl="25px">{yml.left.heading}</H3>
                                    {formStatus.status === "error" && <Alert color="red">{formStatus.msg}</Alert>}
                                </Row>
                                <Row display="flex" height="50px">
                                    <Input 
                                        borderRadius="3px"
                                        border="1px solid #A4A4A4"
                                        margin="0"
                                        bgColor={Colors.white}
                                        type="text" className="form-control" placeholder={yml.left.form_section.first_name}
                                        errorMsg="Please specify a valid first name"
                                        required
                                        name="first_name"
                                        onChange={(value, valid) => {
                                            setVal({...formData, first_name: {value, valid}})
                                            if (formStatus.status === "error") {
                                                setFormStatus({status: "idle", msg: "Resquest"})
                                            }
                                        }}
                                        value={formData.first_name.value}
                                    />
                                </Row>
                                <Row display="flex" height="50px">
                                    <Input 
                                        borderRadius="3px"
                                        border="1px solid #A4A4A4"
                                        margin="0"
                                        bgColor={Colors.white}
                                        name="last_name"
                                        type="text" className="form-control" placeholder={yml.left.form_section.last_name}
                                        onChange={(value, valid) => {
                                            setVal({...formData, last_name: {value, valid}})
                                            if (formStatus.status === "error") {
                                                setFormStatus({status: "idle", msg: "Resquest"})
                                            }
                                        }}
                                        errorMsg="Please specify a valid last name"
                                        required
                                        value={formData.last_name.value}
                                    />
                                </Row>
                                <Row display="flex" height="50px" margin="0 0 10px 0">
                                    <Input 
                                        borderRadius="3px"
                                        border="1px solid #A4A4A4"
                                        margin="0"
                                        bgColor={Colors.white}
                                        name="email"
                                        type="email" className="form-control" placeholder={yml.left.form_section.email}
                                        onChange={(value, valid) => {
                                            setVal({...formData, email: {value, valid}})
                                            if (formStatus.status === "error") {
                                                setFormStatus({status: "idle", msg: "Resquest"})
                                            }
                                        }}
                                        errorMsg="Please specify a valid email"
                                        required
                                        value={formData.email.value}
                                    />
                                </Row>
                                <Row display="flex" height="200px">
                                    <TextArea 
                                        borderRadius="3px"
                                        border="1px solid #A4A4A4"
                                        bgColor={Colors.white}
                                        style={{resize: 'none'}}
                                        name="client_comments"
                                        type="text" rows="10" cols="50" className="form-control"
                                        value={formData.client_comments.value}
                                        required
                                        placeholder={yml.left.message_section.placeholder}
                                        onChange={(value, valid) => {
                                            setVal({...formData, client_comments: {value, valid}})
                                            if (formStatus.status === "error") {
                                                setFormStatus({status: "idle", msg: "Resquest"})
                                            }
                                        }}
                                        errorMsg="Please leave us a comment"
                                        required
                                    />
                                </Row>
                                <Row display="flex" justifyContent="flex-end" alignResp="flex-end">
                                    {formStatus.status === "error" && <Alert color="red">{formStatus.msg}</Alert>}
                                    <Button
                                        width="96px"
                                        m_md="17px 0px"
                                        color={formStatus.status === "loading" ? Colors.darkGray : Colors.blue} textColor={Colors.white}
                                        margin="23px 0px 0px 0px" padding="12px 24px"
                                        borderRadius="3px"
                                        disabled={formStatus.status === "loading" ? true : false}
                                        type="submit"
                                    >{yml.left.button.button_text}</Button>
                                </Row>
                            </Column>
                        }

                        <HR background="#F5F5F5" height="7px" width="100%" width_md="7px" height_md="auto" margin="28px 0" margin_md="0px 82px" />
            
                        <Column size="6" size_md="12" flex_tablet="1" justifyContent="left" background={Colors.white} br_xs="1.25rem" br_sm="1.25rem" br_md="1.25rem" h_xs="auto" h_sm="auto" h_md="auto" paddingLeft="0" paddingRight="0"  alignSelf="unset" height="100%"  >
                                <Column disp_sm="flex" disp_md="grid" templateColumns="repeat(4, 1fr)" size="10" height="100%" minWidth="fit-content" flexDirection="column"  paddingLeft="0" paddingRight="0" p_md="10px 0px">
                                   
                                    {yml.right.content_section.map((item, i) => {
                                        return <Paragraph
                                            key={i}
                                            fs_sm="16px"
                                            fontSize="16px"
                                            dangerouslySetInnerHTML={{__html: item}}
                                            margin="5px"
                                            display="flex"
                                            m_sm="2px"
                                            align="left"
                                            textAlign="left"
                                            color={Colors.black}
                                        >
                                        </Paragraph>;
                                    })}
                                </Column>
                        </Column>

                    </Row>
                </Card>
                </Column>
            </Container>
        </form>
    )
};
export const query = graphql`
  query ContactQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            greetings
            tagline
            sub_heading
            sub_headingFAQ
            pathFAQ
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
            banner {
               tagline
            }
            fields {
              lang
            }
        }
      }
    }
  }
`;
export default BaseRender(Contact);