import React, {useEffect, useState, useContext} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import styled from 'styled-components';
// import {SessionContext} from '../../session';
import {Button, Colors} from '../Styling';
import {Card} from '../Card'

const ChooseProgram = () => {
    // const {session, setSession} = useContext(SessionContext)
    const [toggle, setToggle] = useState(false)
    const [option, setOption] = useState([
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
    ])

    return (
        <>
            <Card shadow width="200px" >
                <Button onClick={() => setToggle(!toggle)} color={Colors.blue} textColor={Colors.white}>Choose Program</Button>
                {toggle == true
                    ?
                    <>
                        <div >ciao</div>
                        <div>ciao</div>
                        <div>ciao</div>
                    </>
                    :
                    null
                }

            </Card>

            {/* <Button color={Colors.blue}>
                ChooseProgram
            </Button>
            {toggle == "true" && <div>test</div>}
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Choose Your Program
            </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item >
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                Program
            </Dropdown.Toggle>

                            {option.map((item, index) => {
                                return (
                                    <Dropdown.Menu key={index}>
                                        <Dropdown.Item href="#/action-1">{item.value}</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#/action-2">{item.value}</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#/action-3">{item.value}</Dropdown.Item>
                                    </Dropdown.Menu>)
                            })}
                        </Dropdown>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item >
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                Location
            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Program</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Location</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Payment</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-3">
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                Payment
            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Program</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Location</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Payment</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Item>
                    <div className="btn btn-block btn-sm btn-warning rounded-pill mt-1">APPLY NOW</div>
                </Dropdown.Menu>

            </Dropdown> */}
        </>
    )
};

export default ChooseProgram;