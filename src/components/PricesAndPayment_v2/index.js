import React, { useState, useContext, useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Icon from "../Icon";
import { Link } from "../Styling/index";
import { GridContainer, Grid, Div } from "../Sections";
import Card from "../Card";
import Select, { SelectRaw } from "../Select";
import { H2, H3, H4, H5, Paragraph, Title } from "../Heading";
import { Button, Colors, Circle, RoundImage } from "../Styling";
import { SessionContext } from "../../session";
import Fragment from "../Fragment";

const PricingCard = ({
  data,
  info,
  ...props
}) => {
  const { recomended, first_line, second_line } = data;
  return (
    <Div display="block" minWidth="300px">
      {recomended && (
        <Div
          background={Colors.blue}
          borderRadius="4px 4px 0 0"
        >
          <Paragraph color={Colors.white}>
            {info.recomended}
          </Paragraph>
        </Div>
      )}
      <Div
        border={`2px solid ${recomended ? Colors.black : Colors.blue}`}
        borderRadius_tablet={recomended ? '0 0 4px 4px' : '4px'}
        borderRadius_sm="4px"
        background={recomended ? Colors.black : Colors.white}
        padding="15px 12px"
      >
        <Div
          className="price-section"
        >
          <Div
            display="block"
          >
            <Paragraph>
              {first_line}
            </Paragraph>
            <Paragraph>
              {second_line}
            </Paragraph>
          </Div>
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

const plans = [{
  recomended: true,
  first_line: 'Scolarship',
  second_line: 'Pay today',
  price: '4999'
},{
  recomended: false,
  first_line: 'Scolarship',
  second_line: 'Pay today',
  price: '4999'

},{
  recomended: false,
  first_line: 'Scolarship',
  second_line: 'Pay today',
  price: '4999'
},{
  recomended: false,
  first_line: 'Scolarship',
  second_line: 'Pay today',
  price: '4999'
}];

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
  const [modality, setModality] = useState(false);
  const [locations, setLocations] = useState(false);

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
  // sync property course
  useEffect(
    () => (
      setCourse(courseArray.find((c) => c.value === props.courseType)),
      setModality(modalityArray.find((d) => d.value === props.programType))
    ),
    [props.courseType, props.programType]
  );

  if (!currentLocation || !currentLocation.prices)
    return (
      <Paragraph margin="10px 0px" align="center" fontSize="18px">
        {info.pricing_error} {currentLocation && currentLocation.city}. <br />{" "}
        {info.pricing_error_contact}
      </Paragraph>
    );

  let prices =
    !course && !modality
      ? {}
      : currentLocation.prices[course?.value][modality?.value];

  const apply_button_text =
    session && session.location
      ? session.location.button.apply_button_text
      : "Apply";
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
      <GridContainer margin="0 0 70px 0" margin_tablet="0 0 70px 0">
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
      >
        <Div
          id="chart-section"
          background="#000"
          padding="20px 14px"
          borderRadius="4px"
          maxWidth="385px"
          margin="auto"
          display="block"
        >
          <H3
            color={Colors.blue}
            margin="auto"
            fontSize="26px"
            lineHeight="31.2px"
          >
            4Geeks: When Payment stops being a Concern
          </H3>
          <Div id="chart-container" margin="15px 0" borderRadius="4px" background="#101010" width="350px" height="256px"></Div>
          <Div
            id="legend"
            flexWrap="wrap"
            justifyContent="between"
          >
            <Div
              width="100%"
              border="1px solid #FFF"
              borderRadius="4px"
              className="info"
              margin="0 0 4% 0"
            >
              <Div flexShrink_tablet="0" borderRadius="4px 0px 0px 4px" height="100%" width="19.39px" background={Colors.blue} />
              <Div
                padding="10px"
                display="block"
              >
                <H5 textAlign="left" color={Colors.blue}>76%</H5>
                <Paragraph
                  fontWeight_tablet="700"
                  fontSize="16px"
                  lineHeight="19px"
                  color="#FFF"
                  textAlign="left"
                  opacity="1"
                >
                  of our graduates received a full or partial scholarship thanks to our thorough payment options.
                </Paragraph>
              </Div>
            </Div>
            <Div
              width="48%"
              border="1px solid #FFF"
              borderRadius="4px"
              className="info"
            >
              <Div flexShrink_tablet="0" borderRadius="4px 0px 0px 4px" height="100%" width="19.39px" background={Colors.white} />
              <Div
                padding="5px"
                display="block"
              >
                <H5 margin="0 0 5px 0"  textAlign="left" color={Colors.white}>46%</H5>
                <Paragraph
                  fontWeight_tablet="700"
                  fontSize="12px"
                  color="#FFF"
                  textAlign="left"
                  opacity="1"
                  lineHeight="14.4px"
                >
                  of our students are women
                </Paragraph>
              </Div>
            </Div>
            <Div
              width="48%"
              border="1px solid #FFF"
              borderRadius="4px"
              className="info"
            >
              <Div flexShrink_tablet="0" borderRadius="4px 0px 0px 4px" height="100%" width="19.39px" background={Colors.yellow} />
              <Div
                padding="5px"
                display="block"
              >
                <H5 margin="0 0 5px 0" textAlign="left" color={Colors.white}>24%</H5>
                <Paragraph
                  fontWeight_tablet="700"
                  fontSize="12px"
                  color="#FFF"
                  textAlign="left"
                  opacity="1"
                  lineHeight="14.4px"
                >
                  of our students are part of the Afro-descendants community
                </Paragraph>
              </Div>
            </Div>
          </Div>
        </Div>
        <Div
          borderRadius="4px"
          border="1px solid #000"
          background="#FFF"
          padding_tablet="38px"
          width="60%"
          margin="10px auto"
          display="block"
        >
          <H3
            fontSize="24px"
            lineHeight="29px"
            textAlign="left"
            width="100%"
            margin="0 0 20px 0"
          >
            {info.select}
          </H3>
          <Div className="cards-container" flexWrap="wrap" justifyContent="between">
            {plans.map(plan => (
              <PricingCard 
                data={plan}
                info={info}
              />
            ))}
          </Div>
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
const StepperContainer = styled.div`
  width: 100%;
  padding: 25px 0;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 0 20px 0;
`;
const StepLabel = styled.div`
  color: ${(props) => props.color};
  width: 100px;
  font-family: "Lato", sans-serif;
  font-size: 8px;
  position: absolute;
  top: 20px;
`;
const StepConnector = styled.div`
  position: absolute;
  top: 32px;
  height: 1px;
  width: 100%;
  background-color: ${Colors.yellow};
`;
const FillerStyles = styled.div`
  height: 2px;
  width: ${(props) => props.completed}%;
  background-color: ${Colors.yellow};
  border-radius: inherit;
  text-align: right;
  transform: translateY(-50%);
`;
const StepperCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.background};
  border: 1px solid ${Colors.yellow};
  cursor: pointer;
  position: relative;
  z-index: 1;
`;
