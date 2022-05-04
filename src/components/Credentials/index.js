import React from "react";
import { H2, H3, H4 } from "../Heading";
import { Colors } from "../Styling";
import Icon from "../Icon";
import { Grid, Div, GridContainer } from "../Sections";

export default (props) => {
  const credentials = props.lang[0].node.credentials;
  const scope = props.scope_slug; // it can be course slug like "full-stack" or an academy location like "downtown-miami"
  return (
    <GridContainer
      height="375px"
      height_tablet="219px"
      background={Colors.verylightGray}
      columns="2"
      padding="0"
      columns_tablet="4"
      margin="0 0 67px 0"
      margin_tablet="0 0 57px 0"
    >
      {credentials
        .filter((c) => c.scope === scope)
        .map((m, i) => {
          return (
            <Div
              key={i}
              gridGap="0"
              alignItems="center"
              justifyContent="center"
              justifyContent_md="start"
              flexDirection="column"
              flexDirection_md="row"
            >
              <Icon icon={m.icon} width="48" height="48" />
              <Div
                flexDirection="column"
                margin="10px 0 0 0"
                margin_md="0 0 0 20px"
              >
                <H3>{m.value}</H3>
                <H4
                  fontWeight="700"
                  lineHeight="19px"
                  textTransform="uppercase"
                  color={Colors.darkGray}
                >
                  {m.title}
                </H4>
              </Div>
            </Div>
          );
        })}
    </GridContainer>
  );
};
