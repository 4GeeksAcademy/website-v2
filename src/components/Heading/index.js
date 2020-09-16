import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../Styling'
import {Column, Row} from '../Sections'
import {Device, Break} from '../Responsive'
import {Blink} from '../Animations'
import Link from 'gatsby-link'
import {redirectTo} from "@reach/router"

const Heading = ({ type, children, className }) => {
  const Comp = type;
return <Comp className={className}>{children}</Comp>;
}
Heading.propTypes = {
  type: PropTypes.string.isRequired,
};
Heading.defaultProps = {
  type: "span",
};

//font-family: 'Lato-Bold', sans-serif;
export const H1 = styled(Heading)`
display: block;
font-family: 'Futura', sans-serif;
font-weight: 500;
letter-spacing: 0px;
font-size: ${props => props.fontSize};
color: ${props => props.color};
text-shadow: ${props => props.textShadow}; 
margin-top: ${props => props.marginTop || "initial"}; 
text-transform: ${props => props.uppercase && "uppercase"};
text-align: ${props => props.align};
@media ${Device.xs}{
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
`;
export const H2 = styled(Heading)`
    display: block;
    text-align: ${props => props.align || "center"};
    padding: ${props => props.padding};
    font-family: 'Futura', sans-serif;
    font-weight: 800;
    margin: ${props => props.margin};
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
export const H3 = styled(Heading)`
display: block;
text-align: ${props => props.align || "center"};
font-family: 'Futura', sans-serif;
margin: ${props => props.margin};
font-weight: 400;
letter-spacing: -1px;
text-transform: ${props => props.uppercase && "uppercase"};
color: ${props => props.color};
font-size: ${props=>props.fs_xl}

@media ${Break.lg}{
  font-size: ${props => props.fs_lg};
}
@media ${Break.md}{
  font-size: ${props => props.fs_md};
}
@media  ${Break.sm}{
  text-align: ${props => props.align_sm || "center"};
  font-size: ${props => props.fs_sm};
  padding: 0 5px;
}
@media ${Break.xs}{
  text-align: ${props => props.align_xs};
  font-size: ${props => props.fs_xs};
  padding: 0.5px;
}
`;
export const H4 = styled(Heading)`
display: block;
text-align: ${props => props.align || "center"};
font-family: 'Futura', sans-serif;
margin: ${props => props.m};
font-weight: ${props => props.fontWeight};
letter-spacing: -1px;
padding: ${props => props.padding};
text-transform: ${props => props.uppercase && "uppercase"};
color: ${props => props.color};
background-color: ${props => props.bg};
&:hover{
  background-color: ${props => props.bgHover || props.bg};
}
text-shadow: ${props => props.textShadow};
font-style: normal;

@media ${Break.lg}{
  font-size: ${props => props.fs_lg};
}
@media ${Break.md}{
  font-size: ${props => props.fs_md};
}
@media  ${Break.sm}{
  font-size: ${props => props.fs_sm};
}
@media ${Break.xs}{
  font-size: ${props => props.fs_xs};
}  
`;
export const H5 = styled(Heading)`
      display: block;
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
const StyledSeparator = styled.div`
  text-align: ${props => props.align || "center"};
  margin: ${props => props.left ? props.margin : "auto"};
  margin-top: 10px;
  margin-bottom: 15px;
  height: 5px;
  width: ${props => props.width};
  border-bottom: ${props => props.border};

  @media  ${Break.sm}{
    margin-left: ${props => props.ml_sm || "auto"};
    margin-right: auto;
    width: ${props => props.width_sm || "50px"};
  }
  @media  ${Break.xs}{
    margin-left: auto;
    margin-right: auto;
    width: ${props => props.width_xs};
  }
};
`
export const Separator = ({ variant, children, ...rest }) => {
  let variants = {
    default: {
      border: `2px solid ${Colors.lightBlue}`,
    },
    primary: {
      border: `2px solid ${Colors.yellow}`,
    },
    main: {
      border: `2px solid ${Colors.yellow}`,
    },
    small: {
      border: `none`,
    },
  }
  let props = { ...rest, ...variants[variant] };
  return <StyledSeparator {...props}>{children}</StyledSeparator>
}
Separator.propTypes = {
  variant: PropTypes.string,
};
Separator.defaultProps = {
  variant: 'default',
};

