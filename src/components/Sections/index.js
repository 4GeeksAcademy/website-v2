import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


export const Container = styled.div`
    width: 100%;
    vertical-align: baseline;
    margin-left: 30px;
`;

Container.propTypes = {
    primary: PropTypes.string.isRequired,
}