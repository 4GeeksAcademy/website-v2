import React, {useEffect, useState, useContext} from 'react';
import {SessionContext} from '../../session';
import {Button, Colors} from '../Styling';
import {Card} from '../Card'
import {Row, Column} from '../Sections'

const ChooseProgram = () => {
    const {session, setSession} = useContext(SessionContext)
    const [toggle, setToggle] = useState(false)
    const [program, setProgram] = useState(false)

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
                        <Row marginBottom="5px" marginRight="0" marginLeft="0" align="center"><Button width="90%" color={Colors.lightGray} textColor={Colors.gray} borderRadius=".25rem">Select Location</Button></Row>
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