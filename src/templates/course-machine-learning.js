import React, { useState, useEffect, useContext, useRef } from "react";
import { isCustomBarActive } from "../actions";
import Link from "gatsby-link";
import { navigate } from "gatsby";
import {
  Container,
  GridContainer,
  Row,
  Column,
  Wrapper,
  WrapperImage,
  Divider,
  Header,
  Div,
} from "../components/Sections";
import { H1, H2, Title, Paragraph, H5 } from "../components/Heading";
import { Button, Colors } from "../components/Styling";
import ProgramDetails from "../components/ProgramDetails";
import ProgramDetailsMobile from "../components/ProgramDetailsMobile";
import TechsWeTeach from "../components/TechsWeTeach";
import GeeksInfo from "../components/GeeksInfo";
import OurPartners from "../components/OurPartners";
import BaseRender from "./_baseLayout";
import Icon from "../components/Icon";
import { requestSyllabus } from "../actions";
import { SessionContext } from "../session";
import Testimonials from "../components/Testimonials";
import Badges from "../components/Badges";
import PricesAndPayment from "../components/PricesAndPayment";
import { Circle } from "../components/BackgroundDrawing";
import LeadForm from "../components/LeadForm";
import Modal from "../components/Modal";
import Instructors from "../components/Instructors";

const Program = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const courseDetails = data.allCourseYaml.edges[0].node;
  const geek = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);

  const course_type = "machine_learning";
  const program_type = yml.meta_info.slug.includes("full-time")
    ? "full_time"
    : "part_time";
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const hiring = data.allPartnerYaml.edges[0].node;

  const [applyButtonText, setApplyButtonText] = useState("");
  let city = session && session.location ? session.location.city : [];
  let currentLocation = data.allLocationYaml.edges.find(
    (loc) => loc.node?.city === city
  );

  useEffect(() => {
    if (currentLocation !== undefined) {
      setApplyButtonText(currentLocation.node.button.apply_button_text);
    }
  }, [currentLocation]);

  const syllabus_button_text = yml.button.syllabus_heading;

  const partners = data.allPartnerYaml.edges[0].node.partners.images
    .filter(
      (i) => !Array.isArray(i.courses) || i.courses.includes("machine-learning")
    )
    .sort((a, b) =>
      Array.isArray(a.courses) && a.courses.includes("machine-learning")
        ? -1
        : 1
    );
  return (
    <>
      <Header
        margin={isCustomBarActive(session) ? "120px 0 0 0" : ""}
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        padding_tablet="72px 0 40px 0"
        position="relative"
      >
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="0"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
          opacity="0.2"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="0"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="32px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="32px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="67px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="102px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="137px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="172px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="17px"
          height="17px"
          top="216px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="271px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="red"
          width="27px"
          height="27px"
          top="222px"
          left="278px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="250px"
          height="250px"
          bottom="20px"
          right="-68px"
          opacity="0.2"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="120px"
          right="50px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="120px"
          right="89px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="120px"
          right="128px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="119px"
          height="11px"
          border="10px"
          bottom="115px"
          right="40px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="77px"
          height="11px"
          border="10px"
          bottom="115px"
          right="175px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="116px"
          height="116px"
          bottom="50px"
          left="-58px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="116px"
          height="116px"
          bottom="200px"
          left="-90px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="yellow"
          width="21px"
          height="21px"
          top="10px"
          right="320px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="57px"
          height="57px"
          top="32px"
          right="61px"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="160px"
          height="160px"
          top="0"
          right="-120px"
          opacity="0.2"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="red"
          width="25px"
          height="25px"
          top="60px"
          right="30px"
          display="inline"
          display_tablet="none"
        />
        <Div
          flexDirection_tablet="row"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          margin_tablet="0 0 50px 0"
        >
          <Link
            to={yml.button.apply_button_link}
            state={{ course: yml.meta_info.bc_slug }}
          >
            <Button
              variant="full"
              justifyContent="center"
              width="200px"
              width_tablet="fit-content"
              color={Colors.blue}
              margin_tablet="10px 24px 10px 0"
              textColor="white"
            >
              {applyButtonText}
            </Button>
          </Link>
          <Button
            onClick={handleOpen}
            width="200px"
            width_tablet="fit-content"
            variant="outline"
            icon={
              <Icon
                icon="download"
                stroke={Colors.black}
                style={{ marginRight: "10px" }}
                width="46px"
                height="46px"
              />
            }
            color={Colors.black}
            margin="10px 0 50px 0"
            margin_tablet="0"
            textColor={Colors.black}
          >
            {syllabus_button_text}
          </Button>
          {/* <Button onClick={handleOpen} variant="outline" width="200px" color={Colors.black} margin="10px 0 58px 0" textColor={Colors.black}>{syllabus_button_text}</Button> */}
          {/* <Button variant="outline" icon={<Icon icon="download" stroke={Colors.black} style={{marginRight: "10px"}} width="46px" height="46px" />} color={Colors.black} margin="10px 0 50px 0" margin_tablet="0" textColor={Colors.black}>{syllabus_button_text}</Button> */}
        </Div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <LeadForm
            style={{ marginTop: "50px" }}
            heading={yml.button.syllabus_heading}
            motivation={yml.button.syllabus_motivation}
            sendLabel={syllabus_button_text}
            formHandler={requestSyllabus}
            handleClose={handleClose}
            lang={pageContext.lang}
            redirect={
              pageContext.lang === "us" ? "/us/thank-you" : "/es/gracias"
            }
            data={{
              course: {
                type: "hidden",
                value: yml.meta_info.bc_slug,
                valid: true,
              },
            }}
          />
        </Modal>
        <Badges
          lang={pageContext.lang}
          short_link={true}
          paragraph={yml.badges.paragraph && yml.badges.paragraph}
        />
      </Header>
      <OurPartners
        background={Colors.verylightGray}
        images={hiring.partners.images}
        marquee
      ></OurPartners>
      <ProgramDetails
        details={courseDetails.details}
        lang={pageContext.lang}
        course={program_type}
        background={Colors.white}
      />
      <ProgramDetailsMobile
        details={courseDetails.details}
        lang={pageContext.lang}
        course={program_type}
      />
      <Instructors lang={{...courseDetails.course_instructors, lang: pageContext.lang}} />
      {/* <TechsWeTeach
        lang={pageContext.lang}
        data={data.allMachineLearningTechsYaml}
      /> */}
      <GeeksInfo lang={pageContext.lang} />
      <GridContainer padding_tablet="0" margin_tablet="0 0 62px 0">
        <Div height="1px" background="#EBEBEB"></Div>
      </GridContainer>
      <PricesAndPayment
        type={pageContext.slug}
        lang={pageContext.lang}
        session={session}
        locations={data.allLocationYaml.edges}
        programType={program_type}
        courseType={course_type}
        title={yml.prices.heading}
        paragraph={yml.prices.sub_heading}
      />
      <Testimonials lang={data.allTestimonialsYaml.edges} />
      <OurPartners images={hiring.partners.images} marquee></OurPartners>
    </>
  );
};

