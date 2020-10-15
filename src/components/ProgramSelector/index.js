import React, {useState, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import {navigate, graphql} from 'gatsby';
import {Row, Column} from '../Sections';
import {Paragraph, Span} from '../Heading';
import {Colors, Button} from '../Styling';
import {SessionContext} from '../../session'
import Card from '../Card'
import Icon from '../Icon'

const strings = {
  us: {
    "It takes just": "It takes just",
    "weeks in": "weeks in",
    "to become a": "to become a"
  },
  es: {
    "It takes just": "En tan sólo",
    "weeks in": "semanas en",
    "to become a": "te convertirás en"
  }
}

const ProgramSelector = (props) => {
  const {session, setSession} = useContext(SessionContext);
  const [toggles, setToggles] = useState(false)
  const [toggle, setToggle] = useState(false)
  let locArray = session ? session.locations || [] : [];
  // let locArray = data.loc.edges;
  let weekArray = ["16", "9"]
  let link = "";
  {props.week === 16 ? link = "full-time" : link = "part-time"}
  return (
    <Row align="around" marginTop={props.marginTop}>
      <Column size="2" size_sm="12" alignSelf="center" paddingRight="0" align="right" margin="5px 0">
        <Paragraph fontSize="20px" fs_md="14px" color={Colors.white} >{strings[props.lang]["It takes just"]}</Paragraph>
      </Column>
      <Column size="1" size_sm="12" alignSelf="center" paddingLeft="0" paddingRight="0" align="center" >
        {toggles === false &&
          <Button
            style={{maxWidth: "100px", position: "relative"}}
            onMouseLeave={() => {
              setTimeout(() => {
                setToggles(false);
              }, 500)
            }}
            padding={`5px 10px`}
            borderRadius=".25rem"
            onClick={() => setToggles(!toggles)}
            color={Colors.white}
            textColor={Colors.gray}>
            {props.week}
            <Icon icon="triangledown" style={{marginLeft: "5px", position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)"}} width="14" color={Colors.gray} fill={Colors.gray} />
          </Button>
        }

        {toggles == true &&
          <Card borders=".25rem" color="grey">
            {Array.isArray(weekArray) && weekArray.map((item, index) => {
              return (
                <Button
                  key={index}
                  width="100%"
                  color={item === props.week ? Colors.lightBlue : null}
                  colorHover={Colors.lightBlue}
                  textColor={Colors.gray}
                  borderRadius=".25rem"
                  padding="5px"
                  onClick={() => {
                    setToggles(!toggles);
                    navigate(`/${props.lang}/course/${link}`)
                  }}
                >
                  {item}
                </Button>
              )
            })}
          </Card>
        }
      </Column>
      <Column size="2" size_sm="12" alignSelf="center" paddingLeft="0" paddingRight="0" align="center" margin="5px 0"><Paragraph fontSize="20px" fs_md="14px" color={Colors.white} >{strings[props.lang]["weeks in"]}</Paragraph></Column>
      <Column size="2" size_sm="12" alignSelf="center" align="center" paddingLeft="0" paddingRight="0">
        {toggle == false &&
          <Button
            style={{maxWidth: "200px", position: "relative"}}

            padding={`5px`} borderRadius=".25rem" onClick={() => setToggle(!toggle)} color={Colors.white} textColor={Colors.gray}>
            {session && session.location && session.location.city}
            <Icon icon="triangledown" style={{marginLeft: "5px", position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)"}} width="14" color={Colors.gray} fill={Colors.gray} />
          </Button>
        }
        {toggle == true && <Card borders=".25rem" color="grey">
          {locArray.map((item, index) => {
            return (
              <Button
                onMouseLeave={() => {
                  setTimeout(() => {
                    setToggle(false);
                  }, 5000)
                }}
                key={index}
                style={{maxWidth: "100%", position: "relative"}}
                onClick={() => {
                  setSession({...session, location: {...item}, language: props.lang })
                  setToggle(!toggle)
                }}
                colorHover={Colors.lightBlue}
                textColor={item.city === session.location.city ? Colors.darkGray : Colors.gray}
                color={item.city === session.location.city ? Colors.lightBlue : null}
                borderRadius=".25rem"
                padding="5px"
              >
                {item.city}
              </Button>
            )
          })}
        </Card>
        }
      </Column>
      <Column size="2" size_sm="12" alignSelf="center" align="left" paddingLeft="0" paddingRight="0" m_sm="20px 0px 0px 0px">
        <Paragraph fontSize="20px" fs_md="14px" color={Colors.white} >{strings[props.lang]["to become a"]}</Paragraph>
      </Column>
    </Row>
  )
};
ProgramSelector.propTypes = {
  lang: PropTypes.string,
}
ProgramSelector.defaultProps = {
  lang: "us",
}
export default ProgramSelector;