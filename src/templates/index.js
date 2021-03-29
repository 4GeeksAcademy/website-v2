import React from 'react';
import {graphql, Link, navigate} from 'gatsby';
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../new_components/Heading'
import {Row, Column, GridContainerWithImage, Container, Grid, Div, GridContainer} from '../new_components/Sections'
import {RoundImage, Colors, StyledBackgroundSection} from '../new_components/Styling'
import Img from 'gatsby-image'
import News from '../new_components/News'
import Icon from '../new_components/Icon'
import Credentials from '../new_components/Credentials'
import ChooseProgram from '../new_components/ChooseProgram'
import BaseRender from './_baseLayout'
import {SessionContext} from '../session.js'
import Loc from '../new_components/Loc';
import WhyPython from '../components/WhyPython';
import Badges from '../new_components/Badges';
import WhoIsHiring from '../components/WhoIsHiring';
import AlumniProjects from '../components/AlumniProjects';
// import Why4Geeks from '../components/Why4Geeks';
import With4Geeks from '../new_components/With4Geeks';
import About4Geeks from '../new_components/About4Geeks';
import OurPartners from '../new_components/OurPartners';
import ChooseYourProgram from '../new_components/ChooseYourProgram';
import Testimonials from '../new_components/Testimonials';
import Carousel from '../new_components/Carousel';
import Card from '../components/Card';
import GeeksVsOthers from '../components/GeeksVsOthers';
import {WrapperCustom} from '../new_components/Sections';


const imageSvg = props => <svg style={props.style} width="587" height="514" viewBox="0 0 587 514" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="416.5" cy="487.5" r="26.5" fill="#0097CD" />
  <circle cx="516" cy="100" r="14" fill="#FFB718" />
  <circle cx="546" cy="290" r="119" fill="#FFB718" fill-opacity="0.2" />
  <circle cx="28.5" cy="80.5" r="28.5" fill="#FFB718" fill-opacity="0.2" />
  <circle cx="47.5" cy="12.5" r="12.5" fill="#CD0000" />
  <circle cx="111.5" cy="125.5" r="5.5" fill="#0097CD" />
</svg>


const CityH1 = ({yml}) => {
  const {session} = React.useContext(SessionContext);
  const city = session && session.location ? "" : "Miami";

  React.useEffect(() => {
    if (session.language === "es" && window.location.hash === "" && !RegExp('\/es\/inicio').test(window.location.href)) navigate("/es/inicio")
  }, [session])

  return <H1 type="h1" textAlign_md="left" textShadow="none" fontSize="13px" color="#606060" >{city}{" "}{yml.header_data.tagline}</H1>
}
const CityWrapper = ({yml}) => {
  const {session} = React.useContext(SessionContext);
  const city = session && session.location ? "" : "Miami";
  return <Title
    title={yml.why_4geeks.heading + " " + city}
    variant="primary"
  />
}
const CityWrapper2 = ({yml}) => {
  const {session} = React.useContext(SessionContext);
  const city = session && session.location ? "" : "Miami";
  return <Title
    type="h2"
    title={yml.join_geeks.heading + " " + city}
    paragraph={yml.join_geeks.sub_heading}
    paragraphColor={Colors.darkGray}
    maxWidth="66%"
    margin="auto"
    variant="primary"
  />
}

