import React, {useState, useEffect, useContext, useRef} from 'react';
import Link from 'gatsby-link'
import styled from 'styled-components';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, WrapperImage, Divider, Sidebar, Div} from '../components/Sections'
import {H1, Title, Paragraph, H5} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, Circle, RoundImage, Utensils, Coffee, Dumbbell, LaptopCode, FileCode} from '../components/Styling'
import GeeksVsOthers from '../components/GeeksVsOthers'
import PricesAndPayment from '../components/PricesAndPayment'
import AlumniProjects from '../components/AlumniProjects'
import BaseRender from './_baseRender'
import ProgramSelector from '../components/ProgramSelector'
import {requestSyllabus} from "../actions";
import WhoIsHiring from '../components/WhoIsHiring';
// import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import LeadForm from "../components/LeadForm/index.js";
import ProgramDetails from '../components/ProgramDetails';
import SyllabusSVG from "../assets/images/syllabus.inline.svg";

const Program = ({data, pageContext, yml}) => {

  const geek = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);

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
            <Button width="200px" color="red" margin="0" textColor=" white">{yml.button.apply_button_text}</Button>
          </Link>
        </Column>
        <Column align="left" size="6" size_xs="12" align_sm="center">
          <Button width="200px" onClick={() => setOpen(true)} color={Colors.blue} margin="0" textColor=" white">{yml.button.syllabus_button_text}</Button>
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

    <Wrapper  margin="50px 0 0 0">
      <Title
          size="10"
          marginTop="40px"
          title={yml.details.heading}
          paragraph={yml.details.sub_heading}
          variant="primary"
      />
      <ProgramDetails details={yml.details} />
    </Wrapper>
    
    <Wrapper
      margin="100px"
      background={Colors.lightGray}
      border="top">
      <WhoIsHiring
        margin="50px"
        tagline={yml.potential_companies.tagline}
        subheading={yml.potential_companies.sub_heading}
        images={yml.potential_companies.companies}
      />
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

    {/* GEEKPAL && GEEKFORCE SECTION */}
    {/* ---------------------------- */}
    <Wrapper margin="50px 0">
      <Row >
        <Column size="6" paddingLeft={`0`}>
          <Card
            h_xs="400px"
            h_sm="370px"
            h_md="470px"
            h_lg="470px"
            h_xl="470px"
            padding="20px"
            shadow height="400px"
            width="100%"
            margin="10px 0px"
            transform="translateY(-100px)"
          >
            <Row height="100%">
              <Column size="10" customRespSize respSize="10" display={`flex`} flexDirection={`column`} justifyContent={`space-between`}>
                <Div flexDirection={`column`} height={`20%`} justifyContent={`space-between`}>
                  <Row marginLeft="0px" height={`70%`} >
                    <RoundImage url="/images/geekpal.png" bsize="contain" height="100%" position="left" />
                  </Row>
                  <Row height={`20%`}>
                    <Column size="12">
                      <Paragraph
                        fs_xs="10px"
                        fs_sm="10px"
                        fs_md="11px"
                        fs_lg="12px"
                        fs_xl="16px"
                        color={Colors.black}
                        align_xs="left">
                        {geek.geek_data.geek_pal_heading}
                      </Paragraph>
                    </Column>
                  </Row>
                </Div>
                <Div flexDirection={`column`} height={`80%`} justifyContent={`space-between`}>
                  <Row marginTop="15px" height={`100%`}>
                    <Column size="12" display={`flex`} flexDirection={`column`} justifyContent={`space-evenly`}>
                      {geek.geek_data.geek_pal.map((pal, index) => {
                        return (
                          <Row key={index} marginBottom="4px">
                            <Column size="1" customRespSize respSize="1" alignSelf="center">
                              <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                            </Column>
                            <Column size="8" customRespSize respSize="8" test paddingRight="0px" paddingLeft="5px" alignSelf="center">
                              <Paragraph
                                fs_xs="10px"
                                fs_sm="10px"
                                fs_md="12px"
                                fs_lg="12px"
                                fs_xl="14px"
                                color={Colors.gray}>{pal}</Paragraph>
                            </Column>
                          </Row>
                        )
                      })}
                    </Column>
                  </Row>
                </Div>
              </Column>
              <Column size="2" customRespSize respSize="2" alignSelf="flex-end">
                <Link to={`/${pageContext.lang}/geekpal`}>
                  <ArrowRight width="24px" color={Colors.yellow} fill={Colors.yellow} />
                </Link>
              </Column>
            </Row>
          </Card>
        </Column>
        <Column size="6" paddingRight={`0`}>
          <Card
            h_xs="400px"
            h_sm="400px"
            h_md="470px"
            h_lg="470px"
            h_xl="470px"
            padding="20px"
            shadow
            height="400px"
            width="100%"
            margin="10px 0px"
            transform="translateY(-100px)"
          >
            <Row height="100%">
              <Column size="10" customRespSize respSize="10" display={`flex`} flexDirection={`column`} justifyContent={`space-between`}>
                <Div flexDirection={`column`} height={`20%`}>
                  <Row marginLeft="0px" height={`70%`}>
                    <RoundImage url="/images/geekforce.png" bsize="contain" height="100%" position="left" />
                  </Row>
                  <Row height={`20%`}>
                    <Column size="12">
                      <Paragraph fontSize="16px" color={Colors.black} customTextAlignSmall
                        align_xs="left">
                        {geek.geek_data.geek_force_heading}
                      </Paragraph>
                    </Column>
                  </Row>
                </Div>
                <Div flexDirection={`column`} height={`80%`} justifyContent={`space-between`}>
                  <Row marginTop="15px" height={`100%`}>
                    <Column size="12" display={`flex`} flexDirection={`column`} justifyContent={`space-evenly`}>
                      {geek.geek_data.geek_force.map((pal, index) => {
                        return (
                          <Row key={index} marginBottom="2px" >
                            <Column size="1" customRespSize respSize="1" alignSelf="center">
                              <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                            </Column>
                            <Column size="8" customRespSize respSize="8" paddingRight="0px" paddingLeft="5px" alignSelf="center">
                              <Paragraph fs_xs="10px"
                                fs_sm="10px"
                                fs_md="11px"
                                fs_lg="12px"
                                fs_xl="14px" color={Colors.gray}>{pal}</Paragraph>
                            </Column>
                          </Row>
                        )
                      })}
                    </Column>
                  </Row>
                </Div>
              </Column>
              <Column size="2" customRespSize respSize="2" alignSelf="flex-end">
                <Link to={`/${pageContext.lang}/geekforce`}>
                  <ArrowRight width="24px" color={Colors.yellow} fill={Colors.yellow} />
                </Link>
              </Column>
            </Row>
          </Card>
        </Column>
      </Row>
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
              syllabus_button_text
              syllabus_submit_text
              apply_button_text
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
              geek_force
              geek_pal
              geek_pal_heading
              geek_force_heading
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