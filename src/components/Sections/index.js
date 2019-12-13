import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../../components/Styling'

const color = props => props.color;
const height = props => props.height;
const marginLeft = props => props.marginLeft;
const borderTopLeft = props => props.borderTopLeft;
const borderBottomLeft = props => props.borderBottomLeft;

export const Container = styled.div`
    width: 100%;
    height: ${height};
    vertical-align: baseline;
    margin-left: ${marginLeft};
    background: ${props => props.primary
        ?
        `${Colors.blue}`
        :
        `${Colors.lightGray}`
    };
    border-radius: ${borderTopLeft} 0px 0px ${borderBottomLeft};
`;
Container.propTypes = {
    primary: PropTypes.string.isRequired,
    color: PropTypes.string,
    height: PropTypes.string,
    marginLeft: PropTypes.string,
    borderTopLeft: PropTypes.string,
    borderBottomLeft: PropTypes.string,

}