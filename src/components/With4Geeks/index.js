import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { H2, H4, H3, Paragraph } from "../Heading";
import { Div, GridContainer } from "../Sections";
import { RoundImage, Colors } from "../Styling";
import ReactPlayer from "../ReactPlayer";
import Fragment from "../Fragment";

export default ({
  lang,
  playerHeight,
  title,
  text,
  text_link,
  paragraph,
  background,
  sessionLocation,
  // excludedLocations,
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
              location
              excludedLocations
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
        (n.location.includes("all") &&
          !n.excludedLocations.includes(sessionLocation)) ||
        !sessionLocation ||
        n.location.includes(sessionLocation)
    );
  else locationFiltered = info.with;

  return (
    <Fragment github="/components/with_4geeks">
      {title && (
        <GridContainer margin="0 0 40px 0">
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding_tablet="0 4em"
            padding="0 2em"
          >
            <H2
              margin="0 0 15px 0"
              fontSize="15px"
              textTransform="uppercase"
              lineHeight="19px"
              fontWeight="900"
            >
              {info.header.title}
            </H2>
            {paragraph && (
              <Paragraph
                fontSize="15px"
                lineHeight="22px"
                letterSpacing="0.05em"
                padding="0"
                padding_tablet="0 12% 4% 12%"
              >
                {info.header.paragraph}
              </Paragraph>
            )}
          </Div>
        </GridContainer>
      )}
      {locationFiltered && (
        <GridContainer
          columns_tablet={
            locationFiltered.length <= 3 ? locationFiltered.length : "3"
          }
          margin="0 0 73px 0"
          margin_tablet="0 0 84px 0"
        >
          {locationFiltered.map((i, index) => {
            return (
              <Div
                display="flex"
                flexDirection="row"
                flexDirection_tablet="column"
                justifyContent="start"
                border={`1px solid ${Colors.lightGray}`}
                key={`${i.name}_${index}`}
                style={{ borderRadius: `3px` }}
              >
                <Div
                  padding_tablet="0"
                  padding="20px 0"
                  width_tablet="100%"
                  height_tablet="158px"
                  alignSelf={`baseline`}
                >
                  <ReactPlayer
                    With_Modal={true}
                    imageWidth="74px"
                    className="react-player-with4geeks"
                    thumb={i.image}
                    id={i.video}
                    width="85%"
                    width_tablet="100%"
                    height_tablet="158px"
                    videoHeight={playerHeight}
                  />
                </Div>
                <Div
                  marginTop="20px"
                  padding="20px 25px"
                  display={`flex`}
                  height="100%"
                  flexDirection="column"
                >
                  <H4
                    textAlign="left"
                    width="100%"
                    margin="0 0 10px 0"
                    uppercase
                    fontSize="15px"
                    fontWeight="400"
                    color={Colors.darkGray}
                  >
                    {i.name}
                  </H4>
                  <H3
                    textAlign="left"
                    width="100%"
                    margin="0"
                    fontSize="22px"
                    fontWeight="700"
                    lineHeight="26px"
                  >
                    {`“${i.title}”`}
                  </H3>
                  <Paragraph
                    color="gray"
                    textAlign="left"
                    margin="10px 0 10px 0"
                    fontWeight="400"
                    lineHeight="18px"
                    fontSize="14px"
                  >
                    {i.description}
                  </Paragraph>

                  {i.footer.is_image ? (
                    <Link to={i.footer.image_link}>
                      <RoundImage
                        url={i.footer.image}
                        bsize="contain"
                        height="20px"
                        position="left"
                      />
                    </Link>
                  ) : (
                    <Link to={text_link || i.footer.text_link}>
                      <H4
                        textAlign="left"
                        width="100%"
                        fontSize="13px"
                        lineHeight="15px"
                        fontWeight="400"
                        color={Colors.blue}
                      >
                        {text || i.footer.text}
                      </H4>
                    </Link>
                  )}
                </Div>
              </Div>
            );
          })}
        </GridContainer>
      )}
    </Fragment>
  );
};
