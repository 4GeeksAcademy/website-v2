import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const ChooseProgram = () => {
    const [useOption, setOption] = useState([
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
    ])
    return (
        <div>ChooseProgram</div>
    )
};

export default ChooseProgram;