import React, { useState, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Title, H1, H2, H3, H4, Span, Paragraph } from "../Heading";
import { GridContainer, Grid, Div } from "../Sections";
import { Img, Colors } from "../Styling";

import { getCohorts } from "../../actions";
import { SessionContext } from "../../session.js";
import Link from "gatsby-link";

const Loc = ({ lang, yml, allLocationYaml }) => {
  const { heading, image, sub_heading, choose, regions } = yml;

  useEffect(() => {
    regions.forEach((reg, ind, arr) => {
      if (arr[ind].name === "online") {
        arr[ind].sub_links = allLocationYaml.edges.filter(
          (loc) =>
            loc.node.online_available || loc.node.online_available === null
        );
      } else {
        arr[ind].sub_links = allLocationYaml.edges.filter(
          (loc) => loc.node.meta_info.region === reg.name
        );
      }

      arr[ind].sub_links.sort((a, b) => {
        if (a.node.meta_info.position < b.node.meta_info.position) {
          return -1;
        }
        if (a.node.meta_info.position > b.node.meta_info.position) {
          return 1;
        }
        return 0;
      });
    });
    setActiveOpt({ ...regions[0] });
  }, []);

  const data = useStaticQuery(graphql`
    {
      allLocYaml {
        edges {
          node {
            label
            fields {
              lang
            }
          }
        }
      }
    }
  `);
  let content = data.allLocYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (content) content = content.node;
  else return null;

  const [activeOpt, setActiveOpt] = useState({
    ...regions[0],
  });

  return (
    <>
      {heading && (
        <GridContainer
          margin_tablet="0 0 35px 0"
          margin="0 0 32px 0"
          gridGap="17px"
        >
          <Div display="flex" flexDirection="column" alignItems="center">
            <H2
              margin="0 0 15px 0"
              fontSize="15px"
              lineHeight="19px"
              fontWeight="900"
            >
              {heading}
            </H2>
            <Paragraph>{sub_heading}</Paragraph>
          </Div>
        </GridContainer>
      )}
      <hr
        style={{
          margin: "auto",
          width: "80%",
          marginBottom: "20px",
          border: `1px solid ${Colors.verylightGray}`,
        }}
      />
      <Div
        id="locations-container"
        padding="0 10% 10% 10%"
        flexDirection_tablet="row"
        flexDirection_sm="column"
        flexDirection_xs="column"
      >
        {image && (
          <Div
            id="img-container"
            width_tablet="30%"
            maxWidth_tablet="270px"
            width_xs="100%"
            margin_tablet="0 20px 0 0"
            margin_xs="0 0 20px 0"
            // height="100%"
          >
            <Img
              src={image}
              // borderRadius={"1.25rem"}
              borderRadius={"3px"}
              // className="pointer"
              alt={"4Geeks Academy Section"}
              margin="auto"
              width="100%"
              height="100%"
              minHeight_tablet="none"
              minHeight_sm="100px"
              backgroundSize={`cover`}
              style={{ imageRendering: "crisp-edges" }}
            />
          </Div>
        )}
        <Div
          id="menu-container"
          width_tablet="70%"
          width_xs="100%"
          display="block"
          // flexShrink_tablet="0"
        >
          {choose && (
            <Paragraph
              textAlign="left"
              color={Colors.darkGray}
              margin="0 0 10px 0"
            >
              {choose}
            </Paragraph>
          )}
          <Div
            id="selectors-container"
            flexDirection_tablet="row"
            flexDirection_xs="column"
            width_xs="100%"
            // flexShrink_tablet="0"
          >
            <Div
              id="options-container"
              flexDirection_tablet="column"
              justifyContent_tablet="start"
              flexDirection_xs="row"
              justifyContent_xs="between"
              width_tablet="33%"
              width_xs="100%"
            >
              {regions.map((m, i) => (
                <Div
                  color={
                    activeOpt.title === m.title ? Colors.black : Colors.gray
                  }
                  borderLeft_tablet={
                    activeOpt.title === m.title
                      ? `5px solid ${Colors.blue}`
                      : null
                  }
                  borderBottom_tablet={"none"}
                  borderLeft_xs={"none"}
                  borderBottom_xs={
                    activeOpt.title === m.title
                      ? `5px solid ${Colors.blue}`
                      : null
                  }
                  borderRadius="none"
                  padding="10px"
                  onClick={() => {
                    setActiveOpt({ ...m });
                  }}
                  style={{ cursor: "pointer" }}
                  display="block"
                >
                  <H3
                    textAlign="left"
                    fontSize="20px"
                    color={
                      activeOpt.title === m.title ? Colors.black : Colors.gray
                    }
                  >
                    {m.title}
                  </H3>
                  <Paragraph
                    textAlign="left"
                    display_tablet="block"
                    display_xs="none"
                    display_sm="none"
                    color={
                      activeOpt.title === m.title ? Colors.black : Colors.gray
                    }
                  >
                    {m.content}
                  </Paragraph>
                </Div>
              ))}
            </Div>
            <Paragraph
              display_tablet="none"
              display_xs="block"
              textAlign="left"
              color={Colors.darkGray}
              margin="10px 0"
            >
              {activeOpt.content}
            </Paragraph>
            <Div
              id="links-container"
              // flexShrink_tablet="0"
              flexDirection="column"
              width_tablet="67%"
              width_xs="100%"
              flexWrap="wrap"
              // maxHeight="330px"
              // minHeight="330px"
              height="330px"
              alignContent_tablet="flex-start"
              alignContent_xs="space-between"
            >
              {activeOpt.sub_links != undefined &&
                Array.isArray(activeOpt.sub_links) &&
                activeOpt.sub_links.map((l, i) => {
                  return (
                    <Div
                      margin_tablet="2px 10px 2px 60px"
                      margin_xs="2px 0"
                      padding="10px 0 0 0"
                      alignItems="baseline"
                      maxWidth_tablet="none"
                      maxWidth_xs="50%"
                    >
                      <Link
                        to={`/${lang}/coding-campus/${l.node.meta_info.slug}`}
                        key={i}
                        // style={{maxWidth:'50%'}}
                      >
                        <H3
                          textAlign="left"
                          width="fit-content"
                          fontSize="15px"
                          lineHeight="20px"
                          fontWeight="400"
                          margin="0 5px 0 0"
                          borderBottomHover="2px solid black"
                        >
                          {l.node.name}
                        </H3>
                      </Link>
                    </Div>
                  );
                })}
            </Div>
          </Div>
        </Div>
      </Div>
    </>
  );
};

export default Loc;
