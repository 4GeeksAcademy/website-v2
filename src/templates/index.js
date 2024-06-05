import React, { useRef, useState, useContext, useEffect } from "react";
import { graphql, navigate } from "gatsby";
import { H1, H2, Paragraph } from "../components/Heading";
import { GridContainerWithImage, Div } from "../components/Sections";
import { Button, Colors, StyledBackgroundSection } from "../components/Styling";
import { Circle } from "../components/BackgroundDrawing";
import Iconogram from "../components/Iconogram";
import News from "../components/News";
import Icon from "../components/Icon";
import GeeksVsOthers from "../components/GeeksVsOthers";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session.js";
import Loc from "../components/Loc";
import With4Geeks from "../components/With4Geeks";
import PricesAndPayment from "../components/PricesAndPayment";
import OurPartners from "../components/OurPartners";
import ChooseYourProgram from "../components/ChooseYourProgram";
import Testimonials from "../components/Testimonials";
import TwoColumn from "../components/TwoColumn/index.js";
import Badges from "../components/Badges";

const Home = (props) => {
  const { data, pageContext, yml } = props;

  const hiring = data.allPartnerYaml.edges[0].node;
  const landingHiring = yml.partners;
  const { session } = useContext(SessionContext);
  const [city, setCity] = useState("");

  const applyButton = session?.location?.button?.apply_button_text;

  useEffect(() => {
    console.log("HASH: ", window.location);

    if (
      session.language === "es" &&
      window.location.hash === "" &&
      !RegExp("/es/inicio").test(window.location.href)
    )
      navigate("/es/inicio");

    if (session?.language && window && window.location.pathname === "/")
      navigate(
        `${
          props.pageContext.translations[
            session.language === "en" ? "us" : session.language
          ]
        }`
      );

    // It returns the 4Geeks Academy campus closest to the user's country
    setCity(session.location ? session.location.city : "");
  }, [session]);

  const chooseProgramRef = useRef(null);

  const isContentBarActive = true;

  const indexVideo = yml && yml.header_data && yml.header_data.video;
  const sessionVideo =
    session &&
    session.location &&
    session.location.meta_info &&
    session.location.meta_info.home_video;
  const video = sessionVideo && sessionVideo !== "" ? sessionVideo : indexVideo;

  return (
    <>
      <Div
        flexDirection="column"
        margin_tablet={
          isContentBarActive ? "120px auto 108px auto" : "72px auto 108px auto"
        }
        maxWidth="1280px"
        padding_xxs="0px 0px"
        padding_tablet="0 40px"
        padding_md="0 80px"
        padding_lg="0px"
      >
        <GridContainerWithImage
          padding="30px 0 0 0"
          padding_tablet="0"
          columns_tablet="2"
          margin_tablet="30px 0 20px 0"
          position="relative"
          gridColumn_tablet="1/15"
        >
          {yml.header_data.video && (
            <Div
              position="absolute"
              zIndex="5"
              left_tablet={yml.header_data.video ? "40%" : "50%"}
              left="50%"
              left_xxs="65%"
              left_xs="74%"
              top_tablet={yml.header_data.video ? "1%" : "25%"}
              top="90px"
              top_xxs="20px"
              top_xs="100px"
              width_xxs="80px"
              width_sm="100px"
              height_xxs="80px"
              width_tablet="160px"
              height_tablet="152px"
              width="100px"
              height="100px"
            >
              <Icon icon="logo-badge" width="100%" height="100%" />
            </Div>
          )}
          <Div
            flexDirection="column"
            alignItems="start"
            alignItems_tablet="start"
            margin_xxs="0 20px"
            margin_tablet="0px"
          >
            <Div
              flexDirection="column"
              alignItems="start"
              padding_tablet="0"
              margin_tablet="0"
              margin_sm="0 0 20px 0"
            >
              <H1
                type="h1"
                textAlign="left"
                textShadow="none"
                fontSize="16px"
                lineHeight="18px"
                fontWeight="400"
                color={Colors.black}
              >
                {city} {yml.header_data.tagline}
              </H1>
              <H2
                type="h2"
                textAlign_tablet="start"
                textAlign_xxs="start"
                fontSize="40px"
                fontSize_tablet="50px"
                margin="20px 0 0 0"
                lineHeight_xxs="45px"
                lineHeight_tablet="60px"
                width_tablet="100%"
                fontFamily="Archivo-Black"
              >
                {`${yml.header_data.title}`}
              </H2>
              <Div display="block" margin="20px 0">
                {yml.header_data.bullets.map((bullet) => (
                  <Div alignItems="center" margin="0 0 15px 0" gap="5px">
                    <Icon
                      icon="check"
                      fill={Colors.blue}
                      color={Colors.blue}
                      width="20px"
                      height="15px"
                    />
                    <Paragraph
                      textAlign="left"
                      padding_tablet="0 20% 0 0"
                      color={Colors.black}
                      fontSize="16px"
                      lineHeight="19px"
                      opacity="1"
                      dangerouslySetInnerHTML={{ __html: bullet }}
                    />
                  </Div>
                ))}
              </Div>
              <Div width="100%" justifyContent="start">
                <Button
                  variant="full"
                  justifyContent="center"
                  width="140px"
                  width_tablet="fit-content"
                  color={Colors.blue}
                  margin="0 10px 0 0"
                  textColor="white"
                  textTransform="none"
                  fontSize="17px"
                  borderRadius="4px"
                  onClick={() => {
                    if (
                      yml.header_data.join_button_path &&
                      yml.header_data.join_button_path.indexOf("http") > -1
                    )
                      window.open(
                        transferQuerystrings(
                          yml.header_data.join_button_path,
                          utm
                        )
                      );
                    else navigate(yml.header_data.join_button_path);
                  }}
                >
                  {yml.header_data.join_button_text}
                </Button>
              </Div>
            </Div>
          </Div>
          <Div display="flex" height="auto" width="100%">
            {indexVideo || sessionVideo ? (
              <Div
                height_tablet="623px"
                width="100%"
                className="wrapper-container"
                position="relative"
                padding_tablet="50px 0 0 0"
                padding="0"
              >
                <Circle
                  color="black"
                  width="119px"
                  height="11px"
                  border="10px"
                  bottom="60px"
                  right="-30px"
                  zIndex="1"
                  display="none"
                  display_tablet="inline"
                />
                <Circle
                  color="black"
                  width="50px"
                  height="11px"
                  border="10px"
                  bottom="60px"
                  right="100px"
                  zIndex="1"
                  display="none"
                  display_tablet="inline"
                />
                <Circle
                  color="yellow"
                  opacity="0.2"
                  width="200px"
                  height="200px"
                  bottom="100px"
                  right="-80px"
                  zIndex="1"
                  display="none"
                  display_tablet="inline"
                />
                <Div
                  width="90%"
                  width_sm="335px"
                  width_tablet="368px"
                  height="427px"
                  height_tablet="469px"
                  margin_tablet="0"
                  margin_lg="0 auto"
                  margin_md="0 auto"
                  margin="auto"
                  zIndex="2"
                >
                  <iframe
                    src={video}
                    allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                    width="100%"
                    height="100%"
                    style={{ border: "none", borderRadius: "24px" }}
                  />
                </Div>
              </Div>
            ) : (
              <StyledBackgroundSection
                height_tablet="533px"
                display_tablet="block"
                display="none"
                height="390px"
                width="100%"
                image={
                  yml.header_data.image &&
                  yml.header_data.image.childImageSharp.gatsbyImageData
                }
                alt="Hero image"
                bgSize="contain"
              />
            )}
          </Div>
        </GridContainerWithImage>

        <Div
          margin="70px auto 0 auto"
          margin_tablet="30px auto 0 auto"
          width="100%"
          className="badge-slider hideOverflowX__"
        >
          <News
            lang={pageContext.lang}
            limit={yml.news.limit}
            height="45px"
            margin="0"
            justifyContent="between"
          />
        </Div>
      </Div>
      <Div
        margin="70px auto 0 auto"
        margin_tablet="30px auto 0 auto"
        width="100%"
        className="badge-slider hideOverflowX__"
        background={Colors.veryLightBlue2}
      >
        <Badges
          variant="squares"
          lang={pageContext.lang}
          short_text="15px"
          margin="40px auto"
          title={yml.badges.title}
          paragraph={yml.badges.paragraph}
          maxWidth="1280px"
          paddingText_tablet="0 10% 5px 10%"
        />
      </Div>
      <Div background={Colors.veryLightBlue2} display="block">
        <TwoColumn
          left={{ image: yml.why_4geeks?.image }}
          right={{
            heading: yml.why_4geeks?.heading,
            sub_heading: yml.why_4geeks?.sub_heading,
            content: yml.why_4geeks?.content,
            bullets: yml.why_4geeks?.bullets,
            button: {
              ...yml.why_4geeks?.button,
              text: applyButton || yml.why_4geeks?.button?.text,
            },
          }}
          proportions={yml.why_4geeks?.proportions}
          session={session}
        />
      </Div>
      <Iconogram yml={yml.iconogram} background={Colors.veryLightBlue2} />
      <GeeksVsOthers
        lang={pageContext.lang}
        mainBackround={Colors.white}
        limit={5}
        style={{ background: Colors.veryLightBlue2 }}
        title={yml.geeks_vs_others.heading}
        paragraph={yml.geeks_vs_others.sub_heading}
        link
      />
      <Testimonials
        lang={data.allTestimonialsYaml.edges}
        background={Colors.veryLightBlue2}
        heading={yml.success_cases.title}
        content={yml.success_cases.content}
        margin="0"
        variant="carousel"
      />

      <With4Geeks
        lang={pageContext.lang}
        sessionLocation={
          session &&
          session.location &&
          session.location.breathecode_location_slug
        }
        playerHeight="600px"
        title={yml.with_4geeks.title}
      />
      <ChooseYourProgram
        chooseProgramRef={chooseProgramRef}
        id="choose-program"
        lang={pageContext.lang}
        programs={data.allChooseYourProgramYaml.edges[0].node.programs}
        title={yml.choose_program.title}
        paragraph={yml.choose_program.paragraph}
      />

      {/* TWO COLUMN CREAR EN EL YML*/}
      {/* <TwoColumn
        right={{ image: yml.two_columns?.image }}
        left={{
          heading: yml.two_columns?.heading,
          sub_heading: yml.two_columns?.sub_heading,
          button: yml.two_columns?.button,
          content: yml.two_columns?.content,
          justify: yml.two_columns?.justify,
        }}
        proportions={yml.two_columns?.proportions}
        session={session}
      /> */}

      <Iconogram yml={yml.iconogram_two} />

      <OurPartners
        images={hiring.partners.images}
        margin="0"
        padding="50px 0"
        marquee
        paddingFeatured="0 0 50px 0"
        featuredImages={landingHiring?.featured}
        variant="carousel"
        withoutLine
        title={landingHiring ? landingHiring.heading : hiring.partners.tagline}
        paragraph={
          landingHiring
            ? landingHiring.sub_heading
            : hiring.partners.sub_heading
        }
      />
      {/* <PricesAndPayment
        lang={pageContext.lang}
        locations={data.allLocationYaml.edges}
        defaultCourse="full-stack"
        defaultSchedule="part_time"
      /> */}
      <Loc
        lang={pageContext.lang}
        allLocationYaml={data.allLocationYaml}
        hideHeading
      />
    </>
  );
};
export const query = graphql`
  query HomeBackupQuery($file_name: String!, $lang: String!) {
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
          }
          header_data {
            tagline
            title
            sub_heading
            bullets
            join_button_text
            join_button_path
            free_button_text
            free_button_path
            video
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 700
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
          }
          badges {
            title
            paragraph
          }
          news {
            limit
            heading
          }
          button {
            button_text
            button_link
          }
          success_cases {
            title
            content
          }
          choose_program {
            title
            paragraph
          }
          why_4geeks {
            proportions
            image {
              style
              src
              shadow
            }
            heading {
              text
              font_size
              style
            }
            sub_heading {
              text
              font_size
            }
            content {
              text
              font_size
            }
            button {
              text
              color
              background
              path
            }
            bullets {
              items {
                heading
                icon
              }
            }
          }
          geeks_vs_others {
            heading
            sub_heading
          }
          iconogram {
            heading {
              text
              font_size
              style
            }
            swipable
            background
            icons {
              icon
              color
              content
              content_style
            }
          }
          iconogram_two {
            swipable
            heading {
              text
              style
              font_size
              style
            }
            sub_heading {
              text
              style
              font_size
            }
            icons {
              icon
              color
              title
              content
            }
            button {
              text
              color
              path
              background
              hover_color
            }
          }
          with_4geeks {
            title
          }
        }
      }
    }
    allPartnerYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          partners {
            tagline
            sub_heading
            footer_tagline
            footer_button
            footer_link
            images {
              name
              locations
              link
              follow
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 200
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
          }
        }
      }
    }
    allLocationYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          active_campaign_location_slug
          breathecode_location_slug
          city
          name
          meta_info {
            slug
            title
            description
            visibility
            position
            image
            keywords
            region
          }
          fields {
            lang
            file_name
          }
          seo_title
          online_available
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          heading
          button_text
          button_link
          testimonials {
            student_name
            testimonial_date
            include_in_marquee
            hidden
            linkedin_url
            linkedin_text
            linkedin_image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  height: 14
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            student_thumb {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  height: 200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            short_content
            content
            source_url
            source_url_text
          }
        }
      }
    }
    allChooseYourProgramYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          programs {
            link
            sub_title
            title
            description
            description_mobile
            icon
            text_link
          }
        }
      }
    }
  }
`;

export default BaseRender(Home);
