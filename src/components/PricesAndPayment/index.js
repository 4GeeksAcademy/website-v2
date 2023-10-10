import React, { useState, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Icon from "../Icon";
import Toggle from "../ToggleSwitch";
import { Link } from "../Styling/index";
import { GridContainer, Div, Grid } from "../Sections";
import Select, { SelectRaw } from "../Select";
import { H2, H3, H4, H5, Paragraph } from "../Heading";
import { Button, Colors, RoundImage, Img } from "../Styling";
import { SessionContext } from "../../session";

const PricingCard = ({
  data,
  info,
  selectedPlan,
  setSelectedPlan,
  buttonText,
  jobGuarantee,
  index,
}) => {
  const { session, setSession } = useContext(SessionContext);
  const { recomended, scholarship, payment_time, slug } = data;
  const isSelected = selectedPlan === slug;
  return (
    <>
      <Div
        cursor="pointer"
        display="block"
        width="100%"
        onClick={() => {
          setSelectedPlan(slug);
        }}
        height="fit-content"
      >
        {recomended && (
          <Div background={Colors.blue}>
            <Paragraph
              color={Colors.white}
              fontWeight_tablet="700"
              fontSize="1"
              opacity="1"
            >
              {info.recomended}
            </Paragraph>
          </Div>
        )}
        <Div
          border={`2px solid ${Colors.blue}`}
          padding="15px 12px"
          display="block"
        >
          <Div className="price-section" justifyContent="between" width="100%">
            <Div alignItems="center">
              <Div
                border={`1px solid ${isSelected ? Colors.blue : "#A4A4A4"}`}
                width="21px"
                height="21px"
                borderRadius="15px"
                background={isSelected ? Colors.blue : Colors.white}
                margin="0 10px 0 0"
                padding="3px"
                flexShrink="0"
                flexShrink_tablet="0"
              >
                {isSelected && (
                  <Icon
                    icon="check"
                    width="14px"
                    height="14px"
                    color={Colors.white}
                    fill={Colors.white}
                  />
                )}
              </Div>
              <Div display="block">
                <Paragraph
                  lineHeight="14px"
                  fontWeight_tablet="700"
                  color={Colors.black}
                  opacity="1"
                  textAlign="left"
                  margin="0 0 5px 0"
                >
                  {scholarship}
                </Paragraph>
                <Paragraph
                  lineHeight="14px"
                  color={Colors.black}
                  opacity="1"
                  textAlign="left"
                >
                  {payment_time}
                </Paragraph>
              </Div>
            </Div>
            <Div className="price-container" display="block">
              <Paragraph
                fontWeight_tablet="700"
                color={Colors.black}
                opacity="1"
              >
                <span style={{ fontSize: "36px" }}>
                  {!jobGuarantee ? data.price : data.job_guarantee_price}
                </span>
              </Paragraph>
              {!jobGuarantee && (
                <Paragraph
                  fontWeight_tablet="700"
                  color={Colors.black}
                  opacity="1"
                  textAlign="right"
                >
                  <s>{data.original_price}</s>
                </Paragraph>
              )}
            </Div>
          </Div>

          {data.icons && data.icons.length !== 0 && (
            <Div
              className="icons"
              background={Colors.verylightGray}
              padding="4px 7px"
              borderRadius="26px"
              width="fit-content"
              alignItems="center"
              margin="15px 0 0 0"
            >
              {data.icons.map((icon) => (
                <Img
                  src={icon}
                  alt="4Geeks Academy Icon"
                  backgroundSize="contain"
                  height="17px"
                  minWidth="30px"
                  width="auto"
                  margin="0 5px"
                />
              ))}
            </Div>
          )}
        </Div>
      </Div>
      {isSelected && (
        <Div
          className="expandable"
          display="block"
          display_tablet="none"
          margin="10px 0 0 0"
          background="#F9F9F9"
          border="1px solid #EBEBEB"
          padding="15px 12px"
          width="100%"
        >
          <H3 textAlign="center" margin="0 0 15px 0">
            {info.plan_details}
          </H3>
          {data.bullets &&
            data.bullets.map((bullet) => (
              <Div alignItems="center" margin="10px 0 0 0">
                <Icon
                  icon="check"
                  width="17px"
                  height="17px"
                  style={{ marginRight: "10px" }}
                  color={Colors.blue}
                  fill={Colors.blue}
                />
                <Paragraph
                  lineHeight="19px"
                  fontWeight="700"
                  fontWeight_tablet="700"
                  color={Colors.black}
                  opacity="1"
                  textAlign="left"
                >
                  {bullet}
                </Paragraph>
              </Div>
            ))}
          <Link
            style={{
              marginTop: "15px",
              display: "block",
            }}
            to={`${info.apply_button.link}${selectedPlan ? `?utm_plan=${selectedPlan}` : ""
              }`}
          >
            <Button
              variant="full"
              width="100%"
              color={Colors.black}
              textColor={Colors.white}
              fontSize="16px"
              margin="auto"
              textAlign="center"
              display="block"
              onClick={() => {
                if (selectedPlan) {
                  setSession({
                    ...session,
                    utm: { ...session.utm, utm_plan: selectedPlan },
                  });
                }
              }}
            >
              {buttonText || info.apply_button.label}
            </Button>
          </Link>
        </Div>
      )}
    </>
  );
};

const ChartSection = ({ info, currentLocation }) => {
  const statistics = currentLocation?.chart_section || info.chart_section;
  return (
    <Div
      className="chart-section"
      maxWidth_md="800px"
      width_xs="80%"
      margin="auto"
      display="block"
    >
      <H3 margin=" 0 auto 10px auto" fontSize="26px" lineHeight="31.2px">
        {info.chart_section.title}
      </H3>
      <Div
        margin="25px 0 15px 0"
        gap="10px"
        flexWrap="wrap"
        flexWrap_md="nowrap"
      >
        <Div
          id="chart-image"
          width="100%"
          width_xs="300px"
          margin="auto"
        // height="256px"
        >
          <Icon icon="payments_chart" style={{ margin: "auto" }} />
        </Div>
        <Div id="data" flexWrap="wrap" justifyContent="between">
          {statistics &&
            Array.isArray(statistics.data) &&
            statistics.data.map((item, i) => (
              <Div
                width={i === 0 ? "100%" : "48%"}
                height="auto"
                border={`1px solid ${item.color}`}
                className="info"
                margin="0 0 4% 0"
              >
                <Div
                  flexShrink_tablet="0"
                  // height="100%"
                  width="19.39px"
                  background={item.color}
                />
                <Div padding="10px" display="block">
                  <H5
                    margin={i !== 0 && "0 0 10px 0"}
                    textAlign="left"
                    color={item.color}
                  >
                    {item.percentage}
                  </H5>
                  <Paragraph
                    fontWeight_tablet="700"
                    fontSize="16px"
                    lineHeight="19px"
                    textAlign="left"
                    opacity="1"
                  >
                    {item.description}
                  </Paragraph>
                </Div>
              </Div>
            ))}
        </Div>
      </Div>
    </Div>
  );
};

const courseArray = [
  {
    value: "full_stack",
    label: "Full Stack Developer",
  },
  {
    value: "software_engineering",
    label: "Software Engineering",
  },
  {
    value: "machine_learning",
    label: "Machine Learning",
  },
  {
    value: "datascience-ml",
    label: "Datascience & Machine Learning",
  },
];
const modalityArray = [
  {
    value: "part_time",
    label: "Part Time",
  },
  {
    value: "full_time",
    label: "Full Time",
  },
];

const PricesAndPayments = (props) => {
  const data = useStaticQuery(graphql`
    query PricesAndPayments {
      content: allPricesAndPaymentYaml {
        edges {
          node {
            fields {
              lang
            }
            pricing_error_contact
            pricing_error
            get_notified
            top_label
            plans_title
            plan_details
            select
            job_guarantee {
              title
              description
            }
            recomended
            not_available
            not_available_job_guarantee
            apply_button {
              label
              link
            }
            chart_section {
              title
              data {
                percentage
                color
                description
              }
            }
            button {
              button_text
              button_link
            }
          }
        }
      }
      allPlansYaml {
        edges {
          node {
            full_time {
              slug
              academies
              recomended
              scholarship
              payment_time
              price
              job_guarantee_price
              bullets
              icons
            }
            part_time {
              slug
              academies
              recomended
              scholarship
              payment_time
              price
              original_price
              job_guarantee_price
              bullets
              icons
            }
            fields {
              lang
              file_name
            }
          }
        }
      }
    }
  `);
  let info = data.content.edges.find(
    ({ node }) => node.fields.lang === props.lang
  );
  if (info) info = info.node;

  const getCurrentPlans = () => {
    return data.allPlansYaml.edges
      .filter(({ node }) => node.fields.lang === props.lang)
      .find((p) =>
        p.node.fields.file_name.includes(props.courseType?.replaceAll("_", "-"))
      )?.node[props.programType];
  };

  const { session, setSession } = useContext(SessionContext);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [course, setCourse] = useState(false);
  const [modality, setModality] = useState(false);
  const [buttonText, setButtonText] = useState(null);
  const [locations, setLocations] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [jobGuarantee, setJobGuarantee] = useState(false);
  const [currentPlans] = useState(getCurrentPlans());
  const [availablePlans, setAvailablePlans] = useState([]);

  const getAvailablePlans = () => {
    if (currentPlans && currentLocation) {
      return currentPlans
        .filter((plan) =>
          plan.academies.includes(currentLocation.fields.file_name.slice(0, -3))
        )
        .filter((plan) => {
          if (jobGuarantee) {
            if (plan.job_guarantee_price) return true;
            return false;
          }
          return true;
        })
        .sort((a) => (a.recomended ? -1 : 1));
    }
    return [];
  };

  // const steps = props.details.details_modules.reduce((total, current, i) => [...total, (total[i - 1] || 0) + current.step], [])
  useEffect(() => {
    setLocations(
      props.locations
        .filter(
          (l) =>
            (l.node.meta_info.visibility !== undefined ||
              l.node.meta_info.visibility === "visible") &&
            !l.node.meta_info.slug.includes("online")
        )
        .sort((a, b) => (a.node.name > b.node.name ? 1 : -1))
    );
    if (session && session.location) {
      const _loc = props.locations.find(
        (l) =>
          l.node.active_campaign_location_slug ===
          session.location.active_campaign_location_slug
      );
      setCurrentLocation(_loc ? _loc.node : null);
    }
  }, [session, props.locations]);

  useEffect(() => {
    setJobGuarantee(false);
  }, [currentLocation]);

  useEffect(() => {
    const filteredPlans = getAvailablePlans();
    setAvailablePlans(filteredPlans);
    setSelectedPlan(filteredPlans[0]?.slug);
  }, [jobGuarantee, currentLocation]);

  // sync property course
  useEffect(
    () => (
      setCourse(courseArray.find((c) => c.value === props.courseType)),
      setModality(modalityArray.find((d) => d.value === props.programType))
    ),
    [props.courseType, props.programType]
  );

  const city = session && session.location ? session.location.city : [];

  const findCity = props.locations.find((loc) => loc.node?.city === city);
  useEffect(() => {
    if (findCity !== undefined && findCity.node) {
      setButtonText(findCity.node.button?.apply_button_text);
    }
  }, [findCity]);

  const selected = availablePlans.find((plan) => plan.slug === selectedPlan);

  return (
    <Div
      id="prices_and_payment"
      background={props.background}
      github="/location"
      flexDirection="column"
      padding="50px 0"
      padding_tablet="70px 0"
      maxWidth_md="1366px"
      margin="0 auto"
    >
      {/* <GridContainer margin="0 0 25px 0" margin_tablet="0 0 25px 0">
        <Div display="flex" flexDirection="column" alignItems="center">
          <H2 margin="0 0 15px 0" fontWeight="900">
            {props.title}
          </H2>
          <Paragraph>{props.paragraph}</Paragraph>
        </Div>
      </GridContainer> */}
      <H2
        fontSize="38px"
        lineHeight="46px"
        textAlign="center"
        width="100%"
        margin="0 0 20px 0"
      >
        {info.plans_title}
      </H2>
      <Grid gridTemplateColumns_tablet="2fr repeat(15,1fr) 2fr">
        <Div gridColumn_tablet="2/12">
          <Paragraph
            fontSize="24px"
            lineHeight="29px"
            textAlign="start"
            width="100%"
            margin="0 0 20px 0"
            opacity="1"
            color={Colors.black}
            gridColumn="2/9"
          >
            {info.select}
          </Paragraph>
        </Div>
        {/* SELECT COUNTRY */}
        <Div
          margin="0 0 70px 0"
          margin_tablet="0 0 25px 0"
          margin_xs="0 0 30px 0"
          gridColumn_tablet="12/16"
        >
          <Div
            flexDirection_tablet="row"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {
              props.course && (
                <Select
                  top="40px"
                  left="20px"
                  width="fit-content"
                  topLabel="Location"
                  options={courseArray}
                  openLabel={course ? course.label : props.openedLabel}
                  closeLabel={course ? course.label : props.closedLabel}
                  onSelect={(opt) => setCourse(opt)}
                />
              )}
            &nbsp;
            {
              course && (
                <Div width="320px">
                  <SelectRaw
                    bgColor={Colors.white}
                    topLabel="Location"
                    options={locations.map((l) => ({
                      label: l.node.name,
                      value: l.node.active_campaign_location_slug,
                    }))}
                    placeholder={info.top_label}
                    value={{
                      label: currentLocation?.name,
                      value: currentLocation?.active_campaign_location_slug,
                    }}
                    onChange={(opt) =>
                      setCurrentLocation(
                        locations.find(
                          (l) =>
                            l.node.active_campaign_location_slug === opt.value
                        ).node
                      )
                    }
                  />
                </Div>
              )}
          </Div>
        </Div>
      </Grid>



      {/* <Div display="block" minHeight_tablet="600px" padding_md="20px"> */}
      {/* <ChartSection info={info} currentLocation={currentLocation} /> */}
      <Div
        //border="1px solid #000"
        background="#FFF"
        padding_xs="18px 15px"
        padding_sm="38px"
        padding_tablet="38px 0px"
        maxWidth_md="1366px"
        minWidth_md="580px"
        width_md="auto"
        width_xs="80%"
        margin_sm="auto"
        margin_xs="20px auto"
        margin="20px auto"
      //display="block"
      >
        {availablePlans && availablePlans.length === 0 ?
          <Div
            fontSize="25px"
            display="block"
            textAlign="center"
            dangerouslySetInnerHTML={{
              __html: jobGuarantee
                ? info.not_available_job_guarantee
                : info.not_available,
            }}
          />
          : <>
            {availablePlans.some((plan) => plan.job_guarantee_price) && (
              <Div
                background={Colors.veryLightBlue}
                padding="10px"
                margin="20px 0 20px 0"
              >
                <Div alignItems="center">
                  <Toggle
                    isChecked={jobGuarantee}
                    onChange={() => setJobGuarantee(!jobGuarantee)}
                  />
                  <H4
                    textAlign="left"
                    fontWeight="700"
                    fontSize="18px"
                    margin="0 0 0 10px"
                  >
                    {info.job_guarantee.title}
                  </H4>
                </Div>
                <Paragraph textAlign="left" color={Colors.black} opacity="1">
                  {info.job_guarantee.description}
                </Paragraph>
              </Div>
            )}
            <Grid
              gridTemplateColumns_tablet="3fr repeat(20,1fr) 3fr"
              gridTemplateRows_tablet="1fr"
              gap="10px"
              margin="0 0 15px 0"
            >
              {availablePlans && availablePlans.length > 0 && (
                <Div
                  display="none"
                  display_tablet="block"
                  background="#F9F9F9"
                  border="1px solid #EBEBEB"
                  padding="10px"
                  gridColumn_tablet="2/12"
                  gridRow="1"
                >
                  <H3 textAlign="center" margin="0 0 20px 0">
                    {info.plan_details}
                  </H3>
                  <hr style={{ border: "1px solid #ebebeb" }} />
                  {selected?.bullets &&
                    selected.bullets.map((bullet) => (
                      <Div alignItems="center" margin="10px 0 0 0">
                        <Icon
                          icon="check"
                          width="17px"
                          height="17px"
                          style={{ marginRight: "10px" }}
                          color={Colors.blue}
                          fill={Colors.blue}
                        />
                        <Paragraph
                          lineHeight="19px"
                          fontWeight="700"
                          fontWeight_tablet="700"
                          color={Colors.black}
                          opacity="1"
                          textAlign="left"
                        >
                          {bullet}
                        </Paragraph>
                      </Div>
                    ))}
                </Div>
              )}
              <Div
                className="cards-container"
                flexWrap="wrap"
                justifyContent_tablet="between"
                justifyContent_xs="evenly"
                gap="15px"
                gridColumn_tablet="12/22"
                gridRow="1"
              >
                {availablePlans &&
                  availablePlans.map((plan, index) => (
                    <PricingCard
                      data={plan}
                      info={info}
                      selectedPlan={selectedPlan}
                      setSelectedPlan={setSelectedPlan}
                      index={index}
                      buttonText={buttonText}
                      jobGuarantee={jobGuarantee}
                    />
                  ))}
                {availablePlans && availablePlans.length !== 0 && (
                  <Div
                    display="none"
                    display_tablet="flex"
                    flexDirection="row-reverse"
                  >
                    <Link
                      style={{
                        display: "block",
                      }}
                      to={`${info.apply_button.link}${selectedPlan ? `?utm_plan=${selectedPlan}` : ""
                        }`}
                    >
                      <Button
                        variant="full"
                        width="100%"
                        color={Colors.black}
                        textColor={Colors.white}
                        fontSize="16px"
                        margin="auto"
                        textAlign="center"
                        display="block"
                        onClick={() => {
                          if (selectedPlan) {
                            setSession({
                              ...session,
                              utm: { ...session.utm, utm_plan: selectedPlan },
                            });
                          }
                        }}
                      >
                        {buttonText || info.apply_button.label}
                      </Button>
                    </Link>
                  </Div>
                )}
              </Div>

            </Grid>

          </>}
      </Div>
      {/* </Div> */}
      <GridContainer
        columns_tablet="12"
        gridGap="0"
        margin_tablet="55px 0 37px 0"
      >
        <Div
          gridArea_tablet="1/5/1/9"
          justifyContent="center"
          alignItems="center"
        >
          <H4
            fontSize="13px"
            lineHeight="22px"
            width="fit-content"
            color={Colors.darkGray}
          >
            We accept:{" "}
          </H4>
          <RoundImage
            url="/images/bitcoin.png"
            height="10px"
            width="65px"
            bsize="contain"
            margin="0 15px"
          />
          <RoundImage
            url="/images/ethereum.png"
            height="20px"
            width="65px"
            bsize="contain"
          />
        </Div>
      </GridContainer>
      <Paragraph margin="35px 0 0 0">{info.get_notified}</Paragraph>
      {/* <Div background={Colors.lightYellow} height="511px" width="100%" style={{position: "absolute", height: "511px"}}>f</Div> */}
    </Div>
  );
};
export default PricesAndPayments;
