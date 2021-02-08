import React from 'react';
import {Link} from "gatsby";
import BaseRender from './_baseLayout'
import {Card, GeekCard} from '../components/Card'
import {Container, Row, Column, Wrapper, WrapperImage, Divider, Sidebar, Div} from '../new_components/Sections'
import {Title, H1, H2, H3, H4, H5, Span, Paragraph} from '../new_components/Heading'
import {Button, Colors} from '../new_components/Styling'
import {requestSyllabus} from "../actions";
import {SessionContext} from '../session'
import ProgramDetails from '../new_components/ProgramDetails';
import ProgramDetailsMobile from '../components/ProgramDetailsMobile';
import PricesAndPayment from '../new_components/PricesAndPayment';
import Modal from '../components/Modal';
import TypicalDay from '../components/TypicalDay';
import AlumniProjects from '../new_components/AlumniProjects';
import ProgramSelector from '../components/ProgramSelector';
import Badges from '../new_components/Badges';
import TechsWeTeach from '../new_components/TechsWeTeach';
import ProgramSVG from '../components/ProgramSVG';
import UpcomingDates from '../new_components/UpcomingDates';
import GeeksInfo from '../new_components/GeeksInfo';
import Testimonials from '../new_components/Testimonials';
import OurPartners from '../new_components/OurPartners';


