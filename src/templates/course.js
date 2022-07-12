import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { isCustomBarActive } from "../actions";
import BaseRender from "./_baseLayout";
import {
  Container,
  Header,
  Column,
  Wrapper,
  WrapperImage,
  Divider,
  Sidebar,
  Div,
  GridContainer,
} from "../components/Sections";
import {
  Title,
  H1,
  H2,
  H3,
  H4,
  H5,
  Span,
  Paragraph,
} from "../components/Heading";
import { Button, Colors } from "../components/Styling";
import { requestSyllabus } from "../actions";
import { SessionContext } from "../session";
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
import GeeksInfo from "../components/GeeksInfo";
import Testimonials from "../components/Testimonials";
import OurPartners from "../components/OurPartners";
import Icon from "../components/Icon";

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

  return (
    <>
      <Header
        margin={isCustomBarActive(session) ? "120px 0 0 0" : ""}
        paragraphMargin="26px 0"
        paragraphMargin_Tablet="26px 22%"
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
            redirect={pageContext.lang === "us"
            ? "/us/thank-you"
            : "/es/gracias"}
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
          margin="0 0 40px 0"
          paragraph={yml.badges.paragraph}
        />
      </Header>
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
      <TechsWeTeach lang={pageContext.lang} data={data.allFullStackTechsYaml} />
      <GeeksInfo lang={pageContext.lang} />
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
      />
      <GridContainer padding_tablet="0" margin_tablet="0 0 62px 0">
        <Div height="1px" background="#EBEBEB"></Div>
      </GridContainer>
      <PricesAndPayment
        background={`linear-gradient(to bottom, ${Colors.white} 50%, ${Colors.lightYellow2} 50%)`}
        type={pageContext.slug}
        lang={pageContext.lang}
        session={session}
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
    </>
  );
};

export const query = graphql`
  query CourseQuery($file_name: String!, $lang: String!) {
    allFullStackTechsYaml(filter: { fields: { lang: { eq: $lang } } }) {
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
                # fluid(maxWidth: 800){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
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
            full_stack {
              full_time {
                center_section {
                  button {
                    button_text
                  }
                  header {
                    sub_heading
                    heading_one
                    heading_two
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
                }
                left_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                    logo
                  }
                  header {
                    heading_one
                    heading_two
                    sub_heading
                  }
                }
                right_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                    logo
                  }
                  header {
                    sub_heading
                    heading_one
                    heading_two
                  }
                }
              }
              part_time {
                center_section {
                  button {
                    button_text
                  }
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
                }
                left_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                    logo
                  }
                  header {
                    heading_one
                    sub_heading
                    heading_two
                  }
                }
                right_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                    logo
                  }
                  header {
                    heading_one
                    sub_heading
                    heading_two
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
