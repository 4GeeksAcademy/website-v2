import React, { useContext, useState } from "react";
import { Alert, Input } from "../Form/index";
import { Row, Column, Div, GridContainer } from "../Sections";
import { H4, Paragraph } from "../Heading";
import styled from "styled-components";
import PropTypes from "prop-types";
import { SessionContext } from "../../session";
import { Button, Colors } from "../Styling";
import { Break, Devices } from "../Responsive";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, navigate } from "gatsby";
import { SelectRaw } from "../Select";
import PhoneInput from "./PhoneInput";

const formIsValid = (formData = null) => {
  if (!formData) return null;
  for (let key in formData) {
    if (formData[key].value === "" && formData[key].required === false)
      continue;
    if (!formData[key].valid) return false;
  }
  return true;
};

const Form = styled.form`
  margin: ${(props) => props.margin};
  margin-top: ${(props) => props.marginTop};
  width: auto;
  height: auto;
  display: block;
  background: ${(props) => (props.background ? props.background : "#FFFFFF")};
  border-radius: 3px;
  @media ${Break.sm} {
    display: ${(props) => props.d_sm};
  }
  @media ${Devices.tablet} {
    margin: ${(props) => props.margin_tablet};
    margin-top: ${(props) => props.marginTop_tablet};
    width: 100%;
  }
  @media ${Devices.xs} {
    margin-top: ${(props) => props.marginTop_xs};
  }
`;

const _fields = {
  first_name: {
    value: "",
    valid: false,
    required: true,
    type: "text",
    place_holder: "First name *",
    error: "Please specify a valid first name",
  },
  full_name: {
    value: "",
    valid: false,
    required: true,
    type: "text",
    place_holder: "Full name *",
    error: "Please specify a valid full name",
  },
  last_name: {
    value: "",
    valid: false,
    required: false,
    type: "text",
    place_holder: "Last name",
    error: "Please specify a valid last name",
  },
  email: {
    value: "",
    valid: false,
    required: true,
    type: "email",
    place_holder: "Your email *",
    error: "Please specify a valid email",
  },
  phone: {
    value: "",
    valid: false,
    required: true,
    type: "phone",
    place_holder: "Phone number",
    error: "Please specify a valid phone",
  },
  consent: {
    value: true,
    valid: true,
    required: true,
    type: "text",
    place_holder: "",
    error: "You need to accept the privacy terms",
  },
  client_comments: {
    value: "",
    valid: true,
    required: false,
    type: "text",
    place_holder: "Any comments?",
    error: "Please specify any comments",
  },
  form_type: {
    value: "",
    valid: true,
    required: true,
    type: "hidden",
    place_holder: "",
    error: "formType not found",
  },
};

