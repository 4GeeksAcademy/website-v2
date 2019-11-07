import React from 'react';
import styled from 'styled-components';
import {StaticQuery, graphql} from 'gatsby';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/style.css';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '90%',
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   completed: {
//     display: 'inline-block',
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

// function getSteps () {
//   return ['6 months', '12 months', '24 months', '36 months', '42 months', '60 months'];
// }

// function getStepContent (step) {
//   switch (step) {
//     case 0:
//       return 'Thanks to our partnership with Quotanda we have managed to create the most flexible placement plan in town ';
//     case 1:
//       return 'Thanks to our partnership with Quotanda we have managed to create the most flexible placement plan in town';
//     case 2:
//       return 'Thanks to our partnership with Quotanda we have managed to create the most flexible placement plan in town';
//     case 3:
//       return 'Thanks to our partnership with Skills Fund we have managed to create a new special payment plant starting at $135/mo';
//     case 4:
//       return 'Thanks to our partnership with Climb we have managed to create a new special payment plant starting at $135/mo';
//     case 5:
//       return 'We have partened with Skills Fund and Climb in order to offer you the best payment options in Town';
//     default:
//       return 'Unknown step';
//   }
// }
// function getStepContents (step) {
//   switch (step) {
//     case 0:
//       return '$1,000 deposit + $1,023.29 / month';
//     case 1:
//       return '$1,000 deposit + $533 / month';
//     case 2:
//       return '$1,000 deposit + $288.03 / month';
//     case 3:
//       return 'NO deposit + $231.44 / month';
//     case 4:
//       return 'NO deposit + $204.63 / month';
//     case 5:
//       return 'NO deposit + $152.55 / month';
//     default:
//       return 'Unknown step';
//   }
// }
// function getStepLogo (step) {
//   switch (step) {
//     case 0:
//       return <img src='https://accessventure.imgix.net/wp-content/uploads/2018/09/Quotanda-HD-Logo-1280x400.png' width="256" />;
//     case 1:
//       return <img src='https://accessventure.imgix.net/wp-content/uploads/2018/09/Quotanda-HD-Logo-1280x400.png' width="256" />;
//     case 2:
//       return <img src='https://accessventure.imgix.net/wp-content/uploads/2018/09/Quotanda-HD-Logo-1280x400.png' width="256" />;
//     case 3:
//       return <img src='https://s3-us-west-2.amazonaws.com/supermoney-reviews/businesses/5/skills-fund_toe.png' width="256" />;
//     case 4:
//       return <img src='https://www.4geeksacademy.co/wp-content/themes/the-fastest/assets/img/skillfund-climb.png' width="256" />;
//     case 5:
//       return <img src='https://growthx.com/wp-content/uploads/2017/02/Climb_Blog2.jpg' width="256" />;
//     default:
//       return 'Unknown step';
//   }
// }

// export default function TestCom () {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [completed, setCompleted] = React.useState({});
//   const steps = getSteps();

//   const totalSteps = () => {
//     return steps.length;
//   };

//   const completedSteps = () => {
//     return Object.keys(completed).length;
//   };

//   const isLastStep = () => {
//     return activeStep === totalSteps() - 1;
//   };

//   const allStepsCompleted = () => {
//     return completedSteps() === totalSteps();
//   };

//   const handleNext = () => {
//     const newActiveStep =
//       isLastStep() && !allStepsCompleted()
//         ? // It's the last step, but not all steps have been completed,
//         // find the first step that has been completed
//         steps.findIndex((step, i) => !(i in completed))
//         : activeStep + 1;
//     setActiveStep(newActiveStep);
//   };

//   const handleBack = () => {
//     setActiveStep(prevActiveStep => prevActiveStep - 1);
//   };

//   const handleStep = step => () => {
//     setActiveStep(step);
//   };

//   const handleComplete = () => {
//     const newCompleted = completed;
//     newCompleted[activeStep] = true;
//     setCompleted(newCompleted);
//     handleNext();
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setCompleted({});
//   };

//   return (
//     <div className="container">
//       <div className={classes.root}>
//         <Stepper nonLinear activeStep={activeStep}>
//           {steps.map((label, index) => (
//             <Step key={label}>
//               <StepButton onClick={handleStep(index)} completed={completed[index]}>
//                 {label}
//               </StepButton>
//             </Step>
//           ))}
//         </Stepper>
//         <div>
//           {allStepsCompleted() ? (
//             <div>
//               <Typography className={classes.instructions}>
//                 All steps completed - you&apos;re finished
//             </Typography>
//               <Button onClick={handleReset}>Reset</Button>
//             </div>
//           ) : (
//               <div className="container">
//                 <div className="row">
//                   <div className="col-md-4">
//                     <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
//                   </div>
//                   <div className="col-md-4">
//                     <Typography className={classes.instructions}>{getStepLogo(activeStep)}</Typography>
//                   </div>
//                   <div className="col-md-4">

//                     <Typography className={classes.instructions}>{getStepContents(activeStep)}</Typography>

//                   </div>
//                 </div>
//                 <div>
//                   {/* <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
//                     Back
//               </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleNext}
//                     className={classes.button}
//                   >
//                     Next
//               </Button> */}
//                   {/* {activeStep !== steps.length &&
//                     (completed[activeStep] ? (
//                       <Typography variant="caption" className={classes.completed}>
//                         Step {activeStep + 1} already completed
//                   </Typography>
//                     ) : (
//                         <Button variant="contained" color="primary" onClick={handleComplete}>
//                           {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
//                         </Button>
//                       ))} */}
//                 </div>
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// }


export default () => (
    <StaticQuery
        query={
            graphql`
            query myQueryTest{
                credentials: allCredentialsDataYaml {
                    edges {
                      node {
                        rating
                        hired_students
                        alumni_number
                        campuses
                        images{
                          googleImage
                          switchImage
                          reportImage
                        }
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
              }
            `
        }
        render={data => (
            <div>{data.alumni.edges[1].node.name}</div>
        )}
    />

)
// const Test = () => (
//     <div>Test</div>
// );

// export default Test;