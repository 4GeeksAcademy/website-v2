import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {H2, H3, H4} from '../Heading'
import {Card} from '../Card'
import {Graduation, Trophy, Book, Hand, Colors} from '../Styling'
import {Row, Column, Container, Divider} from '../Sections'

export default props => {
  const credentials = props.lang[0].node.credentials
  return (
    <Row >
      {credentials.map((i, index) => {
        return (
          <Column key={index} size="3" customRespSize respSize="6" respSizeMargin="10px" m_xs="35px 0 5px 0" m_sm="35px 0 5px 0" m_md="35px 0 5px 0">
            {(index % 2 !== 0) ?
              (<Card

                h_xs="150px"
                h_sm="190px"
                h_md="150px"
                h_lg="200px"
                h_xl="270px"
                width="100%"
                color="white"
                padding="15px"
                shadow
                move="up"
                up={props.up + "px"}

              >
                <Row align="center" height="30%">
                  {(i.slug === "campuses" || i.slug === "campus") && <Book width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "alumni" || i.slug === "graduados") && <Graduation width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "rating" || i.slug === "valoracion") && <Trophy width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "hired" || i.slug === "contratados") && <Hand width="48" color={Colors.yellow} fill={Colors.yellow} />}
                </Row>
                <Divider height="10%" />
                <Row align="center" height="30%">
                  {(i.slug === "hired" || i.slug === "contratados") ? <H3>{i.value}{i.symbol}</H3> : <H3>{i.symbol}{i.value}</H3>}
                </Row>
                <Divider height="5%" />
                <Row align="center" height="25%">
                  <H4
                    fs_xs="20px"
                    fs_sm="18px"
                    fs_md="16px"
                    fs_lg="18px"
                    fs_xl="20px"
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
                h_xl="270px"
                width="100%"
                color="white"
                padding="15px"
                shadow
                move="up"
                up={props.up - ((props.up * 20) / 100) + "px"}
              >
                <Row align="center" height="30%">
                  {(i.slug === "campuses" || i.slug === "campus") && <Book width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "alumni" || i.slug === "graduados") && <Graduation width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "rating" || i.slug === "valoracion") && <Trophy width="48" color={Colors.yellow} fill={Colors.yellow} />}
                  {(i.slug === "hired" || i.slug === "contratados") && <Hand width="48" color={Colors.yellow} fill={Colors.yellow} />}
                </Row>
                <Divider height="10%" />
                <Row align="center" height="30%">
                  {(i.slug === "hired" || i.slug === "contratados") ? <H3>{i.value}{i.symbol}</H3> : <H3>{i.symbol}{i.value}</H3>}
                </Row>
                <Divider height="5%" />
                <Row align="center" height="25%">
                  <H4
                    fs_xs="20px"
                    fs_sm="18px"
                    fs_md="16px"
                    fs_lg="18px"
                    fs_xl="20px"
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




