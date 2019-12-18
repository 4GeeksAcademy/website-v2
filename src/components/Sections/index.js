import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../../components/Styling'

export const Title = props => {
    let temp = ""
    if (props.style != "light") {
        temp = ""
    }
    return (
        <>
            <div className="row py-4">
                <div className="col-md-6 offset-md-3 text-center">
                    <div className="row px-5 justify-content-center" >{props.style == "light" ? <H3 primary>{props.title}</H3> : <H3>{props.title}</H3>}</div>
                    <div className="row px-5 mb-3 justify-content-center">{props.style == "light" ? <Separator primary /> : <Separator />}</div>
                    <div className="row px-5 justify-content-center" >{props.style == "light" ? <Paragraph primary>{props.paragraph}</Paragraph> : <Paragraph>{props.paragraph}</Paragraph>}</div>
                </div>
            </div>
        </>
    )
}
export const Wrapper = () => {
    const color =
        (props => props.color === "blue")
            ? " bg-dark"
            : " bg-primary"

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 p-0 m-0"></div>
                <div className={"col-lg-10 p-0 m-0" + color}>x</div>
            </div>
        </div>
    )
}
export const Container = styled.div`
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
