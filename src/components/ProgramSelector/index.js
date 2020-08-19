import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import { redirectTo } from "@reach/router"
import {Row, Column} from '../Sections';
import {Paragraph, Span} from '../Heading';
import {Colors, Select, Option, Button, TriangleDown} from '../Styling';
import Link from 'gatsby-link'
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

const ProgramSelector = (props) => {
  const {session, setSession} = useContext(SessionContext);
  const [toggles, setToggles] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [weeks, setWeeks] = useState("16");
  const classes = useStyles();

  let locArray = props.locations;
  console.log("Locations", locArray)
  // let locArray = data.loc.edges;
  let weekArray = ["16", "9"]
  let link = "";
  {props.week === 16 ? link = "full-time" : link = "part-time"}
  return (
    <Row align="around">
      <Column size="2" alignSelf="center" paddingRight="0" align="right" margin="5px 0"><Paragraph fontSize="20px" fs_md="14px" color={Colors.white} >It takes just </Paragraph></Column>
      <Column size="1" alignSelf="center" paddingLeft="0" paddingRight="0" align="center" customRespSize respSize="4" >
          {toggles === false &&
            <Button borderRadius=".25rem" onClick={() => setToggles(!toggles)} color={Colors.white} textColor={Colors.gray}>
                {props.week}
                <TriangleDown style={{ marginLeft: "5px"}} width="12" color={Colors.blue} fill={Colors.blue} />
            </Button>
          }
          {toggles == true && weekArray.map((item, index) => {
                return (
                  <Button 
                    width="95%" 
                    color={item === weeks ? Colors.lightGray : Colors.white} 
                    textColor={Colors.gray} 
                    borderRadius=".25rem" 
                    padding="5px"
                    onClick={() => {
                      setWeeks(item);
                      setToggles(!toggles);
                      redirectTo(`/${session.language}/course/${link}`);
                    }}
                  >
                    {item}
                  </Button>
                )
              })}
      </Column>
      <Column size="1" alignSelf="center" paddingLeft="0" paddingRight="0" align="center" margin="5px 0"><Paragraph fontSize="20px" fs_md="14px" color={Colors.white} >weeks in</Paragraph></Column>
      <Column size="2" alignSelf="center" align="center" paddingLeft="0" paddingRight="0" customRespSize respSize="5">
          {toggle == false && 
            <Button borderRadius=".25rem" onClick={() => setToggle(!toggle)} color={Colors.white} textColor={Colors.gray}>
                {session.location && session.location.city}
                <TriangleDown style={{ marginLeft: "5px"}} width="12" color={Colors.blue} fill={Colors.blue} />
            </Button>
          }
          {toggle == true && locArray.map((item, index) => {
                return (
                  <Button 
                    onClick={() => {
                      setSession({ ...session, location: { ...item.node }})
                      setToggle(!toggle)
                    }} 
                    colorHover={Colors.lightBlue}
                    textColor={Colors.gray} 
                    color={item.node.city === session.location.city}
                    borderRadius=".25rem" 
                    padding="5px"
                  >
                    {item.node.city}
                  </Button>
                )
              })}
      </Column>
      <Column size="2" alignSelf="center" align="left" paddingLeft="0" paddingRight="0" margin="5px 0"><Paragraph fontSize="20px" fs_md="14px" color={Colors.white} >to become a</Paragraph></Column>
    </Row>
  )
};

export default ProgramSelector;