import React, { useState, useEffect, useContext, useRef } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import ReCAPTCHA from "react-google-recaptcha";
import { GridContainer, Div } from "../Sections";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Colors, Button, Spinner } from "../Styling";
import dayjs from "dayjs";
import { SelectRaw } from "../Select";
import "dayjs/locale/de";
import Icon from "../Icon";
import styled from "styled-components";
import { Input } from "../Form";
import { getCohorts, newsletterSignup } from "../../actions";
import { SessionContext } from "../../session";

const Form = styled.form`
  margin: 0 11px 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UpcomingDates = ({
  id,
  style,
  lang,
  location,
  locations,
  message,
  defaultCourse,
  actionMessage,
  showMoreRedirect,
}) => {
  const dataQuery = useStaticQuery(graphql`
    {
      allUpcomingDatesYaml {
        edges {
          node {
            title
            paragraph
            conector
            to
            remote
            placeholder
            button {
              text
              top_label
            }
            syllabus_alias {
              default_course
              course_slug
              name
              duration
            }
            email_form_content {
              heading
              button_text
              successful_text
            }
            online_bootcamp
            info {
              button_link
              button_text
              program_label
              duration_label
              duration_weeks
              duration_part_time
              duration_full_time
              location_label
            }
            no_course_message
            footer {
              button_text
              button_text_close
              button_text_open
              button_link
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);

  const { session } = useContext(SessionContext);
  const captcha = useRef(null);

  const [data, setData] = useState({
    cohorts: { catalog: [], all: [], filtered: [] },
  });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [academy, setAcademy] = useState(null);

  const [formStatus, setFormStatus] = useState({
    status: "idle",
    msg: "Resquest",
  });
  const [formData, setVal] = useState({
    email: { value: "", valid: false },
    token: { value: null, valid: false },
    consent: { value: true, valid: true },
  });

  const captchaChange = () => {
    const captchaValue = captcha?.current?.getValue();
    if (captchaValue)
      setVal({ ...formData, token: { value: captchaValue, valid: true } });
    else setVal({ ...formData, token: { value: null, valid: false } });
  };

  let content = dataQuery.allUpcomingDatesYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (content) content = content.node;
  else return null;

  const emailFormContent = content.email_form_content;
  const syllabusAlias = content.syllabus_alias;

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const academySlug =
          session?.academyAliasDictionary?.[location] ||
          location ||
          academy?.value;
        const response = await getCohorts({
          academy: academySlug,
          limit: 10,
          syllabus_slug_like: defaultCourse || undefined,
        });

        // const cohorts = response?.results || [];
        const cohorts = [];
        cohorts.forEach((cohort) => {
          const syllabus =
            syllabusAlias.find(
              (syll) => syll.default_course === defaultCourse
            ) ||
            syllabusAlias.find((syll) =>
              cohort.syllabus_version.slug
                .toLowerCase()
                .includes(syll.default_course)
            );

          if (syllabus) {
            cohort.syllabus_version.name = syllabus.name;
            cohort.syllabus_version.courseSlug = syllabus.course_slug;
            cohort.syllabus_version.duration = syllabus.duration;
          }
        });

        setData((oldData) => ({
          cohorts: {
            catalog: oldData.cohorts.catalog,
            all: cohorts,
            filtered: cohorts,
          },
        }));
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    if (session?.academyAliasDictionary) getData();
  }, [session, academy]);

  const formIsValid = (formData = null) => {
    if (!formData) return null;
    for (let key in formData) {
      if (!formData[key].valid) return false;
    }
    return true;
  };

  useEffect(() => {
    if (session && Array.isArray(session.locations)) {
      const _data = {
        ...data,
        cohorts: {
          ...data.cohorts,
          catalog: [{ label: "All Locations", value: null }].concat(
            session.locations.map((l) => ({
              label: l.city,
              value: l.breathecode_location_slug,
            }))
          ),
        },
      };
      setData(_data);
    }
  }, [session]);
  const buttonText = session?.location?.button.apply_button_text;

  return (
    <GridContainer
      id={id}
      style={style}
      margin_tablet="0 auto 48px auto"
      maxWidth="1280px"
      containerColumns_tablet="14fr"
      gridColumn_tablet="1 / 15"
      padding_xxs="0 20px"
      padding_md="40px 80px"
      padding_lg="40px 0px"
      padding_tablet="40px 40px"
    >
      <Div flexDirection="column">
        <H2 textAlign="center">{content?.title}</H2>
        <Div
          padding="30px 0"
          gap="15px"
          style={{ borderBottom: "1px solid black" }}
          justifyContent_tablet="between"
          flexDirection="column"
          flexDirection_tablet="row"
          alignItems_tablet="center"
        >
          <H3 textAlign="left" width="188px">
            {content?.title}
          </H3>
          {!location && (
            <Div
              width_tablet="220px"
              width_md="320px"
              width_xs="320px"
              width_xxs="280px"
            >
              <SelectRaw
                style={{
                  input: (styles) => ({
                    ...styles,
                    width: "100%",
                    margin: "5px 0px",
                  }),
                  control: (styles, state) => ({
                    ...styles,
                    fontFamily: "Lato, sans-serif",
                    background: "#ffffff",
                    border: "1px solid #000",
                    boxShadow: "none",
                    marginBottom: "0px",
                    marginTop: "0px",
                    width: "100%",
                    fontSize: "15px",
                    fontWeight: "400",
                    color: "#000",
                    lineHeight: "22px",
                    "&:hover": { boxShadow: "0 0 0 1px black" },
                    "&:focus": {
                      boxShadow: "0 0 0 1px black",
                      border: "1px solid #000000",
                    },
                  }),
                  option: (
                    styles,
                    { data, isDisabled, isFocused, isSelected }
                  ) => {
                    return {
                      ...styles,
                      fontFamily: "Lato, sans-serif",
                    };
                  },
                }}
                options={data?.cohorts?.catalog}
                placeholder={
                  academy ? `Campus: ${academy.label}` : content.placeholder
                }
                onChange={(opt) => {
                  setAcademy(opt);
                }}
              />
            </Div>
          )}
        </Div>
        {isLoading ? (
          <Div margin="30px 0" justifyContent="center">
            <Spinner />
          </Div>
        ) : (
          <>
            {Array.isArray(data.cohorts.filtered) &&
            data.cohorts.filtered.length > 0 ? (
              data.cohorts.filtered.map((cohort, i) => {
                const loc = locations.find(
                  ({ node }) =>
                    node.breathecode_location_slug === cohort.academy.slug
                );
                return (
                  i < 4 && (
                    <Div
                      key={i}
                      flexDirection="column"
                      flexDirection_tablet="row"
                      style={{ borderBottom: "1px solid black" }}
                      padding="30px 0"
                      justifyContent="between"
                    >
                      <Div
                        flexDirection_tablet="column"
                        width_tablet="15%"
                        alignItems="center"
                        alignItems_tablet="start"
                        margin="0 0 10px 0"
                      >
                        <H4
                          textAlign="left"
                          textTransform="uppercase"
                          width="fit-content"
                          margin="0 10px 0 0"
                          fontWeight="700"
                          lineHeight="22px"
                        >
                          {dayjs(cohort.kickoff_date)
                            .locale(`${lang === "us" ? "en" : "es"}`)
                            .format("MMMM")}
                        </H4>
                        <Paragraph textAlign="left" fontWeight="700">
                          {`
                        ${
                          lang === "us"
                            ? dayjs(cohort.kickoff_date)
                                .locale("en")
                                .format("MM/DD")
                            : dayjs(cohort.kickoff_date)
                                .locale("es")
                                .format("DD/MM")
                        } 
                        ${content.to} 
                        ${
                          lang === "us"
                            ? dayjs(cohort.ending_date)
                                .locale("en")
                                .format("MM/DD")
                            : dayjs(cohort.ending_date)
                                .locale("es")
                                .format("DD/MM")
                        }
                      `}
                        </Paragraph>
                      </Div>
                      <Div
                        flexDirection="column"
                        width_tablet="calc(35% - 15%)"
                        margin="0 0 20px 0"
                      >
                        <H4 textAlign="left" textTransform="uppercase">
                          {content.info.program_label}
                        </H4>

                        <Link
                          to={
                            cohort.syllabus_version.courseSlug
                              ? `/${lang}/coding-bootcamps/${cohort.syllabus_version.courseSlug}`
                              : ""
                          }
                        >
                          <Paragraph textAlign="left" color={Colors.blue}>
                            {cohort.syllabus_version.name}
                          </Paragraph>
                        </Link>
                      </Div>
                      <Div
                        flexDirection="column"
                        display="none"
                        display_tablet="flex"
                        minWidth="120px"
                      >
                        <H4 textAlign="left" textTransform="uppercase">
                          {content.info.location_label}
                        </H4>
                        <Div>
                          <Link
                            to={
                              loc
                                ? `/${lang}/coding-campus/${loc.node.meta_info.slug}`
                                : ""
                            }
                          >
                            <Paragraph textAlign="left" color={Colors.blue}>
                              {cohort.academy.city.name}
                            </Paragraph>
                          </Link>

                          {cohort.academy.slug !== "online" &&
                            cohort.academy.city.name !== "Remote" && (
                              <Paragraph textAlign="left" margin="0 0 0 3px">
                                {content.conector}{" "}
                                <Link
                                  color={Colors.blue}
                                  to={content.online_bootcamp}
                                >
                                  {content.remote}
                                </Link>
                              </Paragraph>
                            )}
                        </Div>
                      </Div>

                      <Div
                        flexDirection="column"
                        display="none"
                        display_tablet="flex"
                      >
                        <H4 textAlign="left" textTransform="uppercase">
                          {content.info.duration_label}
                        </H4>
                        <Paragraph textAlign="left">
                          {cohort?.syllabus_version?.duration ||
                            content.info.duration_weeks}
                        </Paragraph>
                      </Div>

                      <Div
                        display="flex"
                        display_tablet="none"
                        justifyContent="between"
                        margin="0 0 20px 0"
                      >
                        <Div flexDirection="column" width="50%">
                          <H4 textAlign="left" textTransform="uppercase">
                            {content.info.location_label}
                          </H4>
                          <Div>
                            <Link
                              to={
                                loc
                                  ? `/${lang}/coding-campus/${loc.node.meta_info.slug}`
                                  : ""
                              }
                            >
                              <Paragraph textAlign="left" color={Colors.blue}>
                                {cohort.academy.city.name}
                              </Paragraph>
                            </Link>
                            {cohort.academy.slug !== "online" && (
                              <Link to={content.online_bootcamp}>
                                <Paragraph
                                  textAlign="left"
                                  margin="0 0 0 3px"
                                  color={Colors.blue}
                                >
                                  {`${content.conector} ${content.remote}`}
                                </Paragraph>
                              </Link>
                            )}
                          </Div>
                        </Div>
                        <Div flexDirection="column" width="50%">
                          <H4 textAlign="left" textTransform="uppercase">
                            {content.info.duration_label}
                          </H4>
                          <Paragraph textAlign="left">
                            {cohort?.syllabus_version?.duration ||
                              content.info.duration_weeks}
                          </Paragraph>
                        </Div>
                      </Div>
                      <Div flexDirection="column">
                        <Link to={content.info.button_link}>
                          <Button
                            variant="full"
                            width="fit-content"
                            color={Colors.black}
                            margin="10px 0"
                            textColor="white"
                          >
                            {buttonText || content.info.button_text}
                          </Button>
                        </Link>
                      </Div>
                    </Div>
                  )
                );
              })
            ) : (
              <>
                <Div
                  display={showForm ? "none" : "flex"}
                  padding="70px 0"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  padding_tablet="90px 0"
                >
                  <Icon icon="agenda" />
                  {message && (
                    <Paragraph margin="25px 0 0 0">{message}</Paragraph>
                  )}
                  {actionMessage && (
                    <Paragraph
                      color={Colors.blue}
                      onClick={() => setShowForm(true)}
                      width="auto"
                      cursor="pointer"
                      margin="10px 0 0 0"
                      fontWeight="700"
                    >
                      {actionMessage}
                    </Paragraph>
                  )}
                </Div>
                <Div
                  padding="70px 10%"
                  padding_tablet="90px 32%"
                  display={showForm ? "flex" : "none"}
                  flexDirection="column"
                >
                  {formStatus.status === "thank-you" ? (
                    <Div alignItems="center" flexDirection="column">
                      <Icon icon="success" width="80px" height="80px" />{" "}
                      <H4
                        fontSize="15px"
                        lineHeight="22px"
                        margin="25px 0 10px 10px"
                        align="center"
                      >
                        {emailFormContent.successful_text}
                      </H4>
                    </Div>
                  ) : (
                    <>
                      <H4
                        margin="0 0 25px 0"
                        textAlign="left"
                        display="block"
                        display_tablet="block"
                      >
                        {emailFormContent.heading}
                      </H4>
                      <Div justifyContent="center" width="100%">
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (formStatus.status === "error") {
                              setFormStatus({
                                status: "idle",
                                msg: "Resquest",
                              });
                            }
                            if (!formIsValid(formData)) {
                              setFormStatus({
                                status: "error",
                                msg: "There are some errors in your form",
                              });
                            } else {
                              setFormStatus({
                                status: "loading",
                                msg: "Loading...",
                              });
                              newsletterSignup(formData, session)
                                .then((data) => {
                                  if (
                                    data.error !== false &&
                                    data.error !== undefined
                                  ) {
                                    setFormStatus({
                                      status: "error",
                                      msg: "Fix errors",
                                    });
                                  } else {
                                    setFormStatus({
                                      status: "thank-you",
                                      msg: "Thank you",
                                    });
                                  }
                                })
                                .catch((error) => {
                                  console.log("error", error);
                                  setFormStatus({
                                    status: "error",
                                    msg: error.message || error,
                                  });
                                });
                            }
                          }}
                        >
                          <Input
                            type="email"
                            className="form-control"
                            width="100%"
                            placeholder="E-mail *"
                            borderRadius="3px"
                            bgColor={Colors.white}
                            margin="0"
                            onChange={(value, valid) => {
                              setVal({ ...formData, email: { value, valid } });
                              if (formStatus.status === "error") {
                                setFormStatus({
                                  status: "idle",
                                  msg: "Resquest",
                                });
                              }
                            }}
                            value={formData.email.value}
                            errorMsg="Please specify a valid email"
                            required
                          />
                          <Div width="fit-content" margin="10px auto 0 auto">
                            <ReCAPTCHA
                              ref={captcha}
                              sitekey={process.env.GATSBY_CAPTCHA_KEY}
                              onChange={captchaChange}
                            />
                          </Div>
                          <Button
                            height="40px"
                            background={Colors.blue}
                            // margin="0 0 0 10px"
                            type="submit"
                            fontWeight="700"
                            justifyContent="center"
                            margin="35px 0 0 0"
                            width="100%"
                            fontSize="14px"
                            variant="full"
                            color={
                              formStatus.status === "loading" ||
                              !formData.token.valid
                                ? Colors.darkGray
                                : Colors.blue
                            }
                            textColor={Colors.white}
                            disabled={
                              formStatus.status === "loading" ||
                              !formData.token.valid
                                ? true
                                : false
                            }
                          >
                            {formStatus.status === "loading"
                              ? "Loading..."
                              : emailFormContent.button_text}
                          </Button>
                        </Form>
                      </Div>
                    </>
                  )}
                </Div>
              </>
            )}
            {Array.isArray(data.cohorts.filtered) &&
              data.cohorts.filtered.length > 0 &&
              showMoreRedirect && (
                <Link to={content.footer.button_link}>
                  <Paragraph margin="20px 0" color={Colors.blue}>
                    {content.footer.button_text}
                  </Paragraph>
                </Link>
              )}
          </>
        )}
      </Div>
    </GridContainer>
  );
};

export default UpcomingDates;
