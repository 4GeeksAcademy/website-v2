import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GridContainer, Div, HR } from "../Sections";
import { H2, H3, Paragraph, SubTitle } from "../Heading";
import { Colors } from "../Styling";
import Icon from "../Icon";

const GeeksVsOthers = ({
  title,
  paragraph,
  limit,
  link,
  lang,
  mainBackround,
  style,
  thirdBackground,
  ...rest
}) => {
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
    ({ node }) => node.fields.lang === lang
  );
  if (geeks) geeks = geeks.node;

  return (
    <Div padding="40px 0" display="block" style={style}>
      {title && paragraph && (
        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding_tablet="0 4em"
          padding="0 2em"
          margin_tablet="0 auto 38px auto"
          margin="0 auto 24px auto"
          maxWidth="1280px"
        >
          <H2
            margin="0 0 15px 0"
            fontWeight="400"
            lineHeight="29px"
            lineHeight_tablet="38px"
            marginTop="30px"
          >
            {title}
          </H2>
          <SubTitle>{paragraph}</SubTitle>
        </Div>
      )}

      {/* 3 / span 10 */}
      <Div
        width="100%"
        display_xxs="none"
        display_md="flex"
        maxWidth="1280px"
        margin="0 auto"
        padding="20px"
        justifyContent="center"
      >
        <GridContainer
          borderRadiusChild="4px"
          borderRadiusChild_tablet="4px"
          overflowChild="auto"
          containerColumns_tablet="1fr repeat(10, 1fr) 1fr"
          gridColumn_tablet="1 / span 12"
          columns_tablet="9"
          columns="3"
          backgroundChild={mainBackround || Colors.whitePink}
          gridGap="0"
          columnGap="16px"
          padding_tabletChild="10px"
          width="100%"
          {...rest}
        >
          <Div
            gridColumn_tablet="1 / 4"
            height="74px"
            alignItems="center"
            padding="0 5px 0 20px"
            padding_tablet="0 16px"
          >
            <H3
              textAlign="left"
              fontWeight="400"
              lineHeight="28px"
              color={Colors.darkGray}
            >
              {geeks.titles.featured}
            </H3>
          </Div>
          <Div
            gridColumn_tablet="4 / 7"
            height="74px"
            alignItems="center"
            background={Colors.blue}
            borderRadius="4px 4px 0 0"
            padding="0 25px 0 20px"
            padding_tablet="0 16px"
          >
            <H3
              textAlign="left"
              fontWeight="400"
              lineHeight="28px"
              color={Colors.white}
            >
              {geeks.titles.at_geeks}
            </H3>
          </Div>
          <Div
            gridColumn_tablet="7 / 10"
            height="74px"
            alignItems="center"
            background={thirdBackground || Colors.white}
            borderRadius="4px"
            padding="0 25px 0 20px"
            padding_tablet="0 16px"
          >
            <H3
              textAlign="left"
              fontWeight="400"
              lineHeight="28px"
              color={Colors.darkGray}
            >
              {geeks.titles.average}
            </H3>
          </Div>

          {geeks.info.slice(0, limit || geeks.info.length).map((m, i, arr) => {
            return (
              <React.Fragment key={i}>
                <Div
                  gridColumn_tablet="1 / 4"
                  padding="0 5px 0 20px"
                  padding_tablet="0 16px"
                  display="block"
                >
                  <Div height="74px" alignItems="center">
                    <Paragraph
                      textAlign="left"
                      fontWeight="400"
                      lineHeight="22px"
                      textTransform="uppercase"
                      color={Colors.darkGray}
                    >
                      {m.features}
                    </Paragraph>
                  </Div>
                  {i < arr.length - 1 && (
                    <HR height="1px" background="rgba(164, 164, 164, 0.4)" />
                  )}
                </Div>
                <Div
                  gridColumn_tablet="4 / 7"
                  borderRadius={i === arr.length - 1 && "0 0 4px 4px"}
                  background={Colors.blue}
                  padding="0 25px 0 20px"
                  padding_tablet="0 16px"
                  display="block"
                >
                  <Div height="74px" alignItems="center">
                    <Paragraph
                      textAlign="left"
                      fontWeight="400"
                      lineHeight="22px"
                      textTransform="uppercase"
                      color={Colors.white}
                    >
                      {m.at4_Geeks}
                    </Paragraph>
                  </Div>
                  {i < arr.length - 1 && <HR height="1px" background="white" />}
                </Div>
                <Div
                  gridColumn_tablet="7 / 10"
                  background={thirdBackground || Colors.white}
                  borderRadius={i === arr.length - 1 && "0 0 4px 4px"}
                  padding="0 25px 0 20px"
                  padding_tablet="0 16px"
                  display="block"
                >
                  <Div height="74px" alignItems="center">
                    <Paragraph
                      textAlign="left"
                      fontWeight="400"
                      lineHeight="22px"
                      textTransform="uppercase"
                      color={Colors.darkGray}
                    >
                      {m.industry_average}
                    </Paragraph>
                  </Div>
                  {i < arr.length - 1 && (
                    <HR height="1px" background="rgba(164, 164, 164, 0.4)" />
                  )}
                </Div>
              </React.Fragment>
            );
          })}
        </GridContainer>
      </Div>

      {/* MOBILE VERSION*/}

      <Div
        flexWrap="wrap"
        padding_xs="0 0 20px 0"
        margin_tablet="20px 35px"
        margin_xxs="30px 20px"
        gridGap="10px"
        display_md="none"
        background={mainBackround || Colors.whitePink}
      >
        <H2
          fontSize="18px"
          fontWeight="900"
          lineHeight="19px"
          textAlign="center"
          color={Colors.darkGray}
          padding="30px 0 10px 0"
        >
          {geeks.titles.featured}
        </H2>

        {geeks.info.slice(0, limit || geeks.info.length).map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Div
                key={index}
                width="100%"
                height={selected.index === index ? "auto" : "50px"}
                //padding_xs="15px 0 0 0"
                margin_xs="0 15px"
                display_md="none"
                cursor="pointer"
                onClick={() => {
                  selected.index === index
                    ? setSelected({ index: null, manual: true })
                    : setSelected({ index: index, manual: true });
                }}
                justifyContent="between"
                flexDirection={selected.index === index && "column"}
                borderBottom={`1px solid ${Colors.gray2}`}
                position="relative"
                alignItems="center"
              >
                <H3
                  textAlign="left"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="22px"
                  textTransform="uppercase"
                  color={Colors.darkGray}
                  padding={selected.index === index ? "14px 0 0 0" : "0px"}
                  //style={{ position: "absolute", left: "0px", top: "15px" }}
                >
                  {item.features}
                </H3>
                <Div
                  style={{ position: "absolute", right: "0px", top: "15px" }}
                  transform={
                    selected.index === index ? "rotate(90deg)" : "rotate(0deg)"
                  }
                >
                  <Icon icon="arrow-right" width="32px" height="16px" />
                </Div>
                {selected.index === index && (
                  <Div flexDirection="row" margin="10px 0" width="100%">
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
                        color={Colors.darkGray}
                      >
                        {geeks.titles.at_geeks}
                      </Paragraph>
                      <Paragraph
                        textAlign="center"
                        fontSize="10px"
                        fontWeight="700"
                        lineHeight="22px"
                        color={Colors.darkGray}
                      >
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
                        color={Colors.darkGray}
                      >
                        {geeks.titles.average}
                      </Paragraph>
                      <Paragraph
                        textAlign="center"
                        fontSize="10px"
                        fontWeight="700"
                        lineHeight="22px"
                        color={Colors.darkGray}
                      >
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
      {link && (
        <Div justifyContent="center" margin="50px 0 0 0" padding="0 0 25px 0">
          <Link to={geeks.button.button_link}>
            <Paragraph
              color={Colors.blue}
              fontWeight="700"
              fontWeight_tablet="700"
              fontSize="21px"
            >
              {geeks.button.button_text}
            </Paragraph>
          </Link>
        </Div>
      )}
    </Div>
  );
};

export default GeeksVsOthers;
