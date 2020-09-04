import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors, StyledBackgroundSection} from '../../components/Styling'
import {Device} from '../Responsive'
import {Paragraph} from '../Heading'
import Fragment from "../Fragment"

export const Container = styled(Fragment)`
    ${props =>
        props.width === "fluid"
            ?
            css`
                width: 100%;
                @media ${Device.md}{
                    
                }
                @media ${Device.xs}{
                    // height: auto;
                    padding: ${props => props.p_xs};
                    
                }
                @media  ${Device.sm}{
                    
                    
                }
                @media ${Device.lg}{
                    
                }
                @media ${Device.xl} {
                   
                }
            `
            :
            props.width === "fixed"
            &&
            css`
            @media ${Device.md}{
                max-width: 540px;
            }
            @media ${Device.xs}{
                max-width: 540px;
                
            }
            @media  ${Device.sm}{
                max-width: 720px;
                
            }
            @media ${Device.lg}{
                max-width: 960px;
            }
            @media ${Device.xl} {
                max-width: 1140px;
            }
            `
    }
    
    height: ${props => props.height};
    margin: ${props => props.margin || "initial"};
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    padding-top: ${props => props.p_top};
    padding-bottom: ${props => props.p_bottom};
    background: ${props => props.color};
`
export const Row = styled(Fragment)`
    padding: ${props => props.padding};
    height: ${props => props.height};
    width: ${props => props.width};
    border-top: ${props => props.borderTop};
    ${props => props.border && css`border: ${props.border};`};
    border-bottom: ${props => props.borderBottom};
    border-radius: ${props => props.borderRadius};
    position: ${props => props.position === "absolute" ? "absolute" : props.position === "relative" && "relative"};
    z-index: ${props => props.zIndex};
    display: flex;
    flex-wrap: wrap; 
    // justify-content: ${props => props.justifyContent};
    align-items:${props => props.alignItems};
    margin-right: ${props => props.marginRight};
    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    background: ${props => props.background};
    box-shadow: ${props => props.shadow
        && `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);`
    };
    &:hover { 
        background: ${props => props.backgroundHover};
        margin: ${props => props.marginHover};
        border-radius: ${props => props.borderRadiusHover};
    }
    // ${Paragraph}:hover{
    //     color:${props => props.colorHover};
    // }
    ${props => props.align === "around"
        ? css`justify-content: space-around;`
        : props => props.align === "center"
            ? css`justify-content: center;`
            : props => props.align === "between"
                ? css`justify-content: space-between;`
                : props => props.align === "evenly"
                    ? css`justify-content: space-evenly;`
                    : props => props.align === "end"
                        ? css`justify-content: flex-end;`
                        : css`justify-content: flex-start;`}
    @media ${Device.xs}{
        width: ${props => props.width_xs};
        display: ${props => props.display_xs};
        ${props => props.customRespSize
        ? css`justify-content: ${props => props.alignResp};`
        : css`justify-content: center;`};
    }
        padding: ${props => props.p_xs};
    @media  ${Device.sm}{
        width: ${props => props.width_sm};
        display: ${props => props.display_sm};
        ${props => props.customRespSize
        ? css`justify-content: ${props => props.alignResp};`
        : css`justify-content: center;`};
        ${props => props.RespSm
        && css`
            padding-left: 15px;
            padding-right: 15px;`
    }
        
    }
    @media ${Device.md}{
    }
    @media ${Device.lg}{
    }
    @media ${Device.xl} {
    } 
    `

