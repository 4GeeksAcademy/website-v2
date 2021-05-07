import React, {useEffect, useState, useContext} from 'react';
import PropTypes from "prop-types";
import {Button, Colors} from '../Styling';
import {Break} from '../Responsive'
import {Row, Column} from '../Sections'
import Select from "react-select";
import styled from 'styled-components';

export const ChooseWrap = styled.div`
    position: relative;
    text-align: center;
    cursor: pointer;
    margin: ${props => props.margin};
    @media ${Break.sm} {
        width: 100%;
        margin: ${props => props.m_sm};
    }
    @media ${Break.xs} {
        width: 100%;
        margin: ${props => props.m_xs};
    }
`;
const SmartSelect = (props) => {
    const [status, setStatus] = useState({toggle: false, hovered: false})
    const _Selector = (_p) => <Button
        shadow="0px 0px 6px 2px rgba(0, 0, 0, 0.2)"
        padding="10px 30px"
        maxWidth={props.maxWidth}
        width={props.width}
        minWidth={props.minWidth}
        onClick={() => _p.setStatus({toggle: !_p.status.toggle})}
        color={Colors.blue}
        textColor={Colors.white}
    >
        {_p.status.toggle ? props.openLabel : props.closeLabel}
    </Button>
    const Selector = props.selector || _Selector;
    return (
        <ChooseWrap
            centered={props.centered}
            margin={props.margin}
            m_sm={props.m_sm}
            m_xs={props.m_xs}
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
                <Row
                    margin={props.margin}
                    m_sm={props.m_sm}
                    m_xs={props.m_xs}
                    width={props.width || "250px"}
                    width_xs="100%"
                    width_sm="100%"
                    display="flex"
                    justifyContent="center"
                    position="absolute"
                    right={props.right}
                    top={props.top}
                    left={props.left}
                    zIndex="2"
                    marginRight="0"
                    marginLeft="0"
                    background={Colors.white}
                    borderRadius={props.borderRadius}
                    shadow={props.shadow}
                >
                    {Array.isArray(props.options) && props.options.map((item, index) => {
                        return (
                            <Button
                                key={index}
                                font={"Lato, sans-serif"}
                                colorHover={Colors.lightBlue}
                                onClick={() => {
                                    setStatus({toggle: false, hovered: false});
                                    if (props.onSelect) props.onSelect(item);
                                }}
                                textColor={Colors.gray}
                                fontSize={"16px"}
                                borderRadius=".75rem" padding="10px"
                            >
                                {item.label}
                            </Button>
                        )
                    })}
                </Row>
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
        
        ":hover": { boxShadow: "0 0 0 1px black", },
        ":active": { boxShadow: "0 0 0 1px black", borderColor: "black", }
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          fontFamily: "lato, sans-serif",
        };
      }
  }

export const SelectRaw = ({ onChange, ...rest }) => {
    return <Select
        className="react-select-wrapper"
        styles={customStyles}
        {...rest}
        onChange={(opt) => {
            if(onChange) onChange(opt, true);
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