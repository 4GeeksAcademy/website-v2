import React, {useEffect, useState, useContext} from 'react';
import PropTypes from "prop-types";
import {Button, Colors} from '../Styling';
import {H4} from '../Heading';
import Icon from '../Icon';
import {Div, Column} from '../Sections'
import Select from "react-select";
import styled from 'styled-components';

export const ChooseWrap = styled.div`
    position: relative;
    text-align: center;
    cursor: pointer;
    margin: ${props => props.margin};
`;
const Label = styled.div`
    position: absolute;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    color: #606060;
    top: -13px;
    left: 4px;
    background: white;
    width: fit-content;
    padding: 0 3px;
`
const SmartSelect = (props) => {
    const [status, setStatus] = useState({toggle: false, hovered: false})
    const _Selector = (_p) => <Div
        // margin_tablet="0 28px 0 0"
        padding="7px"
        alignItems="center"
        width="314px"
        minWidth={props.minWidth}
        onClick={() => _p.setStatus({toggle: !_p.status.toggle})}
        color={Colors.white}
        border="1px solid #606060"
        borderRadius="3px"
        position="relative"

    ><Label>{props.topLabel}</Label>
        <H4 lineHeight="22px" textAlign="left" color={Colors.darkGray} margin="0 20px 0 0">
            {_p.status.toggle ? props.openLabel : props.closeLabel}
        </H4>
        <Icon icon="arrowdown" />
    </Div>
    const Selector = props.selector || _Selector;
    return (
        <ChooseWrap
            centered={props.centered}
            margin={props.margin}
            onMouseLeave={() => {
                setStatus({...status, hovered: false});
                setTimeout(() => {
                    setStatus(_status => ({..._status, toggle: _status.hovered}));
                }, 300)
            }}
            onMouseEnter={() => setStatus({...status, hovered: true})}
        >
            <Selector status={status} setStatus={setStatus} options={props.options} />
            {status.toggle &&
                <Div
                    flexDirection="column"
                    zIndex="1"
                    position="absolute"
                    border="1px solid #EBEBEB"
                    boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
                    background={Colors.white}
                    width="100%"
                >
                    {Array.isArray(props.options) && props.options.map((item, index) => {
                        return (
                            <Button
                                key={index}
                                font={"Lato, sans-serif"}
                                colorHover="#F5F5F5"
                                onClick={() => {
                                    setStatus({toggle: false, hovered: false});
                                    if (props.onSelect) props.onSelect(item);
                                }}
                                textColor={Colors.gray}
                                fontSize="15px"
                                lineHeight="22px"
                                fontWeight="400"
                                width="100%"
                                textAlign="left"
                                textTransform="capitalize"
                            >
                                {item.label}
                            </Button>
                        )
                    })}
                </Div>
            }
        </ChooseWrap >
    )
};
SmartSelect.propTypes = {
    selector: PropTypes.func,
    marginTop: PropTypes.string,
    marginLeft: PropTypes.string,
    borderRadius: PropTypes.string,
    shadow: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ])
};
SmartSelect.defaultProps = {
    selector: null,
    shadow: true,
    marginTop: "5px",
    marginLeft: "0",
    borderRadius: ".75rem",
}
export default SmartSelect;


const customStyles = {
    input: (styles) => ({
        ...styles,
        width: "100%"
    }),
    control: (styles) => ({
        ...styles,
        fontFamily: "lato, sans-serif",
        background: "#ededed",
        border: 0,
        marginTop: "5px",
        width: "100%",

        ":hover": {boxShadow: "0 0 0 1px black", },
        ":active": {boxShadow: "0 0 0 1px black", borderColor: "black", }
    }),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
            fontFamily: "lato, sans-serif",
        };
    }
}

export const SelectRaw = ({onChange, ...rest}) => {
    return <Select
        className="react-select-wrapper"
        styles={customStyles}
        {...rest}
        onChange={(opt) => {
            if (onChange) onChange(opt, true);
        }}
    />
}
SelectRaw.propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
};
SelectRaw.defaultProps = {
    onChange: null,
    options: [],
}