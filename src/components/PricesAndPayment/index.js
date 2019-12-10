import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    // <header>
    //     <h1>{data.alumni.edges[1].node.name}</h1>
    // </header>
    <div className="container">
      <div className="row justify-content-center mb-3"><h1 >Pricing and Financing</h1></div>
      <div className="row justify-content-center"><h5 >Prices can vary depending on the location.</h5></div>
      <div className="row justify-content-center mb-5"><h5 >Currently revewing prices for: Miami</h5></div>
      <div className="{classes.root}">
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={handleStep(index)} completed={completed[index]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
            </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
              <div className="container mt-3">

                <div className="row col-img">
                  <div className="col-md-4 bg-light rounded">
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  </div>
                  <div className="col-md-4 ">
                    <Typography className={classes.instructions}>{getStepLogo(activeStep)}</Typography>
                  </div>
                  <div className="col-md-4 bg-light rounded">

                    <Typography className={classes.instructions}>{getStepContents(activeStep)}</Typography>

                  </div>
                </div>
                <div>
                  {/* <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
              </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
              </Button> */}
                  {/* {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" className={classes.completed}>
                        Step {activeStep + 1} already completed
                  </Typography>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                      ))} */}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
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
  return ['6 months', '12 months', '24 months', '36 months', '42 months', '60 months'];
}

