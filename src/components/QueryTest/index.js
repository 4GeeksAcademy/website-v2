import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {H4} from '../Heading'
import {useSpring, animated} from 'react-spring'
import '../../assets/css/style.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faTrophy, faHandshake, faBookOpen} from '@fortawesome/free-solid-svg-icons'

const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`;

export default () => {
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
                  cred_symbol
                }
              }
          }
          }
      `)
  return (


    <div className="row">
      {data.credentials.edges.map((i, index) => {
        console.log(i.node.cred_value)
        return (
          <div key={index} className="col-md-3 test">
            <div className="card p-3 text-center ">
              <div className="icons mb-3">{graduation}</div>
              <div className="cred-title">{i.node.credential}</div>
              <div><H4>{i.node.cred_symbol}{i.node.cred_value}</H4></div>
            </div>
          </div>
        )
      })}
    </div>


  )
}