export const Sidebar = styled.div`
position: absolute;
left: 40px;
box-shadow: ${props => props.shadow
        && `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);`
    }

border-radius: ${props => props.borders};

@media ${Device.xs}{
    display: ${props => props.display_xs};
}
@media  ${Device.sm}{
    display: ${props => props.display_sm};
}
@media ${Device.md}{
    display: ${props => props.display_md};
    
}
@media ${Device.lg}{
    position: sticky;
    top: 12%;
    width: 160px;
    left:15px;
    padding: 15px;
}
@media ${Device.xl} {
    position: -webkit-sticky;
    position: sticky;
    top: 12%;
    width: 180px;
    left: 20px;
    padding: 15px;
} 

`
export const Div = styled.div`
    display: flex;
    flex-wrap: nowrap; 
    flex-direction: ${props => props.flexDirection === 'column' ? 'column' : 'row'};
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    align-content: ${props => props.alignContent};
    height: ${props => props.height};
    width: ${props => props.width};
    margin: ${props => props.margin};
    position: ${props => props.position};
    background: ${props => props.background};
    border-radius: ${props => props.borderRadius};
    padding: ${props => props.padding};
    cursor: ${props => props.cursor};
    @media ${Device.xs}{
        align-items: ${props => props.alignItems_xs};
    }
    @media  ${Device.sm}{
        align-items: ${props => props.alignItems_sm};
    }
    @media ${Device.md}{        
    }
    @media ${Device.lg}{
    }
    @media ${Device.xl} {
    } 
`
export const Column = styled.div`
    padding: ${props => props.padding};
    height: ${props => props.height};
    margin: ${props => props.margin};
    text-align: ${props => props.align || "left"};
    position: relative;
    width: 100%;
    background: ${props => props.background};
    border: ${props => props.borderStyle};
    align-self: ${props => props.alignSelf};
    padding-right: ${props => props.paddingRight};
    padding-left: ${props => props.paddingLeft};
    display: ${props => props.display};
    flex-direction: ${props => props.flexDirection};
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    ${props => props.masonry && 'display: inline-block;'}
    ${props =>
        props.border === "bottom"
            ?
            css`
                    border-radius: 0 0 0 1.25rem;
                    `
            : props.border === "top"
                ?
                css`
                        border-radius: 1.25rem 0 0 0;
                    `
                : props.border === "custom"
                &&
                css`
                        border-radius: ${props.customBorderRadius};
                    `
    }
        ${props => !props.imageData && css`background: ${props => props.color};`
    }


${props =>
        props.size
            &&
            props.customRespSize
            ?
            css`
            @media ${Device.xs}{
                flex: 0 0 ${(props.respSize / 12) * 100}%;
                max-width: ${(props.respSize / 12) * 100}%;
                height: ${props => props.h_xs};
                border-radius: ${props => props.br_xs};
                text-align: ${props => props.t_align === "left" ? "left" : props.t_align === "right" ? "right" : "center"};
                margin: ${props => props.m_xs};
                padding: ${props => props.p_xs};
                display: ${props => props.disp_xs};
                
            }
            @media ${Device.sm}{
                flex: 0 0 ${(props.respSize / 12) * 100}%;
                max-width: ${(props.respSize / 12) * 100}%;
                height: ${props => props.h_sm};
                border-radius: ${props => props.br_sm};
                text-align: ${props => props.t_align === "left" ? "left" : props.t_align === "right" ? "right" : "center"};
                margin-bottom: ${props => props.respSizeMargin};
                margin: ${props => props.m_sm};
                padding: ${props => props.p_sm};
                display: ${props => props.disp_sm};
            }
            @media ${Device.md}{
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
                text-align: ${props => props.align};
                margin-bottom: ${props => props.respSizeMargin};
                border-radius: ${props => props.br_md};
                margin: ${props => props.m_md};
                padding: ${props => props.p_md};
                height: ${props => props.h_md};
                display: ${props => props.disp_md};
            }
            @media ${Device.lg}{
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
                text-align: ${props => props.align};
            }
            @media ${Device.xl} {
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
                text-align: ${props => props.align};
            }
            `
            :
            css`
            @media ${Device.xs}{
                flex: 0 0 '100%';
                max-width: 100%;
                // height: 300px;
                border-radius: 0 0 0 0;
                text-align: ${props => props.alignXs};
                
            }
            @media  ${Device.sm}{
                flex: 0 0 100%;
                max-width: 100%;
                // height: 300px;
                border-radius: 0 0 0 0;
                text-align: ${props => props.alignSm};
                padding-left: ${props => props.pl_sm};
                
            }
            @media ${Device.md}{
                // flex: 0 0 100%;
                // max-width: 100%;
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
                // text-align: center;
                text-align: ${props => props.align};
                padding-left: ${props => props.pl_md};
                
            }
            @media ${Device.lg}{
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
                text-align: ${props => props.align};
                padding-left: ${props => props.pl_lg};
            }
            @media ${Device.xl} {
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
                text-align: ${props => props.align};
            }
