import React from 'react';
import {graphql, Link, navigate} from 'gatsby';
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../new_components/Heading'
import {Row, Column, Wrapper, Container, Grid, Div} from '../new_components/Sections'
import {RoundImage, Colors} from '../new_components/Styling'
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

  return <H1 type="h1" textAlign="left" textShadow="none" fontSize="13px" color="#606060" >{city}{" "}{yml.header_data.tagline}</H1>
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
      <Container variant="fluid">
        <Grid columns_tablet="2" >
          <Div flexDirection="column" >
            <CityH1 yml={yml} />
            <H2
              // padding="0 10px 0 0px"
              // margin="16px 0 0 0"
              fontSize="50px"
              lineHeight="60px"
            // textAlign="left"
            >
              {yml.header_data.title}
              {/* <Span animated color={Colors.yellow}>_</Span> */}
            </H2>
            <Paragraph color={Colors.gray} margin="25px 0px" m_sm="20px auto" maxWidth="350px" textAlign="left" >{yml.header_data.sub_heading}</Paragraph>
            <ChooseProgram
              left="15px"
              top="40px"
              programs={data.allChooseProgramYaml.edges[0].node.programs}
              openLabel={data.allChooseProgramYaml.edges[0].node.close_button_text}
              closeLabel={data.allChooseProgramYaml.edges[0].node.open_button_text}
            />
            <News lang={pageContext.lang} limit={yml.news.limit} />
          </Div>
          <Div background={Colors.gray}>test
            {/* <Div background={Colors.blue} height="623px" width="623px" borderRadius="50%"></Div> */}

          </Div>
        </Grid>
      </Container>
      {/* <Row github={`/page/index.${pageContext.lang}.yml`} display={`flex`}>
        <Column
          size="4"
          m_sm="0"
          size_sm="10"
          align_sm="center"
          padding="100px 10px 0 10px"
          margin="0 0 0 auto"
        >
          <CityH1 yml={yml} />

        </Column>
        <Column
          size="6"
          borderRadius="0 0 0 1.25rem"
          height="620px"
          customRespSize
          disp_sm={"none"}
          disp_xs={"none"}
          paddingRight={`0`}
          style={{position: "relative"}}
        >

          <Img
            style={{height: "620px"}}
            imgStyle={{objectFit: "contain"}}
            alt="4Geeks Academy"
            loading="eager"
            fadeIn={false}
            fluid={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
            backgroundSize={`contain`}
          >
            <div style={{position: "absolute", zIndex: "1", bottom: "33px", right: "144px", transform: "translate(-50%, -50%)"}}>

            <svg style={{position: "absolute", zIndex: "1", bottom: "33px", right: "144px"}} width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26.5" cy="26.5" r="26.5" fill="#0097CD" />
            </svg>
            <div style={{position: "absolute", top: "50%", left: "50%"}} >test</div>
            <imageSvg style={{position: "absolute", zIndex: "1"}} />
            </div>
          </Img>
        </Column>
      </Row> */}


      <Container variant="fluid" background="#f5f5f5" height="425px" padding="48px 0 36px 0" margin="50px 0">
        <H2>{yml.testimonial_header.heading}</H2>
        <Paragraph margin="25px 0 36px 0" color={Colors.blue}>{yml.testimonial_header.button_text}</Paragraph>
        <Testimonials lang={data.allTestimonialsYaml.edges} />
      </Container>

      <Container variant="fixed" style={{borderBottom: "1px solid #ebebeb"}} padding="0 17px 59px 17px">
        <Paragraph
          margin="32px 0 32px 0"
          letteSpacing="0.05em"
          fontSize="18px"
          fontSize_tablet="22px"
          fontWeight="300"
          color={Colors.black}
          lineHeight="38px"
          align="center"
          dangerouslySetInnerHTML={{__html: yml.badges.sub_heading}}
        ></Paragraph>
        <Badges lang={pageContext.lang} />
      </Container>

      {/* ABOUT 4GEEKS SECTION */}

      {/* <Wrapper margin="50px 0"> */}
      <Container variant="fluid" margin="90px 0">
        <About4Geeks lang={data.allAbout4GeeksYaml.edges} />
      </Container>
      {/* <About4Geeks lang={pageContext.lang} /> */}
      {/* <H4 margin="50px 0">{yml.news.heading}</H4> */}
      {/* <News lang={pageContext.lang} limit={yml.news.limit} /> */}
      {/* </Wrapper> */}
      {/* WHY 4GEEKS SECTION */}

      <Container variant="fluid" background={Colors.verylightGray} margin="100px auto">
        <Container variant="fixed">
          <Credentials lang={data.allCredentialsYaml.edges} shadow={false} />
        </Container>
      </Container>


      <Container
        variant="fixed"
        margin="100px auto"
      >
        <H2 margin="0 0 30px 0" fontSize="15px" lineHeight="19px" fontWeight="900">WITH 4GEEKS</H2>
        <With4Geeks lang={pageContext.lang} playerHeight="82px" />
      </Container>
      <Container
        variant="fluid"
        background={Colors.verylightGray}
        height_md="300px"
        margin_md="0 0 215px 0"
        margin="0 0 76px 0"
        padding="59px 17px 83px 17px"
      >
        <Container
          variant="fixed"
          transform_md="translateY(15%)"
        >
          <H2 fontSize="15px" lineHeight="19px" fontWeight="900">CHOOSE YOUR PROGRAM</H2>
          <Paragraph margin="0 0 36px 0">Contamos con programas que combinan clases prácticas dictadas por expertos</Paragraph>
          <ChooseYourProgram programs={data.allChooseYourProgramYaml.edges[0].node.programs} />
        </Container>
      </Container>

      <Container
        variant="fluid"
      >
        <Container variant="fixed">
          <H2 margin="0 0 15px 0" fontSize="15px" lineHeight="19px" fontWeight="900">{hiring.partners.tagline}</H2>
          <Paragraph margin="0 0 50px 0" >{hiring.partners.sub_heading}</Paragraph>

        </Container>
        <OurPartners images={hiring.partners.images}></OurPartners>
      </Container>
      <Container
        variant="fixed"
        margin="100px auto"
      >
        <H2 margin="0 0 15px 0" fontSize="15px" lineHeight="19px" fontWeight="900">{yml.locations.heading}</H2>
        <Paragraph margin="0 0 50px 0" >{yml.locations.sub_heading}</Paragraph>
        <Loc lang={pageContext.lang} locations={data.allLocationYaml.edges} />
      </Container>

      {/* NEW COMPONENT TEST */}

      {/* <WrapperCustom width="100%" style={{background: "grey"}}> */}

      {/* </WrapperCustom> */}

      {/* <Wrapper margin="50px 0">
        <WhyPython lang={pageContext.lang} />
      </Wrapper> */}



      {/* GEEKS VS OTHERS SECTION */}

      {/* <Wrapper margin="100px">
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
      </Wrapper> */}

      {/* ******************* */}
      {/* JOIN 4GEEKS SECTION */}
      {/* ******************* */}
      {/* <Wrapper margin="100px">
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
      </Wrapper> */}



      {/* <Wrapper
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
      </Wrapper> */}




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
            badges{
              heading
              sub_heading
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