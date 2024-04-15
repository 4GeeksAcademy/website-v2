import React, { useEffect, useState, useRef } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import { isCustomBarActive } from "../actions";
import BaseRender from "./_baseLayout";
import {
  Div,
  HR,
  GridContainer,
  GridContainerWithImage,
} from "../components/Sections";
import { H1, H2, Paragraph } from "../components/Heading";
import { Button, Colors, StyledBackgroundSection } from "../components/Styling";
import { beHiringPartner } from "../actions";
import { SessionContext } from "../session";
import LeadForm from "../components/LeadForm";
import { Circle } from "../components/BackgroundDrawing";
import Testimonials from "../components/Testimonials";
import OurPartners from "../components/OurPartners";
import ScholarshipProjects from "../components/ScholarshipProjects";
import ScholarshipSuccessCases from "../components/ScholarshipSuccessCases";
import BenefitsAndCharts from "../components/BenefitsAndCharts";
import TwoColumn from "../components/TwoColumn/index.js";
import ForEveryoneBoxes from "../components/ForEveryoneboxes/index.js";

const TwentyMillion = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const partnersData = data.allPartnerYaml.edges[0].node;

  const [applyButtonText, setApplyButtonText] = useState("");
  const joinPartnersRef = useRef(null);
  const goToForm = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: joinPartnersRef.current?.offsetTop - 200,
      behavior: "smooth",
    });
  };

  let city = session && session.location ? session.location.city : [];
  let currentLocation = data.allLocationYaml.edges.find(
    (loc) => loc.node?.city === city
  );

  useEffect(() => {
    if (currentLocation !== undefined) {
      setApplyButtonText(currentLocation.node.button.apply_button_text);
    }
  }, [currentLocation]);

  const ymlTwoColumn = yml?.two_column_left;

  const isCustomBarActive = true;
  // session &&
  // session.location &&
  // session.location.custom_bar &&
  // session.location.custom_bar.active;

  return (
    <>
      <Div
        margin={isCustomBarActive ? "0 auto 0 auto" : "72px auto 0 auto"}
        margin_md={isCustomBarActive ? "120px auto 0 auto" : "72px auto 0 auto"}
        margin_sm="0 auto 0 auto"
        padding="20px 20px 0 20px"
        padding_tablet="0 80px"
        position="relative"
        display="block"
      >
        <GridContainerWithImage
          padding="0"
          columns_tablet="2"
          margin="0 auto"
          position="relative"
          gridColumn_tablet="1/15"
          maxWidth="1280px"
          justifyContent="center"
        >
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            alignItems_tablet="left"
            margin="auto"
            padding_tablet="0"
          >
            <H1
              type="h1"
              textAlign="center"
              textAlign_tablet="left"
              fontSize="30px"
              fontSize_md="60px"
              lineHeight="30px"
              lineHeight_md="65.28px"
              fontWeight="400"
              margin_tablet="0"
              fontFamily="Archivo,Lato,sans-serif"
              color={Colors.black2}
            >
              {yml.header.title}
            </H1>
            <Paragraph
              textAlign="center"
              textAlign_tablet="left"
              textAlign_md="left"
              textAlign_xl="left"
              fontFamily="Lato,sans-serif"
              color={Colors.black3}
              opacity="1"
              margin="20px 0"
              padding="0"
              letterSpacing="0.05em"
              fontSize="15px"
              fontSize_md="24px"
              lineHeight="28.8px"
            >
              {yml.header.paragraph}
            </Paragraph>
            <Div
              flexDirection_tablet="row"
              flexDirection="column"
              justifyContent="left"
              alignItems="center"
              margin_tablet="0"
              width="100%"
            >
              <Div width="100%" width_tablet="fit-content">
                <Link
                  to={yml.button.apply_button_link}
                  style={{ width: "100%" }}
                >
                  <Button
                    variant="full"
                    justifyContent="center"
                    width="100%"
                    width_tablet="fit-content"
                    color={Colors.black}
                    margin_tablet="10px 24px 10px 0"
                    textColor="white"
                  >
                    {applyButtonText}
                  </Button>
                </Link>
              </Div>
              <Div width="100%" width_tablet="fit-content">
                <Link to="#fake_bottom" style={{ width: "100%" }}>
                  <Button
                    padding="12px"
                    padding_tablet="12px"
                    display="block"
                    width="100%"
                    width_tablet="fit-content"
                    variant="outline"
                    color={Colors.black}
                    margin="10px 0 10px 0"
                    margin_tablet="0"
                    textColor={Colors.black}
                  >
                    {yml.button.btn_label}
                  </Button>
                </Link>
              </Div>
            </Div>
          </Div>
          <Div
            display="flex"
            justifyContent="center"
            height="auto"
            width="100%"
            padding="0"
          >
            <StyledBackgroundSection
              display_tablet="block"
              height="180px"
              height_tablet="382px"
              width="100%"
              image={
                yml.header.image &&
                yml.header.image.childImageSharp.gatsbyImageData
              }
              alt="Hero image"
              bgSize="contain"
            />
          </Div>
        </GridContainerWithImage>
      </Div>

      {/* accesible_education */}
      <Div background={Colors.black} padding="20px" padding_tablet="50px 80px">
        <GridContainer
          columns_tablet="12"
          columns_md="12"
          containerColumns_tablet="none"
          padding="30px 20px"
          padding_tablet="40px 0px"
          padding_md="60px 0px"
          padding_lg="80px 0"
          margin_tablet="0 auto 81px auto"
          childMaxWidth="1280px"
          maxWidth="1280px"
          containerGridGap="0px"
          childMargin="auto"
        >
          <Div
            ref={joinPartnersRef}
            gridColumn_tablet="1 / 5"
            flexDirection="column"
          >
            <H2
              textAlign_tablet="start"
              margin="0 0 30px 0"
              lineHeight="35px"
              color={Colors.white}
            >
              {yml.for_everyone.title}
            </H2>
            <Paragraph
              margin="7px 0"
              textAlign_tablet="start"
              color={Colors.white}
            >
              {yml.for_everyone.text}
            </Paragraph>
          </Div>
          <Div flexDirection="column" gridColumn_tablet="5 / 13" id="bottom">
            <ForEveryoneBoxes for_everyone_boxes={yml.for_everyone.boxes} />
          </Div>
        </GridContainer>
      </Div>

      <ScholarshipProjects
        content={data.allScholarshipProjectsYaml.edges[0].node}
        lang={pageContext.lang}
      />

      <Testimonials
        lang={data.allTestimonialsYaml.edges}
        margin_tablet="75px 0 0 0"
        margin="45px 0 0 0"
      />

      <BenefitsAndCharts data={partnersData} goToForm={goToForm} />

      <Div
        id="two_column_left"
        flexDirection="column"
        margin="0 auto"
        maxWidth="1280px"
      >
        <TwoColumn
          left={{ image: ymlTwoColumn.image }}
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
        />
      </Div>

      <ScholarshipSuccessCases
        content={data.allScholarshipSuccessCasesYaml.edges[0].node}
      />

      <HR
        background={Colors.verylightGray}
        width="100%"
        height="5px"
        margin="40px 0"
        id="fake_bottom"
      />

      <GridContainer
        columns_tablet="12"
        containerColumns_tablet="none"
        padding="30px 20px"
        padding_tablet="40px 40px"
        padding_md="60px 80px"
        padding_lg="80px 0"
        margin_tablet="0 auto 81px auto"
        style={{ maxWidth: "1280px" }}
        containerGridGap="0px"
      >
        <Div
          ref={joinPartnersRef}
          gridColumn_tablet="1 / 7"
          flexDirection="column"
        >
          <H2 textAlign_tablet="start" margin="0 0 30px 0" lineHeight="35px">
            {yml.form.title}
          </H2>
          {yml.form.paragraph.split("\n").map((m, i) => (
            <Paragraph
              key={i}
              margin="7px 0"
              textAlign_tablet="start"
              dangerouslySetInnerHTML={{ __html: m }}
            />
          ))}
        </Div>
        <Div flexDirection="column" gridColumn_tablet="7 / 13" id="bottom">
          <LeadForm
            formHandler={beHiringPartner}
            // handleClose={handleClose}
            enableAreaCodes={false}
            lang={pageContext.lang}
            inputBgColor={Colors.white}
            fields={["full_name", "email", "phone"]}
          />
        </Div>
      </GridContainer>
    </>
  );
};

