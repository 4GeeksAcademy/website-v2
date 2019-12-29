import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const ChooseProgram = () => {
    const [useOption, setOption] = useState([
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
    ])
    return (
        <div className="btn btn-success">  <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
        /></div>
    )
};

export default ChooseProgram;