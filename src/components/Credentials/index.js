import React, {useState, useEffect} from 'react';
import {useCountUp} from 'react-countup';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import PropTypes from 'prop-types';
import {useSpring, animated} from 'react-spring'
import range from 'lodash-es/range'
import '../../assets/css/style.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faTrophy, faHandshake, faBookOpen} from '@fortawesome/free-solid-svg-icons'

// const {useCounter, setCounter} = useState(props.hired)

const items = range(4);
const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`;
const Credentials = (props) => {
  const data = useStaticQuery(graphql`
    query myQueryCred{
        credentials: allCredentialsDataYaml {
            edges {
              node {
                credential
              }
            }
        }
        alumni:   allAlumniYaml{
          edges{
            node{
              name
              image
              content
              title
            }
          }
        }
        
      
      cred: allFinancialsYaml{
        edges{
            node{
                name
                options{
                    months
                    payment
                }
                logo
                description
            }
        }
    }}
    `)
  const {radians} = useSpring({
    to: async next => {
      while (1) await next({radians: 2 * Math.PI});
    },
    from: {radians: 0},
    config: {duration: 3500},
    reset: true
  });
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
    </div> */}{data.credentials.edges.map(i => (

        <animated.div key={i} className="script-bf-box " style={{transform: radians.interpolate(interp(i))}}>
          <div className="container test">
            <div className="col-md border rounded credentials mr-2">
              <div className="row justify-content-center cred-row">
                <div className="icons">{i.node.rating}</div>

              </div>
              <div className="row justify-content-center cred-row">
                <div><h1 className="mb-0">{i.node.rating}</h1></div>

              </div>
              <div className="row justify-content-center cred-row">

                <div className="mr-3 "><h1 className="mb-0">Ratings</h1> </div>
              </div>
            </div>

          </div>
        </animated.div>
      ))
      }
      {/* <div className="container mb-5">
        <div className="row no-gutter">
          <div className="col">
            <h2>Credentials</h2>
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
      </div> */}
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
