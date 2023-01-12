import React, { useState, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Icon from "../Icon";
import { Link } from "../Styling/index";
import { GridContainer, Div } from "../Sections";
import Select, { SelectRaw } from "../Select";
import { H2, H3, H4, H5, Paragraph } from "../Heading";
import { Button, Colors, RoundImage, Img } from "../Styling";
import { SessionContext } from "../../session";

const PricingCard = ({
  data,
  info,
  selectedPlan,
  setSelectedPlan,
  index,
  plansLength,
  session,
  setSession,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { recomended, scholarship, payment_time, slug } = data;
  const isSelected = selectedPlan === slug;
  return (
    <Div
      cursor="pointer"
      display="block"
      width="320px"
      width_tablet={plansLength % 2 !== 0 && index === 0 ? "100%" : "49%"}
      minWidth_tablet="240px"
      margin_xs="0 0 15px 0"
      margin_tablet="0 5px 15px 0"
      onClick={() => {
        setSelectedPlan(slug);
        // setSession({ ...session, financing_plan: slug });
      }}
      height="fit-content"
    >
      {recomended && (
        <Div
          // display_xs="none"
          // display_tablet="block"
          background={Colors.blue}
          borderRadius="4px 4px 0 0"
        >
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
        border={`2px solid ${isSelected ? Colors.black : Colors.blue}`}
        // borderRadius_tablet={recomended ? "0 0 4px 4px" : "4px"}
        // borderRadius_sm="4px"
        borderRadius={recomended ? "0 0 4px 4px" : "4px"}
        background={isSelected ? Colors.black : Colors.white}
        padding="15px 12px"
        display="block"
      >
        <Div className="price-section" justifyContent="between" width="100%">
          <Div display="block">
            <Paragraph
              lineHeight="14px"
              fontWeight_tablet="700"
              color={isSelected ? Colors.white : Colors.black}
              opacity="1"
              textAlign="left"
              margin="0 0 5px 0"
            >
              {scholarship}
            </Paragraph>
            <Paragraph
              lineHeight="14px"
              color={isSelected ? Colors.white : Colors.black}
              opacity="1"
              textAlign="left"
            >
              {payment_time}
            </Paragraph>
          </Div>
          <Div className="price-container" flexShrink_tablet="0">
            <Paragraph
              fontWeight_tablet="700"
              color={isSelected ? Colors.white : Colors.black}
              opacity="1"
            >
              <span style={{ fontSize: "36px" }}>{data.price}</span>
            </Paragraph>
          </Div>
        </Div>
        <Div className="expandable" display="block" margin="10px 0 0 0">
          <Button onClick={() => setIsOpen(!isOpen)} margin="auto">
            <Icon
              icon={isOpen ? "angleup" : "angledown"}
              width="24px"
              height="24px"
              color={Colors.blue}
              fill={Colors.blue}
            />
          </Button>

          <hr style={{ color: "#A4A4A4" }} />

          <Div className="bullets" display={isOpen ? "block" : "none"}>
            {data.bullets &&
              data.bullets.map((bullet) => (
                <Div alignItems="center" margin="10px 0 0 0">
                  <Icon
                    icon="check"
                    width="17px"
                    height="17px"
                    style={{ marginRight: "10px" }}
                    color={isSelected ? Colors.white : Colors.black}
                    fill={isSelected ? Colors.white : Colors.black}
                  />
                  <Paragraph
                    lineHeight="19px"
                    fontWeight_tablet="500"
                    color={isSelected ? Colors.white : Colors.black}
                    opacity="1"
                    textAlign="left"
                  >
                    {bullet}
                  </Paragraph>
                </Div>
              ))}
          </Div>
        </Div>
        {data.icons && data.icons.length !== 0 && (
          <Div
            className="icons"
            background={isSelected ? Colors.white : Colors.verylightGray}
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
  );
};

const ChartSection = ({ info, mobile }) => (
  <Div
    className="chart-section"
    background="#000"
    padding="20px 14px"
    borderRadius="4px"
    maxWidth_sm="385px"
    width_xs="80%"
    margin="auto"
    display={mobile ? "block" : "none"}
    display_md={mobile ? "none" : "block"}
    position_sm="static"
    position_md="absolute"
    // left="6%"
    left="-360px"
    // left_lg="150px"
    top="-2%"
  >
    <H3 color={Colors.blue} margin="auto" fontSize="26px" lineHeight="31.2px">
      {info.chart_section.title}
    </H3>
    <Div
      id="chart-image"
      margin="15px 0"
      borderRadius="4px"
      background="#101010"
      width="100%"
      height="256px"
      flexDirection="column"
      justifyContent="center"
    >
      <Icon icon="payments_chart" style={{ margin: "auto" }} />
    </Div>
    <Div id="legend" flexWrap="wrap" justifyContent="between">
      {info.chart_section &&
        Array.isArray(info.chart_section.legend) &&
        info.chart_section.legend.map((item, i) => (
          <Div
            width={i === 0 ? "100%" : "48%"}
            border="1px solid #FFF"
            borderRadius="4px"
            className="info"
            margin="0 0 4% 0"
          >
            <Div
              flexShrink_tablet="0"
              borderRadius="4px 0px 0px 4px"
              height="100%"
              width="19.39px"
              background={item.color}
            />
            <Div padding={i === 0 ? "10px" : "5px"} display="block">
              <H5
                margin={i !== 0 && "0 0 10px 0"}
                textAlign="left"
                color={i === 0 ? item.color : Colors.white}
              >
                {item.percentage}
              </H5>
              <Paragraph
                fontWeight_tablet="700"
                fontSize={i === 0 ? "16px" : "12px"}
                lineHeight={i === 0 ? "19px" : "14.4px"}
                color="#FFF"
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
);

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

const PricesAndPaymentsV2 = (props) => {
  const data = useStaticQuery(graphql`
    query PricesAndPaymentsV2 {
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
            select
            recomended
            not_available
            apply_button {
              label
              link
            }
            chart_section {
              title
              legend {
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
  const [locations, setLocations] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentPlans] = useState(getCurrentPlans);

  const availablePlans =
    currentPlans && currentLocation
      ? currentPlans.filter((plan) =>
          plan.academies.includes(currentLocation.fields.file_name.slice(0, -3))
        )
      : [];

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
    if (selectedPlan) {
      setSelectedPlan(null);
      // setSession({ ...session, financing_plan: null });
    }
  }, [currentLocation]);

  // sync property course
  useEffect(
    () => (
      setCourse(courseArray.find((c) => c.value === props.courseType)),
      setModality(modalityArray.find((d) => d.value === props.programType))
    ),
    [props.courseType, props.programType]
  );

  return (
    <Div
      id="prices_and_payment"
      background={props.background}
      github="/location"
      flexDirection="column"
      padding="50px 0"
      padding_tablet="70px 0"
    >
      <GridContainer margin="0 0 25px 0" margin_tablet="0 0 25px 0">
        <Div display="flex" flexDirection="column" alignItems="center">
          <H2 margin="0 0 15px 0" fontWeight="900">
            {props.title}
          </H2>
          <Paragraph>{props.paragraph}</Paragraph>
        </Div>
      </GridContainer>
      <GridContainer
        margin="0 0 70px 0"
        margin_tablet="0 0 50px 0"
        margin_xs="0 0 30px 0"
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
                options={courseArray}
                openLabel={course ? course.label : props.openedLabel}
                closeLabel={course ? course.label : props.closedLabel}
                onSelect={(opt) => setCourse(opt)}
              />
            )
            // </GridContainer>
          }
          &nbsp;
          {
            course && (
              // <GridContainer>
              <Div width="320px">
                <SelectRaw
                  bgColor={Colors.white}
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
            )
            // </GridContainer>
          }
          <Link to={info.button.button_link}>
            <Button
              variant="full"
              color={Colors.black}
              margin="25px 0 25px 10px"
              margin_tablet="0 0 0 10px"
              textColor={Colors.white}
            >
              {info.button.button_text}
            </Button>
          </Link>
        </Div>
      </GridContainer>
      <Div
        display="block"
        // position="relative"
        minHeight_tablet="600px"
        padding_md="20px"
      >
        <ChartSection info={info} mobile />
        <Div
          borderRadius="4px"
          border="1px solid #000"
          background="#FFF"
          padding_xs="18px 15px"
          padding_sm="38px"
          // width_md="740px"
          // maxWidth_lg="800px"
          // minWidth_lg="700px"
          maxWidth_md="700px"
          minWidth_md="580px"
          width_md="auto"
          // width_tablet="80%"
          width_xs="80%"
          margin_lg="auto"
          margin_md="0 0 0 400px"
          // margin_md="0 0 0 30%"
          margin_xs="20px auto"
          display="block"
          position="relative"
        >
          <ChartSection info={info} mobile={false} />
          {availablePlans && availablePlans.length !== 0 ? (
            <H3
              fontSize="24px"
              lineHeight="29px"
              textAlign="center"
              width="100%"
              margin="0 0 20px 0"
            >
              {info.select}
            </H3>
          ) : (
            <Div
              fontSize="25px"
              display="block"
              textAlign="center"
              dangerouslySetInnerHTML={{ __html: info.not_available }}
            />
          )}
          <Div
            className="cards-container"
            flexWrap="wrap"
            justifyContent_tablet="between"
            justifyContent_xs="evenly"
          >
            {availablePlans &&
              availablePlans
                .filter((plan) =>
                  plan.academies.includes(
                    currentLocation.fields.file_name.slice(0, -3)
                  )
                )
                .map((plan, index) => (
                  <PricingCard
                    data={plan}
                    info={info}
                    selectedPlan={selectedPlan}
                    setSelectedPlan={setSelectedPlan}
                    session={session}
                    setSession={setSession}
                    index={index}
                    plansLength={availablePlans.length}
                  />
                ))}
          </Div>
          {availablePlans && availablePlans.length !== 0 && (
            <Link
              style={{
                display: "block",
                margin: "auto",
                width: "70%",
                cursor: selectedPlan === null && "default",
              }}
              to={`${info.apply_button.link}${
                selectedPlan ? `?utm_plan=${selectedPlan}` : ""
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
                // cursor={selectedPlan === null ? "default" : "pointer"}
                // disabled={selectedPlan === null ? true : false}
                onClick={() => {
                  if (selectedPlan) {
                    setSession({
                      ...session,
                      utm: { ...session.utm, utm_plan: selectedPlan },
                    });
                  }
                }}
              >
                {info.apply_button.label}
              </Button>
            </Link>
          )}
        </Div>
      </Div>
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
export default PricesAndPaymentsV2;
