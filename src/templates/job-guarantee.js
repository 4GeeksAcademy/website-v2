import React, { useEffect, useState, useRef, useContext } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import {
  isCustomBarActive,
  requestSyllabus,
  beHiringPartner,
} from "../actions";
import BaseRender from "./_baseLayout";
import {
  Div,
  HR,
  GridContainer,
  GridContainerWithImage,
} from "../components/Sections";
import { H1, H2, H3, H4, Paragraph } from "../components/Heading";
import {
  Anchor,
  Button,
  Colors,
  Img,
  ImgV2,
  StyledBackgroundSection,
} from "../components/Styling";
import { SessionContext } from "../session";
import Modal from "../components/Modal";
import LeadForm from "../components/LeadForm";
import { Circle } from "../components/BackgroundDrawing";
import Icon from "../components/Icon";
import ScholarshipSuccessCases from "../components/ScholarshipSuccessCases";
import TwoColumn from "../components/TwoColumn/index.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WeTrust from "../components/WeTrust/index.js";
import HowItWorks from "../components/HowItWorks/index.js";

const JobGuarantee = ({ data, pageContext, yml }) => {
  const { session } = useContext(SessionContext);
  const [applyButtonText, setApplyButtonText] = useState("");

  const sliderRef = useRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const programs = data.allCourseYaml.edges
    .filter(
      ({ node }) =>
        !["unlisted", "hidden"].includes(node.meta_info.visibility) &&
        node.meta_info.show_in_apply
    )
    .map(({ node }) => ({
      label: node.apply_form.label,
      value: node.meta_info.bc_slug,
    }));

  const ymlTwoColumn = yml?.two_column_right;

  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const testimonials =
    data.allTestimonialsYaml.edges[0].node.testimonials.filter((elem) =>
      yml.successful_stories.testimonials.includes(elem.slug)
    );

  const colors = {
    title: Colors.black2, //#2E2E38
    body: Colors.black3, //#4D4D5C
    body2: Colors.darkGray, //3A3A3A
  };

  // const paragraphParts = yml.header.paragraph.split("||");

  return (
    <>
      <Div
        margin={isCustomBarActive(session) ? "50px auto 0 auto" : "auto"}
        padding="0 30px"
        padding_tablet="48px 80px"
        padding_lg="48px 80px"
        position="relative"
        display="block"
      >
        <GridContainerWithImage
          padding="30px 0 0 0"
          padding_tablet="0"
          columns_tablet="2"
          margin_tablet="30px auto 20px auto"
          position="relative"
          gridColumn_tablet="1/15"
          maxWidth="1366px"
        >
          {/* <Div
              position="absolute"
              zIndex="5"
              left_tablet={"50%"}
              left="50%"
              left_xxs="65%"
              left_xs="74%"
              top_tablet={"25%"}
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
            </Div> */}
          <Div
            flexDirection="column"
            alignItems="start"
            alignItems_tablet="center"
            alignItems_sm="center"
            margin="auto"
            padding_tablet="0"
          >
            <H1
              type="h1"
              textAlign="center"
              textAlign_tablet="left"
              textShadow="none"
              fontSize="50px"
              lineHeight="54.4px"
              color={colors.title}
              fontFamily="Archivo,Lato,sans-serif"
              fontWeight="900"
            >
              {yml.header.title}
            </H1>
            <Div display="block" margin="20px 0">
              <Paragraph
                textAlign="center"
                textAlign_tablet="left"
                padding="0"
                color={colors.body}
                fontSize="24px"
                lineHeight="26.11px"
                fontFamily="Archivo,Lato,sans-serif"
                dangerouslySetInnerHTML={{ __html: yml.header.paragraph }}
              />
            </Div>

            <Div
              flexDirection_tablet="row"
              flexDirection="column"
              justifyContent_tablet="left"
              justifyContent="left"
              alignItems="center"
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
              <Button
                onClick={handleOpen}
                display="block"
                width="100%"
                width_tablet="fit-content"
                variant="outline"
                background="#FFF"
                color={Colors.black}
                margin="10px 0 0 0"
                margin_tablet="0"
                textColor={Colors.black}
                textAlign="center"
              >
                {yml.button.btn_label}
              </Button>
            </Div>
          </Div>
          <Div
            display="flex"
            justifyContent="center"
            height="auto"
            width="100%"
          >
            <StyledBackgroundSection
              height_tablet="533px"
              display_tablet="block"
              // display="none"
              height="390px"
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

      <WeTrust we_trust={yml.we_trust_section} />

      <TwoColumn
        left={{ image: ymlTwoColumn.image }}
        right={{
          heading: ymlTwoColumn.heading,
          sub_heading: ymlTwoColumn.sub_heading,
          bullets: ymlTwoColumn.bullets,
          content: ymlTwoColumn.content,
          button: ymlTwoColumn.button,
        }}
        proportions={ymlTwoColumn.proportions}
        session={session}
      />

      <HowItWorks how_it_works={yml.how_it_works} />

      <Div
        background={Colors.white}
        padding="30px"
        padding_tablet="80px 80px"
        padding_lg="80px 0px"
        margin_lg="auto"
        gap="10px"
        display="block"
        display_tablet="flex"
        justifyContent="between"
        maxWidth="1366px"
        width="100%"
      >
        <Div
          height_md="299px"
          flexDirection="column"
          justifyContent_md="between"
          width_tablet="200px"
          width_md="395px"
          width_lg="388px"
          gap="10px"
          margin="0 0 15px 0"
          margin_tablet="0"
        >
          <Div display="block">
            <H3
              textAlign="left"
              margin="0 0 10px 0"
              fontFamily="Archivo, Lato, sans-serif"
              fontSize="35px"
              fontWeight="400"
            >
              {yml.successful_stories.title}
            </H3>
            <Paragraph
              color="#000"
              opacity="1"
              textAlign="left"
              fontSize="24px"
              fontWeight="500"
              lineHeight="28.8px"
            >
              {yml.successful_stories.text}
            </Paragraph>
          </Div>
          <Icon icon="longarrow-right" />
        </Div>
        <Div
          display="block"
          width="100%"
          width_tablet="400px"
          width_md="72%"
          minWidth_md="330px"
          maxWidth_md="632px"
          maxWidth_lg="632px"
          height_tablet="555px"
          height_md="375px"
          border="2px solid black"
          borderRadius="4px"
          boxShadow="-6px 6px 0px 0px rgba(0,0,0,1)"
        >
          <Slider {...settings} ref={sliderRef}>
            {testimonials.map((testimonial) => {
              return (
                <Div display="block" height="360px">
                  <Div
                    background={Colors.white}
                    margin="0"
                    padding="0"
                    display="block"
                    display_md="flex"
                    height_tablet="548px"
                    height_md="368px"
                  >
                    <StyledBackgroundSection
                      image={
                        testimonial.student_thumb.childImageSharp
                          .gatsbyImageData
                      }
                      alt={testimonial.student_name}
                      width="300px"
                      width_tablet="100%"
                      width_md="200px"
                      height="340px"
                      height_tablet="240px"
                      height_md="372px"
                      backgroundSize="contain"
                      flexShrink="0"
                    />
                    <Div padding="10px" display="block">
                      <H4
                        textAlign="left"
                        fontWeight="700"
                        fontFamily="Archivo, Lato, sans-serif"
                        fontSize="24px"
                        lineHeight="26.11px"
                      >
                        {testimonial.student_name}
                      </H4>
                      <Div gap="10px" alignItems="center" margin="0 0 10px 0">
                        {testimonial.country && (
                          <Div>
                            <Div
                              className="react-tel-input"
                              margin="0"
                              width="25px"
                            >
                              <div
                                className={`flag ${testimonial.country.iso}`}
                              />
                            </Div>
                            <Paragraph
                              margin="0 0 0 5px"
                              textAlign="left"
                              opacity="1"
                              color={Colors.black}
                              fontFamily="Inter, Lato, sans-serif"
                              fontSize="12px"
                              lineHeight="20.52px"
                            >
                              {testimonial.country.name}
                            </Paragraph>
                          </Div>
                        )}
                        {testimonial.linkedin_url && (
                          <Img
                            src="/images/linkedin.png"
                            onClick={() => {
                              if (testimonial.linkedin_url.indexOf("http") > -1)
                                window.open(testimonial.linkedin_url);
                              else navigate(testimonial.linkedin_url);
                            }}
                            style={{
                              cursor: "pointer",
                            }}
                            alt="Linkedin profile"
                            height="14px"
                            width="60px"
                            backgroundSize="contain"
                          />
                        )}
                      </Div>
                      <HR
                        background="#A4A4A4"
                        width="100%"
                        height="1px"
                        margin="5px 0"
                      />
                      <Paragraph
                        textAlign="left"
                        opacity="1"
                        color={Colors.black}
                        fontSize="16px"
                        lineHeight="24px"
                      >
                        {testimonial.content}
                      </Paragraph>
                    </Div>
                  </Div>
                </Div>
              );
            })}
          </Slider>
        </Div>
      </Div>

      <ScholarshipSuccessCases
        content={data.allScholarshipSuccessCasesYaml.edges[0].node}
      />

      <HR
        background={Colors.verylightGray}
        width="100%"
        height="5px"
        margin="40px 0"
      />

      <Div
        margin={isCustomBarActive(session) ? "50px auto 0 auto" : "auto"}
        padding="0 30px"
        padding_tablet="48px 80px"
        padding_lg="48px 80px"
        position="relative"
        display="block"
      >
        <GridContainerWithImage
          columns_tablet="12"
          childMargin="auto"
          childMaxWidth="1366px"
          padding="30px 0 0 0"
          padding_tablet="0"
          margin_tablet="30px auto 20px auto"
          position="relative"
          gridColumn_tablet="1/15"
          maxWidth="1366px"
        >
          <Div
            gridColumn_tablet="1 / 6"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="auto"
            width="100%"
          >
            <StyledBackgroundSection
              height_tablet="463.71px"
              display_tablet="block"
              // display="none"
              height="390px"
              width="100%"
              maxWidth="551px"
              image={
                yml.form.image && yml.form.image.childImageSharp.gatsbyImageData
              }
              alt="Form image"
              bgSize="contain"
            />
          </Div>
          <Div flexDirection="column" gridColumn_tablet="6 / 13">
            <H2
              textAlign="center"
              textAlign_md="left"
              fontFamily="Archivo, Lato, sans-serif"
              fontSize="30px"
              margin="0 0 30px 0"
            >
              {yml.form.title}
            </H2>
            <LeadForm
              formHandler={beHiringPartner}
              // handleClose={handleClose}
              enableAreaCodes={false}
              lang={pageContext.lang}
              inputBgColor={Colors.white}
              fields={["full_name", "email", "phone"]}
              selectProgram={programs}
              padding="0"
              sendLabel="Apply"
              widthButton="auto"
              buttonWidth_tablet="auto"
            />
          </Div>
        </GridContainerWithImage>
      </Div>
    </>
  );
};

export const query = graphql`
  query JobGuaranteeQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            utm_course
          }
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
            syllabus_heading
            syllabus_motivation
          }
          two_column_right {
            proportions
            image {
              style
              src
            }
            heading {
              text
              font_size
              style
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
          how_it_works {
            title
            text1
            steps {
              icon
              title
              highlight
            }
            link {
              url
              label
            }
            text2
          }
          successful_stories {
            title
            text
            testimonials
          }
          form {
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
            title
            paragraph
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
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          heading
          button_text
          button_link
          testimonials {
            student_name
            slug
            country {
              iso
              name
            }
            featured
            highlighted
            testimonial_date
            rating
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
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            student_video
            short_content
            content
            source_url
            source_url_text
          }
        }
      }
    }
  }
`;

export default BaseRender(JobGuarantee);
