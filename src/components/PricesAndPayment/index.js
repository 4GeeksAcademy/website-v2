import React, {useState, useContext, useEffect, useRef} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
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
import {Link} from 'gatsby';
import Typography from '@material-ui/core/Typography';
import {Row, Column, Divider, Div} from '../Sections';
import {Card} from '../Card';
import {H2, H3, H4, H5, Paragraph, Title} from '../Heading';
import {Button, Colors, Circle, RoundImage, TriangleDown} from '../Styling';
import {SessionContext} from '../../session'
import Fragment from "../Fragment"



const PricesAndPayments = (props) => {
  const {session, setSession} = useContext(SessionContext);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [cityToggle, setCityToggle] = useState(false);

  let prova = {
    currentCityLocation: "",
    steps: [],
    currentFilteredCourse: ""
  }
  if (session.location) {
    let currentLocation = props.locations.find(l => l.node.meta_info.slug === session.location.meta_info.slug)
    if (currentLocation) {
      currentLocation = currentLocation.node
      prova = {
        currentCityLocation: currentLocation,
        steps: currentLocation.financials_max_months,
        currentFilteredCourse: currentLocation.prices[props.course]
      }
    }
  }
  if (!prova.currentFilteredCourse) return <Row align={`center`}> <Paragraph align="center" fontSize="18px" >"Loading..."</Paragraph></Row>

  function getStepLogo (step) {
    switch (step) {
      case 0:
        return <img src={prova.currentFilteredCourse.center_section.plans[0].logo} height="20px" />;
      case 1:
        return <img src={prova.currentFilteredCourse.center_section.plans[1].logo} height="20px" />;
      case 2:
        return <img src={prova.currentFilteredCourse.center_section.plans[2].logo} height="20px" />;
      case 3:
        return <img src={prova.currentFilteredCourse.center_section.plans[3].logo} height="20px" />;
      case 4:
        return <img src={prova.currentFilteredCourse.center_section.plans[4].logo} height="20px" />;
      case 5:
        return <><img src={prova.currentFilteredCourse.center_section.plans[5].logo} height="20px" />  <img src={prova.currentFilteredCourse.center_section.plans[4].logo} height="20px" /></>;
      default:
        return 'Loading Data';
    }
  }

  return (
    <Fragment github="/location">
      <Row
        background={Colors.lightGray}
        borderRadius={`.5rem`}
        align={`center`}
        customRespSize
        alignResp={`center`}
      >
        <Div alignItems={`center`}
          onMouseLeave={() => {

            setTimeout(() => {
              setCityToggle(false);
            }, 300)
          }}
        >
          {/* <Paragraph
            fontWeight={`500`}
            fs_xs="18px"
            fs_sm="18px"
            fs_md="18px"
            fs_lg="18px"
            fs_xl="20px"
            margin={`0 5px 0 0`}>
            Select a city
          </Paragraph> */}
          <Card
            color={`grey`}
            borders={`.5rem`}
            margin={`0 20px 0 0`}
            margin_sm={"20px auto"}
            margin_xs={"20px auto"}
          >
            <Button
              display={`flex`}

              width="fit-content"
              onClick={() => setCityToggle(!cityToggle)}
              color={Colors.lightGray}
            >
              <Paragraph
                fontWeight={`500`}
                color={Colors.gray}
                fs_xs="18px"
                fs_sm="18px"
                fs_md="18px"
                fs_lg="18px"
                fs_xl="20px"
                margin={`0 5px 0 0`}>
                {session.location && session.location.city}
              </Paragraph>
              <TriangleDown width="16" color={Colors.gray} fill={Colors.gray} />
            </Button>
            {cityToggle &&
              <Row marginBottom="5px" marginTop="3px" marginRight="0" marginLeft="0" width="250px" align="center" position="absolute" zIndex="1000" background={Colors.white} borderRadius=".5rem" shadow>
                {Array.isArray(props.locations) && props.locations.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      colorHover={Colors.lightBlue}
                      onClick={() => {
                        setSession({...session, location: {...item.node}})
                        setCityToggle(!cityToggle)
                      }}

                      textColor={Colors.gray}
                      fontSize={"16px"}
                      borderRadius=".5rem" padding="10px"
                    >
                      <Paragraph
                        fontSize="16px"
                        color={Colors.gray} >
                        {item.node.city}
                      </Paragraph>

                    </Button>
                  )
                })}
              </Row>
            }
          </Card>
        </Div>
      </Row>

      <Divider height="50px" />
      <Row align="center">
        <Column size="4" size_sm="12" customRespSize respSize="12">
          <Card
            shadow
            width="100%"
            height="350px"
            margin="5px 0"
          >
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <Row align="center" height="100%" >
                      <H4
                        fs_xs="20px"
                        fs_sm="24px"
                        fs_md="18px"
                        fs_lg="20px"
                        fs_xl="16px"
                        align="center">{prova.currentFilteredCourse.left_section.header.heading_one}
                      </H4>
                    </Row>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="40px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" align="center">
                  <Column size="8" alignSelf="center" >
                    <Paragraph align="center" fontSize="12px" color={Colors.gray}>{prova.currentFilteredCourse.left_section.header.sub_heading}</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="110px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" align="center">
                  <Column size="10" alignSelf="center" align="center">
                    <H3
                      fs_xs="20px"
                      fs_sm="24px"
                      fs_md="24px"
                      fs_lg="20px"
                      fs_xl="24px"
                      align="center" >{prova.currentFilteredCourse.left_section.content.price}</H3>
                    <Paragraph align="center" margin="5px 0 0 0" fontSize="10px" color={Colors.gray}>{prova.currentFilteredCourse.left_section.content.price_info}</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" align="center">
                    <Link to="/apply"><Button width="120px" padding=".3rem 1.5rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">{prova.currentFilteredCourse.left_section.button.button_text}</Button></Link>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Card>
        </Column>
        {prova.currentCityLocation.hasFinancialsOption &&
          <Column size="4" size_sm="12" customRespSize respSize="12">
            <Card shadow width="100%" height="400px" margin="5px 0" color="black" move="up" up="20px">
              <Row height="100px" >
                <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                  <Row height="100%" >
                    <Column size="12" alignSelf="center" >
                      <Row align="center" height="100%" >
                        <H4 fs_xs="16px"
                          fs_sm="24px"
                          fs_md="18px"
                          fs_lg="20px"
                          fs_xl="16px" align="center" color={Colors.white}>{prova.currentFilteredCourse.center_section.header.heading_one}</H4></Row>
                    </Column>
                  </Row>
                </Column>
              </Row>
              <Row height="50px" >
                <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                  <Row height="100%" align="center">
                    <Column size="8" alignSelf="center" >
                      <Paragraph
                        align="center"
                        fontSize="12px"
                        fontFamily="Lato-bold, sans-serif"
                        color={Colors.yellow}
                      >
                        {prova.currentFilteredCourse.center_section.header.sub_heading}
                      </Paragraph>
                    </Column>
                  </Row>
                </Column>
              </Row>
              <Row height="50px" >
                <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                  <Row height="100%" >
                    <Column size="12" alignSelf="center" >
                      <H3
                        fs_xs="20px"
                        fs_sm="24px"
                        fs_md="24px"
                        fs_lg="20px"
                        fs_xl="24px"
                        align="center"
                        color={Colors.white}>
                        {prova.currentFilteredCourse.center_section.plans[activeStep].payment}
                      </H3>
                      <Paragraph
                        align="center"
                        margin="5px 0"
                        fontSize="12px"
                        fontFamily="Lato-bold, sans-serif"
                        color={Colors.gray}
                      >
                        {prova.currentFilteredCourse.center_section.plans[activeStep].paymentInfo}
                      </Paragraph>
                    </Column>
                  </Row>
                </Column>
              </Row>
              <Row height="80px" >
                <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                  <Row height="100%" align="center">
                    <Stepper nonLinear activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                      {prova.steps != null && prova.steps.map((label, index) => (
                        <Step key={label}>
                          <StepButton icon={<Circle width="14" stroke={Colors.yellow} fill={Colors.yellow} />} onMouseOver={() => setActiveStep(index)}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                          </StepButton>
                        </Step>
                      ))}
                    </Stepper>
                  </Row>
                  <Row align="center" height="40px">
                    <Column size="12" align="center">
                      <Typography className={classes.instructions}>{getStepLogo(activeStep)}</Typography>
                    </Column>
                  </Row>
                </Column>
              </Row>
              <Row height="120px" >
                <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                  <Row height="100%" >
                    <Column size="12" alignSelf="center" align="center">
                      <Link to="/apply"><Button width="120px" padding=".3rem 1.5rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">{prova.currentFilteredCourse.center_section.button.button_text}</Button></Link>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Card>
          </Column>
        }
        <Column size="4" size_sm="12" customRespSize respSize="12">
          <Card shadow width="100%" height="350px" margin="5px 0">
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <Row align="center" height="100%" >
                      <H4 fs_xs="20px"
                        fs_sm="24px"
                        fs_md="18px"
                        fs_lg="20px"
                        fs_xl="16px" align="center">{prova.currentFilteredCourse.right_section.header.heading_one}</H4></Row>
                    {/* <Row align="center" height="100%" ><H4 fontSize="22px" align="center">{props.lang === "es" ? locInfo.right_section.header.heading_two.es : locInfo.right_section.header.heading_two.us}</H4></Row> */}
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="40px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" align="center">
                  <Column size="8" alignSelf="center" >
                    <Paragraph align="center" fontSize="12px" color={Colors.gray}>{prova.currentFilteredCourse.right_section.header.sub_heading}</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="110px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" align="center">
                  <Column size="10" alignSelf="center" align="center">
                    <H3
                      fs_xs="20px"
                      fs_sm="24px"
                      fs_md="24px"
                      fs_lg="20px"
                      fs_xl="24px"
                      align="center" >{prova.currentFilteredCourse.right_section.content.price}</H3>
                    <Paragraph align="center" margin="5px 0 0 0" fontSize="10px" color={Colors.gray}>{prova.currentFilteredCourse.right_section.content.price_info}</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" align="center">
                    <Link to="/apply"><Button width="120px" padding=".3rem 1.5rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">{prova.currentFilteredCourse.right_section.button.button_text}</Button></Link>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Card>
        </Column>
      </Row>
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
