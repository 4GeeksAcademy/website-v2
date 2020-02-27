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
import BaseRender from './_baseRender'
import {apply} from "../actions";
import {addContact} from '../../api/_utils';
import {BrowserView, MObileView, isBrowser, isMobile} from "react-device-detect";

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
const Apply = (props) => {
    const {data, pageContext, yml} = props;
    const classes = useStyles();
    const [alignment, setAlignment] = useState('left');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const [formData, setVal] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });

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
        <>
            <Divider height="100px" />
            <Wrapper
                style="default">
                <Title
                    title={yml.tagline}
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

                        <Card shadow borders="1.25rem" height="500px" p_xs="0 10px" p_sm="0 15px" p_md="0 20px">
                            <Row
                                height="100%"
                                marginLeft="0"
                                marginRight="0"
                                align="center"

                            >
                                <Column size="8" alignSelf="center" height="100%" image="no" border="bottom">
                                    <Row align="center" height="100%">
                                        <Column size="10" height="100%">
                                            <Divider height="50px" />
                                            <Row height="50px">
                                                <H3>TELL US ABOUT YOU</H3>
                                            </Row>
                                            <Row height="50px">
                                                <Input
                                                    type="text" className="form-control" placeholder="First name *"
                                                    onChange={(e) => setVal({...formData, first_name: e.target.value})}
                                                    value={formData.firstName}
                                                />
                                            </Row>
                                            <Row height="50px">
                                                <Input type="text" className="form-control" placeholder="Last Name *"
                                                    onChange={(e) => setVal({...formData, last_name: e.target.value})}
                                                    value={formData.lastName}
                                                />
                                            </Row>
                                            <Row height="50px">
                                                <Input type="email" className="form-control" placeholder="Email *"
                                                    onChange={(e) => setVal({...formData, email: e.target.value})}
                                                    value={formData.email}
                                                />
                                            </Row>
                                            <Row height="50px">
                                                <Input
                                                    type="number" className="form-control" placeholder="Phone *"
                                                    onChange={(e) => setVal({...formData, phone: e.target.value})}
                                                    value={formData.phone}
                                                />
                                            </Row>
                                            <Row height="30px">
                                                <Paragraph padding="0.375rem 0.75rem" fontSize="13px" lineHeight="16px" color={Colors.black}>Select a location</Paragraph>
                                            </Row>
                                            <Row height="70px">
                                                <Column size="12">
                                                    <Grid container spacing={2} direction="column" alignItems="center">
                                                        <Grid item>
                                                            <ToggleButtonGroup size="large" value={alignment} exclusive onChange={handleChange}>
                                                                {children}
                                                            </ToggleButtonGroup>
                                                        </Grid>
                                                    </Grid>
                                                </Column>
                                            </Row>
                                            <Row height="40px">
                                                <Input type="text" className="form-control" placeholder="Referral key" />
                                            </Row>
                                            <Row height="20px">
                                                <Paragraph padding="0.375rem 0.75rem" fontSize="10px" lineHeight="16px" color={Colors.black}>If you were referred by any current or past student, use your referral code for extra credit or discount.</Paragraph>
                                            </Row>
                                            <Row >
                                                <Button

                                                    width="150px"
                                                    move="up" up="15px" color={Colors.blue} textColor={Colors.white}
                                                    margin="2rem 0" padding=".45rem 3rem"
                                                    onClick={() => apply(formData)
                                                        .then(() => {
                                                            console.log("Thank you");
                                                        })
                                                        .catch(() => {
                                                            console.log("error");
                                                        })
                                                    }
                                                >APPLY</Button>
                                            </Row>
                                        </Column>
                                    </Row>

                                </Column>

                                <Column size="4" customRespSize respSize="12" br_xs="1.25rem" br_sm="1.25rem" br_md="1.25rem" h_xs="auto" h_sm="auto" h_md="auto" m_xs="35px 0" m_sm="35px 0" m_md="35px 0" alignSelf="center" height="100%" image="no" color={Colors.black} border="custom" customBorderRadius="0 1.25rem 1.25rem 0" >
                                    <Row align="center" height="100%">
                                        <Column size="10" height="100%">
                                            <Divider height="50px" />
                                            <Row height="60px">
                                                <H3
                                                    fs_xs="20px"
                                                    fs_sm="24px"
                                                    fs_md="24px"
                                                    fs_lg="20px"
                                                    fs_xl="28px"
                                                    color={Colors.yellow}
                                                >
                                                    ONCE YOU CLICK ON APPLY YOU WILL:
                                                </H3>
                                            </Row>
                                            <Divider height="30px" />
                                            <Row height="50px">
                                                <Paragraph
                                                    fs_xs="10px"
                                                    fs_sm="14px"
                                                    fs_md="14px"
                                                    fs_lg="14px"
                                                    fs_xl="14px"
                                                    lineHeight="16px"
                                                    color={Colors.lightGray}
                                                >1- Receive an email from your City Advisor
                                                </Paragraph>
                                            </Row>


                                        </Column>
                                    </Row>
                                </Column>

                            </Row>
                        </Card>
                    </Column>
                </Row>

            </Wrapper>
            <Divider height="600px" />
        </>
    )
};
export const query = graphql`
  query ApplyQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            meta_info{
                title
                description
                image
                keywords
            }
        }
      }
    }
  }
`;
export default BaseRender(Apply);