import React from 'react';
import {H2, H3, H4} from '../Heading'
import Card from '../Card'
import {Colors} from '../Styling'
import Icon from "../Icon"
import {Row, Column, Container, Divider} from '../Sections'

export default props => {
  const credentials = props.lang[0].node.credentials
  const shadow = props.shadow===undefined || props.shadow===true;
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
                shadow={shadow}
                color={'grey'}
                align="center"
                transform={`translateY(-${(index % 2 !== 0) ? props.up + "px" : ((props.up * 20) / 100) + "px"})`}
              >
                <Icon icon={i.icon} width="48" color={Colors.yellow} fill={Colors.yellow} />
                {(i.slug === "hired" || i.slug === "contratados") ? 
                  <H3 margin="10px 0 20px 0">{i.value}{i.symbol}</H3> 
                  :
                  <H3 margin="10px 0 20px 0">{i.symbol}{i.value}</H3>
                }
                <H4
                  fs_xs="16px"
                  fs_md="16px"
                  fs_lg="18px"
                  fontSize="20px"
                  uppercase>{i.title}
                </H4>
              </Card>
          </Column>
        )
      })}
    </Row>
  )
}




