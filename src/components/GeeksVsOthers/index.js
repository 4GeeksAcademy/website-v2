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
              logo
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
    <Div
      padding="40px 0"
      display="flex"
      alignItems="center"
      width="100%"
      margin="0 auto"
      justifyContent="center"
      style={style}
    >
      {(title || paragraph) && (
        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding_tablet="0 4em"
          padding="0"
          margin_tablet="0 auto 38px auto"
          margin="0 auto 24px auto"
          maxWidth="1280px"
        >
          {title && (
            <H2
              margin="0 0 15px 0"
              fontWeight="400"
              fontSize="32px"
              fontSize_md="36px"
              fontSize_xs="15x"
              lineHeight="32px"
              lineHeight_tablet="38px"
              marginTop="30px"
            >
              {title}
            </H2>
          )}
          {paragraph && <SubTitle>{paragraph}</SubTitle>}
        </Div>
      )}


      {/* 3 / span 10 */}
      <Div
        width="100%"
        display_xxs="none"
        display_md="flex"
        maxWidth="1280px"
        margin="20px"
        padding="0"
        justifyContent="center"
        border="1px solid black"
        borderRadius="4px"
        boxShadow="10px 10px 0px 0px rgba(0,0,0)"
      >
        <GridContainer
          borderRadiusChild="4px"
          borderRadiusChild_tablet="4px"
          overflowChild="auto"
          containerColumns_tablet="1fr repeat(10, 1fr) 1fr"
          gridColumn_tablet="1 / span 12"
          columns_tablet="9"
          columns="3"
          backgroundChild={mainBackround || Colors.white}
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
              fontSize="24px"
              fontWeight="600"
              lineHeight="20px"
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
            padding="25px 20px"
            padding_tablet="0 16px"
          >
            <Div display="flex" alignItems="center">
              {geeks.titles.logo && (
                <img
                  src={geeks.titles.logo}
                  alt="Rigobot Logo"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                  }}
                />
              )}
              <H3
                textAlign="left"
                fontSize="24px"
                fontWeight="600"
                lineHeight="20px"
                color={Colors.white}
              >
                {geeks.titles.at_geeks}
              </H3>
            </Div>
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
              fontSize="24px"
              fontWeight="600"
              lineHeight="20px"
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
                  background={i % 2 === 0 ? "#F4F9FF" : "transparent"}
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
                    <HR
                      height="1px"
                      background="white"
                      display="none"
                      display_tablet="block"
                      display_xxs="block"
                    />
                  )}
                </Div>
                <Div
                  gridColumn_tablet="4 / 7"
                  id="column4-7-section"
                  borderRadius={i === arr.length - 1 && "0 0 4px 4px"}
                  background={i % 2 === 0 ? "#077EED" : Colors.blue}
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
                  {/* {i < arr.length - 1 && (
                    <HR
                      height="1px"
                      background="white"
                      display="none"
                      display_tablet="block"
                      display_xxs="block"
                    />
                  )} */}
                </Div>
                <Div
                  gridColumn_tablet="7 / 10"
                  background={
                    i % 2 === 0 ? "#F4F9FF" : thirdBackground || Colors.white
                  }
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
                  {/* {i < arr.length - 1 && (
                    <HR
                      height="1px"
                      background="white"
                      display="none"
                      display_tablet="block"
                      display_xxs="block"
                    />
                  )} */}
                </Div>
              </React.Fragment>
            );
          })}
        </GridContainer>
      </Div>

      {/* MOBILE VERSION*/}

      <Div
        flexWrap="wrap"
        justifyContent="center"
        padding_xs="0 0 40px 0"
        margin_tablet="20px 35px"
        margin_xxs="10px 0px"
        gridGap="10px"
        display_md="none"
        border="1px solid black"
        borderRadius="4px"
        boxShadow="10px 10px 0px 0px rgba(0,0,0)"
        background={mainBackround || Colors.white}
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
                width="90%"
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
                position="relative"
                alignItems="center"
                borderBottom="none" // No hay borde en desktop
                borderBottom_tablet="1px solid #a4a4a47a" // Aparece en tablet
                borderBottom_xs="1px solid #a4a4a47a" // Aparece en mobile
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
                      background="#e3f2ff"
                      padding="8px"
                      borderRadius="6px"
                      justifyContent="center"
                    >
                      <Paragraph
                        textAlign="center"
                        fontSize="14px"
                        fontWeight="700"
                        lineHeight="20px"
                        color={Colors.darkGray}
                      >
                        {geeks.titles.at_geeks}
                      </Paragraph>
                      <Paragraph
                        textAlign="center"
                        fontSize="12px"
                        fontWeight="300"
                        lineHeight="20px"
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
                      justifyContent="center"
                    >
                      <Paragraph
                        textAlign="center"
                        fontSize="14px"
                        fontWeight="700"
                        lineHeight="20px"
                        color={Colors.darkGray}
                      >
                        {geeks.titles.average}
                      </Paragraph>
                      <Paragraph
                        textAlign="center"
                        fontSize="12px"
                        fontWeight="300"
                        lineHeight="20px"
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
