import React, {useState, useContext, useEffect} from 'react';
import {navigate} from 'gatsby';
import {Div, GridContainer, Header, Grid} from '../new_components/Sections'
import {H1, H3, Paragraph} from '../new_components/Heading'
import {Colors, Button} from '../new_components/Styling'
import {Input, Alert} from '../new_components/Form'
import {SelectRaw} from '../new_components/Select'
import BaseRender from './_baseLayout'
import {SessionContext} from '../session.js'
import {Circle} from '../new_components/BackgroundDrawing'
import {apply, tagManager} from "../actions"



const formIsValid = (formData = null) => {
    if (!formData) return null;
    for (let key in formData) {
        if (formData[key] !== undefined && !formData[key].valid) return key;
    }
    return true;
}
const Apply = (props) => {
    const {data, pageContext, yml} = props;
    const [datas, setDatas] = useState()
    const {session} = useContext(SessionContext);
    const [formStatus, setFormStatus] = useState({status: "idle", msg: "Apply"});
    const [formData, setVal] = useState({
        first_name: {value: '', valid: false},
        // last_name: {value: '', valid: false},
        phone: {value: '', valid: false},
        email: {value: '', valid: false},
        location: {value: '', valid: false},
        consent: {value: true, valid: true},
        referral_key: {value: '', valid: true},
        course: {value: null, valid: false}
    });
    const programs = data.allChooseProgramYaml.edges[0].node.programs.map(p => ({
        label: p.text,
        value: p.bc_slug
    }))
    const locations = session && session.locations && session.locations.map(m => ({
        label: m.city,
        value: m.active_campaign_location_slug
    }))

    React.useEffect(() => {
        tagManager("application_rendered")
    }, [])
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        // Pre-fill the location
        let _location = urlParams.get('location');
        if (!_location && session.location) _location = session.location.active_campaign_location_slug;

        if (typeof (_location) === "string" && session.locations) _location = session.locations.find(l => l.active_campaign_location_slug === _location || l.breathecode_location_slug === _location);
        else _location = null;

        if (_location) _location = _location.active_campaign_location_slug;

        // Pre-fill the course
        let _course = urlParams.get('course');
        if (!_course && props.location.state) _course = props.location.state.course;

        if (typeof (_course) === "string") _course = programs.find(p => p.value === _course);

        // Pre-fill the utm_url
        let _utm_url = undefined;
        if (props.location.state) _utm_url = {value: props.location.state.prevUrl, valid: true};

        setVal(_val => ({
            ..._val,
            utm_url: _utm_url,
            location: {value: _location || "", valid: typeof (_location) === "string" && _location !== ""},
            course: {value: _course || null, valid: _course && _course.value ? true : false},
        }));
    }, [session])

    let privacy = data.privacy.edges.find(({node}) => node.fields.lang === pageContext.lang);
    if (privacy) privacy = privacy.node;

    return (
        <>
            <Header
                padding="0 10px"
                padding_tablet="64px 0 "
                seo_title={yml.seo_title}
                title={yml.header.title}
                margin_tablet="100px 0"
                position="relative"
            >
                <Circle color="grey" width="17px" height="17px" top="0" left="90px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="black" width="17px" height="17px" top="0" left="125px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="grey" width="17px" height="17px" top="0" left="168px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="grey" width="17px" height="17px" top="0" left="205px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="grey" width="17px" height="17px" top="0" left="304px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="yellow" width="17px" height="17px" top="32px" left="35px" zIndex="1" display="none" display_tablet="inline" opacity="0.2" />
                <Circle color="black" width="17px" height="17px" top="32px" left="70px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="grey" width="17px" height="17px" top="32px" left="125px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="grey" width="17px" height="17px" top="32px" left="168px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="blue" width="17px" height="17px" top="32px" left="249px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="red" width="27px" height="27px" top="183px" left="125px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="yellow" width="250px" height="250px" bottom="-100px" right="-68px" opacity="0.2" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="grey" width="17px" height="17px" top="120px" right="50px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="black" width="17px" height="17px" top="120px" right="89px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="grey" width="17px" height="17px" top="120px" right="128px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="black" width="119px" height="11px" border="10px" bottom="115px" right="40px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="black" width="77px" height="11px" border="10px" bottom="115px" right="175px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="yellow" width="116px" height="116px" bottom="-58px" left="-58px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="yellow" width="21px" height="21px" top="10px" right="320px" zIndex="1" display="none" display_tablet="inline" />
                <Circle color="blue" width="57px" height="57px" top="32px" right="61px" display="none" display_tablet="inline" />
                <Circle color="lightBlue" width="57px" height="57px" top="32px" left="-28px" display="inline" display_tablet="none" />
            </Header>
            <GridContainer columns_tablet="12" margin="0 0 82px 0">
                <Div gridColumn_tablet="1 / 7" gridRow_tablet="1 / 1" flexDirection="column" >
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (formStatus.status === "error") setFormStatus({status: "idle", msg: "Resquest"})

                        const valid = formIsValid(formData);
                        if (valid !== true) {
                            setFormStatus({status: "error", msg: "There are some errors in your form: " + valid});
                        }
                        else {
                            setFormStatus({status: "loading", msg: "Loading..."});
                            apply({...formData, course: formData.course.value}, session)
                                .then(data => {
                                    if (typeof (data.error) !== "undefined") {
                                        setFormStatus({status: "error", msg: "Fix errors"});
                                    }
                                    else {
                                        setFormStatus({status: "thank-you", msg: "Thank you"});
                                        // console.log("Thank you");
                                        if (!session || !session.utm || !session.utm.utm_test) navigate('/thank-you/apply');
                                        else console.log("Lead success, but no redirection because of testing purposes")
                                    }
                                })
                                .catch(error => {
                                    console.log("error", error);
                                    setFormStatus({status: "error", msg: error.message || error});
                                })
                        }
                    }}>
                        <Div margin_tablet="0 0 23px 0">
                            <Input
                                data-cy="first_name"
                                border="1px solid hsl(0,0%,80%)"
                                borderRadius="3px"
                                bgColor={Colors.white}
                                type="text" className="form-control" placeholder={yml.left.form_section.first_name}
                                errorMsg="Please specify a valid first name"
                                required
                                onChange={(value, valid) => {
                                    setVal({...formData, first_name: {value, valid}})
                                    if (formStatus.status === "error") {
                                        setFormStatus({status: "idle", msg: "Resquest"})
                                    }
                                }}
                                value={formData.first_name.value}
                            />
                        </Div>
                        <Grid gridTemplateColumns_tablet="repeat(12, 1fr)" margin_tablet="0 0 23px 0" gridGap="0" gridGap_tablet="15px">
                            <Div gridColumn_tablet="1 / 7">
                                <Input
                                    data-cy="email"
                                    border="1px solid hsl(0,0%,80%)"
                                    bgColor={Colors.white}
                                    type="email" className="form-control" placeholder={yml.left.form_section.email}
                                    errorMsg="Please specify a valid email"
                                    required
                                    onChange={(value, valid) => {
                                        setVal({...formData, email: {value, valid}})
                                        if (formStatus.status === "error") {
                                            setFormStatus({status: "idle", msg: "Resquest"})
                                        }
                                    }}
                                    value={formData.email.value}
                                />
                            </Div>
                            <Div gridColumn_tablet="7 / 13">
                                <Input
                                    data-cy="phone"
                                    border="1px solid hsl(0,0%,80%)"
                                    bgColor={Colors.white}
                                    type="phone" className="form-control" placeholder={yml.left.form_section.phone}
                                    errorMsg="Please specify a valid phone number"
                                    required
                                    onChange={(value, valid) => {
                                        setVal({...formData, phone: {value, valid}})
                                        if (formStatus.status === "error") {
                                            setFormStatus({status: "idle", msg: "Resquest"})
                                        }
                                    }}
                                    value={formData.phone.value}
                                />
                            </Div>
                        </Grid>
                        <Div data-cy="dropdown_program_selector" margin_tablet="0 0 23px 0">
                            {console.log("default", formData.course.value)}
                            <SelectRaw
                                bgColor={Colors.white}
                                options={programs}
                                value={formData.course.value}
                                placeholder={yml.left.course_title.open}
                                onChange={(value, valid) => setVal({...formData, course: {value, valid}})}
                            />
                        </Div>
                        {formStatus.status === "error" && !formData.location.valid && <Alert color="red">Please pick a location</Alert>}
                        <Div margin_tablet="0 0 23px 0">
                            <SelectRaw
                                bgColor={Colors.black}
                                options={locations && locations}
                                value={formData.location.value}
                                placeholder={yml.locations_title}
                                onChange={(value, valid) => setVal({...formData, location: {value: value.active_campaign_location_slug, valid}})}
                            />
                        </Div>
                        <Input border="1px solid hsl(0,0%,80%)" bgColor={Colors.white} type="text" className="form-control" placeholder={yml.left.referral_section.placeholder}
                            value={formData.referral_key.value}
                            onChange={(value, valid) => setVal({...formData, referral_key: {value, valid}})}
                        />
                        {session && session.location && location.gdpr_compliant &&
                            <Div>
                                <Paragraph fontSize="14px" margin="5px 0 0 0">
                                    <input
                                        type="checkbox"
                                        checked={formData.consent.valid}
                                        onChange={() => setVal({...formData, consent: {...formData.consent, valid: !formData.consent.valid}})} />
                                    {privacy.consent.message}
                                    <a target="_blank" rel="noopener noreferrer" className="decorated" href={privacy.consent.url}>{privacy.consent.link_label}</a>
                                </Paragraph>
                            </Div>
                        }
                        <Div justifyContent="end">
                            {formStatus.status === "error" && <Alert color="red">{formStatus.msg}</Alert>}
                            <Button
                                variant="full"
                                type="submit"
                                transform="translateY(-15px)" color={formStatus.status === "loading" ? Colors.darkGray : Colors.blue} textColor={Colors.white}
                                margin="2rem 0" padding=".45rem 3rem"
                                disabled={formStatus.status === "loading" ? true : false}
                            >{formStatus.status === "loading" ? "Loading..." : yml.left.button.button_text}</Button>
                        </Div>
                    </form>
                </Div>

                <Div gridColumn_tablet="8 / 13" gridRow_tablet="1 / 1" background={Colors.lightGray} padding="46px 40px" flexDirection="column" borderRadius="3px">
                    <H3 textAlign="left" textTransform="capitalize">{yml.right.heading}</H3>
                    {yml.right.content_section.map((m, i) => {
                        return (

                            <Paragraph
                                textAlign="left"
                                margin="20px 0"
                                key={i}
                                fontSize="15px"
                                lineHeight="19px"
                                fontWeight="400"

                            >{m}
                            </Paragraph>
                        )
                    })}
                </Div>
            </GridContainer>
            {/* <GridContainer columns_tablet="12" padding="99px  17px 80px 17px" padding_tablet="0" margin_tablet="0 0 81px 0">
        <Div ref={joinPartnersRef} gridColumn_tablet="1 / 7" gridRow_tablet="1 / 1" flexDirection="column" >
          <H2 textAlign_md="left" margin="0 0 30px 0">{`</ ${yml.form.title}`}</H2>
        </Div>
        <Div gridColumn_tablet="1 / 7" gridRow_tablet="2 / 2" flexDirection="column" >
          {yml.form.paragraph.split("\n").map((m, i) =>
            <Paragraph key={i} margin="7px 0" textAlign_md="left" dangerouslySetInnerHTML={{__html: m}}></Paragraph>
          )}
        </Div>
        <Div justifyContent="center" gridColumn_tablet="8 / 13" gridRow_tablet="2 / 2" margin="0 0 81px 0">
          <LeadForm formHandler={beHiringPartner} handleClose={handleClose} lang={pageContext.lang} inputBgColor={Colors.white} />
        </Div>

      </GridContainer> */}
        </>
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
            seo_title
          header{
              title
              paragraph
              image_alt
              button
              
              
          }
            meta_info{
                title
                description
                image
                keywords
            }
            left {
                heading
                locations_title
                course_title{
                    open
                    close
                }
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
              hidden
              linkedin_url
              linkedin_text
              student_thumb{
                childImageSharp {
                    gatsbyImageData(
                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                        width: 200
                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    )

                #   fluid(maxWidth: 200){
                #     ...GatsbyImageSharpFluid_withWebp
                #   }
                #   fixed(width: 200, height: 200) {
                #     ...GatsbyImageSharpFixed
                #   }
                }
              }
              content
              source_url
              source_url_text
            }
          }
        }
    }
    allChooseProgramYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
          node {
            programs{
                text
                link
                bc_slug
                location_bc_slug
                schedule
            }
          }
        }
    }
  }
