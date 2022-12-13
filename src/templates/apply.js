import React, { useState, useContext } from "react";
import { navigate } from "gatsby";
import { Div, GridContainer, Header, Grid } from "../components/Sections";
import { H1, H3, Paragraph } from "../components/Heading";
import { Colors, Button } from "../components/Styling";
import { Input, Alert } from "../components/Form";
import { SelectRaw } from "../components/Select";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session.js";
import { Circle } from "../components/BackgroundDrawing";
import { apply, tagManager } from "../actions";
import PhoneInput from "../components/LeadForm/PhoneInput";
import Modal from "../components/Modal_v2";

const us = {
  "(In-person and from home available)": "(In-person and from home available)",
  "(From home until further notice)": "(From home until further notice)",
  Europe: "Europe",
  "Latin America": "Latin America",
  "USA & Canada": "USA & Canada",
  "Rest of the world": "Rest of the world",
};
const es = {
  "(In-person and from home available)": "(Presencial o desde casa)",
  "(From home until further notice)": "(Desde casa hasta nuevo aviso)",
  Europe: "Europa",
  "Latin America": "Latinoamérica",
  "USA & Canada": "USA & Canada",
  "Rest of the world": "Resto del mundo",
};
const trans = { us, es };

const formIsValid = (formData = null) => {
  if (!formData) return null;
  for (let key in formData) {
    if (formData[key] !== undefined && !formData[key].valid) return key;
  }
  return true;
};

const isBrowser = typeof window !== "undefined";

