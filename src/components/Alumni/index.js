import React from 'react';
import styled from 'styled-components';
import '../../assets/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const Alumni = props => (
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <div className="row">{props.name}</div>
                <div className="row"></div>
                <div className="row">{props.content}</div>
                <div className="row"></div>
            </div>
            <div className="col-md-6">
                <img src={props.alumniImage} width="100%"></img>
            </div>
        </div>
        <div className="row"></div>
    </div>
);
Alumni.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.string,
    alumniImage: PropTypes.string,
};
export default Alumni;