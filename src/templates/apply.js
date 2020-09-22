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
        if(!formData[key].valid) return key;
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
        consent: {value: true, valid: true},
        referral_key: {value: '', valid: true}
    });
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        // Pre-fill the location
        let _location = urlParams.get('location');
        if(!_location && session.location) _location = session.location.active_campaign_location_slug;
        
        if(typeof(_location) === "string" && session.locations) _location = session.locations.find(l => l.active_campaign_location_slug === _location || l.breathecode_location_slug === _location);
        else _location = null;

        if(_location) _location = _location.active_campaign_location_slug;
        
        // Pre-fill the course
        let _course = urlParams.get('course');
        if(!_course && props.location.state) _course = props.location.state.course;
        
        if(typeof(_course) === "string") _course = data.allCourseYaml.edges.find(c => c.node.meta_info.bc_slug === _course);
        if(_course) _course = _course.node.meta_info.bc_slug;
        
        // Pre-fill the utm_url
        let _utm_url = undefined;
        if(props.location.state) _utm_url = { value: props.location.state.prevUrl, valid: true };
        console.log("props.location.state", props.location.state)

        setVal(_val => ({
            ..._val,
            utm_url: _utm_url,
            location: {value: _location || "", valid: typeof(_location) === "string" && _location !== ""},
            course: {value: _course || undefined, valid: true},//it has to be valid because the user has no option to pick one
        }));
    }, [session])

    let privacy = data.privacy.edges.find(({ node }) => node.fields.lang === pageContext.lang);
    if(privacy) privacy = privacy.node;

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if(formStatus.status === "error") setFormStatus({ status: "idle", msg: "Resquest" })

            const valid = formIsValid(formData);
            if (valid !== true){
                setFormStatus({status: "error", msg: "There are some errors in your form: "+valid});
                console.log("formData", formData)
            } 
            else {
                setFormStatus({status: "loading", msg: "Loading..."});
                apply(formData, session)
                    .then(data => {
                        if (typeof(data.error) !== "undefined") {
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
            <Wrapper
                github={`/page/apply.${pageContext.lang}.yml`}
                >
                <Title
                    title={yml.tagline}
                    variant="primary"
                    size="8"
                />
                <Row
                    shadow
                    background="#000000"
                    height="100%"
                    marginLeft="0"
                    marginRight="0"
                    align="center"
                    borderRadius="0 1.25rem 1.25rem 1.25rem"
                >
                    <Column size="4" size_sm="12" color={Colors.black} br_xs="1.25rem" br_sm="1.25rem" br_md="1.25rem" h_xs="auto" h_sm="auto" h_md="auto" m_xs="35px 0" m_sm="35px 0" m_md="35px 0" alignSelf="center" height="100%"  >
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
                    <Column size="8" size_sm="12" alignSelf="center" height="100%"  borderRadius="0 0 0 1.25rem" color="white">
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
                                    <Paragraph padding="0.375rem 0.75rem" fontSize="14px" margin="10px 0 0 0" lineHeight="16px" color={Colors.black}>Select a location</Paragraph>
                                </Row>
                                <Row>
                                    {formStatus.status === "error" && !formData.location.valid && <Alert color="red">Please pick a location</Alert>}
                                    { session.locations && session.locations.map(l => 
                                        <Column key={l.active_campaign_location_slug} size="6" size_md="12" paddingRight="0px" paddingLeft="0px" paddingTop="3px">
                                            <Button 
                                                color={l.active_campaign_location_slug === formData.location.value ? Colors.lightYellow : Colors.lightGray} 
                                                border={l.active_campaign_location_slug === formData.location.value ? "1px solid "+Colors.lightYellow : "1px solid white"} 
                                                borderRadius="0" 
                                                colorHover={Colors.verylightGray}
                                                onClick={(e) => setVal({...formData, location: { value: l.active_campaign_location_slug, valid: true }})}
                                                >
                                                <Paragraph color={Colors.gray}>{l.city}, {l.country}</Paragraph>
                                            </Button>
                                        </Column>
                                    )}
                                </Row>
                                <Row marginTop="10px">
                                    <Input type="text" className="form-control" placeholder={yml.left.referral_section.placeholder} 
                                        value={formData.referral_key.value}
                                        onChange={(value, valid) => setVal({...formData, referral_key: {value, valid}})}
                                    />
                                    <Paragraph padding="0" fontSize="10px" lineHeight="16px" color={Colors.black}>{yml.left.referral_section.content}</Paragraph>
                                </Row>
                                {session.location && session.location.gdpr_compliant &&
                                     <Row marginTop="10px">
                                        <Paragraph fontSize="14px" margin="5px 0 0 0">
                                            <input
                                                type="checkbox"
                                                checked={formData.consent.valid}
                                                onChange={() => setVal({ ...formData, consent: { ...formData.consent, valid: !formData.consent.valid } })} />
                                                {privacy.consent.message}
                                                <a target="_blank" rel="noopener noreferrer" className="decorated" href={privacy.consent.url}>{privacy.consent.link_label}</a>
                                        </Paragraph>
                                    </Row>
                                }
                                <Row >
                                    {formStatus.status === "error" && <Alert color="red">{formStatus.msg}</Alert>}
                                    <Button type="submit"
                                        width="150px"
                                        move="up" up="15px" color={formStatus.status === "loading" ? Colors.darkGray:  Colors.blue} textColor={Colors.white}
                                        margin="2rem 0" padding=".45rem 3rem"
                                        disabled={formStatus.status === "loading" ? true: false}
                                    >{formStatus.status === "loading" ? "Loading..." : yml.left.button.button_text}</Button>
                                </Row>
                            </Column>
                        </Row>

                    </Column>
                </Row>
            </Wrapper>
            <Wrapper margin="150px 0 50px 0">
                <Title
                    variant="primary"
                    title={yml.testimonial_header.heading}
                    paragraph={yml.testimonial_header.sub_heading}
                    maxWidth="66%"
                />
                <Testimonials lang={data.allTestimonialsYaml.edges} />
            </Wrapper>
            <Divider height="100px" />
        </form>
    )
};
export const query = graphql`
  query ApplyQuery($file_name: String!, $lang: String!) {
    privacy: allPageYaml(filter: { fields: { file_name: { regex: "/privacy-policy/" }}}) {
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
    allCourseYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges{
            node{
                meta_info{
                    bc_slug
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