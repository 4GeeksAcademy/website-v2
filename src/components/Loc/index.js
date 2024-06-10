import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { H2, H3, Paragraph } from "../Heading";
import { GridContainer, Div } from "../Sections";
import { Colors } from "../Styling";
import Icon from "../Icon";

const Loc = ({ lang, hideHeading, allLocationYaml, background }) => {
  const data = useStaticQuery(graphql`
    {
      allLocYaml {
        edges {
          node {
            heading
            sub_heading
            title
            highlighted_text {
              text
              color
            }
            sub_title
            regions {
              name
              title
              content
            }
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

  const { heading, sub_heading, title, highlighted_text, sub_title, regions } =
    content;

  useEffect(() => {
    regions.forEach((reg, ind, arr) => {
      arr[ind].sub_links = allLocationYaml.edges.filter(
        (loc) =>
          loc.node.meta_info.region === reg.name &&
          (loc.node.meta_info.visibility === null ||
            loc.node.meta_info.visibility !== "unlisted")
      );

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
        <Div id="responsive-options-selector" width="100%">
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
              width="100%"
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
          padding_sm="20px 0 0 0"
          padding="20px 0 0 0"
          flexDirection="column"
          flexWrap="wrap"
          maxHeight="350px"
        >
          {activeOpt.sub_links != undefined &&
            Array.isArray(activeOpt.sub_links) &&
            activeOpt.sub_links.map((l, i) => {
              return (
                <Link
                  to={`/${lang}/coding-campus/${l.node.meta_info.slug}`}
                  key={`${l.node.meta_info.slug}-mobile`}
                  style={{
                    marginBottom: "8px",
                    maxWidth: "50%",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <H3
                    textAlign="left"
                    width="fit-content"
                    fontSize="15px"
                    lineHeight="20px"
                    fontWeight="400"
                    border="2px solid transparent"
                    borderBottomHover="2px solid black"
                  >
                    {l.node.name}
                  </H3>
                  <Icon
                    icon="arrow-right"
                    color={Colors.blue}
                    width="10px"
                    height="10px"
                  />
                </Link>
              );
            })}
        </Div>
      </Div>
    );
  };

  const highlightedText = highlighted_text
    .map((elem) => `<span style="color:${elem.color};">${elem.text}</span>`)
    .join(" ");

  return (
    <Div padding="0 0 20px 0" display="block" background={background}>
      {heading && !hideHeading && (
        <GridContainer
          margin_tablet="35px auto"
          margin_xs="15px 0"
          margin="0 0 10px 0"
          gridGap="17px"
          maxWidth="1280px"
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
        padding_xxs="0 20px"
        padding_lg="0px"
        padding_tablet="0 40px"
        flexDirection_md="row"
        flexDirection_tablet="column"
        flexDirection_sm="column"
        flexDirection_xs="column"
        flexDirection="column"
        margin="0 auto"
        maxWidth="1280px"
        height="100%"
        maxHeight="none"
      >
        <Div
          id="text-and-image-container"
          display_tablet="block"
          display="flex"
          flexDirection="column"
          width_md="50%"
          width_xxs="90%"
          width_xs="100%"
          margin_md="0 20px 0 0"
          margin_xxs="0 auto 20px auto"
        >
          <Paragraph
            margin_tablet="0 0 5px 0"
            marginxs="0 0 5px 0"
            textAlign_tablet="left"
            color={Colors.black}
            opacity="1"
            fontWeight="700"
            fontSize="36px"
            lineHeight="39px"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <Paragraph
            margin_tablet="0 0 5px 0"
            marginxs="0 0 5px 0"
            textAlign_tablet="left"
            opacity="1"
            fontWeight="800"
            fontFamily="Archivo-Black"
            fontSize="45px"
            lineHeight="55px"
            fontSize_tablet="86px"
            lineHeight_tablet="96px"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
          <Paragraph
            margin_tablet="0 0 5px 0"
            marginxs="0 0 5px 0"
            textAlign_tablet="left"
            color={Colors.black}
            opacity="1"
            fontWeight="700"
            fontSize="36px"
            lineHeight="39px"
            dangerouslySetInnerHTML={{ __html: sub_title }}
          />
        </Div>
        <ResponsiveMenu />
        <Div
          id="menu-container"
          width_md="50%"
          width_tablet="100%"
          width="100%"
          display_tablet="flex"
          flexDirection_tablet="column"
          display="none"
        >
          <Div
            id="links-container"
            flexShrink_tablet="0"
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
                    style={{
                      marginBottom: "8px",
                      width: "fit-content",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <H3
                      textAlign="left"
                      width="fit-content"
                      fontSize="15px"
                      lineHeight="20px"
                      fontWeight="400"
                      border="2px solid transparent"
                      borderBottomHover="2px solid black"
                      minWidth="max-content"
                    >
                      {l.node.name}
                    </H3>
                    <Icon
                      icon="arrow-right"
                      color={Colors.blue}
                      width="10px"
                      height="10px"
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                    />
                  </Link>
                ))}
              </Div>
            ))}
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default Loc;
