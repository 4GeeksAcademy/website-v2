import React from 'react';
import {H2, H3, H4} from '../Heading'
import Card from '../Card'
import {Colors} from '../Styling'
import Icon from "../Icon"
import {Row, Column, Container, Divider, Div} from '../Sections'

export default props => {
  const credentials = props.lang[0].node.credentials
  const shadow = props.shadow === undefined || props.shadow === true;
  const scope = props.scope_slug; // it can be course slug like "full-stack" or an academy location like "downtown-miami"
  return (
    <Row
      github="/components/credentials"
      display={`flex`}
      background={Colors.verylightGray}
      height={`219px`}
    >
      {credentials.filter(c => c.scope === scope).map((i, index) => {
        return (
          <Column key={index}
            size="3"
            size_sm="6"
            margin_sm="10px"
            m_md="35px 0 5px 0"
            display={`flex`}
            justifyContent={`center`}
          >
            {/* <Card
              padding="15px"
              shadow={shadow}
              color={'verylightGray'}
              align="center"
              transform={`translateY(-${(index % 2 !== 0) ? props.up + "px" : ((props.up * 20) / 100) + "px"})`}
            > */}
            <Div display={`flex`}>


              <Icon icon={i.icon} width="48" color={Colors.yellow} fill={Colors.yellow} />
              <Div display={`flex`} flexDirection={`column`} justifyContent={`center`} margin="0 0 0 10px">
                <H3 margin="5px 0" fontSize="22px" >{i.value}</H3>
                <H4
                  fontSize="15px"
                  lineHeight="19px"
                  uppercase>{i.title}
                </H4>

              </Div>
            </Div>
            {/* </Card> */}
          </Column>
        )
      })}
    </Row>
  )
}




