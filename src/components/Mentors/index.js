import React from 'react';
import styled from 'styled-components';
import '../../assets/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const Mentors = props => (
    <>
        <div className="container">Mentors</div>
        <div className="container">
            <div className="row">
                {props.mentorsArray.map((item, index) => <div key={index}>{item.node.name}</div>)}

            </div>



        </div>
    </>
);
Mentors.propTypes = {
    mentorsArray: PropTypes.array,

};
export default Mentors;
