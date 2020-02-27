import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {H2, H3, H4} from '../Heading'
import {Card} from '../Card'
import {Graduation, Trophy, Book, Hand, Colors} from '../Styling'
import {Row, Column, Container, Divider} from '../Sections'

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
          <Column key={index} size="3" customRespSize respSize="6" respSizeMargin="10px" m_xs="5px 0" m_sm="5px 0" m_md="5px 0">
            {(index % 2 !== 0) ?
              (<Card

                h_xs="150px"
                h_sm="190px"
                h_md="150px"
                h_lg="200px"
                h_xl="250px"
                width="100%"
                color="white"
                padding="15px"
                shadow
                move="up"
                up={props.up + "px"}

              >
                <Row align="center" height="30%">
                  {(i.slug === "campuses") && <Book width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "alumni") && <Graduation width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "rating") && <Trophy width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "hired") && <Hand width="48" color={Colors.yellow} fill={Colors.yellow} />}
                </Row>
                <Divider height="10%" />
                <Row align="center" height="30%">
                  {(i.slug === "hired") ? <H3>{i.value}{i.symbol}</H3> : <H3>{i.symbol}{i.value}</H3>}
                </Row>
                <Divider height="5%" />
                <Row align="center" height="25%">
                  <H4
                    fs_xs="20px"
                    fs_sm="24px"
                    fs_md="24px"
                    fs_lg="20px"
                    fs_xl="24px"
                    uppercase>{i.title}
                  </H4>
                </Row>
              </Card>)
              :
              <Card

                h_xs="150px"
                h_sm="190px"
                h_md="150px"
                h_lg="200px"
                h_xl="250px"
                width="100%"
                color="white"
                padding="15px"
                shadow
                move="up"
                up={props.up - ((props.up * 20) / 100) + "px"}
              >
                <Row align="center" height="30%">
                  {(i.slug === "campuses") && <Book width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "alumni") && <Graduation width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "rating") && <Trophy width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "hired") && <Hand width="48" color={Colors.yellow} fill={Colors.yellow} />}
                </Row>
                <Divider height="10%" />
                <Row align="center" height="30%">
                  {(i.slug === "hired") ? <H3>{i.value}{i.symbol}</H3> : <H3>{i.symbol}{i.value}</H3>}
                </Row>
                <Divider height="5%" />
                <Row align="center" height="25%">
                  <H4
                    fs_xs="20px"
                    fs_sm="24px"
                    fs_md="24px"
                    fs_lg="20px"
                    fs_xl="24px"
                    uppercase
                  >{i.title}</H4>
                </Row>
              </Card>}
          </Column>
        )
      })}
    </Row>
  )
}




