import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors, StyledBackgroundSection} from '../Styling';
import {H1, H2, Paragraph} from '../Heading';
import {Break} from '../Responsive'
import {Devices} from '../Responsive'
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
        @media ${Devices.xxs}{
        }
        @media ${Devices.xs}{
    
        }
        @media  ${Devices.sm}{
            max-width: 540px;
        }
        @media  ${Devices.tablet}{
            max-width: 720px;
            height: ${props => props.height_tablet};
        }
        @media  ${Devices.md}{
            max-width: 960px;
            height: ${props => props.height_md};
            transform: ${props => props.transform_md};
            padding: ${props => props.padding_md};
            
        }
        @media  ${Devices.lg}{
            max-width: 1024px;
        }
        @media  ${Devices.xl}{
            max-width: 1140px;
            
        }
        @media  ${Devices.xxl}{
            max-width: 1320px;
    
        }
            `:
        css`
            @media ${Devices.xxs}{
            }
            @media ${Devices.xs}{
        
            }
            @media  ${Devices.sm}{
            }
            @media  ${Devices.tablet}{
                height: ${props => props.height_tablet};
                margin: ${props => props.margin_tablet};
            }
            @media  ${Devices.md}{
                height: ${props => props.height_md};
                margin: ${props => props.margin_md};
                padding: ${props => props.padding_md};
                
            }
            @media  ${Devices.lg}{
                margin: ${props => props.margin_lg};
            }
            @media  ${Devices.xl}{
                
            }
            @media  ${Devices.xxl}{
        
            }
                `
    }
    display: ${props => props.display};
    background: ${props => props.background};
    width: ${props => containerVariants[props.variant || "fixed"]};
    height: ${props => props.height};
    margin: ${props => props.margin || "0 auto"};
    padding: ${props => props.padding};
    transform: ${props => props.transform};
    `

const justifyContentOptions = {
    "around": "space-around",
    "center": "center",
    "between": "space-between",
    "evenly": "space-evenly",
    "end": "flex-end",
    "start": "flex-start",
}

export const HR = styled.hr`
    background: ${props => props.background || "#000000"};
    height: ${props => props.height || "7px"};
    border: ${props => props.border || '0px'};
    margin: ${props => props.margin || '0px'};
    padding: ${props => props.padding || '0px'};
    width: ${props => props.width || "100%"};
    @media ${Devices.xxs}{
    }
    @media ${Devices.xs}{
    }
    @media  ${Devices.sm}{   
    }
    @media  ${Devices.tablet}{
        margin: ${props => props.margin_tablet};
        width: ${props => props.width_tablet};
        height: ${props => props.height_tablet};
    }
    @media  ${Devices.md}{
        width: ${props => props.width_md};
        height: ${props => props.height_md};
        margin: ${props => props.margin_md};
    }
    @media  ${Devices.lg}{
    }
    @media  ${Devices.xl}{
    }
`

