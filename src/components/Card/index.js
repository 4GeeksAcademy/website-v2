import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../../components/Styling'

export const Card = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    background: ${props => props.color === "blue"
        ?
        `${Colors.blue}`
        : props.color === "grey"
            ? `${Colors.lightGray}`
            : `${Colors.white}`
    };
    border-radius: ${props => props.borders};
`;
Card.propTypes = {
    color: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    borders: PropTypes.string,
}
Card.defaultProps = {
    borders: '1.25rem',
};