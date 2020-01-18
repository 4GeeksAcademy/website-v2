import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors, Icons} from '../../components/Styling'
import {Column, Row} from '../Sections'
import {Device} from '../Responsive'
import {Blink} from '../Animations'

export const H1 = styled.h1`
${props => props.lato ?
    css`
      font-family: 'Lato-Bold', sans-serif;
      font-size: ${props => props.fontSize};
      font-weight: 500;
      letter-spacing: 0px;
      color: ${props => props.color};
  `
    :
    css`
      font-family: 'Futura', 'sans-serif';
      font-size: ${props => props.fontSize};
      font-weight: 800;
      letter-spacing: 0px;
      color: ${props => props.color};
`};


text-transform: ${props => props.uppercase && "uppercase"};

text-align: ${props => props.align};
`;
export const H2 = styled.h2`
    @media ${Device.xs}{
      text-align: center;
      font-size: 7vw;
    }
    @media screen ${Device.sm}{
      text-align: center;
      font-size: 7vw;
    }
    @media ${Device.md}{
      text-align: ${props => props.align};
      font-size: 7vw;
    }
    @media ${Device.lg}{
      text-align: ${props => props.align};
      font-size: 5vw;
    }
    @media ${Device.xl} {
      text-align: ${props => props.align};
      font-size: 3vw;
    }   
    font-family: 'Futura', sans-serif;
    font-weight: 800;
    letter-spacing: -1px;
    text-transform: ${props => props.uppercase && "uppercase"};
    color: ${props => props.color};
`;
export const H3 = styled.h3`
@media ${Device.xs}{
  text-align: center;
  font-size: 6vw;
}
@media screen ${Device.sm}{
  text-align: center;
  font-size: 6vw;
}
@media ${Device.md}{
  text-align: ${props => props.align};
  font-size: 3vw;
}
@media ${Device.lg}{
  text-align: ${props => props.align};
  font-size: 3vw;
}
@media ${Device.xl} {
  text-align: ${props => props.align};
  font-size: 2vw;
}   
font-family: 'Futura', sans-serif;
font-weight: 800;
letter-spacing: -1px;
text-transform: ${props => props.uppercase && "uppercase"};
color: ${props => props.color};
`;
export const H4 = styled.h4`
@media ${Device.xs}{
  text-align: center;
  font-size: 5vw;
}
@media screen ${Device.sm}{
  text-align: center;
  font-size: 5vw;
}
@media ${Device.md}{
  text-align: ${props => props.align};
  font-size: 14px;
}
@media ${Device.lg}{
  text-align: ${props => props.align};
  font-size: 16px;
}
@media ${Device.xl} {
  text-align: ${props => props.align};
  font-size: 22px;
}   
font-family: 'Futura', sans-serif;
font-weight: 800;
letter-spacing: -1px;
text-transform: ${props => props.uppercase && "uppercase"};
color: ${props => props.color};
font-style: normal;
`;
export const H5 = styled.h5`
  font-size: ${props => props.fontSize};
  line-height: ${props => props.fontHeight};
  text-transform: ${props => props.uppercase && "uppercase"};
  font-style: normal;
  font-family: Lato, sans-serif;
  font-weight: 800;
  color: ${props => props.color};
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

export const Span = styled.span`
      // ${props => props.animated && `css animation:${Blink} 1.2s infinite;`}
      animation:${Blink} 1.2s infinite;
      color: ${props => props.color};
`
export const Separator = styled.div`
  margin: .5rem 0px;
  height: 5px;
  width: 30px;
  border-bottom: ${props => props.primary ? `2px solid ${Colors.yellow} ` : `2px solid ${Colors.lightBlue}`};
`
export const Paragraph = styled.div`
  @media ${Device.xs}{
    text-align: center;
  }
  @media screen ${Device.sm}{
    text-align: center;
  }
  @media ${Device.md}{
    text-align: ${props => props.align};
  }
  @media ${Device.lg}{
    text-align: ${props => props.align};
  }
  @media ${Device.xl} {
    text-align: ${props => props.align};
  }   
  margin: ${props => props.margin};
  font-family: 'Lato-Regular', sans-serif;
  font-size: ${props => props.fontSize};
  font-weight: 300;
  letter-spacing: 0px;
  line-height: ${props => props.lineHeight};
  color: ${props => props.primary ? `${Colors.gray}` : `${props.color}`};
`
export const Title = props => {
  return (
    <>
      {props.fluid ?
        (
          <>
            <Row align="center">{props.primary ? <H1 primary>{props.title}</H1> : <H1>{props.title}</H1>}</Row>
            <Row align="center">{props.primary ? <Separator primary /> : <Separator />}</Row>
            <Row align="center">{props.primary ? <Paragraph primary>{props.paragraph}</Paragraph> : <Paragraph color={props.paragraphColor}>{props.paragraph}</Paragraph>}</Row>
          </>
        )
        :
        (
          <Row align="center">
            <Column size={props.size}>
              <Row align="center">{props.primary ? <H3 primary>{props.title}</H3> : <H3>{props.title}</H3>}</Row>
              <Row align="center">{props.primary ? <Separator primary /> : <Separator />}</Row>
              <Row align="center">{props.primary ? <Paragraph primary>{props.paragraph}</Paragraph> : <Paragraph>{props.paragraph}</Paragraph>}</Row>
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
  fontSize: "12px"
};
H1.defaultProps = {
  color: Colors.black,
  fontSize: "42px"
};