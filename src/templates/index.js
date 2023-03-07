import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { graphql, Link, navigate } from "gatsby";
import { Helmet } from "react-helmet";
import {
  H1,
  H2,
  H3,
  H4,
  Title,
  Separator,
  Paragraph,
  Span,
} from "../components/Heading";
import {
  Row,
  Column,
  GridContainerWithImage,
  Container,
  Grid,
  Div,
  GridContainer,
} from "../components/Sections";
import {
  Button,
  Colors,
  StyledBackgroundSection,
  Anchor,
} from "../components/Styling";
import { Circle } from "../components/BackgroundDrawing";
import News from "../components/News";
import Icon from "../components/Icon";
import Credentials from "../components/Credentials";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session.js";
import Loc from "../components/Loc";
import Badges from "../components/Badges";
import With4Geeks from "../components/With4Geeks";
import About4Geeks from "../components/About4Geeks";
import OurPartners from "../components/OurPartners";
import ChooseYourProgram from "../components/ChooseYourProgram";
import Testimonials from "../components/Testimonials";
import { isDevelopment, isTestMode } from "../components/NavbarDesktop";

const SVGBubblesLeft = () => (
  <svg
    style={{ top: "62px", left: "0", position: "absolute", zIndex: -1 }}
    width="26"
    height="362"
    viewBox="0 0 26 362"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <circle cx="-2.5" cy="333.5" r="28.5" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="-10.5" cy="26.5" r="26.5" fill="#0097CD" />
  </svg>
);

const SVGBubblesRight = () => (
  <svg
    style={{ top: "10px", right: "0", position: "absolute", zIndex: -1 }}
    width="50"
    height="160"
    viewBox="0 0 50 160"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <circle cx="12.5" cy="73.5" r="12.5" fill="#CD0000" />
    <circle cx="89" cy="80" r="80" fill="#FFB718" fillOpacity="0.2" />
  </svg>
);

