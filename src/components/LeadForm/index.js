import React, {useContext, useState } from "react";
import { Alert, Input } from "../Form/index";
import { Row, Column } from "../Sections";
import { H2 } from "../Heading";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {SessionContext} from '../../session';
import { Button, Colors } from "../Styling";

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


const LeadForm = ({heading, formHandler, data, handleClose}) => {
    const [formStatus, setFormStatus] = useState({ status: "idle", msg: "Resquest" });
    const [formData, setVal] = useState({
        first_name: { value: '', valid: false },
        last_name: { value: '', valid: false },
        email: { value: '', valid: false },
    });
    const { session } = useContext(SessionContext);
    useEffect(() => {
        setVal(_data => ({ ..._data, data, utm_url: window.location.href }))
    },[data])
    return (
        <Form onSubmit={(e) => {
                e.preventDefault();
                if(formStatus.status === "error"){
                    setFormStatus({ status: "idle", msg: "Resquest" })
                    }
                if (!formIsValid(formData)) setFormStatus({ status: "error", msg: "There are some errors in your form" });
                else {
                    setFormStatus({ status: "loading", msg: "Loading..." });
                    formHandler(formData, session)
                        .then(data => {
                            if (data.error !== false && data.error !== undefined) {
                                setFormStatus({ status: "error", msg: "Fix errors" });
                            }
                            else {
                                setFormStatus({ status: "thank-you", msg: "Thank you" });
                                navigate('/thank-you/apply');
                            }
                        })
                        .catch(error => {
                            console.log("error", error);
                            setFormStatus({ status: "error", msg: error.message || error });
                        })
                }
            }}>
            <H2 margin="20px 0px 40px 0px">{heading}</H2>
            <Row>
                <Column size="12">
                            <Input
                                type="text" className="form-control" placeholder="First name *"
                                onChange={(value,valid) => {
                                    setVal({ ...formData, first_name: { value,valid } });
                                    if(formStatus.status === "error"){
                                        setFormStatus({ status: "idle", msg: "Resquest" })
                                    }
                                }}
                                value={formData.first_name.value}
                                errorMsg="Please specify a valid first name"
                                required
                                on
                            />
                            <Input type="text" placeholder="Last Name *"
                                onChange={(value,valid) =>{ 
                                setVal({ ...formData, last_name: {value,valid} })
                                if(formStatus.status === "error"){
                                        setFormStatus({ status: "idle", msg: "Resquest" })
                                }
                            }}
                                value={formData.last_name.value}
                                errorMsg="Please specify a valid last name"
                                required
                            />
                            <Input type="email" className="form-control" placeholder="Email *"
                                onChange={(value,valid) => {
                                setVal({ ...formData, email: {value,valid} })
                                if(formStatus.status === "error"){
                                    setFormStatus({ status: "idle", msg: "Resquest" })
                                }
                            }}
                                value={formData.email.value}
                                errorMsg="Please specify a valid email"
                                required
                                style={{marginBottom: "5px"}}
                            />
                            {formStatus.status === "error" && <Alert color="red"  padding="5px 0 0 0">{formStatus.msg}</Alert>}
                </Column>
            </Row>
            <Row padding="5px 0 0 0" >
                <Column size="6" padding="10px 20px">
                    <Button width="100%" padding=".7rem .45rem"
                        type="submit"
                        color={formStatus.status === "loading" ? Colors.darkGray:  Colors.blue}
                        textColor={Colors.white}
                        disabled={formStatus.status === "loading" ? true: false}
                    >{formStatus.status === "loading" ? "Loading...": "SEND"}</Button>
                </Column>
                <Column size="6" padding="10px 20px">
                    <Button  width="100%" padding=".7rem .45rem" color={Colors.red} textColor={Colors.white} onClick={handleClose}>Close</Button>
                </Column>
            </Row>
        </Form>
    );
}

export default LeadForm;

LeadForm.propTypes = {
    heading: PropTypes.string,
    formHandler: PropTypes.func,
    handleClose: PropTypes.func
}