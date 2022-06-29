import React, { useState, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "../Styling/index";
import { GridContainer, Grid, Div } from "../Sections";
import Select from "../SelectV2";
import { H2, H3, Paragraph } from "../Heading";
import { Button, Colors } from "../Styling";
import { SessionContext } from "../../session";

const PricingCard = ({
  data,
  lang,
  children,
  price,
  color,
  background,
  transform_tablet,
  priceInfo,
  applyLabel,
  border,
  borderLeft,
  borderRight,
  borderRight_tablet,
  borderLeft_tablet,
}) => {
  const { header, button } = data;
  return (
    <Div
      flexDirection="column"
      padding="0 0 30px 0"
      margin="5px 0"
      height="fit-content"
      background={background}
      transform_tablet={transform_tablet}
      border={border}
      borderLeft={borderLeft}
      borderRight={borderRight}
      borderLeft_tablet={borderLeft_tablet}
      borderRight_tablet={borderRight_tablet}
    >
      <H2
        type="h2"
        margin="0 0 30px 0"
        fontSize="22px"
        color={color}
        lineHeight="30px"
        textAlign="left"
      >
        {header.heading_one} {header.heading_two}
      </H2>
      <Div display="block">{children}</Div>
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

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    // maxHeight: '100px',
    height: 10,
  }),
}

