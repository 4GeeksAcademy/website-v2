import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors, Icons} from '../../components/Styling'
import {Column, Row} from '../Sections'
import {Device} from '../Responsive'
import {Blink} from '../Animations'
import Link from 'gatsby-link'
import {redirectTo} from "@reach/router"

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
text-shadow: ${props => props.textShadow}; 
margin-top: ${props => props.marginTop || "initial"}; 
text-transform: ${props => props.uppercase && "uppercase"};
text-align: ${props => props.align};
@media ${Device.xs}{
  font-size: ${props => props.fontSizeXs}
}
@media  ${Device.sm}{
  text-align: center;
  font-size: ${props => props.fs_sm};
}
@media ${Device.md}{
  text-align: ${props => props.align};
  font-size: ${props => props.fs_md};
}
@media ${Device.lg}{
  text-align: ${props => props.align};
  font-size: ${props => props.fs_lg};
}
@media ${Device.xl} {
  text-align: ${props => props.align};
  font-size: ${props => props.fs_xl};
}   
`;
export const H2 = styled.h2`
    text-align: ${props => props.align || "center"};
    font-family: 'Futura', sans-serif;
    font-weight: 800;
    letter-spacing: -2px;
    text-transform: ${props => props.uppercase && "uppercase"};
    color: ${props => props.color};
    @media ${Device.xs}{
      text-align: center;
      font-size: ${props => props.fs_xs};
    }
    @media  ${Device.sm}{
      text-align: center;
      font-size: ${props => props.fs_sm};
    }
    @media ${Device.md}{
      font-size: ${props => props.fs_md};
    }
    @media ${Device.lg}{
      font-size: ${props => props.fs_lg};
    }
    @media ${Device.xl} {
      font-size: ${props => props.fs_xl};
    }   
    `;
export const H3 = styled.h3`
text-align: ${props => props.align || "center"};
font-family: 'Futura', sans-serif;
margin: ${props => props.margin};
font-weight: 400;
letter-spacing: -1px;
text-transform: ${props => props.uppercase && "uppercase"};
color: ${props => props.color};
@media ${Device.xs}{
  font-size: ${props => props.fs_xs};
  padding: 0.5px;
}
@media  ${Device.sm}{
  font-size: ${props => props.fs_sm};
  padding: 0 5px;
}
@media ${Device.md}{
  font-size: ${props => props.fs_md};
}
@media ${Device.lg}{
  font-size: ${props => props.fs_lg};
}
@media ${Device.xl} {
  font-size: ${props => props.fs_xl};
}   

`;
export const H4 = styled.h4`
text-align: ${props => props.align || "center"};
font-family: 'Futura', sans-serif;
margin: ${props => props.m};
font-weight: ${props => props.fontWeight};
letter-spacing: -1px;
text-transform: ${props => props.uppercase && "uppercase"};
color: ${props => props.color};
background-color: ${props => props.bg};
&:hover{
  background-color: ${props => props.bgHover || props.bg};
}
text-shadow: ${props => props.textShadow};
font-style: normal;
@media ${Device.xs}{
  font-size: ${props => props.fs_xs};
}
@media  ${Device.sm}{
  font-size: ${props => props.fs_sm};
}
@media ${Device.md}{
  font-size: ${props => props.fs_md};
}
@media ${Device.lg}{
  font-size: ${props => props.fs_lg};
}
@media ${Device.xl} {
  font-size: ${props => props.fs_xl};
}   
`;
export const H5 = styled.h5`
      font-family: 'Lato', sans-serif;
      font-size: ${props => props.fontSize};
      font-weight: 500;
      letter-spacing: 0px;
      line-height: ${props => props.fontHeight};
      text-transform: ${props => props.uppercase && "uppercase"};
      font-style: normal;
      color: ${props => props.color};
      margin: ${props => props.m};
      text-align: ${props => props.align || "center"};
  
    
      @media ${Device.xs}{
        font-size: ${props => props.fs_xs};
      }
      @media  ${Device.sm}{
        font-size: ${props => props.fs_sm};
      }
      @media ${Device.md}{
        font-size: ${props => props.fs_md};
                      }
      @media ${Device.lg}{
        font-size: ${props => props.fs_lg};
      }
      @media ${Device.xl} {
        font-size: ${props => props.fs_xl};
      }
      
