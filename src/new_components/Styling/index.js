import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {Break} from '../Responsive';
import {Devices} from '../Responsive';
import BackgroundImage from 'gatsby-background-image'
import {Link} from 'gatsby'
import {Location} from '@reach/router'
// COLORS SET

export const Colors = {
    blue: "#00A0DA",
    lightBlue: "#BBEAFC",
    gray: "#898a8b",
    verylightGray: "#F5F5F5",
    lightGray: "#ebebeb",
    lightGreen: "#c4f7b7",
    green: "#20630d",
    darkGray: '#3A3A3A;',
    borderGray: '#ececec',
    yellow: "#FFC718",
    lightYellow: "rgba(255, 183, 24, 0.1)",
    darkYellow: "#FFECBF",
    black: "#000000",
    white: "#FFFFFF",
    red: "red",
    lightRed: "#ffcdc9",

}

export const Select = styled.select`
    background: ${props => props.background};
    color: ${props => props.color};
    appearance: none;
    width: ${props => props.width};
    text-align-last: center;
    border: ${props => props.border};
    font-family: lato, sans-serif;
    padding: 5px;
`
export const Option = styled.option`
    background: green;
    color: black;
`
export const Tooltip = styled.div`
    position: absolute;
    left: 30px;
    bottom: 0;
    transform: translateY(50%);
    height: auto;
    z-index: 1;
    width: 300px;
    opacity: 1;
    // right: -277px;
    border-radius: .25rem;
    margin-bottom: 1em;
    padding: 1em;
    background-color: rgba(137,138,139,1);
    color: white;
    font-size: 1em;
    line-height: 1.2;
    text-align: center;
    -webkit-transition: all .15s ease-in-out;
`
export const RoundImage = styled.div`
    display: ${props => props.display || "block"};
    position: ${props => props.pos};
    background-image: url(${props => props.url} );
    margin-bottom: ${props => props.mb};
    background-repeat: no-repeat;
    background-size:${props => props.bsize};
    border-radius: ${props => props.border};
    margin: ${props => props.margin};
    background-position: ${props => props.position};
    background-color: ${props => props.backgroundColor};
    width: ${props => props.width};
    height: ${props => props.height};
    min-height: ${props => props.minHeight};
    :hover {
        opacity: ${props => props.opacity};
    }
    
    ${props => props.move &&
        css`
        transform: translateY(-${props => props.up});
    `}

    @media ${Break.lg}{
        width: ${props => props.w_lg};
        height: ${props => props.h_lg};
        border-radius: ${props => props.br_lg};
    }
    @media ${Break.md}{
        height: ${props => props.h_md};
        width: ${props => props.w_md};
        border-radius: ${props => props.br_md};
    }
    @media ${Break.sm}{
        
        height: ${props => props.h_sm};
        width: ${props => props.w_sm};
        border-radius: ${props => props.br_sm};
       
    }
    @media ${Break.xs}{
        height: ${props => props.h_xs};
        width: ${props => props.w_xs};
        border-radius: ${props => props.br_xs};
        
    }
`
export const Span = styled.div`
    color: ${props => props.color};
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    ${Tooltip}:hover {
        opacity: ${props => props.opacity};
      }
`

const StyledImage = styled.div`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size:${props => props.backgroundSize || "cover"};
    border-radius: ${props => props.borderRadius};
    background-position: ${props => props.position || "center center"};
    background-color: ${props => props.backgroundColor};
    width: ${props => props.width};
    height: ${props => props.height};
    @media ${Break.sm}{
        height: ${props => props.h_sm};
        width: ${props => props.w_sm};
    }
`
export const Img = React.memo(StyledImage);

export const BackgroundSection = ({children, className, image, height, width, bgSize, borderRadius, margin, withOverlay}) => {
    return (
        <BackgroundImage
            Tag="section"
            loading="eager"
            fadeIn={false}
            className={className}
            borderRadius={borderRadius}
            fluid={image}
        >
            {children}
        </BackgroundImage>
    )
}

export const StyledBackgroundSection = styled(BackgroundSection)`
    width: ${props => props.width || "100%"};
    padding: ${props => props.padding};
    text-align: ${props => props.align};
    background-repeat: no-repeat;
    margin: ${props => props.margin || "auto"};
    opacity: 1;
    background-size: ${props => props.bgSize || "cover"};
    height: ${props => props.height};
    max-width: ${props => props.maxWidth};
    &:before, &:after {
        border-radius: ${props => props.borderRadius};
        filter: ${props => props.filter};
        height: ${props => props.h_sm};
        max-width: ${props => props.maxWidth};
        background-color: ${props => props.backgroundColor};
        background-position: ${props => props.backgroundPosition} !important;
    }
    @media ${Break.lg}{
        &:before, &:after {
            background-position: ${props => props.bp_lg} !important;
        }
    }
    @media ${Break.md}{
        &:before, &:after {
            background-position: ${props => props.bp_md} !important;
        }
    }
    @media ${Break.sm}{
        height: ${props => props.h_sm};
        width: ${props => props.w_sm};
        &:before, &:after {
            border-radius: ${props => props.borderRadius_sm};
            background-position: ${props => props.bp_sm} !important;
        }
    }
    @media ${Break.xs}{
        width: ${props => props.w_xs};
        &:before, &:after {
            background-position: ${props => props.bp_xs} !important;
        }
    }
  `


