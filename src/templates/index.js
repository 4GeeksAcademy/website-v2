import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Why4Geeks from '../components/Why4Geeks';
import GeeksVsOthers from '../components/GeeksVsOthers'
import ChooseProgram from '../components/ChooseProgram'
import JobsStatistics from '../components/JobsStatistics';
import {H1, H2, H3, Title, Separator, Paragraph, Span} from '../components/Heading'
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
import {Link} from 'gatsby';
import {SessionContext} from '../session.js'
import Img from "gatsby-image"

const Home = (props) => {
  const {session} = React.useContext(SessionContext);
  const {data, pageContext, yml} = props;

  const hiring = data.allPartnerYaml.edges[0].node;
  const city = session && session.location ? session.location.city : "Miami";
  return (
    <>
      <Row>
        <Column 
          size="4" 
          m_sm="0" 
          size_sm="10" 
          align_sm="center" 
          padding="100px 10px 0 10px"
          margin="0 0 0 auto" 
        >
          <H1 type="h1" textShadow="none" fontSize="13px" color={Colors.gray} lato>{city}{" "}{yml.header_data.tagline}</H1>
          <Separator  variant="primary" left />
          <H2
            padding="0 10px 0 0px"
            fs_sm="38px"
            fs_md="30px"
            fs_lg="32px"
            fs_xl="38px"
            align="left" >{yml.header_data.title}<Span animated color={Colors.yellow}>_</Span>
          </H2>
          <Paragraph color={Colors.gray} margin="20px 0px" m_sm="20px auto" maxWidth="350px" align="left" fontSize="15px">{yml.header_data.sub_heading}</Paragraph>
          <ChooseProgram
            left="15px"
            top="40px"
            programs={data.allChooseProgramYaml.edges[0].node.programs}
            openLabel={data.allChooseProgramYaml.edges[0].node.close_button_text}
            closeLabel={data.allChooseProgramYaml.edges[0].node.open_button_text}
          />
        </Column>
        <Column
          size="6"
          border="bottom"
          height="500px"
          customRespSize
          disp_sm={"none"}
          disp_xs={"none"}
          paddingRight={`0`}
        >
          <StyledBackgroundSection
            className={`image`}
            height={`500px`}
            image={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
            bgSize={`cover`}
            alt="4Geeks Academy"
            borderRadius={`0 0 0 1.25rem`}
          />
        </Column>
      </Row>

      {/* CREDENTIALS CARDS */}

      <Wrapper>
        <Credentials up="80" lang={data.allCredentialsYaml.edges} />
      </Wrapper>

      {/* WHY 4GEEKS SECTION */}

      <Wrapper margin="50px 0">
        <Title
          title={yml.why_4geeks.heading + " " + city}
          variant="primary"
        />
        <Why4Geeks lang={pageContext.lang} playerHeight="250px" />
      </Wrapper>

      {/* JOBS STATISTICS SECTION */}

      <Wrapper>
        <JobsStatistics lang={data.allJobsStatisticsYaml.edges} />
      </Wrapper>

      <Wrapper margin="30px">
        <Row align="center" >
          <Column size="4" customRespSize respSize="4" margin="5px 0">
            <Paragraph
              margin="5px 0"
              color={Colors.gray}
              fs_xs="10px"
              fs_sm="12px"
              fs_md="12px"
              align="center">{yml.education.left_box.heading}
            </Paragraph>
            <Img className={`image`} fluid={yml.education.left_box.image.childImageSharp.fluid} alt="Florida Education Logo"></Img>
          </Column>
          <Column size="4" customRespSize respSize="4" margin="5px 0">
            <Paragraph
              margin="5px 0"
              color={Colors.gray}
              fs_xs="10px"
              fs_sm="12px"
              fs_md="12px"
              fs_lg="12px"
              fs_xl="12px"
              align="center">{yml.education.center_box.heading}
            </Paragraph>
            <Img className={`image`} fluid={yml.education.center_box.image.childImageSharp.fluid} alt="Newsweek Logo"></Img>
          </Column>
          <Column size="4" customRespSize respSize="4" margin="5px 0">
            <Paragraph
              margin="5px 0"
              color={Colors.gray}
              fs_xs="10px"
              fs_sm="12px"
              fs_md="12px"
              fs_lg="12px"
              fs_xl="12px"
              align="center">{yml.education.right_box.heading}
            </Paragraph>
            <Img className={`image`} fluid={yml.education.right_box.image.childImageSharp.fluid} alt="Cnn Logo"></Img>
          </Column>
        </Row>
        <Row>
          <Column size="4" customRespSize respSize="4" margin="5px 0"></Column>
          <Column size="4" customRespSize respSize="4" margin="5px 0">
            <Paragraph

              color={Colors.gray}
              fs_xs="10px"
              fs_sm="12px"
              fs_md="12px"
              fs_lg="12px"
              fs_xl="12px"
              align="center">2017 Report
            </Paragraph>
          </Column>
          <Column size="4" customRespSize respSize="4" margin="5px 0"></Column>
        </Row>
      </Wrapper>

      {/* GEEKS VS OTHERS SECTION */}

      <Wrapper margin="100px">
        <Title
          title={yml.geeks_vs_others.heading}
          paragraph={yml.geeks_vs_others.sub_heading}
          link={true}
          linkTo={yml.geeks_vs_others.sub_heading_link}
          paragraphColor={Colors.blue}
          variant="primary"
          size="10"
        />
        <GeeksVsOthers lang={data.allGeeksVsOthersYaml.edges} />
      </Wrapper>

      {/* ******************* */}
      {/* JOIN 4GEEKS SECTION */}
      {/* ******************* */}
      <Wrapper margin="100px">
        <Title
          title={yml.join_geeks.heading+" "+city}
          paragraph={yml.join_geeks.sub_heading}
          paragraphColor={Colors.darkGray}
          maxWidth="66%"
          margin="auto"
          variant="primary"
        />
        <Row github="/page/index.us.yml">
          <Column size="6" size_sm="12" >
            <Card
              padding="20px"
              shadow
              margin="10px 0px"
            >
              <RoundImage url="/images/geekpal.png" bsize="contain" height="40px" position="left" />
              <Paragraph
                color={Colors.black}
                margin="15px 0px 15px 0px"
                customTextAlignSmall
                align_xs="left">
                {yml.join_geeks.geek_data.geek_pal_heading}
              </Paragraph>
              <Paragraph
                // key={index}
                paddingRight="30px"
                color={Colors.gray}
                fontSize="14px"
                lineHeight="18px"
                customTextAlignSmall
                align_xs="left">
                {yml.join_geeks.geek_data.geek_pal_data.content}
              </Paragraph>
              <Column size="2" margin="0 0 0 auto" customRespSize align="right" paddingRight="0" respSize="2" alignSelf="flex-end">
                <Link to={yml.join_geeks.geek_data.geek_pal_data.icon_link}>
                  <ArrowRight width="24px" color={Colors.blue} fill={Colors.blue} />
                </Link>
              </Column>
            </Card>
          </Column>
          <Column size="6" size_sm="12">
            <Card
              padding="20px"
              shadow
              margin="10px 0px"

            >
              <RoundImage url="/images/geekforce.png" bsize="contain" height="40px" position="left" />
              <Paragraph color={Colors.black} customTextAlignSmall
                margin="15px 0px 15px 0px"
                align_xs="left">{yml.join_geeks.geek_data.geek_force_heading}</Paragraph>
              <Paragraph
                key="index"
                color={Colors.gray}
                fontSize="14px"
                paddingRight="30px"
                lineHeight="18px"
                align_xs="left">
                {yml.join_geeks.geek_data.geek_force_data.content}
              </Paragraph>
              <Column size="2" margin="0 0 0 auto" paddingRight="0" align="right" customRespSize respSize="2" alignSelf="flex-end">
                <Link to={yml.join_geeks.geek_data.geek_force_data.icon_link}>
                  <ArrowRight width="24px" color={Colors.blue} fill={Colors.blue} />
                </Link>
              </Column>
            </Card>
          </Column>
        </Row>
      </Wrapper>

      <Wrapper
        margin="100px"
        right={true}
        background={Colors.lightGray}
        border="top">
        <WhoIsHiring
          margin="50px"
          tagline={hiring.partners.tagline}
          subheading={hiring.partners.sub_heading}
          images={hiring.partners.images}
          footerTagline={hiring.partners.footer_tagline}
          footerLink={hiring.partners.footer_link}
          footerButton={hiring.partners.footer_button}
        />
      </Wrapper>

      <Wrapper
        margin="100px">
        <Title
          size="10"
          title={yml.alumni_header.heading}
          paragraph={yml.alumni_header.sub_heading}
          paragraphColor={Colors.darkGray}
          maxWidth="66%"
          margin="auto"
          variant="primary"
        />
        <AlumniProjects lang={data.allAlumniProjectsYaml.edges} hasTitle showThumbs="false" />
      </Wrapper>

      <Wrapper
        margin="100px">
        <Title
          variant="primary"
          title={yml.locations.heading}
          paragraph={yml.locations.sub_heading}
          paragraphColor={Colors.darkGray}
          maxWidth="66%"
          margin="auto"
        // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
        />
        <Loc lang={data.allLocationYaml.edges} />
      </Wrapper>
      <Wrapper margin="100px">
        <Title
          variant="primary"
          title={yml.testimonial_header.heading}
          paragraph={yml.testimonial_header.sub_heading}
          maxWidth="66%"
        // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
        />
        <Testimonials lang={data.allTestimonialsYaml.edges} />
      </Wrapper>

    </>
  )
};
export const query = graphql`
  query HomeBackupQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            header_data{
              tagline
              title
              sub_heading
              image{
                childImageSharp {
                  fluid(maxWidth: 800){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
           
            }
            
            geeks_vs_others{
                heading
                sub_heading
                sub_heading_link
            }
            why_4geeks{
              heading
              sub_heading
            }
            join_geeks {
                heading
                sub_heading
                geek_data {
                  geek_force_data{
                    content
                    icon_link
                  }
                  geek_pal_data{
                    content
                    icon_link
                  }
                    
                  geek_force_heading
                  geek_pal_heading
                }
            }
            education{
                left_box{
                    heading
                    image {
                      childImageSharp {
                        fluid(maxWidth: 300){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                        fixed(width: 300, height: 60) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                    alt
                }
                center_box{
                    heading
                    image {
                      childImageSharp {
                        fluid(maxWidth: 300){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                        fixed(width: 300, height: 60) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                    alt
                }
                right_box{
                    heading
                    image {
                      childImageSharp {
                        fluid(maxWidth: 300){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                        fixed(width: 300, height: 60) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                    alt
                }
            }
            locations{
                heading
                sub_heading
            }
            alumni_header{
                heading
                sub_heading
            }
            testimonial_header{
                heading
                sub_heading
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
      allJobsStatisticsYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
          node {
            id
            jobs {
              title
              slug
              sub_title
              value
              value_symbol
              chart_data
            }
          }
        }
     }
     allGeeksVsOthersYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
          node {
            info {
              features
              at4_Geeks
              industry_average
              tooltip
              icon
              slug
            }
            globe_text
            titles{
                featured
                at_geeks
                average
            }
            button{
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
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  alt
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
                  alt
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
                  alt
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
                  alt
                  featured
                }
                tagline
                sub_heading
              }
            }
          }
        }
        allLocationYaml(filter: {fields: { lang: {eq: $lang}}}) {
            edges {
              node {
                city
                meta_info {
                  slug
                  title
                  description
                  unlisted
                  position
                  image
                  keywords
                }
                seo_title
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
                      slug
                    }
                    part_time {
                      slug
                    }
                  }
                info_box {
                  heading
                  address
                  contact_heading
                  phone
                  email
                  image {
                    childImageSharp {
                      fluid(maxWidth: 800){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  } 
                }
                carousel_box {
                  images {
                    path{
                      childImageSharp {
                        fluid(maxWidth: 100){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    } 
                    alt
                  }
                  content
                  heading
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
                  student_thumb{
                    childImageSharp {
                      fluid(maxWidth: 200){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                      fixed(width: 200, height: 200) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                  starts
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
          allChooseProgramYaml(filter: { fields: { lang: { eq: $lang }}}) {
            edges {
              node {
                programs{
                    text
                    link
                    schedule
                }
                open_button_text
                close_button_text
              }
            }
          }
  }
`;

export default BaseRender(Home);