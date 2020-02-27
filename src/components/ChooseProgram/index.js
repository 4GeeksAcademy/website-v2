import React, {useEffect, useState, useContext} from 'react';
import {SessionContext} from '../../session';
import {Button, Colors} from '../Styling';
import {Card} from '../Card'
import {Row, Column} from '../Sections'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../Heading'
import {useStaticQuery, graphql} from 'gatsby';
import Link from 'gatsby-link'

const ChooseProgram = () => {
    const {session, setSession} = useContext(SessionContext)
    const [toggle, setToggle] = useState(false)
    const [toggles, setToggles] = useState(false)
    const [toggleProg, setToggleProg] = useState(false)
    const [city, setCity] = useState(session.location)
    const [program, setProgram] = useState("Part-Time")

    const data = useStaticQuery(graphql`
      query myQueryChoose{
          loc: allLocationYaml {
            edges {
              node {
                id
                city
                prices {
                    full_time {
                      slug
                    }
                    part_time {
                      slug
                    }
                  }
                
              }
            }
          }
        }
      `)
    let locArray = data.loc.edges;
    let locPrograms = ["Part-Time", "Full-Time"]
    console.log(locArray)
    return (
        <>
            <Card
                w_xs="200px"
                w_sm="200px"
                w_md="200px"
                w_lg="200px"
                w_xl="200px"

                shadow width="230px"
                padding={toggle === false ? "0px" : "0 0 10px 0"}>
                <Row marginRight="0" marginLeft="0" align="center"><Button width="100%" onClick={() => setToggle(!toggle)} color={Colors.blue} textColor={Colors.white}>CHOOSE YOUR PROGRAM</Button></Row>
                {toggle == true
                    ?
                    <>
                        <Row marginBottom="5px" marginRight="0" marginLeft="0" align="center">
                            <Button width="90%" color={Colors.lightGray} textColor={Colors.gray} borderRadius=".25rem">
                                <Card index="1" borders=".25rem" shadow width="100%" color="transparent" padding={toggles === false && "0px"}>
                                    {toggles == true ? null : <Row align="center"><Button borderRadius=".25rem" onClick={() => setToggles(!toggles)} color={Colors.white} textColor={Colors.gray}>{program}</Button></Row>}
                                    {toggles == true
                                        ?
                                        <>
                                            {locPrograms.map((item, index) => {
                                                return (
                                                    <Row height="25px" onClick={() => {setProgram(item), setToggles(!toggles)}} backgroundHover={Colors.lightBlue} colorHover={Colors.white} key={index} marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" align="around">
                                                        <Column size="12" alignSelf="center"><Paragraph fontSize="16px" color={Colors.gray} >{item}</Paragraph></Column>
                                                    </Row>
                                                )
                                            })}
                                        </>
                                        :
                                        null
                                    }
                                </Card>
                            </Button></Row>
                        <Row marginRight="0" marginLeft="0" align="center">
                            <Link to={program === "Part-Time" ? "/course/full-stack-web-development-bootcamp-part-time" : program === "Full-Time" ? "/course/full-stack-web-development-bootcamp-full-time" : "/course/full-stack-web-development-bootcamp-part-time"}>
                                <Button width="100px" padding="5px" onClick={() => setToggle(!toggle)} color={Colors.red} textColor={Colors.white}>GO</Button>
                            </Link>
                        </Row>
                    </>
                    :
                    null
                }
            </Card>

        </>
    )
};

export default ChooseProgram;