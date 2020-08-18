import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
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

  let locArray = props.lang;
  // let locArray = data.loc.edges;
  let weekArray = ["16", "9", "2"]
  let link = "";
  {props.week === 16 ? link = "full-time" : link = "part-time"}
  return (
    <>
      {props.context.slug !== "coding-introduction" ?
        <Row align="center" >
          <Column size="12" alignSelf="center">
            <Row align="around">
              <Column size="2" alignSelf="center" paddingRight="0" align="right" margin="5px 0"><Paragraph fontSize="20px" fs_md="14px" color={Colors.white} >It takes just </Paragraph></Column>
              <Column size="1" alignSelf="center" paddingLeft="0" paddingRight="0" align="center" customRespSize respSize="4" >
                <Card index="1" borders=".25rem" height="auto" shadow width="100%" padding={toggles === false && "0px"}>
                  {toggles == true ? null : <Row marginRight="0" marginLeft="0" align="center">
                    <Button borderRadius=".25rem" onClick={() => setToggles(!toggles)} color={Colors.white} textColor={Colors.gray}>{props.week}
                      <Span margin="0 5px" >
                        <TriangleDown width="12" color={Colors.blue} fill={Colors.blue} />
                      </Span>
                    </Button>
                  </Row>}
                  {toggles == true
                    ?
                    <>
                      {weekArray.map((item, index) => {
                        return (
                          <Button width="95%" textColor={Colors.gray} borderRadius=".25rem" padding="0">
                            <Card index="1" borders=".25rem" margin="2px 0" width="100%" padding={toggles === false && "0px"} >
                              {/* <Link to={link}> */}
                              <Link to={`/${session.language}/course/${item === "2" ? "coding-introduction" : link}`}>
                                <Row key={index} height="50%" marginRight="0" marginLeft="0" backgroundHover={Colors.lightBlue} colorHover={Colors.white} align="around">
                                  <Column onClick={() => setWeeks(item)} border="custom" customBorderRadius=".25rem" size="12" alignSelf="center">
                                    <Paragraph
                                      fs_xs="14px"
                                      fs_sm="14px"
                                      fs_md="10px"
                                      fs_lg="12px"
                                      fs_xl="16px"
                                      color={Colors.gray}
                                    >
                                      {item}
                                    </Paragraph>
                                  </Column>
                                </Row>
                              </Link>
                            </Card>

                          </Button>
                        )
                      })}
                    </>
                    :
                    null
                  }
                </Card>
              </Column>
              <Column size="1" alignSelf="center" paddingLeft="0" paddingRight="0" align="center" margin="5px 0"><Paragraph fontSize="20px" fs_md="14px" color={Colors.white} >weeks in</Paragraph></Column>
              <Column size="2" alignSelf="center" align="center" paddingLeft="0" paddingRight="0" customRespSize respSize="5">
                <Card index="1" borders=".25rem" shadow width="100%" padding={toggle === false && "0px"}>
                  {toggle == true ? null : <Row align="center">
                    <Button borderRadius=".25rem" onClick={() => setToggle(!toggle)} color={Colors.white} textColor={Colors.gray}>{session.location && session.location.city}
                      <Span margin="0 5px" >
                        <TriangleDown width="12" color={Colors.blue} fill={Colors.blue} />
                      </Span>
                    </Button>
                  </Row>}
                  {toggle == true
                    ?
                    <>
                      {locArray.map((item, index) => {
                        return (
                          <Button width="95%" textColor={Colors.gray} borderRadius=".25rem" padding="0">
                            <Card index="1" borders=".25rem" margin="2px 0" width="100%" padding={toggles === false && "0px"} >
                              <Row height="20%" onClick={() => setSession({...session, location: {...location, city: item.node.city}}, setToggle(!toggle))
                              } backgroundHover={Colors.lightBlue} colorHover={Colors.white} key={index} marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" align="around" >
                                <Column size="12" alignSelf="center">
                                  <Paragraph
                                    fs_xs="14px"
                                    fs_sm="14px"
                                    fs_md="10px"
                                    fs_lg="12px"
                                    fs_xl="16px"
                                    color={Colors.gray}
                                  >
                                    {item.node.city}
                                  </Paragraph>
                                </Column>
                              </Row>
                            </Card>
                          </Button>
                        )
                      })}
                    </>
                    :
                    null
                  }
                </Card>
              </Column>
              <Column size="2" alignSelf="center" align="left" paddingLeft="0" paddingRight="0" margin="5px 0"><Paragraph fontSize="20px" fs_md="14px" color={Colors.white} >to become a</Paragraph></Column>
            </Row>
            <Row></Row>
            <Row></Row>
            <Row></Row>
          </Column>
        </Row >
        : null}
    </>
  )
};

export default ProgramSelector;