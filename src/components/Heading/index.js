import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../Styling'
import {Break} from '../Responsive'
import {Blink} from '../Animations'
import {redirectTo} from "@reach/router"

const Heading = ({type, children, className}) => {
  const Comp = type;
  return <Comp className={className}>{children}</Comp>;
}
Heading.propTypes = {
  type: PropTypes.string.isRequired,
};
Heading.defaultProps = {
  type: "span",
};

const BaseHeading = styled(Heading)`
  display: block;
  float: ${props => props.float || "none"};
  width: ${props => props.width || "100%"};
  font-family: 'Lato', sans-serif;
  letter-spacing: 0px;
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize};
  font-style: normal;
  
  color: ${props => props.color};
  margin: ${props => props.margin};
  text-shadow: ${props => props.textShadow}; 
  background-color: ${props => props.bg};
  margin-top: ${props => props.marginTop}; 
  text-transform: ${props => props.uppercase && "uppercase"};
  text-align: ${props => props.align || "center"};
  padding: ${props => props.padding};

  &:hover{
    background-color: ${props => props.bgHover || props.bg};
  }
  @media ${Break.lg}{
    text-align: ${props => props.align};
    font-size: ${props => props.fs_lg};
  }
  @media ${Break.md}{
    text-align: ${props => props.align};
    font-size: ${props => props.fs_md};
  }
  @media  ${Break.sm}{
    text-align: ${props => props.align_sm || "center"};
    font-size: ${props => props.fs_sm};
    margin: ${props => props.m_sm};
  }  
  @media ${Break.xs}{
    text-align: ${props => props.align_xs};
    font-size: ${props => props.fs_xs};
  }
`

export const H1 = styled(BaseHeading)``;

export const H2 = styled(BaseHeading)`
  font-weight: 800;
  letter-spacing: -2px;
`;
export const H3 = styled(BaseHeading)`
font-weight: 400;
letter-spacing: -1px;
`;
export const H4 = styled(BaseHeading)`
letter-spacing: -1px;

`;
export const H5 = styled(BaseHeading)`
  font-weight: 700;
  letter-spacing: 0px;
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
`
export const Separator = ({variant, children, ...rest}) => {
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
  let props = {...rest, ...variants[variant]};
  return <StyledSeparator {...props}>{children}</StyledSeparator>
}
Separator.propTypes = {
  variant: PropTypes.string,
};
Separator.defaultProps = {
  variant: 'default',
};

export const Paragraph = styled.div`
  
  width: ${props => props.width};
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
  height: ${props => props.height};

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
    color: ${props => props.color_sm};
    font-size: ${props => props.fs_sm};
    margin: ${props => props.m_sm};
    text-align: ${props => props.align_sm || 'center'};
    max-width: ${props => props.mw_sm};
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
    shadow: "0px 0px 4px black",
    small: {
      headingComponent: H3,
      fontSize: '18px',
      fontWeight: '300',
      align: "left",
    },
    main: {
      headingComponent: H1,
      shadow: "0px 0px 4px black",
      fontSize: '20px',
      align: "center",
    }
  }
  const theme = variants[props.variant]
  const HeadingType = theme.headingComponent;
  return (
    <div style={{marginBottom: "30px "}}>
      <HeadingType type={props.type} align={theme.align}
        color={props.color}
        marginTop={props.marginTop}
        fontSize={props.fontSize}
        fs_xs={props.fs_xs}
        align={props.textAlign}
        textShadow={theme.shadow}
        padding={props.padding}
      >
        {props.greetings} <br/> {props.title}
      </HeadingType>
      <Separator align="center" variant={props.variant} />
      {props.paragraph && props.paragraph.split('\\n').map((content, i) =>
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
  paragraphColor: "#898a8b"
}
// H2.propTypes = {
//   primary: PropTypes.bool.isRequired,
// }
Paragraph.defaultProps = {
  fontSize: "16px",
  fontFamily: "Lato, sans-serif",
  fontWeight: "500",
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
  fs_md: '30px',
  fs_lg: '30px',
  fontSize: '35px'

};
H3.defaultProps = {
  fs_xs: '4.5vw',
  fs_sm: '4vw',
  fs_md: '25px',
  fs_lg: '25px',
  fontSize: '30px'
};
H4.defaultProps = {
  fontSize: '25px',
  fs_lg: '23px',
  fs_md: '23px',
  fs_sm: '23px',
  fontWeight: '400',
};