export const query = graphql`
  query TwentyMillionQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          header {
            title
            paragraph
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
          button {
            btn_label
            apply_button_link
          }
          for_everyone {
            title
            text
            boxes {
              title
              color
            }
          }
          two_column_left {
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
          form {
            title
            paragraph
          }
        }
      }
    }
    allScholarshipProjectsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          title
          description
          project_name
          project_details
          total_cost
          geeks_benefited
          institutions
          press
          see_project
          projects {
            name
            image {
              alt
              src {
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
            description
            details {
              cost
              geeks_benefited
            }
            institutions {
              name
              logo {
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
            press {
              name
              link
            }
            pdf
          }
          fields {
            lang
          }
        }
      }
    }
    allScholarshipSuccessCasesYaml(
      filter: { fields: { lang: { eq: $lang } } }
    ) {
      edges {
        node {
          title
          contributor
          cases {
            name
            img {
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
            status
            country {
              iso
              name
            }
            contributor
            description
            achievement
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
                  width: 200
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
          benefits_and_charts {
            title
            description
            bullets
            button_section {
              button_text
              button_link
            }
            charts {
              title
              list {
                description
                icon
              }
            }
          }
        }
      }
    }
    allLocationYaml(
      filter: {
        fields: { lang: { eq: $lang } }
        meta_info: { visibility: { nin: ["hidden", "unlisted"] } }
      }
    ) {
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
          button {
            apply_button_text
          }
          meta_info {
            slug
            description
            image
            position
            visibility
            keywords
            redirects
          }
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
        }
      }
    }
  }
`;

export default BaseRender(TwentyMillion);
