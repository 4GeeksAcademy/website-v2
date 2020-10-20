import React, {useState, useContext, useEffect, useRef} from 'react';
import {useStaticQuery, graphql} from "gatsby"
import styled from 'styled-components';
import clsx from 'clsx';
import Icon from '../Icon';
import {Link} from '../Styling/index';
import {Row, Column, Divider, Div} from '../Sections';
import Card from '../Card';
import Select from '../Select';
import {H2, H3, H4, H5, Paragraph, Title} from '../Heading';
import {Button, Colors, Circle, RoundImage} from '../Styling';
import {SessionContext} from '../../session'
import Fragment from "../Fragment"

const PricingCard = ({data, lang, children, price, color, background, transform, priceInfo, applyLabel}) => {
  const {header, button} = data;
  return <Card padding="30px" shadow margin="5px 0" color={background} transform={transform}>
    <H4
      align="center"
      fontSize="20px"
      fs_md="18px"
      fs_sm="24px"
      fontSize="22px"
      color={color}
    >
      {header.heading_one}
    </H4>
    <H4 color={color} fontSize="18px" align="center">
      {header.heading_two}
    </H4>
    <Paragraph padding="20px" align="center" fontSize="12px" color={color || Colors.gray}>{header.sub_heading}</Paragraph>
    <H3 margin="20px 0 0"
      fontSize="25px"
      fs_lg="20px"
      color={color}
      align="center" >{price}</H3>
    <Paragraph align="center" margin="5px 0 10px 0" fontSize="12px" color={color || Colors.gray}>{priceInfo}</Paragraph>
    {/* <Div display="block" margin="0 -35px">{children}</Div> */}
    <Div display="block" >{children}</Div>
    <Column size="12" margin="40px 0 0 0" align="center" image="no"  >
      <Link to={`/${lang}/apply`}><Button width="100%" padding=".3rem 1.5rem" color={Colors.blue} textColor={Colors.white} fontSize="16px" fs_lg="14px" fs_sm="16px">{applyLabel}</Button></Link>
    </Column>
  </Card>;
}

const courseArray = [
  {
    value: "part_time",
    label: "Full Stack Development (Part-Time)"
  },
  {
    value: "full_time",
    label: "Full Stack Development (Full-Time)"
  },
  {
    value: "software_engineering",
    label: "Software Engineering"
  }
];

