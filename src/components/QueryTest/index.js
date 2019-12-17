import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {H4} from '../Heading'
import {Card} from '../Card'
import {Graduation, Trophy, Book, Hand, Colors} from '../Styling'
import {useSpring, animated} from 'react-spring'
import '../../assets/css/style.scss';

const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`;

export const Icon = props => (
  (props.credential === "Campuses") &&
  console.log(props.credential)


)
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
        console.log(i.node.cred_value)
        return (
          <div key={index} className="col-md-2">
            <Card
              height="275px"
              width="200px"
              color="white"
              shadow
            >
              {/* <Icon credential={i.node.credential} /> */}
              <div className="cred-title">{i.node.credential}</div>
              <div><H4>{i.node.cred_symbol}{i.node.cred_value}</H4></div>
            </Card>
          </div>
        )
      })}
    </div>
  )
}




