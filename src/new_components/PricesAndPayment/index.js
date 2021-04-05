import React, {useState, useContext, useEffect, useRef} from 'react';
import {useStaticQuery, graphql} from "gatsby"
import styled from 'styled-components';
import Icon from '../Icon';
import {Link} from '../Styling/index';
import {GridContainer, Grid, Div} from '../Sections';
import Card from '../Card';
import Select from '../Select';
import {H2, H3, H4, H5, Paragraph, Title} from '../Heading';
import {Button, Colors, Circle, RoundImage} from '../Styling';
import {SessionContext} from '../../session'
import Fragment from "../Fragment"

const PricingCard = ({data, lang, children, price, color, background, transform_tablet, priceInfo, applyLabel, border, borderLeft, borderRight, borderRight_tablet, borderLeft_tablet}) => {
  const {header, button} = data;
  return <Div flexDirection="column" padding="30px" margin="5px 0" height="fit-content" background={background} transform_tablet={transform_tablet} border={border} borderLeft={borderLeft} borderRight={borderRight} borderLeft_tablet={borderLeft_tablet} borderRight_tablet={borderRight_tablet}>
    <H2
      color={color}
      lineHeight="30px"
    >
      {header.heading_one}
    </H2>
    <H3 color={color} lineHeight="30px">
      {header.heading_two}
    </H3>
    <Paragraph padding="20px" color={color || Colors.gray}>{header.sub_heading}</Paragraph>
    <H3 margin="20px 0 0"
      fontSize="25px"
      fs_lg="20px"
      color={color}
      textAlign="center" >{price}</H3>
    <Paragraph align="center" margin="5px 0 10px 0" fontSize="12px" color={color || Colors.gray}>{priceInfo}</Paragraph>
    {/* <Div display="block" margin="0 -35px">{children}</Div> */}
    <Div display="block" >{children}</Div>
    <Div margin="40px 0 0 0" justifyContent="center" image="no"  >
      <Link to={`/${lang}/apply`}><Button width="100%" padding=".3rem 1.5rem" color={Colors.blue} textColor={Colors.white} fontSize="16px" fs_lg="14px" fs_sm="16px">{applyLabel}</Button></Link>
    </Div>
  </Div>;
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
    query NewPricesAndPayments{
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
      {!prices ?
        <Paragraph margin="10px 0px" align="center" fontSize="18px" >{info.pricing_error} {course.label}, {currentLocation.city}. <br /> {info.pricing_error_contact}</Paragraph>
        :
        <GridContainer columns_tablet="3" gridGap_tablet="0" padding_tablet="0" >
          {prices.left_section &&
            <PricingCard lang={props.lang}
              background={Colors.white}
              transform_tablet="translateY(10%)"
              price={prices.left_section.content.price}
              priceInfo={prices.left_section.content.price_info}
              data={prices.left_section}
              applyLabel={apply_button_text}
              border="1px solid black"
              borderRight_tablet="none"
            />
          }
          {prices.center_section && Array.isArray(prices.center_section.plans) &&
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
                    <StepLabel color={index == activeStep ? Colors.yellow : Colors.white}>{label}</StepLabel>
                  </StepperCircle >
                ))}
              </StepperContainer>
              <Div margin="0 0 40px 0" display="flex">
                <img style={{margin: "auto", height: "20px"}} src={prices.center_section.plans[activeStep].logo} />
              </Div>
            </PricingCard>
          }
          {prices.right_section &&
            <PricingCard lang={props.lang}
              background={Colors.white}
              transform_tablet="translateY(10%)"
              price={prices.right_section.content.price}
              priceInfo={prices.right_section.content.price_info}
              applyLabel={apply_button_text}
              data={prices.right_section}
              border="1px solid black"
              borderLeft_tablet="none"
            />
          }
        </GridContainer>
      }
      <GridContainer columns_tablet="12" gridGap="0" margin_tablet="0 0 37px 0" >
        <Div gridArea_tablet="1/5/1/9" justifyContent="center" alignItems="center">
          <H4 fontSize="13px" lineHeight="22px" width="fit-content" color={Colors.darkGray} >We accept: </H4>
          <RoundImage url="/images/bitcoin.png" height="10px" width="65px" bsize="contain" margin="0 15px" />
          <RoundImage url="/images/ethereum.png" height="20px" width="65px" bsize="contain" />
        </Div>
      </GridContainer>
      <Paragraph margin="35px 0 0 0">{info.get_notified}</Paragraph>
      {/* <Div background={Colors.lightYellow} height="511px" width="100%" style={{position: "absolute", height: "511px"}}>f</Div> */}
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
  color: ${props => props.color};
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
  z-index: 1;
`