const PricesAndPayments = (props) => {
  const data = useStaticQuery(graphql`
    query PricesAndPayments{
      content: allPricesAndPaymentYaml{
        edges {
          node {
            fields {
              lang
            }
            pricing_error_contact
            pricing_error
            get_notified
          }
        }
      }
    }
    `)
  let info = data.content.edges.find(({node}) => node.fields.lang === props.lang);
  if (info) info = info.node;

  const {session, setSession} = useContext(SessionContext);
  const [activeStep, setActiveStep] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [course, setCourse] = useState(false);
  const [locations, setLocations] = useState(false);
  // const steps = props.details.details_modules.reduce((total, current, i) => [...total, (total[i - 1] || 0) + current.step], [])
  useEffect(() => {
    setLocations(props.locations.filter(l => l.node.meta_info.unlisted != true).sort((a, b) => a.node.meta_info.position > b.node.meta_info.position ? 1 : -1))
    if (session && session.location) {
      const _loc = props.locations.find(l => l.node.active_campaign_location_slug === session.location.active_campaign_location_slug);
      setCurrentLocation(_loc ? _loc.node : null)
    }
  }, [session, props.locations])

  // sync property course
  useEffect(() => setCourse(courseArray.find(c => c.value === props.course)), [props.course]);

  if (!currentLocation || !currentLocation.prices)
    return <Paragraph margin="10px 0px" align="center" fontSize="18px" >{info.pricing_error} {currentLocation && currentLocation.city}. <br /> {info.pricing_error_contact}</Paragraph>

  const prices = !course ? {} : currentLocation.prices[course.value];

  const apply_button_text = session && session.location ? session.location.button.apply_button_text : "Apply";

  return (
    <Fragment github="/location">
      <Row
        align={`center`}
        margin="0 0 20px 0"
      >
        {!props.course && <Select
          top="40px"
          left="20px"
          width="300px"
          maxWidth="100%"
          options={courseArray}
          openLabel={course ? course.label : props.openedLabel}
          closeLabel={course ? course.label : props.closedLabel}
          onSelect={(opt) => setCourse(opt)}
        />
        }
        &nbsp;
        {course && <Select
          top="40px"
          left="20px"
          width="300px"
          maxWidth="100%"
          options={locations.map(l => ({label: l.node.city + ", " + l.node.country, value: l.node.active_campaign_location_slug}))}
          openLabel={!currentLocation ? "Pick a city" : currentLocation.city + ". " + currentLocation.country}
          closeLabel={!currentLocation ? "Pick a city" : currentLocation.city + ". " + currentLocation.country}
          onSelect={(opt) => setCurrentLocation(locations.find(l => l.node.active_campaign_location_slug === opt.value).node)}
        />}
      </Row>
      {!prices ?
        <Paragraph margin="10px 0px" align="center" fontSize="18px" >{info.pricing_error} {course.label}, {currentLocation.city}. <br /> {info.pricing_error_contact}</Paragraph>
        :
        <Row align="center">
          {prices.left_section && <Column size="4" maxWidth="280px" size_sm="12" >
            <PricingCard lang={props.lang}
              transform="translateY(10%)"
              price={prices.left_section.content.price}
              priceInfo={prices.left_section.content.price_info}
              data={prices.left_section}
              applyLabel={apply_button_text}
            />
          </Column>
          }
          {prices.center_section && Array.isArray(prices.center_section.plans) && <Column size="4" maxWidth="280px" size_sm="12" >
            <PricingCard lang={props.lang} color="white" background='black'
              price={prices.center_section.plans[activeStep].payment}
              priceInfo={prices.center_section.plans[activeStep].paymentInfo}
              applyLabel={apply_button_text}
              data={prices.center_section}
            >
              <StepperContainer>
                <StepConnector>
                  <FillerStyles completed={((activeStep) * 100) / (prices.center_section.plans.length - 1)} />
                </StepConnector>
                {Array.isArray(prices.center_section.plans) && prices.center_section.plans.map(p => p.months).map((label, index) => (
                  <StepperCircle
                    key={label}
                    onMouseOver={() => setActiveStep(index)}
                    background={index <= activeStep ? Colors.yellow : Colors.black}
                  >
                    <StepLabel>{label}</StepLabel>
                  </StepperCircle >
                ))}
              </StepperContainer>
              <Div margin="0 0 40px 0">
                <img style={{margin: "auto", height: "20px"}} src={prices.center_section.plans[activeStep].logo} />
              </Div>

            </PricingCard>
          </Column>
          }
          {prices.right_section && <Column size="4" maxWidth="280px" size_sm="12" >
            <PricingCard lang={props.lang}
              transform="translateY(10%)"
              price={prices.right_section.content.price}
              priceInfo={prices.right_section.content.price_info}
              applyLabel={apply_button_text}
              data={prices.right_section}
            />
          </Column>
          }
        </Row>
      }
      <Div display="block" margin="20px 0px" padding="30px 30px 30px 30px"
        shadow="inset 0px 0px 10px rgba(0,0,0,0.2)"
        background={Colors.grey}
        borderRadius="1.25rem"
      >
        <H5 fontSize="20px">{info.get_notified}</H5>
      </Div>
    </Fragment>
  )
}
export default (PricesAndPayments)
const StepperContainer = styled.div`
  width: 100%;
  padding: 25px 0 ;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 0 20px 0;
`
const StepLabel = styled.div`
  color: white;
  width: 100px;
  font-family: 'Lato', sans-serif;
  font-size: 8px;
  position: absolute;
  top: 20px;
`
const StepConnector = styled.div`
  position: absolute;
  top:32px;
  height: 1px;
  width: 100%;
  background-color: ${Colors.yellow};
`
const FillerStyles = styled.div`
  height: 2px;
  width: ${props => props.completed}%;
  background-color: ${Colors.yellow};
  border-radius: inherit;
  text-align: right;
  transform: translateY(-50%);
`
const StepperCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${props => props.background};
  border: 1px solid ${Colors.yellow};
  cursor: pointer;
  position: relative;
  z-index: 10;
`