`
    }
`

export const Wrapper = (props) => {
    return <Container margin={props.margin} github={props.github} fluid>
        <Row>
            <Column size="1" />
            <Column
                size="11"
                url={props.image}
                border={props.border}
                customBorderRadius={props.customBorderRadius}
                color={props.background}
                align={props.align}
                height={props.height}
                backgroundSize={props.backgroundSize}
            >
                <Row padding={`20px 0`}>
                    <Column size="1" />
                    <Column
                        size="9"
                        height={props.height}
                    >
                        {props.children}
                    </Column>
                </Row>
            </Column>
        </Row>
    </Container>
}

export const WrapperImage = (props) => {
    return <Container margin={props.margin} github={props.github} fluid>
        <Row>
            <Column size="1" />
            <Column
                size="11"
                url={props.image}
                border={props.border}
                customBorderRadius={props.customBorderRadius}
                color={props.background}
                align={props.align}
                height={props.height}
                backgroundSize={props.backgroundSize}
            ><StyledBackgroundSection
                className={props.className}
                height={props.height}
                borderRadius={props.customBorderRadius}
                image={props.imageData}
                bgSize={props.bgSize}
                alt={props.alt}
                filter={props.filter}
            >
                    <Row>
                        <Column
                            size="9"
                            margin="0 auto"
                            height={props.height}
                        >
                            {props.children}
                        </Column>
                    </Row>
                </StyledBackgroundSection>
            </Column>
        </Row>
    </Container>
}
WrapperImage.defaultProps = {
    customBorderRadius: "10px 10px"
};

export const WrapperCustom = (props) => {
    return <Container width={props.width}>
        <Row>
            <Column size={props.outerLeftCol} ></Column>
            <Column
                size={props.outerRightCol}
                url={props.image}
                border={props.border}
                customBorderRadius={props.customBorderRadius}
                color={props.background}
            >
                {props.full
                    ?
                    <Row align={props.innerLeftRowAlign}>
                        <Column size={props.innerLeftCol} >{props.content}</Column>
                        <Column size={props.innerRightCol}>
                            {props.children}
                        </Column>
                    </Row>
                    :
                    props.children
                }
            </Column>
        </Row>
    </Container>
}

export const Divider = props => {
    const Height = styled.div`
        height: ${props.height}
    `;
    return (
        <Height></Height>
    )
};


Container.propTypes = {
    color: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    marginLeft: PropTypes.string,
    borderTopLeft: PropTypes.string,
    borderBottomLeft: PropTypes.string,
}
// Container.defaultProps = {
//     borderBottomLeft: '1.25rem',
// };
Container.defaultProps = {
    p_xs: '30px 0',
};
Row.defaultProps = {
    marginLeft: '-15px',
    marginRight: '-15px',
};
Column.defaultProps = {
    paddingLeft: '15px',
    paddingRight: '15px',
    alignXs: 'center',
    alignSm: 'center',
};
// Column.defaultProps = {
//     align: 'center',
// };
Wrapper.defaultProps = {
    width: 'fluid',
    variant: 'default',
    outerLeftCol: '1',
    outerRightCol: '11',
    innerLeftCol: '1',
    innerRightCol: '10',
};


Divider.propTypes = {
    height: PropTypes.string
};


