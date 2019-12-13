import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../../components/Styling'


export const Container = styled.div`
    width: 100%;
    height: 1225px;
    vertical-align: baseline;
    margin-left: 100px;
    background: ${props => props.primary ? `${Colors.blue}` : `${Colors.lightGray}`};
    border-radius: 1.25rem 0px 0px 0px;
`;

Container.propTypes = {
    primary: PropTypes.string.isRequired,

}