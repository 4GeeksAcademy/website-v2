import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../../components/Styling'
import {Device} from '../Responsive'

export const Wrapper = props => {
    const contStyle = {
        background: (props.color === "blue")
            ?
            `${Colors.blue}`
            : props.color === "grey"
                ? `${Colors.lightGray}`
                : `${Colors.white}`
        ,
        borderRadius: '1.25rem 0px 0px 0px',
        height: `${props.height}`
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 p-0 m-0"></div>
                <div style={contStyle} className="col-lg-10 p-0 m-0" ></div>
            </div>
        </div>
    )
}
export const Container = styled.div`
    width: 100%;
    height: ${props => props.height};
`
export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export const Column = styled.div`
height: 600px;
position: relative;
width: 100%;
padding-right: 15px;
padding-left: 15px;
border-radius: 0 0 0 1.25rem;
${props =>
        props.image
            ?
            css`
                background-image: url(${props => props.url});
                background-size: cover;
                background-repeat: no-repeat;
    `
            :
            css`
                background: ${props => props.color};
`}
${props =>
        props.size
        && css`
            @media ${Device.md}{
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
            }
            @media ${Device.xs}{
                flex: 0 0 100%;
                max-width: 100%;
                height: 300px;
                border-radius: 0 0 0 0;
            }
            @media screen ${Device.sm}{
                flex: 0 0 100%;
                max-width: 100%;
                height: 300px;
                border-radius: 0 0 0 0;
            }
            @media ${Device.lg}{
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
            }
            @media ${Device.xl} {
                flex: 0 0 ${(props.size / 12) * 100}%;
                max-width: ${(props.size / 12) * 100}%;
            }
`}
`
export const Cont = styled.div`
    width: 100%;
    height: ${props => props.height};
    vertical-align: baseline;
    margin-left: ${props => props.marginLeft};
    background: ${props => props.color === "blue"
        ?
        `${Colors.blue}`
        : props.color === "grey"
            ? `${Colors.lightGray}`
            : `${Colors.white}`
    };
    border-radius: ${props => props.borderTopLeft} 0px 0px ${props => props.borderBottomLeft};
`;

Wrapper.propTypes = {
    color: PropTypes.string,
    height: PropTypes.string,
    content: PropTypes.object
}
Container.propTypes = {
    color: PropTypes.string,
    height: PropTypes.string,
    marginLeft: PropTypes.string,
    borderTopLeft: PropTypes.string,
    borderBottomLeft: PropTypes.string,
}
Container.defaultProps = {
    // marginLeft: '100px',
    borderBottomLeft: '1.25rem',
    height: '400px'
};
export const Divider = props => {
    const Height = styled.div`
        height: ${props.height}
    `;
    return (
        <Height></Height>
    )
};
Divider.propTypes = {
    height: PropTypes.string
};


