import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Title, H1, H2, H3, H4, Span, Paragraph } from "../Heading";
import { GridContainer, Grid, Div } from "../Sections";
import { Img, Colors } from "../Styling";
import Icon from "../Icon";

import Link from "gatsby-link";

const Loc = ({ lang, yml, allLocationYaml }) => {
  const {
    heading,
    image,
    sub_heading,
    choose,
    regions,
    title_image,
    sub_title_image,
  } = yml;

  useEffect(() => {
    regions.forEach((reg, ind, arr) => {
      arr[ind].sub_links = allLocationYaml.edges.filter(
        (loc) =>
          loc.node.meta_info.region === reg.name &&
          (loc.node.meta_info.visibility === null ||
            loc.node.meta_info.visibility !== "unlisted")
      );
      // if (arr[ind].name === "online") {
      //   arr[ind].sub_links = allLocationYaml.edges.filter(
      //     (loc) =>
      //       loc.node.online_available || loc.node.online_available === null
      //   );
      // } else {
      //   arr[ind].sub_links = allLocationYaml.edges.filter(
      //     (loc) => loc.node.meta_info.region === reg.name
      //   );
      // }

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

  const ResponsiveMenu = () => {
    return (
      <Div
        id="responsive-options-container"
        width="100%"
        display_tablet="none"
        display="block"
      >
        <Div id="responsive-options-selector">
          {regions.map((m, i) => (
            <Div
              color={activeOpt.title === m.title ? Colors.black : Colors.gray}
              borderBottom={
                activeOpt.title === m.title
                  ? `5px solid ${Colors.blue}`
                  : `1px solid ${Colors.gray}`
              }
              borderRadius="none"
              padding="10px"
              onClick={() => {
                setActiveOpt({ ...m });
              }}
              style={{ cursor: "pointer" }}
              display="block"
              width="33%"
              key={`${m.title}-${i}`}
            >
              <H3
                textAlign="center"
                fontSize="20px"
                color={activeOpt.title === m.title ? Colors.black : Colors.gray}
              >
                {m.title}
              </H3>
            </Div>
          ))}
        </Div>
        <Div
          flexDirection="column"
          padding_sm="20px 20px 0 20px"
          padding="20px 0 0 0"
          flexWrap="wrap"
          maxHeight="300px"
        >
          {activeOpt.sub_links != undefined &&
            Array.isArray(activeOpt.sub_links) &&
            activeOpt.sub_links.map((l, i) => {
              return (
                <Link
                  to={`/${lang}/coding-campus/${l.node.meta_info.slug}`}
                  key={i}
                  style={{ marginBottom: "8px" }}
                >
                  <H3
                    textAlign="left"
                    width="fit-content"
                    maxWidth="135px"
                    fontSize="15px"
                    lineHeight="20px"
                    fontWeight="400"
                    margin="0 5px 0 0"
                    border="2px solid transparent"
                    borderBottomHover="2px solid black"
                  >
                    {l.node.name}
                    <Icon
                      icon="arrow-right"
                      color={Colors.blue}
                      width="10px"
                      height="10px"
                      style={{ marginLeft: "5px" }}
                    />
                  </H3>
                </Link>
              );
            })}
        </Div>
      </Div>
    );
  };

  return (
    <>
      {heading && (
        <GridContainer
          margin_tablet="0 0 35px 0"
          margin_xs="0 0 15px 0"
          margin="0 0 10px 0"
          gridGap="17px"
        >
          <Div display="flex" flexDirection="column" alignItems="center">
            <H2
              margin="0 0 25px 0"
              fontSize="26px"
              lineHeight="31.2px"
              // fontWeight="900"
            >
              {heading}
            </H2>
            <Paragraph fontSize="16px" lineHeight="24px" color={Colors.black}>
              {sub_heading}
            </Paragraph>
          </Div>
        </GridContainer>
      )}
      <Div
        id="locations-container"
        padding="0 10%"
        // padding="0 0 5% 0"
        flexDirection_tablet="row"
        flexDirection_sm="column"
        flexDirection_xs="column"
        flexDirection="column"
        margin="0 0 20px 0"
        // margin="auto"
        // width="70%"
        height="100%"
        maxHeight="none"
      >
        <Div
          id="text-and-image-container"
          display_tablet="block"
          display="flex"
          flexDirection="column"
          width_md="45%"
          width_tablet="40%"
          // maxWidth_tablet="270px"
          width="100%"
          margin_tablet="0 20px 0 0"
          margin_xs="0 0 20px 0"
        >
          <H3
            textAlign="left"
            color={Colors.blue}
            width="100%"
            margin="0 0 10px 0"
          >
            {title_image}
          </H3>
          {sub_title_image && /<\/?[a-z0-9]+>/g.test(sub_title_image) ? (
            <Div
              display="block"
              margin_tablet="0 0 20px 0"
              marginxs="0 0 5px 0"
              textAlign="left"
              color={Colors.darkGray2}
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: "700",
                fontSize: "18px",
                lineHeight: "22px",
                color: Colors.darkGray2,
              }}
              // fontWeight="700"
              dangerouslySetInnerHTML={{ __html: sub_title_image }}
            />
          ) : (
            sub_title_image && (
              <Paragraph
                margin_tablet="0 0 5px 0"
                marginxs="0 0 5px 0"
                textAlign="left"
                color={Colors.darkGray2}
                fontWeight="700"
                fontSize="18px"
                lineHeight="22px"
              >
                {sub_title_image}
              </Paragraph>
            )
          )}
          {image && (
            <Div
              id="img-container"
              height_tablet="100%"
              height="200px"
              order="-1"
              order_tablet="0"
              margin_tablet="0"
              margin_xs="0 0 20px 0"
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
                maxHeight="300px"
                minHeight_tablet="none"
                minHeight="200px"
                backgroundSize="contain"
              />
            </Div>
          )}
        </Div>
        <ResponsiveMenu />
        <Div
          id="menu-container"
          width_md="55%"
          width_tablet="60%"
          width="100%"
          display_tablet="block"
          display="none"
        >
          <Div
            id="links-container"
            flexShrink_tablet="0"
            // flexDirection="column"
            width_tablet="100%"
            width_xs="100%"
            justifyContent="around"
            flexWrap="nowrap"
          >
            {regions?.map((region) => (
              <Div
                flexDirection="column"
                height="100%"
                flexGrow="1"
                margin="0 0 0 5px"
              >
                <H3 textAlign="left" margin="0 0 15px 0" fontSize="18px">
                  {region.title}
                </H3>
                {region.sub_links?.map((l, i) => (
                  <Link
                    to={`/${lang}/coding-campus/${l.node.meta_info.slug}`}
                    key={i}
                    style={{ marginBottom: "8px", width: "fit-content" }}
                  >
                    <H3
                      textAlign="left"
                      width="fit-content"
                      fontSize="15px"
                      lineHeight="20px"
                      fontWeight="400"
                      margin="0 5px 0 0"
                      border="2px solid transparent"
                      borderBottomHover="2px solid black"
                    >
                      {l.node.name}
                      <Icon
                        icon="arrow-right"
                        color={Colors.blue}
                        width="10px"
                        height="10px"
                        style={{ marginLeft: "5px" }}
                      />
                    </H3>
                  </Link>
                ))}
              </Div>
            ))}
          </Div>
        </Div>
      </Div>
    </>
  );
};

export default Loc;
