import React from "react";
import { graphql } from "gatsby";
import { Colors, Img } from "../components/Styling";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session";
import { isCustomBarActive } from "../actions";

// components
import FinancialFilter from "../components/FinancialFilter";
import { Header } from "../components/Sections";
import { Div } from "../components/Sections";
import { H2, Paragraph, H3, H4 } from "../components/Heading";
import Icon from "../components/Icon";
import WeTrust from "../components/WeTrust";
import PricesAndPayment from "../components/PricesAndPayment";
import Iconogram from "../components/Iconogram";
import TwoColumn from "../components/TwoColumn";
import Badges from "../components/Badges";

const SVGBubblesLeft = () => (
  <svg
    style={{ top: "75px", left: "75px", position: "absolute" }}
    width="205"
    height="286"
    viewBox="0 0 205 286"
    fill="none"
    xmlns="https:://www.w3.org/2000/svg"
  >
    <circle cx="191.5" cy="59.5" r="13.5" fill="#CD0000" />
    <circle cx="8.5" cy="8.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="40.5" cy="63.5" r="8.5" fill="white" />
    <circle cx="8.5" cy="43.5" r="8.5" fill="black" />
    <circle cx="40.5" cy="98.5" r="8.5" fill="black" />
    <circle cx="8.5" cy="98.5" r="8.5" fill="white" />
    <circle cx="40.5" cy="141.5" r="8.5" fill="white" />
    <circle cx="8.5" cy="141.5" r="8.5" fill="white" />
    <circle cx="40.5" cy="178.5" r="8.5" fill="white" />
    <circle cx="8.5" cy="222.5" r="8.5" fill="#0097CD" />
    <circle cx="40.5" cy="277.5" r="8.5" fill="white" />
  </svg>
);

const SVGBubblesRight = () => (
  <>
    <svg
      style={{ right: "65px", position: "absolute", top: "110px" }}
      width="278"
      height="140"
      viewBox="0 0 278 140"
      fill="none"
      xmlns="https:://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="14" fill="#FFB718" />
      <circle cx="227.5" cy="45.5" r="26.5" fill="#0097CD" />
      <circle
        cx="269.5"
        cy="131.5"
        r="8.5"
        transform="rotate(90 269.5 131.5)"
        fill="white"
      />
      <circle
        cx="230.5"
        cy="131.5"
        r="8.5"
        transform="rotate(90 230.5 131.5)"
        fill="black"
      />
      <circle
        cx="191.5"
        cy="131.5"
        r="8.5"
        transform="rotate(90 191.5 131.5)"
        fill="white"
      />
    </svg>
  </>
);

