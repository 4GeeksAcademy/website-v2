import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Row, Column} from '../Sections';

const ProgramSelector = () => {
    const [ip, setIp] = useState("ciao");
    const [location, setLocation] = useState();
    useEffect(() => {
        fetch(
            'http://api.ipstack.com/99.159.57.33?access_key=9b1771a432a0ca7c933a9a641b63bb00',
        )
            .then(response => response.json())
            .then(data => setLocation(data))
    }, []);
    return (
        <Row>
            <Column size="12"></Column>
        </Row>

    )
};

export default ProgramSelector;