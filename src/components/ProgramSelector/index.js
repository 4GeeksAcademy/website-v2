import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Column} from '../Sections';
import {Paragraph} from '../Heading';
import {Colors} from '../Styling';
// import Select from 'react-select';
import {SessionContext} from '../../session'
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));
const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
];
export const colourOptions = [
    {value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true},
    {value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true},
    {value: 'purple', label: 'Purple', color: '#5243AA'},
    {value: 'red', label: 'Red', color: '#FF5630', isFixed: true},
    {value: 'orange', label: 'Orange', color: '#FF8B00'},
    {value: 'yellow', label: 'Yellow', color: '#FFC400'},
    {value: 'green', label: 'Green', color: '#36B37E'},
    {value: 'forest', label: 'Forest', color: '#00875A'},
    {value: 'slate', label: 'Slate', color: '#253858'},
    {value: 'silver', label: 'Silver', color: '#666666'},
];

const ProgramSelector = () => {

    const data = useStaticQuery(graphql`
      query myQueryProgram{
          loc: allLocationsYaml{
            edges{
              node{
                city
                slug
                name
                latitude
                longitude
                country
              }
            }
          }
        }
      `)
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);
    // const {session, setSession} = useContext(SessionContext);
    const [location, setLocation] = useState();
    const [weeks, setWeeks] = useState('16');
    const handleChange = event => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    // console.log("%%%%%", data.loc.edges)
    return (
        <Row align="" center>
            <Column size="8" alignSelf="center">
                <Row>
                    <Column size="2" align="center"><Paragraph color={Colors.white} >It takes just </Paragraph></Column>
                    <Column size="2" align="center">
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {/* <Paragraph fontSize="26px" color={Colors.white} >{weeks}</Paragraph> */}
                    </Column>
                    <Column size="2" align="center"><Paragraph color={Colors.white} >weeks in</Paragraph></Column>
                    <Column size="3" align="center">
                        {/* <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={session.city}
                            name="color"
                            options={data.loc.edges}
                        /> */}
                    </Column>
                    <Column size="2" align="center"><Paragraph color={Colors.white} >to become a</Paragraph></Column>
                </Row>
                <Row></Row>
                <Row></Row>
                <Row></Row>
            </Column>

        </Row>

    )
};

export default ProgramSelector;