export const Div = styled.div`
    flex: 0 0 ${props => (props.size / 12) * 100}%;
    max-width: ${props => (props.size / 12) * 100}%;
    grid-area: ${props => props.gridArea};
    grid-column: ${props => props.gridColumn};
    grid-row: ${props => props.gridRow};
    padding: ${props => props.padding};
    height: ${props => props.height};
    width: ${props => props.width};
    min-width: ${props => props.minWidth};
    min-height: ${props => props.minHeight};
    position: ${props => props.position};
    display: ${props => props.display || "flex"};
    flex-direction: ${props => props.flexDirection || 'row'};
    direction: ${props => props.direction};
    align-items: ${props => props.alignItems};
    align-self: ${props => props.alignSelf};
    margin: ${props => props.margin};
    border: ${props => props.border};
    border-radius: ${props => props.borderRadius};
    background: ${props => props.background};
    border-left: ${props => props.borderLeft};
    border-top: ${props => props.borderTop};
    border-bottom: ${props => props.borderBottom};
    border-right: ${props => props.borderRight};
    justify-content: ${props => justifyContentOptions[props.justifyContent]};
    justify-self: ${props => props.justifySelf};
    box-shadow: ${props => props.boxShadow};
    flex-wrap: nowrap; 
    align-content: ${props => props.alignContent};
    align: ${props => props.align};
    cursor: ${props => props.cursor};
    transform: ${props => props.transform};
    z-index: ${props => props.zIndex};
    place-items: ${props => props.placeItems};
    &:after {
        content: ${props => props.contentAfter};
        display: ${props => props.displayAfter || "block"};
        background-color: ${props => props.backgroundColorAfter};
        height: ${props => props.heightAfter};
        width: ${props => props.widthAfter};
        margin-left: ${props => props.marginLeftAfter};
        position: ${props => props.positionAfter};
        top: ${props => props.topAfter};
        bottom: ${props => props.bottomAfter};
        left: ${props => props.leftAfter};
        right: ${props => props.rightAfter};
    }

    &:hover { 
        background: ${props => props.backgroundHover};
    }
    @media ${Devices.xxs}{

    }
    @media ${Devices.xs}{
        
        
    }
    @media  ${Devices.sm}{
        padding: ${props => props.padding_sm};
        height: ${props => props.height_sm};
        
    }
    @media  ${Devices.tablet}{
        align-self: ${props => props.alignSelf_tablet};
        display: ${props => props.display_tablet};
        flex-direction: ${props => props.flexDirection_tablet};
        height: ${props => props.height_tablet};
        align-items: ${props => props.alignItems_tablet};
        padding: ${props => props.padding_tablet};
        margin: ${props => props.margin_tablet};
        width: ${props => props.width_tablet};
        min-width: ${props => props.minWidth_tablet};
        min-height: ${props => props.minHeight_tablet};
        height: ${props => props.height_tablet};
        flex: ${props => props.flex_tablet};
        border: ${props => props.border_tablet};
        border-top: ${props => props.borderTop_tablet};
        border-right: ${props => props.borderRight_tablet};
        border-bottom: ${props => props.borderBottom_tablet};
        border-left: ${props => props.borderLeft_tablet};
        transform: ${props => props.transform_tablet};
        grid-area: ${props => props.gridArea_tablet};
        margin: ${props => props.margin_tablet};
        grid-column: ${props => props.gridColumn_tablet};
        grid-row: ${props => props.gridRow_tablet};
        justify-self: ${props => props.justifySelf_tablet};
        z-index: ${props => props.zIndex_tablet};
        &:after {
            display: ${props => props.displayAfter_tablet};
        }
        
    }
    @media  ${Devices.md}{
        flex: 0 0 ${props => (props.size_md / 12) * 100}%;
        max-width: ${props => (props.size_md / 12) * 100}%;
        grid-area: ${props => props.gridArea_md};
        display: ${props => props.display_md};
        flex-direction: ${props => props.flexDirection_md};
        justify-content: ${props => justifyContentOptions[props.justifyContent_md]};
        align-items: ${props => props.alignItems_md};
        margin: ${props => props.margin_md};
        padding: ${props => props.padding_md};
        width: ${props => props.width_md};
        height: ${props => props.height_md};
        border: ${props => props.border_md};
        border-top: ${props => props.borderTop_md};
        border-right: ${props => props.borderRight_md};
        border-left: ${props => props.borderLeft_md};
        place-items: ${props => props.placeItems_md};
        grid-column: ${props => props.gridColumn_md};
        grid-row: ${props => props.gridRow_md};
    }
    @media  ${Devices.lg}{
        justifyContent: ${props => justifyContentOptions[props.justifyContent_lg]};
        padding: ${props => props.padding_lg};
    }
    @media  ${Devices.xl}{

    }
    @media  ${Devices.xxl}{

    }
`
// TEST TO CHECK IF THE GRID IS A GOOD OPTION
// grid-template-columns: 1fr repeat(2, 1fr) 1fr;
//   grid-template-rows: repeat(${props => props.rows || "auto"});
export const Grid = styled(Div)`
    display: ${props => props.display || "grid"};
    direction: ${props => props.direction};
    grid-template-columns: repeat(${props => props.gridTemplateColumns || "1"}, 1fr);
    grid-template-rows: repeat(${props => props.gridTemplateRows});
    grid-gap: ${props => props.gridGap || "15px"};
    justify-items: ${props => props.justifyItems};
    grid-auto-rows: ${props => props.gridAutoRows};
    grid-column: ${props => props.gridColumn};
    
    @media ${Devices.xxs}{
        grid-template-columns: repeat(${props => props.columns_xxs}, 1fr);
    }
    @media ${Devices.xs}{
        grid-template-columns: repeat(${props => props.columns_xs}, 1fr);
    }
    @media  ${Devices.sm}{
        grid-template-columns: repeat(${props => props.columns_sm}, 1fr);
    }
    @media  ${Devices.tablet}{
        display: ${props => props.display_tablet || "grid"};
        grid-template-columns: ${props => props.gridTemplateColumns_tablet || "2fr repeat(12, 1fr) 2fr"};
        grid-template-rows: repeat(${props => props.gridTemplateRows_tablet});
        grid-gap: ${props => props.gridGap_tablet};
    }
    @media  ${Devices.md}{
        // grid-template-columns: ${props => props.gridTemplateColumns_md || "2fr repeat(12, 1fr) 2fr"};
        // grid-template-rows: repeat(${props => props.rows_md});
        // grid-gap: ${props => props.gridGap_md};
        grid-column: ${props => props.gridColumn_md};
    }
    @media  ${Devices.lg}{
    }
    @media  ${Devices.xl}{
    }
    @media  ${Devices.xxl}{
    }
    `