const Apply = (props) => {
  if (isBrowser) {
    window.captchakey = process.env.GOOGLE_CAPTCHA_KEY;
  }

  const { data, pageContext, yml } = props;
  const { session, setSession } = useContext(SessionContext);
  const [formStatus, setFormStatus] = useState({
    status: "idle",
    msg: "Apply",
  });
  const [formData, setVal] = useState({
    first_name: { value: "", valid: false },
    // last_name: {value: '', valid: false},
    phone: { value: "", valid: false },
    email: { value: "", valid: false },
    location: { value: "", valid: false },
    consent: { value: true, valid: true },
    referral_key: { value: null, valid: true },
    course: { value: null, valid: false },
  });
  const programs = data.allChooseProgramYaml.edges[0].node.programs
    .filter((p) => !["unlisted", "hidden"].includes(p.visibility))
    .map((p) => ({
      label: p.text,
      value: p.bc_slug,
    }));

  const [regionVal, setRegionVal] = useState(null);
  const [showPhoneWarning, setShowPhoneWarning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const regions = [
    { label: trans[pageContext.lang]["Latin America"], value: "latam" },
    { label: trans[pageContext.lang]["USA & Canada"], value: "usa-canada" },
    { label: trans[pageContext.lang]["Europe"], value: "europe" },
    { label: trans[pageContext.lang]["Rest of the world"], value: "online" },
  ];

  const locationContext = session && session.location;
  const locations =
    session &&
    session.locations &&
    session.locations
      .sort((a, b) => (a.meta_info.position > b.meta_info.position ? 1 : -1))
      .map((m) => ({
        label:
          m.name +
          " " +
          (m.online_available == false
            ? ""
            : m.in_person_available == true
            ? trans[pageContext.lang]["(In-person and from home available)"]
            : trans[pageContext.lang]["(From home until further notice)"]),
        value: m.active_campaign_location_slug,
        region: m.meta_info.region,
        dialCode: m.meta_info.dialCode,
        country: m.country,
      }));

  React.useEffect(() => {
    tagManager("application_rendered");
  }, []);
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // Pre-fill the location
    let _location = urlParams.get("location");
    if (!_location && session.location)
      _location = session.location.active_campaign_location_slug;

    if (typeof _location === "string" && session.locations)
      _location = session.locations.find(
        (l) =>
          l.active_campaign_location_slug === _location ||
          l.breathecode_location_slug === _location
      );
    else _location = null;

    if (_location) _location = _location.active_campaign_location_slug;

    // Pre-fill the course
    let _course = urlParams.get("course");
    if (!_course && props.location.state) _course = props.location.state.course;

    if (typeof _course === "string")
      _course = programs.find((p) => p.value === _course);

    // Pre-fill the utm_url
    let _utm_url = undefined;
    if (props.location.state)
      _utm_url = { value: props.location.state.prevUrl, valid: true };

    setVal((_val) => ({
      ..._val,
      utm_url: _utm_url,
      // this is the line that automatically sets the location, we don't want that anymore
      // its better if leads choose the location themselves
      // location: {value: _location || "", valid: typeof (_location) === "string" && _location !== ""},
      course: {
        value: _course || null,
        valid: _course && _course.value ? true : false,
      },
      referral_key: { value: session?.utm?.referral_code || null, valid: true },
    }));
  }, [session]);

  let privacy = data.privacy.edges.find(
    ({ node }) => node.fields.lang === pageContext.lang
  );
  if (privacy) privacy = privacy.node;

  const submitForm = () => {
    setFormStatus({ status: "loading", msg: "Loading..." });
    apply(
      {
        ...formData,
        course: formData.course.value,
        location: formData.location.value,
      },
      session
    )
      .then((data) => {
        if (typeof data.error !== "undefined") {
          setFormStatus({ status: "error", msg: "Fix errors" });
        } else {
          setFormStatus({ status: "thank-you", msg: "Thank you" });
          if (!session || !session.utm || !session.utm.utm_test)
            navigate(
              `${pageContext.lang === "us" ? "/us/thank-you" : "/es/gracias"}`
            );
          else
            console.log(
              "Lead success, but no redirection because of testing purposes"
            );
        }
      })
      .catch((error) => {
        console.log("error", error);
        setFormStatus({
          status: "error",
          msg: error.message || error,
        });
      });
  };
  return (
    <>
      <Header
        padding="0 10px"
        padding_tablet="64px 0 "
        seo_title={yml.seo_title}
        title={yml.header.title}
        margin_tablet="90px 0 0 0"
        position="relative"
      >
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="0"
          left="90px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="0"
          left="125px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="0"
          left="168px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="0"
          left="205px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="0"
          left="304px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="32px"
          left="35px"
          zIndex="1"
          display="none"
          display_tablet="inline"
          opacity="0.2"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="32px"
          left="70px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="32px"
          left="125px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="32px"
          left="168px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="17px"
          height="17px"
          top="32px"
          left="249px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="red"
          width="27px"
          height="27px"
          top="183px"
          left="125px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="250px"
          height="250px"
          bottom="-100px"
          right="-68px"
          opacity="0.2"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="120px"
          right="50px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="120px"
          right="89px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="120px"
          right="128px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="119px"
          height="11px"
          border="10px"
          bottom="115px"
          right="40px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="77px"
          height="11px"
          border="10px"
          bottom="115px"
          right="175px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="116px"
          height="116px"
          bottom="-58px"
          left="-58px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="21px"
          height="21px"
          top="10px"
          right="320px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="57px"
          height="57px"
          top="32px"
          right="61px"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="lightBlue"
          width="57px"
          height="57px"
          top="32px"
          left="-28px"
          display="inline"
          display_tablet="none"
        />
      </Header>
      <GridContainer columns_tablet="12" margin="0 0 82px 0">
        <Div
          gridColumn_tablet="1 / 7"
          gridRow_tablet="1 / 1"
          flexDirection="column"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (formStatus.status === "error")
                setFormStatus({ status: "idle", msg: "Resquest" });

              const valid = formIsValid(formData);
              if (valid !== true) {
                setFormStatus({
                  status: "error",
                  msg: "There are some errors in your form: " + valid,
                });
              } else {
                if (showPhoneWarning && regionVal !== "online") {
                  setShowModal(true);
                } else {
                  submitForm();
                }
              }
            }}
          >
            <Div margin_tablet="0 0 23px 0">
              <Input
                data-cy="first_name"
                border="1px solid hsl(0,0%,80%)"
                borderRadius="3px"
                bgColor={Colors.white}
                type="text"
                className="form-control"
                placeholder={yml.left.form_section.first_name}
                errorMsg="Please specify a valid first name"
                required
                onChange={(value, valid) => {
                  setVal({ ...formData, first_name: { value, valid } });
                  if (formStatus.status === "error") {
                    setFormStatus({ status: "idle", msg: "Resquest" });
                  }
                }}
                value={formData.first_name.value || ""}
              />
            </Div>
            <Grid
              gridTemplateColumns_tablet="repeat(12, 1fr)"
              margin_tablet="0 0 23px 0"
              gridGap="0"
              gridGap_tablet="15px"
            >
              <Div gridColumn_tablet="1 / 7">
                <Input
                  data-cy="email"
                  border="1px solid hsl(0,0%,80%)"
                  bgColor={Colors.white}
                  type="email"
                  className="form-control"
                  placeholder={yml.left.form_section.email}
                  errorMsg="Please specify a valid email"
                  required
                  onChange={(value, valid) => {
                    setVal({ ...formData, email: { value, valid } });
                    if (formStatus.status === "error") {
                      setFormStatus({ status: "idle", msg: "Resquest" });
                    }
                  }}
                  value={formData.email.value || ""}
                />
              </Div>
              <Div gridColumn_tablet="7 / 13">
                <PhoneInput
                  data-cy="phone"
                  setVal={setVal}
                  formData={formData}
                  phoneFormValues={formData["phone"]}
                  errorMsg="Please specify a valid phone number"
                  sessionContextLocation={locationContext}
                  campusDial={formData?.location.value}
                  setShowPhoneWarning={setShowPhoneWarning}
                />
                {/* <Input
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
                                    value={formData.phone.value || ""}
                                /> */}
              </Div>
            </Grid>
            <Div
              data-cy="dropdown_program_selector"
              tabindex="1"
              margin_tablet="0 0 23px 0"
            >
              <SelectRaw
                bgColor={Colors.white}
                options={programs}
                value={formData.course.value || ""}
                defaultValue={formData.course.value}
                placeholder={yml.left.course_title.open}
                inputId={"dropdown_program_selector"}
                onChange={(value, valid) =>
                  setVal({ ...formData, course: { value, valid } })
                }
              />
            </Div>
            <Div
              data-cy="dropdown_region_selector"
              tabindex="1"
              contenteditable="true"
              margin_tablet="0 0 12px 0"
            >
              <SelectRaw
                tabindex="1"
                bgColor={Colors.black}
                options={regions}
                // value={locations?.find(
                //   (el) => el.value === formData.location.value
                // )}
                placeholder={yml.left.regions_title}
                inputId={"dropdown_region_selector"}
                onChange={(value) => {
                  setRegionVal(value.value);
                  setVal({
                    ...formData,
                    location: { value: "", valid: false },
                  });
                }}
              />
            </Div>
            {formStatus.status === "error" && !formData.location.valid && (
              <Alert color="red">Please pick a location</Alert>
            )}
            {showPhoneWarning && regionVal !== "online" && (
              <Div
                background="rgba(0, 151, 205, 0.19)"
                borderRadius="2px"
                padding="5px 10px"
              >
                <Paragraph
                  fontSize="10px"
                  lineHeight="12px"
                  color="#000"
                  textAlign="left"
                >
                  {yml.left.form_section.phone_warning}
                </Paragraph>
              </Div>
            )}
            {regionVal && (
              <Div
                data-cy="dropdown_academy_selector"
                tabindex="1"
                contenteditable="true"
                margin_tablet="11px 0 23px 0"
              >
                <SelectRaw
                  tabindex="1"
                  bgColor={Colors.black}
                  options={
                    regionVal === "online"
                      ? [
                          {
                            dialCode: null,
                            label: "Online",
                            region: "online",
                            value: "online",
                          },
                        ]
                      : locations?.filter(
                          (academy) => academy.region === regionVal
                        )
                  }
                  value={formData.location.value}
                  placeholder={yml.left.locations_title}
                  inputId={"dropdown_academy_selector"}
                  onChange={(value, valid) => {
                    setVal({ ...formData, location: { value, valid } });
                  }}
                />
              </Div>
            )}
            {formData.referral_key.value &&
              formData.referral_key.value != "" && (
                <Alert color="blue">
                  You have applied a referral code to this form
                </Alert>
              )}
            <Input
              border="1px solid hsl(0,0%,80%)"
              bgColor={Colors.white}
              type="text"
              className="form-control"
              placeholder={yml.left.referral_section.placeholder}
              value={formData.referral_key.value || ""}
              onChange={(value, valid) =>
                setVal({ ...formData, referral_key: { value, valid } })
              }
            />
            {session && session.location && location.gdpr_compliant && (
              <Div>
                <Paragraph fontSize="14px" margin="5px 0 0 0">
                  <input
                    type="checkbox"
                    checked={formData.consent.valid}
                    onChange={() =>
                      setVal({
                        ...formData,
                        consent: {
                          ...formData.consent,
                          valid: !formData.consent.valid,
                        },
                      })
                    }
                  />
                  {privacy.consent.message}
                  <a
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="decorated"
                    href={privacy.consent.url}
                  >
                    {privacy.consent.link_label}
                  </a>
                </Paragraph>
              </Div>
            )}
            <Div
              flexDirection_tablet="column"
              flexDirection="column"
              justifyContent="end"
            >
              {formStatus.status === "error" && (
                <Alert data-cy="alertText" color="red">
                  {formStatus.msg}
                </Alert>
              )}
              <Button
                variant="full"
                type="submit"
                margin="2rem auto"
                margin_tablet="2rem 0 2rem auto"
                transform="translateY(-15px)"
                color={
                  formStatus.status === "loading"
                    ? Colors.darkGray
                    : Colors.blue
                }
                textColor={Colors.white}
                padding=".45rem 3rem"
                disabled={formStatus.status === "loading" ? true : false}
              >
                {formStatus.status === "loading"
                  ? "Loading..."
                  : yml.left.button.button_text}
              </Button>
            </Div>
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              showHeader={true}
              title={yml.left.form_section.modal.title}
              padding="20px 10px"
            >
              <Paragraph fontSize="14px" lineHeight="24px">
                {yml.left.form_section.modal.text}
              </Paragraph>
              <Div justifyContent="between">
                <Button
                  variant="full"
                  margin="2rem 0 0 0"
                  color={Colors.blue}
                  textColor={Colors.white}
                  padding_tablet=".40rem 2.1rem"
                  padding=".40rem .7rem"
                  maxWidth_tablet="none"
                  maxWidth_sm="160px"
                  maxWidth="125px"
                  disabled={formStatus.status === "loading" ? true : false}
                  onClick={() => setShowModal(false)}
                >
                  {yml.left.form_section.modal.left_button}
                </Button>
                <Button
                  variant="outline"
                  margin="2rem 0 0 0"
                  color={Colors.blue}
                  padding_tablet=".40rem 2.1rem"
                  padding=".40rem .7rem"
                  maxWidth_tablet="none"
                  maxWidth_sm="160px"
                  maxWidth="125px"
                  disabled={formStatus.status === "loading" ? true : false}
                  onClick={() => {
                    setShowModal(false);
                    submitForm();
                  }}
                >
                  {formStatus.status === "loading"
                    ? "Loading..."
                    : `${yml.left.form_section.modal.right_button} ${formData?.location?.value?.country}`}
                </Button>
              </Div>
            </Modal>
          </form>
        </Div>

        <Div
          gridColumn_tablet="8 / 13"
          gridRow_tablet="1 / 1"
          background={Colors.lightGray}
          padding="46px 40px"
          flexDirection="column"
          borderRadius="3px"
        >
          <H3 textAlign="left" textTransform="capitalize">
            {yml.right.heading}
          </H3>
          {yml.right.content_section.map((m, i) => {
            return (
              <Paragraph
                textAlign="left"
                margin="20px 0"
                key={i}
                fontSize="15px"
                lineHeight="19px"
                fontWeight="400"
              >
                {m}
              </Paragraph>
            );
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
  );
};
export const query = graphql`
  query ApplyQuery($file_name: String!, $lang: String!) {
    privacy: allPageYaml(
      filter: { fields: { file_name: { regex: "/privacy-policy/" } } }
    ) {
      edges {
        node {
          fields {
            lang
          }
          consent {
            message
            link_label
            url
          }
        }
      }
    }
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          header {
            title
            paragraph
            image_alt
            button
          }
          meta_info {
            title
            description
            image
            keywords
          }
          left {
            heading
            locations_title
            regions_title
            course_title {
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
              phone_warning
              modal {
                title
                text
                left_button
                right_button
              }
            }
            referral_section {
              placeholder
              content
            }
          }
          right {
            heading
            content_section
          }
          testimonial_header {
            heading
            sub_heading
          }
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          testimonials {
            student_name
            testimonial_date
            hidden
            linkedin_url
            linkedin_text
            student_thumb {
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
    allChooseProgramYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          programs {
            text
            link
            bc_slug
            visibility
            location_bc_slug
            schedule
          }
        }
      }
    }
  }
`;
export default BaseRender(Apply);
