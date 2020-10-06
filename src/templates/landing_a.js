import React from 'react';
import {graphql} from 'gatsby';
import Why4Geeks from '../components/Why4Geeks';
import News from '../components/News'
import GeeksVsOthers from '../components/GeeksVsOthers'
import ChooseProgram from '../components/ChooseProgram'
import JobsStatistics from '../components/JobsStatistics';
import WhyPython from '../components/WhyPython'
import LeadForm from "../components/LeadForm/index.js";
import {H1, H2, H4, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowRight, StyledBackgroundSection} from '../components/Styling'
import {Card} from '../components/Card'
import WhoIsHiring from '../components/WhoIsHiring';
import AlumniProjects from '../components/AlumniProjects'
import ProgramDetails from '../components/ProgramDetails'
import ProgramDetailsMobile from '../components/ProgramDetailsMobile'
import BaseRender from './_baseRender'
import Testimonials from '../components/Testimonials'
import Loc from '../components/Loc'
import {Link, navigate} from 'gatsby';
import {requestSyllabus} from "../actions";
import {SessionContext} from '../session.js'
import Img from "gatsby-image"

const Landing = (props) => {
  const {session} = React.useContext(SessionContext);
  const {data, pageContext, yml} = props;
  const city = session && session.location ? session.location.reliable ? session.location.city : "" : "Miami";
  const course = data.allCourseYaml.edges.length > 0 ? data.allCourseYaml.edges[0].node : {};

  console.log("yml", yml)
  return (
    <>
      <Row className="d-sm-none">
          <StyledBackgroundSection
            className={`image`}
            height={`500px`}
            image={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
            bgSize={`cover`}
            width="58%"
            w_xs="100%"
            margin="0 0 auto 0"
            filter={yml.header_data.image_filter}
            backgroundColor={Colors.lightGray}
            align="center"
            alt="4Geeks Academy"
            borderRadius={`0 0 1.25rem 0`}
          >
        <Column
          size="8"
          size_xs="12"
          borderRadius="0 0 0 1.25rem"
          height="500px"
          margin="0 0 0 auto"
          customRespSize
          disp_sm={"none"}
          disp_xs={"none"}
          padding={`80px 0 0 0`}
        >            
          <H1
            type="h1"
            variant="main"
            padding="0 10px 0 0px"
            color={Colors.white}
            fs_sm="38px"
            fs_md="30px"
            fs_lg="32px"
            fs_xl="38px"
            align="left" >{yml.header_data.tagline}<Span animated color={Colors.yellow}>_</Span>
          </H1>
          <H4 align="left" fontSize="18px" color={Colors.white} 
            variant="main"
            margin="20px 0px 40px 0px" 
            m_sm="20px auto" 
            maxWidth="350px"
            textShadow="0px 0px 4px black"
          >
            {yml.header_data.sub_heading}
          </H4>
          {Array.isArray(yml.features.bullets) && yml.features.bullets.map((f, i) => 
            <Paragraph key={i}
              style={JSON.parse(yml.features.styles)} 
              margin="7px 0" 
              textShadow="0px 0px 4px black" 
              align_sm="left" 
              mw_sm="300px" 
              color={Colors.white}>✅ {f}</Paragraph>
          )}
        </Column>
          </StyledBackgroundSection>
        <Column
          size="3"
          size_lg="4"
          size_sm="6"
          size_xs="12"
          align_sm="center"
          margin="0 auto 0 0"
        >
          <LeadForm style={{marginTop: "50px"}} heading="Request More Info." formHandler={requestSyllabus} 
              lang={pageContext.lang}
              fields={yml.form_fields}
              data={{ 
                course: { value: yml.meta_info.bc_slug, valid: true }
              }}
            />
        </Column>
      </Row>
      <StyledBackgroundSection
        className={`image d-none d-sm-block`}
        image={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
        bgSize={`cover`}
        margin="0 0 auto 0"
        filter={yml.header_data.image_filter}
        backgroundColor={Colors.lightGray}
        align="center"
        alt="4Geeks Academy"
      >
      <H2
        type="h1"
        padding="50px 10px 0 0px"
        color={Colors.white}
        fs_sm="38px"
        fs_md="30px"
        fs_lg="32px"
        fs_xl="38px"
        align="center" >{yml.header_data.tagline}<Span animated color={Colors.yellow}>_</Span>
      </H2>
      <H4 align="center" fontSize="18px" color={Colors.white} 
        margin="20px 0px 40px 0px" 
        m_sm="20px auto" 
        maxWidth="350px"
      >
        {yml.header_data.sub_heading}
      </H4>
      {Array.isArray(yml.features) && yml.features.map((f, i) => 
        <Paragraph margin="4px 0" color={Colors.white} key={i}>✅ {f}</Paragraph>
      )}
        <LeadForm style={{marginTop: "0px"}} formHandler={requestSyllabus} 
            lang={pageContext.lang}
            sendLabel={yml.header_data.button_label}
            data={{ 
              course: { value: yml.meta_info.bc_slug, valid: true }
            }}
          />
      </StyledBackgroundSection>

      {
        Object.keys(yml).filter(name => sections[name] !== undefined).map(name =>
          sections[name](session, props, city, course)
        )
      }
    </>
  )
};
export const query = graphql`
  query LandingAQuery($file_name: String!, $lang: String!, $utm_course: String!) {
    allLandingYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
              title
              description
              image
              keywords
              utm_course
              utm_location
            }
            form_fields
            features{
              bullets
              styles
            }
            in_the_news
            program_details{
              heading
              sub_heading
            }
            why_python{
              heading
              sub_heading
            }
            header_data{
              tagline
              sub_heading
              image_filter
              button_label
              image{
                childImageSharp {
                  fluid(maxWidth: 1000){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            geeks_vs_others{
              heading
              paragraph
              total_rows
            }
            testimonial{
              heading
              sub_heading
            }
        }
      }
    }
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
          node {
            credentials {
              title
              slug
              value
              symbol
              symbol_position
            }
          }
        }
    }
    allCourseYaml(filter: { fields: { file_name: { eq: $utm_course }, lang: { eq: $lang }}}) {
      edges{
        node{
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
            details {
              heading
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
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
      edges {
        node {
          testimonials {
            student_name
            testimonial_date
            hidden
            student_thumb{
              childImageSharp {
                fluid(maxHeight: 200){
                  ...GatsbyImageSharpFluid_withWebp
                }
                fixed(width: 250, height: 250) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            content
            source_url
            source_url_text
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
              project_image {
                childImageSharp {
                  fluid(maxWidth: 800){
                    ...GatsbyImageSharpFluid_withWebp
                  }
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
  }
`;

export default BaseRender(Landing, "landing");


const sections = {
  in_the_news: (session, { pageContext, yml}, city, course) => <Wrapper>
    <H4 align="center" fontSize="18px" color={Colors.darkGray} 
      margin="20px 0px 10px 0px" 
      m_sm="20px auto" 
      maxWidth="350px"
    >{yml.in_the_news}
    </H4>
    <News location={session && session.location && session.location.breathecode_location_slug} lang={pageContext.lang}  />
  </Wrapper>,
  geeks_vs_others: (session, { pageContext, yml}, city, course) => <Wrapper margin="100px">
    <Title
      type="h2"
      title={yml.geeks_vs_others.heading}
      paragraph={yml.geeks_vs_others.sub_heading}
      paragraphColor={Colors.blue}
      variant="primary"
      size="10"
    />
    <GeeksVsOthers lang={pageContext.lang} limit={yml.geeks_vs_others.total_rows} />
  </Wrapper>,
  program_details: (session, { pageContext, yml}, city, course) => <Wrapper>
    <Title
      size="10"
      marginTop="40px"
      title={yml.program_details.heading}
      paragraph={yml.program_details.sub_heading}
      variant="primary"
    />
    <ProgramDetails details={course && course.details} />
    <ProgramDetailsMobile details={course && course.details} />
  </Wrapper>,
  why_python: (session, { pageContext, yml}, city, course) => <Wrapper margin="50px 0">
    <WhyPython heading={yml.why_python.heading} subheading={yml.why_python.sub_heading} lang={pageContext.lang} />
  </Wrapper>,
  testimonials: (session, { pageContext, yml}, city, course) => <Wrapper margin="100px">
    <Title
      variant="primary"
      title={yml.testimonial.heading}
      paragraph={yml.testimonial.sub_heading}
      maxWidth="66%"
    // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
    />
    <Testimonials lang={data.allTestimonialsYaml.edges} />
  </Wrapper>,
  why_4geeks: (session, { pageContext, yml}, city, course) => <Wrapper margin="50px 0">
    <Title
      title={yml.why_4geeks.heading + " " + city}
      variant="primary"
    />
    <Why4Geeks lang={pageContext.lang} playerHeight="250px" />
  </Wrapper>,
  alumni_projects: (session, { pageContext, yml}, city, course) => <Wrapper margin="100px">
    <Title
      size="10"
      title={yml.alumni_projects.heading}
      paragraph={yml.alumni_projects.sub_heading}
      paragraphColor={Colors.darkGray}
      maxWidth="66%"
      margin="auto"
      variant="primary"
    />
    <AlumniProjects lang={data.allAlumniProjectsYaml.edges} hasTitle showThumbs="false"  limit={2} />
  </Wrapper>
}