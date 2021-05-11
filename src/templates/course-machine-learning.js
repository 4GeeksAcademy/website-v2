import React, {useState, useEffect, useContext, useRef} from 'react';
import Link from 'gatsby-link'
import {navigate} from "gatsby";
import {GeekCard} from '../components/Card'
import {Container, GridContainer, Row, Column, Wrapper, WrapperImage, Divider, Header, Div} from '../new_components/Sections'
import {H1, H2, Title, Paragraph, H5} from '../new_components/Heading'
import {Button, Colors} from '../new_components/Styling'
import ProgramDetails from '../new_components/ProgramDetails';
import ProgramDetailsMobile from '../new_components/ProgramDetailsMobile';
import TechsWeTeach from '../new_components/TechsWeTeach';
import GeeksInfo from '../new_components/GeeksInfo';
import OurPartners from '../new_components/OurPartners';
import BaseRender from './_baseLayout'
import {requestSyllabus} from "../actions";
import {SessionContext} from '../session'
import Testimonials from '../new_components/Testimonials';
import Badges from '../new_components/Badges';
import PricesAndPayment from '../new_components/PricesAndPayment';
import {Circle} from '../new_components/BackgroundDrawing'
import LeadForm from '../new_components/LeadForm';
import Modal from '../components/Modal';


