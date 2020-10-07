import React, {useState, useContext, useEffect, useRef} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {useStaticQuery, graphql} from "gatsby"
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import clsx from 'clsx';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import Check from '@material-ui/icons/Check';
import {Link} from '../Styling/index';
import {Row, Column, Divider, Div} from '../Sections';
import {Card} from '../Card';
import Select from '../Select';
import {H2, H3, H4, H5, Paragraph, Title} from '../Heading';
import {Button, Colors, Circle, RoundImage, TriangleDown} from '../Styling';
import {SessionContext} from '../../session'
import Fragment from "../Fragment"

const PricingCard = ({data, lang, children, price, color, background, transform, priceInfo, applyLabel}) => {
  const { header, button } = data;
  return <Card padding="30px" shadow margin="5px 0" color={background} transform={transform}>
        <H4 
        align="center"
        fontSize="20px"
        fs_md="18px"
        fs_sm="24px"
        fs_xs="22px"
        color={color}
        >
            {header.heading_one}
        </H4>
        <H4 color={color} fontSize="18px" align="center">
          {header.heading_two}
        </H4>
    <Paragraph padding="20px" align="center" fontSize="12px" color={color || Colors.gray}>{header.sub_heading}</Paragraph>
    <H3 margin="20px 0 0"
      fs_xl="25px"
      fs_lg="20px"
      color={color}
      align="center" >{price}</H3>
    <Paragraph align="center" margin="5px 0 40px 0" fontSize="12px" color={color || Colors.gray}>{priceInfo}</Paragraph>
    <Div display="block" margin="0 -50px">{children}</Div>
    <Column size="12" margin="40px 0 0 0"  align="center" image="no"  >
      <Link to={`/${lang}/apply`}><Button width="100%" padding=".3rem 1.5rem" color={Colors.blue} textColor={Colors.white} fontSize="16px" fs_lg="14px" fs_sm="16px">{applyLabel}</Button></Link>
    </Column>
  </Card>;
}

const courseArray =[
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

  useEffect(() => {
    setLocations(props.locations.filter(l => l.node.meta_info.unlisted != true).sort((a, b) => a.node.meta_info.position > b.node.meta_info.position ? 1 : -1))
    if(session && session.location){
      const _loc = props.locations.find(l => l.node.active_campaign_location_slug === session.location.active_campaign_location_slug);
      setCurrentLocation(_loc ? _loc.node : null)
    } 
  },[session, props.locations])
  
  // sync property course
  useEffect(() => setCourse(courseArray.find(c => c.value === props.course)),[props.course]);
  
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
        { course && <Select  
          top="40px"
          left="20px"
          width="300px"
          maxWidth="100%"
          options={locations.map(l => ({ label: l.node.city + ", "+ l.node.country, value: l.node.active_campaign_location_slug }))}
          openLabel={!currentLocation ? "Pick a city" : currentLocation.city + ". " + currentLocation.country}
          closeLabel={!currentLocation ? "Pick a city" : currentLocation.city + ". " + currentLocation.country}
          onSelect={(opt) => setCurrentLocation(locations.find(l => l.node.active_campaign_location_slug === opt.value).node)}
        />}
      </Row>
      {!prices ? 
        <Paragraph margin="10px 0px" align="center" fontSize="18px" >{info.pricing_error} {course.label}, {currentLocation.city}. <br /> {info.pricing_error_contact}</Paragraph>
      :
        <Row align="center">
          { prices.left_section && <Column size="4" maxWidth="280px" size_sm="12" >
            <PricingCard lang={props.lang} 
              transform="translateY(20%)"
              price={prices.left_section.content.price}
              priceInfo={prices.left_section.content.price_info}
              data={prices.left_section} 
              applyLabel={apply_button_text}
            />
          </Column>
          }
          { prices.center_section && Array.isArray(prices.center_section.plans) && <Column size="4" maxWidth="280px" size_sm="12" >
              <PricingCard lang={props.lang} color="white" background='black'
                price={prices.center_section.plans[activeStep].payment}
                priceInfo={prices.center_section.plans[activeStep].paymentInfo}
                applyLabel={apply_button_text}
                data={prices.center_section}
              >
                <Stepper style={{ marginTop: "-50px" }} nonLinear activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                  {Array.isArray(prices.center_section.plans) && prices.center_section.plans.map(p => p.months).map((label, index) => (
                    <Step key={label}>
                      <StepButton icon={<Circle width="14" stroke={Colors.yellow} fill={Colors.yellow} />} onMouseOver={() => setActiveStep(index)}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
                <Div margin="0 0 40px 0">
                  <img style={{ margin: "auto", height: "20px" }} src={prices.center_section.plans[activeStep].logo} />
                </Div>
              </PricingCard>
            </Column>
          }
          { prices.right_section && <Column size="4" maxWidth="280px" size_sm="12" >
            <PricingCard lang={props.lang} 
              transform="translateY(20%)"
              price={prices.right_section.content.price}
              priceInfo={prices.right_section.content.price_info}
              applyLabel={apply_button_text}
              data={prices.right_section} 
            />
          </Column>
          }
        </Row>
      }
    </Fragment>
  )
}
export default (PricesAndPayments)

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 5,
    left: 'calc(-50% + 5px)',
    right: 'calc(50% + 5px)',
  },
  active: {
    '& $line': {
      borderColor: Colors.yelwhitelow,
    },
  },
  completed: {
    '& $line': {
      borderColor: Colors.yellow,
    },
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: Colors.blue,
  },
  line: {
    borderColor: 'white',
    borderTopWidth: 1,
    borderRadius: 1,
  },
})(StepConnector);
const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: Colors.blue,
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});
function QontoStepIcon (props) {
  const classes = useQontoStepIconStyles();
  const {active, completed} = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 4.5,
  },
  active: {
    '& $line': {
      color: 'white',
    },
  },
  completed: {
    '& $line': {
      color: 'yellow',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: Colors.yellow,
    width: 12,
    height: 12,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: Colors.yellow
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon (props) {
  const classes = useColorlibStepIconStyles();
  const {active, completed} = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: Colors.blue,
  },
}));
