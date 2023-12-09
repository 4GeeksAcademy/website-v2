import React, { useState, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Img, Link } from "../Styling/index";
import { GridContainer, Grid, Div } from "../Sections";
import { SelectRaw } from "../Select";
import { H2, H3, Paragraph } from "../Heading";
import { Button, Colors } from "../Styling";
import { SessionContext } from "../../session";

const PricingCard = ({
  data,
  children,
  color,
  background,
  transform_tablet,
  border,
  borderLeft,
  borderRight,
  borderRight_tablet,
  borderLeft_tablet,
}) => {
  const { header } = data;
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
      {header && (
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
      )}
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
    value: "blockchain",
    label: "Blockchain",
  },
  {
    value: "datascience-ml",
    label: "Data Science ML",
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

  const { session, setSession } = useContext(SessionContext);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [course, setCourse] = useState(false);
  const [locations, setLocations] = useState(false);
  const [modality, setModality] = useState(false);
  const [prices, setPrices] = useState();
  const [firstLoadData, setFirstLoadData] = useState(false);

  const getCurrentPlans = () => {
    return data.allPlansYaml.edges
      .filter(({ node }) => node.fields.lang === props.lang)
      .find((p) =>
        p.node.fields.file_name.includes(course?.value?.replaceAll("_", "-"))
      )?.node[modality?.value];
  };

  const selectStyle = {
    input: (styles) => ({
      ...styles,
      width: "100%",
      margin: "0px",
      padding: "10px 0",
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
      "&:focus": { boxShadow: "0 0 0 1px black", border: "1px solid #000000" },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontFamily: "Lato, sans-serif",
      };
    },
  };

  if (course === false && modality === false && firstLoadData === false) {
    setCourse({ value: "full_stack", label: "Full Stack Developer" });
    setModality({ value: "part_time", label: "Part Time" });
    setFirstLoadData(true);
  }

  useEffect(() => {
    setLocations(
      props.locations.filter(
        (l) =>
          (l.node.meta_info.visibility !== undefined ||
            l.node.meta_info.visibility === "visible") &&
          !l.node.meta_info.slug.includes("online")
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
    const currentPlans = getCurrentPlans();
    if (modality && course && currentLocation && currentPlans) {
      setPrices(
        currentPlans.filter((plan) =>
          plan.academies.includes(currentLocation.fields.file_name.slice(0, -3))
        )
      );
    } else {
      setPrices(null);
      console.log("modality", modality);
    }
    setFirstLoadData(true);
  }, []);

  const search = () => {
    const currentPlans = getCurrentPlans();
    if (modality && course && currentLocation && currentPlans) {
      setPrices(
        currentPlans.filter((plan) =>
          plan.academies.includes(currentLocation.fields.file_name.slice(0, -3))
        )
      );
    } else {
      setPrices(null);
      console.log("modality", modality);
    }
  };

  if (!currentLocation)
    return (
      <Paragraph margin="10px 0px" align="center" fontSize="18px">
        {info.loading}
      </Paragraph>
    );

  if (firstLoadData) {
    search();
    setFirstLoadData(false);
  }

  return (
    <Div
      background="transparent"
      margin="0 0 0 0"
      github="/location"
      flexDirection="column"
      //padding_xxs="0 20px"
      padding_md="0 80px"
      padding_lg="0 80px"
      padding_tablet="0 40px"
    >
      <Div
        padding="34px 24px 24px 24px"
        padding_tablet="22px"
        margin="0 0 3em 0"
        margin_tablet="0 0 4em 0"
        containerColumns_tablet={`0fr repeat(12, 1fr) 0fr`}
        containerGridGap="20px"
        margin_md="0 0% 4em 0%"
        background={Colors.white}
        height="100%"
        height_tablet="95px"
        border="3px solid black"
        justifyContent="center"
      >
        <Div
          gridTemplateColumns_tablet="repeat(4, 1fr)"
          width_xxs="200px"
          width_xs="250px"
          width_sm="320px"
          width_tablet="100%"
          gap_tablet="20px"
          gap="8px"
          justifySelf="center"
          justifySelf_tablet="inherit"
          flexDirection_tablet="row"
          flexDirection="column"
          justifyContent="center"
          alignItems_tablet="start"
        >
          {!props.course && (
            <SelectRaw
              options={courseArray}
              placeholder={props.program}
              value={course}
              onChange={(opt) => setCourse(opt)}
              style={selectStyle}
              //display="none"
            />
          )}
          {props.modality && (
            <SelectRaw
              options={modalityArray}
              placeholder={props.modality}
              value={modality}
              onChange={(opt) => setModality(opt)}
              style={selectStyle}
              //display="none"
            />
          )}
          {!props.course && (
            <SelectRaw
              options={locations
                .map((l) => ({
                  label: l.node.name,
                  value: l.node.active_campaign_location_slug,
                }))
                .sort((a, b) => {
                  if (a.label < b.label) {
                    return -1;
                  }
                  if (a.label > b.label) {
                    return 1;
                  }
                  return 0;
                })}
              placeholder={props.campus}
              value={{
                label: currentLocation.name,
                value: currentLocation.active_campaign_location_slug,
              }}
              onChange={(opt) =>
                setCurrentLocation(
                  locations.find(
                    (l) => l.node.active_campaign_location_slug === opt.value
                  ).node
                )
              }
              style={selectStyle}
              //display="none"
            />
          )}

          {props.button_text && (
            <Div justifyContent="center">
              <Button
                background={Colors.black}
                color={Colors.white}
                onClick={() => {
                  search();
                }}
                margin_tablet="5px 0 0 0"
                height_tablet="38px"
                width="100%"
                width_tablet="auto"
                justifyContent="center"
              >
                {props.button_text}
              </Button>
            </Div>
          )}
        </Div>
      </Div>

      {!prices || prices.length === 0 ? (
        <>
          <Paragraph margin="10px 0px" align="center" fontSize="18px">
            {info.pricing_error} {course?.label}, {currentLocation.city}. <br />{" "}
            {info.pricing_error_contact}
          </Paragraph>
        </>
      ) : (
        <GridContainer
          padding="0"
          //containerColumns_md={`2fr repeat(12, 1fr) 2fr`}
          containerColumns_tablet={`0fr repeat(12, 1fr) 0fr`}
          background="transparent"
          columns_tablet="1"
          containerGridGap="0px"
          padding_tablet={props.padding_tablet || "4.5rem 16px"}
        >
          {prices && Array.isArray(prices) && (
            <PricingCard color="black" background={Colors.white} data={{}}>
              {Array.isArray(prices) &&
                prices.map((label, index) => (
                  <GridContainer
                    key={index}
                    containerColumns_tablet="0fr repeat(12, 1fr) 0fr"
                    margin="0 0 20px 0"
                    shadow={Colors.shadow}
                    shadow_tablet={Colors.shadow}
                    padding="20px"
                    height="100%"
                    minHeight_tablet="122px"
                    columns_tablet="4"
                    width="100%"
                  >
                    <Div
                      margin="10px 0px"
                      justifyContent="center"
                      placeItems="center"
                      display="flex"
                      flexWrap="wrap"
                      //className="badge-slider hideOverflowX__"
                    >
                      {label.icons?.map((logo) => (
                        <Img
                          src={logo}
                          alt="4Geeks Academy Icon"
                          backgroundSize="contain"
                          height="56px"
                          minWidth="30px"
                          width="96px"
                          margin="0 5px"
                        />
                      ))}
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
                        {label.scholarship}
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
                        {label.payment_time}
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
                        {label.price}
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
                        {label.payment_time}
                      </H3>
                    </Div>
                    <Div
                      margin="10px 0px"
                      justifyContent="center"
                      placeItems="center"
                      image="no"
                    >
                      <Link to={`/${props.lang}/apply?utm_plan=${label.slug}`}>
                        <Button
                          variant="full"
                          height="40px"
                          color={Colors.blue}
                          textColor={Colors.white}
                          fontSize="16px"
                          onClick={() =>
                            setSession({
                              ...session,
                              utm: { ...session.utm, utm_plan: label.slug },
                            })
                          }
                        >
                          {info?.apply_button?.label || "APPLY"}
                        </Button>
                      </Link>
                    </Div>
                  </GridContainer>
                ))}
            </PricingCard>
          )}
        </GridContainer>
      )}
    </Div>
  );
};
export default FinancialFilter;
