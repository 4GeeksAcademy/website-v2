import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Title, H3, H4} from '../Heading'
import {Container, Cont, Col, Row, Divider} from '../Sections'
import {Address, HandMoney, Laptop, Colors, RoundImage} from '../Styling'

export default () => {
  const data = useStaticQuery(graphql`
      query myQueryWhy{
          why: allWhy4GeeksYaml {
            edges {
              node {
                title
                description
                image
                slug
              }
            }
          }
        }
      `)
  return (
    <>
      <Title
        title="WHY 4GEEKS?"
        style="light"
      />

      <div className="row">
        {data.why.edges.map(i => (
          <div className="col-md-4 col-sm-12">
            <RoundImage url={i.node.image} mb="10px"></RoundImage>
            <div className=" px-3 row">
              <div className="col-md-2 col-sm-2 col-2 p-0">
                {(i.node.slug === "job-in-tech") && <Address width="48" color={Colors.blue} fill={Colors.blue} />}
                {(i.node.slug === "finance-your-career") && <HandMoney width="48" color={Colors.blue} fill={Colors.blue} />}
                {(i.node.slug === "never-code-alone-again") && <Laptop width="48" color={Colors.blue} fill={Colors.blue} />}
              </div>
              <div className="col-md-10 col-sm-10 col-10 pr-0"><H4 up>{i.node.title}</H4></div>
            </div>
            <div className=" text-center row mt-2">
              <div className="text-why-p">{i.node.description}</div>
            </div>
          </div>
        ))}
      </div>


    </>
  )
}
// export default () => {
//   const data = useStaticQuery(graphql`
//       query myQueryWhy{
//           why: allWhy4GeeksYaml {
//             edges {
//               node {
//                 title
//                 description
//                 image
//                 slug
//               }
//             }
//           }
//         }
//       `)
//   return (
//     <>
//       <Title
//         title="WHY 4GEEKS?"
//         style="light"
//       />

//       <Row>
//         {data.why.edges.map(i => (
//           <div className="col-md-4 col-sm-12">
//             <Rounded className="card card-why4 p-3 text-center  border-0 bg-transparent">
//               <img src={i.node.image} width="100%" height="180" />
//             </Rounded>
//             <div className=" px-3 row">
//               <div className="col-md-2 col-sm-2">
//                 {(i.node.slug === "job-in-tech") && <Address width="48" color={Colors.blue} fill={Colors.blue} />}
//                 {(i.node.slug === "finance-your-career") && <HandMoney width="48" color={Colors.blue} fill={Colors.blue} />}
//                 {(i.node.slug === "never-code-alone-again") && <Laptop width="48" color={Colors.blue} fill={Colors.blue} />}
//               </div>
//               <div className="col-md-10 col-sm-10  pr-0"><H4 up>{i.node.title}</H4></div>
//             </div>
//             <div className=" text-center row mt-2">
//               <div className="text-why-p">{i.node.description}</div>
//             </div>
//           </div>
//         ))}
//       </Row>


//     </>
//   )
// }

