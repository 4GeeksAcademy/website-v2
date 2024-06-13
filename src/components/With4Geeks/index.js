import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { H2, H4, H3, Paragraph, SubTitle } from "../Heading";
import { Div, Grid } from "../Sections";
import { RoundImage, Colors } from "../Styling";
import ReactPlayer from "../ReactPlayer";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default ({
  lang,
  title,
  subtitle,
  stories,
  paragraph,
  sessionLocation,
  background,
  headerProps,
}) => {
  const data = useStaticQuery(graphql`
    query With4Geeks {
      allWith4GeeksYaml {
        edges {
          node {
            fields {
              lang
            }
            header {
              title
              paragraph
            }
            with {
              name
              title
              open_in_modal
              description
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 800
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              alt
              icon
              video
              video_height
              location
              footer {
                is_image
                image
                image_link
                text
                text_link
              }
            }
          }
        }
      }
    }
  `);
  let info = data.allWith4GeeksYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (info) info = info.node;

  let locationFiltered;

  if (sessionLocation)
    locationFiltered = info.with.filter(
      (n) =>
        n.location === "all" ||
        n.location.includes("all") ||
        !sessionLocation ||
        n.location.includes(sessionLocation)
    );
  else locationFiltered = stories || info.with;

  return (
    <Div display="block" background={background} padding="0 0 20px 0">
      {(info?.header || title) && (
        <Grid
          margin="40px 5px 20px 5px"
          margin_tablet="40px auto 20px auto"
          maxWidth_tablet="1280px"
          gridTemplateColumns_tablet="repeat(14, 1fr)"
          padding_tablet="0 40px"
          padding_md="40px 80px"
          padding_lg="50px 0 0 0"
          padding="0 17px"
          {...headerProps}
        >
          <Div
            display="flex"
            flexDirection="column"
            alignItems="left"
            padding_tablet="0px 16px"
            padding="0px"
            gridColumn="1/15"
          >
            <H2
              margin_tablet="0 0 15px 0"
              margin_xs="0px"
              textTransform={title ? "" : "uppercase"}
              textAlign={title ? "center" : "left"}
            >
              {title || info?.header?.title}
            </H2>
            {paragraph && (
              <SubTitle
                letterSpacing="0.05em"
                padding="0"
                padding_tablet="0 12% 4% 12%"
              >
                {subtitle || info.header.paragraph}
              </SubTitle>
            )}
          </Div>
        </Grid>
      )}
      {locationFiltered && (
        <Grid
          gridTemplateColumns_tablet="repeat(14, 1fr)"
          columns_tablet={
            locationFiltered.length <= 3 ? locationFiltered.length : "3"
          }
          padding_xxs="0 20px 50px 20px"
          padding_tablet="0 40px"
          padding_md="0 80px"
          padding_lg="0"
          //margin="0 10px 73px 10px"
          margin_tablet="0 auto 84px auto"
          maxWidth_md="1280px"
        >
          <Div
            gridColumn="1/15"
            width="100%"
            className="badge-slider hideOverflowX__"
            gap="0px 20px"
            gap_tablet="0px 20px"
          >
            {locationFiltered.slice(0, 3).map((element, index) => {
              return (
                <Div
                  key={`${element.name}_${index}`}
                  display="flex"
                  flexDirection="column"
                  flexDirection_tablet="column"
                  justifyContent="start"
                  borderRadius="4px"
                  minWidth="250px"
                  width="100%"
                  border={!background && "1px solid #C4C4C4"}
                  background={Colors.white}
                >
                  <Div
                    padding_xs="0 0 0 0px"
                    //padding="20px 0"
                    width_tablet="100%"
                    height_tablet={element.video_height || "173px"}
                    height={element.video_height || "173px"}
                    alignSelf="baseline"
                    style={{ borderRadius: `0px` }}
                  >
                    {element.video && element.image && (
                      <ReactPlayer
                        With_Modal={element.open_in_modal}
                        margin_tablet="0px"
                        imageWidth="100%"
                        imageHeight={element.video_height || "auto"}
                        //height="100%"
                        className="react-player-with4geeks"
                        thumb={element.image}
                        id={element.video}
                        width="100%"
                        width_tablet="100%"
                        videoHeight={element.video_height}
                        style={{ borderRadius: "0px" }}
                      />
                    )}
                    {!element.video && element.image && (
                      <GatsbyImage
                        //className={className}
                        height="173px"
                        image={getImage(
                          element?.image?.childImageSharp?.gatsbyImageData
                        )}
                        alt="Image"
                      />
                    )}
                  </Div>
                  <Div
                    //marginTop="20px"
                    style={{ padding: "20px 32px" }}
                    padding_tablet="20px 32px"
                    padding_xxs="20px 16px"
                    display="flex"
                    //height="100%"
                    height={stories ? "fit-content" : "100%"}
                    flexDirection="column"
                    gap="16px 0px"
                  >
                    {element.footer.image_link && (
                      <Link to={element.footer.image_link}>
                        <RoundImage
                          url={element.footer.image}
                          bsize="contain"
                          height="20px"
                          position="left"
                        />
                      </Link>
                    )}

                    {element.name && (
                      <H4
                        textAlign="left"
                        width="100%"
                        margin="0 0 10px 0"
                        uppercase
                        fontSize="15px"
                        fontWeight="900"
                        lineHeight="19px"
                        color={Colors.darkGray}
                      >
                        {element.name}
                      </H4>
                    )}
                    {element.title && (
                      <H3
                        textAlign="left"
                        width="100%"
                        margin="0"
                        fontSize_xs="18px"
                        fontSize_tablet="28px"
                        fontSize_md="28px"
                        lineHeight_xs="21.6px"
                        lineHeight_tablet="30px"
                      >
                        {`“${element.title}”`}
                      </H3>
                    )}
                    {element.description && (
                      <Paragraph
                        color={Colors.darkGray}
                        textAlign="left"
                        margin="10px 0 10px 0"
                        fontWeight="400"
                        fontSize="14px"
                        lineHeight="15px"
                      >
                        {element.description}
                      </Paragraph>
                    )}

                    {element.footer.text_link != "" && (
                      <Link to={element.footer.text_link}>
                        <H4
                          display="flex"
                          fontWeigth="700"
                          color={Colors.blue}
                          // textDecoration="underline"
                        >
                          {element.footer.text}
                        </H4>
                      </Link>
                    )}
                  </Div>
                </Div>
              );
            })}
          </Div>
        </Grid>
      )}
    </Div>
  );
};