const clean = (fields, data) => {
  let cleanedData = { ...data };

  Object.keys(cleanedData).forEach(
    (key) =>
      // i also make sure I don't delete the hidden fields
      key !== "course" &&
      cleanedData[key].type !== "hidden" &&
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

  console.log("FormData Before sending", cleanedData, data, fields);
  return cleanedData;
};

const LeadForm = ({
  marginButton,
  marginButton_tablet,
  background,
  margin,
  marginTop,
  marginTop_tablet,
  marginTop_xs,
  margin_tablet,
  justifyContentButton,
  buttonWidth_tablet,
  titleTextAlign,
  buttonBorderRadius,
  d_sm,
  fields,
  thankyou,
  heading,
  redirect,
  formHandler,
  data,
  handleClose,
  style,
  sendLabel,
  lang,
  motivation,
  layout,
  inputBgColor,
  landingTemplate,
  selectProgram,
  selectLocation,
  textPadding,
  textPadding_tablet,
  titleMargin,
  titleMargin_tablet,
  headerImage,
}) => {
  const _query = useStaticQuery(graphql`
    query newLeadFormQuery {
      allPageYaml(
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
      allLeadFormYaml {
        edges {
          node {
            fields {
              lang
            }
            messages {
              loading
              success
              error
            }
            form_fields {
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
  `);

  let page = _query.allPageYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  let form = _query.allLeadFormYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  let yml = { ...page.node, ...form.node };

  const [formStatus, setFormStatus] = useState({ status: "idle", msg: "" });
  const [formData, setVal] = useState(_fields);
  const [consentValue, setConsentValue] = useState(false);
  const { session } = useContext(SessionContext);
  const courseSelector = yml.form_fields.find((f) => f.name === "course");
  const locationSelector = yml.form_fields.find((f) => f.name === "location");
  const consentCheckboxField = yml.form_fields.find(
    (f) => f.name === "consent"
  );
  React.useEffect(() => {
    setVal((_data) => {
      const _ = Object.keys(_data).reduce((total, key) => {
        if (_data[key] !== undefined) {
          const field = yml.form_fields.find((f) => f.name === key);
          return { ...total, [key]: { ..._data[key], ...field } };
        }
      }, {});

      return {
        ..._,
        ...data,
        utm_url: { type: "hidden", value: window.location.href, valid: true },
      };
    });
  }, [data]);

  //validate fields
  fields.forEach((f) => {
    if (formData[f] === undefined)
      throw Error(
        `Invalid form field ${f}, options are: ${Object.keys(formData).join(
          ","
        )}`
      );
  });

  return (
    <Form
      margin={margin}
      background={background}
      margin_tablet={margin_tablet}
      marginTop={marginTop}
      marginTop_tablet={marginTop_tablet}
      marginTop_xs={marginTop_xs}
      d_sm={d_sm}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();

        if (formStatus.status === "error")
          setFormStatus({ status: "idle", msg: "" });

        const cleanedData = clean(fields, formData);

        if (!formIsValid(cleanedData)) {
          setFormStatus({ status: "error", msg: yml.messages.error });
        } else if (
          formData.course !== undefined &&
          Array.isArray(formData.course.value) &&
          formData.course.value.length > 1
        ) {
          setFormStatus({ status: "error", msg: courseSelector.error });
        }else if (
          formData.utm_location !== undefined &&
          Array.isArray(formData.utm_location.value) &&
          formData.utm_location.value.length > 1
        ) {
          setFormStatus({ status: "error", msg: locationSelector.error });
        } else if (
          consentValue === false &&
          session.location?.gdpr_compliant === true
        ) {
          setFormStatus({ status: "error", msg: consentCheckboxField.error });
        } else {
          setFormStatus({ status: "loading", msg: yml.messages.loading });
          formHandler(cleanedData, session)
            .then((data) => {
              if (data && data.error !== false && data.error !== undefined) {
                setFormStatus({ status: "error", msg: data.error });
              } else {
                if (redirect && redirect !== "") {
                  if (redirect.indexOf("http") > -1)
                    window.location.href = redirect;
                  else navigate(redirect);
                } else
                  setFormStatus({
                    status: "thank-you",
                    msg: yml.messages.success,
                  });
              }
            })
            .catch((error) => {
              console.error("error", error);
              setFormStatus({ status: "error", msg: error.message || error });
            });
        }
      }}
    >
      {headerImage && (
        <Div
          width="0px"
          display="none"
          display_tablet="none"
          display_md="flex"
          display_lg="flex"
          flexDirection_tablet="column"
          padding="0 0 25px 0"
        >
          <GatsbyImage
            loading="eager"
            style={{
              width: "160px",
              height: "130px",
              position: "absolute",
              margin: "-44px 0 0 26%",
            }}
            imgStyle={{ objectFit: "contain" }}
            image={getImage(headerImage)}
            alt="4Geeks Logo"
          />
        </Div>
      )}
      {/* {heading && <H4 type="h4" fontSize="25px" width="auto" textAlign="center" textAlign_tablet={titleTextAlign || "left"} margin={landingTemplate ? "15px 0px 30px 0" : titleMargin || "20px 30px 15px 30px"} margin_tablet={titleMargin_tablet || "20px 40px 15px 40px"}>{heading}</H4>} */}
      {formStatus.status === "thank-you" ? (
        <Paragraph margin="20px 0px 0px 0px">
          {thankyou || formStatus.msg}
        </Paragraph>
      ) : (
        <>
          <GridContainer
            display="block"
            containerColumns_tablet={
              landingTemplate && "0fr repeat(12, 1fr) 0fr"
            }
            containerGridGap={landingTemplate && "0"}
            className={"leadform-" + layout}
            size="12"
            paddingLeft="0"
            paddingRight="0"
          >
            {heading && (
              <H4
                type="h4"
                fontSize="25px"
                padding={headerImage && "0 10% 0 0"}
                fontWeight="700"
                width="auto"
                textAlign="center"
                textAlign_tablet={titleTextAlign || "left"}
                margin={
                  landingTemplate
                    ? "25px 0px 0px 0"
                    : titleMargin || "20px 0px 5px 0px"
                }
                margin_tablet={titleMargin_tablet || "20px 0px 5px 0px"}
              >
                {heading}
              </H4>
            )}
            {motivation && (
              <Paragraph
                textAlign="left"
                padding={textPadding || "0px 0px 10px 0px"}
                padding_tablet={textPadding_tablet || "0px 0px 10px 0px"}
              >
                {motivation}
              </Paragraph>
            )}
            {fields
              .filter(
                (f) =>
                  formData[f].type !== "hidden" && formData[f].name !== "phone"
              )
              .map((f, i) => {
                const _field = formData[f];
                return (
                  <React.Fragment key={i}>
                    {_field.name !== "phone" && (
                      <Input
                        data-cy={f}
                        id={f}
                        bgColor={inputBgColor || "#FFFFFF"}
                        type={_field.type}
                        className="form-control"
                        placeholder={_field.place_holder}
                        onChange={(value, valid) => {
                          setVal({
                            ...formData,
                            [f]: { ..._field, value, valid },
                          });
                          if (formStatus.status === "error") {
                            setFormStatus({ status: "idle", msg: "Request" });
                          }
                        }}
                        valid={true}
                        value={_field.value}
                        errorMsg={_field.error}
                        required={_field.required}
                      />
                    )}
                  </React.Fragment>
                );
              })}

            {fields
              .filter((l) => formData[l].name === "phone")
              .map((f, i) => {
                const _field = formData[f];
                return (
                  <PhoneInput
                    key={i}
                    data-cy="phone"
                    id="phone"
                    formData={formData}
                    setVal={setVal}
                    phoneFormValues={formData["phone"]}
                    errorMsg={_field.error}
                    sessionContextLocation={session && session.location}
                  />
                );
              })}

            {selectProgram?.length > 1 && (
              <Div
                data-cy="dropdown_program_selector"
                margin_tablet="0 0 23px 0"
              >
                <SelectRaw
                  style={{
                    background: "#FFFFFF",
                  }}
                  options={selectProgram}
                  placeholder={courseSelector.place_holder}
                  valid={true}
                  onChange={(selected, valid) =>
                    setVal({
                      ...formData,
                      course: { value: selected.value, valid },
                    })
                  }
                />
              </Div>
            )}
            {selectLocation?.length > 1 && (
              <Div
                data-cy="dropdown_location_selector"
                margin_tablet="0 0 23px 0"
              >
                <SelectRaw
                  style={{
                    background: "#FFFFFF",
                  }}
                  options={selectLocation}
                  placeholder={locationSelector.place_holder}
                  valid={true}
                  onChange={(selected, valid) =>
                    setVal({
                      ...formData,
                      utm_location: { value: selected.value, valid },
                    })
                  }
                />
              </Div>
            )}
            {layout === "flex" && (
              <Button
                width="100%"
                justifyContent="center"
                width_tablet={buttonWidth_tablet}
                variant="full"
                type="submit"
                margin="10px 0"
                borderRadius={buttonBorderRadius || "0px 10px 10px 0px"}
                color={
                  formStatus.status === "loading"
                    ? Colors.darkGray
                    : Colors.blue
                }
                textColor={Colors.white}
                disabled={formStatus.status === "loading" ? true : false}
              >
                {formStatus.status === "loading" ? "Loading..." : sendLabel}
              </Button>
            )}
            {session && session.location && session.location.gdpr_compliant && (
              <Paragraph fontSize="11px" margin="5px 0 0 0" textAlign="left">
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={consentValue}
                  onChange={() => {
                    setConsentValue(!consentValue);
                    // setVal({...formData, consent: {...formData.consent, valid: !formData.consent.valid}})
                  }}
                />
                {yml.consent.message}
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="decorated"
                  href={yml.consent.url}
                >
                  {yml.consent.link_label}
                </a>
              </Paragraph>
            )}
            {formStatus.status === "error" && (
              <Alert color="red" margin="0" padding="5px 0 0 0">
                {formStatus.msg}
              </Alert>
            )}
          </GridContainer>
          {layout === "block" && (
            <GridContainer
              containerColumns_tablet={
                landingTemplate && "0fr repeat(12, 1fr) 0fr"
              }
              containerGridGap={landingTemplate && "0"}
            >
              <Div
                justifyContent={
                  justifyContentButton ? justifyContentButton : "end"
                }
                display="flex"
                padding="5px 0 0 0"
              >
                <Button
                  variant="full"
                  type="submit"
                  margin={marginButton}
                  margin_tablet={marginButton_tablet}
                  color={
                    formStatus.status === "loading"
                      ? Colors.darkGray
                      : Colors.blue
                  }
                  textColor={Colors.white}
                  disabled={formStatus.status === "loading" ? true : false}
                >
                  {formStatus.status === "loading" ? "Loading..." : sendLabel}
                </Button>
              </Div>
            </GridContainer>
          )}
        </>
      )}
    </Form>
  );
};

LeadForm.propTypes = {
  heading: PropTypes.string,
  motivation: PropTypes.string,
  sendLabel: PropTypes.string,
  redirect: PropTypes.string,
  layout: PropTypes.string,
  fields: PropTypes.array,
  formHandler: PropTypes.func,
  handleClose: PropTypes.func,
};
LeadForm.defaultProps = {
  heading: null,
  motivation: null,
  sendLabel: "SEND",
  formHandler: null,
  redirect: null,
  handleClose: null,
  layout: "block",
  data: {},
  fields: ["full_name", "phone", "email"],
};
export default LeadForm;
