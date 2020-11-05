import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors, StyledBackgroundSection} from '../../components/Styling'
import {Break} from '../Responsive'
import Fragment from "../Fragment"

const containerVariants = {
    fluid: {
        width: "100%"
    },
    fixed: {
        width: "inherit"
    }
}
export const Container = styled(Fragment)`

    ${props => props.variant === "fixed" ?
        css`
            max-width: 1140px;
            @media ${Break.lg}{
                max-width: 960px;
            }
            @media ${Break.md}{
                max-width: 540px;
            }
            @media  ${Break.sm}{
                max-width: 720px;
            }
            @media ${Break.xs}{
                max-width: 540px;
            }
            `: ''
    }
    display: ${props => props.display};
    width: ${props => containerVariants[props.variant || "fixed"]};
    height: ${props => props.height};
    margin: ${props => props.margin || "initial"};
    padding: ${props => props.padding};
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    padding-top: ${props => props.p_top};
    padding-bottom: ${props => props.p_bottom};
    background: ${props => props.color};
    @media  ${Break.sm}{
        padding: ${props => props.p_sm};
        margin: ${props => props.m_sm};
    }
    @media  ${Break.xs}{
        padding: ${props => props.p_xs};
    }
    `
const justifyContentOptions = {
    "around": "space-around",
    "center": "center",
    "between": "space-between",
    "evenly": "space-evenly",
    "end": "flex-end",
    "start": "flex-start",
}
export const Div = styled.div`
    padding: ${props => props.padding};
    height: ${props => props.height};
    width: ${props => props.width};
    position: ${props => props.position};
    display: ${props => props.display};
    align-items: ${props => props.alignItems};
    margin: ${props => props.margin};
    border-radius: ${props => props.borderRadius};
    background: ${props => props.background};
    justify-content: ${props => justifyContentOptions[props.justifyContent]};
    flex-direction: ${props => props.flexDirection || 'row'};
    box-shadow: ${props => props.shadow};
    
    flex-wrap: nowrap; 
    
    align-content: ${props => props.alignContent};
    align: ${props => props.align};
    cursor: ${props => props.cursor};
    &:hover { 
        background: ${props => props.backgroundHover};
    }
    @media  ${Break.lg}{
        display: ${props => props.d_lg};
    }
    @media  ${Break.sm}{
        align-items: ${props => props.alignItems_sm};
        padding: ${props => props.p_sm};
        display: ${props => props.d_sm};
        width: ${props => props.w_sm};
        margin: ${props => props.m_sm};
    }
    @media ${Break.xs}{
        align-items: ${props => props.alignItems_xs};
    }
`
export const Row = styled(Div)`
    border: ${props => props.border};
    border-top: ${props => props.borderTop};
    z-index: ${props => props.zIndex};
    flex-wrap: wrap; 
    margin-right: ${props => props.marginRight};
    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    
    &:hover { 
        background: ${props => props.backgroundHover};
        margin: ${props => props.marginHover};
        border-radius: ${props => props.borderRadiusHover};
    }

    @media  ${Break.sm}{
        width: ${props => props.width_sm};
        display: ${props => props.display_sm};
        margin: ${props => props.m_sm};
        justify-content: ${props => props.alignResp || "center"};
        flex-direction: ${props => props.flexDirection_sm};
    }
    @media ${Break.xs}{
        width: ${props => props.width_xs};
        display: ${props => props.display_xs};
        justify-content: ${props => props.alignResp || "center"};
        padding: ${props => props.p_xs};
        margin: ${props => props.m_xs};
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
    background-color: ${props => props.color};
    border: ${props => props.borderStyle};
    align-self: ${props => props.alignSelf};
    padding-right: ${props => props.paddingRight};
    padding-left: ${props => props.paddingLeft};
    display: ${props => props.display};
    flex-direction: ${props => props.flexDirection};
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    text-align: ${props => props.align};
    
    flex: 0 0 ${props => (props.size / 12) * 100}%;
    max-width: ${props => (props.size / 12) * 100}%;

    ${props => props.masonry && 'display: inline-block;'}
    border-radius: ${props => props.borderRadius};
       
    @media ${Break.lg}{
        flex: 0 0 ${props => (props.size_lg / 12) * 100}%;
        max-width: ${props => (props.size_lg / 12) * 100}%;
        padding-left: ${props => props.pl_lg};
        display: ${props => props.disp_lg};
    }
    @media ${Break.md}{
        flex: 0 0 ${props => (props.size_md / 12) * 100}%;
        max-width: ${props => (props.size_md / 12) * 100}%;
        text-align: ${props => props.align};
        margin-bottom: ${props => props.respSizeMargin};
        border-radius: ${props => props.br_md};
        margin: ${props => props.m_md};
        padding: ${props => props.p_md};
        padding-left: ${props => props.pl_md};
        height: ${props => props.h_md};
        display: ${props => props.disp_md};
    }
    @media ${Break.sm}{
        flex: 0 0 ${props => (props.size_sm / 12) * 100}%;
        max-width: ${props => (props.size_sm / 12) * 100}%;
        height: ${props => props.h_sm};
        border-radius: ${props => props.br_sm};
        text-align: ${props => props.align_sm};
        margin-bottom: ${props => props.respSizeMargin};
        margin: ${props => props.m_sm};
        padding: ${props => props.p_sm};
        padding-left: ${props => props.pl_sm};
        display: ${props => props.disp_sm};
    }
    @media ${Break.xs} {
        flex: 0 0 ${props => (props.size_xs / 12) * 100}%;
        max-width: ${props => (props.size_xs / 12) * 100}%;
        display: ${props => props.disp_xs};
        margin: ${props => props.m_xs};
    }
`