const Program = ({data, pageContext, yml}) => {

  const {session} = React.useContext(SessionContext);
  const courseDetails = data.allCourseYaml.edges[0].node;
  const geek = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);

  const course_type = "machine_learning"
  const program_type = yml.meta_info.slug.includes("full-time") ? "full_time" : "part_time"

  const hiring = data.allPartnerYaml.edges[0].node;
  const apply_button_text = session && session.location ? session.location.button.apply_button_text : "Apply";
  const syllabus_button_text = session && session.location ? session.location.button.syllabus_button_text : "Download Syllabus";

  const partners = data.allPartnerYaml.edges[0].node.partners.images.filter(i => !Array.isArray(i.courses) || i.courses.includes("machine-learning")).sort((a, b) => Array.isArray(a.courses) && a.courses.includes("machine-learning") ? -1 : 1);

  console.log("TITLE MACHINE::", yml.prices)
  console.log("TITLE MACHINE::", data)
  return (<>
    <Header
      seo_title={yml.seo_title}
      title={yml.header.title}
      paragraph={yml.header.paragraph}
      padding_tablet="72px 0 40px 0"
      position="relative"
    >
      <Circle color="yellow" width="17px" height="17px" top="0" left="74px" zIndex="1" display="none" display_tablet="inline" opacity="0.2" />
      <Circle color="grey" width="17px" height="17px" top="0" left="106px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="black" width="17px" height="17px" top="32px" left="106px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="black" width="17px" height="17px" top="32px" left="74px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="grey" width="17px" height="17px" top="67px" left="74px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="grey" width="17px" height="17px" top="102px" left="74px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="grey" width="17px" height="17px" top="137px" left="106px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="grey" width="17px" height="17px" top="172px" left="106px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="blue" width="17px" height="17px" top="216px" left="74px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="grey" width="17px" height="17px" top="271px" left="106px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="red" width="27px" height="27px" top="222px" left="278px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="yellow" width="250px" height="250px" bottom="20px" right="-68px" opacity="0.2" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="grey" width="17px" height="17px" top="120px" right="50px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="black" width="17px" height="17px" top="120px" right="89px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="grey" width="17px" height="17px" top="120px" right="128px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="black" width="119px" height="11px" border="10px" bottom="115px" right="40px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="black" width="77px" height="11px" border="10px" bottom="115px" right="175px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="yellow" width="116px" height="116px" bottom="50px" left="-58px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="yellow" width="116px" height="116px" bottom="200px" left="-90px" zIndex="1" display="inline" display_tablet="none" />
      <Circle color="yellow" width="21px" height="21px" top="10px" right="320px" zIndex="1" display="none" display_tablet="inline" />
      <Circle color="blue" width="57px" height="57px" top="32px" right="61px" display="none" display_tablet="inline" />
      <Circle color="yellow" width="160px" height="160px" top="0" right="-120px" opacity="0.2" display="inline" display_tablet="none" />
      <Circle color="red" width="25px" height="25px" top="60px" right="30px" display="inline" display_tablet="none" />
      <Div flexDirection_md="row" flexDirection="column" justifyContent="center">
        <Link to={yml.button.apply_button_link}
          state={{course: yml.meta_info.bc_slug}}
        >
          <Button variant="full" width="fit-content" color={Colors.blue} padding="13px 24px" margin="10px 24px 10px 0" textColor="white">{apply_button_text}</Button>
        </Link>
        <Button variant="outline" width="200px" color={Colors.black} margin="10px 0 58px 0" textColor={Colors.black}>{syllabus_button_text}</Button>
        {/* <Button variant="outline" icon={<Icon icon="download" stroke={Colors.black} style={{marginRight: "10px"}} width="46px" height="46px" />} color={Colors.black} margin="10px 0 50px 0" margin_tablet="0" textColor={Colors.black}>{syllabus_button_text}</Button> */}
      </Div>
      <Badges lang={pageContext.lang} />
    </Header>
    <OurPartners background={Colors.verylightGray} images={hiring.partners.images} marquee></OurPartners>
    <ProgramDetails details={courseDetails.details} lang={pageContext.lang} course={program_type} background={Colors.white} />
    <ProgramDetailsMobile details={courseDetails.details} lang={pageContext.lang} course={program_type} />
    <TechsWeTeach lang={pageContext.lang} />
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

    <Container variant="fluid" background="linear-gradient(#f5f5f5, white)" height="425px" padding="48px 0 36px 0" margin="50px 0">
      <Testimonials lang={data.allTestimonialsYaml.edges} />
    </Container>

    <OurPartners images={hiring.partners.images} marquee></OurPartners>

    {/* <Wrapper
      github="/course"
    >
      <Title
        size="10"
        title={yml.prices.heading}
        paragraph={yml.prices.sub_heading}
        variant="primary"
      />
      <PricesAndPayment
        lang={pageContext.lang}
        session={session}
        type={pageContext.slug}
        locations={data.allLocationYaml.edges}
        course="machine_learning"
      />
    </Wrapper> */}


    <Wrapper
      github="/course"
    >
      <Title
        size="10"
        title={yml.faq.title}
        variant="primary"
      />
      {data.faqs.edges[0].node.faq.slice(0, 3).map(f => <ul>
        <li>
          <H5 margin="15px 0px">{f.question}</H5>
          <Paragraph>{f.answer}</Paragraph>
        </li>
      </ul>)
      }
      <Paragraph align="center" margin="10px 0">
        <Button variant="full" width="400px" onClick={() => navigate(`/${pageContext.lang}/contact`)} color={Colors.blue} margin="0" textColor="white">{yml.faq.read_more}</Button>
      </Paragraph>
    </Wrapper>

  </>
  )
};

