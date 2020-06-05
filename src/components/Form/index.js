import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled, {css, keyframes} from 'styled-components';
import {Colors, Button} from '../Styling'

const regex = {
    email: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
    text: /^.+$/,
    number: /^\d+$/,
    phone: /(\+\d{1,3})?(\d{10,10})$/, // +17834565748 or 7834565748
}
const StyledInput = styled.input`
    background-color: ${props => props.valid ? Colors.lightGray : Colors.lightRed};
    height: 40px;
    width: 100%;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-color: ${Colors.black};
`
const Rel = styled.div`
    position: relative;
    width: 100%;
`
const Msg = styled.span`
    position: absolute;
    top: -19px;
    right: 2px;
    padding: 3px;
    font-size: 12px;
    background-color: ${Colors.lightRed};
`

export const Input = ({ onChange, type, required, validate, errorMsg, ...rest}) => {
    const [ validStatus, setValidStatus ] = useState({ valid: true });
    
    return <Rel>
        { !validStatus.valid && <Msg>{errorMsg}</Msg>}
        <StyledInput {...rest} type={type} required={required} valid={validStatus.valid}
            onChange={(e) => {
                let isValid = true;
                if(required === false && e.target.value.length === 0) isValid = true;
                else if(rest.pattern) isValid = new RegExp(rest.pattern).test(e.target.value);
                else isValid = regex[type].test(e.target.value);
                
                if(isValid != validStatus) setValidStatus({ 
                    valid: isValid,
                    msg: isValid ? "Ok" : errorMsg
                });
                if(onChange) onChange(e.target.value, isValid);
            }} 
        />
    </Rel>
}
Input.propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.string,
    errorMsg: PropTypes.string,
    required: PropTypes.bool,
    validate: PropTypes.object,
    pattern: PropTypes.string,
}
Input.defaultProps = {
    onChange: null,
    validate: null,
    type: "text",
    errorMsg: "Invalid Value",
    required: false,
    pattern: null,
};

const colors = {
    red: [Colors.lightRed, Colors.red],
}
export const Alert = styled.div`
    background-color: ${props => colors[props.color][0]};
    padding: 5px;
    width: 100%;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-color: ${props => colors[props.color][1]};
`;