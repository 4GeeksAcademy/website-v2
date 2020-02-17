import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Column} from '../Sections';
import {Paragraph} from '../Heading';
import {Colors, Select} from '../Styling';
// import Select from 'react-select';
import {SessionContext} from '../../session'
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {Card} from '../Card'

const useStyles = makeStyles(theme => ({
  selector: {
    background: 'white',
    width: '100%',
    borderRadius: '.25rem',
    border: 'none',
  },
  text: {

    color: 'black'
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
                latitude
                longitude
                country
                defaultLanguage
                hasFinancialsOption
                courses
              prices{
                full_time{
                  slug
                  upfront
                  message
                  duration
                  financed{
                    provider
                    message{
                      en
                      es
                    }
                    payment
                    months
                    paymentInfo{
                      en
                      es
                    }
                    logo
                    
                  }
                }
                part_time{
                  slug
                  upfront
                  message
                  duration
                  financed{
                    provider
                    message{
                      en
                      es
                    }
                    payment
                    months
                    paymentInfo{
                      en
                      es
                    }
                    logo
                    
                  }
                }
              }
                  
                
              }
            }
          }
        }
      `)
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const {session, setSession} = useContext(SessionContext);
  const [location, setLocation] = useState();
  const [weeks, setWeeks] = useState(false);
  const handleChange = event => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const currentCityInfo = data.loc.edges.filter((item) => item.node.city === session.location)
  console.log("$$$", currentCityInfo)
  return (
    <Row align="center" >
      <Column size="8" alignSelf="center">
        <Row align="around">
          <Column size="2" alignSelf="center" margin="5px 0"><Paragraph color={Colors.white} >It takes just </Paragraph></Column>
          <Column size="1" alignSelf="center" >
            <Select width="40px">
              <option value="16">16</option>
              <option value="9">9</option>
            </Select>
          </Column>
          <Column size="2" alignSelf="center" margin="5px 0"><Paragraph fontSize="12px" color={Colors.white} >weeks in</Paragraph></Column>
          <Column size="4" alignSelf="center">
            <Select width="200px">
              <option value={session.location}>{session.location}</option>
              <option value="Madrid">Madrid</option>
              <option value="Caracas">Caracas</option>
              <option value="Maracibo">Maracaibo</option>
              <option value="Santiago">Santiago de Chile</option>
            </Select>
          </Column>
          <Column size="2" alignSelf="center" margin="5px 0"><Paragraph color={Colors.white} >to become a</Paragraph></Column>
        </Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
      </Column>
    </Row >

  )
};

export default ProgramSelector;