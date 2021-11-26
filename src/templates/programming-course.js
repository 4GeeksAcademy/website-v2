import React, { useEffect, useState } from 'react';
import {Link} from "gatsby";
import BaseRender from './_baseLayout'
import {Header, Div, GridContainer, GridContainerWithImage} from '../components/Sections'
import {Title, H1, H2, H3, H4, H5, Span, Paragraph} from '../components/Heading'
import {Button, Colors, StyledBackgroundSection} from '../components/Styling'
import {requestSyllabus} from "../actions";
import {SessionContext} from '../session'
import ProgramDetails from '../components/ProgramDetails';
import ProgramDetailsMobile from '../components/ProgramDetailsMobile';
import PricesAndPayment from '../components/PricesAndPayment';
import Modal from '../components/Modal';
import LeadForm from '../components/LeadForm';
import AlumniProjects from '../components/AlumniProjects';
import Badges from '../components/Badges';
import TechsWeTeach from '../components/TechsWeTeach';
import {Circle} from '../components/BackgroundDrawing'
import UpcomingDates from '../components/UpcomingDates';
import GeeksInfo from '../components/GeeksInfo';
import Testimonials from '../components/Testimonials';
import OurPartners from '../components/OurPartners';
import Icon from '../components/Icon';
import ScrollSpy from '../components/ScrollSpy';


