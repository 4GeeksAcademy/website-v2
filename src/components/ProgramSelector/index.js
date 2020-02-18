import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Column} from '../Sections';
import {Paragraph} from '../Heading';
import {Colors, Select, Option, Button} from '../Styling';
// import Select from 'react-select';
import {SessionContext} from '../../session'
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';
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
  const {session, setSession} = useContext(SessionContext);
  const [toggles, setToggles] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [loc, setLoc] = useState(false);
  const classes = useStyles();
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
  const currentCityInfo = data.loc.edges.filter((item) => item.node.city === session.location)
  console.log("$$$", data.loc.edges)
  return (
    <Row align="center" >
      <Column size="12" alignSelf="center">
        <Row align="around">
          <Column size="2" alignSelf="center" align="center" margin="5px 0"><Paragraph color={Colors.white} >It takes just </Paragraph></Column>
          <Column size="1" alignSelf="center" align="center" customRespSize respSize="2" >
            <Card index="1" borders=".25rem" shadow width="100%" padding={toggles === false ? "0px" : "0 0 10px 0"}>
              <Row marginRight="0" marginLeft="0" align="center"><Button borderRadius=".25rem" onClick={() => setToggles(!toggles)} color={Colors.white} textColor={Colors.gray}>16</Button></Row>
              {toggles == true
                ?
                <>
                  <Row marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" align="center">
                    <Column size="12"><Paragraph fontSize="14px" color={Colors.gray} >9</Paragraph></Column>
                  </Row>
                </>
                :
                null
              }
            </Card>
          </Column>
          <Column size="2" alignSelf="center" align="center" margin="5px 0"><Paragraph fontSize="12px" color={Colors.white} >weeks in</Paragraph></Column>
          <Column size="3" alignSelf="center" align="center" customRespSize respSize="4">
            <Card index="1" borders=".25rem" shadow width="100%" >
              {toggle == true ? null : <Row align="center"><Button borderRadius=".25rem" onClick={() => setToggle(!toggle)} color={Colors.white} textColor={Colors.gray}>{session.location}</Button></Row>}
              {toggle == true
                ?
                <>
                  {data.loc.edges.map((item, index) => {
                    return (
                      <Row height="15px" onClick={() => setSession({location: item.node.city}, setToggle(!toggle))} backgroundHover={Colors.blue} key={index} marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" align="center">
                        <Column size="12"><Paragraph fontSize="14px" color={Colors.gray} >{item.node.city}</Paragraph></Column>
                      </Row>
                    )
                  })}
                </>
                :
                null
              }
            </Card>
          </Column>
          <Column size="2" alignSelf="center" align="center" margin="5px 0"><Paragraph color={Colors.white} >to become a</Paragraph></Column>
        </Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
      </Column>
    </Row >

  )
};

export default ProgramSelector;