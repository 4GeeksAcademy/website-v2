import React from "react";
import { graphql } from "gatsby";
import BaseRender from "./_baseLayout";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";

//new components
import Icon from "../components/Icon";
import { Colors } from "../components/Styling";
import ReactPlayer from "../components/ReactPlayer";
import OurPartners from "../components/OurPartners";
import IconsBanner from "../components/IconsBanner";
import {
  Div,
  Grid,
  HR,
  GridContainerWithImage,
  GridContainer,
} from "../components/Sections";
import { H1, H2, H3, Paragraph } from "../components/Heading";
import { Button, RoundImage, Img } from "../components/Styling";
import { StyledBackgroundSection } from "../components/Styling";
import LandingHeader from "../components/LandingHeader";

const GeekPal = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  const partnersData = data.allPartnerYaml.edges[0].node;
  const content = data.allPageYaml.edges[0].node;

  const bulletIcons = [
    {
      icon: "elderly-fill",
      background: "#0097CF",
      transform: "rotate(180deg)",
    },
    {
      icon: "square-bracket-fill",
      background: "#000",
    },
    {
      icon: "curly-bracket-fill",
      background: "#FFB718",
    },
  ];

  return (
    <>
      <Grid
        padding="24px 20px"
        padding_tablet="100px 40px"
        padding_md="100px 80px"
        columns_tablet="18"
        margin={isCustomBarActive(session) ? "120px auto 24px auto" : "70px auto 24px auto"}
        maxWidth="1366px"
        position="relative"
        gridTemplateColumns_tablet="repeat(21, 1fr)"
      >
        <Img
          src="/images/Ellipse-7.png"
          width="450px"
          height="300px"
          backgroundSize="contain"
          style={{
            position: "absolute",
            right: "-150px",
            top: "-100px",
          }}
        />
        <Img
          src="/images/vector-stroke-light.png"
          width="120px"
          height="165px"
          style={{
            position: "absolute",
            left: "48%",
            top: "20%"
          }}
        />
        <Div
          flexDirection="column"
          justifyContent_tablet="start"
          gridColumn_tablet="1 / 11"
          position="relative"
        >
          <Paragraph
            fontSize="50px"
            lineHeight="54px"
            //fontFamily="Archivo"
            //fontWeight="900"
            padding_xs="10px 0"
            padding_md="0px"
            margin="0"
            textAlign_xs="center"
            textAlign_tablet="left"
            color="black"
            dangerouslySetInnerHTML={{ __html: yml.header.title }}
          />
          <Paragraph
            fontSize="24px"
            lineHeight="29px"
            fontWeight="500"
            padding_xs="10px 0px"
            textAlign_xs="center"
            textAlign_tablet="left"
            padding_md="30px 0px 10px 0"
            color="black"
            dangerouslySetInnerHTML={{ __html: yml.header.paragraph }}
          />

          {Array.isArray(yml.header.bullets) &&
            yml.header.bullets.map((bullet, index) => (
              <Paragraph
                zIndex="2"
                key={index}
                fontSize="21px"
                fontWeight="500"
                margin="8px 0"
                padding="0"
                textAlign="left"
                color="black"
              >
                <Icon
                  style={{
                    background:
                      bulletIcons[index % bulletIcons.length].background,
                    padding: "5px",
                    transform: bulletIcons[index % bulletIcons.length]?.transform,
                    fontWeight: "bolder",
                  }}
                  width="20px"
                  height="20px"
                  icon={bulletIcons[index % bulletIcons.length].icon}
                  color="white"
                />
                {" " + bullet}
              </Paragraph>
            ))}
          <Img
            src="/images/vector-stroke-left.png"
            width="89px"
            height="119px"      
            backgroundSize="contain"
            style={{
              position: "absolute",
              left: "-62px",
              bottom: "21px",
              zIndex: "-1"
            }}
          />
        </Div>
        <Div
          height="auto"
          width="100%"
          padding_tablet="0"
          padding_md="0 0 0 10%"
          gridColumn_tablet="12 / 22"
          position="relative"
        >
          <Img
            src="/images/Group-6400.png"
            width="193px"
            height="10px"
            style={{
              position: "absolute",
              bottom: "0px",
            }}
            left_xs= "0"
            left_md="10%"
          />
          <Div
            border="2px solid black"
            boxShadow="15px 15px 0px 1px rgba(0,0,0,1)"
            zIndex="1"
            height_tablet="290px"
          >
            {yml.geekPal.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {item.videoId === "" ? (
                    <StyledBackgroundSection
                      height={`290px`}
                      // width={`85%`}
                      borderRadius={`3px`}
                      image={item.image.childImageSharp.gatsbyImageData}
                      bgSize={`contain`}
                      alt="geekforce image"
                    />
                  ) : (
                    <ReactPlayer
                      id={item.videoId}
                      thumb={item.image}
                      //imageSize="maxresdefault"
                      videoHeight="350px"
                      style={{
                        width: "100%",
                        height: "290px",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </Div>
        </Div>
      </Grid>


      {/* <Grid
          style={{ maxWidth: "1366px" }}
          margin="0 auto"
          maxWidth="1366px"
          containerGridGap="0"
          gridTemplateColumns_tablet="repeat(14,1fr)"
          padding_xs="132px 20px 60px 20px"
          padding_tablet="72px 40px 35px 40px"
          padding_md="72px 80px 35px 80px"
          padding_lg="72px 0 35px 0"
          columns_tablet="2"
        >
          <Div
            display_tablet="flex"
            flexDirection="column"
            width="100%"
            //margin="0 auto"
            padding_xs="0"
            height="auto"
            padding_tablet="40px 0 0 0"
            gridColumn_md="1 / 8"
            gridColumn_tablet="1 / 8"
          >
            {yml.header_data.partner_logo_url && (
              <>
                <Div
                  width="242px"
                  flexDirection_tablet="column"
                  height="auto"
                  padding="0 0 25px 0"
                >
                  <GatsbyImage
                    loading="eager"
                    imgStyle={{ objectFit: "contain" }}
                    image={getImage(
                      yml.header_data.partner_logo_url.childImageSharp
                        .gatsbyImageData
                    )}
                    alt="4Geeks Logo"
                  />
                </Div>

                <Div
                  display="none"
                  display_tablet="flex"
                  background="#FFFFFF"
                  width="calc(50% - 30px)"
                  height="2px"
                  margin="7px 0"
                />
              </>
            )}
            <H1
              zIndex="1"
              type="h1"
              variant="main"
              lineHeight="normal"
              lineHeight_tablet="normal"
              margin="20px 0"
              margin_xs="10px 0"
              padding="0 10px 20px 0px"
              color={
                yml.header_data.tagline_color
                  ? yml.header_data.tagline_color
                  : yml.header_data.background
                  ? Colors.black
                  : Colors.white
              }
              fontSize="32px"
              fontSize_tablet="52px"
              fontWeight="700"
              textAlign="left"
            >
              {inLocation}
              {yml.header_data.tagline}
            </H1>
            {yml.header_data.sub_heading !== "" && (
              <H2
                zIndex="1"
                type="h2"
                textAlign="left"
                fontSize="18px"
                color={yml.header_data.background ? Colors.black : Colors.white}
                variant="main"
                fontWeight="bolder"
                padding="0 0 10px 0"
              >
                {yml.header_data.sub_heading}
              </H2>
            )}

            {Array.isArray(yml.features.bullets) &&
              yml.features.bullets.map((f, i) => (
                <Paragraph
                  zIndex="1"
                  key={i}
                  fontSize="21px"
                  style={{
                    ...JSON.parse(yml.features.styles),
                    fontWeight: "bolder",
                  }}
                  margin="8px 0"
                  padding="0px 20px"
                  textAlign="left"
                  color={
                    yml.header_data.background ? Colors.black : Colors.white
                  }
                >
                  <Icon
                    style={{
                      background:
                        bulletIcons[i % bulletIcons.length].background,
                      padding: "5px",
                      transform: bulletIcons[i % bulletIcons.length]?.transform,
                      fontWeight: "bolder",
                    }}
                    width="20px"
                    height="20px"
                    icon={bulletIcons[i % bulletIcons.length].icon}
                    color="white"
                  />

                  {" " + f}
                </Paragraph>
              ))}
            {yml.features.text && (
              <Paragraph
                isActive
                fontSize="18px"
                color={yml.header_data.background ? Colors.black : Colors.white}
                style={JSON.parse(yml.features.styles)}
                margin="7px 0"
                padding_tablet="0px 0px"
                padding="0px 20px"
                textAlign="left"
                dangerouslySetInnerHTML={{ __html: yml.features.text }}
              />
            )}
            {yml.short_badges && (
              <Marquee_v2
                speed={1.5}
                reversed={false}
                containerstyle={{
                  height: "160px",
                  width: "100%",
                }}
              >
                <Div
                  className="badge-slider"
                  justifyContent="center"
                  padding="44px 0"
                >
                  {Array.isArray(yml.short_badges) &&
                    yml.short_badges.map((l, i) => {
                      return (
                        <GatsbyImage
                          key={i}
                          draggable={false}
                          style={{
                            height: "65px",
                            minWidth: "165px",
                            width: "165px",
                          }}
                          imgStyle={{ objectFit: "contain" }}
                          alt={l.alt}
                          image={getImage(
                            l.image != null &&
                              l.image.childImageSharp.gatsbyImageData
                          )}
                        />
                      );
                    })}
                </Div>
              </Marquee_v2>
            )}
          </Div>
          <Div
            position="relative"
            flexDirection="column"
            width="100%"
            margin="0"
            textAlign_sm="center"
            margin_md={yml.form.margin_md || "0 auto 0 25px"}
            gridColumn_tablet="8 / 14"
            // gridColumn_md="8 / 14"
            // gridColumn_tablet="8 / 13"
          >
            <Div
              top="0"
              position="absolute"
              display="none"
              display_tablet="block"
              zIndex="0"
            >
              <Circle color="lightBlue" width="301px" height="301px" />
              <Icon
                style={{ marginTop: "150%" }}
                icon="elderly-unfill"
                width="135px"
                height="184px"
                color="#0097CD"
              />
            </Div>
            <Div
              position="absolute"
              right="50%"
              display_tablet="none"
              zIndex="0"
            >
              <Circle
                color="lightBlue"
                width="301px"
                height="301px"
                position="unset"
              />
              <Div display_tablet="none" margin="100% auto">
                <Icon
                  style={{ marginTop: "90%" }}
                  icon="slash-fill"
                  width="41px"
                  height="111px"
                  color="#C7F3FD"
                />
                <Icon
                  style={{ marginTop: "90%" }}
                  icon="slash-fill"
                  width="41px"
                  height="111px"
                  color="#020203"
                />
                <Icon
                  style={{ marginTop: "90%" }}
                  icon="elderly-fill"
                  width="82px"
                  height="112px"
                  color="#FFB718"
                />
              </Div>
            </Div>
            <Div display="none" display_tablet="block" margin="20% 0 0 0">
              <Icon
                icon="slash-fill"
                width="41px"
                height="111px"
                color="#C7F3FD"
              />
              <Icon
                icon="slash-fill"
                width="41px"
                height="111px"
                color="#020203"
              />
              <Icon
                icon="elderly-fill"
                width="82px"
                height="112px"
                color="#FFB718"
              />
            </Div>
          </Div>
        </Grid> */}


      {/* ICONOGRAM-GEEKPAL */}
      <Div
        //key={index}
        //padding={heading.text ? "30px 0 60px 0" : "60px 0 60px 0"}
        display="flex"
        flexDirection="column"
        id="iconogram"
        containerColumns_tablet="repeat(14, 1fr)"
        columns="1"
        rows="2"
        margin="auto"
        height="auto"
        width="100%"
        background={Colors.lightYellow}
      >
        <Div
          display="flex"
          flexDirection="column"
          flexDirection_tablet="row "
          justifyContent="center"
          // gap="45px"
          //gap_tablet={content.icons.length > 4 ? "0px" : "5%"}
          //gap_md="10%"
          maxWidth="1366px"
          margin="20px auto 0 auto"
          padding_tablet="50px 40px"
          padding_md="50px 80px"
          padding_lg="50px 0"
        //className="badge-slider hideOverflowX__"
        >
          {Array.isArray(content.icons) &&
            content.icons?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <IconsBanner
                    icon={item.icon}
                    title={item.title}
                    content={item.content}
                  />
                </React.Fragment>
              );
            })}
        </Div>
      </Div>

      {Array.isArray(content.list) &&
        content.list.map((m, i) => {
          return (
            <React.Fragment key={`${i}-${m.title}`}>
              <GridContainerWithImage
                imageSide={i % 2 != 0 ? "left" : "right"}
                padding_tablet="36px 0 100px 0"
                columns_tablet="14"
                margin_tablet="0"
              >
                <Div
                  flexDirection="column"
                  justifyContent_tablet="start"
                  padding="0px 24px 0"
                  padding_tablet="0"
                  gridArea_tablet={i % 2 == 0 ? "1/1/1/6" : "1/7/1/13"}
                >
                  <H2
                    key={i}
                    type="h2"
                    padding="20px 0"
                    lineHeight="36px"
                    textAlign="center"
                    textAlign_tablet="left"
                    margin="0"
                    fontWeight="900"
                    fontSize="30px"
                  >
                    {m.title}
                  </H2>
                  {m.sub ? (
                    <>
                      {m.sub?.map((sub, index) => {
                        return (
                          <React.Fragment
                            key={`${index}-${sub.title || sub.text}`}
                          >
                            <H3
                              type="h3"
                              padding="10px 0px"
                              textAlign="left"
                              margin="0"
                              fontWeight="900"
                              textTransform="uppercase"
                              fontSize="15px"
                            >
                              {sub?.title}
                            </H3>
                            <Paragraph
                              letterSpacing="0.05em"
                              textAlign="left"
                              margin="0 0 20px 0"
                              fontSize="15px"
                              lineHeight="26px"
                              dangerouslySetInnerHTML={{ __html: sub?.text }}
                            />
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <Paragraph
                        letterSpacing="0.05em"
                        fontSize="15px"
                        textAlign="left"
                        margin="0 0 20px 0"
                        lineHeight="22px"
                        dangerouslySetInnerHTML={{ __html: m?.text }}
                      />
                    </>
                  )}
                </Div>
                <Div
                  height="auto"
                  width="100%"
                  gridArea_tablet={i % 2 == 0 ? "1/7/1/13" : "1/1/1/6"}
                  style={{ position: "relative" }}
                >
                  {i === 0 ? (
                    <>
                      <Div
                        display="none"
                        display_md="flex"
                        style={{
                          position: "absolute",
                          background: "#F5F5F5",
                          width: "101%",
                          height: "282px",
                          top: "-25px",
                          left: "-35px",
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
                          bottom: "-20px",
                          right: "-45px",
                          borderRadius: "3px",
                        }}
                      />
                    </>
                  ) : i === 1 ? (
                    <>
                      <Div
                        display="none"
                        display_md="flex"
                        style={{
                          position: "absolute",
                          background: "#F5F5F5",
                          width: "101%",
                          height: "282px",
                          top: "-25px",
                          left: "30px",
                          borderRadius: "3px",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Div
                        display="none"
                        display_md="flex"
                        style={{
                          position: "absolute",
                          background: "#F5F5F5",
                          width: "101%",
                          height: "282px",
                          top: "-25px",
                          left: "25px",
                          borderRadius: "3px",
                        }}
                      />
                      <Div
                        display="none"
                        display_md="flex"
                        style={{
                          position: "absolute",
                          background: "#0097CD",
                          width: "256px",
                          height: "256px",
                          bottom: "-20px",
                          right: "0px",
                          borderRadius: "3px",
                        }}
                      />
                    </>
                  )}
                  <StyledBackgroundSection
                    height={`350px`}
                    // width={`85%`}
                    borderRadius={`3px`}
                    image={m.image.childImageSharp.gatsbyImageData}
                    bgSize={`contain`}
                    alt="geekforce image"
                  />
                </Div>
              </GridContainerWithImage>
            </React.Fragment>
          );
        })}
    </>
  );
};
export const query = graphql`
  query GeekPalQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            title
            description
            image
            keywords
            slug
          }
          seo_title
          header {
            title
            paragraph
            bullets
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                )
              }
            }
            image_alt
            image_logo
          }
          tagline
          sub_heading
          list {
            title
            text
            sub {
              title
              text
            }
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                )
              }
            }
            position
          }
          icons {
            icon
            title
          }
          geekPal {
            videoId
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                )
              }
            }
          }
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          testimonials {
            student_name
            testimonial_date
            hidden
            linkedin_url
            linkedin_text
            student_thumb {
              childImageSharp {
                gatsbyImageData(
                  layout: FIXED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 200
                  height: 200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            content
            source_url
            source_url_text
          }
        }
      }
    }
    allPartnerYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          partners {
            images {
              name
              link
              follow
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 150
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
            tagline
            sub_heading
            footer_button
            footer_link
          }
        }
      }
    }
  }
`;
export default BaseRender(GeekPal);
