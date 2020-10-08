import React, {useEffect} from 'react';
import {graphql, navigate} from 'gatsby';
import {landingSections} from '../components/Landing';
import FollowBar from "../components/FollowBar"
import LeadForm from "../components/LeadForm";
import {H1, H2, H4, Paragraph, Span} from '../components/Heading'
import {Row, Column, Divider, Div} from '../components/Sections'
import {Colors, StyledBackgroundSection} from '../components/Styling'

import BaseRender from './_baseRender'
import {requestSyllabus} from "../actions";
import {SessionContext} from '../session.js'

const Landing = (props) => {
  const {session, setLocation} = React.useContext(SessionContext);
  const {data, pageContext, yml} = props;
  const course = data.allCourseYaml.edges.length > 0 ? data.allCourseYaml.edges[0].node : {};
  const [components, setComponents] = React.useState({});

  useEffect(() => {
    let _components = {};
    if (yml.components) yml.components.forEach(({name, ...rest}) => {
      _components[name] = rest;
    });
    setComponents({...yml, ..._components});
  }, [yml]);
  useEffect(() => {
    if (yml.meta_info && yml.meta_info.utm_location) setLocation(yml.meta_info.utm_location);
  }, []);

  // data sent to the form already prefilled
  const preData = {
    course: {type: "hidden", value: yml.meta_info.utm_course, valid: true},
    utm_location: {type: "hidden", value: yml.meta_info.utm_location, valid: true}
  };

  return (
    <>
      <FollowBar position={yml.follow_bar.position} showOnScrollPosition={400}
        buttonText={yml.follow_bar.button.text}
        phone={session && session.location && session.location.phone}
        phoneText={yml.follow_bar.phone.text}
        onClick={() => {
          if (yml.follow_bar.button.path === "#top") {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }
        }}
      >
        <Paragraph
          margin="0"
          fontWeight="800"
          color={Colors.black}
          align_sm="left"
          align="left"
          fontSize={yml.follow_bar.content.font_size[0]}
          fs_lg={yml.follow_bar.content.font_size[1]}
          fs_md={yml.follow_bar.content.font_size[2]}
          fs_sm={yml.follow_bar.content.font_size[3]}
          fs_xs={yml.follow_bar.content.font_size[4]}
        >
          {yml.follow_bar.content.text.split("\n").map((c, i) => <span className="d-block d-xs-none w-100">{c}</span>)}
          {yml.follow_bar.content.text_mobile && yml.follow_bar.content.text_mobile.split("\n").map((c, i) => <span className="d-none d-xs-block w-100">{c}</span>)}
        </Paragraph>
      </FollowBar>
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
            sendLabel={yml.form.button_label}
            redirect={yml.form.redirect}
            lang={pageContext.lang}
            fields={yml.form.fields}
            data={preData}
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
        {Array.isArray(yml.features.bullets) && yml.features.bullets.map((f, i) =>
          <Paragraph align_sm="left" padding="0 20px" margin="4px 0"
            color={Colors.white}
            textShadow="0px 0px 4px black"
            fontWeight="800"
            key={i}
            style={JSON.parse(yml.features.styles)}
          >{'• '}{f}</Paragraph>
        )}
        <Divider height="20px" />
      </StyledBackgroundSection>
      <Div background={Colors.black} display="none" d_sm="block">
        <LeadForm formHandler={requestSyllabus}
          lang={pageContext.lang}
          sendLabel={yml.form.button_label}
          redirect={yml.form.redirect}
          fields={yml.form.fields}
          data={preData}
        />
      </Div>

      {
        Object.keys(components)
          .filter(name => components[name] && (landingSections[name] || landingSections[components[name].layout]))
          .sort((a, b) => components[b].position > components[a].position ? -1 : 1)
          .map(name => {
            const layout = components[name].layout || name;
            return landingSections[layout]({...props, yml: components[name], session, course, location: components.meta_info.utm_location})
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
            follow_bar{
              position
              content{
                text
                text_mobile
                font_size
              }
              button{
                text
                path
              }
              phone{
                text
              }
            }
            form{
              heading
              redirect
              fields
              button_label
            }
            features{
              marginTop
              bullets
              styles
            }
            badges{
              position
              heading
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
              video
              height
              button{
                text
                color
                path
              }
              heading{
                text
                font_size
              }
              content{
                text
                font_size
              }
            }
            header_data{
              tagline
              sub_heading
              image_filter
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
            linkedin_url
            linkedin_text
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