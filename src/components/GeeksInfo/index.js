import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GridContainerWithImage, Grid, Div, GridContainer } from "../Sections";
import { H2, H4, Paragraph } from "../Heading";
import { Colors, RoundImage, StyledBackgroundSection } from "../Styling";

const GeeksInfo = ({ lang }) => {
  const data = useStaticQuery(graphql`
    {
      allGeeksInfoYaml {
        edges {
          node {
            heading
            sub_heading
            header {
              image
              image_link
            }
            list {
              sub_title
              title
            }
            paragraph
            image1 {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            image2 {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);
  let content = data.allGeeksInfoYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (content) content = content.node;
  else return null;
  return (
    <>
      <GridContainer>
        <H2
          padding="50px 0 0 0"
          margin_tablet="76px 0"
          margin="0 0 27px 0"
          margin_md="0 0 76px 0"
        >
          {content.heading}
        </H2>
      </GridContainer>
      <GridContainerWithImage imageSide="left" columns_tablet="2">
        {/* <Grid columns_md="2" gridGap_md="50px"> */}
        <Div
          style={{ position: "relative" }}
          height="468px"
          padding="0 38px 23px 25px"
          gridColumn_tablet="1 / 8"
        >
          <Div
            display="none"
            display_md="flex"
            style={{
              position: "absolute",
              background: "#F5F5F5",
              width: "101%",
              height: "282px",
              top: "0",
              left: "-60px",
              borderRadius: "3px",
            }}
          />
          <Div
            display="none"
            display_md="flex"
            style={{
              position: "absolute",
              background: "#FFB718",
              width: "256px",
              height: "256px",
              bottom: "18px",
              right: "75px",
              borderRadius: "3px",
            }}
          />
          <StyledBackgroundSection
            className="image"
            height="412px"
            image={content.image1.childImageSharp.gatsbyImageData}
            bgSize="contain"
            alt="Cnn Logo"
            borderRadius="0 0 0 3px"
            style={{ backgroundSize: "contain" }}
          />
        </Div>
        <Div flexDirection="column" gridColumn_tablet="9 / 15">
          <Div
            margin="0 0 30px 0"
            justifyContent="center"
            justifyContent_md="start"
          >
            {Array.isArray(content.header) &&
              content.header.map((m, i) => {
                return (
                  <RoundImage
                    key={i}
                    url={m.image}
                    bsize="contain"
                    height="20px"
                    width="130px"
                    position="left"
                  />
                );
              })}
            {/* <RoundImage url={i.footer.image} bsize="contain" height="20px" position="left" /> */}
          </Div>
          {Array.isArray(content.list) &&
            content.list.map((m, i) => {
              return (
                <React.Fragment key={`${i}-${m.title}`}>
                  <H4
                    textAlign="left"
                    margin="0"
                    fontWeight="900"
                    textTransform="uppercase"
                  >
                    {m.title}
                  </H4>
                  {m.sub_title.split("\n").map((m, i) => (
                    <Paragraph
                      key={i}
                      textAlign="left"
                      margin="0 0 20px 0"
                      fontSize="15px"
                      lineHeight="26px"
                    >
                      {m}
                    </Paragraph>
                  ))}
                </React.Fragment>
              );
            })}
          <Paragraph
            dangerouslySetInnerHTML={{ __html: content.paragraph }}
            margin="0"
            padding="18px 0"
            color={Colors.darkGray}
            textAlign="left"
            fontSize="15px"
            lineHeight="22px"
            style={{ borderTop: `1px solid ${Colors.lightGray}` }}
          ></Paragraph>
        </Div>
      </GridContainerWithImage>
    </>
  );
};

export default GeeksInfo;
