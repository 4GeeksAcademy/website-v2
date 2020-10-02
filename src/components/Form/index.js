import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled, {css, keyframes} from 'styled-components';
import {Colors, Button} from '../Styling';
import {Break} from "../Responsive"

const regex = {
    email: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
    text: /^.+$/,
    number: /^\d+$/,
    phone: /(\+\d{1,3})?(\d{9,10})$/, // +17834565748 or 7834565748
}


const StyledInput = styled.input`
    background-color: ${props => props.valid ? Colors.lightGray : Colors.lightRed};
    height: 40px;
    width: ${props => props.width || "100%"};
    padding: 5px 10px;
    margin: ${props => props.margin || "10px 0px"};
    border-radius: ${props => props.borderRadius};
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-color: ${Colors.black};
    user-select: initial;
    @media ${Break.sm}{
        width: ${props => props.w_sm};
    }
`
const Rel = styled.div`
    position: relative;
    width: ${props => props.width || "100%"};
`
const Msg = styled.span`
    position: absolute;
    top: -8px;
    left: 0px;
    padding: 3px;
    font-size: 12px;
    background-color: ${Colors.lightRed};
`

export const Input = ({ onChange, type, required, validate, errorMsg, width, margin,...rest}) => {
    const [ validStatus, setValidStatus ] = useState({ valid: true });
    
    return <Rel width={width}>
        { !validStatus.valid && <Msg>{errorMsg}</Msg>}
        <StyledInput {...rest} type={type} margin={margin} required={required} valid={validStatus.valid}
            onChange={(e) => {
            let isValid = true;
            if(required === false && e.target.value.length === 0) isValid = true;
            else if(rest.pattern) isValid = new RegExp(rest.pattern).test(e.target.value);
            else isValid = regex[type].test(e.target.value);
            
            if(isValid != validStatus) {
                setValidStatus({ 
                    valid: isValid,
                    msg: isValid ? "Ok" : errorMsg
                });
            }
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
    green: [Colors.lightGreen, Colors.green],
}
export const Alert = styled.div`
    background-color: ${props => colors[props.color][0]};
    padding: 5px;
    width: 100%;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-color: ${props => colors[props.color][1]};
    margin: ${props => props.margin};
`;

//TextArea Styled Component
const StyledTextArea = styled.textarea`
    background-color: ${props => props.valid ? Colors.lightGray : Colors.lightRed};
    width: 100%;
    padding: 5px 10px;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-color: ${Colors.black};
`

export const TextArea = ({ onChange, type,errorMsg, required, validate, ...rest}) => {
    const [ validStatus, setValidStatus ] = useState({ valid: true });
    return (
        <Rel>
        { !validStatus.valid && <Msg>{errorMsg}</Msg>}
        <StyledTextArea 
            {...rest}
            type={type}
            required={required} valid={validStatus.valid}
            onChange= {(e) => {
                let isValid = true;
                if(required === false && e.target.value.length === 0) isValid = true;
                else isValid = regex[type].test(e.target.value);
                
                if(isValid != validStatus) setValidStatus({ 
                    valid: isValid,
                    msg: isValid ? "Ok" : errorMsg
                });
                if(onChange) onChange(e.target.value, isValid);
         }}
        />
        </Rel>
    )
}

TextArea.propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.string,
    errorMsg: PropTypes.string,
    required: PropTypes.bool,
    validate: PropTypes.object,
}

TextArea.defaultProps = {
    onChange: null,
    type: "text",
    validate: null,
    errorMsg: "Missing Comment",
    required: false,
};


