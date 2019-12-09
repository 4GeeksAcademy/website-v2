import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Section = props => {
    const Height = styled.div`
        
        height: ${props.height}
      
    `;
    return (
        <Height></Height>
    )
};
Section.propTypes = {
    height: PropTypes.string


};

export default Section;