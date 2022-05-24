import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { graphql, Link, navigate } from "gatsby";
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
import ChooseProgram from "../components/ChooseProgram";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session.js";
import Loc from "../components/Loc/new_locations";
import Badges from "../components/Badges";
import With4Geeks from "../components/With4Geeks";
import About4Geeks from "../components/About4Geeks";
import OurPartners from "../components/OurPartners";
import ChooseYourProgram from "../components/ChooseYourProgram";
import Testimonials from "../components/Testimonials";

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

  yml.locations.regions.forEach((reg, ind, arr) => {
    if (arr[ind].name === "online") {
      arr[ind].sub_links = data.allLocationYaml.edges.filter(
        (loc) => loc.node.online_available || loc.node.online_available === null
      );
    } else {
      arr[ind].sub_links = data.allLocationYaml.edges.filter(
        (loc) => loc.node.meta_info.region === reg.name
      );
    }

    arr[ind].sub_links.sort((a, b) => {
      if (a.node.meta_info.position < b.node.meta_info.position) {
        return -1;
      }
      if (a.node.meta_info.position > b.node.meta_info.position) {
        return 1;
      }
      return 0;
    });
  });

  const hiring = data.allPartnerYaml.edges[0].node;
  const { session } = React.useContext(SessionContext);
  const [city, setCity] = useState("");

  // const city = session && session.location ? "" : "Miami";

  React.useEffect(() => {
    console.log("HASH: ", window.location);

    if (
      session.language === "es" &&
      window.location.hash === "" &&
      !RegExp("/es/inicio").test(window.location.href)
    )
      navigate("/es/inicio");

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

  return (
    <>
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
      <GridContainerWithImage
        padding="65px 5px 0 5px"
        padding_tablet="0"
        columns_tablet="2"
        margin="72px 0 72px 0"
        margin_tablet="72px 0 108px 0"
      >
        <Div
          flexDirection="column"
          justifyContent_tablet="evenly"
          alignItems="center"
          alignItems_tablet="start"
        >
          <Div
            flexDirection="column"
            alignItems="center"
            alignItems_tablet="start"
          >
            {/* <CityH1 yml={yml} /> */}
            <H1
              type="h1"
              textAlign_md="left"
              textShadow="none"
              fontSize="13px"
              color="#606060"
            >
              {city} {yml.header_data.tagline}
            </H1>
            <H2
              type="h2"
              textAlign_tablet="left"
              padding="0"
              padding_md="0px 34% 0 0"
              fontSize="40px"
              fontSize_tablet="50px"
              margin="20px 0 0 0"
              lineHeight="60px"
            >{`${yml.header_data.title}`}</H2>
            <Paragraph
              textAlign_tablet="left"
              margin="26px 0 35px 0"
              padding="0"
              padding_tablet="0 34% 0 0"
            >
              {yml.header_data.sub_heading}{" "}
            </Paragraph>
            <ChooseProgram
              buttonJustifyContent="center"
              buttonPadding="10px 0"
              width="175px"
              goTo={goToChooseProgram}
              right="15px"
              top="40px"
              textAlign="center"
              textAlign_tablet="left"
              openLabel={
                pageContext.lang === "es"
                  ? buttonProgram["es"]
                  : buttonProgram["en"]
              }
              closeLabel={
                pageContext.lang === "es"
                  ? buttonProgram["es"]
                  : buttonProgram["en"]
              }
            />
          </Div>

          <News
            lang={pageContext.lang}
            limit={yml.news.limit}
            width={`17%`}
            height="40px"
            justifyContent="center"
          />
        </Div>
        <Div display="none" display_tablet="flex" height="auto" width="100%">
          <StyledBackgroundSection
            height={`723px`}
            width="100%"
            image={
              yml.header_data.image &&
              yml.header_data.image.childImageSharp.gatsbyImageData
            }
            alt="Hero image"
            bgSize={`contain`}
          />
        </Div>
      </GridContainerWithImage>

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

      <Loc lang={pageContext.lang} yml={yml.locations} />
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
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
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
          prices {
            full_stack {
              full_time {
                slug
              }
              part_time {
                slug
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
    allChooseProgramYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          programs {
            text
            location_bc_slug
            link
            visibility
            schedule
          }
          open_button_text
          close_button_text
        }
      }
    }
  }
`;

export default BaseRender(Home);
