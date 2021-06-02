import React, {useEffect} from 'react';
import {graphql, navigate} from 'gatsby';
import {landingSections} from '../new_components/Landing';
import FollowBar from "../new_components/FollowBar"
import LeadForm from "../new_components/LeadForm";
import {H1, H2, H4, Paragraph, Span} from '../new_components/Heading'
import {Row, Column, Divider, Div, GridContainer} from '../new_components/Sections'
import {Colors, StyledBackgroundSection} from '../new_components/Styling'


import BaseRender from './_baseLandingLayout'
import {requestSyllabus} from "../actions";
import {SessionContext} from '../session.js'

const Landing = (props) => {
  const {session, setLocation} = React.useContext(SessionContext);
  const {data, pageContext, yml} = props;
  const [components, setComponents] = React.useState({});
  const [inLocation, setInLocation] = React.useState("");

  useEffect(() => {
    let _components = {};
    if (yml.components) yml.components.forEach(({name, ...rest}) => {
      _components[name] = rest;
    });
    setComponents({...yml, ..._components});
  }, [yml]);
  useEffect(() => {
    if (yml.meta_info && yml.meta_info.utm_location) setLocation(yml.meta_info.utm_location);

    const urlParams = new URLSearchParams(window.location.search);
    const _inLoc = urlParams.get('in') || null;
    if (_inLoc && _inLoc != "") setInLocation(_inLoc.replace(/^\w/, c => c.toUpperCase()) + " ");
  }, []);

  // data sent to the form already prefilled
  const preData = {
    course: {type: "hidden", value: yml.meta_info.utm_course, valid: true},
    utm_location: {type: "hidden", value: yml.meta_info.utm_location, valid: true},
    automation: {type: "hidden", value: yml.meta_info.automation, valid: true},
    tag: {type: "hidden", value: yml.meta_info.tag, valid: true}
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
          alignSelf="center"
          color={Colors.black}
          align_sm="left"
          align="left"
          fontSize_tablet={yml.follow_bar.content.font_size[0]}
          // fs_lg={yml.follow_bar.content.font_size[1]}
          // fs_md={yml.follow_bar.content.font_size[2]}
          // fs_sm={yml.follow_bar.content.font_size[3]}
          fontSize={yml.follow_bar.content.font_size[4]}
        >
          {yml.follow_bar.content.text.split("\n").map((c, i) => <span className="d-block d-xs-none w-100">{c}</span>)}
          {yml.follow_bar.content.text_mobile && yml.follow_bar.content.text_mobile.split("\n").map((c, i) => <span className="d-none d-xs-block w-100">{c}</span>)}
        </Paragraph>
      </FollowBar>

      <GridContainer
        padding="0"
        containerGridGap="0"
        // display_md="flex" 
        containerColumns_tablet="repeat(1,0fr)"
        // padding="72px 0 0 0" 
        // padding_tablet="72px 0 0 0"
        columns_tablet="2"
        // display="none"
      >
        <StyledBackgroundSection
          className={`image`}
          image={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
          bgSize={`cover`}
          // width="58%"
          width_tablet="58%"
          // w_xs="100%"
          margin="0 0 auto 0"
          filter={yml.header_data.image_filter}
          backgroundColor={Colors.lightGray}
          align="center"
          alt="4Geeks Academy"
          borderRadius_tablet={`0 0 1.25rem 0`}
          // borderRadius="0"
          borderRadius="0"
        >
          <Div
            // display="none"
            display_tablet="flex"
            flexDirection="column"
            width="100%"
            size_tablet="10"
            size="12"
            // borderRadius="0 0 0 1.25rem"
            margin="0 0 10px auto"
            padding={`80px 0 0 0`}
            height="auto"
            padding_tablet={`80px 0 40px 20px`}
          >
            <H1
              type="h1"
              variant="main"
              lineHeight="40px"
              padding="0 10px 0 0px"
              color={Colors.white}
              fontSize="38px"
              fontSize_tablet="42px"
              fontWeight="bolder"
              textAlign="center"
              textAlign_tablet="left" >{inLocation}{yml.header_data.tagline}<Span animated color={Colors.yellow}>_</Span>
            </H1>
            <H4 textAlign="left" fontSize="18px" color={Colors.white}
              variant="main"
              margin_tablet="20px 0px 40px 0px"
              margin="20px 0 20px 10px"
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
                padding="0px 20px"
                textShadow="0px 0px 4px black"
                textAlign="left"
                // maxWidth="300px"
                color={Colors.white}>{'• '}{f}</Paragraph>
            )}
          </Div>
        </StyledBackgroundSection>
        <Div
          flexDirection="column"
          size="12"
          size_tablet="10"
          width="100%"
          // size_lg="4"
          // size_sm="6"
          // size_xs="12"
          margin="0"
          textAlign_sm="center"
          margin_md="0 auto 0 0"
        >
          <LeadForm margin_tablet="50px 0 0 0" margin="0" style={{ marginTop: "50px" }} heading="Request More Info."
            formHandler={requestSyllabus}
            heading={yml.form.heading}
            motivation={yml.form.motivation}
            sendLabel={yml.form.button_label}
            redirect={yml.form.redirect}
            lang={pageContext.lang}
            fields={yml.form.fields}
            data={preData}
            justifyContentButton="center"
          />
        </Div>
      </GridContainer>
      {/* <StyledBackgroundSection
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
          motivation={pageContext.motivation}
          sendLabel={yml.form.button_label}
          redirect={yml.form.redirect}
          fields={yml.form.fields}
          data={preData}
        />
      </Div> */}

      {
        Object.keys(components)
          .filter(name => components[name] && (landingSections[name] || landingSections[components[name].layout]))
          .sort((a, b) => components[b].position > components[a].position ? -1 : 1)
          .map(name => {
            const layout = components[name].layout || name;
            return landingSections[layout]({...props, yml: components[name], session, course: yml.meta_info.utm_course, location: components.meta_info.utm_location})
          })
      }
    </>
  )
};
export const query = graphql`
  query LandingNonavQuery($file_name: String!, $lang: String!, $utm_course: String!) {
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
              automation
              tag
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
              motivation
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
              filter
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
              proportions
              layout
              image{
                src
                style
                link
              }
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
              icon
              value
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

export default BaseRender(Landing, {
  navbar: false
});