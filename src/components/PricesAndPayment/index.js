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
      allLocationYaml {
        edges {
          node {
            city
            hasFinancialsOption
            meta_info {
              slug
              description
              image
              keywords
              redirects
            }
            image
            prices {
              full_time {
                center_section {
                  button {
                    button_text
                  }
                  header {
                    sub_heading
                    heading_one
                    heading_two
                  }
                  plans {
                    months
                    payment
                    paymentInfo
                    provider
                    logo
                    message
                  }
                }
                left_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                  }
                  header {
                    heading_one
                    heading_two
                    sub_heading
                  }
                }
                right_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                  }
                  header {
                    heading
                    sub_heading
                    heading_one
                    heading_two
                  }
                }
              }
              part_time {
                center_section {
                  button {
                    button_text
                  }
                  header {
                    heading_two
                    sub_heading
                    heading_one
                  }
                  plans {
                    months
                    payment
                    paymentInfo
                    provider
                    logo
                    message
                  }
                }
                left_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                  }
                  header {
                    heading_one
                    sub_heading
                    heading_two
                  }
                }
                right_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                  }
                  header {
                    heading_one
                    sub_heading
                    heading_two
                  }
                }
              }
            }
            seo_title
            sub_heading
            tagline
          }
        }
      }
  }
    `)

  let currentCityInfo = null;
  let info = null;
  currentCityInfo = data.allLocationYaml.edges.filter((item) => {return item.node.city === session.location})
  {currentCityInfo[0] ? info = currentCityInfo[0].node : null}

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

  let planData = null;
  {locInfo != null ? planData = locInfo.center_section.plans : null}

  function getStepLogo (step) {
    switch (step) {
      case 0:
        return <img src={planData[0].logo} height="20px" />;
      case 1:
        return <img src={planData[1].logo} height="20px" />;
      case 2:
        return <img src={planData[2].logo} height="20px" />;
      case 3:
        return <img src={planData[3].logo} height="20px" />;
      case 4:
        return <img src={planData[4].logo} height="20px" />;
      case 5:
        return <><img src={planData[5].logo} height="20px" /> <img src={planData[4].logo} height="20px" /></>;
      default:
        return 'Unknown step';
    }
  }

  function getStepContents (step) {
    switch (step) {
      case 0:
        return `${planData[0].payment}`
      case 1:
        return `${planData[1].payment}`
      case 2:
        return `${planData[2].payment}`
      case 3:
        return `${planData[3].payment}`
      case 4:
        return `${planData[4].payment}`
      case 5:
        return `${planData[5].payment}`
      default:
        return 'Unknown step';
    }
  }

  function getStepPayments (step, language) {
    switch (step) {
      case 0:
        return planData[0].paymentInfo
      case 1:
        return planData[0].paymentInfo
      case 2:
        return planData[0].paymentInfo
      case 3:
        return planData[0].paymentInfo
      case 4:
        return planData[0].paymentInfo
      case 5:
        return planData[0].paymentInfo
      default:
        return 'Unknown step';
    }
  }
  console.log("info", info)
  return (
    <>
      {/* 3 COLUMNS LAYOUT */}
      {info != null ?
        <>

          <Row align="center"><Paragraph align="center" fontSize="14px" color={Colors.gray}>{session.location}</Paragraph></Row>
          <Divider height="50px" />
          <Row align="center">
            <Column size="4" customRespSize respSize="12">
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
                            fs_md="24px"
                            fs_lg="20px"
                            fs_xl="16px"
                            align="center">{locInfo.left_section.header.heading_one}</H4>
                        </Row>
                        {/* <Row align="center" height="100%" ><H4 fontSize="22px" align="center">locInfo.left_section.header.heading_two.es : locInfo.left_section.header.heading_two.us}</H4></Row> */}
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="40px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" align="center">
                      <Column size="8" alignSelf="center" >
                        <Paragraph align="center" fontSize="14px" color={Colors.gray}>{locInfo.left_section.header.sub_heading}</Paragraph>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="110px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" >
                        <H3
                          fs_xs="20px"
                          fs_sm="24px"
                          fs_md="24px"
                          fs_lg="20px"
                          fs_xl="24px"
                          align="center" >{locInfo.left_section.content.price}</H3>
                        <Paragraph align="center" margin="5px 0 0 0" fontSize="10px" color={Colors.gray}>{locInfo.left_section.content.price_info}</Paragraph>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="100px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" align="center">
                        <Link to="/apply"><Button width="150px" padding=".6rem 2rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">{locInfo.left_section.button.button_text}</Button></Link>
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
                        <Row align="center" height="100%" >
                          <H4 fs_xs="16px"
                            fs_sm="24px"
                            fs_md="24px"
                            fs_lg="20px"
                            fs_xl="16px" align="center" color={Colors.white}>{locInfo.center_section.header.heading_one}</H4></Row>
                        {/* <Row align="center" height="100%" ><H4 fontSize="22px" align="center" color={Colors.white}>{props.lang === "es" ? locInfo.center_section.header.heading_two.es : locInfo.center_section.header.heading_two.us}</H4></Row> */}
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="50px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" align="center">
                      <Column size="8" alignSelf="center" >
                        <Paragraph align="center" fontSize="14px" color={Colors.yellow}>{locInfo.center_section.header.sub_heading}</Paragraph>
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
                          color={Colors.white}>{getStepContents(activeStep)}</H3>
                        <Paragraph align="center" margin="5px 0" fontSize="12px" color={Colors.gray}>{getStepPayments(activeStep, props.lang)}</Paragraph>
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
                      <Typography className={classes.instructions}>{getStepLogo(activeStep)}</Typography>
                    </Row>
                  </Column>
                </Row>
                <Row height="120px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" align="center">
                        <Link to="/apply"><Button width="150px" padding=".6rem 2rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">{locInfo.center_section.button.button_text}</Button></Link>
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
                        <Row align="center" height="100%" >
                          <H4 fs_xs="20px"
                            fs_sm="24px"
                            fs_md="24px"
                            fs_lg="20px"
                            fs_xl="16px" align="center">{locInfo.right_section.header.heading_one}</H4></Row>
                        {/* <Row align="center" height="100%" ><H4 fontSize="22px" align="center">{props.lang === "es" ? locInfo.right_section.header.heading_two.es : locInfo.right_section.header.heading_two.us}</H4></Row> */}
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="40px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" align="center">
                      <Column size="8" alignSelf="center" >
                        <Paragraph align="center" fontSize="13px" color={Colors.gray}>{locInfo.right_section.header.sub_heading}</Paragraph>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="110px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" >
                        <H3
                          fs_xs="20px"
                          fs_sm="24px"
                          fs_md="24px"
                          fs_lg="20px"
                          fs_xl="24px"
                          align="center" >{locInfo.right_section.content.price}</H3>
                        <Paragraph align="center" margin="5px 0 0 0" fontSize="10px" color={Colors.gray}>{locInfo.right_section.content.price_info}</Paragraph>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row height="100px" >
                  <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                    <Row height="100%" >
                      <Column size="12" alignSelf="center" align="center">
                        <Link to="/apply"><Button width="150px" padding=".6rem 2rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">{locInfo.right_section.button.button_text}</Button></Link>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Card>
            </Column>
          </Row>
        </> : <Row>Loading ...</Row>}
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
