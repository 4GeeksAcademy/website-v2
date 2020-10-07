import React, { useEffect } from 'react';
import {graphql, navigate} from 'gatsby';
import { landingSections } from '../components/landing';

import LeadForm from "../components/LeadForm/index.js";
import {H1, H2, H4, Paragraph, Span} from '../components/Heading'
import { Row, Column, Divider, Wrapper} from '../components/Sections'
import {Colors, StyledBackgroundSection} from '../components/Styling'

import BaseRender from './_baseRender'
import {requestSyllabus} from "../actions";
import {SessionContext} from '../session.js'

const Landing = (props) => {
  const {session} = React.useContext(SessionContext);
  const {data, pageContext, yml} = props;
  const city = session && session.location ? session.location.reliable ? session.location.city : "" : "Miami";
  const course = data.allCourseYaml.edges.length > 0 ? data.allCourseYaml.edges[0].node : {};
  const [ components, setComponents ] = React.useState({});

  useEffect(() => {
    let _components = {};
    if(yml.components) yml.components.forEach(({ name, ...rest }) => {
      _components[name] = rest;
    });
    setComponents({ ...yml, ..._components });
  },[yml]);
  
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
          <Divider height={yml.features.marginTop} />
          {Array.isArray(yml.features.bullets) && yml.features.bullets.map((f, i) => 
            <Paragraph key={i}
              style={JSON.parse(yml.features.styles)} 
              margin="7px 0" 
              textShadow="0px 0px 4px black" 
              align_sm="left" 
              mw_sm="300px" 
              color={Colors.white}>{'• '}{f}</Paragraph>
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
          <LeadForm style={{marginTop: "50px"}} heading="Request More Info." 
              formHandler={requestSyllabus}
              heading={yml.form.heading}
              redirect={yml.form.redirect}
              lang={pageContext.lang}
              fields={yml.form.fields}
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
        <Paragraph margin="4px 0" color={Colors.white} key={i}>{f}</Paragraph>
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
        Object.keys(components)
          .filter(name => landingSections[name] !== undefined || landingSections[components[name].layout] !== undefined)
          .sort((a,b) => components[a].position > components[a].position ? -1 : 1)
          .map(name => {
            const layout = components[name].layout || name;
            return landingSections[layout]({ ...props, yml: components[name], session, city, course })
          })
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
            form{
              header
              redirect
              fields
            }
            features{
              marginTop
              bullets
              styles
            }
            in_the_news{
              heading
              position
            }
            program_details{
              position
              heading
              sub_heading
            }
            why_4geeks{
              position
              heading
              sub_heading
            }
            alumni_projects{
              position
              heading
              sub_heading
            }
            who_is_hiring{
              position
              heading
              sub_heading
            }
            why_python{
              position
              heading
              sub_heading
            }
            components{
              name
              position
              layout
              image
              heading
              content
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
              position
              heading
              paragraph
              total_rows
            }
            testimonial{
              position
              heading
              sub_heading
              students{
                name
                sub_heading
                comment
                video
              }
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
                  fluid(maxWidth: 150){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              featured
            }
          }
        }
      }
    }
  }
`;

export default BaseRender(Landing, "landing");