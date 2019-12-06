import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {useSpring, animated} from 'react-spring'
import range from 'lodash-es/range'
import '../../assets/css/style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faTrophy, faHandshake, faBookOpen} from '@fortawesome/free-solid-svg-icons'

const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`;

export default () => {
  // const classes = useStyles();

  // const {radians} = useSpring({
  //     to: async next => {
  //         while (1) await next({radians: 2 * Math.PI});
  //     },
  //     from: {radians: 0},
  //     config: {duration: 3500},
  //     reset: true
  // });
  const graduation = <FontAwesomeIcon icon={faGraduationCap} size="3x" />
  const rating = <FontAwesomeIcon icon={faTrophy} size="3x" />
  const campuses = <FontAwesomeIcon icon={faBookOpen} size="3x" />
  const hired = <FontAwesomeIcon icon={faHandshake} size="3x" />

  const data = useStaticQuery(graphql`
      query myQueryTest2{
          credentials: allCredentialsDataYaml {
              edges {
                node {
                  credential
                  cred_value
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


  return (

    <div className="container cred-container px-5">

      <div className="row px-5">
        <div className="col-md-9">
          <div className="row prova">
            {data.credentials.edges.map((i, index) => {
              // const props = useSpring({number: i.node.cred_value, from: {number: 0}})
              console.log(i.node.cred_value)
              return (
                <div key={index} className="col-md-3 test">
                  <div className="card-credential p-3 text-center ">
                    <div className="icons mb-3">{graduation}</div>
                    <div className="cred-title">{i.node.credential}</div>
                    <div><h3>{i.node.cred_value}</h3></div>
                  </div>
                </div>
                // <animated.div key={i} className="script-bf-box " style={{transform: radians.interpolate(interp(i))}}>
                //     <div className="card">

                //         <div className="card-body">
                //             <h5 className="card-title">{i.node.credentials}</h5>
                //             <p className="card-text">
                //                 {i.node.cred_value}
                //             </p>

                //         </div>
                //     </div>
                // </animated.div>
              )
            })}

          </div>
        </div>


      </div>
    </div>
  )
}




