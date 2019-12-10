import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const H1 = styled.h1`
  font-size: 12px;
`;
export const H2 = styled.h2`
  font-size: 32px;
  text-transform: uppercase;
  font-weight: 700;
  font-family: futura-pt, sans-serif;
  color: ${props => props.primary ? "green" : "black"};
  color: ${props => props.primar ? "red" : "black"};

`;
export const H3 = styled.h3`
  font-size: 18px;
`;
export const H4 = styled.h4`
  font-size: 16px;
`;
export const Sep = styled.div`
  border-bottom: 1px solid black;
`
export const Title = props => {
  return (
    <>
      <div className="row px-5">{props.style == "light" ? <H2 primar>{props.title}</H2> : <H2>{props.title}</H2>}</div>
      <div className="row"><Sep /></div>
      <div className="row"></div>
    </>
  )
}
Title.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,


};

H2.propTypes = {
  primary: PropTypes.string.isRequired,
}