import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Row} from '../Sections'
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
    return (
        <Row>
            <div className="col-lg-8 offset-lg-1 text-center">
                <Row>
                    {data.job.edges.map(i => (
                        <div className="col-md-4 ">
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
                                </div>
                            </div>
                        </div>
                    ))}
                </Row>
            </div>
        </Row>
    )
}
