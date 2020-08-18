import React, {useContext, useState } from "react";
import { Alert, Input } from "../Form/index";
import { Row, Column } from "../Sections";
import { H4, Paragraph } from "../Heading";
import PropTypes from 'prop-types';
import {SessionContext} from '../../session';
import { Button, Colors } from "../Styling";
import { makeStyles} from '@material-ui/core/styles';


const formIsValid = (formData = null) => {
    if (!formData) return null;
    for (let key in formData) {
        if (!formData[key].valid) return false;
    }
    return true;
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${50}%`,
        left: `${50}%`,
        transform: `translate(-${50}%, -${50}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        height: 300,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '1.25rem',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const LeadForm = ({heading, formHandler, handleClose}) => {
    const [formStatus, setFormStatus] = useState({ status: "idle", msg: "Resquest" });
    const [formData, setVal] = useState({
        first_name: { value: '', valid: false },
        last_name: { value: '', valid: false },
        email: { value: '', valid: false },
    });
    const { session } = useContext(SessionContext);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [focus, setFocus] = useState("");
    return (
        <>
        
            <form onSubmit={(e) => {
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
                <div style={modalStyle} className={classes.paper}>
                            <Row height="20%" align="center">
                                <Column size="12" align="center"><H4>{heading}</H4></Column>
                            </Row>
                            <Row height="70%">
                                <Column size="12">
                                    <Row height="30%" align="center">
                                        <Column size="11" >
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
                                        </Column>
                                    </Row>
                                    <Row height="30%" align="center">
                                        <Column size="11">
                                            <Input type="text" className="form-control" placeholder="Last Name *"
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
                                        </Column>
                                    </Row>
                                    <Row height="30%" align="center">
                                        <Column size="11">
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
                                </Column>
                            </Row>
                            <Row height="10%" padding="5px 0 0 0" >
                                <Column size="6" customRespSize respSize="3" align="right" paddingRight="25px" paddingLeft="25px" p_sm="0 20px 0 20px" p_xs="0 20px 0 20px">
                                    <Button width="100%" padding=".3rem .45rem"
                                        type="submit"
                                        color={formStatus.status === "loading" ? Colors.darkGray:  Colors.blue}
                                        textColor={Colors.white}
                                        disabled={formStatus.status === "loading" ? true: false}
                                    >{formStatus.status === "loading" ? "Loading...": "Submit"}</Button>
                                </Column>
                                <Column size="6" customRespSize respSize="3" align="right" paddingRight="25px" paddingLeft="25px" p_sm="0 20px 0 20px" p_xs="0 20px 0 20px">
                                    <Button  width="100%" padding=".3rem .45rem" color={Colors.red} textColor={Colors.white} onClick={handleClose}>Close</Button>
                                </Column>
                            </Row>
                    </div>
                </form>
        
        </>
    );
}

export default LeadForm;

LeadForm.propTypes = {
    heading: PropTypes.string,
    formHandler: PropTypes.func,
    handleClose: PropTypes.func
}