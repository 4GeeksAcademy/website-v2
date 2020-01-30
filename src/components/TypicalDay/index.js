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
import {H2, H3, H4, H5, Paragraph, Title, Divider} from '../Heading';
import {Button, Colors, Circle, RoundImage, Utensils, Coffee, Dumbbell, LaptopCode, FileCode} from '../Styling';
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
    query myQueryTypical{
        typical: allTypicalDayYaml {
            edges {
              node {
                miami {
                  time
                  slug
                  info
                }
              }
            }
          }
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
    console.log("tempQ", data.typical.edges[0].node.miami)
    function getStepContent (step) {
        switch (step) {
            case 0:
                return `${data.typical.edges[0].node.miami[0].info}`
            case 1:
                return `${data.typical.edges[0].node.miami[1].info}`
            case 2:
                return `${data.typical.edges[0].node.miami[2].info}`
            case 3:
                return `${data.typical.edges[0].node.miami[3].info}`
            case 4:
                return `${data.typical.edges[0].node.miami[4].info}`
            case 5:
                return `${data.typical.edges[0].node.miami[5].info}`
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


            <Row align="center">
                <Title
                    size="10"
                    title="TYPICAL DAY AT THE ACADEMY"
                    paragraph="Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio"
                    primary
                />
                {/* <Divider height="50px" /> */}
                <Column size="8" customRespSize respSize="12">
                    <Row height="120px" align="center">
                        <Column size="9" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                            <Row height="100%" align="center">
                                <Stepper nonLinear activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                                    {steps.map((label, index) => (
                                        <Step key={label}>
                                            <StepButton icon={<Circle width="14" stroke={Colors.yellow} fill={Colors.yellow} />} onMouseOver={handleStep(index)} completed={completed[index]}>
                                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label.icon}{label.time}</StepLabel>
                                            </StepButton>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Row>
                            <Row align="center" height="120px">
                                <Typography className={classes.test}>{getStepContent(activeStep)}</Typography>
                            </Row>
                        </Column>
                    </Row>
                </Column>
            </Row>
            <Row align="center">
                <Title
                    size="10"
                    title="TYPICAL DAY AT THE ACADEMY"
                    paragraph="Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio"
                    primary
                />
                {/* <Divider height="50px" /> */}
                <Column size="8" customRespSize respSize="12">
                    <Row height="120px" align="center">
                        <Column size="9" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                            <Row height="100%" align="center">
                                <Stepper alternativeLabel connector={<ColorlibConnector />}>
                                    {steps.map(label => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label.icon}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Row>
                            <Row align="center" height="120px">
                                <Typography className={classes.test}>{getStepContent(activeStep)}</Typography>
                            </Row>

                        </Column>
                    </Row>
                    <Row height="120px" align="center">
                        <Column size="9" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                            <Row height="100%" align="center">
                                {activeStep === steps.length ? (
                                    <div>
                                        <Typography className={classes.instructions}>
                                            All steps completed - you&apos;re finished
            </Typography>
                                        <Button onClick={handleReset} className={classes.button}>
                                            Reset
            </Button>
                                    </div>
                                ) : (
                                        <div>
                                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                            <div>
                                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                                    Back
              </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                            </Row>
                            <Row align="center" height="120px">
                                <Typography className={classes.test}>{getStepContent(activeStep)}</Typography>
                            </Row>

                        </Column>
                    </Row>
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
        // 1: <SettingsIcon />,
        // 2: <GroupAddIcon />,
        // 3: <VideoLabelIcon />,
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
    test: {
        color: Colors.white
    },
    circle: {
        width: 4,
        height: 4,
        borderRadius: '50%',
        backgroundColor: Colors.blue,
    },
}));

function getSteps () {
    return [
        {icon: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />, time: '8:00AM'},
        {icon: <Coffee width="32" color={Colors.yellow} fill={Colors.yellow} />, time: '8:45AM'},
        {icon: <FileCode width="32" color={Colors.yellow} fill={Colors.yellow} />, time: '09:00AM'},
        {icon: <LaptopCode width="32" color={Colors.yellow} fill={Colors.yellow} />, time: '10:00AM'},
        {icon: <Utensils width="32" color={Colors.yellow} fill={Colors.yellow} />, time: '01:00PM'},
        {icon: <Dumbbell width="32" color={Colors.yellow} fill={Colors.yellow} />, time: '02:00PM'},
    ];
}

