import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const H1 = styled.h1`
  font-size: 12px;
`;
export const H2 = styled.h2`
  font-size: 40px;
  text-transform: uppercase;
  font-weight: 800;
  font-style: normal;
  font-family: futura-pt, sans-serif;
  letter-spacing: 0px;
  color: ${props => props.primary ? "black" : "white"}
`;
export const H3 = styled.h3`
  font-size: 18px;
`;
export const H4 = styled.h4`
  font-size: 16px;
`;
export const Separator = styled.div`
  height: 5px;
  width: 30px;
  border-bottom: ${props => props.primary ? "2px solid #0097CE" : "2px solid #BBEAFC"};
`
export const Paragraph = styled.div`
  text-align: left;
  font-size: 12px;
  color: ${props => props.primary ? "#0097CE" : "#BBEAFC"};
`
export const Title = props => {
  let temp = ""
  if (props.style != "light") {
    temp = "justify-content-center"
  }
  return (
    <>
      <div className="row px-5">{props.style == "light" ? <H2 primary>{props.title}</H2> : <H2>{props.title}</H2>}</div>
      <div className={"row px-5 mb-3 " + temp}>{props.style == "light" ? <Separator primary /> : <Separator />}</div>
      <div className={"row px-5 " + temp}>{props.style == "light" ? <Paragraph primary>{props.paragraph}</Paragraph> : <Paragraph>{props.paragraph}</Paragraph>}</div>
    </>
  )
}
Title.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string,
  style: PropTypes.string.isRequired,


};

H2.propTypes = {
  primary: PropTypes.string.isRequired,
}