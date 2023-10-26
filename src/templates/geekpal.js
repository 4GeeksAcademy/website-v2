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
import Overlaped from "../components/Overlaped";

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
        padding_tablet="100px 40px 40px 40px"
        padding_md="100px 80px 40px 80px"
        padding_lg="100px 0px 40px 0px"
        columns_tablet="18"
        margin={
          isCustomBarActive(session)
            ? "120px auto 24px auto"
            : "70px auto 24px auto"
        }
        maxWidth="1366px"
        position="relative"
        gridTemplateColumns_tablet="repeat(21, 1fr)"
        gridGap="0px"
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
        // display_xs="none"
        // display_tablet="flex"
        />
        <Img
          src="/images/vector-stroke-light.png"
          width="120px"
          height="165px"
          style={{
            position: "absolute",
            left: "48%",
            top: "20%",
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
            //fontFamily="Lato-Bold"
            //fontWeight="black"
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
            fontFamily="Lato-Bold"
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
                fontFamily="Lato-Bold"
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
                    transform:
                      bulletIcons[index % bulletIcons.length]?.transform,
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
              zIndex: "-1",
            }}
          />
        </Div>
        <Div
          height="auto"
          width="100%"
          padding_xs="40px 0 0 0"
          padding_tablet="15% 0 0 0"
          padding_md="0% 16px 0 10%"
          padding_lg="0 15px 0 10%"
          gridColumn_tablet="12 / 22"
          position="relative"
        >
          <Img
            src="/images/Group-6400.png"
            width="193px"
            height="10px"
            style={{
              position: "absolute",
              // bottom: "0px",
            }}
            left_xs="0"
            bottom_tablet="10%"
            left_md="10%"
            bottom_md="10%"
            bottom_lg="0%"
          />
          <Div
            border="3px solid black"
            boxShadow="13px 13px 0px 1px rgba(0,0,0,1)"
            zIndex="1"
            height="fit-content"
            width="100%"
          >
            {yml.geekPal.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {item.videoId === "" ? (
                    <StyledBackgroundSection
                      height={`280px`}
                      // width={`85%`}
                      //borderRadius={`3px`}
                      image={item.image.childImageSharp.gatsbyImageData}
                      bgSize={`contain`}
                      alt="geekforce image"
                    />
                  ) : (
                    <ReactPlayer
                      id={item.videoId}
                      thumb={item.image}
                      margin_tablet="0px"
                      //imageSize="maxresdefault"
                      videoHeight="280px"
                      bgSize={`contain`}
                      style={{
                        width: "100%",
                        height: "280px",
                      }}
                      margin="-3px 0 0 0"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </Div>
        </Div>
      </Grid>

      {/* ICONOGRAM-GEEKPAL */}
      <Div
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
            <>
            {i === 1 ? (
                <Overlaped
                  heading={m?.title}
                  content={m?.text}
                  button={m?.button}
                  image={m.image.childImageSharp.gatsbyImageData}
                />
              ) : (
                <React.Fragment key={`${i}-${m.title}`}>
                  <Grid
                    gridTemplateColumns_tablet="repeat(20, 1fr)"
                    imageSide={i % 2 != 0 ? "left" : "right"}
                    padding_tablet="50px 40px 20px 40px"
                    padding_md="50px 80px 20px 80px"
                    padding_lg={i === 0 ? "50px 0 0 0" : "0 0 50px 0"}
                    padding_xxs="0 20px"
                    columns_tablet="14"
                    maxWidth_tablet="1366px"
                    margin_tablet="0 auto"
                    gridGap="0px"
                  >
                    <Div
                      flexDirection="row"
                      flexWrap="wrap"
                      justifyContent_tablet="start"
                      alignContent={i % 2 == 0 ? "center" : "flex-start"}
                      padding="0"
                      padding_tablet={i % 2 == 0 ? "0 14px 0 0" : "0 0 0 14px"}
                      padding_lg={i % 2 == 0 ? "0 25px 0 0" : "0 0 0 23px"}
                      gridArea_lg={i % 2 == 0 ? "1/1/1/11" : "1/11/1/21"}
                      gridArea_tablet={i % 2 == 0 ? "1/1/1/11" : "1/11/1/21"}
                    >
                      <H2
                        key={i}
                        type="h2"
                        padding="20px 0"
                        lineHeight="36px"
                        textAlign="center"
                        textAlign_tablet="left"
                        margin="0"
                        fontWeight="700"
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
                                <Div display="" inline>
                                  <Icon
                                    icon={"check"}
                                    width="13px"
                                    display="inline"
                                    color={Colors.blue}
                                    fill={Colors.yellow}
                                    style={{ strokeWidth: "2px" }}
                                  />
                                  <H3
                                    type="h3"
                                    padding="10px 0px 10px 5px"
                                    textAlign="left"
                                    margin="0"
                                    fontWeight="900"
                                    textTransform="uppercase"
                                    fontSize="15px"
                                  >
                                    {sub?.title}
                                  </H3>
                                </Div>
                                <Paragraph
                                  letterSpacing="0.05em"
                                  textAlign="left"
                                  margin="0 0 20px 0"
                                  fontSize="15px"
                                  lineHeight="22px"
                                  dangerouslySetInnerHTML={{
                                    __html: sub?.text,
                                  }}
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
                      margin_xs={i % 2 != 0 && "0 0 20px 0"}
                      margin_sm={i % 2 == 0 && "0 0 20px 0"}
                      margin_tablet="0px"
                      padding_lg={i === 0 ? "0 0 0 0" : "0 0 0 0"}
                      gridArea_lg={i % 2 == 0 ? "1/11/1/21" : "1/1/1/11"}
                      gridArea_tablet={i % 2 == 0 ? "1/11/1/21" : "1/1/1/11"}
                      style={{ position: "relative" }}
                    >
                      {i === 0 ? (
                        <>
                          <Img
                            src="/images/Ellipse-79.png"
                            display_xxs="none"
                            display_tablet="flex"
                            width="164px"
                            height="164px"
                            style={{
                              position: "absolute",
                              zIndex: "0",
                            }}
                            right_lg="-7%"
                            top_lg="-4%"
                            right_md="-15%"
                            top_md="-12%"
                            right_tablet="-25%"
                            top_tablet="8%"
                          />
                        </>
                      ) : i === 2 && (
                        <>
                          
                        </>
                      )
                      }
                      <StyledBackgroundSection
                        height_lg={i===0 ?"600px" : "600px"}
                        height_xxs="200px"
                        height_xs="300px"
                        height_tablet="350px"
                        // width={`85%`}
                        image={m.image.childImageSharp.gatsbyImageData}
                        bgSize={`contain`}
                        alt="geekforce image"
                      />
                    </Div>
                  </Grid>
                </React.Fragment>
              )}
            </>
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
                  width: 1000
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                )
              }
            }
            position
            button {
              link
              text
              color
            }
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

