import React, { useContext, useMemo } from "react";
import { graphql, navigate } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Button, Colors, Img } from "../components/Styling";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session";
import { isCustomBarActive } from "../actions";

// components
import { Div } from "../components/Sections";
import { H1, H2, Paragraph } from "../components/Heading";
import WeTrust from "../components/WeTrust";
import CarouselV2 from "../components/CarouselV2";
import PricesAndPayment from "../components/PricesAndPayment";
import Iconogram from "../components/Iconogram";
import TwoColumn from "../components/TwoColumn";

const Financial = (props) => {
  const { session } = useContext(SessionContext);
  const { data, pageContext, yml } = props;
  const { seo_title, header } = yml;

  const allPlans = useMemo(() => {
    return data.allPlansYaml.edges
      .flatMap(({ node }) => [...node.part_time, ...node.full_time])
      .filter((plan) =>
        plan.academies.includes(session?.location?.breathecode_location_slug)
      );
  }, [session]);
  const academyHasJobGuarantee = allPlans.some(
    ({ job_guarantee_price }) => job_guarantee_price
  );

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
      <Div
        maxWidth="1280px"
        margin_tablet={
          isCustomBarActive(session) ? "140px auto 0 auto" : "60px auto"
        }
        gap="25px"
        alignItems_tablet="center"
        flexDirection="column"
        flexDirection_tablet="row"
        padding_lg="0"
        padding="0 20px"
      >
        <Div display="block">
          <H1 type="h1" textAlign="left">
            {seo_title}
          </H1>
          <H2
            margin="20px 0"
            type="h2"
            fontFamily="Archivo-Black"
            color={Colors.black}
            textAlign="left"
            fontSize="40px"
            fontSize_tablet="50px"
            lineHeight="54px"
          >
            {header.title}
          </H2>
          <Paragraph color={Colors.black} textAlign="left" fontSize="21px">
            {header.paragraph}
          </Paragraph>
          <Button
            background={Colors.blue}
            lineHeight="26px"
            textTransform="none"
            color="white"
            margin="30px 0 0 0"
            fontSize="15px"
            padding_xxs="0 .5rem"
            padding_xs="0 .85rem"
            onClick={() => {
              navigate("#prices_and_payment");
            }}
          >
            {header.button}
          </Button>
        </Div>
        <Div>
          <GatsbyImage
            image={getImage(
              header.image && header.image.childImageSharp.gatsbyImageData
            )}
            style={{
              height: "100%",
              backgroundSize: `cover`,
            }}
            alt={header.alt}
          />
        </Div>
      </Div>

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
          gap_tablet: "40px",
        }}
        proportions={ymlTwoColumn.proportions}
        session={session}
      />

      <CarouselV2
        margin="20px 0"
        background="#FBFCFC"
        padding="20px"
        heading={yml.who_is_hiring.title}
        content={yml.who_is_hiring.paragraph}
      >
        {yml.who_is_hiring.images.map((image) => (
          <Div key={image}>
            <Div
              border="1px solid #C4C4C4"
              width="240px !important"
              height="240px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              margin="auto"
            >
              <Img
                backgroundSize="contain"
                src={image}
                width="112px"
                height="112px"
                margin="auto"
              />
            </Div>
          </Div>
        ))}
      </CarouselV2>
      
        <TwoColumn
          left={{ image: ymlTwoColumn[1].image }}
          right={{
            heading: ymlTwoColumn[1].heading,
            sub_heading: ymlTwoColumn[1].sub_heading,
            bullets: ymlTwoColumn[1].bullets,
            content: ymlTwoColumn[1].content,
            button: ymlTwoColumn[1].button,
            gap_tablet: "40px",
          }}
          session={session}
        />

        <WeTrust
          we_trust={yml.we_trust_section}
          background="none"
          titleProps={{ textAlign: "center" }}
          paragraphProps={{ textAlign: "center" }}
        />


      {academyHasJobGuarantee && (
        <TwoColumn
          right={{ image: ymlTwoColumn[2].image }}
          left={{
            heading: ymlTwoColumn[2].heading,
            sub_heading: ymlTwoColumn[2].sub_heading,
            bullets: ymlTwoColumn[2].bullets,
            content: ymlTwoColumn[2].content,
            button: ymlTwoColumn[2].button,
            gap_tablet: "40px",
          }}
          session={session}
        />
      )}
    </>
  );
};

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
            button
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
              style
            }
            sub_heading {
              text
              style
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
          who_is_hiring {
            title
            paragraph
            images
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
              style
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
        }
      }
    }
    allPlansYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          full_time {
            slug
            academies
            scholarship
            payment_time
            price
            job_guarantee_price
          }
          part_time {
            slug
            academies
            scholarship
            payment_time
            price
            original_price
            job_guarantee_price
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