export const query = graphql`
  query CourseMachineLearningQuery($file_name: String!, $lang: String!) {
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
                    fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              
          }
            button{
              syllabus_heading
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
            credentials{
              heading
              paragraph
            }
            details {
              about{
                title
                sub_title
                list{
                  label
                  content
                }
              }
              heading
              sub_heading
              facts{
                value
                label
              }
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
            teacher{
              picture{
                childImageSharp {
                  fluid(maxWidth: 500){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              greeting
              linkedin
              full_name
              bio
            }
            potential_companies{
              tagline
              sub_heading
              companies{
                name
                image{
                  childImageSharp {
                    fluid(maxWidth: 100){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
            geeks_vs_others{
              heading
              sub_heading
              sub_heading_link
            }
            prices{
              heading
              sub_heading
            }
            typical{
              heading
              sub_heading
              schedule{
                title
                time
                icon
                content
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
            faq{
              title
              link
              read_more
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
            coding {
              images {
                name
                image {
                  childImageSharp {
                    fluid(maxWidth: 100){
                      ...GatsbyImageSharpFluid_withWebp
                    }
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
                    fluid(maxWidth: 100){
                      ...GatsbyImageSharpFluid_withWebp
                    }
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
                    fluid(maxWidth: 100){
                      ...GatsbyImageSharpFluid_withWebp
                    }
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
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
      edges {
        node {
          heading
    button_text
    button_link
          testimonials {
            student_name
            testimonial_date
            hidden
            linkedin_url
            linkedin_text
            linkedin_image{
              childImageSharp {
                fluid(maxHeight: 14){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            student_thumb{
              childImageSharp {
                fluid(maxHeight: 200){
                  ...GatsbyImageSharpFluid_withWebp
                }
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
    allLocationYaml(filter: {fields: { lang: {eq: $lang}}, meta_info: { unlisted: {ne: true }}}){
      edges {
        node {
          id
          city
          country
          hasFinancialsOption
          financials_max_months
          active_campaign_location_slug
          breathecode_location_slug
          fields{
            lang
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
                fluid(maxWidth: 800){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            } 
          }
          
          prices {
            machine_learning {
              part_time{
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

{/* <BackgroundDrawing
      github="/course"
    >
      <H1
        size="5"
        variant="main"
        marginTop="100px"
        textShadow="none"
        m_sm="50px 0 0 0"
        color={Colors.black}
        fontSize="46px"
        align="center"

      >{yml.header.tagline_top}</H1>
      <Title
        size="5"
        title={yml.header.tagline}
        variant="main"
        textShadow="none"
        marginTop="0"
        color={Colors.black}
        fontSize="46px"
        textAlign="center"
        paragraph={yml.header.sub_heading}
        paragraphColor={Colors.grey}
        margin="0"
      />
      <H5 color={Colors.gray} align="center" fontSize="18px">{yml.header.subsub_heading}</H5>
      <Row display="flex" justifyContent="center" marginTop="20px" marginBottom="50px">
        <Column align="right" size="6" size_xs="12" align_sm="center" m_sm="0px 0px 15px 0px">
          <Link to={yml.button.apply_button_link}
            state={{course: yml.meta_info.bc_slug}}
          >
            <Button width="200px" color="red" margin="0" textColor=" white">{apply_button_text}</Button>
          </Link>
        </Column>
        <Column align="left" size="6" size_xs="12" align_sm="center">
          <Button width="200px" onClick={() => setOpen(true)} color={Colors.blue} margin="0" textColor=" white">{syllabus_button_text}</Button>
        </Column>
      </Row>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <LeadForm
          style={{marginTop: "50px"}}
          heading={yml.button.syllabus_heading}
          motivation={yml.button.syllabus_motivation}
          sendLabel={yml.button.syllabus_btn_label}
          formHandler={requestSyllabus}
          handleClose={() => setOpen(false)}
          lang={pageContext.lang}
          data={{
            course: {value: yml.meta_info.bc_slug, valid: true}
          }}
        />
      </Modal>
      <Divider height="100px" md="0px" />
    </BackgroundDrawing>


    <Wrapper
      margin="100px"
      border="top">
      <Title
        size="10"
        marginTop="40px"
        title={yml.description.heading}
        paragraph={yml.description.sub_heading}
        variant="primary"
      />
        {yml.description.content.split("\\n").map(text => 
          <Paragraph
            margin="0px 0px 20px 0px"
            fontSize="20px"
            lineHeight="20px"
          >
            {text}
          </Paragraph>
        )}

        <Row display="flex" marginTop="50px" marginLeft="10%"  marginRight="10%">
          <Column size="3" size_sm="12" pl_lg="0">
            <StyledBackgroundSection
              backgroundPosition="top center"
              height="200px"
              width="200px"
              image={yml.teacher.picture.childImageSharp.fluid}
              bgSize={`cover`}
              // alt={yml.about.about_image.alt}
              borderRadius={`50%`}
            />
          </Column>
          <Column size="8" size_sm="12" >
              <H4 align="left" margin="0px 0px 30px 0px">{`${yml.teacher.greeting} ${yml.teacher.full_name}`}</H4>
              {yml.teacher.bio.split("\\n").map(text => 
              <Paragraph
                margin="0px 0px 20px 0px"
                fontSize="20px"
                lineHeight="20px"
              >
                {text}
              </Paragraph>
            )}
            <Anchor cursor="pointer" color={Colors.blue} to={yml.teacher.linkedin}>Go to LinkedIn</Anchor>
          </Column>
        </Row>
    </Wrapper>

    <Wrapper margin="50px 0 0 0">
      <Title
        size="10"
        type="h2"
        marginTop="40px"
        title={yml.details.heading}
        paragraph={yml.details.sub_heading}
        variant="primary"
      />
      <ProgramDetails details={yml.details} lang={pageContext.lang} />
      <ProgramDetailsMobile details={yml.details} lang={pageContext.lang} />
    </Wrapper>

    <Div
      display="block"
      margin="50px 0px 0px 0px"
      m_sm="50px 0px"
      background={Colors.lightGray}
    >
      <Wrapper>
        <H5 fontSize="20px">{yml.syllabus.heading}</H5>
        <LeadForm
          style={{padding: "10px 0px", maxWidth: "100%"}}
          inputBgColor={Colors.white}
          layout="flex"
          lang={pageContext.lang}
          sendLabel={syllabus_button_text}
          formHandler={requestSyllabus}
          data={{
            course: {type: "hidden", value: yml.meta_info.bc_slug, valid: true}
          }}
        />
      </Wrapper>
    </Div>

    {/* GEEKPAL && GEEKFORCE SECTION */}
{/* ---------------------------- */}
    // <Wrapper
    //   margin="50px"
    // >
    //   <Column size="12" color="#1898CC" margin="-20px auto 30px auto" padding="20px" p_sm="20px 5px" borderRadius="20px">
    //     <H2 margin="10px" fontSize="34px" fs_sm="28px" fs_xs="22px" color="white">{yml.geek_data.heading}</H2>
    //     <Row display="flex" padding="0px 40px" p_md="0 10px">
    //       <Column size="6" size_sm="12" paddingLeft={`0`} p_sm="0">
    //         <GeekCard
    //           icon="arrowright"
    //           to={`/${pageContext.lang}/geekforce`}
    //           image="/images/geekforce.png"
    //           heading={geek.geek_data.geek_force_heading}
    //           bullets={geek.geek_data.geek_force}
    //         />
    //       </Column>
    //       <Column size="6" size_sm="12" paddingRight={`0`} p_sm="0">
    //         <GeekCard
    //           icon="arrowright"
    //           to={`/${pageContext.lang}/geekforce`}
    //           image="/images/geekpal.png"
    //           heading={geek.geek_data.geek_pal_heading}
    //           bullets={geek.geek_data.geek_pal}
    //         />
    //       </Column>
    //     </Row>
    //   </Column>
    // </Wrapper>

    // <Wrapper margin="50px 0">
    //   <Title
    //     size="10"
    //     title={yml.geeks_vs_others.heading}
    //     paragraph={yml.geeks_vs_others.sub_heading}
    //     variant="primary"
    //   />
    //   <GeeksVsOthers lang={pageContext.lang} limit={5} />
    // </Wrapper>

    // <Wrapper

    //   github="/course"
    // >
    //   <Title
    //     size="10"
    //     title={yml.prices.heading}
    //     paragraph={yml.prices.sub_heading}
    //     variant="primary"
    //   />
    //   <PricesAndPayment
    //     lang={pageContext.lang}
    //     session={session}
    //     type={pageContext.slug}
    //     locations={data.allLocationYaml.edges}
    //     course="machine_learning"
    //   />
    // </Wrapper> * /}