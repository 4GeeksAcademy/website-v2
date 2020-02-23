import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
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
import {Row, Column, Divider} from '../Sections';
import {Card} from '../Card';
import {H2, H3, H4, H5, Paragraph, Title} from '../Heading';
import {Button, Colors, Circle, RoundImage} from '../Styling';
import {SessionContext} from '../../session'

export default (props) => {
  const {session, setSession} = useContext(SessionContext);
  const [checked, setChecked] = useState(false)
  const [test, setTest] = useState()
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps(session.location);
  // useEffect(() => {
  //   const loadInfo = async () => {
  //     let t = data.allLocationsYaml.edges.filter((item) => item.node.city === session.location)
  //     await setTest(t)
  //   };
  //   loadInfo();
  // }, [])
  const handleChange = (checked) => {
    setChecked(checked)
  }

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleStep = step => () => {
    setActiveStep(step);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const data = useStaticQuery(graphql`
    query myQueryTest{
      allLocationsYaml {
        edges {
          node {
            city
            defaultLanguage
            hasFinancialsOption
            meta_info {
              slug
            }
            prices {
              full_time {
                slug
                duration {
                  us
                  es
                }
                left_section {
                  button {
                    button_text {
                      us
                      es
                    }
                  }
                  content {
                    price
                    price_info {
                      us
                      es
                    }
                  }
                  header {
                    heading_one {
                      us
                      es
                    }
                    heading_two {
                      us
                      es
                    }
                    sub_heading {
                      us
                      es
                    }
                  }
                }
                center_section {
                  header {
                    heading_one {
                      us
                      es
                    }
                    heading_two {
                      us
                      es
                    }
                    sub_heading {
                      us
                      es
                    }
                  }
                  button {
                    button_text {
                      us
                      es
                    }
                  }
                  plans {
                    message {
                      us
                      es
                    }
                    paymentInfo {
                      us
                      es
                    }
                    payment
                    months
                    logo
                    provider
                  }
                }
                right_section {
                  button {
                    button_text {
                      us
                      es
                    }
                  }
                  content {
                    price
                    price_info {
                      us
                      es
                    }
                  }
                  header {
                    heading_one {
                      us
                      es
                    }
                    heading_two {
                      us
                      es
                    }
                    sub_heading {
                      us
                      es
                    }
                  }
                }
                
              }
              part_time {
                slug
                duration {
                  es
                  us
                }
                left_section {
                  header {
                    heading_one {
                      us
                      es
                    }
                    heading_two {
                      us
                      es
                    }
                    sub_heading {
                      us
                    }
                  }
                  content {
                    price_info {
                      us
                      es
                    }
                    price
                  }
                  button {
                    button_text {
                      us
                      es
                    }
                  }
                }
                right_section {
                  header {
                    heading_one {
                      us
                      es
                    }
                    heading_two {
                      us
                      es
                    }
                    sub_heading {
                      us
                      es
                    }
                  }
                  content {
                    price_info {
                      us
                      es
                    }
                    price
                  }
                  button {
                    button_text {
                      us
                      es
                    }
                  }
                }
                center_section {
                  header {
                    heading_one {
                      us
                      es
                    }
                    heading_two {
                      us
                      es
                    }
                    sub_heading {
                      us
                      es
                    }
                  }
                  button {
                    button_text {
                      us
                      es
                    }
                  }
                  plans {
                    logo
                    message {
                      us
                      es
                    }
                    months
                    payment
                    paymentInfo {
                      us
                      es
                    }
                    provider
                  }
                }
              }
            }
            heading_section {
              heading {
                es
                us
              }
              sub_heading {
                es
                us
              }
            }
          }
        }
      }
  }
    `)
  // function getLocationInfo (type) {
  //   let locInfo = null
  //   let info = null
  //   let currentCityInfo = null;
  //   currentCityInfo = data.allLocationsYaml.edges.filter((item) => item.node.city === session.location)
  //   info = currentCityInfo[0].node
  //   if (type === "full-time") {
  //     locInfo = info.prices.full_time
  //     return locInfo
  //   }
  //   if (type === "part-time") {
  //     locInfo = info.prices.part_time
  //     return locInfo
  //   }


  //   }
  let currentCityInfo = null;
  let info = null;
  currentCityInfo = data.allLocationsYaml.edges.filter((item) => {return item.node.city === session.location})
  {currentCityInfo[0] ? info = currentCityInfo[0].node : null}

  console.log("####", currentCityInfo)
  console.log("$$$$", info)
  function getProgramInfo () {
    let program = "";
    {
      props.type === "full-stack-web-development-bootcamp-part-time"
        ? program = "part-time"
        : props.type === "full-stack-web-development-bootcamp-full-time"
          ? program = "full-time"
          : program = "part-time"
    }
    return program
  }
  function getLocationProgramInfo (infoCity, courseType) {
    let cityProgramInfo = "";
    if (courseType === "full-time") {
      cityProgramInfo = infoCity.prices.full_time
      return cityProgramInfo
    }
    if (courseType === "part-time") {
      cityProgramInfo = infoCity.prices.part_time
      return cityProgramInfo
    }
  }
  let locInfo = null;
  {info != null ? locInfo = getLocationProgramInfo(info, getProgramInfo()) : null}

  console.log("TYPE:", locInfo)
  // console.log("get:", getLocationProgramInfo(info, getProgramInfo()))
  // console.log("session$$: ", getLocationProgramInfo(currentCityInfo[0].node, getProgramInfo()))
  // console.log("currentCityInfo: ", getLocationInfo(getProgramInfo()))
  // console.log("locations: ", locationsArray)
  // let tempQ = data.cred.edges.findIndex(item => item.node.name === "Quotanda")
  // let tempS = data.cred.edges.findIndex(item => item.node.name === "Skill Fund")
  // let tempC = data.cred.edges.findIndex(item => item.node.name === "Climb")
  function getStepContent (step) {
    switch (step) {
      case 0:
        return `${data.cred.edges[tempQ].node.description}`
      case 1:
        return `${data.cred.edges[tempQ].node.description}`
      case 2:
        return `${data.cred.edges[tempQ].node.description}`
      case 3:
        return `${data.cred.edges[tempS].node.description}`
      case 4:
        return `${data.cred.edges[tempC].node.description}`
      case 5:
        return `${data.cred.edges[tempC].node.description}`
      default:
        return 'Unknown step';
    }
  }
  function getStepLogo (step) {
    switch (step) {
      case 0:
        return <img src={data.cred.edges[tempQ].node.logo} height="20px" />;
      case 1:
        return <img src={data.cred.edges[tempQ].node.logo} height="20px" />;
      case 2:
        return <img src={data.cred.edges[tempQ].node.logo} height="20px" />;
      case 3:
        return <img src={data.cred.edges[tempS].node.logo} height="20px" />;
      case 4:
        return <img src={data.cred.edges[tempC].node.logo} height="20px" />;
      case 5:
        return <><img src={data.cred.edges[tempC].node.logo} height="20px" /> <img src={data.cred.edges[tempS].node.logo} height="20px" /></>;
      default:
        return 'Unknown step';
    }
  }

  function getStepContents (step) {
    switch (step) {
      case 0:
        return `${currentCityInfo}`
      case 1:
        return `${data.cred.edges[tempQ].node.options[1].payment}`
      case 2:
        return `${data.cred.edges[tempQ].node.options[2].payment}`
      case 3:
        return `${data.cred.edges[tempS].node.options[0].payment}`
      case 4:
        return `${data.cred.edges[tempC].node.options[0].payment}`
      case 5:
        return `${data.cred.edges[tempC].node.options[1].payment}`
      default:
        return 'Unknown step';
    }
  }
  function getStepPayments (step) {
    switch (step) {
      case 0:
        return `${data.cred.edges[tempQ].node.options[0].paymentParagraph}`
      case 1:
        return `${data.cred.edges[tempQ].node.options[1].paymentParagraph}`
      case 2:
        return `${data.cred.edges[tempQ].node.options[2].paymentParagraph}`
      case 3:
        return `${data.cred.edges[tempS].node.options[0].paymentParagraph}`
      case 4:
        return `${data.cred.edges[tempC].node.options[0].paymentParagraph}`
      case 5:
        return `${data.cred.edges[tempC].node.options[1].paymentParagraph}`
      default:
        return 'Unknown step';
    }
  }
  // console.log("data", data.cities.edges[1].node.prices.part_time[0].message)
  return (
    <>
      {/* 3 COLUMNS LAYOUT */}
      {info != null &&
        <>
          <Title
            size="10"
            title={props.lang === "es" ? info.heading_section.heading.es : info.heading_section.heading.us}
            paragraph={session.location}
            primary
          />
          <Divider height="50px" />
          <Row align="center">
            <Column size="4" customRespSize respSize="12">
              <Card shadow width="100%" height="350px" margin="5px 0">
                <Row height="100px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" >
                        <Row align="center" height="100%" ><H4 fontSize="22px" align="center">{props.lang === "es" ? locInfo.left_section.header.heading_one.es : locInfo.left_section.header.heading_one.us}</H4></Row>
                        <Row align="center" height="100%" ><H4 fontSize="22px" align="center">{props.lang === "es" ? locInfo.left_section.header.heading_two.es : locInfo.left_section.header.heading_two.us}</H4></Row>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="40px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" align="center">
                      <Column size="8" alignSelf="center" >
                        <Paragraph align="center" fontSize="14px" color={Colors.gray}>{props.lang === "es" ? locInfo.left_section.header.sub_heading.es : locInfo.left_section.header.sub_heading.us}</Paragraph>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="110px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" >
                        <H3 align="center" >{props.lang === "es" ? locInfo.left_section.content.price : locInfo.left_section.content.price}</H3>
                        <Paragraph align="center" margin="5px 0 0 0" fontSize="10px" color={Colors.gray}>{props.lang === "es" ? locInfo.left_section.content.price_info.es : locInfo.left_section.content.price_info.us}</Paragraph>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="100px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" align="center">
                        <Link to="/apply"><Button width="200px" padding=".6rem 2rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">{props.lang === "es" ? locInfo.left_section.button.button_text.es : locInfo.left_section.button.button_text.us}</Button></Link>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Card>
            </Column>
            {info.hasFinancialsOption === true ? <Column size="4" customRespSize respSize="12">
              <Card shadow width="100%" height="400px" margin="5px 0" color="black" move="up" up="20px">
                <Row height="100px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" >
                        <Row align="center" height="100%" ><H4 fontSize="22px" align="center" color={Colors.white}>{props.lang === "es" ? locInfo.center_section.header.heading_one.es : locInfo.center_section.header.heading_one.us}</H4></Row>
                        <Row align="center" height="100%" ><H4 fontSize="22px" align="center" color={Colors.white}>{props.lang === "es" ? locInfo.center_section.header.heading_two.es : locInfo.center_section.header.heading_two.us}</H4></Row>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="50px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" align="center">
                      <Column size="8" alignSelf="center" >
                        <Paragraph align="center" fontSize="14px" color={Colors.yellow}>and enjoy the best pricing in town.</Paragraph>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="50px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" >
                        {/* <H3 align="center" color={Colors.white}>{getStepContents(activeStep)}</H3> */}
                        {/* <Paragraph align="center" margin="5px 0" fontSize="12px" color={Colors.gray}>{getStepPayments(activeStep)}</Paragraph> */}
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="80px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" align="center">
                      <Stepper nonLinear activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                        {steps.map((label, index) => (
                          <Step key={label}>
                            <StepButton icon={<Circle width="14" stroke={Colors.yellow} fill={Colors.yellow} />} onMouseOver={handleStep(index)} completed={completed[index]}>
                              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </StepButton>
                          </Step>
                        ))}
                      </Stepper>
                    </Row>
                    <Row align="center" height="40px">
                      {/* <Typography className={classes.instructions}>{getStepLogo(activeStep)}</Typography> */}
                    </Row>
                  </Column>
                </Row>
                <Row height="120px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" align="center">
                        <Link to="/apply"><Button width="200px" padding=".6rem 2rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">{props.lang === "es" ? locInfo.center_section.button.button_text.es : locInfo.center_section.button.button_text.us}</Button></Link>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Card>
            </Column>
              : null}
            <Column size="4" customRespSize respSize="12">
              <Card shadow width="100%" height="350px" margin="5px 0">
                <Row height="100px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" >
                        <Row align="center" height="100%" ><H4 fontSize="22px" align="center">{props.lang === "es" ? locInfo.right_section.header.heading_one.es : locInfo.right_section.header.heading_one.us}</H4></Row>
                        <Row align="center" height="100%" ><H4 fontSize="22px" align="center">{props.lang === "es" ? locInfo.right_section.header.heading_two.es : locInfo.right_section.header.heading_two.us}</H4></Row>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="40px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" align="center">
                      <Column size="8" alignSelf="center" >
                        <Paragraph align="center" fontSize="13px" color={Colors.gray}>{props.lang === "es" ? locInfo.right_section.header.sub_heading.es : locInfo.right_section.header.sub_heading.us}</Paragraph>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="110px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" >
                        <H3 align="center" >{locInfo.right_section.content.price}</H3>
                        <Paragraph align="center" margin="5px 0 0 0" fontSize="10px" color={Colors.gray}>{props.lang === "es" ? locInfo.right_section.content.price_info.es : locInfo.right_section.content.price_info.us}</Paragraph>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="100px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" align="center">
                        <Link to="/apply"><Button width="200px" padding=".6rem 2rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">{props.lang === "es" ? locInfo.right_section.button.button_text.es : locInfo.right_section.button.button_text.us}</Button></Link>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Card>
            </Column>
          </Row>
        </>}
    </>
  )
}

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

function getSteps (location) {
  if (location === "Miami") {return ['6 mo', '12 mo', '24 mo', '36 mo', '42 mo', '60 mo'];}
  if (location === "Santiago de Chile") {return ['6 mo', '12 mo'];}
  if (location === "Caracas" || location === "Maracaibo") {return null;}
  if (location === "Madrid") {return [];}
  if (location === null) {return [];}
}
