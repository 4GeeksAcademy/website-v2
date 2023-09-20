import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GridContainer, Div } from "../Sections";
import { H2, H3, Paragraph } from "../Heading";
import { Colors } from "../Styling";
import Icon from "../Icon";
// import Link from "gatsby-link";
import Fragment from "../Fragment";

const GeeksVsOthers = (props) => {

  const [selected, setSelected] = useState({ index: null, manual: false });

  const data = useStaticQuery(graphql`
    query newGeeksVsOthersQuery {
      allGeeksVsOthersYaml {
        edges {
          node {
            fields {
              lang
            }
            info {
              features
              at4_Geeks
              industry_average
              why_important
              icon
            }
            globe_text
            titles {
              featured
              at_geeks
              average
            }

            button {
              button_text
              button_link
            }
          }
        }
      }
    }
  `);

  let geeks = data.allGeeksVsOthersYaml.edges.find(
    ({ node }) => node.fields.lang === props.lang
  );
  if (geeks) geeks = geeks.node;

  return (
    <Fragment github="/components/geeks_vs_others">
      {props.title && props.paragraph && (
        <GridContainer margin_tablet="0 0 38px 0" margin="0 0 24px 0">
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding_tablet="0 4em"
            padding="0 2em"
          >
            <H2
              margin="0 0 15px 0"
              fontSize="24px" fontSize_tablet="32px"
              fontWeight="700"
              lineHeight="29px" lineHeight_tablet="38"
            >{props.title}</H2>
            <Paragraph fontSize_tablet="15px" fontSize="18px"> {props.paragraph}</Paragraph>
          </Div>
        </GridContainer>
      )}

      {/* 3 / span 10 */}
      <Div width="100%" 
        display_xss="none" 
        display_md="flex" 
        maxWidth="1366px" 
        margin="auto"
        justifyContent="center"
      > 
        <GridContainer
          borderRadiusChild="3px"
          borderRadiusChild_tablet="3px"
          overflowChild="auto"
          containerColumns_tablet={`1fr repeat(10, 1fr) 1fr`}
          gridColumn_tablet="2 / span 10"
          columns_tablet="9"
          columns="3"
          backgroundChild={Colors.whitePink}
          gridGap="0"
          padding_tabletChild="10px"
        >
          <Div
            gridColumn_tablet="1 / 4"
            height="74px"
            alignItems="center"
            padding="0 5px 0 20px"
            padding_tablet="0 5px 0 10px"
          >
            <H3
              textAlign="left"
              fontSize="24px"
              fontWeight="900"
              lineHeight="19px"
              color={Colors.darkGray}
            >
              {geeks.titles.featured}
            </H3>
          </Div>
          <Div
            gridColumn_tablet="4 / 7"
            height="74px"
            alignItems="center"
            background={Colors.veryLightBlue}
            padding="0 25px 0 20px"
            padding_tablet="0 5px 0 40px"
          >
            <H3
              textAlign="left"
              fontSize="24px"
              fontWeight="900"
              lineHeight="19px"
              color={Colors.darkGray}
            >
              {geeks.titles.at_geeks}
            </H3>
          </Div>
          <Div
            gridColumn_tablet="7 / 10"
            height="74px"
            alignItems="center"
            background={Colors.white}
            padding="0 25px 0 20px"
            padding_tablet="0 5px 0 40px"
          >
            <H3
              textAlign="left"
              fontSize="24px"
              fontWeight="900"
              lineHeight="19px"
              color={Colors.darkGray}
            >
              {geeks.titles.average}
            </H3>
          </Div>

          {geeks.info.slice(0, props.limit || geeks.info.length).map((m, i) => {
            return (
              <React.Fragment key={i}>
                <Div
                  gridColumn_tablet="1 / 4"
                  borderBottom={
                    i < geeks.info.length - 1 &&
                    "1px solid rgba(164, 164, 164, 0.4)"
                  }
                  height="74px"
                  alignItems="center"
                  padding="0 5px 0 20px"
                  padding_tablet="0 5px 0 10px"
                >
                  <H3
                    textAlign="left"
                    fontSize="15px"
                    fontWeight="700"
                    lineHeight="22px"
                    textTransform="uppercase"
                    color={Colors.darkGray}
                  >
                    {m.features}
                  </H3>
                </Div>
                <Div
                  gridColumn_tablet="4 / 7"
                  borderBottom={
                    i < geeks.info.length - 1 &&
                    "1px solid rgba(164, 164, 164, 0.4)"
                  }
                  height="74px"
                  alignItems="center"
                  background={Colors.veryLightBlue}
                  padding="0 25px 0 20px"
                  padding_tablet="0 5px 0 40px"
                >
                  <H3
                    textAlign="left"
                    fontSize="15px"
                    fontWeight="700"
                    lineHeight="22px"
                    textTransform="uppercase"
                    color={Colors.darkGray}
                  >
                    {m.at4_Geeks}
                  </H3>
                </Div>
                <Div
                  gridColumn_tablet="7 / 10"
                  borderBottom={
                    i < geeks.info.length - 1 &&
                    "1px solid rgba(164, 164, 164, 0.4)"
                  }
                  height="74px"
                  alignItems="center"
                  background={Colors.white}
                  padding="0 25px 0 20px"
                  padding_tablet="0 5px 0 40px"
                >
                  <H3
                    textAlign="left"
                    fontSize="15px"
                    fontWeight="700"
                    lineHeight="22px"
                    textTransform="uppercase"
                    color={Colors.darkGray}
                  >
                    {m.industry_average}
                  </H3>
                </Div>
              </React.Fragment>
            );
          })}
        </GridContainer>
      </Div>
      <GridContainer margin="0 0 36px 0" margin_tablet="0 0 76px 0">
        {props.link && (
          <Div justifyContent="center" margin="50px 0 0 0">
            <Link to={geeks.button.button_link}>
              <Paragraph color={Colors.blue}>
                {geeks.button.button_text}
              </Paragraph>
            </Link>
          </Div>
        )}
      </GridContainer>

      {/* MOBILE VERSION*/}

      <Div
        //className="program-details-mobile"
        flexWrap="wrap"
        padding_xs="40px 0 20px 0"
        margin_tablet="20px 35px"
        margin_xs="0 20px"
        gridGap="10px"
        display_md="none"
        background={Colors.whitePink}
      >
        <H2
          fontSize="18px"
          fontWeight="900"
          lineHeight="19px"
          textAlign="center"
          color={Colors.darkGray}
        >
          {geeks.titles.featured}
        </H2>

        {geeks.info.slice(0, props.limit || geeks.info.length).map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Div
                key={index}
                width="100%"
                height={selected.index === index ? "auto" : "76px"}
                padding_xs="15px 0 0 0"
                margin_xs="0 15px"
                display_md="none"
                cursor={`pointer`}
                onClick={() => {
                  selected.index === index
                    ? setSelected({ index: null, manual: true })
                    : setSelected({ index: index, manual: true })
                }}
                justifyContent={`between`}
                flexDirection={selected.index === index && "column"}
                borderBottom={`1px solid ${Colors.gray2}`}
                position="relative"
                alignItems="stretch"
              >
                <H3
                  textAlign="left"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="22px"
                  textTransform="uppercase"
                  color={Colors.darkGray}
                >
                  {item.features}
                </H3>
                <Icon
                  icon="arrow-right"
                  width="32px"
                  height="16px"
                  style={{ position: "absolute", right: "0px", top: "15px" }}
                />
                {selected.index === index && (
                  <Div
                    flexDirection="row"
                    margin="10px 0"

                  >
                    <Div
                      flexDirection="column"
                      width="50%"
                      background={Colors.veryLightBlue}
                      padding="8px"
                    >
                      <Paragraph
                        textAlign="center"
                        fontSize="10px"
                        fontWeight="700"
                        lineHeight="22px"
                        color={Colors.darkGray}>
                        {geeks.titles.at_geeks}
                      </Paragraph>
                      <Paragraph
                        textAlign="center"
                        fontSize="10px"
                        fontWeight="700"
                        lineHeight="22px"
                        color={Colors.darkGray}>
                        {item.at4_Geeks}
                      </Paragraph>
                    </Div>

                    <Div
                      flexDirection="column"
                      width="50%"
                      background={Colors.white}
                      padding="8px"
                    >
                      <Paragraph
                        textAlign="center"
                        fontSize="10px"
                        fontWeight="700"
                        lineHeight="22px"
                        color={Colors.darkGray}>
                        {geeks.titles.average}
                      </Paragraph>
                      <Paragraph
                        textAlign="center"
                        fontSize="10px"
                        fontWeight="700"
                        lineHeight="22px"
                        color={Colors.darkGray}>
                        {item.industry_average}
                      </Paragraph>
                    </Div>
                  </Div>
                )}
              </Div>
            </React.Fragment>
          );
        })}
      </Div>
    </Fragment>
  );
};

export default GeeksVsOthers;
