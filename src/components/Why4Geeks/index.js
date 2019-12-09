import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faTrophy, faHandshake, faBookOpen} from '@fortawesome/free-solid-svg-icons'

export default () => {


  const data = useStaticQuery(graphql`
      query myQueryWhy{
          why: allWhy4GeeksYaml {
            edges {
              node {
                title
                description
                image
              }
            }
          }
        }
          
      
      `)

  const graduation = <FontAwesomeIcon icon={faGraduationCap} size="2x" />
  return (

    <div className="container why-container">
      <div className="row justify-content-center why-title ">WHY 4 GEEKS ?</div>
      <div className="row justify-content-center why-title">


      </div>
      <div className="row my-4 justify-content-center">

        {data.why.edges.map(i => (
          <div className="col-md-3">

            <div className="card-why4 p-3 text-center row">
              {/* <div className="icons mb-3">{graduation}</div> */}
              <img src={i.node.image} width="100%" height="150" />
            </div>
            <div className=" px-3 row">
              <div className="col-md-3 icons">{graduation}</div>
              <div className="col-md-9 text-why pr-0">{i.node.title}</div>

            </div>
            <div className=" text-center row mt-2">
              <div className="text-why-p">{i.node.description}</div>
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
        ))}
      </div>
    </div>
  )
}

