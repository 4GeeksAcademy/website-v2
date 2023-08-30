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
  else locationFiltered = info.with;

  return (
    <Fragment github="/components/with_4geeks">
      {title && (
        <GridContainer margin_xs="0 0 20px 0" marginTablet="0px 0px 20px 0px">
          <Div
            display="flex"
            flexDirection="column"
            alignItems="left"
            padding_tablet="0px"
            padding="0px"
          >
            <H2
              margin_tablet="0 0 20px 0"
              margin_xs="0px"
              fontSize="21px"
              fontSize_tablet="32px"
              textTransform="uppercase"
              lineHeight_tablet="38.4px"
              lineHeight_xs="25.2px"
              fontWeight="900"
              color={Colors.darkGray}
              textAlign="left"
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
                flexDirection="column"
                flexDirection_tablet="column"
                justifyContent="start"
                border="none"
                key={`${i.name}_${index}`}
                style={{ borderRadius: `0px` }}
              >
                <Div
                  padding_xs="0 0 20px 0px"
                  padding="20px 0"
                  width_tablet="100%"
                  height_tablet="173px"
                  height="173px"
                  alignSelf={`baseline`}
                >
                  <ReactPlayer
                    With_Modal={true}
                    imageWidth="100%"
                    imageHeight="auto"
                    height="100%"
                    className="react-player-with4geeks"
                    thumb={i.image}
                    id={i.video}
                    width="100%"
                    width_tablet="100%"
                    videoHeight={playerHeight}
                    style={{ borderRadius: `0px`, height: `173px` }}
                  />
                </Div>
                <Div
                  marginTop="20px"
                  padding_tablet="20px 32px"
                  padding_xs="20px 16px"
                  display={`flex`}
                  height="100%"
                  flexDirection="column"
                  gap="16px"
                  boxShadow="0px 2px 5px 0px rgba(0,0,0,0.1)"
                >
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
                      {i.name}
                    </H4>
                  )}
                  <H3
                    textAlign="left"
                    width="100%"
                    margin="0"
                    fontSize_xs="18px"
                    fontSize_tablet="28px"
                    fontSize_md="28px"
                    lineHeight_xs="21.6px"
                    lineHeight_tablet="33.6px"
                  >
                    {`“${i.title}”`}
                  </H3>
                  <Paragraph
                    color={Colors.darkGray}
                    textAlign="left"
                    margin="10px 0 10px 0"
                    fontWeight="400"
                    fontSize_xs="14px"
                    fontSize_tablet="13px"
                    lineHeight_xs="16.8px"
                    lineHeight_tablet="26px"
                  >
                    {i.description}
                  </Paragraph>


                </Div>
              </Div>
            );
          })}
        </GridContainer>
      )}
    </Fragment>
  );
};
