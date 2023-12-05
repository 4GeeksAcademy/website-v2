import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Grid, Div, GridContainer } from "../Sections";
import { Paragraph } from "../Heading";
import { Colors } from "../Styling";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Fragment from "../Fragment";

const Badges = ({
  id,
  lang,
  loading,
  link,
  short_link,
  short_text,
  paragraph,
  background,
  padding,
  paddingText,
  paddingText_tablet,
  padding_tablet,
  margin,
  wrapped_images,
  maxWidth,
}) => {
  const data = useStaticQuery(graphql`
    query myNewQueryBadges {
      allBadgesYaml {
        edges {
          node {
            paragraph
            badges {
              name
              url
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    height: 120 # --> maxHeight
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    # transformOptions: {fit: COVER}

                    # More Options
                    # https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#image-options
                  )
                }
              }
            }
            link_text
            link_to
            short_link_text
            fields {
              lang
            }
          }
        }
      }
    }
  `);

  let content = data.allBadgesYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (content) content = content.node;
  else return null;

  return (
    <>
      {/* <Fragment github="/components/badges"> */}
      <Div
        width="100%"
        maxWidth={maxWidth}
        margin_tablet="0 auto"
        justifyContent="center"
        background={background}
        padding_xxs="0 20px"
        padding_tablet="0 40px"
        padding_md="0 80px"
        padding_lg="0px"
      >
        <GridContainer
          id={id}
          containerColumns_tablet="repeat(12, 1fr)"
          gridColumn_tablet="1/ span 12"
          background={background}
          padding={padding}
          padding_tablet={padding_tablet}
          rows={paragraph && `3`}
          margin={margin}
          maxWidth={maxWidth}
        >
          {/* <Grid columns_md="12" background={background} padding_md={padding_md} rows={paragraph && `3`} padding="0 17px" margin="36px 0 58px 0" margin_md="73px 0"> */}
          {paragraph && (
            <Div className="badge-slider" justifyContent="between">
              <Paragraph
                fontFamily="Lato-Light"
                padding={paddingText || "0 10px 45px 10px"}
                padding_tablet={paddingText_tablet || "0 5% 55px 5%"}
                fontSize={short_link || short_text ? "16px" : "16px"}
                fontSize_tablet={short_link || short_text ? "16px" : "16px"}
                lineHeight={short_link || short_text ? "29px" : "38px"}
                fontWeight="400"
                color={Colors.darkGray}
                dangerouslySetInnerHTML={{ __html: paragraph }}
                margin="15px 0 0 0"
              />
            </Div>
          )}

          {wrapped_images === true ? (
            <Div
              className="badge-slider hideOverflowX__"
              justifyContent="center"
              rowGap="3rem"
              flexWrap="wrap"
              columnGap="1rem"
            >
              {content.badges.map((l, i) => {
                return (
                  <GatsbyImage
                    key={i}
                    style={{
                      height: "65px",
                      minWidth: "150px",
                      width: "min-content",
                      margin: "0 20px",
                    }}
                    imgStyle={{ objectFit: "contain" }}
                    loading="eager"
                    // draggable={false}
                    // fadeIn={false}
                    alt={l.name}
                    image={getImage(l.image.childImageSharp.gatsbyImageData)}
                  />
                );
              })}
            </Div>
          ) : (
            <Div width="100%" style={{ overflowX: "auto" }}>
              <Div
                className="badge-slider hideOverflowX__"
                margin="auto"
                // justifyContent="center"
                // alignItems="center"
              >
                {short_link
                  ? content.badges.map((l, i) => {
                      return (
                        i < 4 && (
                          <GatsbyImage
                            key={i}
                            style={{
                              height: "65px",
                              minWidth: "80px",
                              margin: "0 20px",
                            }}
                            imgStyle={{ objectFit: "contain" }}
                            loading="eager"
                            // draggable={false}
                            // fadeIn={false}
                            alt={l.name}
                            image={getImage(
                              l.image.childImageSharp.gatsbyImageData
                            )}
                          />
                        )
                      );
                    })
                  : content.badges.map((l, i) => {
                      return (
                        <GatsbyImage
                          key={i}
                          style={{
                            height: "85px",
                            // minWidth: "200px",
                            minWidth: "150px",
                            margin: "0 24px",
                          }}
                          imgStyle={{ objectFit: "contain" }}
                          loading="eager"
                          draggable={false}
                          // fadeIn={false}
                          alt={l.name}
                          image={getImage(
                            l.image.childImageSharp.gatsbyImageData
                          )}
                        />
                      );
                    })}

                {short_link && (
                  <Link to={content.link_to}>
                    <Paragraph
                      width="150px"
                      color={Colors.blue}
                    >{`${content.short_link_text} >`}</Paragraph>
                  </Link>
                )}
              </Div>
            </Div>
          )}

          {link && (
            <Div justifyContent="center" margin="50px 0 0 0">
              <Link to={content.link_to}>
                <Paragraph color={Colors.blue}>{content.link_text}</Paragraph>
              </Link>
            </Div>
          )}
        </GridContainer>
      </Div>
      {/* </Fragment> */}
    </>
  );
};

export default Badges;
