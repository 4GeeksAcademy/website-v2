import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {useSpring, animated} from 'react-spring'
import range from 'lodash-es/range'
import '../../assets/css/style.css';

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

        <div className="container ">
            {data.credentials.edges.map(i => (
                <div className="card">
                    {i.node.credential}
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
    )
}