export const query = graphql`
  query CourseMachineLearningQuery($file_name: String!, $lang: String!) {
    allMachineLearningTechsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          title
          sub_title
          image {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                width: 390
                height: 289
                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
              )
              # fluid(maxHeight: 289, maxWidth: 390){
              #   ...GatsbyImageSharpFluid_withWebp
              # }
            }
          }
          tech_list {
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 100
                  height: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxHeight: 100, maxWidth: 100){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
            alt
          }
          fields {
            lang
          }
        }
      }
    }
    allCourseYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          course_instructors {
            header {
              title
              paragraph
            }
            instructors {
              name
              bio
              job
              degree
              github
              linkedin
              sub_title
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    width: 500
                    placeholder: NONE
                    quality: 100
                    breakpoints: [200, 340, 420, 490]
                  )
                }
              }
            }
          }
          header {
            title
            paragraph
            image_alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                  breakpoints: [200, 340, 520, 890]
                )

                # fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
          }
          button {
            syllabus_heading
            syllabus_motivation
            apply_button_link
          }
          meta_info {
            title
            description
            image
            keywords
            slug
            bc_slug
          }
          geek_data {
            heading
            geek_force
            geek_pal
          }
          badges {
            paragraph
          }
          credentials {
            heading
            paragraph
          }
          details {
            about {
              title
              sub_title
              list {
                label
                content
              }
            }
            heading
            sub_heading
            facts {
              value
              label
            }
            left_labels {
              description
              projects
              duration
              skills
            }
            details_modules {
              title
              projects
              slug
              module_name
              duration
              description
              step
            }
          }
          syllabus {
            heading
            button_label
          }
          teacher {
            picture {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )

                # fluid(maxWidth: 500){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
            greeting
            linkedin
            full_name
            bio
          }
          potential_companies {
            tagline
            sub_heading
            companies {
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
            }
          }
          geeks_vs_others {
            heading
            sub_heading
            sub_heading_link
          }
          prices {
            heading
            sub_heading
          }
          typical {
            heading
            sub_heading
            schedule {
              title
              time
              icon
              content
            }
          }
          alumni {
            heading
            sub_heading
          }
          sidebar {
            membership
            program
            geeks_vs_other
            pricing
            alumni
          }
          faq {
            title
            link
            read_more
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

                  # fluid(maxWidth: 150){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
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
          hasFinancialsOption
          financials_max_months
          active_campaign_location_slug
          breathecode_location_slug
          fields {
            lang
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

          prices {
            machine_learning {
              part_time {
                slug
                duration
                left_section {
                  header {
                    heading_one
                    sub_heading
                    heading_two
                  }
                  content {
                    price
                    price_info
                  }
                  button {
                    button_text
                  }
                }
                center_section {
                  header {
                    heading_two
                    sub_heading
                    heading_one
                  }
                  plans {
                    months
                    monthsInfo
                    payment
                    paymentInfo
                    provider
                    logo
                    message
                  }
                  button {
                    button_text
                  }
                }
                right_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                  }
                  header {
                    heading_one
                    sub_heading
                    heading_two
                  }
                }
              }
              full_time {
                slug
                left_section {
                  header {
                    heading_one
                    sub_heading
                    heading_two
                  }
                  content {
                    price
                    price_info
                  }
                  button {
                    button_text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export default BaseRender(Program);
