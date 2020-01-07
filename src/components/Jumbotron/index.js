import React from 'react';
import {H1, H2, Title, Separator, Paragraph} from '../Heading'
import {Container, Section} from '../Sections'
import Link from 'gatsby-link'
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Jumbo = styled.div`
  width: 100%;
  height: ${props => props.height};
`;
Jumbo.propTypes = {
  height: PropTypes.string,
};

