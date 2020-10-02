import React, {useState, useEffect, useContext, useRef} from 'react';
import Link from 'gatsby-link'
import styled from 'styled-components';
import {GeekCard} from '../components/Card'
import {Container, Row, Column, Wrapper, WrapperImage, Divider, Sidebar, Div} from '../components/Sections'
import {H1, H2, Title, Paragraph, H5} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, Circle, RoundImage, Utensils, Coffee, Dumbbell, LaptopCode, FileCode} from '../components/Styling'
import GeeksVsOthers from '../components/GeeksVsOthers'
import PricesAndPayment from '../components/PricesAndPayment'
import AlumniProjects from '../components/AlumniProjects'
import BaseRender from './_baseRender'
import ProgramSelector from '../components/ProgramSelector'
import {requestSyllabus} from "../actions";
import WhoIsHiring from '../components/WhoIsHiring';
import Modal from '../components/Modal';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import LeadForm from "../components/LeadForm/index.js";
import ProgramDetails from '../components/ProgramDetails';
import ProgramDetailsMobile from '../components/ProgramDetailsMobile';
import {SessionContext} from '../session'

const Program = ({data, pageContext, yml}) => {

  const {session} = React.useContext(SessionContext);
  
  const geek = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);

  const apply_button_text = session && session.location ? session.location.button.apply_button_text : "Apply";
  const syllabus_button_text = session && session.location ? session.location.button.syllabus_button_text : "Download Syllabus";

  return (<>
    <WrapperImage
      github="/course"
      imageData={yml.header.image && yml.header.image.childImageSharp.fluid}
      backgroundPosition={yml.header.image_position}
      className={`img-header`}
      bgSize={`cover`}
      alt={yml.header.alt}
      paddingRight={`0`}
      customBorderRadius="0 0 0 1.25rem"

    >
      <H1
        size="5"
        variant="main"
        marginTop="100px"
        m_sm="50px 0 0 0"
        color={Colors.white}
        fontSize="46px"
        align="center"

      >{yml.header.tagline_top}</H1>
      <Title
        size="5"
        title={yml.header.tagline}
        variant="main"
        marginTop="0"
        color={Colors.white}
        fontSize="46px"
        textAlign="center"
        paragraph={yml.header.sub_heading}
        paragraphColor={Colors.white}
        margin="0"
      />
      <H5 color={Colors.white} align="center" fontSize="18px">{yml.header.subsub_heading}</H5>
      <Row align="center" marginTop="20px" marginBottom="50px">
        <Column align="right" size="6" size_xs="12" align_sm="center" m_sm="0px 0px 15px 0px">
          <Link to={yml.button.apply_button_link}
              state={{ course: yml.meta_info.bc_slug }}
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
        <LeadForm heading="Request Syllabus" formHandler={requestSyllabus} handleClose={() => setOpen(false)} 
          lang={pageContext.lang}
          data={{ 
            course: { value: yml.meta_info.bc_slug, valid: true }
          }}
        />
      </Modal>
      <Divider height="100px" md="0px" />
    </WrapperImage>

    
    <Wrapper
      margin="100px"
      border="top">
      <WhoIsHiring
        margin="50px"
        tagline={yml.potential_companies.tagline}
        subheading={yml.potential_companies.sub_heading}
        images={yml.potential_companies.companies}
      />
    </Wrapper>

    <Wrapper  margin="50px 0 0 0">
      <Title
          size="10"
          marginTop="40px"
          title={yml.details.heading}
          paragraph={yml.details.sub_heading}
          variant="primary"
      />
      <ProgramDetails details={yml.details} />
      <ProgramDetailsMobile details={yml.details} />
    </Wrapper>

    {/* GEEKPAL && GEEKFORCE SECTION */}
    {/* ---------------------------- */}
    <Wrapper
      margin="50px"
    >
      <Column size="12" color="#1898CC" margin="-20px auto 30px auto" padding="20px" p_sm="20px 5px" borderRadius="20px">
        <H2 margin="10px" fontSize="34px" fs_sm="28px" fs_xs="22px" color="white">{yml.geek_data.heading}</H2>
        <Row padding="0px 40px" p_md="0 10px">
            <Column size="6" size_sm="12" paddingLeft={`0`} p_sm="0">
              <GeekCard 
                icon={ArrowRight}
                to={`/${pageContext.lang}/geekforce`}
                image="/images/geekforce.png"
                heading={geek.geek_data.geek_force_heading}
                bullets={geek.geek_data.geek_force}
              />
            </Column>
            <Column size="6" size_sm="12" paddingRight={`0`} p_sm="0">
              <GeekCard 
                icon={ArrowRight}
                to={`/${pageContext.lang}/geekforce`}
                image="/images/geekpal.png"
                heading={geek.geek_data.geek_pal_heading}
                bullets={geek.geek_data.geek_pal}
              />
            </Column>
        </Row>
      </Column>
    </Wrapper>

    <Wrapper margin="50px 0">
      <Title
        size="10"
        title={yml.geeks_vs_others.heading}
        paragraph={yml.geeks_vs_others.sub_heading}
        variant="primary"
      />
      <GeeksVsOthers lang={pageContext.lang} limit={5} />
    </Wrapper>

    <Wrapper
      
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
        course="software_engineering"
      />
    </Wrapper>

    <Wrapper
      margin="50px 0"
      
    >
      <Title
        size="10"
        title={yml.alumni.heading}
        paragraph={yml.alumni.sub_heading}
        maxWidth="66%"
        variant="primary"
      />
      <AlumniProjects hasTitle lang={data.allAlumniProjectsYaml.edges} limit={2} />
    </Wrapper>
  </>
  )
};

