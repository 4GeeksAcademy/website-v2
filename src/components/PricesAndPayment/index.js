import React, {useState, useContext, useEffect, useRef} from 'react';
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
import {InView} from 'react-intersection-observer'



const PricesAndPayments = (props) => {
  const {session, setSession} = useContext(SessionContext);
  const [checked, setChecked] = useState(false)
  const classes = useStyles();
  const [completed, setCompleted] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentCourseType, setCurrentCourseType] = useState()
  console.log("session_price", session)
  useEffect(() => {
    const programType = async () => {
      const type = await getProgramInfo()
      setCurrentCourseType(type)
    }
    programType()
  }, [])
  const [prova, setProva] = useState({
    currentCityLocation: "",
    activeStep: 0,
    steps: [],
    currentFilteredCourse: ""
  })
  useEffect(() => {
    const loadCurrentCity = async () => {
      try {
        let response = await session.location;
        if (response) {
          var city = await response.city;
        } else if (response.city == undefined) {
          alert("no city found!!");
        }
      } catch (error) {
        console.log("something failed");
        console.log(error);
      }
      const myLocation = await getCurrentCity(city)
      if (myLocation != null) {
        setProva({...prova, currentCityLocation: myLocation})
      }

    }
    loadCurrentCity();
  }, [session.location])
  // useEffect(() => {
  //   const loadCurrentCity = async () => {
  //     const t = await session.location;
  //     const city = await t.city;
  //     console.log("CITY :", city);
  //     // let city = session && session.location.city;
  //     // const city = "Miami";
  //     const myLocation = await getCurrentCity(city)
  //     if (myLocation != null) {
  //       setProva({...prova, currentCityLocation: myLocation})
  //     }
  //   }
  //   loadCurrentCity();
  // }, [session.location])
  useEffect(() => {
    const loadCurrentProgramSteps = async () => {
      if (currentCourseType === "part-time") {
        if (prova.currentCityLocation.hasFinancialsOption === true) {
          setProva({
            ...prova,
            steps: prova.currentCityLocation.financials_max_months,
            activeStep: prova.currentCityLocation.financials_max_months.length - 1,
            currentFilteredCourse: prova.currentCityLocation.prices.part_time
          })
        }
        else {
          setProva({
            ...prova,
            steps: null,
            activeStep: null,
            currentFilteredCourse: prova.currentCityLocation.prices.part_time
          })
        }
      }
      else if (currentCourseType === "full-time") {
        if (prova.currentCityLocation.hasFinancialsOption === true) {
          setProva({
            ...prova,
            steps: prova.currentCityLocation.financials_max_months,
            activeStep: prova.currentCityLocation.financials_max_months.length - 1,
            currentFilteredCourse: prova.currentCityLocation.prices.full_time
          })
        }
        else {
          setProva({
            ...prova,
            steps: null,
            activeStep: null,
            currentFilteredCourse: prova.currentCityLocation.prices.full_time
          })
        }
      }
    }
    loadCurrentProgramSteps();
  }, [prova.currentCityLocation])

  function getProgramInfo () {
    let program = "";
    {
      props.type === "full-stack-web-development-bootcamp-part-time" || props.type === "desarrollo-web-full-stack-bootcamp-part-time"
        ? program = "part-time"
        : props.type === "full-stack-web-development-bootcamp-full-time" || props.type === "desarrollo-web-full-stack-bootcamp-full-time"
          ? program = "full-time"
          : program = "part-time"
    }
    return program
  }

  function getCurrentCity (needALocation) {
    let currentCityInfo = null;
    let info = null;
    currentCityInfo = props.lang.filter((item) => {return item.node.city === needALocation})
    {currentCityInfo[0] ? info = currentCityInfo[0].node : null}
    return info
  }

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
    // stop()
    // setActiveStep(step);
    setProva({...prova, activeStep: step});
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


  function getStepContents (step) {
    switch (step) {
      case 0:
        return prova.currentFilteredCourse.center_section.plans[0].payment
        break
      case 1:
        return prova.currentFilteredCourse.center_section.plans[1].payment
        break
      case 2:
        return prova.currentFilteredCourse.center_section.plans[2].payment
        break
      case 3:
        return prova.currentFilteredCourse.center_section.plans[3].payment
        break
      case 4:
        return prova.currentFilteredCourse.center_section.plans[4].payment
        break
      case 5:
        return prova.currentFilteredCourse.center_section.plans[5].payment
        break
      default:
        return 'Loading Data';
    }
  }

  function getStepPayments (step, language) {
    switch (step) {
      case 0:
        return prova.currentFilteredCourse.center_section.plans[0].paymentInfo
      case 1:
        return prova.currentFilteredCourse.center_section.plans[1].paymentInfo
      case 2:
        return prova.currentFilteredCourse.center_section.plans[2].paymentInfo
      case 3:
        return prova.currentFilteredCourse.center_section.plans[3].paymentInfo
      case 4:
        return prova.currentFilteredCourse.center_section.plans[4].paymentInfo
      case 5:
        return prova.currentFilteredCourse.center_section.plans[5].paymentInfo
      default:
        return 'Loading Data';
    }
  }

  if (scrollPosition == 2741) {
    // start()
  }

  return (

    <>
      {/* 3 COLUMNS LAYOUT */}
      {prova.currentFilteredCourse &&
        <>
          <Row align="center"><Paragraph align="center" fontSize="14px" color={Colors.gray}>{session.location && session.location.city}</Paragraph></Row>
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
            {prova.currentCityLocation.hasFinancialsOption === true ?
              <Column size="4" customRespSize respSize="12">
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
                            {getStepContents(prova.activeStep)}
                          </H3>
                          <Paragraph
                            align="center"
                            margin="5px 0"
                            fontSize="12px"
                            fontFamily="Lato-bold, sans-serif"
                            color={Colors.gray}
                          >
                            {getStepPayments(prova.activeStep, props.lang)}
                          </Paragraph>
                        </Column>
                      </Row>
                    </Column>
                  </Row>
                  <Row height="80px" >
                    <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                      <Row height="100%" align="center">
                        <Stepper nonLinear activeStep={prova.activeStep} alternativeLabel connector={<QontoConnector />}>
                          {prova.steps != null && prova.steps.map((label, index) => (
                            <Step key={label}>
                              <StepButton icon={<Circle width="14" stroke={Colors.yellow} fill={Colors.yellow} />} onMouseOver={handleStep(index)} completed={completed[index]}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                              </StepButton>
                            </Step>
                          ))}
                        </Stepper>
                      </Row>
                      <Row align="center" height="40px">
                        <Column size="12" align="center">
                          <Typography className={classes.instructions}>{getStepLogo(prova.activeStep)}</Typography>
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
        </>

      }
    </>
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
