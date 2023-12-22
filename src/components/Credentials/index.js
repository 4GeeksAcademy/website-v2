import React from "react";
import { H2, H3, H4 } from "../Heading";
import { Colors } from "../Styling";
import Icon from "../Icon";
import { Grid, Div, GridContainer } from "../Sections";

export default (props) => {
  const credentials = props.lang[0].node.credentials;
  const scope = props.scope_slug; // it can be course slug like "full-stack" or an academy location like "downtown-miami"
  return (
    <>
      <Div
        width="100%"
        background={Colors.verylightGray}
        justifyContent_tablet="center"
        flexDirection="column"
        padding_xxs="20px"
        padding_tablet="0px"
        style={{ padding: "20px 0" }}
      >
        <GridContainer
          //height="375px"
          height_tablet="219px"
          background={Colors.verylightGray}
          columns="2"
          //padding="0 20px"
          containerColumns_tablet="repeat(12, 1fr)"
          gridColumn_tablet="1/ span 12"
          columns_tablet={credentials.length}
          margin="0 20px"
          margin_tablet="0 auto"
          maxWidth="1366px"
          gridGap_xxs="30px 15px"
          gridGap_tablet="15px"
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
                  //justifyContent_md="start"
                  flexDirection="column"
                  flexDirection_md="row"
                  minWidth_tablet="181px"
                  width_md="100%"
                  minWidth_md="245px"
                  minWidth_lg="330px"
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
      </Div>
    </>
  );
};
