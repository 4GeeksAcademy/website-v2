import React, {useEffect, useState, useContext} from 'react';
import {SessionContext} from '../../session';
import {Button, Colors} from '../Styling';
import {Card} from '../Card'
import {Row, Column} from '../Sections'
import { redirectTo } from "@reach/router"

const ChooseProgram = (props) => {
    const {session, setSession} = useContext(SessionContext)
    const [toggle, setToggle] = useState(false)

    return (
        <Card
            github="/components/choose_program"
            w_xs="200px"
            w_sm="200px"
            w_md="200px"
            w_lg="200px"
            w_xl="200px"
            shadow width="230px"
        // padding={toggle === false ? "0px" : "0 0 10px 0"}
        >
            <Button width="100%" onClick={() => setToggle(!toggle)} color={Colors.blue} textColor={Colors.white}>{toggle === true ? props.lang[0].node.close_button_text : props.lang[0].node.open_button_text}</Button>
            {toggle && <Row marginBottom="5px" marginTop="3px" marginRight="0" marginLeft="0" width="250px" align="center" position="absolute" zIndex="1000" background={Colors.white} borderRadius=".75rem" shadow>
                        {props.lang[0].node.programs.map((item, index) => {
                            return (
                                <Button 
                                    key={index}
                                    colorHover={Colors.lightBlue}
                                    onClick={() => redirectTo(item.link)} 
                                    textColor={Colors.gray} 
                                    fontSize={"16px"}
                                    borderRadius=".75rem" padding="10px"
                                >
                                    {item.text}
                                </Button>
                            )
                        })}
                </Row>
            }
        </Card>
    )
};

export default ChooseProgram;