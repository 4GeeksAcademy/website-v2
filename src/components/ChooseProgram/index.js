import React, {useEffect, useState, useContext} from 'react';
import {SessionContext} from '../../session';
import {Button, Colors} from '../Styling';
import {Card} from '../Card'
import {Row, Column} from '../Sections'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../Heading'
import {useStaticQuery, graphql} from 'gatsby';

const ChooseProgram = () => {
    const {session, setSession} = useContext(SessionContext)
    const [toggle, setToggle] = useState(false)
    const [toggles, setToggles] = useState(false)
    const [city, setCity] = useState(session.location)
    const [program, setProgram] = useState(false)

    const data = useStaticQuery(graphql`
      query myQueryChoose{
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
    let locArray = data.loc.edges;
    return (
        <>
            <Card index="1" shadow width="230px" padding={toggle === false ? "0px" : "0 0 10px 0"}>
                <Row marginRight="0" marginLeft="0" align="center"><Button onClick={() => setToggle(!toggle)} color={Colors.blue} textColor={Colors.white}>CHOOSE YOUR PROGRAM</Button></Row>
                {toggle == true
                    ?
                    <>
                        <Row marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" align="center">
                            <Button width="90%" color={Colors.lightGray} textColor={Colors.gray} borderRadius=".25rem">
                                <>
                                    Select Program
                                </>
                            </Button>
                        </Row>
                        <Row marginBottom="5px" marginRight="0" marginLeft="0" align="center">
                            <Button width="90%" color={Colors.lightGray} textColor={Colors.gray} borderRadius=".25rem">
                                <Card index="1" borders=".25rem" shadow width="100%" padding={toggles === false && "0px"}>
                                    {toggles == true ? null : <Row align="center"><Button borderRadius=".25rem" onClick={() => setToggles(!toggles)} color={Colors.white} textColor={Colors.gray}>{session.location}</Button></Row>}
                                    {toggles == true
                                        ?
                                        <>
                                            {locArray.map((item, index) => {
                                                return (
                                                    <Row height="25px" onClick={() => setSession({location: item.node.city}, setToggles(!toggles))} backgroundHover={Colors.lightBlue} colorHover={Colors.white} key={index} marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" align="around">
                                                        <Column size="12" alignSelf="center"><Paragraph fontSize="16px" color={Colors.gray} >{city != null ? city : item.node.city}</Paragraph></Column>
                                                    </Row>
                                                )
                                            })}
                                        </>
                                        :
                                        null
                                    }
                                </Card>
                            </Button></Row>
                        {/* <Row marginBottom="5px" marginRight="0" marginLeft="0" align="center"><Button width="90%" color={Colors.lightGray} textColor={Colors.gray} borderRadius=".25rem">Payment</Button></Row> */}
                        <Row marginRight="0" marginLeft="0" align="center"><Button width="90%" onClick={() => setToggle(!toggle)} color={Colors.red} textColor={Colors.white}>APPLY NOW</Button></Row>
                    </>
                    :
                    null
                }
            </Card>

        </>
    )
};

export default ChooseProgram;