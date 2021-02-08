import React, {useState} from 'react';
import {Container, Row, Column, Grid, Div} from '../Sections'
import {Colors, RoundImage, Anchor, Button} from '../Styling'
import {H2, H3, H4, H5, Separator, Paragraph} from '../Heading'
import {Devices} from '../Responsive'
import Icon from '../Icon'
import {newsletterSignup} from "../../actions"
import {SessionContext} from '../../session';
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
    margin: 0 11px 0 0;
    width: 100%;
    display: flex;
    @media  ${Devices.xs}{
    }
    @media  ${Devices.md}{
    }
`;

const Footer = ({yml}) => {
    const {session} = React.useContext(SessionContext);
    const [formStatus, setFormStatus] = useState({status: "idle", msg: "Resquest"});
    const [formData, setVal] = useState({
        email: {value: '', valid: false},
        consent: {value: true, valid: true},
    });

    return (
        <>
            <Container github="/components/footer"
                variant="fluid"
                height="auto"
                background={Colors.white}
                padding="0 17px 17px 17px"
                margin="53px 0 0 0"

            // padding_md="44px 175px"
            >
                <Container variant="fixed" padding="27px 17px 17px 17px" style={{borderTop: `1px solid ${Colors.lightGray}`}}>
                    <Grid columns="1" columns_md="12" rows_md="1" gridGap="11px">
                        <Div
                            justifyContent="center"
                            alignItems="center"
                            height="43px"
                            width="100%"
                            width_md="143px"
                            height_md="100%"
                            borderRadius="3px"
                            gridArea_md="1/1/2/3"
                        >
                            <RoundImage url="/images/logoweb.png" height="43px" width="143px" backgroundColor="transparent" position="center" bsize="contain" />
                        </Div>
                        <Div
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            height="43px"
                            width="100%"
                            width_md="100%"
                            height_md="100%"
                            borderRadius="3px"
                            gridArea_md="1/9/2/13"
                        >
                            <H4 margin="0 0 10px 0" display="none" display_md="block">{yml.newsletter.heading}</H4>
                            <Div>
                                <Icon icon="twitter" style={{margin: "0 15px 0 0"}} height="32px" width="32px" />
                                <Icon icon="facebook" style={{margin: "0 15px 0 0"}} color={Colors.black} fill={Colors.black} height="32px" width="32px" />
                                <Icon icon="instagram" style={{margin: "0 15px 0 0"}} height="32px" width="32px" />
                                {/* <Icon icon="youtube" style={{margin: "0 15px 0 0"}} height="32px" width="32px" /> */}
                                <Icon icon="github" style={{margin: "0 15px 0 0"}} height="32px" width="32px" />
                            </Div>
                        </Div>
                        <Div
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            padding="0 40px"
                            height="43px"
                            width="100%"
                            borderRadius="3px"
                            width_md="100%"
                            height_md="100%"
                            gridArea_md="1/3/2/9"
                            borderRight_md={`1px solid ${Colors.lightGray}`}
                        >
                            <H4 margin="0 0 10px 0" display="none" display_md="block">{yml.newsletter.heading}</H4>
                            <Div justifyContent="center" width="100%">
                                <Form onSubmit={(e) => {
                                    e.preventDefault();
                                    if (formStatus.status === "error") {
                                        setFormStatus({status: "idle", msg: "Resquest"})
                                    }
                                    if (!formIsValid(formData)) {
                                        setFormStatus({status: "error", msg: "There are some errors in your form"});
                                    }
                                    else {
                                        setFormStatus({status: "loading", msg: "Loading..."});
                                        newsletterSignup(formData, session)
                                            .then(data => {
                                                if (data.error !== false && data.error !== undefined) {
                                                    setFormStatus({status: "error", msg: "Fix errors"});
                                                }
                                                else {
                                                    setFormStatus({status: "thank-you", msg: "Thank you"});
                                                }
                                            })
                                            .catch(error => {
                                                console.log("error", error);
                                                setFormStatus({status: "error", msg: error.message || error});
                                            })
                                    }
                                }}>
                                    <Input type="email" className="form-control" width="100%" placeholder="Email *"
                                        borderRadius="3px"
                                        bgColor={Colors.white}
                                        margin="0"
                                        onChange={(value, valid) => {
                                            setVal({...formData, email: {value, valid}})
                                            if (formStatus.status === "error") {
                                                setFormStatus({status: "idle", msg: "Resquest"})
                                            }
                                        }}
                                        value={formData.email.value}
                                        errorMsg="Please specify a valid email"
                                        required
                                    />
                                </Form>
                                <Button width="40px" height="40px" type="submit"
                                    fontSize="22px"
                                    padding="0"
                                    borderRadius="3px"
                                    color={formStatus.status === "loading" ? Colors.darkGray : Colors.black}
                                    textColor={Colors.white}
                                    disabled={formStatus.status === "loading" ? true : false}
                                >{formStatus.status === "loading" ? "Loading..." : <Icon icon="email" height="16px" width="16px" color={Colors.white} fill={Colors.white} />}
                                </Button>
                            </Div>
                        </Div>

                    </Grid>
                    <Grid columns="1" columns_tablet="4" >
                        {yml.footer.map((item, i) => {
                            return (
                                <Div key={i} flexDirection="column">
                                    <H3 color={Colors.darkGray} margin="54px 0 11px 0" textAlign="left" fontSize="15px" fontWeight="900" lineHeight="19px">{item.heading}</H3>
                                    <ul
                                        style={{
                                            columnCount: item.items.length > 5 ? 2 : 1,
                                            columnGap: "10px",
                                        }}
                                    >
                                        {item.items.map((ln, i) => {

                                            return (
                                                <Anchor
                                                    key={i}
                                                    cursor="pointer"
                                                    to={ln.link}
                                                    textAlign="left"
                                                    margin="0 0 5px 0"
                                                    fontSize="13px"
                                                    lineHeight="22px"
                                                    fontWeight="400"
                                                    textTransform="uppercase"
                                                    color={Colors.black}
                                                >
                                                    {ln.name}
                                                </Anchor>
                                            )
                                        })}
                                    </ul>
                                </Div>
                            )
                        })}
                    </Grid>
                </Container>
            </Container>

            <Grid columns_md="12" rows_md="1" gridGap="0" display="none" display_md="grid" padding_md="23px 0">
                <Div gridArea_md="1/7/1/11" justifyContent="end" alignItems="center">
                    <H4 fontSize="13px" lineHeight="22px" width="fit-content" color={Colors.darkGray} >We accept: </H4>
                    <RoundImage url="/images/bitcoin.png" height="10px" width="65px" bsize="contain" margin="0 15px" />
                    <RoundImage url="/images/ethereum.png" height="20px" width="65px" bsize="contain" />
                </Div>
            </Grid>
            <Grid columns_md="12" rows_md="1" gridGap="0" height="140px" height_md="81px" background={Colors.verylightGray} >
                <Div gridArea_md="1/6/1/11" justifyContent="end"
                    alignItems="center"
                    flexDirection="column"
                    flexDirection_md="row"
                    width="100%"
                    width_md="100%"
                    height_md="100%"
                >
                    <Div>
                        <H4 fontSize="13px" lineHeight="22px" width="fit-content" color={Colors.darkGray} >Políticas de Privacidad</H4>
                        <H4 fontSize="13px" lineHeight="22px" width="fit-content" color={Colors.darkGray} margin="0 30px">Políticas de Cookies</H4>
                    </Div>
                    <H4 fontSize="13px" lineHeight="22px" width="fit-content" color={Colors.darkGray}>Términos y Condiciones</H4>
                </Div>
                <Div gridArea_md="1/3/1/6" justifyContent="center"
                    alignItems="center"
                    height_md="100%"
                >
                    <H4 fontSize="13px" lineHeight="22px" textAlign_md="left" color={Colors.darkGray}>@ 4Geeks Academy LLC 2019</H4>
                </Div>
            </Grid>
        </>
    )
};

export default Footer;

