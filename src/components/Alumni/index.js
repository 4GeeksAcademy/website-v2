import React from 'react';
import styled from 'styled-components';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/fontawesome.css';
import PropTypes from 'prop-types';

const Heading = styled.h1`
    color: red;
    margin-left: 5px;
    background-color: pink;
    padding: 2px 5px;
    border-radius: 3px;
  
`;
const Next = styled.h6`
    font-size: 8px;
    margin-bottom: 1px;
`
const NextName = styled.h6`
    font-size: 12px;
    margin-bottom: 1px;
    
`

const Alumni = props => (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-6">
                <div className="row"><h1>Meet </h1> <Heading>{props.name}</Heading></div>
                <div className="row"></div>
                <div className="row">{props.content}</div>
                <div className="row mt-5">
                    <div className="col-md-4 pl-0 ">
                        <div className="btn btn-danger">Prev</div>
                        <div className="btn btn-danger">Next</div>
                    </div>
                    <div className="col-md-8">
                        <div className="ml-5"><Next>Next:</Next></div>
                        <div className="ml-5"><NextName>Meet <span>{props.nextName}</span></NextName> </div>
                        <div className="ml-5"><NextName>Now <span>{props.nextTitle}</span></NextName></div>
                    </div>

                </div>
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
    nextName: PropTypes.string,
    nextTitle: PropTypes.string,
};
export default Alumni;