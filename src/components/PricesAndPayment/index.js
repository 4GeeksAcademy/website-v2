import React, {useState} from 'react';
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


import Typography from '@material-ui/core/Typography';
import {Row, Column} from '../Sections';
import {Card} from '../Card';
import {H2, H3, H4, H5, Paragraph} from '../Heading';
import {Button, Colors, Circle} from '../Styling';
import '../../assets/css/style.scss';
import Switch from "react-switch";



export default () => {
  const [checked, setChecked] = useState(false)
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps();
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
        credentials: allCredentialsDataYaml {
            edges {
              node {
                credential
              }
            }
        }
        alumni:   allAlumniYaml{
          edges{
            node{
              name
              image
              content
              title
            }
          }
        }
      cred: allFinancialsYaml{
        edges{
            node{
                name
                options{
                    months
                    payment
                }
                logo
                description
            }
        }
    }}
    `)
  let tempQ = data.cred.edges.findIndex(item => item.node.name === "Quotanda")
  let tempS = data.cred.edges.findIndex(item => item.node.name === "Skill Fund")
  let tempC = data.cred.edges.findIndex(item => item.node.name === "Climb")
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
        return <img src={data.cred.edges[tempQ].node.logo} width="256" height="100%" />;
      case 1:
        return <img src={data.cred.edges[tempQ].node.logo} width="256" height="100%" />;
      case 2:
        return <img src={data.cred.edges[tempQ].node.logo} width="256" height="100%" />;
      case 3:
        return <img src={data.cred.edges[tempS].node.logo} width="256" height="100%" />;
      case 4:
        return <img src={data.cred.edges[tempC].node.logo} width="256" height="100%" />;
      case 5:
        return <img src={data.cred.edges[tempC].node.logo} width="256" height="100%" />;
      default:
        return 'Unknown step';
    }
  }
  function getStepContents (step) {
    switch (step) {
      case 0:
        return `${data.cred.edges[tempQ].node.options[0].payment}`
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

  return (
    <>

      {/* 3 COLUMNS LAYOUT */}
      <Row align="center">
        <Column size="4" customRespSize respSize="12">
          <Card shadow width="100%" height="350px" margin="5px 0">
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <Row align="center" height="100%" ><H4 fontSize="22px" align="center">PAY UPFRONT</H4></Row>
                    <Row align="center" height="100%" ><H4 fontSize="22px" align="center">(OUT OF POCKET)</H4></Row>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="40px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" align="center">
                  <Column size="8" alignSelf="center" >
                    <Paragraph align="center" fontSize="14px" color={Colors.gray}>and enjoy the best pricing in town.</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="110px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <H3 align="center" >$6,999</H3>
                    <Paragraph align="center" margin="5px 0 0 0" fontSize="10px" color={Colors.gray}>single payment</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>

            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" align="center">
                    <Button padding=".6rem 2rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">APPLY NOW</Button>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Card>
        </Column>

        <Column size="4" customRespSize respSize="12">
          <Card shadow width="100%" height="400px" margin="5px 0" color="black" move="up" up="20px">
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <Row align="center" height="100%" ><H4 fontSize="22px" align="center" color={Colors.white}>EXTENDED</H4></Row>
                    <Row align="center" height="100%" ><H4 fontSize="22px" align="center" color={Colors.white}>PAYMENT PLAN</H4></Row>
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
                    <H3 align="center" color={Colors.white}>{getStepContents(activeStep)}</H3>                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="100px" >
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
              </Column>
            </Row>
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" align="center">
                    <Button padding=".6rem 2rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">APPLY NOW</Button>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Card>
        </Column>

        <Column size="4" customRespSize respSize="12">
          <Card shadow width="100%" height="350px" margin="5px 0">
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <Row align="center" height="100%" ><H4 fontSize="22px" align="center">PAY ONLY AFTER</H4></Row>
                    <Row align="center" height="100%" ><H4 fontSize="22px" align="center">YOU GET A JOB</H4></Row>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="40px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" align="center">
                  <Column size="8" alignSelf="center" >
                    <Paragraph align="center" fontSize="13px" color={Colors.gray}>and talk about the income share agreement.</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="110px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <H3 align="center" >$134.99</H3>
                    <Paragraph align="center" margin="5px 0 0 0" fontSize="10px" color={Colors.gray}>per month</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>

            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" align="center">
                    <Button padding=".6rem 2rem" color={Colors.blue} textColor={Colors.white} fontSize="8px">APPLY NOW</Button>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Card>
        </Column>
      </Row>


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
      borderColor: Colors.yellow,
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

function getSteps () {
  return ['6 mo', '12 mo', '24 mo', '36 mo', '42 mo', '60 mo'];
}

