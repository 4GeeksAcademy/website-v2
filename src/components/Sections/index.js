import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../../components/Styling'
import {Device} from '../Responsive'
import {Paragraph} from '../Heading'

export const Container = styled.div`
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
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    padding-top: ${props => props.p_top};
    padding-bottom: ${props => props.p_bottom};
    background: ${props => props.color};
`
export const Row = styled.div`
    height: ${props => props.height};
    border-bottom: ${props => props.borderBottom};
    display: flex;
    flex-wrap: wrap;
    align-items:${props => props.alignItems};
    margin-right: ${props => props.marginRight};
    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    background: ${props => props.background};
    &:hover { 
        background: ${props => props.backgroundHover};
        border-radius: .25rem;
    }
    // ${Paragraph}:hover{
    //     color:${props => props.colorHover};
    // }
    ${props => props.align === "around"
        ? css`justify-content: space-around;`
        : props => props.align === "center"
            ? css`justify-content: center;`
            : css`justify-content: left;`}
    @media ${Device.xs}{
        display: ${props => props.display_xs};
        ${props => props.customRespSize
        ? css`justify-content: ${props => props.alignResp};`
        : css`justify-content: center;`};
    }
        padding: ${props => props.p_xs};
    @media  ${Device.sm}{
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
    padding: 15px 0 1px 0;
}
@media ${Device.xl} {
    position: sticky;
    top: 12%;
    width: 180px;
    left: 20px;
    padding: 15px 0 1px 0;
} 

`

export const Column = styled.div`
padding: ${props => props.padding};
height: ${props => props.height};
margin: ${props => props.margin};
position: relative;
width: 100%;
border: ${props => props.borderStyle};
align-self: ${props => props.alignSelf};
padding-right: ${props => props.paddingRight};
padding-left: ${props => props.paddingLeft};
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

${props =>
        props.image === "yes"
            ?
            css`
                background-image: url(${props => props.url});
                background-size: ${props => props.backgroundSize};
                background-repeat: no-repeat;
                height: ${props => props.height};
                
    `
            : props.image === "no"
            &&
            css`
                background: ${props => props.color};
`}

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
                text-align: center;
                margin: ${props => props.m_xs};
                display: ${props => props.disp_xs};
                
            }
            @media ${Device.sm}{
                flex: 0 0 ${(props.respSize / 12) * 100}%;
                max-width: ${(props.respSize / 12) * 100}%;
                height: ${props => props.h_sm};
                border-radius: ${props => props.br_sm};
                text-align: center;
                margin-bottom: ${props => props.respSizeMargin};
                margin: ${props => props.m_sm};
                display: ${props => props.disp_sm};
            }
            @media ${Device.md}{
                flex: 0 0 ${(props.respSize / 12) * 100}%;
                max-width: ${(props.respSize / 12) * 100}%;
                text-align: ${props => props.align};
                margin-bottom: ${props => props.respSizeMargin};
                border-radius: ${props => props.br_md};
                margin: ${props => props.m_md};
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
            @media ${Device.md}{
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
                text-align: ${props => props.align};
                padding-left: ${props => props.pl_md};
                
            }
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

export const Wrapper = props => {
    if (props.style === "default") {
        return (
            <Container fluid>
                <Row>
                    <Column size="1" />
                    <Column
                        size="11"
                        image={props.image}
                        url={props.url}
                        border={props.border}
                        color={props.color}
                        align={props.align}
                        height={props.height}
                        backgroundSize={props.backgroundSize}>
                        <Row>
                            <Column size="1" />
                            <Column
                                size="9"
                                image={props.outerImage}
                                url={props.outerUrl}
                                border={props.outerBorder}
                                color={props.outerColor}
                                align={props.outerAlign}
                                height={props.height}
                            >
                                {props.children}
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Container>
        )
    }
    if (props.style === "custom") {
        return (
            <Container width={props.width}>
                <Row>
                    <Column size={props.outerLeftCol} />
                    <Column
                        size={props.outerRightCol}
                        image={props.image}
                        url={props.url}
                        border={props.border}
                        color={props.color}
                        props>
                        {props.full
                            ?
                            <Row>
                                <Column size={props.innerLeftCol} />
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
        )
    }

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
    outerLeftCol: '1',
    outerRightCol: '11',
    innerLeftCol: '1',
    innerRightCol: '10',

};

Divider.propTypes = {
    height: PropTypes.string
};


