import React from 'react';
import {H2, H3, H4} from '../Heading'
import {Colors} from '../Styling'
import Icon from "../Icon"
import {Grid, Div} from '../Sections'

const positions = [{
  position: "1/3/1/5",
},
{
  position: "1/5/1/7",
}
  ,
{
  position: "1/7/1/9",
}
  ,
{
  position: "1/9/1/11",
}
]

export default props => {
  const credentials = props.lang[0].node.credentials
  const scope = props.scope_slug; // it can be course slug like "full-stack" or an academy location like "downtown-miami"
  return (
    <Grid height="375px" height_md="219px" columns="2" rows="2" columns_md="12" rows_md="1" background={Colors.verylightGray}>
      {credentials.filter(c => c.scope === scope).map((m, i) => {
        return (
          <Div key={i} gridArea_md={positions[i].position} gridGap="0" alignItems="center" justifyContent="center" flexDirection="column" flexDirection_md="row">
            <Icon icon={m.icon} width="48" height="48" />
            <Div flexDirection="column" margin="10px 0 0 0" margin_md="0 0 0 20px">
              <H3>{m.value}</H3>
              <H4 lineHeight="19px" textTransform="uppercase" color={Colors.darkGray}>{m.title}</H4>
            </Div>
          </Div>
        )
      })}
    </Grid>
  )
}