const Program = ({data, pageContext, yml}) => {
  const {session} = React.useContext(SessionContext);
  const courseDetails = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;

  const course_type = "full_stack"
  const program_type = yml.meta_info.slug.includes("full-time") ? "full_time" : "part_time"

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [applyButtonText, setApplyButtonText] = useState("");
  let city = session && session.location ? session.location.city : [];
  let currentLocation = data.allLocationYaml.edges.find(loc => loc.node?.city === city);

  useEffect( () => {
    if (currentLocation !== undefined){
      setApplyButtonText(currentLocation.node.button.apply_button_text)
    }
  }, [currentLocation])

  const syllabus_button_text = yml.button.syllabus_heading;

  return (<>
    <GridContainerWithImage id="bottom"
      background={Colors.veryLightBlue2}
      imageSide="right"
      padding="144px 12px 72px 12px"
      columns_tablet="14"
      margin="0"
      margin_tablet="0"
    >
      <Div flexDirection="column" margin="0" justifyContent_tablet="start" 
      padding_tablet="0 30px" 
      gridArea_tablet="1/1/1/6"
      >
        <Div
          flexDirection="column"
          size="12"
          size_tablet="12"
          width="100%"
          width_tablet="100%"
          margin="0"
          textAlign_sm="center"
        >
          <H1 type="h1" margin="0 0 11px 0" textAlign_tablet="left" color="#606060">{yml.seo_title}</H1>
          <H2 type="h2" padding="0" textAlign_tablet="left" fontSize="40px" fontSize_tablet="50px" lineHeight="60px">{yml.header.title}</H2>
          <Paragraph padding="0" textAlign_tablet="left" letterSpacing="0.05em" margin="26px 0" >{yml.header.paragraph}</Paragraph>
        </Div>
      </Div>
      <Div height="auto" width="100%" gridArea_tablet="1/7/1/13" style={{position: "relative"}}>
        <StyledBackgroundSection
          height={`350px`}
          borderRadius={`3px`}
          image={yml.header.image}
          bgSize={`contain`}
          alt={yml.header.image_alt}
        />
      </Div>
    </GridContainerWithImage>

    <Div
      display="flex"
      background={Colors.white}
      style={{
        borderBottom: "1px solid #EBEBEB",
        overflowX: "auto",
        zIndex: "999",
        position:"sticky",
        top: "0"
      }}
      alignItems="center"
      flexDirection="row"
      gap="40px"
      width="100%"
      height="70px"
    >
      <ScrollSpy offsetTop={70}>
        <a width="auto" padding="0 20px" href="#about_the_program" ref={React.createRef()}>
          <Paragraph textTransform="uppercase" >Acerca de</Paragraph>
        </a>
        <a width="auto" padding="0 20px" href="#what_will_you_learn" ref={React.createRef()}>
          <Paragraph textTransform="uppercase">Qué Aprenderás</Paragraph>
        </a>
        <a width="auto" padding="0 20px" href="#what_does_it_mean_full_stack_developer" ref={React.createRef()}>
          <Paragraph textTransform="uppercase">Qué significat</Paragraph>
        </a>
        <a width="auto" padding="0 20px" href="#geeks_info" ref={React.createRef()}>
          <Paragraph textTransform="uppercase">Herramientas y lenguajes</Paragraph>
        </a>
        <a width="auto" padding="0 20px" href="#what_includes" ref={React.createRef()}>
          <Paragraph textTransform="uppercase">Qué incluye?</Paragraph>
        </a>
        <a width="auto" padding="0 20px" href="#upcoming_dates" ref={React.createRef()}>
          <Paragraph textTransform="uppercase">Fechas</Paragraph>
        </a>
      </ScrollSpy>
    </Div>

    <ProgramDetails id="about_the_program" withoutAnimation background={Colors.white} details={courseDetails.details} lang={pageContext.lang} course={program_type} />

    <GridContainerWithImage
      id="what_will_you_learn"
      background={Colors.lightYellow}
      imageSide="left"
      padding="82px 0"
      columns_tablet="14"
      margin="0"
      margin_tablet="0"
    >
      <Div height="auto" width="100%" gridArea_tablet="1/1/1/6" style={{position: "relative"}}>
        <StyledBackgroundSection
          height={`350px`}
          borderRadius={`3px`}
          image={yml.what_will_you_learn.image}
          bgSize={`contain`}
          alt={yml.what_will_you_learn.image_alt}
        />
      </Div>
      <Div flexDirection="column" margin="0" justifyContent_tablet="start" 
        padding_tablet="0 30px" 
        gridArea_tablet="1/7/1/13"
      >
        <Div
          flexDirection="column"
          size="12"
          size_tablet="12"
          width="100%"
          width_tablet="100%"
          margin="0"
          textAlign_sm="center"
        >
          <H2 type="h2" padding="0 0 14px 0" textAlign_tablet="left" fontSize="30px" fontSize_tablet="30px" lineHeight="60px">{yml.what_will_you_learn.heading}</H2>
          {yml.what_will_you_learn.sub_title.split("\n").map((m, i) =>
            <Paragraph padding="0" textAlign_tablet="left" letterSpacing="0.05em" margin="10px 0" >
              {m}
            </Paragraph>
          )}
        </Div>
      </Div>
    </GridContainerWithImage>


    <GridContainerWithImage id="what_does_it_mean_full_stack_developer"
        background={Colors.white}
        imageSide="right"
        padding="82px 0"
        columns_tablet="14"
        margin="0"
        margin_tablet="0"
    >
      <Div flexDirection="column" margin="0" justifyContent_tablet="start" 
        padding_tablet="0 30px"
        gridArea_tablet="1/1/1/7"
      >
        <Div
          flexDirection="column"
          size="12"
          size_tablet="12"
          width="100%"
          width_tablet="100%"
          margin="0"
          padding="0 10px"
          textAlign_sm="center"
        >
          <H2 type="h2" padding="0 0 14px 0" textAlign_tablet="left" fontSize="22px" fontSize_tablet="22px" lineHeight="60px">{yml.content_with_subtitle_and_image.heading}</H2>
          {yml.content_with_subtitle_and_image.list.map((m, i) =>(
            <>
              {m.label && (
                <H3 type="h3" width="fit-content" lineHeight="22px" padding="0 4px" margin="20px 0 8px 0" background={Colors.yellow} textAlign_tablet="left" fontSize="15px">{m.label}</H3>
              )}
              {m.content.split("\n").map((content, i) =>
                <>
                
                  <Paragraph key={i} padding="0" textAlign="left" letterSpacing="0.05em" margin="10px 0" >
                    {/* Text without <strong> tag */}
                    {content.split("<strong>")[0] || m}

                    {/* Extracts the <strong> tag and render a text with font weight: bold  */}
                    {content.match("<strong>(.*?)<\/strong>") && (
                      <Paragraph
                        display="initial"
                        color={Colors.black}
                        padding="0"
                        fontSize="15px"
                        fontWeight="900"
                        textAlign="left"
                        // textAlign_tablet="left"
                        letterSpacing="0.05em"
                        margin="10px 0"
                      >
                        {content.match("<strong>(.*?)<\/strong>")[1]}
                      </Paragraph>
                    )}
                  </Paragraph>
                  {/* {content.split("<strong>")[0].map((m, i) => (
                      <Paragraph key={i} padding="0" textAlign_tablet="left" letterSpacing="0.05em" margin="10px 0" >
                        {m}
                      </Paragraph>
                  ))} */}

                  {/* {content.match("<strong>(.*?)<\/strong>") && (
                    <Paragraph padding="0" fontSize="20px" textAlign_tablet="left" letterSpacing="0.05em" margin="10px 0" >
                      {content.match("<strong>(.*?)<\/strong>")[1]}
                    </Paragraph>
                  )} */}
                </>
              )}
            </>
          ))}
        </Div>
      </Div>
      <Div height="auto" width="100%" gridArea_tablet="1/8/1/13" style={{position: "relative"}}>
        <StyledBackgroundSection
          height={`800px`}
          borderRadius={`3px`}
          image={yml.content_with_subtitle_and_image.image}
          bgSize={`contain`}
          alt={yml.content_with_subtitle_and_image.image_alt}
        />
      </Div>
      <Div display="none" display_tablet="block" style={{right: '0', position: "absolute"}}>
        <svg width="525" style={{zIndex: "99", right: "0", position: "absolute"}} height="762" viewBox="0 0 525 762" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="422.5" cy="619.5" r="142.5" fill="#FFB718" fill-opacity="0.2"/>
          <circle cx="41" cy="542" r="41" fill="#FFB718"/>
          <circle cx="414.5" cy="308.5" r="8.5" transform="rotate(-180 414.5 308.5)" fill="black"/>
          <circle cx="356.5" cy="26.5" r="26.5" fill="#0097CD"/>
          <circle cx="177.5" cy="24.5" r="6.5" fill="#CD0000"/>
        </svg>
      </Div>

    </GridContainerWithImage>

    {/* <TechsWeTeach lang={pageContext.lang} data={data.allFullStackTechsYaml} /> */}
    <GeeksInfo id="geeks_info" lang={pageContext.lang} />
    <GridContainer padding_tablet="0" margin_tablet="90px 0 62px 0" margin="57px 0">
      <Div height="5px" background="#EBEBEB"></Div>
    </GridContainer>
    <UpcomingDates id="upcoming_dates" lang={pageContext.lang} message={courseDetails.upcoming.no_dates_message} />
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
    <Testimonials lang={data.allTestimonialsYaml.edges} margin_tablet="75px 0 0 0" margin="45px 0 0 0" />
    <OurPartners images={hiring.partners.images} marquee></OurPartners>
  </>
  )
};

