import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {H2, H3, H4} from '../Heading'
import {Card} from '../Card'
import {Graduation, Trophy, Book, Hand, Colors} from '../Styling'
import {Row, Column, Container, Divider} from '../Sections'
import Fragment from "../Fragment"

export default props => {
  const credentials = props.lang[0].node.credentials
  return (
    <Row github="/components/credentials">
      {credentials.map((i, index) => {
        return (
          <Column key={index} size="3" customRespSize respSize="6" respSizeMargin="10px" m_xs="35px 0 5px 0" m_sm="35px 0 5px 0" m_md="35px 0 5px 0">
              <Card
                padding="15px"
                shadow
                align="center"
                move="up"
                up={(index % 2 !== 0) ? props.up + "px" : ((props.up * 20) / 100) + "px"}
              >
                {(i.slug === "campuses" || i.slug === "campus") && <Book width="48" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.slug === "alumni" || i.slug === "graduados") && <Graduation width="48" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.slug === "rating" || i.slug === "valoracion") && <Trophy width="48" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.slug === "hired" || i.slug === "contratados") && <Hand width="48" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.slug === "hired" || i.slug === "contratados") ? 
                  <H3 margin="10px 0 20px 0">{i.value}{i.symbol}</H3> 
                  :
                  <H3 margin="10px 0 20px 0">{i.symbol}{i.value}</H3>
                }
                <H4
                  fs_xs="20px"
                  fs_sm="18px"
                  fs_md="16px"
                  fs_lg="18px"
                  fs_xl="20px"
                  uppercase>{i.title}
                </H4>
              </Card>
          </Column>
        )
      })}
    </Row>
  )
}