const Home = (props) => {
  const { data, pageContext, yml } = props;

  const hiring = data.allPartnerYaml.edges[0].node;
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

  const isContentBarActive =
    (session?.location?.custom_bar.active && isTestMode) ||
    (session?.location?.custom_bar.active && !isDevelopment());

  return (
    <>
      {/* <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      </Helmet> */}
      <Div
        display="flex"
        position="absolute"
        width="100%"
        zIndex="0"
        display_tablet="none"
      >
        <SVGBubblesLeft />
        <SVGBubblesRight />
      </Div>
      <Div
        display="block"
        margin={isContentBarActive ? "110px 0 72px 0" : "72px 0 72px 0"}
        margin_tablet={
          isContentBarActive ? "120px 0 108px 0" : "72px 0 108px 0"
        }
      >
        <GridContainerWithImage
          padding="30px 0 0 0"
          padding_tablet="0"
          columns_tablet="2"
          margin_tablet="30px 0 20px 0"
          position="relative"
        >
          <Div
            position="absolute"
            zIndex="5"
            right_tablet={yml.header_data.video ? "40%" : "5%"}
            right="5%"
            top_tablet={yml.header_data.video ? "1%" : "55%"}
            top="90px"
            width_tablet="160px"
            height_tablet="152px"
            width="100px"
            height="100px"
          >
            <Icon icon="logo-badge" width="100%" height="100%" />
          </Div>
          <Div
            flexDirection="column"
            // justifyContent_tablet="evenly"
            alignItems="center"
            alignItems_tablet="start"
            padding="0 0 0 20px"
          >
            <Div
              flexDirection="column"
              alignItems="start"
              padding_tablet="0"
              margin_tablet="0"
              margin_sm="0 0 20px 0"
            >
              {/* <CityH1 yml={yml} /> */}
              <H1
                type="h1"
                textAlign="left"
                textShadow="none"
                fontSize="13px"
                color="#606060"
              >
                {city} {yml.header_data.tagline}
              </H1>
              <H2
                type="h2"
                textAlign="left"
                fontSize="40px"
                fontSize_tablet="50px"
                margin="20px 0 0 0"
                lineHeight_xs="38px"
                lineHeight_tablet="60px"
                width_tablet="100%"
                width_xs="80%"
              >{`${yml.header_data.title}`}</H2>
              <Div display="block" margin="20px 0">
                {yml.header_data.bullets.map((bullet) => (
                  <Div alignItems="center" margin="0 0 15px 0">
                    <Icon
                      icon="check-circle"
                      style={{ marginRight: "10px" }}
                      fill={Colors.blue}
                    />
                    <Paragraph
                      textAlign="left"
                      padding="0 20% 0 0"
                      color={Colors.black}
                      fontSize="16px"
                    >
                      {bullet}{" "}
                    </Paragraph>
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
                  onClick={goToChooseProgram}
                >
                  {yml.header_data.join_button_text}
                </Button>
                {/* <Button
                  variant="outline"
                  justifyContent="center"
                  // width="200px"
                  width_tablet="fit-content"
                  color={Colors.blue}
                  margin="0 0 0 10px"
                  textColor={Colors.blue}
                >
                  {yml.header_data.free_button_text}
                </Button> */}
              </Div>
            </Div>
          </Div>
          <Div display="flex" height="auto" width="100%">
            {yml.header_data.video && yml.header_data.video != "" ? (
              <Div
                height_tablet="623px"
                width="100%"
                className="wrapper-container"
                position="relative"
                padding_tablet="50px 10px 0 20px"
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
                  margin="auto"
                  zIndex="2"
                >
                  <iframe
                    src={yml.header_data.video}
                    allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                    width="100%"
                    height="100%"
                    style={{ border: "none", borderRadius: "24px" }}
                  />
                </Div>
              </Div>
            ) : (
              <StyledBackgroundSection
                height_tablet="623px"
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
          margin="10px auto"
          margin_tablet="auto"
          width="90%"
          className="badge-slider hideOverflowX__"
        >
          <News
            lang={pageContext.lang}
            limit={yml.news.limit}
            // width={`17%`}
            height="45px"
            margin="0"
            justifyContent="between"
          />
        </Div>
      </Div>
      <Testimonials lang={data.allTestimonialsYaml.edges} />
      <Badges
        lang={pageContext.lang}
        paragraph={yml.badges.paragraph}
        margin="10px 0 65px 0"
        paddingText="0 5% 0.5em 5%"
        paddingText_tablet="0 12% 1.6em 12%"
      />

      <GridContainer
        margin="44px 0"
        padding="50px 0"
        padding_tablet="40px 0"
        margin_tablet="0 0 40px 0"
      >
        <Div background="#EBEBEB" height="1px" />
      </GridContainer>

      <About4Geeks lang={data.allAbout4GeeksYaml.edges} />
      <Credentials lang={data.allCredentialsYaml.edges} shadow={false} />
      <With4Geeks
        lang={pageContext.lang}
        sessionLocation={
          session &&
          session.location &&
          session.location.breathecode_location_slug
        }
        playerHeight="auto"
        title={true}
      />
      <ChooseYourProgram
        chooseProgramRef={chooseProgramRef}
        lang={pageContext.lang}
        programs={data.allChooseYourProgramYaml.edges[0].node.programs}
        title={yml.choose_program.title}
        paragraph={yml.choose_program.paragraph}
      />
      <OurPartners
        images={hiring.partners.images}
        marquee
        title={hiring.partners.tagline}
        paragraph={hiring.partners.sub_heading}
      />

      <Loc
        lang={pageContext.lang}
        yml={yml.locations}
        allLocationYaml={data.allLocationYaml}
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
            free_button_text
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
            heading
            sub_heading
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
          locations {
            heading
            sub_heading
            title_image
            sub_title_image
            image
            choose
            regions {
              name
              title
              content
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
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 150
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
                  # fluid(maxWidth: 100){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
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
                # fluid(maxWidth: 800){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
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
              # fluid(maxWidth: 1200){
              #   ...GatsbyImageSharpFluid_withWebp
              # }
            }
          }
          image_mobile {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                width: 800
                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
              )
              # fluid(maxWidth: 800){
              #   ...GatsbyImageSharpFluid_withWebp
              # }
            }
          }
        }
      }
    }
  }
`;

export default BaseRender(Home);
