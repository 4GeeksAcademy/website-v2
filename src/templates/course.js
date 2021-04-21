import React from 'react';
import {Link} from "gatsby";
import BaseRender from './_baseLayout'
import {Card, GeekCard} from '../components/Card'
import {Container, Row, Column, Wrapper, WrapperImage, Divider, Sidebar, Div} from '../components/Sections'
import {Title, H2, H3, H5, Span, Paragraph} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
import {requestSyllabus} from "../actions";
import {SessionContext} from '../session'
import GeeksVsOthers from '../components/GeeksVsOthers';
import ProgramDetails from '../components/ProgramDetails';
import ProgramDetailsMobile from '../components/ProgramDetailsMobile';
import PricesAndPayment from '../components/PricesAndPayment';
import LeadForm from '../components/LeadForm';
import Modal from '../components/Modal';
import TypicalDay from '../components/TypicalDay';
import AlumniProjects from '../components/AlumniProjects';
import ProgramSelector from '../components/ProgramSelector';
import ProgramSVG from '../components/ProgramSVG';


const Program = ({data, pageContext, yml}) => {
  const {session} = React.useContext(SessionContext);
  const courseDetails = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);

  const program_type = yml.meta_info.slug.includes("full-time") ? "full_time" : "part_time"

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const apply_button_text = session && session.location ? session.location.button.apply_button_text : "Apply";
  const syllabus_button_text = session && session.location ? session.location.button.syllabus_button_text : "Download Syllabus";

  return (<>
    <WrapperImage
      github="/course"
      filter="brightness(0.4)"
      imageData={yml.header.image && yml.header.image.childImageSharp.fluid}
      className={`img-header`}
      bgSize={`cover`}
      alt={yml.header.alt}
      paddingRight={`0`}
      customBorderRadius="0 0 0 1.25rem"
    >
      <ProgramSelector lang={pageContext.lang} week={yml.details.weeks} context={pageContext} marginTop="70px" />
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
    </WrapperImage>

    {/* PROGRAM DETAILS */}
    <Wrapper >
      <Title
        size="10"
        marginTop="40px"
        title={yml.details.heading}
        paragraph={yml.details.sub_heading}
        variant="primary"
      />
      <ProgramDetails details={courseDetails.details} lang={pageContext.lang} course={program_type} />
      <ProgramDetailsMobile details={courseDetails.details} lang={pageContext.lang} course={program_type} />
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
          sendLabel={yml.button.syllabus_btn_label}
          lang={pageContext.lang}
          formHandler={requestSyllabus}
          data={{
            course: {type: "hidden", value: yml.meta_info.bc_slug, valid: true}
          }}
        />
      </Wrapper>
    </Div>

    <Wrapper
      margin="0 0 50px 0"
    >
      <ProgramSVG lang={pageContext.lang} />
      {/* <SyllabusSVG className="d-sm-none w-100" /> */}
      <Column size="12" background="#1898CC" margin="-20px auto 30px auto" padding="20px" p_sm="20px 5px" borderRadius="20px">
        <H2 margin="10px" fontSize="34px" fs_sm="28px" fs_xs="22px" color="white">{yml.geek_data.heading}</H2>
        <Row display="flex" padding="0px 40px" p_md="0 10px">
          <Column size="6" size_sm="12" paddingLeft={`0`} p_sm="0">
            <GeekCard
              icon="arrowright"
              to={`/${pageContext.lang}/geekforce`}
              image="/images/geekforce.png"
              heading={courseDetails.geek_data.geek_force_heading}
              bullets={courseDetails.geek_data.geek_force}
            />
          </Column>
          <Column size="6" size_sm="12" paddingRight={`0`} p_sm="0">
            <GeekCard
              icon="arrowright"
              to={`/${pageContext.lang}/geekforce`}
              image="/images/geekpal.png"
              heading={courseDetails.geek_data.geek_pal_heading}
              bullets={courseDetails.geek_data.geek_pal}
            />
          </Column>
        </Row>
      </Column>
    </Wrapper>

    <Wrapper
      margin="50px"
    >
      <Title
        size="10"
        title={yml.geeks_vs_others.heading}
        paragraph={yml.geeks_vs_others.sub_heading}
        variant="primary"
      />
      <Divider height="50px" />
      <GeeksVsOthers lang={pageContext.lang} limit={5} />
    </Wrapper>

    {/* PRICING */}
    <Wrapper
      margin="50px 0"
      github="/course"
    >
      <Title
        size="10"
        title={yml.prices.heading}
        paragraph={yml.prices.sub_heading}
        variant="primary"
      />
      <PricesAndPayment
        type={pageContext.slug}
        lang={pageContext.lang}
        session={session}
        locations={data.allLocationYaml.edges}
        course={program_type}
      />
    </Wrapper>

    {program_type === "full_time" && <TypicalDay data={yml.typical} />}

    {/* ALUMNI PROJECTS */}
    <Wrapper
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
      <AlumniProjects hasTitle lang={data.allAlumniProjectsYaml.edges} limit={2} />
    </Wrapper>
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