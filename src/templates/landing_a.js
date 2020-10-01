import React from 'react';
import {graphql} from 'gatsby';
import Why4Geeks from '../components/Why4Geeks';
import News from '../components/News'
import GeeksVsOthers from '../components/GeeksVsOthers'
import ChooseProgram from '../components/ChooseProgram'
import JobsStatistics from '../components/JobsStatistics';
import LeadForm from "../components/LeadForm/index.js";
import {H1, H2, H4, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowRight, StyledBackgroundSection} from '../components/Styling'
import {Card} from '../components/Card'
import WhoIsHiring from '../components/WhoIsHiring';
import AlumniProjects from '../components/AlumniProjects'
import Credentials from '../components/Credentials'
import BaseRender from './_baseRender'
import Testimonials from '../components/Testimonials'
import Events from '../components/Events'
import Loc from '../components/Loc'
import {Link, navigate} from 'gatsby';
import {requestSyllabus} from "../actions";
import {SessionContext} from '../session.js'
import Img from "gatsby-image"

const Landing = (props) => {
  const {session} = React.useContext(SessionContext);
  const {data, pageContext, yml} = props;
  const city = session && session.location ? session.location.reliable ? session.location.city : "" : "Miami";
  
  return (
    <>
      <Row className="d-sm-none">
          <StyledBackgroundSection
            className={`image`}
            height={`500px`}
            image={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
            bgSize={`cover`}
            width="50%"
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
          <H2
            type="h1"
            padding="0 10px 0 0px"
            color={Colors.white}
            fs_sm="38px"
            fs_md="30px"
            fs_lg="32px"
            fs_xl="38px"
            align="left" >{yml.header_data.tagline}<Span animated color={Colors.yellow}>_</Span>
          </H2>
          <H4 align="left" fontSize="18px" color={Colors.white} 
            margin="20px 0px 40px 0px" 
            m_sm="20px auto" 
            maxWidth="350px"
          >
            {yml.header_data.sub_heading}
          </H4>
          {Array.isArray(yml.features) && yml.features.map((f, i) => 
            <Paragraph margin="4px 0" color={Colors.white} key={i}>✅ {f}</Paragraph>
          )}
        </Column>
          </StyledBackgroundSection>
        <Column
          size="4"
          size_sm="6"
          size_xs="12"
          align_sm="center"
          margin="0 auto 0 0"
        >
          <LeadForm style={{marginTop: "50px"}} heading="Request More Info." formHandler={requestSyllabus} 
              lang={pageContext.lang}
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
            data={{ 
              course: { value: yml.meta_info.bc_slug, valid: true }
            }}
          />
      </StyledBackgroundSection>

      {/* CREDENTIALS CARDS */}

      <Wrapper>
        <Credentials lang={data.allCredentialsYaml.edges} />
      </Wrapper>

      <Wrapper>
          <News location={session && session.location && session.location.breathecode_location_slug} lang={pageContext.lang}  />
          <Why4Geeks lang={pageContext.lang} playerHeight="250px" />
      </Wrapper>
    </>
  )
};
export const query = graphql`
  query LandingAQuery($file_name: String!, $lang: String!) {
    allLandingYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
                crm{
                  course
                  location
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
            features
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
  }
`;

export default BaseRender(Landing, "landing");