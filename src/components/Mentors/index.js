import React from 'react';
import styled from 'styled-components';
import '../../assets/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const Mentors = props => (
    <>
        <div className="container">Mentors</div>
        <div className="container">
            <div className="row">
                {props.mentorsArray.map((item, index) => {
                    return (
                        <div key={index}>{item.name}</div>

                    );
                })


                }

            </div>



        </div>
    </>
);
Mentors.propTypes = {
    name: PropTypes.string.isRequired,

};
export default Mentors;
