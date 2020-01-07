import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../../components/Styling'
import {Device} from '../Responsive'

export const Container = styled.div`
    ${props =>
        props.width === "fluid"
            ?
            css`
                width: 100%;
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
            @media screen ${Device.sm}{
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
`
export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    ${props => props.center && css`justify-content:center;`}
`
export const Column = styled.div`
padding: ${props => props.padding};
position: relative;
width: 100%;
padding-right: 15px;
padding-left: 15px;
${props =>
        props.border === "bottom"
            ?
            css`
                    border-radius: 0 0 0 1.25rem;
                `
            : props.border === "top"
            &&
            css`
                    border-radius: 1.25rem 0 0 0;
                `
    }

${props =>
        props.image === "yes"
            ?
            css`
                background-image: url(${props => props.url});
                background-size: cover;
                background-repeat: no-repeat;
    `
            : props.image === "no"
            &&
            css`
                background: ${props => props.color};
`}
${props =>
        props.size
        && css`
            @media ${Device.md}{
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
                text-align: ${props => props.align};
            }
            @media ${Device.xs}{
                flex: 0 0 100%;
                max-width: 100%;
                // height: 300px;
                border-radius: 0 0 0 0;
                text-align: center;
            }
            @media screen ${Device.sm}{
                flex: 0 0 100%;
                max-width: 100%;
                // height: 300px;
                border-radius: 0 0 0 0;
                text-align: center;
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
`}
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
                        color={props.color}>
                        <Row>
                            <Column size="1" />
                            <Column size="8">
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
                        color={props.color}>
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
Container.defaultProps = {
    borderBottomLeft: '1.25rem',
};
Column.defaultProps = {
    align: 'center',
};
Wrapper.defaultProps = {
    outerLeftCol: '1',
    outerRightCol: '11',
    innerLeftCol: '1',
    innerRightCol: '8',

};

Divider.propTypes = {
    height: PropTypes.string
};


