import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Column} from '../Sections';
import {Paragraph} from '../Heading';
import {Colors, Select, Option, Button} from '../Styling';
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
  const classes = useStyles();
  const data = useStaticQuery(graphql`
      query myQueryProgram{
          loc: allLocationYaml {
            edges {
              node {
                id
                city
                
              }
            }
          }
        }
      `)
  // const currentCityInfo = data.loc.edges.filter((item) => item.node.city === session.location)
  let locArray = data.loc.edges;
  let weekArray = ["16", "9"]
  console.log("loc", locArray)
  let link = "";
  {props.week === 16 ? link = "full-time" : link = "part-time"}
  return (
    <Row align="center" >
      <Column size="12" alignSelf="center">
        <Row align="around">
          <Column size="2" alignSelf="center" align="center" margin="5px 0"><Paragraph fontSize="16px" color={Colors.white} >It takes just </Paragraph></Column>
          <Column size="2" alignSelf="center" align="center" customRespSize respSize="4" >
            <Card index="1" borders=".25rem" shadow width="100%" padding={toggles === false && "0px"}>
              {toggles == true ? null : <Row marginRight="0" marginLeft="0" align="center"><Button borderRadius=".25rem" onClick={() => setToggles(!toggles)} color={Colors.white} textColor={Colors.gray}>{props.week}</Button></Row>}
              {toggles == true
                ?
                <>
                  {weekArray.map((item, index) => {
                    return (
                      <Row key={index} height="25px" marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" backgroundHover={Colors.lightBlue} colorHover={Colors.white} align="around">
                        <Link to={link}><Column border="custom" customBorderRadius=".25rem" size="12" alignSelf="center"><Paragraph fontSize="16px" color={Colors.gray} >{item}</Paragraph></Column></Link>
                      </Row>
                    )
                  })}
                </>
                :
                null
              }
            </Card>
          </Column>
          <Column size="2" alignSelf="center" align="center" margin="5px 0"><Paragraph fontSize="16px" color={Colors.white} >weeks in</Paragraph></Column>
          <Column size="3" alignSelf="center" align="center" customRespSize respSize="4">
            <Card index="1" borders=".25rem" shadow width="100%" padding={toggle === false && "0px"}>
              {toggle == true ? null : <Row align="center"><Button borderRadius=".25rem" onClick={() => setToggle(!toggle)} color={Colors.white} textColor={Colors.gray}>{session.location}</Button></Row>}
              {toggle == true
                ?
                <>
                  {locArray.map((item, index) => {
                    return (
                      <Row height="25px" onClick={() => setSession({location: item.node.city}, setToggle(!toggle))} backgroundHover={Colors.lightBlue} colorHover={Colors.white} key={index} marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" align="around">
                        <Column size="12" alignSelf="center"><Paragraph fontSize="16px" color={Colors.gray} >{item.node.city}</Paragraph></Column>
                      </Row>
                    )
                  })}
                </>
                :
                null
              }
            </Card>
          </Column>
          <Column size="2" alignSelf="center" align="center" margin="5px 0"><Paragraph fontSize="16px" color={Colors.white} >to become a</Paragraph></Column>
        </Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
      </Column>
    </Row >

  )
};

export default ProgramSelector;