import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Row} from '../Sections'
import {H3} from '../Heading'
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
        <div className="row">
            {data.job.edges.map(i => (
                <div className="col-md-4 col-sm-12 ">
                    <div className=" p-3 ">
                        <div className=" px-3 py-1 row job-container text-center">
                            <div className="col-md-6 ">
                                <div className="row">
                                    {i.node.title}
                                </div>
                                <div className="row">
                                    <H3 primary>{i.node.value}</H3><span><H3 primary>{i.node.value_type}</H3></span>
                                </div>
                                <div className="row">
                                    {i.node.sub_title}
                                </div>
                            </div>
                            <div className="col-md-5 text-why pr-0"><img src={graphic} width="100%" /></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
