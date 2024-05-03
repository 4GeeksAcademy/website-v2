import React, { useRef, useState } from "react";
import { graphql, navigate } from "gatsby";
import { H1, H2, Paragraph, Span } from "../components/Heading";
import {
  Row,
  Column,
  GridContainerWithImage,
  Container,
  Grid,
  Div,
  GridContainer,
} from "../components/Sections";
import { Button, Colors, StyledBackgroundSection } from "../components/Styling";
import { Circle } from "../components/BackgroundDrawing";
import News from "../components/News";
import Icon from "../components/Icon";
import Credentials from "../components/Credentials";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session.js";
import Loc from "../components/Loc";
import Badges from "../components/Badges";
import With4Geeks from "../components/With4Geeks";
import OurPartners from "../components/OurPartners";
import ChooseYourProgram from "../components/ChooseYourProgram";
import Testimonials from "../components/Testimonials";
import { isDevelopment, isTestMode } from "../components/NavbarDesktop";
import TwoColumn from "../components/TwoColumn/index.js";

const Home = (props) => {
  const { data, pageContext, yml } = props;

  const hiring = data.allPartnerYaml.edges[0].node;
  const landingHiring = yml.partners;
  const { session } = React.useContext(SessionContext);
  const [city, setCity] = useState("");

  //
  // const city = session && session.location ? "" : "Miami";

  React.useEffect(() => {
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

  const goToChooseProgram = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: chooseProgramRef.current?.offsetTop,
      behavior: "smooth",
    });
  };
  const buttonProgram = {
    es: "VER PROGRAMAS",
    en: "CHOOSE PROGRAM",
  };

  const isContentBarActive = true;
  // (session?.location?.custom_bar.active && isTestMode) ||
  // (session?.location?.custom_bar.active && !isDevelopment());

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
            {(indexVideo || sessionVideo) && false ? (
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

      <Testimonials
        lang={data.allTestimonialsYaml.edges}
        background={Colors.verylightGray}
        //noMove // no movement and show slider
      />

      <TwoColumn
        left={{ image: yml.why_4geeks?.image }}
        right={{
          heading: yml.why_4geeks?.heading,
          sub_heading: yml.why_4geeks?.sub_heading,
          content: yml.why_4geeks?.content,
          button: yml.why_4geeks?.button,
        }}
        proportions={yml.why_4geeks?.proportions}
        session={session}
      />

      {/* <About4Geeks lang={data.allAbout4GeeksYaml.edges} /> */}

      <Credentials lang={data.allCredentialsYaml.edges} shadow={false} />

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
      <TwoColumn
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
      />

      {/* <OurPartners
        images={hiring.partners.images}
        margin="0"
        padding="50px 0"
        marquee
        paddingFeatured="0 0 50px 0"
        featuredImages={landingHiring?.featured}
        showFeatured
        withoutLine
        title={landingHiring ? landingHiring.heading : hiring.partners.tagline}
        paragraph={
          landingHiring
            ? landingHiring.sub_heading
            : hiring.partners.sub_heading
        }
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
          news {
            limit
            heading
          }
          button {
            button_text
            button_link
          }
          badges {
            paragraph
          }
          choose_program {
            title
            paragraph
          }
          geeks_vs_others {
            heading
            sub_heading
            sub_heading_link
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
          }
          with_4geeks {
            title
          }
          two_columns {
            proportions
            justify
            image {
              style
              src
              shadow
            }
            heading {
              text
              style
              font_size
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
          }
          join_geeks {
            heading
            sub_heading
            geek_data {
              geek_force_data {
                content
                icon_link
              }
              geek_pal_data {
                content
                icon_link
              }

              geek_force_heading
              geek_pal_heading
            }
          }
          alumni_header {
            heading
            sub_heading
          }
          testimonial_header {
            heading
            button_text
            button_link
          }
        }
      }
    }
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          credentials {
            title
            icon
            value
          }
        }
      }
    }
    allJobsStatisticsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          id
          jobs {
            title
            slug
            sub_title
            value
            value_symbol
            chart_data
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
          coding {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
            tagline
            sub_heading
          }
          influencers {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
            tagline
            sub_heading
          }
          financials {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
            tagline
            sub_heading
          }
        }
      }
    }
    allLocationYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
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
          seo_title
          online_available
          header {
            sub_heading
            tagline
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          info_box {
            heading
            address
            contact_heading
            phone
            email
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          images_box {
            images {
              path {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              alt
            }
            content
            heading
          }
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
    allAlumniProjectsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          header {
            tagline
            sub_heading
          }
          projects {
            project_name
            slug
            project_image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            project_content
            project_video
            live_link
            github_repo
            alumni {
              first_name
              last_name
              job_title
              github
              linkedin
              twitter
            }
          }
          button_section {
            button_text
            button_link
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
            comming_soon
            text_link
          }
        }
      }
    }
    allAbout4GeeksYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          heading
          sub_heading
          list {
            title
          }
          paragraph
          button_text
          button_link
          image {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                width: 1200
                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
              )
            }
          }
        }
      }
    }
  }
`;

export default BaseRender(Home);
