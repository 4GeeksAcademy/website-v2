import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faTrophy, faHandshake, faBookOpen} from '@fortawesome/free-solid-svg-icons'
import graphic from "../../assets/images/graphic.png"
export default () => {


    const data = useStaticQuery(graphql`
      query myQueryJobs{
          job: allJobsYaml {
            edges {
              node {
                title
                sub_title
                graph
                value
                value_type
              }
            }
          }
        }
          
      
      `)

    const graduation = <FontAwesomeIcon icon={faGraduationCap} size="2x" />
    return (

        <div className="container ">
            {/* <div className="row justify-content-center why-title">WHY 4 GEEKS ?</div> */}
            {/* <div className="row justify-content-center why-title">


      </div> */}
            <div className="row my-4 justify-content-center">

                {data.job.edges.map(i => (
                    <div className="col-md-3 ">

                        <div className=" p-3 ">
                            <div className=" px-3 py-1 row job-container text-center">
                                <div className="col-md-6 ">
                                    <div className="row jobs-left">
                                        {i.node.title}
                                    </div>
                                    <div className="row jobs-value">
                                        {i.node.value}<span>{i.node.value_type}</span>
                                    </div>
                                    <div className="row jobs-left">
                                        {i.node.sub_title}
                                    </div>


                                </div>
                                <div className="col-md-5 text-why pr-0"><img src={graphic} width="100%" /></div>

                            </div></div>

                    </div>

                ))}
            </div>
        </div>
    )
}
