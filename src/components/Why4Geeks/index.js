import React from 'react';
import styled from 'styled-components';

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
          
      }
      `)


    return (

        <div className="container ">
            <div className="row my-4">

                {data.why.edges.map(i => (
                    <div className="col-md-3">
                        <div className="card-credential p-3 text-center test">
                            {/* <div className="icons mb-3">{graduation}</div> */}
                            <div><h3>{i.node.title}</h3></div>
                            <div><h3>{i.node.description}</h3></div>
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

