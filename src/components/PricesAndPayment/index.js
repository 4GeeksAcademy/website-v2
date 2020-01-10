import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import {Row, Column} from '../Sections';
import {Card} from '../Card';
import {H2, H4, H5, Paragraph} from '../Heading';
import {Button, Colors} from '../Styling';
import '../../assets/css/style.scss';

export default () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();
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
  console.log("Q:", tempQ)
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
      {/* <div> */}
      <Row center>
        <Column size="4" >
          <Card shadow width="100%" height="400px" padding="1.5rem">
            <Row center><H5 fontSize="20px">PAY UPFRONT</H5></Row>
            <Row center marginBottom="10px"><H5 fontSize="20px">OR MONTHLY</H5></Row>
            <Row center marginBottom="20px"><Paragraph primary>and enjoy the best pricing in town.</Paragraph></Row>
            <Row></Row>

            <Row center>
              <H5 fontSize="28px">{getStepContents(activeStep)}
                {/* <Typography >{getStepContents(activeStep)}</Typography> */}
              </H5>
            </Row>
            <Row marginBottom="20px">
              <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton onClick={handleStep(index)} completed={completed[index]}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Row>
            <Row center>
              <Button color={Colors.blue} textColor={Colors.white}>APPLY NOW</Button>
            </Row>
          </Card>
        </Column>
        <Column size="4">
          <Card shadow width="100%" height="400px" padding="1.5rem">
          </Card>
        </Column>
      </Row>
      <Row><h1 >Pricing and Financing</h1></Row>
      <Row><h5 >Prices can vary depending on the location.</h5></Row>
      <Row><h5 >Currently revewing prices for: Miami</h5></Row>
    </>
  )
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
}));

function getSteps () {
  return ['6 mo', '12 mo', '24 mo', '36 mo', '42 mo', '60 mo'];
}