const Program = ({data, pageContext, yml}) => {
  const {session} = React.useContext(SessionContext);
  const courseDetails = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;

  const program_type = yml.meta_info.slug.includes("full-time") ? "full_time" : "part_time"

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let week = "";
  {
    pageContext.slug === "full-stack-web-development-bootcamp-full-time" || pageContext.slug === "desarrollo-web-full-stack-bootcamp-full-time"
      ? week = 9
      : pageContext.slug === "full-stack-web-development-bootcamp-part-time" || pageContext.slug === "desarrollo-web-full-stack-bootcamp-part-time"
        ? week = 16
        : pageContext.slug === "coding-introduction" || pageContext.slug === "introduccion-programacion"
        && null
  }

  const apply_button_text = session && session.location ? session.location.button.apply_button_text : "Apply";
  const syllabus_button_text = session && session.location ? session.location.button.syllabus_button_text : "Download Syllabus";

  return (<>
    <Container
      variant="fluid"
      margin="120px auto">
      <Div
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <H1
          fontSize="13px"
          lineHeight="16px"
          fontWeight="700"
          letterSpacing="0.05em"
          color="#606060"
        >Coding Bootcamp</H1>
        <H2 fontSize="50px" lineHeight="60px" margin="16px 17px 19px 17px">{`< Full Stack Developer and other stuff>`}</H2>
        <Paragraph margin="0 17px 19px 17px" width_sm="70%" width_tablet="50%">Aprende desde cero hasta tener tu primer trabajo como programador. Recibe mentoría ilimitada, soporte de por vida
        y consigue un trabajo como programador en 16 semanas después de empezar.</Paragraph>

        <Link to={yml.button.apply_button_link}
          state={{course: yml.meta_info.bc_slug}}
        >
          <Button width="200px" color={Colors.blue} margin="10px 0" textColor="white">{apply_button_text}</Button></Link>
        <Button outline width="200px" onClick={handleOpen} color={Colors.black} margin="10px 0" textColor={Colors.black}>{syllabus_button_text}</Button>
      </Div>
      <Container variant="fixed">
        <Badges lang={pageContext.lang} />
      </Container>
    </Container>

    <ProgramDetails details={courseDetails.details} lang={pageContext.lang} course={program_type} />
    <TechsWeTeach lang={pageContext.lang} />
    <GeeksInfo lang={pageContext.lang} />
    <UpcomingDates lang={pageContext.lang} />


    {/* <WrapperImage
      github="/course"
      filter="brightness(0.4)"
      imageData={yml.header.image && yml.header.image.childImageSharp.fluid}
      className={`img-header`}
      bgSize={`cover`}
      alt={yml.header.alt}
      paddingRight={`0`}
      customBorderRadius="0 0 0 1.25rem"
    >
      <ProgramSelector lang={pageContext.lang} week={week} context={pageContext} marginTop="70px" />
      <Title
        type="h1"
        size="5"
        marginTop="40px"
        title={yml.header.tagline}
        variant="main"
        color={Colors.white}
        paragraph={yml.header.paragraph}
        paragraphColor={Colors.white}
        fontSize="46px"
        fs_xs="40px"
        textAlign="center"
      />
      <Row display="flex" justifyContent="center" marginBottom="50px">
        <Column align="right" size="6" align_sm="center" m_sm="0px 0px 15px 0px" size_sm="12" align="right">
          <Link to={yml.button.apply_button_link}
            state={{course: yml.meta_info.bc_slug}}
          >
            <Button width="200px" color="red" margin="0" textColor="white">{apply_button_text}</Button></Link>
        </Column>
        <Column align="left" size="6" align_sm="center" size_sm="12" align="left">
          <Button width="200px" onClick={handleOpen} color={Colors.blue} margin="0" textColor=" white">{syllabus_button_text}</Button>
        </Column>
      </Row>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <LeadForm
          style={{marginTop: "50px"}}
          heading={yml.button.syllabus_heading}
          motivation={yml.button.syllabus_motivation}
          sendLabel={syllabus_button_text}
          formHandler={requestSyllabus}
          handleClose={handleClose}
          lang={pageContext.lang}
          data={{
            course: {type: "hidden", value: yml.meta_info.bc_slug, valid: true}
          }}
        />
      </Modal>
      <Divider height="100px" md="0px" />
    </WrapperImage> */}

    {/* PROGRAM DETAILS */}
    {/* <Wrapper >
      <Title
        size="10"
        marginTop="40px"
        title={yml.details.heading}
        paragraph={yml.details.sub_heading}
        variant="primary"
      />
      <ProgramDetails details={courseDetails.details} lang={pageContext.lang} course={program_type} />
      <ProgramDetailsMobile details={courseDetails.details} lang={pageContext.lang} course={program_type} />
    </Wrapper> */}


    <Container variant="fixed" margin="50px auto" style={{position: "relative"}}>
      <H2>{yml.prices.heading}</H2>
      <Paragraph margin="0 0 50px 0">{yml.prices.sub_heading}</Paragraph>

      <PricesAndPayment
        type={pageContext.slug}
        lang={pageContext.lang}
        session={session}
        locations={data.allLocationYaml.edges}
        course={program_type}
      />
    </Container>
    <Container variant="fluid">
      <H2>{yml.alumni.heading}</H2>
      <Paragraph margin="0 0 50px 0">{yml.alumni.sub_heading}</Paragraph>
      <AlumniProjects hasTitle lang={data.allAlumniProjectsYaml.edges} limit={2} />
    </Container>
    <Container variant="fluid" background="#f5f5f5" height="425px" padding="48px 0 36px 0" margin="50px 0">

      <Testimonials lang={data.allTestimonialsYaml.edges} />
    </Container>

    <Container
      variant="fluid"
    >
      <OurPartners images={hiring.partners.images}></OurPartners>
    </Container>


    {/* PRICING */}
    {/* <Wrapper
      margin="50px 0"
      github="/course"
    >
    </Wrapper> */}

    {/* {program_type === "full_time" && <TypicalDay data={yml.typical} />} */}

    {/* ALUMNI PROJECTS */}
    {/* <Wrapper
      margin="75px 0"
    >
      <Title
        size="10"
        title={yml.alumni.heading}
        paragraph={yml.alumni.sub_heading}
        maxWidth="80%"
        margin="auto"
        variant="primary"
      />
    </Wrapper> */}
    {/* </div> */}
  </>
  )
};

export const query = graphql`
  query CourseQuery($file_name: String!, $lang: String!) {
    allCourseYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            header{
              tagline
              paragraph
              image {
                childImageSharp {
                  fluid(maxWidth: 1200){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            alt
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
                }
              }
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
            syllabus{
              heading
              button_label
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
            full_time {
              center_section {
                header {
                  sub_heading
                  heading_one
                  heading_two
                }
                plans {
                  months
                  payment
                  paymentInfo
                  provider
                  logo
                  message
                }
              }
              left_section {
                content {
                  price
                  price_info
                }
                header {
                  heading_one
                  heading_two
                  sub_heading
                }
              }
              right_section {
                content {
                  price
                  price_info
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

                header {
                  heading_two
                  sub_heading
                  heading_one
                }
                plans {
                  months
                  payment
                  paymentInfo
                  provider
                  logo
                  message
                }
              }
              left_section {

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
              right_section {

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
          }
          
        }
      }
    }
  }
`;

export default BaseRender(Program);