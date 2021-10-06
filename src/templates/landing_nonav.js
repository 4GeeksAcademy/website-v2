import React, {useEffect} from 'react';
import {graphql, navigate} from 'gatsby';
import {landingSections} from '../new_components/Landing';
import FollowBar from "../new_components/FollowBar"
import LeadForm from "../new_components/LeadForm";
import {H1, H2, H4, Paragraph, Span} from '../new_components/Heading'
import {GridContainerWithImage, Div, GridContainer} from '../new_components/Sections'
import {Colors, StyledBackgroundSection} from '../new_components/Styling'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import BaseRender from './_baseLandingLayout'
import {requestSyllabus, downloadPythonGuide, newsletterSignup, openGuidebook, outcomesReport} from "../actions";
import {SessionContext} from '../session.js'
import LandingNavbar from '../new_components/NavbarDesktop/landing';

const Landing = (props) => {
  const {session, setLocation} = React.useContext(SessionContext);
  const {data, pageContext, yml} = props;
  const [components, setComponents] = React.useState({});
  const [inLocation, setInLocation] = React.useState("");

  const applySchollarship = data.allLandingYaml.edges[0].node.apply_schollarship
  const landing_utm_course = yml.meta_info.utm_course

  const filteredPrograms  = data.allChooseProgramYaml.edges[0].node.programs.filter((course_el) => {
    return landing_utm_course.filter((array_el) => {
      return course_el.bc_slug === array_el;
    }).length !== 0;
  });

  const programs = filteredPrograms.map(p => ({
    label: p.text,
    value: p.bc_slug
  }))

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
    course: {type: "hidden", value: programs.length <=1 ? (programs[0].value) : (yml.meta_info.utm_course), valid: true},
    utm_location: {type: "hidden", value: yml.meta_info.utm_location, valid: true},
    automation: {type: "hidden", value: yml.meta_info.automation, valid: true},
    tag: {type: "hidden", value: yml.meta_info.tag, valid: true}
  };
  
  const landingLocation = session && session.locations?.find(l => l.breathecode_location_slug === yml.meta_info.utm_location)
  
  let actionFormHandler = () => { 
    if( yml.form.action_form_handler === "newsletterSignup"){
      return newsletterSignup
    } else if( yml.form.action_form_handler === "downloadPythonGuide"){
      return downloadPythonGuide
    } else if( yml.form.action_form_handler === "outcomesReport"){
      return outcomesReport
    } else if( yml.form.action_form_handler === "openGuidebook"){
      return openGuidebook
    } else {
      return requestSyllabus
    }
  }

  return (
    <>
      <LandingNavbar
        buttonText={yml.navbar ? yml.navbar.buttonText : pageContext.lang === "us" ? "Apply" : "Solicita una plaza"}
        buttonUrl={yml.navbar?.buttonUrl}
        logoUrl={yml.navbar?.logoUrl}
        lang={pageContext.lang}
      />
      <FollowBar position={yml.follow_bar.position} showOnScrollPosition={400}
        buttonText={yml.follow_bar.button.text}
        phone={yml.follow_bar.phone.number || landingLocation && landingLocation.phone}
        phoneText={yml.follow_bar.phone.text}
        link={yml.follow_bar.button.path}
      >
        <Paragraph
          margin="0"
          fontWeight="800"
          alignSelf="center"
          color={Colors.black}
          textAlign="left"
          fontSize_tablet={yml.follow_bar.content.font_size[0]}
          fontSize={yml.follow_bar.content.font_size[4]}
        >
          {yml.follow_bar.content.text.split("\n").map((c, i) => <span className="d-block d-xs-none w-100">{c}</span>)}
          {yml.follow_bar.content.text_mobile && yml.follow_bar.content.text_mobile.split("\n").map((c, i) => <span className="d-none d-xs-block w-100">{c}</span>)}
        </Paragraph>
      </FollowBar>
      <StyledBackgroundSection
        id="top"
        className={`image`}
        image={yml.header_data.image && yml.header_data.image.childImageSharp.gatsbyImageData}
        bgSize={`cover`}
        // width="58%"
        width_tablet="100%"
        height="auto"
        // w_xs="100%"
        margin="0 0 auto 0"
        filter={yml.header_data.image_filter}
        backgroundColor={Colors.lightGray}
        align="center"
        alt="4Geeks Academy"
        borderRadius="0"
      >
        <GridContainer
          padding="0"
          containerGridGap="0"
          containerColumns_tablet="repeat(1,0fr)"
          padding="70px 0 40px 0" 
          padding_tablet="70px 0 40px 0"
          columns_tablet="2"
        >

          <Div
            // display="none"
            display_tablet="flex"
            flexDirection="column"
            width="100%"
            size_tablet="10"
            size="12"
            alignItems="center"
            alignItems_tablet="flex-start"
            // borderRadius="0 0 0 1.25rem"
            margin="0 0 35px auto"
            padding={`80px 0 0 0`}
            height="auto"
            padding_tablet={`80px 0 0 20px`}
          >
            {
              yml.header_data.scholarship && 
              <>
                <Div width="242px" flexDirection_tablet="column" height="auto" padding="0 0 25px 0">
                  <GatsbyImage 
                    loading="eager"
                    imgStyle={{ objectFit: 'contain' }}
                    image={getImage(yml.header_data.scholarship.childImageSharp.gatsbyImageData)}
                    alt="4Geeks Logo" 
                  />
                </Div>

                <Div display="none" display_tablet="flex" background="#FFFFFF" width="calc(50% - 30px)" height="2px" margin="7px 0"/>
              </>
            }
            <H1
              type="h1"
              variant="main"
              lineHeight="40px"
              margin="20px 0"
              padding="0 10px 0 0px"
              color={Colors.white}
              fontSize="38px"
              fontSize_tablet="42px"
              fontWeight="bolder"
              textAlign="center"
              textAlign_tablet="left" >{inLocation}{yml.header_data.tagline}
              {/* <Span animated color={Colors.yellow}>_</Span> */}
            </H1>
            {
              yml.header_data.sub_heading !== "" && 
              <H2 type="h2" textAlign="left" fontSize="18px" color={Colors.white}
                variant="main"
                margin_tablet="20px 0px 40px 0px"
                margin="20px 0 20px 10px"
                maxWidth="350px"
                textShadow="0px 0px 4px black"
              >
                {yml.header_data.sub_heading}
              </H2>
            }
            {Array.isArray(yml.features.bullets) && 
              yml.features.bullets.map((f, i) =>
                <Paragraph key={i}
                  isActive
                  style={JSON.parse(yml.features.styles)}
                  margin="7px 0"
                  padding="0px 20px"
                  textShadow="0px 0px 4px black"
                  textAlign="left"
                  color={Colors.white}>{'• '}{f}</Paragraph>
              )}
            {yml.features.text && 
              <Paragraph
                  isActive
                  style={JSON.parse(yml.features.styles)}
                  margin="7px 0"
                  padding="0px 0px"
                  textShadow="0px 0px 4px black"
                  textAlign="left"
                  color={Colors.white}>{yml.features.text}</Paragraph>
            }
          </Div>
          <Div
            flexDirection="column"
            size="12"
            size_tablet="10"
            width="100%"
            width_tablet="65%"
            // size_lg="4"
            // size_sm="6"
            // size_xs="12"
            margin="0"
            textAlign_sm="center"
            margin_md="0 auto 0 70px"
          >
            <LeadForm
              background={Colors.white}
              margin_tablet="18px 38px"
              margin="18px 10px"
              style={{ marginTop: "50px", minHeight: "350px" }}
              selectProgram={programs}
              formHandler={actionFormHandler()}
              heading={yml.form.heading}
              motivation={yml.form.motivation}
              sendLabel={yml.form.button_label}
              redirect={yml.form.redirect}
              inputBgColor="#FFFFFF"
              layout="block"
              lang={pageContext.lang}
              fields={yml.form.fields}
              data={preData}
              justifyContentButton="center"
              marginButton="15px auto 30px auto"
              marginButton_tablet="15px 0 30px auto"
            />
          </Div>
        </GridContainer>
      </StyledBackgroundSection>

      {
        Object.keys(components)
          .filter(name => components[name] && (landingSections[name] || landingSections[components[name].layout]))
          .sort((a, b) => components[b].position > components[a].position ? -1 : 1)
          .map(name => {
            const layout = components[name].layout || name;
            return landingSections[layout]({...props, yml: components[name], session, course: yml.meta_info.utm_course, location: components.meta_info.utm_location})
          })
      }

      <GridContainerWithImage id="bottom" background={Colors.verylightGray} imageSide={applySchollarship?.imageSide} padding="0" padding_tablet="80px 0 90px 0" columns_tablet="14" margin="0" margin_tablet="0">
        <Div flexDirection="column" margin="0" justifyContent_tablet="start" padding="0" padding_tablet="0 30px"
        gridArea_tablet={applySchollarship?.imageSide === "right" ? "1/1/1/6" : "1/7/1/13"}
        // gridArea_tablet="1/1/1/6"
        >
          <Div
            flexDirection="column"
            size="12"
            size_tablet="12"
            width="100%"
            width_tablet="100%"
            // size_lg="4"
            // size_sm="6"
            // size_xs="12"
            margin="0"
            textAlign_sm="center"
            // margin_md="0 auto 0 70px"
          >
            <LeadForm
              landingTemplate
              titleMargin="20px 0px 15px 0px"
              titleMargin_tablet="20px 0px 15px 0px"
              textPadding_tablet="6px 0px 20px 0px"
              textPadding="6px 0px 20px 0px"
              selectProgram={programs}
              layout="block"
              background={Colors.verylightGray}
              margin="0"
              formHandler={actionFormHandler()}
              heading={yml.form.heading}
              style={{ minHeight: "350px" }}
              motivation={yml.form.motivation}
              sendLabel={yml.form.button_label}
              redirect={yml.form.redirect}
              inputBgColor="#FFFFFF"
              lang={pageContext.lang}
              fields={yml.form.fields}
              data={preData}
              justifyContentButton="center"
              marginButton="15px auto 30px auto"
              marginButton_tablet="15px 0 30px auto"
            />
          </Div>
        </Div>
        <Div height="auto" width="100%" gridArea_tablet={applySchollarship?.imageSide === "right" ? "1/7/1/13" : "1/1/1/6"} style={{position: "relative"}}>
          {
            applySchollarship?.imageSide === "right" ? (
              <>
                {/* <Div display="none" display_md="flex" style={{position: "absolute", background: "#F5F5F5", width: "101%", height: "282px", top: "-25px", left: "-35px", borderRadius: "3px"}}/> */}
                <Div display="none" display_md="flex" style={{position: "absolute", background: Colors.yellow, width: "280px", height: "446px", bottom: "-10px", right: "-16px", borderRadius: "3px"}}/>
              </>
            ) : (
                <>
                  <Div display="none" display_md="flex" style={{position: "absolute", background: Colors.lightBlue, width: "101%", height: "282px", top: "40px", left: "-30px", borderRadius: "3px"}}/>
                </>
            )
          }
          <StyledBackgroundSection
            height={`350px`}
            // width={`85%`}
            borderRadius={`3px`}
            image={applySchollarship 
              ? applySchollarship?.image.childImageSharp.gatsbyImageData 
              : data.allPageYaml.edges[0].node.list[0].image.childImageSharp.gatsbyImageData}
            bgSize={`contain`}
            alt="geekforce image"
          />
        </Div>
      </GridContainerWithImage>

    </>
  )
};
export const query = graphql`
  query LandingNonavQuery($file_name: String!, $lang: String!, $utm_course: String!) {
    allPageYaml(filter: { fields: { file_name: { regex: "/geekpal/" }, lang: { eq: $lang }}}) {
      edges {
        node {
          list {
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 800
                  placeholder: NONE
                  quality: 100
                )
              }
            }
          }
        }
      }
    }
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
                number
              }
            }
            navbar{
              logoUrl
              buttonText
              buttonUrl
            }
            form{
              heading
              motivation
              action_form_handler
              redirect
              fields
              button_label
            }
            features{
              marginTop
              text
              bullets
              styles
            }
            badges{
              position
              heading
            }
            about4Geeks{
              position
              heading
              sub_heading
              list{
                title
              }
              paragraph
              button_text
              button_link
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 1200
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              image_mobile {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 800
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
            iconogram {
              position
              icons {
                icon
                title
              }
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
              footer {
                text
                text_link
              }
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
              featured {
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
                # featured
              }
            }
            choose_your_program{
              position
              title
              paragraph
              programs {
                text_link
                link
                sub_title
                title
                description
                icon
              }
            }

            why_python{
              position
              heading
              sub_heading
            }
            apply_schollarship{
              imageSide
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    width: 800
                    placeholder: NONE
                    quality: 100
                  )
                }
              }
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
              sub_heading{
                text
                font_size
              }
              background
              containerBackground
              bullets
              content{
                text
                font_size
              }
            }
            header_data{
              tagline
              sub_heading
              image_filter
              scholarship {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 500
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxWidth: 1000){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              image{
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 1000
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxWidth: 1000){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
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
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  height: 200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxHeight: 200){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
                # fixed(width: 250, height: 250) {
                #   ...GatsbyImageSharpFixed
                # }
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
                  # fluid(maxWidth: 150){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              featured
            }
          }
        }
      }
    }
    allChooseProgramYaml(filter: { fields: { lang: { eq: $lang }}}) {
      edges {
        node {
          programs{
            text
            link
            bc_slug
            location_bc_slug
            schedule
          }
        }
      }
    }
  }
`;

export default BaseRender(Landing, {
  landingNavbar: true,
  landingFooter: true,
});
