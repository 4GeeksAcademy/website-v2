import React from 'react';
import styled from 'styled-components';
import '../../assets/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const Round = styled.div`
    
    border-radius: 50%;
  
`;

const Mentors = props => (
    <>
        <div className="container">Mentor</div>
        <div className="container">
            <div className="row ">
                {props.mentorsArray.map((item, index) => {
                    return (
                        <div className={`col-md-${props.column} mb-3`} key={index}>
                            <div className="row"><Round><img src={item.node.image} width="200" height="200" /></Round></div>
                            <div className="row">{item.node.name}<span className="ml-2">{item.node.last_name}</span></div>

                            <div className="row">{item.node.nick_name}</div>

                            <div className="row"><ol>{item.node.coding_skills.map((skill, index) => {
                                return (
                                    <li key={index}>{skill}</li>
                                )

                            })}</ol></div>

                        </div>)
                })}

            </div>



        </div>
    </>
);
Mentors.propTypes = {
    mentorsArray: PropTypes.array,
    column: PropTypes.integer,


};
export default Mentors;
