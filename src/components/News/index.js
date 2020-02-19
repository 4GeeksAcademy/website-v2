import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Row} from '../Sections'
import graphic from "../../assets/images/graphic.png"

export default () => {
  // const data = useStaticQuery(graphql`
  //   query myQueryNews{
  //       news: allNewsYaml {
  //         edges {
  //           node {
  //             news {
  //                 name
  //                 image
  //               }
  //           }
  //         }
  //       }
  //     }
  //   `)
  return (
    <Row>
      <div className="col-lg-8 offset-lg-1 text-center">
        <Row>
          {data.news.edges[0].node.news.map(i => (
            <div className="col-md-4 ">
              <img src={i.image} width="100%" height="150" />
            </div>
          ))}
        </Row>
      </div>
    </Row>
  )
}