export const Wrapper = (props) => {
    return <Container
        github={props.github}
        margin={props.margin}
        m_sm={props.m_sm}
        p_sm={props.p_sm}
        p_xs={props.p_xs}
        variant="fluid"
        display="flex"
    >
        <Column size="1" disp_md="none" />
        <Column
            size="11"
            size_sm="12"
            url={props.image}
            border={props.border}
            customBorderRadius={props.customBorderRadius}
            color={props.background}
            align={props.align}
            height={props.height}
            m_md={props.right ? "0 0 0 auto" : undefined}
            backgroundSize={props.backgroundSize}
        >
            <Row padding={`20px 0`} display={`flex`}>
                <Column size="1" disp_sm="none" />
                <Column
                    size={props.wide ? 11 : 9}
                    size_md={props.wide ? 12 : 11}
                    paddingRight={props.wide ? 0 : undefined}
                    height={props.height}
                >
                    {props.children}
                </Column>
            </Row>
        </Column>
    </Container>
}

export const WrapperImage = (props) => {
    return <Container
        margin={props.margin}
        p_xs="0"
        github={props.github}
        variant="fluid"
    >
        <Row display={`flex`}>
            <Column size="1" d_sm="none" />
            <Column
                size="11" size_sm="12"
                url={props.image}
                border={props.border}
                customBorderRadius={props.customBorderRadius}
                color={props.background}
                align={props.align}
                height={props.height}
                paddingRight="0"
                backgroundSize={props.backgroundSize}
            ><StyledBackgroundSection
                className={props.className}
                height={props.height}
                borderRadius={props.customBorderRadius}
                backgroundColor={Colors.darkGray}
                backgroundPosition={props.backgroundPosition[0]}
                bp_lg={props.backgroundPosition[1]}
                bp_md={props.backgroundPosition[2]}
                bp_sm={props.backgroundPosition[3]}
                bp_xs={props.backgroundPosition[4]}
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
    customBorderRadius: "10px 10px",
    backgroundPosition: [],
};

export const WrapperCustom = (props) => {
    return <Container width={props.width}>
        <Row display={`flex`}>
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
                    <Row justifyContent={props.innerLeftRowAlign}>
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

export const Divider = styled.div`
    height: ${props => props.height};
    @media ${Break.lg} {
        height: ${props => props.lg};
    }
    @media ${Break.md} {
        height: ${props => props.md};
    }
    @media ${Break.sm} {
        height: ${props => props.sm};
    }
    @media ${Break.xs} {
        height: ${props => props.xs};
    }
`;

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
    right: null,
};


Divider.propTypes = {
    height: PropTypes.string
};