const Home = (props) => {

  const {data, pageContext, yml} = props;
  const hiring = data.allPartnerYaml.edges[0].node;

  return (
    <>
      <GridContainerWithImage columns_tablet="2" margin="120px 0 71px 0" margin_tablet="0 0 108px 0">
        <Div flexDirection="column" justifyContent_tablet="start" padding_tablet="70px 0 0 0">
          <CityH1 yml={yml} />
          {/* <H1 textAlign_tablet="left" margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1> */}
          <H2 textAlign_tablet="left" fontSize="50px" lineHeight="60px">{`${yml.header_data.title}`}</H2>
          <Paragraph textAlign_tablet="left" margin="26px 0">{yml.header_data.sub_heading} </Paragraph>
          {/* <Paragraph textAlign_tablet="left" >{yml.info_box.phone} </Paragraph>
                    <Paragraph textAlign_tablet="left" >{yml.info_box.email} </Paragraph> */}
          <ChooseProgram
            right="15px"
            top="40px"
            // margin="40px 0"
            textAlign="center"
            textAlign_tablet="left"
            programs={data.allChooseProgramYaml.edges[0].node.programs}
            openLabel={data.allChooseProgramYaml.edges[0].node.close_button_text}
            closeLabel={data.allChooseProgramYaml.edges[0].node.open_button_text}
          />
          <News lang={pageContext.lang} limit={yml.news.limit} />
        </Div>
        <Div display="none" display_tablet="flex" height="auto" width="100%">
          <StyledBackgroundSection
            height={`623px`}
            width="100%"
            image={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
            bgSize={`contain`}
          // alt={yml.header.alt}
          />
        </Div>
      </GridContainerWithImage>

      <Testimonials lang={data.allTestimonialsYaml.edges} />
      <Badges lang={pageContext.lang} paragraph={yml.badges.paragraph} margin="0 0 108px 0" />
      <About4Geeks lang={data.allAbout4GeeksYaml.edges} />
      <Credentials lang={data.allCredentialsYaml.edges} shadow={false} />
      <With4Geeks lang={pageContext.lang} playerHeight="82px" />
      <ChooseYourProgram programs={data.allChooseYourProgramYaml.edges[0].node.programs} />
      <OurPartners images={hiring.partners.images} slider title={hiring.partners.tagline} paragraph={hiring.partners.sub_heading} />
      <Loc lang={pageContext.lang} locations={data.allLocationYaml.edges} title={yml.locations.heading} paragraph={yml.locations.sub_heading} />


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
                  fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
           
            }
            news{
              limit
              heading
            }
            badges{
              paragraph
            }
            with{
              heading
              sub_heading
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
                images_box {
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
          allChooseYourProgramYaml (filter: { fields: { lang: { eq: $lang }}}){
            edges {
              node {
                programs {
                  link
                  sub_title
                  title
                  description
                  icon
                }
              }
            }
          }
          allAbout4GeeksYaml (filter: { fields: { lang: { eq: $lang }}}){
            edges {
              node {
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
                    fluid(maxWidth: 1200){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                } 
                image_mobile {
                  childImageSharp {
                    fluid(maxWidth: 800){
                      ...GatsbyImageSharpFluid_withWebp
                    }
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
                    location_bc_slug
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

// {/* <Container variant="fluid" margin="28px 0" padding_md="0 0 0 171px" >
//         <Grid columns_md="2" >
//           <Div gridArea_md="1/2/1/7" flexDirection="column" justifyContent_md="start" padding_md="70px 0 0 0">
//             <CityH1 yml={yml} />
//             {/* <H1 textAlign_tablet="left" margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1> */}
//             <H2 textAlign_md="left" fontSize="50px" lineHeight="60px">{`${yml.header_data.title}`}</H2>
//             <Paragraph textAlign_md="left" margin="26px 0">{yml.header_data.sub_heading} </Paragraph>
//             {/* <Paragraph textAlign_tablet="left" >{yml.info_box.phone} </Paragraph>
//                     <Paragraph textAlign_tablet="left" >{yml.info_box.email} </Paragraph> */}
//             <ChooseProgram
//               right="15px"
//               top="40px"
//               // margin="40px 0"
//               textAlign="center"
//               textAlign_md="left"
//               programs={data.allChooseProgramYaml.edges[0].node.programs}
//               openLabel={data.allChooseProgramYaml.edges[0].node.close_button_text}
//               closeLabel={data.allChooseProgramYaml.edges[0].node.open_button_text}
//             />
//             <News lang={pageContext.lang} limit={yml.news.limit} />
//           </Div>
//           {/* <Div>
//             <Img
//               style={{height: "623px"}}
//               imgStyle={{objectFit: "contain"}}
//               alt="4Geeks Academy"
//               loading="eager"
//               fadeIn={false}
//               fluid={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
//               backgroundSize={`cover`}
//             />
//           </Div> */}
//           <Div gridArea_md="1/7/1/13" display="none" display_md="flex" height="auto" width="100%">
//             <StyledBackgroundSection
//               height={`623px`}
//               width="100%"
//               image={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
//               bgSize={`contain`}
//             // alt={yml.header.alt}
//             />
//           </Div>
//         </Grid>
//       </Container> */}