const Financial = (props) => {
  const { session } = React.useContext(SessionContext);
  const { data, pageContext, yml } = props;
  let location = null;
  if (session && session.location) {
    location = data.allLocationYaml.edges.find(
      (l) =>
        l.node.active_campaign_location_slug ===
        session.location.active_campaign_location_slug
    );
    if (location) location = location.node;
  }

  const ymlTwoColumn = yml?.two_columns;

  return (
    <>
      {/* <Header
        margin={isCustomBarActive(session) ? "120px 0 0 0" : ""}
        background={Colors.lightBlue2}
        fontSize="40px"
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        padding_tablet="72px 0 15px 0"
        padding="72px 0 15px 0"
      /> */}
      <Header
        margin={isCustomBarActive(session) ? "60px auto 0 auto" : "0 auto"}
        paragraphMargin="26px 20px"
        paragraphMargin_Tablet="26px 22%"
        paddingParagraph_tablet="0 40px"
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        padding_tablet="72px 0 40px 0"
        padding="0px 20px"
        position="relative"
        fontSize_title="12px"
        fontSizeTitle_tablet="60px"
        fontFamily_title="Archivo-Black"
        fontSize_paragraph="24px"
        gridTemplateColumns_tablet="repeat(14, 1fr)"
        maxWidth="1366px"
      >
        <Img
          src="/images/landing/group-3.png"
          width="49px"
          height="286px"
          style={{
            position: "absolute",
            zIndex: "-1",
          }}
          display_xxs="none"
          display_tablet="flex"
          left_tablet="72px"
          top_tablet="13%"
          left_lg="0%"
          top_lg="13%"
        />

        <FinancialFilter
          button_text={yml.syllabus_button_text}
          program={yml.label.program.title}
          programClosedLabel={yml.label.program.closedLabel}
          modality={yml.label.modality.title}
          modalityClosedLabel={yml.label.modality.closedLabel}
          campus={yml.label.campus.title}
          campusClosedLabel={yml.label.campus.closedLabel}
          // openedLabel={yml.prices.opened_label}
          session={session}
          // closedLabel={yml.prices.closed_label}
          type={pageContext.slug}
          lang={pageContext.lang}
          locations={data.allLocationYaml.edges}
        />

      </Header>

      <Iconogram yml={yml.iconogram} />

      <PricesAndPayment
        background={`linear-gradient(to bottom, ${Colors.white} 50%, ${Colors.lightYellow2} 50%)`}
        type={pageContext.slug}
        lang={pageContext.lang}
        locations={data.allLocationYaml.edges}
        // programType={program_type}
        // courseType={course_type}
        title={yml.prices.heading}
        paragraph={yml.prices.sub_heading}
      />
      {/* <TwoColumn
        left={{ image: ymlTwoColumn[0].image }}
        right={{
          heading: ymlTwoColumn.heading,
          sub_heading: ymlTwoColumn.sub_heading,
          bullets: ymlTwoColumn.bullets,
          content: ymlTwoColumn.content,
          button: ymlTwoColumn.button,
          padding_tablet: "20px",
          gap_tablet: "40px",
        }}
        proportions={ymlTwoColumn.proportions}
        session={session}
      /> */}

      <Badges
        link
        // wrapped_images={true}
        id="parthers"
        lang={pageContext.lang}
        //background={Colors.verylightGray2}
        paragraph={parthers.heading}
        short_text
        padding="60px 0"
        padding_tablet="68px 0"
        margin_tablet="0 0 78px 0"
        maxWidth="1366px"
      />

      <TwoColumn
        left={{ image: ymlTwoColumn[1].image }}
        right={{
          heading: ymlTwoColumn[1].heading,
          sub_heading: ymlTwoColumn[1].sub_heading,
          bullets: ymlTwoColumn[1].bullets,
          content: ymlTwoColumn[1].content,
          button: ymlTwoColumn[1].button,
          padding_tablet: "20px",
          gap_tablet: "40px",
        }}
        proportions={ymlTwoColumn[1].proportions}
        session={session}
      />

      <WeTrust we_trust={yml.we_trust_section} />

      <TwoColumn
        right={{ image: ymlTwoColumn[2].image }}
        left={{
          heading: ymlTwoColumn[2].heading,
          sub_heading: ymlTwoColumn[2].sub_heading,
          bullets: ymlTwoColumn[2].bullets,
          content: ymlTwoColumn[2].content,
          button: ymlTwoColumn[2].button,
          padding_tablet: "20px",
          gap_tablet: "40px",
        }}
        proportions={ymlTwoColumn[2].proportions}
        session={session}
      />

    </>
  );
};

// REMOVED: payment_guide[...] ecosystem{...}
export const query = graphql`
  query FinancialQuery($file_name: String!, $lang: String!) {
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
          seo_title
          header {
            title
            paragraph
            tagline
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1600
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            alt
            sub_heading
          }
          intro {
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: FIXED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 300
                  height: 300
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fixed(width: 300, height: 300) {
                #   ...GatsbyImageSharpFixed
                # }
              }
            }
            image_second {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 450
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            content
            content_second
            heading_second
            bullets
            heading
          }
          label {
            program {
              title
              closedLabel
            }
            modality {
              title
              closedLabel
            }
            campus {
              title
              closedLabel
            }
          }
          syllabus_button_text
          parthers{
            paragraph
            badges{
              name
              url
              image
              alt
            }
          }
          two_columns {
            proportions
            image {
              style
              src
            }
            heading {
              text
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
              hover_color
              path
            }
          
          }
          we_trust_section {
            title
            text
            boxes {
              icon
              title
              text
            }
          }
          prices {
            heading
            sub_heading
            selector {
              top_label
              placeholder
            }
            button {
              text
              link
            }
          }
          iconogram{
            heading {
              text
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
    allLocationYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          id
          city
          country
          name
          active_campaign_location_slug
          breathecode_location_slug
          fields {
            lang
            file_name
          }
          meta_info {
            slug
            title
            description
            image
            keywords
            position
            redirects
            visibility
          }
          header {
            sub_heading
            tagline
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          documents {
            payment_guidebook {
              url
            }
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
                    width: 200
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
  }
`;
export default BaseRender(Financial);
