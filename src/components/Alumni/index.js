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
    <div className="container  alumni-container">
        <div className="row mb-3">
            <div class="col-md-12  program-title text-white text-center">

                <div className="row justify-content-center mt-5 who-title">MEET THE ALUMNI AND PROJECTS</div>
                <div className="row justify-content-center mb-3">
                    <div className=" program-divider"></div>
                </div>
                <div className="row justify-content-center who-lead ">
                    <div className="col-md-6">
                        Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </div>
                </div>
            </div>
        </div>
        <div className="row ">
            <div className="col-md-12">
                <div className="row justify-content-center">
                    <div className="col-md-5 alumni-left">left</div>
                    <div className="col-md-5 alumni-right p-0"><img src="https://images.unsplash.com/photo-1534665482403-a909d0d97c67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" width="100%" height="100%" /></div>
                </div>
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