import React from 'react';
import {graphql, Link, navigate} from 'gatsby';
import {H1, H2, H4, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Row, Column, Wrapper} from '../components/Sections'
import {RoundImage, Colors} from '../components/Styling'
import Img from 'gatsby-image'
import News from '../components/News'
import Icon from '../components/Icon'
import Credentials from '../components/Credentials'
import ChooseProgram from '../components/ChooseProgram'
import BaseRender from './_baseLayout'
import {SessionContext} from '../session.js'
import Loc from '../components/Loc';
import WhyPython from '../components/WhyPython';
import Badges from '../components/Badges';
import WhoIsHiring from '../components/WhoIsHiring';
import AlumniProjects from '../components/AlumniProjects';
import Why4Geeks from '../components/Why4Geeks';
import TestimonialsCarrousel from '../components/Testimonials';
import Card from '../components/Card';
import GeeksVsOthers from '../components/GeeksVsOthers';


const CityH1 = ({yml}) => {
  const {session} = React.useContext(SessionContext);
  const city = session && session.location ? "" : "Miami";

  React.useEffect(() => {
    if (session.language === "es" && window.location.hash === "" && !RegExp('\/es\/inicio').test(window.location.href)) navigate("/es/inicio")
  }, [session])

  return <H1 type="h1" align="left" textShadow="none" fontSize="13px" color={Colors.gray} lato>{city}{" "}{yml.header_data.tagline}</H1>
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
      <Row github={`/page/index.${pageContext.lang}.yml`} display={`flex`}>
        <Column
          size="4"
          m_sm="0"
          size_sm="10"
          align_sm="center"
          padding="100px 10px 0 10px"
          margin="0 0 0 auto"
        >
          <CityH1 yml={yml} />
          <Separator variant="primary" left />
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
          borderRadius="0 0 0 1.25rem"
          height="500px"
          customRespSize
          disp_sm={"none"}
          disp_xs={"none"}
          paddingRight={`0`}
        >
          <Img
            style={{height: "500px", backgroundColor: Colors.lightGray, borderRadius: "0 0 0 1.25rem"}}
            imgStyle={{objectFit: "cover"}}
            alt="4Geeks Academy"
            loading="eager"
            fadeIn={false}
            fluid={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
            backgroundSize={`cover`}
          />
        </Column>
      </Row>

      {/* BADGES AND NEWS CARDS */}

      <Wrapper>
        <Badges lang={pageContext.lang} />
        <H4 margin="50px 0">{yml.news.heading}</H4>
        <News lang={pageContext.lang} limit={yml.news.limit} autoTagLocation />
      </Wrapper>

      {/* WHY 4GEEKS SECTION */}

      <Wrapper margin="50px 0">
        <CityWrapper yml={yml} />
        <Why4Geeks lang={pageContext.lang} playerHeight="250px" />
        <Credentials lang={data.allCredentialsYaml.edges} shadow={false} />
      </Wrapper>

      <Wrapper margin="50px 0">
        <WhyPython lang={pageContext.lang} />
      </Wrapper>



      {/* GEEKS VS OTHERS SECTION */}

      <Wrapper margin="100px">
        <Title
          type="h2"
          title={yml.geeks_vs_others.heading}
          paragraph={yml.geeks_vs_others.sub_heading}
          link={true}
          linkTo={yml.geeks_vs_others.sub_heading_link}
          paragraphColor={Colors.blue}
          variant="primary"
          size="10"
        />
        <GeeksVsOthers lang={pageContext.lang} limit={5} />
      </Wrapper>

      {/* ******************* */}
      {/* JOIN 4GEEKS SECTION */}
      {/* ******************* */}
      <Wrapper margin="100px">
        <CityWrapper2 yml={yml} />
        <Row github={`/page/index.${pageContext.lang}.yml`} display="flex">
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
                  <Icon icon="arrowright" width="24px" color={Colors.blue} fill={Colors.blue} />
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
              <Column size="2" margin="0 0 0 auto" paddingRight="0" align="right" alignSelf="flex-end">
                <Link to={yml.join_geeks.geek_data.geek_force_data.icon_link}>
                  <Icon icon="arrowright" width="24px" color={Colors.blue} fill={Colors.blue} />
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
        <Title
          size="10"
          marginTop="40px"
          title={hiring.partners.tagline}
          paragraph={hiring.partners.sub_heading}
          paragraphColor="black"
          variant="primary"
        />
        <WhoIsHiring
          margin="50px"
          autoTagLocation
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
        <AlumniProjects lang={data.allAlumniProjectsYaml.edges} hasTitle showThumbs="false" limit={2} />
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
        <Loc lang={pageContext.lang} locations={data.allLocationYaml.edges} />
      </Wrapper>
      <Wrapper margin="100px">
        <Title
          variant="primary"
          title={yml.testimonial_header.heading}
          paragraph={yml.testimonial_header.sub_heading}
          maxWidth="66%"
        // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
        />
        <TestimonialsCarrousel lang={data.allTestimonialsYaml.edges} />
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
                  fluid(maxWidth: 1200, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
           
            }
            news{
              limit
              heading
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
                  locations
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
                  hidden
                  linkedin_url
                  linkedin_text
                  student_thumb{
                    childImageSharp {
                      fluid(maxHeight: 200){
                        ...GatsbyImageSharpFluid_withWebp
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