export const Paragraph = styled.div`
  maxWidth: ${props => props.maxWidth};
  cursor: ${props => props.cursor};
  margin: ${props => props.margin};
  font-size: ${props => props.fontSize};
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.fontWeight};
  max-width: ${props => props.maxWidth};
  padding: ${props => props.padding};
  padding-right: ${props => props.paddingRight || "innitial"};
  letter-spacing: 0px;
  text-shadow: ${props => props.textShadow}; 
  line-height: ${props => props.lineHeight};
  color: ${props => props.color};
  text-align: ${props => props.align};

  @media ${Break.lg}{
    text-align: ${props => props.align_lg};
    font-size: ${props => props.fs_lg};
  }
  @media ${Break.md}{
    text-align: ${props => props.align};
    font-size: ${props => props.fs_md};
  }
  @media ${Break.sm}{
    display: ${props => props.display_sm};
    font-size: ${props => props.fs_sm};
    margin: ${props => props.m_sm};
    text-align: ${props => props.align_sm || 'center'};
  }
  @media ${Break.xs}{
    font-size: ${props => props.fs_xs};
    text-align: ${props => props.align_xs};
  } 
`
export const Anchor = styled(Link)`
  display: block;
  font-family: Lato,sans-serif;
  maxWidth: ${props => props.maxWidth};
  cursor: ${props => props.cursor};
  margin: ${props => props.margin};
  font-size: ${props => props.fontSize};
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.fontWeight};
  max-width: ${props => props.maxWidth};
  padding: ${props => props.padding};
  padding-right: ${props => props.paddingRight || "innitial"};
  letter-spacing: 0px;
  text-shadow: ${props => props.textShadow}; 
  line-height: ${props => props.lineHeight};
  color: ${props => props.color};
  text-align: ${props => props.align};

  @media ${Break.lg}{
    text-align: ${props => props.align_lg};
    font-size: ${props => props.fs_lg};
  }
  @media ${Break.md}{
    text-align: ${props => props.align};
    font-size: ${props => props.fs_md};
  }
  @media ${Break.sm}{
    display: ${props => props.display_sm};
    font-size: ${props => props.fs_sm};
    text-align: ${props => props.align_sm || 'center'};
  }
  @media ${Break.xs}{
    font-size: ${props => props.fs_xs};
    text-align: ${props => props.align_xs};
  } 
`

export const Title = props => {
  const variants = {
    default: {
      headingComponent: H2,
      align: "center",
    },
    primary: {
      headingComponent: H2,
      fontSize: '20px',
      fontWeight: '500',
      align: "center",
    },
    small: {
      headingComponent: H3,
      fontSize: '18px',
      fontWeight: '300',
      align: "left",
    },
    main: {
      headingComponent: H1,
      shadow: "0px 0px 4px black",
      align: "center",
    }
  }
  const theme = variants[props.variant]
  const HeadingType = theme.headingComponent;
  return (
    <div style={{ marginBottom: "30px "}}>
      <HeadingType type={props.type} align={theme.align} 
        color={props.color} 
        marginTop={props.marginTop} 
        fontSize={props.fontSize} 
        fs_xs={props.fs_xs} 
        align={props.textAlign}
      >
        {props.title}
      </HeadingType>
      <Separator align="center" variant={props.variant} />
        {props.paragraph && props.paragraph.split('\\n').map((content,i) => 
          <Paragraph key={i}
            align="center"
            onClick={() => props.linkTo && redirectTo(props.linkTo)}
            color={props.paragraphColor}
            fontFamily={props.fontFamily}
            maxWidth={props.maxWidth}
            fontSize={theme.fontSize}
            fontWeight={theme.fontWeight}
            margin={props.margin}
            textShadow={theme.shadow}
          >
            {content}
          </Paragraph>
        )}
    </div>
  )
}
Title.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string,
  content: PropTypes.func,
  size: PropTypes.string,
  paragraphColor: PropTypes.string,
  paragraphShadow: PropTypes.string,
};
Title.defaultProps = {
  variant: "default",
  margin: "0",
  paragraph: "",
  paragraphColor: "white"
}
// H2.propTypes = {
//   primary: PropTypes.bool.isRequired,
// }
Paragraph.defaultProps = {
  fontSize: "16px",
  fontFamily: "Lato, sans-serif",
  fontWeight: "300",
  marginTop: "40px",
  color: "#898a8b"
};
Separator.defaultProps = {
  width: "50px",
  margin: "",
  border: `2px solid black`
};
H1.defaultProps = {
  // color: Colors.black,
  fontSize: "42px",
  textShadow: "0px 0px 4px black"
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
  fs_xs: '5vw',
  fontWeight: '400',
};