// export const Header = ({children, image, image_alt, svg_image, seo_title, title, paragraph, height, height_md, height_tablet, background}) => {
//     return (
//         <Grid height={height} height_md={height_md} height_tablet={height_tablet} columns="1" rows="1" columns_md={`12`} gridGap_md="11px" gridGap="0" background={background}>
// <Div flexDirection="column" justifyContent_md="start" padding="41px 17px 0 17px" padding_md="56px 0 0 0" gridArea_md={image || svg_image ? `1/2/1/7` : `1/4/1/10`}>
//     <H1 textAlign={image || svg_image && "left"} margin="0 0 11px 0" color="#606060">{seo_title}</H1>
//     <H2 textAlign={image || svg_image && "left"} fontSize="50px" lineHeight="60px">{`< ${title} >`}</H2>
//     <Paragraph textAlign={image || svg_image && "left"} margin="26px 0" >{paragraph}</Paragraph>
//     {children}
// </Div>
// {image ?
//     <Div width="100%" gridArea_md="1/7/1/13">
//         <StyledBackgroundSection
//             height={`412px`}
//             width="100%"
//             image={image}
//             bgSize={`contain`}
//             alt={image_alt}
//         />
//     </Div>
//     :
//     <Div width="100%" gridArea_md="1/7/1/13" >
//         {svg_image}
//     </Div>
// }
//         </Grid>)
// }
export const Header = ({children, image, image_alt, svg_image, seo_title, title, paragraph, height, height_md, height_tablet, background, margin, margin_tablet, padding, padding_tablet}) => {
    return (
        <Grid background={background} height={height} height_tablet={height_tablet} margin={margin} margin_tablet={margin_tablet} padding={padding || "0 17px"} padding_tablet={padding_tablet || "0"}>
            <Grid gridTemplateColumns_tablet={`repeat(12, 1fr)`} gridArea_tablet="1/2/1/14">
                <Div flexDirection="column" gridColumn_tablet="3 / 10">
                    <H1 type="h1" margin="0 0 11px 0" color="#606060">{seo_title}</H1>
                    <H2 type="h2" fontSize="50px" lineHeight="60px">{`< ${title} >`}</H2>
                    <Paragraph margin="26px 0" >{paragraph}</Paragraph>
                    {children}
                </Div>
            </Grid>
        </Grid>
    )
}

