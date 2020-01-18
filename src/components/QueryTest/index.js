import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {H2, H3, H4} from '../Heading'
import {Card} from '../Card'
import {Graduation, Trophy, Book, Hand, Colors} from '../Styling'
import {Row, Column, Container} from '../Sections'
import '../../assets/css/style.scss';

export default props => {
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
    <Row >
      {data.credentials.edges.map((i, index) => {
        return (
          <div key={index} className={"col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 text-center mb-2"}>

            {(index % 2 !== 0) ?
              (<Card
                height="250px"
                width="180px"
                color="white"
                shadow
                move="up"
                up={props.up}
              >
                <div className="py-4">
                  {(i.node.credential === "Campuses") && <Trophy width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.node.credential === "Alumni") && <Graduation width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.node.credential === "Rating") && <Book width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.node.credential === "Hired") && <Hand width="48" color={Colors.yellow} fill={Colors.yellow} />}
                </div>
                <div className="card-body p-0"><H4 up>{i.node.credential}</H4></div>
                <div className="card-footer bg-white border-0 p-0">
                  {(i.node.credential === "Hired") ? <H2>{i.node.cred_value}{i.node.cred_symbol}</H2> : <H2>{i.node.cred_symbol}{i.node.cred_value}</H2>}
                </div>
              </Card>)
              :
              <Card
                height="250px"
                width="180px"
                color="white"
                shadow
              >
                <div className="py-4">
                  {(i.node.credential === "Campuses") && <Trophy width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.node.credential === "Alumni") && <Graduation width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.node.credential === "Rating") && <Book width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.node.credential === "Hired") && <Hand width="48" color={Colors.yellow} fill={Colors.yellow} />}
                </div>
                <div className="card-body p-0"><H4 up>{i.node.credential}</H4></div>
                <div className="card-footer bg-white border-0 p-0">
                  {(i.node.credential === "Hired") ? <H2>{i.node.cred_value}{i.node.cred_symbol}</H2> : <H2>{i.node.cred_symbol}{i.node.cred_value}</H2>}
                </div>
              </Card>}
          </div>
        )
      })}
    </Row>
  )
}