export const query = graphql`
  query ProgrammingCourseQuery($file_name: String!, $lang: String!) {
    allFullStackTechsYaml(filter: { fields: { lang: { eq: $lang }}}) {
      edges {
        node {
          title
          sub_title
          image{
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
            image{
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
    allCourseYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
          seo_title
          header{
            title
            paragraph
            image_alt
            image{
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                  breakpoints:	[200, 340, 520, 890]
                )
              }
            }
          }
          what_will_you_learn{
            heading
            sub_title
            image{
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                  breakpoints:	[200, 340, 520, 890]
                )
              }
            }
            image_alt
          }
          content_with_subtitle_and_image{
            heading
            image{
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                  breakpoints:	[200, 340, 520, 890]
                )
              }
            }
            image_alt
            list{
              label
              content
            }
          }
          button{
            syllabus_heading
            syllabus_btn_label
            syllabus_motivation
            apply_button_link
          }
          meta_info{
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
            about{
              title
              sub_title
              list{
                label
                content
                link
                link_text
              }
            }
            heading
            weeks
            sub_heading
            left_labels{
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
          syllabus{
            heading
            button_label
          }
          badges{
            paragraph
          }
          upcoming{
            no_dates_message
          }
          credentials{
            heading
            paragraph
          }
          geeks_vs_others{
            heading
            sub_heading
            sub_heading_link
          }
          prices{
            heading
            sub_heading
            selector{
              top_label
              placeholder
            }
            button{
              text
              link
            }
          }
          typical{
            heading
            sub_heading
            schedule{
              title
              time
              icon
              content
              step
            }
          }
          alumni{
            heading
            sub_heading
          }
          sidebar{
            membership
            program
            geeks_vs_other
            pricing
            alumni
          }
        }
      }
    }
    allAlumniProjectsYaml(filter: { fields: { lang: { eq: $lang }}}){
      edges {
        node {
          header{
            tagline
            sub_heading
          }
          projects {
              project_name
              slug
              project_image{
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
          button_section{
            button_text
            button_link
          }
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
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
            linkedin_image{
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  height: 14
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            student_thumb{
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
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
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
    allPartnerYaml(filter: { fields: { lang: { eq: $lang }}}) {
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
    allLocationYaml(filter: {fields: { lang: {eq: $lang}}, meta_info: { unlisted: {ne: true }}}){
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
          fields{
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
            unlisted
            keywords
            redirects
          }
          header{
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