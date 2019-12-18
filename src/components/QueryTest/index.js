import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {H2, H3, H4} from '../Heading'
import {Card} from '../Card'
import {Graduation, Trophy, Book, Hand, Colors} from '../Styling'
import {useSpring, animated} from 'react-spring'
import '../../assets/css/style.scss';

const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`;

export default () => {
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
        let offset = "";
        if (index === 0) {
          offset += " offset-1 "
        }
        if (index % 2 == 0) {
          offset += " credentials-transform "
        }
        return (
          <div key={index} className={"col-lg-2 text-center" + offset}>
            <Card
              height="275px"
              width="200px"
              color="white"
              shadow
            >
              <div className="py-4">
                {(i.node.credential === "Campuses") && <Trophy width="48" color={Colors.blue} fill={Colors.blue} />}
                {(i.node.credential === "Alumni") && <Graduation width="48" color={Colors.blue} fill={Colors.blue} />}
                {(i.node.credential === "Rating") && <Book width="48" color={Colors.blue} fill={Colors.blue} />}
                {(i.node.credential === "Hired") && <Hand width="48" color={Colors.blue} fill={Colors.blue} />}
              </div>
              <div className="card-body p-0"><H4 up>{i.node.credential}</H4></div>
              <div className="card-footer bg-white border-0 p-0">
                {(i.node.credential === "Hired") ? <H2>{i.node.cred_value}{i.node.cred_symbol}</H2> : <H2>{i.node.cred_symbol}{i.node.cred_value}</H2>}
              </div>
            </Card>
          </div>
        )
      })}
    </div>
  )
}




