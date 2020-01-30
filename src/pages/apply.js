import React, {useState} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H3, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Card} from '../components/Card'
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {makeStyles} from '@material-ui/core/styles';

const Input = styled.input`
    background-color:${Colors.lightGray};
    height: 40px;
    width: 100%;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-color: ${Colors.black};
`
const useStyles = makeStyles({
    root: {
        background: Colors.white,
        fontSize: '10px',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 10px',
        '&$selected': {
            background: Colors.yellow,
            color: Colors.white
        },

    },

    label: {
        textTransform: 'lowercase',
    },
});
const Apply = () => {
    const classes = useStyles();
    const [alignment, setAlignment] = useState('left');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const children = [
        <ToggleButton key={1} value="left" classes={{
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
        }}>
            <Paragraph color={Colors.gray}>Santiago, Chile</Paragraph>
        </ToggleButton>,
        <ToggleButton key={2} value="center" classes={{
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
        }}>
            <Paragraph color={Colors.gray}>Caracas, Vzla</Paragraph>
        </ToggleButton>,
        <ToggleButton key={3} value="right" classes={{
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
        }}>
            <Paragraph color={Colors.gray}>Miami, Usa</Paragraph>
        </ToggleButton>,
        <ToggleButton key={4} value="justify" classes={{
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
        }}>
            <Paragraph color={Colors.gray}>Maracaibo, Vzla</Paragraph>
        </ToggleButton>,
        <ToggleButton key={5} value="justif" classes={{
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
        }}>
            <Paragraph color={Colors.gray}>Madrid, Spain</Paragraph>
        </ToggleButton>,
    ];
    return (
        <Layout>
            <Divider height="100px" />
            <Wrapper
                style="default">
                <Title
                    title="APPLY TO 4GEEKS"
                    paragraph="Cras mattis consectetur purus sit amet fermentum. Nulla vitae elit libero, a pharetra augue. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
                    primary
                    size="8"
                />
                <Divider height="100px" />
                <Row>
                    <Column
                        size="12"
                        border="bottom"
                        image="no"
                        color={Colors.white}
                    >
                        <Card shadow borders="1.25rem" height="500px">
                            <Row
                                height="100%"
                                marginLeft="0"
                                marginRight="0"
                                customRespSize

                            >
                                <Column size="8" alignSelf="center" height="100%" image="no" border="bottom">
                                    <Row align="center" height="100%">
                                        <Column size="11" height="100%">
                                            <Divider height="50px" />
                                            <Row height="50px">
                                                <H3>TELL US ABOUT YOU</H3>
                                            </Row>
                                            <Row height="50px">
                                                <Input type="text" className="form-control" placeholder="First name *" />
                                            </Row>
                                            <Row height="50px">
                                                <Input type="text" className="form-control" placeholder="Last Name *" />
                                            </Row>
                                            <Row height="50px">
                                                <Input type="email" className="form-control" placeholder="Email *" />
                                            </Row>
                                            <Row height="50px">
                                                <Input type="text" className="form-control" placeholder="Phone *" />
                                            </Row>
                                            <Row height="30px">
                                                <Paragraph padding="0.375rem 0.75rem" fontSize="13px" lineHeight="16px" color={Colors.black}>Select a location</Paragraph>
                                            </Row>
                                            <Row height="70px">
                                                <Grid container spacing={2} direction="column" alignItems="center">
                                                    <Grid item>
                                                        <ToggleButtonGroup size="large" value={alignment} exclusive onChange={handleChange}>
                                                            {children}
                                                        </ToggleButtonGroup>
                                                    </Grid>
                                                </Grid>
                                            </Row>
                                            <Row height="40px">
                                                <Input type="text" className="form-control" placeholder="Referral key" />
                                            </Row>
                                            <Row height="20px">
                                                <Paragraph padding="0.375rem 0.75rem" fontSize="10px" lineHeight="16px" color={Colors.black}>If you were referred by any current or past student, use your referral code for extra credit or discount.</Paragraph>
                                            </Row>
                                            <Row >
                                                <Button move="up" up="15px" color={Colors.blue} textColor={Colors.white} margin="2rem 0" padding=".45rem 3rem">APPLY</Button>
                                            </Row>
                                        </Column>
                                    </Row>

                                </Column>
                                <Column size="4" alignSelf="center" height="100%" image="no" color={Colors.black} border="custom" customBorderRadius="0 1.25rem 1.25rem 0" >
                                    <Row align="center" height="100%">
                                        <Column size="10" height="100%">
                                            <Divider height="50px" />
                                            <Row height="60px">
                                                <H3 color={Colors.yellow}>ONCE YOU CLICK ON</H3>
                                                <H3 color={Colors.yellow}>APPLY, YOU WILL</H3>
                                            </Row>
                                            <Divider height="30px" />
                                            <Row height="50px">
                                                <Paragraph fontSize="13px" lineHeight="16px" color={Colors.lightGray}>1- Receive an email from your City Advisor</Paragraph>
                                            </Row>
                                            <Row height="50px">
                                                <Paragraph fontSize="13px" lineHeight="16px" color={Colors.lightGray}>2- Receive info related to the options you have to finance your tuition.</Paragraph>
                                            </Row>
                                            <Row height="50px">
                                                <Paragraph fontSize="13px" lineHeight="16px" color={Colors.lightGray}>3- An explanation on how the process works to get the best deal in the City, respectively. </Paragraph>
                                            </Row>
                                            <Row height="50px">
                                                <Paragraph fontSize="13px" lineHeight="16px" color={Colors.lightGray}>4- A syllabus of your program and regular coaching assistance from our advisors to help you take the best decision for your career. </Paragraph>
                                            </Row>
                                            <Row height="50px">

                                            </Row>

                                        </Column>
                                    </Row>
                                </Column>
                            </Row>
                        </Card>
                    </Column>
                </Row>
            </Wrapper>
            <Divider height="100px" />
        </Layout>
    )
};

export default Apply;