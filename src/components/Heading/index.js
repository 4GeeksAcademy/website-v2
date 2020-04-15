import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors, Icons} from '../../components/Styling'
import {Column, Row} from '../Sections'
import {Device} from '../Responsive'
import {Blink} from '../Animations'
import Link from 'gatsby-link'

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
@media ${Device.xs}{
  font-size: ${props => props.fontSizeXs}
}
@media  ${Device.sm}{
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
`;
export const H2 = styled.h2`
    @media ${Device.xs}{
      text-align: center;
      font-size: ${props => props.fs_xs};
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
    font-family: 'Futura', sans-serif;
    font-weight: 800;
    letter-spacing: -2px;
    text-transform: ${props => props.uppercase && "uppercase"};
    color: ${props => props.color};
`;
export const H3 = styled.h3`
@media ${Device.xs}{
  text-align: center;
  font-size: ${props => props.fs_xs};
  padding: 0.5px;
}
@media  ${Device.sm}{
  // text-align: center;
  font-size: ${props => props.fs_sm};
  padding: 0 5px;
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

font-family: 'Futura', sans-serif;
margin: ${props => props.margin};
font-weight: 800;
letter-spacing: -1px;
text-transform: ${props => props.uppercase && "uppercase"};
color: ${props => props.color};
`;
export const H4 = styled.h4`
@media ${Device.xs}{
  text-align: center;
  font-size: ${props => props.fs_xs};
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
font-family: 'Futura', sans-serif;
margin-bottom: 0px;
font-weight: 800;
letter-spacing: -1px;
text-transform: ${props => props.uppercase && "uppercase"};
color: ${props => props.color};
font-style: normal;
`;
export const H5 = styled.h5`
      font-family: 'Lato-Bold', sans-serif;
      font-size: ${props => props.fontSize};
      font-weight: 500;
      letter-spacing: 0px;
      line-height: ${props => props.fontHeight};
      text-transform: ${props => props.uppercase && "uppercase"};
      font-style: normal;
      color: ${props => props.color};
  
    
      @media ${Device.md}{
        text-align: ${props => props.align};
      }
      @media ${Device.xs}{
        text-align: center;
      }
      @media  ${Device.sm}{
        text-align: center;
      }
      @media ${Device.lg}{
        text-align: ${props => props.align};
      }
      @media ${Device.xl} {
        text-align: ${props => props.align};
      }
      
`;

export const Span = styled.span`
      // ${props => props.animated && `css animation:${Blink} 1.2s infinite;`}
      animation:${Blink} 1.2s infinite;
      color: ${props => props.color};
`
export const Separator = styled.div`
  text-align: ${props => props.align};
  margin: ${props => props.margin};
  height: 5px;
  width: ${props => props.width};
  @media ${Device.xs}{
    text-align: ${props => props.al_xs};
    width: 50px;
  }
  @media  ${Device.sm}{
    text-align: ${props => props.al_sm};
    width: 50px;
  }
  @media ${Device.md}{
  }
  @media ${Device.lg}{
  }
  @media ${Device.xl} {
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
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  padding: ${props => props.padding};
  letter-spacing: 0px;
  line-height: ${props => props.lineHeight};
  color: ${props => props.primary ? `${Colors.gray}` : `${props.color}`};
`
export const Title = props => {
  return (
    <>
      {props.main ?
        (
          <>
            <Row align="center">{<H1 color={props.color} fontSize={props.fontSize} align={props.textAlign}>{props.title}</H1>}</Row>
            <Row align="center">{props.primary ? <Separator primary /> : <Separator />}</Row>
            <Row align="center"><Column size="8">{props.primary ? <Link to={props.link}><Paragraph align="center" primary>{props.paragraph}</Paragraph></Link> : <Link to={props.link}><Paragraph align="center" color={props.paragraphColor}>{props.paragraph}</Paragraph></Link>}</Column></Row>
          </>
        )
        :
        (
          <Row align="center">
            <Column size={props.size}>
              <Row align="center"><Column size="12">{props.primary ? <H2 primary align="center">{props.title} </H2> : <H2>{props.title}</H2>}</Column></Row>
              <Row align="center">{props.primary ? <Separator primary /> : <Separator />}</Row>
              <Row align="center">
                {props.primary
                  ? <Column size={props.customParagraphSize} customRespSize respSize="10">
                    <Row align="center">
                      <Link to={props.link}><Paragraph primary margin="10px 0" align="center">{props.paragraph}</Paragraph></Link>
                    </Row>
                  </Column>
                  : <Column size="12"><Link to={props.link}><Paragraph>{props.paragraph}</Paragraph></Link></Column>
                }
              </Row>
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
  content: PropTypes.func,
  size: PropTypes.string,
  paragraphColor: PropTypes.string
};
// H2.propTypes = {
//   primary: PropTypes.bool.isRequired,
// }
Paragraph.defaultProps = {
  fontSize: "14px",
  customParagraphSize: "12",
};
Separator.defaultProps = {
  width: "50px",
  margin: ".5rem 15px"
};
H1.defaultProps = {
  // color: Colors.black,
  fontSize: "42px"
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
};