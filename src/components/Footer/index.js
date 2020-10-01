import React, {useState} from 'react';
import {Container, Row, Column} from '../Sections'
import {Colors, RoundImage, Anchor, Button} from '../Styling'
import {H2, H4, H5, Separator, Paragraph} from '../Heading'
import {newsletterSignup} from "../../actions"
import {Input} from "../Form"
import styled from 'styled-components';

const formIsValid = (formData = null) => {
    if (!formData) return null;
    for (let key in formData) {
        if (!formData[key].valid) return false;
    }
    return true;
}

const Form = styled.form`
    margin: auto;
    padding: 20px;
    max-width: 600px;
    display: flex;
`;

const Footer = ({ yml, session }) => {
    const [formStatus, setFormStatus] = useState({ status: "idle", msg: "Resquest" });
    const [formData, setVal] = useState({
        email: { value: '', valid: false },
        consent: { value: true, valid: true },
    });
    console.log("Footer YML", yml)
    return (
    <Container github="/components/footer" 
        width="fluid" 
        height="auto" 
        color={Colors.black} 
        p_top="25px" 
        p_bottom="135px"
        p_xs="25px 15px 155px 15px"
    >
        <Row align="center" margin="20px 0 30px 0">
            {formStatus.status === "thank-you" ? 
                <H4 fontSize="18px" margin="10px 0" color={Colors.lightGreen} align="center">{yml.newsletter.thankyou}</H4>
                :
                <Column size="12" margin={"0"}>
                    <H2 color="white" align="center">{yml.newsletter.heading}</H2>
                    <Paragraph margin="5px 0 0 0" color="white" align="center">{yml.newsletter.paragraph}</Paragraph>
                    <Form onSubmit={(e) => {
                            e.preventDefault();
                            if(formStatus.status === "error"){
                                setFormStatus({ status: "idle", msg: "Resquest" })
                                }
                            if (!formIsValid(formData)){
                                setFormStatus({ status: "error", msg: "There are some errors in your form" });
                            } 
                            else {
                                setFormStatus({ status: "loading", msg: "Loading..." });
                                newsletterSignup(formData, session)
                                    .then(data => {
                                        if (data.error !== false && data.error !== undefined) {
                                            setFormStatus({ status: "error", msg: "Fix errors" });
                                        }
                                        else {
                                            setFormStatus({ status: "thank-you", msg: "Thank you" });
                                        }
                                    })
                                    .catch(error => {
                                        console.log("error", error);
                                        setFormStatus({ status: "error", msg: error.message || error });
                                    })
                            }
                        }}>
                            <Input type="email" className="form-control" width="50%" placeholder="Email *"
                                borderRadius="10px 0px 0px 10px"
                                margin="0"
                                onChange={(value,valid) => {
                                setVal({ ...formData, email: {value,valid} })
                                if(formStatus.status === "error"){
                                    setFormStatus({ status: "idle", msg: "Resquest" })
                                }
                            }}
                                value={formData.email.value}
                                errorMsg="Please specify a valid email"
                                required
                            />
                            <Button width="50%" type="submit"
                                borderRadius="0px 10px 10px 0"
                                color={formStatus.status === "loading" ? Colors.darkGray:  Colors.blue}
                                textColor={Colors.white}
                                disabled={formStatus.status === "loading" ? true: false}
                            >{formStatus.status === "loading" ? "Loading...": yml.newsletter.button_text}</Button>
                    </Form>
                </Column>
            }
        </Row>
        <Row align="center" margin="0 8%" m_md="0 4%">
            {yml.footer.map((item, index) => {
                return (
                    <Column key={index} size={item.width} size_sm="6" margin={"0 0 20px 0"}>
                        <H5 align="left" type="div" fontSize="16px" color={Colors.gray}>{item.heading}&nbsp;</H5>
                        <Separator width_sm="100%" width="100%" variant={"primary"}></Separator>
                        <ul
                            style={{
                                columnCount: item.items.length > 5 ? 2 : 1,
                                columnGap: "10px"
                            }}
                        >
                        {item.items.map((ln, i) => {
                            return (
                                <Anchor
                                    key={i}
                                    cursor="pointer"
                                    to={ln.link}
                                    align="left"
                                    align_sm="left"
                                    margin="0 0 5px 0"
                                    fontSize="16px"
                                    color={Colors.white}
                                >
                                    {ln.name}
                                </Anchor>
                            )
                        })}
                        </ul>
                    </Column>
                )
            })}
        </Row>
        <Row height="20%">
            <Column disp_md="none" size="2"></Column>
            <Column size="8" size_md="11">
                <Row align="center">
                    <Column size="6" margin="5px 0">
                        <Paragraph fontSize="12px" color={Colors.gray}>@ 4Geeks Academy LLC 2019 </Paragraph>
                    </Column>
                    <Column size="6" margin="5px 0" customRespSize respSize="6">
                        <Row align="around">
                            <Column size="4"  selfAlign="center">
                                <Paragraph fontSize="10px" color={Colors.gray}>We accept: </Paragraph>
                            </Column>
                            <Column size="4" >
                                <RoundImage url="/images/bitcoin.png" height="10px" backgroundColor="transparent" position="center" bsize="contain" />
                            </Column>
                            <Column size="4" >
                                <RoundImage url="/images/ethereum.png" height="12px" backgroundColor="transparent" position="center" bsize="contain" />
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Column>
        </Row>
    </Container>
    )
};

export default Footer;

