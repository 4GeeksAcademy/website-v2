import React, {useEffect, useState, useContext} from 'react';
import {SessionContext} from '../../session';
import {Button, Colors} from '../Styling';
import {Card} from '../Card'
import {Row, Column} from '../Sections'
import { navigate } from "@reach/router"

const ChooseProgram = (props) => {
    const [toggle, setToggle] = useState(false)

    return (
        <Card
            github="/components/choose_program"
            shadow width="230px"
            margin={"20px 0"}
            margin_sm={"20px auto"}
            margin_xs={"20px auto"}
        >
            <Button width="100%" onClick={() => setToggle(!toggle)} color={Colors.blue} textColor={Colors.white}>
                {toggle ? props.openLabel : props.closeLabel}
            </Button>
            {toggle && 
                <Row marginBottom="5px" marginTop="3px" marginRight="0" marginLeft="0" width="250px" align="center" position="absolute" zIndex="1000" background={Colors.white} borderRadius=".75rem" shadow>
                    {Array.isArray(props.programs) && props.programs.map((item, index) => {
                        return (
                            <Button 
                                key={index}
                                colorHover={Colors.lightBlue}
                                onClick={() => navigate(item.link)} 
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