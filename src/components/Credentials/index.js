import React, {useState, useEffect} from 'react';
import {useCountUp} from 'react-countup';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import PropTypes from 'prop-types';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faTrophy, faHandshake, faBookOpen} from '@fortawesome/free-solid-svg-icons'

// const {useCounter, setCounter} = useState(props.hired)

const Credentials = (props) => {
  const graduation = <FontAwesomeIcon icon={faGraduationCap} size="3x" />
  const rating = <FontAwesomeIcon icon={faTrophy} size="3x" />
  const campuses = <FontAwesomeIcon icon={faBookOpen} size="3x" />
  const hired = <FontAwesomeIcon icon={faHandshake} size="3x" />
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
      <div className="container mb-5">
        <div className="row no-gutter">
          <div className="col">
            <h2>Credential</h2>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-md border rounded credentials mr-2">
            <div className="row justify-content-center cred-row">
              <div className="icons">{rating}</div>

            </div>
            <div className="row justify-content-center cred-row">
              <div><h1 className="mb-0">{props.rating}</h1></div>

            </div>
            <div className="row justify-content-center cred-row">

              <div className="mr-3 "><h1 className="mb-0">Ratings</h1> </div>
            </div>
          </div>
          <div className="col-md border rounded credentials mr-2">

            <div className="row justify-content-center cred-row">
              <div className="icons">{graduation}</div>

            </div>
            <div className="row justify-content-center cred-row">
              <div><h1 className="mb-0">+{countUp}</h1></div>

            </div>
            <div className="row justify-content-center cred-row">

              <div className="mr-3 "><h1 className="mb-0">Alumni</h1> </div>
            </div>
          </div>
          <div className="col-md border rounded credentials mr-2">
            <div className="row justify-content-center cred-row">
              <div className="icons">{campuses}</div>

            </div>
            <div className="row justify-content-center cred-row">
              <div><h1 className="mb-0">{props.alumni}</h1></div>

            </div>
            <div className="row justify-content-center cred-row">

              <div className="mr-3 "><h1 className="mb-0">Campuses</h1> </div>
            </div>

          </div>
          <div className="col-md border rounded credentials">
            <div className="row justify-content-center cred-row">
              <div className="icons">{hired}</div>

            </div>
            <div className="row justify-content-center cred-row">
              <div><h1 className="mb-0">{props.campuses}</h1></div>

            </div>
            <div className="row justify-content-center cred-row">

              <div className="mr-3 "><h1 className="mb-0">Campuses</h1> </div>
            </div>

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
