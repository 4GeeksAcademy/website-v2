import React, {useContext, useState} from "react";
import {Alert, Input} from "../Form/index";
import {Row, Column} from "../Sections";
import {H4, Paragraph} from "../Heading";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {SessionContext} from '../../session';
import {Button, Colors} from "../Styling";
import {Break} from "../Responsive";
import {useStaticQuery, graphql, navigate} from 'gatsby';

const formIsValid = (formData = null) => {
    if (!formData) return null;
    for (let key in formData) {
        if (formData[key].value === "" && formData[key].required === false) continue;
        if (!formData[key].valid) return false;
    }
    return true;
}

const Form = styled.form`
    margin: auto;
    padding: 20px;
    max-width: 600px;
    @media  ${Break.sm}{
        display: ${props => props.d_sm};
    }
`;

const _fields = {
    first_name: {value: '', valid: false, required: true, type: 'text', place_holder: "First name *", error: "Please specify a valid first name"},
    full_name: {value: '', valid: false, required: true, type: 'text', place_holder: "Full name *", error: "Please specify a valid full name"},
    last_name: {value: '', valid: false, required: false, type: 'text', place_holder: "Last name", error: "Please specify a valid last name"},
    email: {value: '', valid: false, required: true, type: 'email', place_holder: "Your email *", error: "Please specify a valid email"},
    phone: {value: '', valid: false, required: true, type: 'phone', place_holder: "Phone number", error: "Please specify a valid phone"},
    consent: {value: true, valid: true, required: true, type: 'text', place_holder: "", error: "You need to accept the privacy terms"},
}

const clean = (fields, data) => {
    let cleanedData = {...data};


    Object.keys(cleanedData).forEach(key =>
        // i also make sure I don't delete the hidden fields
        cleanedData[key].type !== 'hidden' &&
        //clean all the rest of the fields that are no supposed to be sent 
        //according to the landing YML data
        !fields.includes(key) &&
        delete cleanedData[key]
    );

    // forget about the full_name, its relly first_name
    if (cleanedData.full_name !== undefined) {
        cleanedData.first_name = cleanedData.full_name;
        delete cleanedData.full_name;
    }

    console.log("FormData Before sending", cleanedData, data, fields)
    return cleanedData;
}