`;

export const Span = styled.span`

      animation:${Blink} 1.2s infinite;
      color: ${props => props.color};
      font-size: ${props => props.fs};
      margin: ${props => props.margin};
`
export const Separator = styled.div`
  text-align: ${props => props.align || "center"};
  margin: ${props => props.left ? props.margin : "auto"};
  margin-top: 10px;
  margin-bottom: 10px;
  height: 5px;
  width: ${props => props.width};

  @media  ${Device.xs}{
    margin-left: auto;
    margin-right: auto;
    width: 50px;
  }

  @media  ${Device.sm}{
    margin-left: auto;
    margin-right: auto;
    width: 50px;
  }

  border-bottom: ${props => props.primary
    ? `2px solid ${Colors.yellow} `
    : `2px solid ${Colors.lightBlue}`

  };
`
export const Paragraph = styled.div`
  @media ${Device.xs}{
    font-size: ${props => props.fs_xs};
    ${props => props.customTextAlignSmall
    ?
    css`text-align: ${props => props.alignXs}`
    :
    css`text-align: text-align: center;`
  }
  }
  @media  ${Device.sm}{
    font-size: ${props => props.fs_sm};
    ${props => props.customTextAlignSmall
    ?
    css`text-align: ${props => props.alignXs}`
    :
    css`text-align: text-align: center;`
  }
  }
  @media ${Device.md}{
    text-align: ${props => props.align};
    font-size: ${props => props.fs_md};
  }
  @media ${Device.lg}{
    text-align: ${props => props.align};
    font-size: ${props => props.fs_lg};
  }
  @media ${Device.xl} {
    text-align: ${props => props.align};
    font-size: ${props => props.fs_xl};
  }   
  margin: ${props => props.margin};
  font-size: ${props => props.fontSize};
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.fontWeight};
  padding: ${props => props.padding};
  padding-right: ${props => props.paddingRight || "innitial"};
  letter-spacing: 0px;
  line-height: ${props => props.lineHeight};
  color: ${props => props.color};
  cursor: ${props => props.cursor === "pointer" && "pointer"};
  // display: flex;
  `
// color: ${props => props.primary ? `${Colors.gray}` : `${props.color}`};
export const Title = props => {
  const HeadingType = props.main ? H1 : H2;
  return (
    <>
      <HeadingType align="center" color={props.color} marginTop={props.marginTop} fontSize={props.fontSize} align={props.textAlign}>{props.title}</HeadingType>
      <Separator align="center" primary={props.primary} />
      <Paragraph
        align="center"
        onClick={() => props.linkTo && redirectTo(props.linkTo)}
        color={props.paragraphColor}
        fontFamily={props.fontFamily}
        size={props.customParagraphSize}
        fontSize={props.primary ? `20px` : null}
        fontWeight={props.primary ? `500` : null}
        margin={`0 0 30px 0`}
      >
        {props.paragraph}
      </Paragraph>
    </>
  )
}
Title.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string,
  content: PropTypes.func,
  size: PropTypes.string,
  paragraphColor: PropTypes.string
};
// H2.propTypes = {
//   primary: PropTypes.bool.isRequired,
// }
Paragraph.defaultProps = {
  fontSize: "16px",
  fontFamily: "Lato, sans-serif",
  fontWeight: "300",
  marginTop: "40px",
  customParagraphSize: "12",
  color: "#898a8b"
};
Separator.defaultProps = {
  width: "50px",
  margin: ""
};
H1.defaultProps = {
  // color: Colors.black,
  fontSize: "42px",
  textShadow: "2px 1px #898a8b"
};
H2.defaultProps = {
  fs_xs: '7.5vw',
  fs_sm: '6vw',
  fs_md: '5vw',
  fs_lg: '4vw',
  fs_xl: '2.5vw'

};
H3.defaultProps = {
  fs_xs: '4.5vw',
  fs_sm: '4vw',
  fs_md: '2.5vw',
  fs_lg: '3vw',
  fs_xl: '2.5vw'

};
H4.defaultProps = {
  fontSizeXs: '5vw',
  fontWeight: '400',
};