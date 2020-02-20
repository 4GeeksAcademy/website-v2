import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {H2, H3, H4} from '../Heading'
import {Card} from '../Card'
import {Graduation, Trophy, Book, Hand, Colors} from '../Styling'
import {Row, Column, Container} from '../Sections'

export default props => {
  const data = useStaticQuery(graphql`
      query myCredentialsQuery{
        allCredentialsYaml {
          edges {
            node {
              credentials {
                title
                slug
                value
                symbol
                symbol_position
              }
            }
          }
        }
          }
      `)
  const credentials = data.allCredentialsYaml.edges[0].node.credentials
  return (
    <Row >
      {credentials.map((i, index) => {
        return (
          <div key={index} className={"col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 text-center mb-2"}>
            {(index % 2 !== 0) ?
              (<Card
                height="250px"
                heightLg="200px"
                width="200px"
                widthLg="150px"
                color="white"
                shadow
                move="up"
                up={props.up + "px"}
              >
                <div className="py-4">
                  {(i.slug === "campuses") && <Book width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "alumni") && <Graduation width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "rating") && <Trophy width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "hired") && <Hand width="48" color={Colors.yellow} fill={Colors.yellow} />}
                </div>
                <div className="card-footer bg-white border-0 p-0 mb-4">
                  {(i.slug === "hired") ? <H3>{i.value}{i.symbol}</H3> : <H3>{i.symbol}{i.value}</H3>}
                </div>
                <div className="card-body p-0"><H4 uppercase>{i.title}</H4></div>
              </Card>)
              :
              <Card
                height="250px"
                heightLg="200px"
                width="200px"
                widthLg="150px"
                color="white"
                shadow
                move="up"
                up={props.up - ((props.up * 20) / 100) + "px"}
              >
                <div className="py-4">
                  {(i.slug === "campuses") && <Book width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "alumni") && <Graduation width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "rating") && <Trophy width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "hired") && <Hand width="48" color={Colors.yellow} fill={Colors.yellow} />}
                </div>
                <div className="card-footer bg-white border-0 p-0 mb-4">
                  {(i.slug === "hired") ? <H3>{i.value}{i.symbol}</H3> : <H3>{i.symbol}{i.value}</H3>}
                </div>
                <div className="card-body p-0"><H4 uppercase>{i.title}</H4></div>
              </Card>}
          </div>
        )
      })}
    </Row>
  )
}




