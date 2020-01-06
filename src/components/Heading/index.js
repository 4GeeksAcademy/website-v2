import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors, Icons} from '../../components/Styling'
import {Column, Row} from '../Sections'
import {Device} from '../Responsive'

export const H1 = styled.h1`
  font-size: 12px;
`;
export const H2 = styled.h2`
  font-size: 40px;  
  font-family: lato, sans-serif;
  font-weight: 800;
  font-style: normal;
  letter-spacing: -1px;
  text-transform: ${props => props.uppercase && "uppercase"};
  color: ${props => props.color}
`;
export const H3 = styled.h3`
margin:0px;
font-size: 36px;
font-height: 36px;
font-weight: 800;
font-style: normal;
font-family: lato, sans-serif;
letter-spacing: -1px;
text-transform: ${props => props.uppercase && "uppercase"};
color: ${props => props.primary ? `${Colors.black}` : `${Colors.white}`}
`;
export const H4 = styled.h4`
  font-size: 29px;
  line-height: 29px;
  text-transform: ${props => props.uppercase && "uppercase"};
  font-style: normal;
  font-family: lato, sans-serif;
  font-weight: 800;
`;
export const H5 = styled.h5`
  font-size: ${props => props.fontSize};
  line-height: ${props => props.fontHeight};
  text-transform: ${props => props.uppercase && "uppercase"};
  font-style: normal;
  font-family: lato, sans-serif;
  font-weight: 800;
  ${props =>
    props.align === "left" &&
    css`
      @media ${Device.md}{
        text-align: ${props => props.align};
      }
      @media ${Device.xs}{
        text-align: center;
      }
      @media screen ${Device.sm}{
        text-align: center;
      }
      @media ${Device.lg}{
        text-align: ${props => props.align};
      }
      @media ${Device.xl} {
        text-align: ${props => props.align};
      }
      `} 
      
  
`;
export const Separator = styled.div`
  margin: .5rem 0px;
  height: 5px;
  width: 30px;
  border-bottom: ${props => props.primary ? `2px solid ${Colors.blue} ` : `2px solid ${Colors.lightBlue}`};
`
export const Paragraph = styled.div`
  font-size: 12px;
  color: ${props => props.primary ? `${Colors.Gray}` : `${props.color}`};
`
export const Title = props => {
  return (
    <>
      {props.fluid ?
        (
          <>
            <Row center>{props.primary ? <H3 primary>{props.title}</H3> : <H3>{props.title}</H3>}</Row>
            <Row center>{props.primary ? <Separator primary /> : <Separator />}</Row>
            <Row center>{props.primary ? <Paragraph primary>{props.paragraph}</Paragraph> : <Paragraph color={props.paragraphColor}>{props.paragraph}</Paragraph>}</Row>
          </>
        )
        :
        (
          <Row center>
            <Column size={props.size}>
              <Row center>{props.primary ? <H3 primary>{props.title}</H3> : <H3>{props.title}</H3>}</Row>
              <Row center>{props.primary ? <Separator primary /> : <Separator />}</Row>
              <Row center>{props.primary ? <Paragraph primary>{props.paragraph}</Paragraph> : <Paragraph>{props.paragraph}</Paragraph>}</Row>
            </Column>
          </Row>
        )
      }
    </>
  )
}
Title.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string,
  style: PropTypes.string.isRequired,
  content: PropTypes.func,
  size: PropTypes.string,
  paragraphColor: PropTypes.string
};
H2.propTypes = {
  primary: PropTypes.bool.isRequired,
}
Paragraph.defaultProps = {
  color: Colors.lightGray,
};