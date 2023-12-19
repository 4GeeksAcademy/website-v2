import React, { useState, useEffect, useContext } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GridContainer, Div, Grid } from "../Sections";
import { H2, H3, H4, H5, Paragraph } from "../Heading";
import { Colors, Button, Img, Anchor } from "../Styling";
import dayjs from "dayjs";
import Select, { SelectRaw } from "../Select";
import "dayjs/locale/de";
import Icon from "../Icon";
import styled from "styled-components";
import { Input } from "../Form";
import { getCohorts, newsletterSignup } from "../../actions";
import { SessionContext } from "../../session";
import { node } from "prop-types";

const info = {
  us: {
    "full-stack": "/us/coding-bootcamps/part-time-full-stack-developer",
    "software-engineering": "/us/coding-bootcamps/software-engineer-bootcamp",
    "machine-learning-pt-16w":
      "/us/coding-bootcamps/machine-learning-engineering",
    "full-stack-ft": "/us/coding-bootcamps/full-time-full-stack-developer",
  },
  es: {
    "full-stack": "/es/coding-bootcamps/full-stack-part-time",
    "software-engineering":
      "/es/coding-bootcamps/ingenieria-de-software-programacion",
    "machine-learning-pt-16w":
      "/es/coding-bootcamps/curso-inteligencia-artificial",
    "full-stack-ft": "/es/coding-bootcamps/full-stack-full-time",
  },
};
const locationUrls = {
  us: {
    "santiago-chile": "/us/coding-campus/coding-bootcamp-santiago",
    "downtown-miami": "/us/coding-campus/coding-bootcamp-miami",
    "madrid-spain": "/us/coding-campus/coding-bootcamp-madrid",
    online: "/us/coding-campus/online-coding-bootcamp",
    "caracas-venezuela": "/us/coding-campus/coding-bootcamp-caracas",
    "costa-rica": "/us/coding-campus/coding-bootcamp-costa-rica",
  },
  es: {
    "downtown-miami": "/es/coding-campus/bootcamp-programacion-miami",
    "santiago-chile": "/es/coding-campus/bootcamp-programacion-santiago",
    "madrid-spain": "/es/coding-campus/bootcamp-programacion-madrid",
    online: "/es/coding-campus/online-bootcamp-programacion",
    "caracas-venezuela": "/es/coding-campus/bootcamp-programacion-caracas",
    "costa-rica": "/es/coding-campus/bootcamp-programacion-costa-rica",
  },
};
const locationText = {
  us: "or",
  es: "u",
};
let modality = {
  full_time: "Full Stack Developer - Full Time",
  part_time: "Full Stack Developer - Part Time",
};

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
  actionMessage,
}) => {
  const dataQuery = useStaticQuery(graphql`
    {
      allUpcomingDatesYaml {
        edges {
          node {
            title
            paragraph
            button {
              text
              top_label
            }
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

  const [data, setData] = useState({
    cohorts: { catalog: [], all: [], filtered: [] },
  });
  const [showForm, setShowForm] = useState(false);
  const [academy, setAcademy] = useState(null);
  const [filterType, setFilterType] = useState({
    label: "Upcoming Courses and Events",
    value: "cohorts",
  });

  const [formStatus, setFormStatus] = useState({
    status: "idle",
    msg: "Resquest",
  });
  const [formData, setVal] = useState({
    email: { value: "", valid: false },
    consent: { value: true, valid: true },
  });

  let content = dataQuery.allUpcomingDatesYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (content) content = content.node;
  else return null;

  useEffect(() => {
    const getData = async () => {
      const academySlug = session.academyAliasDictionary[location]
        ? session.academyAliasDictionary[location]
        : location;
      let cohorts = await getCohorts({ academy: academySlug, limit: 10 });
      cohorts = cohorts?.results || [];
      console.log("cohorts upcoming", cohorts);
      let syllabus = [];
      for (let i in cohorts) {
        let name = cohorts[i].syllabus_version.name;
        name === "Full-Stack Software Developer FT"
          ? (name = modality["full_time"])
          : name;
        name === "Full-Stack Software Developer"
          ? (name = modality["part_time"])
          : name;
        syllabus.push(name);
      }

      for (let zx in cohorts) {
        // console.log("COHORTS - modified", cohorts[zx].syllabus_version.name)
        cohorts[zx].syllabus_version.name = syllabus[zx];
      }

      setData((oldData) => ({
        cohorts: {
          catalog: oldData.cohorts.catalog,
          all: cohorts,
          filtered: cohorts,
        },
      }));
    };
    if (session?.academyAliasDictionary) getData();
  }, [session]);

  const formIsValid = (formData = null) => {
    if (!formData) return null;
    for (let key in formData) {
      if (!formData[key].valid) return false;
    }
    return true;
  };

  const emailFormContent = {
    heading:
      lang === "us"
        ? "Send your email to notify you when there is a date available for this campus"
        : "Indicanos tu mail para avisarte cuando haya una fecha disponible para este campus",
    buttonText:
      lang === "us"
        ? "Let me know when there is a date"
        : "Avisenme cuando haya una fecha",
    successfulText:
      lang === "us"
        ? "Thanks for subscribing! We will notify you when there is a date available for this campus."
        : "¡Listo! Te avisaremos cuando haya una fecha disponible para este campus",
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
      margin_tablet="0 auto 0 auto"
      maxWidth="1366px"
      containerColumns_tablet="14fr"
      gridColumn_tablet="1 / 15"
      padding="0 20px"
      paddingChild="0"
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
                options={data?.cohorts?.catalog}
                placeholder={
                  lang == "us"
                    ? academy
                      ? "Campus: " + academy.label
                      : "Select one academy"
                    : academy
                    ? "Campus: " + academy.label
                    : "Escoge una academia"
                }
                onChange={(opt) => {
                  setAcademy(opt);
                  setData({
                    ...data,
                    [filterType.value]: {
                      ...data[filterType.value],
                      filtered:
                        opt.label !== "All Locations"
                          ? data[filterType.value].all.filter(
                              (elm) => elm.academy.slug === opt.value
                            )
                          : data[filterType.value].all,
                    },
                  });
                }}
              />
            </Div>
          )}
        </Div>
        {Array.isArray(data.cohorts.filtered) &&
        data.cohorts.filtered.length > 0 ? (
          data.cohorts.filtered.map((m, i) => {
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
                      {dayjs(m.kickoff_date)
                        .locale(`${lang === "us" ? "en" : "es"}`)
                        .format("MMMM")}
                    </H4>
                    <Paragraph textAlign="left" fontWeight="700">
                      {`
                                ${
                                  lang === "us"
                                    ? dayjs(m.kickoff_date)
                                        .locale("en")
                                        .format("MM/DD")
                                    : dayjs(m.kickoff_date)
                                        .locale("es")
                                        .format("DD/MM")
                                } 
                                ${lang === "us" ? " to " : " al "} 
                                ${
                                  lang === "us"
                                    ? dayjs(m.ending_date)
                                        .locale("en")
                                        .format("MM/DD")
                                    : dayjs(m.ending_date)
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

                    <Link to={info[lang][m.syllabus_version.slug] || ""}>
                      <Paragraph textAlign="left" color={Colors.blue}>
                        {m.syllabus_version.name}
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
                      <Link to={locationUrls[lang][m.academy.slug] || ""}>
                        <Paragraph textAlign="left" color={Colors.blue}>
                          {m.academy.city.name}
                        </Paragraph>
                      </Link>

                      {m.academy.slug != "online" && (
                        <Paragraph textAlign="left" margin="0 0 0 3px">
                          {locationText[lang]}{" "}
                          <Link
                            color={Colors.blue}
                            to={locationUrls[lang]["online"] || ""}
                          >{`Online`}</Link>
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
                      {m.syllabus_version.name === modality["full_time"]
                        ? content.info.duration_full_time
                        : m.syllabus_version.name === modality["part_time"]
                        ? content.info.duration_part_time
                        : content.info.duration_weeks}
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
                        <Link to={locationUrls[lang][m.academy.slug] || ""}>
                          <Paragraph textAlign="left" color={Colors.blue}>
                            {m.academy.city.name}
                          </Paragraph>
                        </Link>
                        {m.academy.slug != "online" && (
                          <Link to={locationUrls[lang]["online"] || ""}>
                            <Paragraph
                              textAlign="left"
                              margin="0 0 0 3px"
                              color={Colors.blue}
                            >{`${locationText[lang]} Online`}</Paragraph>
                          </Link>
                        )}
                      </Div>
                    </Div>
                    <Div flexDirection="column" width="50%">
                      <H4 textAlign="left" textTransform="uppercase">
                        {content.info.duration_label}
                      </H4>
                      <Paragraph textAlign="left">
                        {m.syllabus_version.name === modality["full_time"]
                          ? content.info.duration_full_time
                          : m.syllabus_version.name === modality["part_time"]
                          ? content.info.duration_part_time
                          : content.info.duration_weeks}
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
              {message && <Paragraph margin="25px 0 0 0">{message}</Paragraph>}
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
                    {emailFormContent.successfulText}
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
                          setFormStatus({ status: "idle", msg: "Resquest" });
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
                            setFormStatus({ status: "idle", msg: "Resquest" });
                          }
                        }}
                        value={formData.email.value}
                        errorMsg="Please specify a valid email"
                        required
                      />
                      {/* <button type="submit">{formStatus.status === "loading" ? "Loading..." : "text"}</button> */}
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
                        borderRadius="3px"
                        color={
                          formStatus.status === "loading"
                            ? Colors.darkGray
                            : Colors.blue
                        }
                        textColor={Colors.white}
                        disabled={
                          formStatus.status === "loading" ? true : false
                        }
                      >
                        {formStatus.status === "loading"
                          ? "Loading..."
                          : emailFormContent.buttonText}
                      </Button>
                    </Form>
                  </Div>
                </>
              )}
            </Div>
          </>
        )}
        {Array.isArray(data.cohorts.filtered) &&
          data.cohorts.filtered.length > 0 && (
            <Link to={content.footer.button_link}>
              <Paragraph margin="20px 0" color={Colors.blue}>
                {content.footer.button_text}
              </Paragraph>
            </Link>
          )}
      </Div>
    </GridContainer>
  );
};

export default UpcomingDates;