const FinancialFilter = (props) => {
  const data = useStaticQuery(graphql`
    query FinancialFilter {
      content: allPricesAndPaymentYaml {
        edges {
          node {
            fields {
              lang
            }
            pricing_error_contact
            pricing_error
            loading
            get_notified
            top_label
            button {
              button_text
              button_link
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

  const { session, setSession } = useContext(SessionContext);
  const [activeStep, setActiveStep] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [course, setCourse] = useState(false);
  const [locations, setLocations] = useState(false);
  const [modality, setModality] = useState(false);
  const [prices, setPrices] = useState();

  useEffect(() => {
    setLocations(
      props.locations
        .filter(
          (l) =>
            (l.node.meta_info.visibility !== undefined ||
              l.node.meta_info.visibility === "visible") &&
            !l.node.meta_info.slug.includes("online")
        )
        .sort((a, b) =>
          a.node.meta_info.position > b.node.meta_info.position ? 1 : -1
        )
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
    modality && course && currentLocation
      ? setPrices(currentLocation.prices[course.value][modality.value])
      : console.log("modality", modality);
  }, [modality, course, currentLocation]);

  if (!currentLocation || !currentLocation.prices)
    return (
      <Paragraph margin="10px 0px" align="center" fontSize="18px">
        {info.loading}
      </Paragraph>
    );

  if (course === false && modality === false) {
    setCourse({ value: "full_stack", label: "Full Stack Developer" });
    setModality({ value: "part_time", label: "Part Time" });
  }

  return (
    <Div
      background={Colors.lightBlue2}
      margin="0 0 5rem 0"
      display="block"
      github="/location"
    >
      <GridContainer
        shadow="0px 0px 16px rgba(0, 0, 0, 0.25)"
        padding="15px 0"
        margin="0 10px 3em 10px"
        margin_tablet="0 5rem 4em 5rem"
        containerColumns_tablet={`0fr repeat(12, 1fr) 0fr`}
        containerGridGap="20px"
        margin_md="0 20% 4em 20%"
        background={Colors.white}
        height="100%"
        height_tablet="122px"
        borderRadius="3px"
      >
        <Grid
          gridTemplateColumns_tablet="repeat(3, 1fr)"
          display="inline-flex"
          gridGap_tablet="20px"
          gridGap="8px"
          justifySelf="center"
          justifySelf_tablet="inherit"
          flexDirection_tablet="row"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {!props.course && (
            <Select
              margin="0 20px 0 10px"
              textAlign="left"
              label={props.program}
              top="40px"
              left="20px"
              width="fit-content"
              options={courseArray}
              openLabel={course ? course.label : props.programClosedLabel}
              closeLabel={course ? course.label : props.programClosedLabel}
              onSelect={(opt) => setCourse(opt)}
            />
          )}
          {props.modality && (
            <Select
              margin="0 20px 0 10px"
              textAlign="left"
              label={props.modality}
              top="40px"
              left="20px"
              width="fit-content"
              options={modalityArray}
              openLabel={modality ? modality.label : props.modalityClosedLabel}
              closeLabel={modality ? modality.label : props.modalityClosedLabel}
              onSelect={(opt) => setModality(opt)}
            />
          )}
          {!props.course && (
            <Select
              margin="0 20px 0 10px"
              maxMenuHeight={100}
              styles={customStyles}
              textAlign="left"
              label={props.campus}
              top="40px"
              left="20px"
              width="fit-content"
              options={locations.map((l) => ({
                label: l.node.name,
                value: l.node.active_campaign_location_slug,
              }))}
              openLabel={
                !currentLocation
                  ? "Pick a city"
                  : currentLocation.city + ". " + currentLocation.country
              }
              closeLabel={
                !currentLocation
                  ? props.campusClosedLabel
                  : currentLocation.city + ". " + currentLocation.country
              }
              onSelect={(opt) =>
                setCurrentLocation(
                  locations.find(
                    (l) => l.node.active_campaign_location_slug === opt.value
                  ).node
                )
              }
              topLabel={info.top_label}
            />
          )}
        </Grid>
      </GridContainer>

      {!prices ? (
        <>
          {!prices ? (
            <Paragraph margin="10px 0px" align="center" fontSize="18px">
              {" "}
              Please select a course to see more information
            </Paragraph>
          ) : (
            <Paragraph margin="10px 0px" align="center" fontSize="18px">
              {info.pricing_error} {course?.label}, {currentLocation.city}.{" "}
              <br /> {info.pricing_error_contact}
            </Paragraph>
          )}
        </>
      ) : (
        <GridContainer
          padding="4.5rem 16px"
          containerColumns_md={`2fr repeat(12, 1fr) 2fr`}
          containerColumns_tablet={`0fr repeat(12, 1fr) 0fr`}
          background={Colors.white}
          columns_tablet="1"
          gridGap_tablet="0"
          padding_tablet="4.5rem 16px"
        >
          {prices?.center_section &&
            Array.isArray(prices?.center_section.plans) && (
              <PricingCard
                color="black"
                background={Colors.white}
                price={prices.center_section.plans[activeStep].payment}
                priceInfo={prices.center_section.plans[activeStep].paymentInfo}
                data={prices.center_section}
              >
                {Array.isArray(prices.center_section.plans) &&
                  prices.center_section.plans.map((label, index) => (
                    <GridContainer
                      key={index}
                      containerColumns_tablet="0fr repeat(12, 1fr) 0fr"
                      margin="0 0 20px 0"
                      shadow={Colors.shadow}
                      shadow_tablet={Colors.shadow}
                      padding="20px"
                      height="100%"
                      height_tablet="122px"
                      columns_tablet="4"
                    >
                      <Div
                        margin="10px 0px"
                        justifyContent="center"
                        placeItems="center"
                        display="flex"
                      >
                        <img
                          style={{ margin: "auto", height: "25px" }}
                          src={label.logo}
                        />
                      </Div>
                      <Div
                        margin="10px 0px"
                        justifyContent="center"
                        placeItems="center"
                        flexDirection="column"
                        display="flex"
                      >
                        <Paragraph
                          fontWeight="700"
                          lineHeight="36px"
                          fontSize="30px"
                        >
                          {label.months}
                        </Paragraph>
                        <H3
                          type="h3"
                          fontWeight="400"
                          color="#A4A4A4"
                          width="fit-content"
                          padding="0 5px"
                          fontSize="15px"
                          lineHeight="24px"
                          letterSpacing="0.05em"
                        >
                          {label.monthsInfo}
                        </H3>
                      </Div>
                      <Div
                        margin="10px 0px"
                        justifyContent="center"
                        placeItems="center"
                        flexDirection="column"
                        display="flex"
                      >
                        <Paragraph
                          fontWeight="700"
                          lineHeight="36px"
                          fontSize="30px"
                        >
                          {label.payment}
                        </Paragraph>
                        <H3
                          type="h3"
                          fontWeight="400"
                          color="#A4A4A4"
                          width="fit-content"
                          padding="0 5px"
                          fontSize="15px"
                          lineHeight="24px"
                          letterSpacing="0.05em"
                        >
                          {label.paymentInfo}
                        </H3>
                      </Div>
                      <Div
                        margin="10px 0px"
                        justifyContent="center"
                        placeItems="center"
                        image="no"
                      >
                        <Link to={`/${props.lang}/apply`}>
                          <Button
                            variant="full"
                            height="40px"
                            color={Colors.blue}
                            textColor={Colors.white}
                            fontSize="16px"
                          >
                            {prices?.center_section?.button?.button_text ||
                              "APPLY"}
                          </Button>
                        </Link>
                      </Div>
                    </GridContainer>
                  ))}
              </PricingCard>
            )}

          {prices.left_section && (
            <PricingCard
              color="black"
              background={Colors.white}
              data={prices.left_section}
            >
              {prices.left_section.content && (
                <GridContainer
                  containerColumns_tablet="0fr repeat(12, 1fr) 0fr"
                  margin="0 0 20px 0"
                  shadow="0px 0px 16px rgba(0, 0, 0, 0.15)"
                  padding="20px"
                  height="100%"
                  height_tablet="122px"
                  columns_tablet="2"
                >
                  <Div
                    margin="10px 0px"
                    margin_tablet="10px 30px"
                    width="100%"
                    justifyContent="center"
                    placeItems="center"
                    flexDirection="column"
                    display="flex"
                  >
                    <Paragraph
                      textAlign_tablet="left"
                      fontWeight="700"
                      lineHeight="36px"
                      fontSize="30px"
                    >
                      {prices.left_section.content.price}
                    </Paragraph>

                    <H3
                      type="h3"
                      alignSelf_tablet="flex-start"
                      alignSelf="center"
                      fontWeight="400"
                      color="#A4A4A4"
                      width="fit-content"
                      padding="0 5px"
                      fontSize="15px"
                      lineHeight="24px"
                      letterSpacing="0.05em"
                    >
                      {prices.left_section.content.price_info}
                    </H3>
                  </Div>
                  <Div
                    margin="10px 0px"
                    justifyContent="center"
                    margin_tablet=" 0 10% 0 auto "
                    placeItems="center"
                    image="no"
                  >
                    <Link to={`/${props.lang}/apply`}>
                      <Button
                        variant="full"
                        height="40px"
                        color={Colors.blue}
                        textColor={Colors.white}
                        fontSize="16px"
                      >
                        {prices?.left_section?.button?.button_text || "APPLY"}
                      </Button>
                    </Link>
                  </Div>
                </GridContainer>
              )}
            </PricingCard>
          )}

          {prices.right_section && (
            <PricingCard
              color="black"
              background={Colors.white}
              data={prices.right_section}
            >
              {prices.right_section.content && (
                <GridContainer
                  containerColumns_tablet="0fr repeat(12, 1fr) 0fr"
                  margin="0 0 20px 0"
                  shadow="0px 0px 16px rgba(0, 0, 0, 0.15)"
                  padding="20px"
                  height="100%"
                  height_tablet="122px"
                  columns_tablet="2"
                >
                  <Div
                    margin="10px 0px"
                    margin_tablet="10px 30px"
                    width="100%"
                    justifyContent="center"
                    placeItems="center"
                    flexDirection="column"
                    display="flex"
                  >
                    <Paragraph
                      textAlign_tablet="left"
                      fontWeight="700"
                      lineHeight="36px"
                      fontSize="30px"
                    >
                      {prices.right_section.content.price}
                    </Paragraph>

                    <H3
                      type="h3"
                      alignSelf_tablet="flex-start"
                      alignSelf="center"
                      fontWeight="400"
                      color="#A4A4A4"
                      width="fit-content"
                      padding="0 5px"
                      fontSize="15px"
                      lineHeight="24px"
                      letterSpacing="0.05em"
                    >
                      {prices.right_section.content.price_info}
                    </H3>
                  </Div>
                  <Div
                    margin="10px 0px"
                    justifyContent="center"
                    margin_tablet=" 0 10% 0 auto "
                    placeItems="center"
                    image="no"
                  >
                    <Link to={`/${props.lang}/apply`}>
                      <Button
                        variant="full"
                        height="40px"
                        color={Colors.blue}
                        textColor={Colors.white}
                        fontSize="16px"
                      >
                        {prices.right_section.button?.button_text || "APPLY"}
                      </Button>
                    </Link>
                  </Div>
                </GridContainer>
              )}
            </PricingCard>
          )}
          {prices.scholarship && (
            <PricingCard
              color="black"
              background={Colors.white}
              data={prices.scholarship}
            >
              {prices.scholarship.content && (
                <GridContainer
                  containerColumns_tablet="0fr repeat(12, 1fr) 0fr"
                  margin="0 0 20px 0"
                  shadow="0px 0px 16px rgba(0, 0, 0, 0.15)"
                  padding="20px"
                  height="100%"
                  height_tablet="122px"
                  columns_tablet="2"
                >
                  <Div
                    margin="10px 0px"
                    margin_tablet="10px 30px"
                    width="100%"
                    justifyContent="center"
                    placeItems="center"
                    flexDirection="column"
                    display="flex"
                  >
                    <Paragraph
                      textAlign_tablet="left"
                      fontWeight="700"
                      lineHeight="36px"
                      fontSize="30px"
                    >
                      {prices.scholarship.content.price}
                    </Paragraph>

                    <H3
                      type="h3"
                      alignSelf_tablet="flex-start"
                      alignSelf="center"
                      fontWeight="400"
                      color="#A4A4A4"
                      width="fit-content"
                      padding="0 5px"
                      fontSize="15px"
                      lineHeight="24px"
                      letterSpacing="0.05em"
                    >
                      {prices.scholarship.content.price_info}
                    </H3>
                  </Div>
                  <Div
                    margin="10px 0px"
                    justifyContent="center"
                    margin_tablet=" 0 10% 0 auto "
                    placeItems="center"
                    image="no"
                  >
                    <Link to={`/${props.lang}/apply`}>
                      <Button
                        variant="full"
                        height="40px"
                        color={Colors.blue}
                        textColor={Colors.white}
                        fontSize="16px"
                      >
                        {prices.scholarship.button?.button_text || "APPLY"}
                      </Button>
                    </Link>
                  </Div>
                </GridContainer>
              )}
            </PricingCard>
          )}
        </GridContainer>
      )}
    </Div>
  );
};
export default FinancialFilter;
