import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Colors, Icons} from '../../components/Styling'
import {Column} from '../Sections'

export const H1 = styled.h1`
  font-size: 12px;
`;
export const H2 = styled.h2`
  font-size: 40px;  
  font-family: lato, sans-serif;
  font-weight: 800;
  font-style: normal;
  letter-spacing: 0px;
  text-transform: ${props => props.up && "uppercase"};
  color: ${Colors.black}
`;
export const H3 = styled.h3`
font-size: 36px;
font-weight: 800;
font-style: normal;
font-family: lato, sans-serif;
letter-spacing: 0px;
text-transform: ${props => props.up && "uppercase"};
color: ${props => props.primary ? `${Colors.black}` : `${Colors.white}`}
`;
export const H4 = styled.h4`
  font-size: 29px;
  line-height: 29px;
  text-transform: ${props => props.up && "uppercase"};
  font-style: normal;
  font-family: lato, sans-serif;
  font-weight: 800;
`;
export const Separator = styled.div`
  margin: .5rem 0px;
  height: 5px;
  width: 30px;
  border-bottom: ${props => props.primary ? `2px solid ${Colors.blue} ` : `2px solid ${Colors.lightBlue}`};
`
export const Paragraph = styled.div`
  font-size: 12px;
  color: ${props => props.primary ? `${Colors.gray}` : `${Colors.lightBlue}`};
`
export const Title = props => {
  let temp = ""
  if (props.style != "light") {
    temp = ""
  }
  return (
    <>
      <div className="row align-items-center h-100 justify-content-center">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
          <div className="row justify-content-center" >{props.style == "light" ? <H3 primary>{props.title}</H3> : <H3>{props.title}</H3>}</div>
          <div className="row mb-3 justify-content-center">{props.style == "light" ? <Separator primary /> : <Separator />}</div>
          <div className="row justify-content-center" >{props.style == "light" ? <Paragraph primary>{props.paragraph}</Paragraph> : <Paragraph>{props.paragraph}</Paragraph>}</div>
        </div>
      </div>
    </>
  )
}
Title.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string,
  style: PropTypes.string.isRequired,
  content: PropTypes.func,
};
H2.propTypes = {
  primary: PropTypes.bool.isRequired,
}