const LeadForm = ({d_sm, fields, thankyou, heading, redirect, formHandler, data, handleClose, style, sendLabel, lang, motivation, layout, inputBgColor}) => {
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
        allLeadFormYaml{
          edges{
                node{
                    fields{
                        lang
                    }
                    messages{
                        loading
                        success
                        error
                    }
                    form_fields{
                        name
                        required
                        type
                        place_holder
                        error
                    }
                }
            }
        }
    }
    `)

    let page = _query.allPageYaml.edges.find(({node}) => node.fields.lang === lang);
    let form = _query.allLeadFormYaml.edges.find(({node}) => node.fields.lang === lang);
    let yml = {...page.node, ...form.node};

    const [formStatus, setFormStatus] = useState({status: "idle", msg: ""});
    const [formData, setVal] = useState(_fields);
    const {session} = useContext(SessionContext);
    React.useEffect(() => {
        setVal(_data => {
            const _ = Object.keys(_data).reduce((total, key) => {
                if (_data[key] !== undefined) {
                    const field = yml.form_fields.find(f => f.name === key);
                    return {...total, [key]: {..._data[key], ...field}};
                }
            }, {})

            return ({..._, ...data, utm_url: {type: "hidden", value: window.location.href, valid: true}})
        })
    }, [data])
    return <Form d_sm={d_sm} style={style} onSubmit={(e) => {
        e.preventDefault();

        if (formStatus.status === "error") setFormStatus({status: "idle", msg: ""})

        const cleanedData = clean(fields, formData);
        if (!formIsValid(cleanedData)) {
            setFormStatus({status: "error", msg: yml.messages.error});
        }
        else {
            setFormStatus({status: "loading", msg: yml.messages.loading});
            formHandler(cleanedData, session)
                .then(data => {
                    if (data && data.error !== false && data.error !== undefined) {
                        setFormStatus({status: "error", msg: data.error});
                    }
                    else {
                        if (redirect && redirect !== "") {
                            if (redirect.indexOf("http") > -1) window.location.href = redirect;
                            else navigate(redirect);
                        }
                        else setFormStatus({status: "thank-you", msg: yml.messages.success});
                    }
                })
                .catch(error => {
                    console.error("error", error);
                    setFormStatus({status: "error", msg: error.message || error});
                })
        }
    }}>
        {heading && <H4 fontSize="25px" margin="20px 0px 0px 0px">{heading}</H4>}
        {formStatus.status === "thank-you" ?
            <Paragraph align="center" margin="20px 0px 0px 0px">{thankyou || formStatus.msg}</Paragraph>
            :
            <>
                {motivation && <Paragraph align="center" margin="20px 0px 0px 0px">{motivation}</Paragraph>}
                <Row display="flex">
                    <Column display={layout} className={"leadform-" + layout} size="12" paddingLeft="0" paddingRight="0">
                        {fields.filter(f => formData[f].type !== 'hidden').map((f, i) => {
                            const _field = formData[f]
                            return <Input
                                key={i}
                                bgColor={inputBgColor}
                                borderRadius={i === 0 && layout === "flex" ? "10px 0px 0px 10px" : "0"}
                                type={_field.type} className="form-control" placeholder={_field.place_holder}
                                onChange={(value, valid) => {
                                    setVal({...formData, [f]: {..._field, value, valid}});
                                    if (formStatus.status === "error") {
                                        setFormStatus({status: "idle", msg: "Request"})
                                    }
                                }}
                                value={_field.value}
                                errorMsg={_field.error}
                                required={_field.required}
                                on
                            />
                        })}
                        {layout === "flex" &&
                            <Button width="100%" padding=".7rem .45rem"
                                type="submit"
                                margin="10px 0"
                                borderRadius="0px 10px 10px 0px"
                                color={formStatus.status === "loading" ? Colors.darkGray : Colors.red}
                                textColor={Colors.white}
                                disabled={formStatus.status === "loading" ? true : false}
                            >{formStatus.status === "loading" ? "Loading..." : sendLabel}</Button>
                        }
                    </Column>
                    {session && session.location && session.location.gdpr_compliant &&
                        <Paragraph fontSize="11px" margin="5px 0 0 0">
                            <input
                                name="isGoing"
                                type="checkbox"
                                checked={formData.consent.valid}
                                onChange={() => setVal({...formData, consent: {...formData.consent, valid: !formData.consent.valid}})} />
                            {yml.consent.message}
                            <a target="_blank" rel="noopener noreferrer" className="decorated" href={yml.consent.url}>{yml.consent.link_label}</a>
                        </Paragraph>
                    }
                    {formStatus.status === "error" && <Alert color="red" margin="0 15px" padding="5px 0 0 0">{formStatus.msg}</Alert>}
                </Row>
                {layout === "block" &&
                    <Row display="flex" padding="5px 0 0 0" >
                        {handleClose && <Column size="6" padding="10px 20px">
                            <Button width="100%" padding=".7rem .45rem" color={Colors.gray} textColor={Colors.white} onClick={handleClose}>Close</Button>
                        </Column>}
                        <Column size={handleClose ? "6" : "12"} padding="10px 20px" margin="auto">
                            <Button width="100%" padding=".7rem .45rem"
                                type="submit"
                                color={formStatus.status === "loading" ? Colors.darkGray : Colors.red}
                                textColor={Colors.white}
                                disabled={formStatus.status === "loading" ? true : false}
                            >{formStatus.status === "loading" ? "Loading..." : sendLabel}</Button>
                        </Column>
                    </Row>
                }
            </>
        }
    </Form>
}

LeadForm.propTypes = {
    heading: PropTypes.string,
    motivation: PropTypes.string,
    sendLabel: PropTypes.string,
    redirect: PropTypes.string,
    layout: PropTypes.string,
    fields: PropTypes.array,
    formHandler: PropTypes.func,
    handleClose: PropTypes.func
}
LeadForm.defaultProps = {
    heading: null,
    motivation: null,
    sendLabel: "SEND",
    formHandler: null,
    redirect: null,
    handleClose: null,
    layout: "block",
    inputBgColor: Colors.lightGray,
    data: {},
    fields: ['full_name', 'phone', 'email'],
}
export default LeadForm;
