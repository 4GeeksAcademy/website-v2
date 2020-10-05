import React, {useContext, useState } from "react";
import { Alert, Input } from "../Form/index";
import { Row, Column } from "../Sections";
import { H4, Paragraph } from "../Heading";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {SessionContext} from '../../session';
import { Button, Colors } from "../Styling";
import {useStaticQuery, graphql, navigate} from 'gatsby';

const formIsValid = (formData = null) => {
    if (!formData) return null;
    for (let key in formData) {
        if (!formData[key].valid) return false;
    }
    return true;
}

const Form = styled.form`
    margin: auto;
    margin-top: 80px;
    padding: 20px;
    max-width: 600px;
`;

const _fields = {
    first_name: { value: '', valid: false, required: true, type: 'text', ph: "First name *", error: "Please specify a valid first name" },
    full_name: { value: '', valid: false, required: true, type: 'text', ph: "Full name *", error: "Please specify a valid full name" },
    last_name: { value: '', valid: false, required: false, type: 'text', ph: "Last name", error: "Please specify a valid last name" },
    email: { value: '', valid: false, required: true, type: 'email', ph: "Your email *", error: "Please specify a valid email" },
    phone: { value: '', valid: false, required: false, type: 'phone', ph: "Phone number", error: "Please specify a valid phone" },
    consent: { value: true, valid: true, required: true, type: 'text', ph: "", error: "You need to accept the privacy terms" },
}

const clean = (fields, data) => {
    let cleanedData = {...data};
    //clean all fields that are no supposed to be sent to the server
    Object.keys(cleanedData).forEach(key => !fields.includes(key) && delete cleanedData[key]);

    // forget about the full_name, its relly first_name
    if(cleanedData.full_name !== undefined){
        cleanedData.first_name = cleanedData.full_name;
        delete cleanedData.full_name;
    }

    console.log("FormData Before sending", cleanedData, fields)
    return cleanedData;
}

const LeadForm = ({fields, thankyou, heading, formHandler, data, handleClose, style, sendLabel, lang, motivation}) => {
    const _query = useStaticQuery(graphql`
    query LeadFormQuery {
        allPageYaml(filter: { fields: { file_name: { regex: "/privacy-policy/" }}}) {
          edges{
                node{
                    fields{
                        lang
                    }
                    consent{
                        message
                        link_label
                        url
                    }
                }
            }
        }
    }
    `)

    let yml = _query.allPageYaml.edges.find(({ node }) => node.fields.lang === lang);
    if(yml) yml = yml.node;

    const [formStatus, setFormStatus] = useState({ status: "idle", msg: "Resquest" });
    const [formData, setVal] = useState(_fields);
    const { session } = useContext(SessionContext);
    React.useEffect(() => {
        setVal(_data => ({ ..._data, ...data, utm_url: { value: window.location.href, valid: true } }))
    },[data])
    return <Form style={style} onSubmit={(e) => {
                e.preventDefault();

                if(formStatus.status === "error") setFormStatus({ status: "idle", msg: "Resquest" })
                    
                const cleanedData = clean(fields, formData);
                if (!formIsValid(cleanedData)){
                    setFormStatus({ status: "error", msg: "There are some errors in your form" });
                } 
                else {
                    setFormStatus({ status: "loading", msg: "Loading..." });
                    formHandler(cleanedData, session)
                        .then(data => {
                            if (data.error !== false && data.error !== undefined) {
                                setFormStatus({ status: "error", msg: "Fix errors" });
                            }
                            else {
                                setFormStatus({ status: "thank-you", msg: "Thank you. Check your email! 😁" });
                            }
                        })
                        .catch(error => {
                            console.log("error", error);
                            setFormStatus({ status: "error", msg: error.message || error });
                        })
                }
            }}>
            <H4 fontSize="25px" margin="20px 0px 0px 0px">{heading}</H4>
            { formStatus.status === "thank-you" ?
                <Paragraph align="center" margin="20px 0px 0px 0px">{thankyou || formStatus.msg}</Paragraph>
                :
                <>
                    <Paragraph align="center" margin="20px 0px 0px 0px">{motivation}</Paragraph>
                    <Row>
                        <Column size="12">
                            {fields.map(f => {
                                const meta = _fields[f];
                                return <Input
                                    type={meta.type} className="form-control" placeholder={meta.ph}
                                    onChange={(value,valid) => {
                                        setVal({ ...formData, [f]: { value,valid } });
                                        if(formStatus.status === "error"){
                                            setFormStatus({ status: "idle", msg: "Request" })
                                        }
                                    }}
                                    value={formData[f].value}
                                    errorMsg={meta.error}
                                    required={meta.required}
                                    on
                                />    
                            })}
                            {session && session.location && session.location.gdpr_compliant &&
                                <Paragraph fontSize="11px" margin="5px 0 0 0">
                                    <input
                                        name="isGoing"
                                        type="checkbox"
                                        checked={formData.consent.valid}
                                        onChange={() => setVal({ ...formData, consent: { ...formData.consent, valid: !formData.consent.valid } })} />
                                        {yml.consent.message}
                                        <a target="_blank"  rel="noopener noreferrer" className="decorated" href={yml.consent.url}>{yml.consent.link_label}</a>
                                </Paragraph>
                            }
                            {formStatus.status === "error" && <Alert color="red"  padding="5px 0 0 0">{formStatus.msg}</Alert>}
                        </Column>
                    </Row>
                    <Row padding="5px 0 0 0" >
                        { handleClose && <Column size="6" padding="10px 20px">
                            <Button  width="100%" padding=".7rem .45rem" color={Colors.gray} textColor={Colors.white} onClick={handleClose}>Close</Button>
                        </Column>}
                        <Column size={handleClose ? "6" : "12"} padding="10px 20px" margin="auto">
                            <Button width="100%" padding=".7rem .45rem"
                                type="submit"
                                color={formStatus.status === "loading" ? Colors.darkGray:  Colors.red}
                                textColor={Colors.white}
                                disabled={formStatus.status === "loading" ? true: false}
                            >{formStatus.status === "loading" ? "Loading...": sendLabel}</Button>
                        </Column>
                    </Row>
                </>
        }
        </Form>
}

LeadForm.propTypes = {
    heading: PropTypes.string,
    sendLabel: PropTypes.string,
    fields: PropTypes.array,
    formHandler: PropTypes.func,
    handleClose: PropTypes.func
}
LeadForm.defaultProps = {
    heading: "",
    sendLabel: "SEND",
    formHandler: null,
    handleClose: null,
    data: {},
    fields: ['full_name', 'email'],
}
export default LeadForm;