`;
export default BaseRender(Apply);


{/* <Wrapper
                github={`/page/apply.${pageContext.lang}.yml`}
            >
                <Title
                    title={yml.tagline}
                    variant="primary"
                    size="8"
                />
                <Row
                    display="flex"
                    shadow={`0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`}
                    background="#000000"
                    height="100%"
                    marginLeft="0"
                    marginRight="0"
                    justifyContent="center"
                    borderRadius="0 1.25rem 1.25rem 1.25rem"
                >
                    <Column
                        size="4"
                        size_sm="12"
                        background={Colors.black}
                    >
                        <Row display="flex" padding={`20px`}>
                            <H3
                                fontSize={`22px`}
                                color={Colors.yellow}
                            >
                                {yml.right.heading}
                            </H3>
                        </Row>

                        {yml.right.content_section.map((item, i) => {
                            return (<Row display="flex" key={i} margin={`5px 0`} padding={`20px`}>
                                <Paragraph
                                    fontSize={`18px`}
                                    lineHeight="18px"
                                    color={Colors.lightGray}
                                >{item}
                                </Paragraph>
                            </Row>)
                        })}
                    </Column>
                    <Column size="8" size_sm="12" alignSelf="center" height="100%" borderRadius="0 0 0 1.25rem" background="white">
                        <Row display="flex" justifyContent="center" height="100%">
                            <Column size="10" height="100%">
                                <Divider height="50px" />
                                <Row display="flex" height="50px">
                                    <H3>{yml.left.heading}</H3>
                                    {formStatus.status === "error" && <Alert color="red">{formStatus.msg}</Alert>}
                                </Row>
                                <Row display="flex">
                                    <Column size="6" size_sm="12" paddingRight="10px" p_sm="0"  paddingLeft="0">
                                        <Input
                                            data-cy="first_name"
                                            type="text" className="form-control" placeholder={yml.left.form_section.first_name}
                                            errorMsg="Please specify a valid first name"
                                            required
                                            onChange={(value, valid) => {
                                                setVal({...formData, first_name: {value, valid}})
                                                if (formStatus.status === "error") {
                                                    setFormStatus({status: "idle", msg: "Resquest"})
                                                }
                                            }}
                                            value={formData.first_name.value}
                                        />
                                    </Column>
                                    <Column size="6" size_sm="12" paddingRight="0"  paddingLeft="0">
                                        <Input
                                            data-cy="last_name" 
                                            type="text" className="form-control" placeholder={yml.left.form_section.last_name}
                                            errorMsg="Please specify a valid last name"
                                            required
                                            onChange={(value, valid) => {
                                                setVal({...formData, last_name: {value, valid}})
                                                if (formStatus.status === "error") {
                                                    setFormStatus({status: "idle", msg: "Resquest"})
                                                }
                                            }}
                                            value={formData.last_name.value}
                                        />
                                    </Column>
                                </Row>
                                <Row display="flex" height="50px">
                                    <Input 
                                        data-cy="email"
                                        type="email" className="form-control" placeholder={yml.left.form_section.email}
                                        errorMsg="Please specify a valid email"
                                        required
                                        onChange={(value, valid) => {
                                            setVal({...formData, email: {value, valid}})
                                            if (formStatus.status === "error") {
                                                setFormStatus({status: "idle", msg: "Resquest"})
                                            }
                                        }}
                                        value={formData.email.value}
                                    />
                                </Row>
                                <Row display="flex" height="50px">
                                    <Input
                                        data-cy="phone"
                                        type="phone" className="form-control" placeholder={yml.left.form_section.phone}
                                        errorMsg="Please specify a valid phone number"
                                        required
                                        onChange={(value, valid) => {
                                            setVal({...formData, phone: {value, valid}})
                                            if (formStatus.status === "error") {
                                                setFormStatus({status: "idle", msg: "Resquest"})
                                            }
                                        }}
                                        value={formData.phone.value}
                                    />
                                </Row>
                                <Row 
                                data-cy="dropdown_program_selector"
                                display="flex" height="50px">
                                    {console.log("default", formData.course.value)}
                                    <SelectRaw 
                                        options={programs}
                                        value={formData.course.value}
                                        placeholder={yml.left.course_title.open}
                                        onChange={(value, valid) => setVal({...formData, course: {value, valid}})}
                                    />
                                </Row>
                                <Row display="flex" height="40px">
                                    <Paragraph padding="0.375rem 0.75rem" fontSize="14px" margin="10px 0 0 0" lineHeight="16px" color={Colors.black}>Select a location</Paragraph>
                                </Row>
                                <Row display="flex">
                                    {formStatus.status === "error" && !formData.location.valid && <Alert color="red">Please pick a location</Alert>}
                                    {session && session.locations && session.locations.map(l =>
                                        <Column key={l.active_campaign_location_slug} size="6" size_md="12" paddingRight="0px" paddingLeft="0px" paddingTop="3px">
                                            <Button
                                                color={l.active_campaign_location_slug === formData.location.value ? Colors.lightYellow : Colors.lightGray}
                                                border={l.active_campaign_location_slug === formData.location.value ? "1px solid " + Colors.lightYellow : "1px solid white"}
                                                borderRadius="0"
                                                colorHover={Colors.verylightGray}
                                                onClick={(e) => setVal({...formData, location: {value: l.active_campaign_location_slug, valid: true}})}
                                            >
                                                <Paragraph className="no-wrap" color={Colors.gray}>{l.city}, {l.country}</Paragraph>
                                            </Button>
                                        </Column>
                                    )}
                                </Row>
                                <Row display="flex" marginTop="10px">
                                    <Input type="text" className="form-control" placeholder={yml.left.referral_section.placeholder}
                                        value={formData.referral_key.value}
                                        onChange={(value, valid) => setVal({...formData, referral_key: {value, valid}})}
                                    />
                                    <Paragraph padding="0" fontSize="10px" lineHeight="16px" color={Colors.black}>{yml.left.referral_section.content}</Paragraph>
                                </Row>
                                {session && session.location && location.gdpr_compliant &&
                                    <Row display="flex" marginTop="10px">
                                        <Paragraph fontSize="14px" margin="5px 0 0 0">
                                            <input
                                                type="checkbox"
                                                checked={formData.consent.valid}
                                                onChange={() => setVal({...formData, consent: {...formData.consent, valid: !formData.consent.valid}})} />
                                            {privacy.consent.message}
                                            <a target="_blank" rel="noopener noreferrer" className="decorated" href={privacy.consent.url}>{privacy.consent.link_label}</a>
                                        </Paragraph>
                                    </Row>
                                }
                                <Row display="flex">
                                    {formStatus.status === "error" && <Alert color="red">{formStatus.msg}</Alert>}
                                    <Button 
                                        type="submit"
                                        width="150px"
                                        transform="translateY(-15px)" color={formStatus.status === "loading" ? Colors.darkGray : Colors.blue} textColor={Colors.white}
                                        margin="2rem 0" padding=".45rem 3rem"
                                        disabled={formStatus.status === "loading" ? true : false}
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
                <TestimonialsCarrousel lang={data.allTestimonialsYaml.edges} />
            </Wrapper>
            <Divider height="100px" /> */}