import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Row, Column} from '../Sections'
import {H2, H4, Paragraph} from '../Heading'
import {Colors} from '../Styling'
// import styled from 'styled-components';

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
    // const data = useStaticQuery(graphql`
    //   query myQueryTestC{
    //       credentials: allCredentialsDataYaml {
    //           edges {
    //             node {
    //               credential
    //             }
    //           }
    //       }
    //       alumni:   allAlumniYaml{
    //         edges{
    //           node{
    //             name
    //             image
    //             content
    //             title
    //           }
    //         }
    //       }


    //     cred: allFinancialsYaml{
    //       edges{
    //           node{
    //               name
    //               options{
    //                   months
    //                   payment
    //               }
    //               logo
    //               description
    //           }
    //       }
    //   }}
    //   `)
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
        // <div className="container">
        <>
            <Row>
                <Column size="6">
                    <Row><H4>PAY UPFRONT OR MONTHLY</H4></Row>
                    <Row><Paragraph primary>and enjoy the best pricing in town.</Paragraph></Row>
                    <Row></Row>
                    <Row></Row>
                    <Row><Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography className={classes.instructions}>All steps completed</Typography>
                                    <Button onClick={handleReset}>Reset</Button>
                                </div>
                            ) : (
                                    <div>
                                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.backButton}
                                            >
                                                Back
              </Button>
                                            <Button variant="contained" color={Colors.blue} onClick={handleNext}>
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                        </div>

                    </Row>
                    <Row></Row>
                </Column>
            </Row>

        </>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


function getSteps () {
    return ['6 mo', '12 mo', '24 mo', '36 mo', '42 mo', '60 mo'];
}

