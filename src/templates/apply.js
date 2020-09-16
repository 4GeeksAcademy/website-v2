import React, {useState, useContext} from 'react';
import {navigate} from 'gatsby';
import Layout from '../global/Layout';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H3, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Card} from '../components/Card'
import {Input, Alert} from '../components/Form'
import BaseRender from './_baseRender'
import {SessionContext} from '../session.js'
import {apply} from "../actions";
import {BrowserView, MObileView, isBrowser, isMobile} from "react-device-detect";
import Testimonials from '../components/Testimonials'

const formIsValid = (formData=null) => {
    if(!formData) return null;
    for(let key in formData){
        if(!formData[key].valid) return false;
    }
    return true;
}
const Apply = (props) => {
    const {data, pageContext, yml} = props;
    const { session } = useContext(SessionContext);
    const [ formStatus, setFormStatus ] = useState({ status: "idle", msg: "Apply"});
    const [formData, setVal] = useState({
        first_name: {value: '', valid: false},
        last_name: {value: '', valid: false},
        phone: {value: '', valid: false},
        email: {value: '', valid: false},
        location: {value: '', valid: false},
        referral_key: {value: '', valid: true}
    });
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if(formStatus.status === "error"){
                            setFormStatus({ status: "idle", msg: "Resquest" })
                            }
            if (!formIsValid(formData)) setFormStatus({status: "error", msg: "There are some errors in your form"});
            else {
                setFormStatus({status: "loading", msg: "Loading..."});
                apply(formData, session)
                    .then(data => {
                        if (data.error !== false) {
                            setFormStatus({status: "error", msg: "Fix errors"});
                        }
                        else {
                            setFormStatus({status: "thank-you", msg: "Thank you"});
                            // console.log("Thank you");
                            navigate('/thank-you/apply');
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
                github={`/page/apply.${pageContext.lang}.yml`}
                >
                <Title
                    title={yml.tagline}
                    paragraph={yml.sub_heading}
                    variant="primary"
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
                                borderRadius="0 1.25rem 1.25rem 1.25rem"

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
                                                    errorMsg="Please specify a valid last name"
                                                    required
                                                    onChange={(value, valid) => {setVal({...formData, last_name: {value, valid}})
                                                    if(formStatus.status === "error"){
                                                    setFormStatus({ status: "idle", msg: "Resquest" })
                                                }
                                                }}
                                                    value={formData.last_name.value}
                                                />
                                            </Row>
                                            <Row height="50px">
                                                <Input type="email" className="form-control" placeholder={yml.left.form_section.email}
                                                    errorMsg="Please specify a valid email"
                                                    required
                                                    onChange={(value, valid) => {setVal({...formData, email: {value, valid}})
                                                    if(formStatus.status === "error"){
                                                    setFormStatus({ status: "idle", msg: "Resquest" })
                                                }
                                                }}
                                                    value={formData.email.value}
                                                />
                                            </Row>
                                            <Row height="50px">
                                                <Input
                                                    type="phone" className="form-control" placeholder={yml.left.form_section.phone}
                                                    errorMsg="Please specify a valid phone number"
                                                    required
                                                    onChange={(value, valid) => {setVal({...formData, phone: {value, valid}})
                                                    if(formStatus.status === "error"){
                                                    setFormStatus({ status: "idle", msg: "Resquest" })
                                                }
                                                }}
                                                    value={formData.phone.value}
                                                />
                                            </Row>
                                            <Row height="40px">
                                                <Paragraph padding="0.375rem 0.75rem" fontSize="13px" lineHeight="16px" color={Colors.black}>Select a location</Paragraph>
                                            </Row>
                                            <Row>
                                                {formStatus.status === "error" && !formData.location.valid && <Alert color="red">Please pick a location</Alert>}
                                                { session.locations && session.locations.map(l => 
                                                    <Button key={l.meta_info.slug} width="50%" 
                                                        color={l.meta_info.slug === formData.location.value ? Colors.lightYellow : Colors.lightGray} 
                                                        borderRadius="0" 
                                                        colorHover={Colors.verylightGray}
                                                        onClick={(e) => setVal({...formData, location: { value: l.meta_info.slug, valid: true }})}
                                                    >
                                                        <Paragraph color={Colors.gray}>{l.city}, {l.country}</Paragraph>
                                                    </Button>
                                                )}
                                            </Row>
                                            <Row marginTop="10px">
                                                <Input type="text" className="form-control" placeholder={yml.left.referral_section.placeholder} 
                                                    value={formData.referral_key.value}
                                                    onChange={(value, valid) => setVal({...formData, referral_key: {value, valid}})}
                                                />
                                            </Row>
                                            <Row height="20px">
                                                <Paragraph padding="0.375rem 0.75rem" fontSize="10px" lineHeight="16px" color={Colors.black}>{yml.left.referral_section.content}</Paragraph>
                                            </Row>
                                            <Row >
                                                {formStatus.status === "error" && <Alert color="red">{formStatus.msg}</Alert>}
                                                <Button type="submit"
                                                    width="150px"
                                                    move="up" up="15px" color={formStatus.status === "loading" ? Colors.darkGray:  Colors.blue} textColor={Colors.white}
                                                    margin="2rem 0" padding=".45rem 3rem"
                                                    disabled={formStatus.status === "loading" ? true: false}
                                                >{yml.left.button.button_text}</Button>
                                            </Row>
                                        </Column>
                                    </Row>

                                </Column>

                                <Column size="4" customRespSize respSize="12" color={Colors.black} br_xs="1.25rem" br_sm="1.25rem" br_md="1.25rem" h_xs="auto" h_sm="auto" h_md="auto" m_xs="35px 0" m_sm="35px 0" m_md="35px 0" alignSelf="center" height="100%"  >
                                    <Row align="center" height="100%">
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
                                            <Divider height="30px" />

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
            <Divider height="150px" />
                <Wrapper >
                    <Title
                         variant="primary"
                        title={yml.testimonial_header.heading}
                        paragraph={yml.testimonial_header.sub_heading}
                        maxWidth="66%"
                        // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
                    />
                <Divider height="20px" />
                <Testimonials lang={data.allTestimonialsYaml.edges} /></Wrapper>
            <Divider height="100px" />
        </form>
    )
};
export const query = graphql`
  query ApplyQuery($file_name: String!, $lang: String!) {
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
                referral_section {
                  placeholder
                  content
                }
              }
            right{
                heading
                content_section
            }
            testimonial_header{
                heading
                sub_heading
            }
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
          node {
            testimonials {
              student_name
              testimonial_date
              student_thumb{
                childImageSharp {
                  fluid(maxWidth: 200){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                  fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
              starts
              content
              source_url
              source_url_text
            }
          }
        }
    }
  }
`;
export default BaseRender(Apply);