import React from "react";
import { graphql } from "gatsby";
import { Button, Colors, Img } from "../components/Styling";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session";
import { isCustomBarActive } from "../actions";

// components
import FinancialFilter from "../components/FinancialFilter";
import { Header } from "../components/Sections";
import { Div } from "../components/Sections";
import { H1, H2, Paragraph, H3, H4 } from "../components/Heading";
import Icon from "../components/Icon";
import WeTrust from "../components/WeTrust";
import PricesAndPayment from "../components/PricesAndPayment";
import Iconogram from "../components/Iconogram";
import TwoColumn from "../components/TwoColumn/index.js";
import Badges from "../components/Badges";

const Financial = (props) => {
  const { session } = React.useContext(SessionContext);
  const { data, pageContext, yml } = props;
  const { seo_title, header } = yml;
  console.log('yml');
  console.log(yml);
  const { button } = header;
  console.log('button');
  console.log(button);

  let location = null;
  if (session && session.location) {
    location = data.allLocationYaml.edges.find(
      (l) =>
        l &&
        l.node &&
        l.node.active_campaign_location_slug ===
          session.location.active_campaign_location_slug
    );
    if (location) location = location.node;
  }

  const ymlTwoColumn = yml?.two_column;
  const defaultCourse = "full-stack";

  return (
    <>
      <Div maxWidth="1280px" margin={isCustomBarActive(session) ? "140px auto 0 auto" : "60px auto"} gap="25px">
        <Div display="block">
          <H1 type="h1" textAlign="left">
            {seo_title}
          </H1>
          <H2
            margin="20px 0"
            type="h2"
            fontFamily="Archivo-Black"
            textAlign="left"
            fontSize="40px"
            fontSize_tablet="50px"
          >
            {header.title}
          </H2>
          <Paragraph
            color={Colors.black}
            textAlign="left"
            opacity="1"
            fontSize="24px"
            lineHeight="28px"
          >
            {header.paragraph}
          </Paragraph>
          <Button
            outline
            colorHoverText={button.hover_color || ""}
            background={Colors[button.background] || button.background}
            lineHeight="26px"
            textColor={Colors.black}
            textTransform="none"
            color={Colors[button.color] || button.color}
            fontSize="15px"
            textAlign="left"
            margin="2rem 0"
            padding_xxs="0 .5rem"
            padding_xs="0 .85rem"
            //padding_tablet="32px .85rem 0 .85rem"
            onClick={() => {
              if (button.path && button.path.indexOf("http") > -1)
                window.open(transferQuerystrings(button.path, utm));
              else navigate(button.path);
            }}
          >
            {button.text}
          </Button>
        </Div>
        <Div>
          <Img
            backgroundSize="contain"
            src="/images/Group-6663.png"
            width="600px"
            height="400px"
          />
        </Div>
      </Div>
      {/* <Header
        margin={isCustomBarActive(session) ? "140px auto 0 auto" : "60px auto"}
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        textAlign="left"
        padding_tablet="72px 0 40px 0"
        padding="0px 20px"
        position="relative"
        fontSize_title="40px"
        fontSizeTitle_tablet="60px"
        fontFamily_title="Archivo-Black"
        fontSize_paragraph="15px"
        gridTemplateColumns_tablet="repeat(14, 1fr)"
        maxWidth="1280px"
        hideArrowKey
        id="financials"
        svg_image={
          <Img
            src="/images/Group-6663.png"
            width="600px"
            height="400px"
          />
        }
      /> */}

      <Iconogram yml={yml.iconogram} />
      <PricesAndPayment
        type={pageContext.slug}
        lang={pageContext.lang}
        locations={data.allLocationYaml.edges}
        programs={data.allCourseYaml.edges}
        defaultCourse={defaultCourse}
        title={yml.prices.heading}
        paragraph={yml.prices.sub_heading}
        chooseProgram // Allow choosing the program (used in financial.js)
        financial
      />

      <TwoColumn
        right={{ image: ymlTwoColumn[0].image }}
        left={{
          heading: ymlTwoColumn[0].heading,
          sub_heading: ymlTwoColumn[0].sub_heading,
          bullets: ymlTwoColumn[0].bullets,
          content: ymlTwoColumn[0].content,
          button: ymlTwoColumn[0].button,
          boxes: ymlTwoColumn[0].boxes,
          //padding_tablet: "20px",
          gap_tablet: "40px",
        }}
        proportions={ymlTwoColumn.proportions}
        session={session}
      />

      <Badges
        link
        id="partners"
        lang={pageContext.lang}
        //background={Colors.verylightGray2}
        badges={yml.partners}
        paragraph={yml.partners.paragraph}
        //short_text
        height_badge="80px"
        padding="60px 0"
        padding_tablet="68px 0"
        margin_tablet="0 0 78px 0"
        maxWidth="1280px"
        //wrapped_images
        style={{
          height: "100px",
          minWidth: "150px",
          width: "min-content",
          //margin: "0 20px",
        }}
      />

      <TwoColumn
        left={{ image: ymlTwoColumn[1].image }}
        right={{
          heading: ymlTwoColumn[1].heading,
          sub_heading: ymlTwoColumn[1].sub_heading,
          bullets: ymlTwoColumn[1].bullets,
          content: ymlTwoColumn[1].content,
          button: ymlTwoColumn[1].button,
          //padding_tablet: "20px",
          gap_tablet: "40px",
        }}
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
          //padding_tablet: "20px",
          gap_tablet: "40px",
        }}
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
          partners {
            paragraph
            link_to
            link_text
            badges {
              name
              url
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 1500
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              alt
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
          iconogram {
            swipable
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
          two_column {
            image {
              style
              src
            }
            heading {
              style
              text
              font_size
            }
            sub_heading {
              text
              font_size
            }
            bullets {
              item_style
              items {
                heading
                text
                icon
              }
            }
            content {
              font_size
              text
            }
            button {
              text
              color
              background
              hover_color
              path
            }
            boxes {
              icon
              title
              text
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
    allCourseYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          meta_info {
            slug
            title
            bc_slug
            visibility
            show_in_apply
          }
          apply_form {
            label
          }
        }
      }
    }
  }
`;
export default BaseRender(Financial);