export const Small = styled.small`
    display: ${props => props.display};
`

const getVariant = (props) => ({
    "true": {
        border: `1px solid ${props.color}`,
        background: "initial",
        color: props.color,
    },
    "false": {
        border: "none",
        background: props.color,
        color: props.textColor || "white"
    }
})
const SmartButton = ({children, onClick, type, ...rest}) => {
    const styles = getVariant(rest)[rest.outline];
    return <button type={type || "button"} onClick={(e) => onClick && onClick(e)} className={rest.className} style={{...rest.style, ...styles}} >{children}</button>;
}
export const Button = styled(SmartButton)`
    font-size: ${props => props.fontSize || '14rem'};
    font-family: ${props => props.font || "'Lato', sans-serif"};
    text-transform: ${props => props.textTransform || "uppercase"};
    font-weight: 700;
    margin: ${props => props.margin};
    border-radius: ${props => props.borderRadius};
    position: ${props => props.position};
    display: ${props => props.display};
    padding: ${props => props.padding};
    transform: ${props => props.transform};

    color: ${props => props.border};
    background: ${props => props.background};
    border: ${props => props.color};
    height: ${props => props.height};
    cursor: pointer;
    text-align: center;
    letter-spacing: 0px;
    line-height: 1.5;
    vertical-align: middle;
    width: ${props => props.width};
    max-width: ${props => props.maxWidth};
    min-width: ${props => props.minWidth};
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    box-shadow: ${props => props.shadow};

    &:hover {
        background-color: ${props => props.colorHover || props.color};
    }
    @media ${Break.lg}{
        font-size: ${props => props.fs_lg};
    }
    @media ${Break.md}{
        font-size: ${props => props.fs_md};
        margin: ${props => props.m_md};
    }
    @media ${Break.sm}{
        margin: ${props => props.m_sm};
        font-size: ${props => props.fs_sm};
    }
`;
Button.defaultProps = {
    padding: '10px 30px',
    fontSize: '12px',
    width: 'fit-content',
    type: 'button',
    colorHover: null,
    borderRadius: '3px',
    outline: false,
    onClick: null,
    display: 'inline-block'
};

export const Toggle = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    background: ${props => props.bg};
    color: ${props => props.color};
    border-radius: ${props => props.b_radius};
    cursor: pointer;
    vertical-align: middle;
    display: inline-block;
    font-family: lato, sans-serif;
    
`

RoundImage.defaultProps = {
    width: '100%',
    backgroundColor: Colors.white
};
Select.defaultProps = {
    background: Colors.white,
    color: Colors.black,
    border: 'none',
};


const SmartLink = ({children, state, ...rest}) => (
    <Location>
        {({location}) => (
            //make sure user's state is not overwritten
            <Link {...rest} state={{prevUrl: location.href, ...state}}>
                { children}
            </Link>
        )}
    </Location>
)

export {SmartLink as Link}


const linkRegex = new RegExp("(tel:|http)")
const StyledLink = ({children, ...rest}) => {
    let Comp = Link;
    let props = {}
    if (linkRegex.test(rest.to)) {
        props.href = rest.to;
        props.target = "_blank";
        props.rel = "noopener noreferrer nofollow"
        Comp = "a";
    }
    else if (!rest.to || rest.to.charAt(0) === "#" || rest.to === "") {
        Comp = "label";
    }
    return <Comp {...Object.assign(props, rest)}>
        {children}
    </Comp>;
};
export const Anchor = styled(StyledLink)`
  display: ${props => props.display || "block"};
  font-family: Lato,sans-serif;
  text-align: ${props => props.textAlign};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  letter-spacing: 0.05em;
  text-transform: ${props => props.textTransform};
  maxWidth: ${props => props.maxWidth};
  cursor: ${props => props.cursor};
  margin: ${props => props.margin};
  max-width: ${props => props.maxWidth};
  padding: ${props => props.padding};
  padding-right: ${props => props.paddingRight || "innitial"};
  text-shadow: ${props => props.textShadow}; 
  line-height: ${props => props.lineHeight};
  color: ${props => props.color};
  &:hover{
    text-decoration: underline;
  }
    @media ${Devices.xxs}{

    }
    @media ${Devices.xs}{
        
        
    }
    @media  ${Devices.sm}{
        
    }
    @media  ${Devices.tablet}{
        
    }
    @media  ${Devices.md}{

    }
    @media  ${Devices.lg}{

    }
    @media  ${Devices.xl}{

    }
    @media  ${Devices.xxl}{

    }

`
//   @media ${Break.lg}{
//     text-align: ${props => props.align_lg};
//     font-size: ${props => props.fs_lg};
//   }
//   @media ${Break.md}{
//     text-align: ${props => props.align};
//     font-size: ${props => props.fs_md};
//   }
//   @media ${Break.sm}{
//     display: ${props => props.display_sm};
//     font-size: ${props => props.fs_sm};
//     text-align: ${props => props.align_sm || 'center'};
//   }
//   @media ${Break.xs}{
//     font-size: ${props => props.fs_xs};
//     text-align: ${props => props.align_xs};
//   } 