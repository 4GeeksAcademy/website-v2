import React, {useState} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import {Row, Column} from '../Sections';
import {Card} from '../Card';
import {H2, H3, H4, H5, Paragraph} from '../Heading';
import {Button, Colors} from '../Styling';
import '../../assets/css/style.scss';
import Switch from "react-switch";



export default () => {
  const [checked, setChecked] = useState(false)
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
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
      <Row>
        <Column size="6" customRespSize respSize="12">
          <Card shadow width="100%" height="400px" >
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <Row align="center" height="100%" ><H5 fontSize="22px" align="center">PAY UPFRONT</H5></Row>
                    <Row align="center" height="100%" ><H5 fontSize="22px" align="center">OR MONTHLY</H5></Row>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="50px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <Paragraph align="center" fontSize="14px" color={Colors.gray}>and enjoy the best pricing in town.</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="50px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <H3 align="center" >{getStepContents(activeStep)}</H3>                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" align="center">
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton onClick={handleStep(index)} completed={completed[index]}>
                          {label}
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
                    <Button color={Colors.blue} textColor={Colors.white}>APPLY NOW</Button>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Card>
        </Column>

        <Column size="6" customRespSize respSize="12">
          <Card shadow width="100%" height="400px" >
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <Row align="center" height="100%" ><H5 fontSize="22px" align="center">PAY ONLY AFTER</H5></Row>
                    <Row align="center" height="100%" ><H5 fontSize="22px" align="center">YOU GET A JOB</H5></Row>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="50px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <Paragraph align="center" fontSize="14px" color={Colors.gray}>and talk about the income share agreement.</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="50px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" >
                    <H3 align="center" >{!checked ? "$7000" : "$134.99"}</H3>                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="100px" alignItems="center">
              <Column size="4" align="center"><Paragraph color={!checked ? Colors.blue : Colors.gray}>FULL TUITION</Paragraph></Column>
              <Column size="4" align="center">
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  onColor="#86d3ff"
                  onHandleColor={Colors.blue}
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  // activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id="material-switch"
                />
              </Column>
              <Column size="4" align="center"><Paragraph color={!checked ? Colors.gray : Colors.blue}>FINANCING</Paragraph></Column>
            </Row>
            <Row height="100px" >
              <Column size="12" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="100%" >
                  <Column size="12" alignSelf="center" align="center">
                    <Button color={Colors.blue} textColor={Colors.white}>APPLY NOW</Button>
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

