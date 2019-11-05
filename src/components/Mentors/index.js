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
                        <div className="col-md-3" key={index}>
                            <div className="row">{item.node.name}</div>
                            <div className="row"><img src={item.node.image} width="200" /></div>
                            <div className="row">{item.node.last - name}</div>
                            <div className="row">{item.node.nick - name}</div>
                            <div className="row">{item.node.name}</div>
                        </div>)
                })}

            </div>



        </div>
    </>
);
Mentors.propTypes = {
    mentorsArray: PropTypes.array,

};
export default Mentors;
