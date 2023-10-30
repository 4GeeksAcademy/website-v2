import React, { useEffect, useState } from "react";
import { Link, graphql } from "gatsby";
import BaseRender from "./_baseLayout";
import { Header, Div, GridContainer } from "../components/Sections";
import { Button, Colors, Img } from "../components/Styling";
import { requestSyllabus, isCustomBarActive } from "../actions";
import { SessionContext } from "../session";
import AboutTheProgram from "../components/AboutTheProgram";
import ProgramDetails from "../components/ProgramDetails";
import ProgramDetailsMobile from "../components/ProgramDetailsMobile";
import PricesAndPayment from "../components/PricesAndPayment";
import Modal from "../components/Modal";
import LeadForm from "../components/LeadForm";
import AlumniProjects from "../components/AlumniProjects";
import Badges from "../components/Badges";
import TechsWeTeach from "../components/TechsWeTeach";
import { Circle } from "../components/BackgroundDrawing";
import UpcomingDates from "../components/UpcomingDates";
import JobGuaranteeSmall from "../components/JobGuaranteeSmall";
import GeeksInfo from "../components/GeeksInfo";
import Testimonials from "../components/Testimonials";
import OurPartners from "../components/OurPartners";
import RelatedPosts from "../components/RelatedPosts";
import Icon from "../components/Icon";
import Overlaped from "../components/Overlaped";

const Program = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const courseDetails = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;

  const course_type = "full_stack";
  const program_type = yml.meta_info.slug.includes("full-time")
    ? "full_time"
    : "part_time";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const apply_button_text = yml.apply_button_text;

  return (
    <>
      <Header
        margin={isCustomBarActive(session) ? "120px 0 0 0" : ""}
        paragraphMargin="26px 0"
        paragraphMargin_Tablet="26px 22%"
        paddingParagraph_tablet="0 40px"
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        padding_tablet="72px 0 40px 0"
        position="relative"
        fontSize_title="60px"
        fontSizeTitle_tablet="60px"
        fontFamily_title="Archivo-Black"
        fontSize_paragraph="24px"
      >
        <Img
              src="/images/landing/group-2.png"
              width="49px"
              height="286px"
              style={{
                position: "absolute",
                right: "0%",
                bottom: "0%",
                zIndex: "1",
              }}
            /> 
        <Div
          flexDirection_tablet="row"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
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
              {apply_button_text}
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
          short_text="12px"
          margin="0 0 40px 0"
          paragraph={yml.badges.paragraph}
        />
      </Header>
      <JobGuaranteeSmall
        content={data.allJobGuaranteeSmallYaml.edges[0].node}
      />
      <ProgramDetails
        details={courseDetails.details}
        lang={pageContext.lang}
        course={program_type}
      />
      <ProgramDetailsMobile
        details={courseDetails.details}
        lang={pageContext.lang}
        course={program_type}
      />
      {/* <TechsWeTeach lang={pageContext.lang} data={data.allFullStackTechsYaml} /> */}
      <Overlaped
        heading={yml.overlaped.heading}
        content={yml.overlaped.paragraph}
        button={yml.overlaped.button}
        image={yml.overlaped.image.src}
      />
      <GeeksInfo lang={pageContext.lang} />
      <TwoColumn
        left={{ image: yml.two_column.image, video: yml.two_column.video }}
        right={{
          heading: yml.two_column.heading,
          sub_heading: yml.two_column.sub_heading,
          bullets: yml.two_column.bullets,
          content: yml.two_column.content,
          button: yml.two_column.button,
        }}
        proportions={yml.proportions}
        session={session}
      />
      <GridContainer
        padding_tablet="0"
        margin_tablet="90px 0 62px 0"
        margin="57px 0"
      >
        <Div height="5px" background="#EBEBEB"></Div>
      </GridContainer>
      <UpcomingDates
        lang={pageContext.lang}
        message={courseDetails.upcoming.no_dates_message}
        actionMessage={courseDetails.upcoming.actionMessage}
        locations={data.allLocationYaml.edges}
      />
      <GridContainer padding_tablet="0" margin_tablet="0 0 62px 0">
        <Div height="1px" background="#EBEBEB"></Div>
      </GridContainer>
      <PricesAndPayment
        background={`linear-gradient(to bottom, ${Colors.white} 50%, ${Colors.lightYellow2} 50%)`}
        type={pageContext.slug}
        lang={pageContext.lang}
        locations={data.allLocationYaml.edges}
        programType={program_type}
        courseType={course_type}
        title={yml.prices.heading}
        paragraph={yml.prices.sub_heading}
      />
      <AlumniProjects
        title={yml.alumni.heading}
        paragraph={yml.alumni.sub_heading}
        lang={data.allAlumniProjectsYaml.edges}
        limit={2}
      />
      <Testimonials
        lang={data.allTestimonialsYaml.edges}
        margin_tablet="75px 0 0 0"
        margin="45px 0 0 0"
      />
      <OurPartners images={hiring.partners.images} marquee></OurPartners>
      <RelatedPosts
        lang={pageContext.lang}
        posts={data.allMarkdownRemark.edges}
        relatedClusters={courseDetails.meta_info.related_clusters}
      />
    </>
  );
};

export const query = graphql`
  query CourseQuery(
    $file_name: String!
    $lang: String!
    $related_clusters: [String]
  ) {
    allFullStackTechsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          title
          sub_title
          button {
            label
            url
          }
          image {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                width: 390
                height: 289
                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
              )
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
    allMarkdownRemark(
      limit: 4
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { cluster: { in: $related_clusters } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            type
            pagePath
          }
          frontmatter {
            author
            date
            image
            slug
            title
            excerpt
            featured
            status
            cluster
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
              }
            }
          }
          button {
            syllabus_heading
            syllabus_btn_label
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
            related_clusters
          }
          geek_data {
            heading
            geek_force
            geek_pal
          }
          details {
            about {
              title
              sub_title
              list {
                label
                content
                link
                link_text
                icon
              }
            }
            heading
            weeks
            sub_heading
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
          badges {
            paragraph
          }
          upcoming {
            no_dates_message
            actionMessage
          }
          credentials {
            heading
            paragraph
          }
          geeks_vs_others {
            heading
            sub_heading
            sub_heading_link
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
          typical {
            heading
            sub_heading
            schedule {
              title
              time
              icon
              content
              step
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
    allJobGuaranteeSmallYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          title
          icons {
            title
            icon
          }
          link {
            url
            label
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
          chart_section {
            data {
              percentage
              color
              description
            }
          }
          button {
            apply_button_link
            apply_button_text
            cohort_more_details_text
            syllabus_button_text
            syllabus_submit_text
          }
        }
      }
    }
  }
`;

export default BaseRender(Program);
