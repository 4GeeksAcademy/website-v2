import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../Styling'
import {Break} from '../Responsive'
import {Devices} from '../Responsive'
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
  display: ${props => props.display || "block"};
  float: ${props => props.float || "none"};
  width: ${props => props.width || "100%"};
  font-family: 'Lato', sans-serif;
  letter-spacing: ${props => props.letterSpacing};
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize};
  line-height: ${props => props.lineHeight};
  font-style: normal;
  color: ${props => props.color};
  margin: ${props => props.margin};
  text-shadow: ${props => props.textShadow}; 
  background-color: ${props => props.background};
  margin-top: ${props => props.marginTop}; 
  text-transform: ${props => props.textTransform};
  text-align: ${props => props.textAlign || "center"};
  padding: ${props => props.padding};
  border-bottom: ${props => props.borderBottom};

  &:hover{
    background-color: ${props => props.bgHover || props.bg};
    color: ${props => props.colorHover};
  }
  @media ${Devices.xxs}{

  }
  @media ${Devices.xs}{
      
  }
  @media  ${Devices.sm}{
    text-align: ${props => props.textAlign_sm};
    
  }
  @media  ${Devices.tablet}{
    text-align: ${props => props.textAlign_tablet};
    font-size: ${props => props.fontSize_tablet};
    lineHeight: ${props => props.lineHeight_tablet};
    margin: ${props => props.margin_tablet};
    padding: ${props => props.padding_tablet};
    display: ${props => props.display_tablet};
  }
  @media  ${Devices.md}{
    font-size: ${props => props.fontSize_md};
    text-align: ${props => props.textAlign_md};
    lineHeight: ${props => props.lineHeight_md};
    display: ${props => props.display_md};
    margin: ${props => props.margin_md};
    width: ${props => props.width_md};
    padding: ${props => props.padding_md};
  }
  @media  ${Devices.lg}{

  }
  @media  ${Devices.xl}{

  }
  @media  ${Devices.xxl}{

  }
`

export const H1 = styled(BaseHeading)`
  z-index: ${props => props.zIndex};
`;

export const H2 = styled(BaseHeading)`
  z-index: ${props => props.zIndex};
  letter-spacing: 0.05em;
`;
export const H3 = styled(BaseHeading)`
  font-weight: ${props => props.fontWeight || "700"};
  font-size: ${props => props.fonSize};
  text-align: ${props => props.textAlign};
  letter-spacing: 0.05em;
`;
export const H4 = styled(BaseHeading)`
font-weight: ${props => props.fontWeight || "400"};
  letter-spacing: 0.05em;

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

export const Paragraph = styled.p`
  display: ${props => props.display};
  direction: ${props => props.direction};
  width: ${props => props.width || "100%"};
  cursor: ${props => props.cursor};
  margin: ${props => props.margin || "0"};
  font-size: ${props => props.fontSize};
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.fontWeight || "400"};
  max-width: ${props => props.maxWidth};
  padding: ${props => props.padding};
  padding-right: ${props => props.paddingRight || "innitial"};
  letter-spacing: ${props => props.letterSpacing};
  text-shadow: ${props => props.textShadow}; 
  line-height: ${props => props.lineHeight};
  color: ${props => props.color};
  text-align: ${props => props.textAlign || "center"};
  height: ${props => props.height};
  border-left: ${props => props.borderLeft};

  @media ${Devices.xxs}{
  }
  @media ${Devices.xs}{
      padding: ${props => props.padding_xs}
  }
  @media  ${Devices.sm}{
      width: ${props => props.width_sm};
      padding: ${props => props.padding_sm};
  }
  @media  ${Devices.tablet}{
      display: ${props => props.display_tablet};
      justify-content: ${props => props.justifyContent};
      width: ${props => props.width_tablet};
      font-size: ${props => props.fontSize_tablet};
      text-align: ${props => props.textAlign_tablet};
      padding: ${props => props.padding_tablet};
      margin: ${props => props.margin_tablet};
    }
    @media  ${Devices.md}{
      text-align: ${props => props.textAlign_md};
      margin: ${props => props.margin_md};
      padding: ${props => props.padding_md};
  }
  @media  ${Devices.lg}{

  }
  @media  ${Devices.xl}{

  }
  @media  ${Devices.xxl}{

  }
`

export const Title = props => {
  const variants = {
    default: {
      headingComponent: H2,
      textAlign: "center",
    },
    primary: {
      headingComponent: H2,
      fontSize: '15px',
      fontWeight: '900',
      fontWeight_p: '400',
      lineHeight_p: '22px',
      textAlign: "center",
    },
    shadow: "0px 0px 4px black",
    small: {
      headingComponent: H3,
      fontSize: '18px',
      fontWeight: '300',
      textAlign: "left",
    },
    main: {
      headingComponent: H1,
      shadow: "0px 0px 4px black",
      fontSize: '20px',
      textAlign: "center",
    }
  }
  const theme = variants[props.variant]
  const HeadingType = theme.headingComponent;
  return (
    <div style={{marginBottom: "30px "}}>
      <HeadingType
        type={props.type}
        align={theme.textAlign}
        color={props.color}
        marginTop={props.marginTop}
        fontSize={props.fontSize}
        fs_xs={props.fs_xs}
        textAlign={props.textAlign}
        textShadow={theme.shadow}
      >
        {props.title}
      </HeadingType>
      {props.paragraph && props.paragraph.split('\\n').map((content, i) =>
        <Paragraph key={i}
          textAlign="center"
          onClick={() => props.linkTo && redirectTo(props.linkTo)}
          color={props.paragraphColor}
          fontFamily={props.fontFamily}
          maxWidth={props.maxWidth}
          fontSize={theme.fontSize}
          fontWeight={theme.fontWeight_p}
          margin={props.margin}
          textShadow={theme.shadow}
          display="none"
          display_tablet="block"
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
  fontFamily: "Lato, sans-serif",
  fontSize: "15px",
  lineHeight: "22px",
  textAlign: "center",
  color: `${Colors.darkGray}`,
};
Separator.defaultProps = {
  width: "50px",
  margin: "",
  border: `2px solid black`
};
H1.defaultProps = {
  fontSize: "13px",
  lineHeight: "16px",
  fontWeight: "700",
  letterSpacing: '0.05em'
};
H2.defaultProps = {
  fontSize: '30px',
  lineHeight: '36px',
  fontWeight: '700'

};
H3.defaultProps = {
  fontSize: '22px',
  lineHeight: '26px'
};
H4.defaultProps = {
  fontSize: '15px',
  lineHeight: '26px',
  letterSpacing: '0.05em'
};