export const query = graphql`
  query CourseEngineeringQuery($file_name: String!, $lang: String!) {
    allCourseYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            header{
              tagline_top
              tagline
              sub_heading
              subsub_heading
              image_position
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
              syllabus_submit_text
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
        }
      }
    }
    allAlumniProjectsYaml(filter: { fields: { lang: { eq: $lang }}}){
      edges {
        node {
          header{
            tagline
            sub_heading
            button_text
          }
          projects {
              project_name
              slug
              project_image{
                  image {
                      childImageSharp {
                        fluid(maxWidth: 800){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    } 
                  image_alt
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
            slug
            value
            symbol
            symbol_position
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
            software_engineering {
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
          }
          
        }
      }
    }
  }
`;



const Header = styled.div`
    background: black;
    border-radius: 1.25rem 1.25rem 0 0;
    height: ${props => props.height};
    color: white;
    font-family: 'lato', sans-serif;
    font-size: 14px;
    font-weight: 800;
    align-items: center;
`;
const Body = styled.div`
    background: white;
    height: ${props => props.height};
    border-radius: 0 0 1.25rem 1.25rem;`

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 5,
    left: 'calc(-50% + 5px)',
    right: 'calc(50% + 5px)',
    color: 'black'
  },
  active: {
    '& $line': {
      borderColor: Colors.white,
    },
  },
  completed: {
    '& $line': {
      borderColor: Colors.yellow,
    },
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: Colors.blue,
  },
  line: {
    borderColor: 'white',
    borderTopWidth: 1,
    borderRadius: 1,
  },
})(StepConnector);
const useQontoStepIconStyles = makeStyles({
  root: {
    color: 'black',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: Colors.blue,
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});
function QontoStepIcon (props) {
  const classes = useQontoStepIconStyles();
  const {active, completed} = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: Colors.yellow,
    width: 12,
    height: 12,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: Colors.yellow
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon (props) {
  const classes = useColorlibStepIconStyles();
  const {active, completed} = props;

  const icons = {
    1: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />,
    2: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />,
    3: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps (day) {
  return [
    {icon: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[0].time},
    {icon: <Coffee width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[1].time},
    {icon: <FileCode width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[2].time},
    {icon: <LaptopCode width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[3].time},
    {icon: <Utensils width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[4].time},
    {icon: <Dumbbell width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[5].time},
  ];
}
export default BaseRender(Program);