export const GridContainer = ({fluid, children, display, display_tablet, background, backgroundChild, gridGap, gridGap_tablet, gridTemplateRows, gridTemplateRows_tablet, height, height_tablet, columns, columns_tablet, margin, margin_tablet, padding, padding_tablet, paddingChild, padding_tabletChild}) => {
    return (
        <Grid background={background} display={display} display_tablet={display_tablet} height={height} height_tablet={height_tablet} margin={margin} margin_tablet={margin_tablet} padding={padding || "0 17px"} padding_tablet={padding_tablet || "0"}>
            <Grid background={backgroundChild} gridGap={gridGap} gridGap_tablet={gridGap_tablet} gridTemplateRows={gridTemplateRows} gridTemplateRows_tablet={gridTemplateRows_tablet} gridTemplateColumns_tablet={`repeat(${columns_tablet}, ${12 / columns_tablet}fr)`} padding={paddingChild} padding_tablet={padding_tabletChild} gridTemplateColumns={columns} gridColumn_tablet={fluid ? "1 / span 14" : "2 / span 12"}>
                {children}
            </Grid>
            {/* <Div display="grid" background={backgroundChild} gridColumn_md={fluid ? `1 / span 14` : `2 / span 12`}>{children}</Div> */}
        </Grid>
    )
}
export const GridContainerWithImage = ({children, gridGap, gridGap_tablet, imageSide, background, height, height_tablet, columns, columns_tablet, margin, margin_tablet, padding, padding_tablet}) => {
    return (
        <Grid gridTemplateColumns_tablet={imageSide == "left" ? "repeat(14, 1fr) 2fr" : "2fr repeat(14, 1fr)"} background={background} height={height} height_tablet={height_tablet} margin={margin} margin_tablet={margin_tablet} padding={padding || "0 17px"} padding_tablet={padding_tablet}>
            <Grid gridGap={gridGap} gridGap_tablet={gridGap_tablet} gridTemplateColumns_tablet={imageSide == "left" ? `repeat(${`12`}, ${14 / columns_tablet}fr)` : `repeat(${columns_tablet}, ${14 / columns_tablet}fr)`} gridTemplateColumns={columns} gridColumn_tablet={imageSide == "left" ? "1 / span 14" : "2 / span 14"}>
                {children}
            </Grid>
            {/* <Div display="grid" background={backgroundChild} gridColumn_md={fluid ? `1 / span 14` : `2 / span 12`}>{children}</Div> */}
        </Grid>
    )
}
export const Row = styled(Div)`
    border: ${props => props.border};
    border-top: ${props => props.borderTop};
    z-index: ${props => props.zIndex};
    flex-wrap: wrap; 
    margin-right: ${props => props.marginRight};
    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    justify-content: ${props => props.justifyContent};
    padding: ${props => props.padding};

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


export const Column = styled(Div)`
    text-align: ${props => props.align || "left"};
    position: relative;
    width: 100%;
    background: ${props => props.background};
    border: ${props => props.borderStyle};
    align-self: ${props => props.alignSelf};
    padding-right: ${props => props.paddingRight};
    padding-left: ${props => props.paddingLeft};
    flex-direction: ${props => props.flexDirection};
    justify-content: ${props => props.justifyContent};
    display: ${props => props.display};
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
        grid-template-columns: ${props => props.templateColumns}
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
            background={props.background}
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
                background={props.background}
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
                    <Row display="flex">
                        <Column
                            size="9"
                            margin="0 auto"
                            height={props.height}
                            align={props.align}
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
                background={props.background}
            >
                {props.full
                    ?
                    <Row justifyContent={props.innerLeftRowAlign} display="flex">
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
Div.defaultProps = {
    justifyContent: "flex-start"
}

Container.defaultProps = {
    padding: '17px',
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


// const Wrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr repeat(2, 1fr) 1fr;
//   grid-template-rows: repeat(${props => props.rows || "auto"});
//   grid-gap: ${props => props.gridGap || "15px"};
//   height: ${props => props.height};
//   // margin: 0 auto;
//   // width: 70%;
//   background: red;
//   padding: 5px 0;
//   @media  ${Devices.md}{
//     // grid-template-columns: 1fr repeat(12, 1fr) 1fr;
//     height: ${props => props.height_md};
//     padding: ${props => props.padding_md};
//     display: ${props => props.display_md};
//     margin: ${props => props.margin_md};
// }
// `

// const Test = styled.div`
//   grid-column: 3 / span 10;
//   grid-row: 1;
//   background: white;
//   display: flex;
//   justify-content: space-between;
//   @media ${Devices.xxs}{

// }