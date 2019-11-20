import React, {useState, useEffect} from 'react';
import {useCountUp} from 'react-countup';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import PropTypes from 'prop-types';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css'

// const {useCounter, setCounter} = useState(props.hired)

const Credentials = (props) => {
  // const {countUp} = useCountUp({end: props.hired});
  const {countUp} = useCountUp({end: props.hired})
  // const {countUp, start, pauseResume, reset, update} = useCountUp({
  //   start: 0,
  //   end: 550,
  //   delay: 1000,
  //   duration: 5,
  //   onReset: () => console.log('Resetted!'),
  //   onUpdate: () => console.log('Updated!'),
  //   onPauseResume: () => console.log('Paused or resumed!'),
  //   onStart: ({pauseResume}) => console.log(pauseResume),
  //   onEnd: ({pauseResume}) => console.log(pauseResume),
  // });
  return (
    <>
      {/* <div>
      {data.allMarkdownRemark.edges.map((item) => (
        <div key={item.node.id}>{item.node.frontmatter.name}</div>
      ))}
    </div> */}
      <div className="container ">
        <div className="row no-gutter">
          <div className="col">
            <h2>Credentials</h2>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-md border rounded credentials">
            <div className="row justify-content-center">
              <div>{countUp}</div>
              <span className="mr-3 ">Rated </span>{props.rating}
            </div>
            <div className="row ">
              <div className="col-4">
                <img src={props.googleImage} width="32" />
              </div>
              <div className="col-4">
                <img src={props.switchImage} width="32" />
              </div>
              <div className="col-4">
                <img src={props.reportImage} width="32" />
              </div>
            </div>
          </div>
          <div className="col-md border rounded credentials">
            <div className="row justify-content-center">+{countUp}<span className="ml-3">Hired</span></div>
            <div className="row justify-content-center">Students</div>
          </div>
          <div className="col-md border rounded credentials">
            <div className="row justify-content-center">{props.alumni}</div>
            <div className="row justify-content-center">Alumni</div>
          </div>
          <div className="col-md border rounded credentials">
            <div className="row justify-content-center">{props.campuses}</div>
            <div className="row justify-content-center">Campuses</div>
          </div>
        </div>
      </div>
    </>
  )
}


Credentials.propTypes = {
  rating: PropTypes.string.isRequired,
  googleImage: PropTypes.string,
  switchImage: PropTypes.string,
  reportImage: PropTypes.string,
  alumni: PropTypes.string,
  campuses: PropTypes.string,
  hired: PropTypes.string,
};
export default Credentials;
