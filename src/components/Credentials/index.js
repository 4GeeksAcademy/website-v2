import React from 'react';
import {H2, H3, H4} from '../Heading'
import {Card} from '../Card'
import {Graduation, Trophy, Book, Hand, Colors} from '../Styling'
import {Row, Column, Container, Divider} from '../Sections'

export default props => {
  const credentials = props.lang[0].node.credentials
  const scope = props.scope_slug; // it can be course slug like "full-stack" or an academy location like "downtown-miami"
  return (
    <Row github="/components/credentials">
      {credentials.filter(c => c.scope === scope).map((i, index) => {
        return (
          <Column key={index} 
            size="3" 
            size_sm="6" 
            margin_sm="10px" 
            m_md="35px 0 5px 0"
          >
              <Card
                padding="15px"
                shadow
                align="center"
                transform={`translateY(-${(index % 2 !== 0) ? props.up + "px" : ((props.up * 20) / 100) + "px"})`}
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




