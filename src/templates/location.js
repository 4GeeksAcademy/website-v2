import React, {useState, useEffect, useContext, useRef} from 'react';
import {Link, Anchor} from "../components/Styling/index"
import Card from '../components/Card'
import ChooseProgram from '../new_components/ChooseProgram'
import News from '../new_components/News'
import Badges from '../new_components/Badges'
import Loc from '../new_components/Loc'
import OurPartners from '../new_components/OurPartners'
import ChooseYourProgram from '../new_components/ChooseYourProgram'
import UpcomingDates from '../new_components/UpcomingDates'
import Staff from '../new_components/Staff';
import dayjs from "dayjs"
import 'dayjs/locale/de'
import {Div, Row, Column, Wrapper, Container, GridContainerWithImage, Grid, GridContainer} from '../new_components/Sections'
import {Title, H1, H2, H4, H3, Span, Paragraph, Separator} from '../new_components/Heading'
import {Button, Colors, Small, Img, StyledBackgroundSection} from '../new_components/Styling'
import BaseRender from './_baseLayout'
import {Circle} from '../new_components/BackgroundDrawing'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {requestSyllabus} from "../actions";
// import Icon from '../components/Icon'
import LeadForm from '../components/LeadForm';
import Modal from '../components/Modal';
import Why4Geeks from '../components/Why4Geeks';

const imagePositions = {
  "1": "1/1/3/7",
  "2": "1/7/3/13",
  "3": "3/1/4/4",
  "4": "4/1/5/4",
  "5": "3/4/5/13"
}
const Location = ({data, pageContext, yml}) => {
  const {lang} = pageContext;
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;
  const images = data.allLocationYaml.edges[0].node;
  const [cohorts, setCohorts] = React.useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const chooseProgramRef = useRef(null)

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadCohorts = async () => {
      // https://breathecode.herokuapp.com/v1
      const resp = await fetch(`https://breathecode.herokuapp.com/v1/admissions/cohort/all?upcoming=true&academy=${yml.breathecode_location_slug}`)
      // const resp = await fetch(`${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true&academy=${yml.breathecode_location_slug}`)
      const data = await resp.json();
      setCohorts(data.slice(0, 3))
    }
    loadCohorts();
  }, []);

  const goToChooseProgram = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: chooseProgramRef.current?.offsetTop,
      behavior: "smooth"
    })
  }
  return (<>
    {/* github={`/location`} */}
    {/* <Container variant="fluid" margin="28px 0" padding_md="72px 0 90px 171px"> */}
    {/* <Grid height="375px" height_md="219px" columns="2" rows="2" columns_md="12" rows_md="1" background={Colors.verylightGray}> */}
    <GridContainerWithImage padding="24px 17px " padding_tablet="54px 0" columns_tablet="14" margin="67px 0" margin_tablet="100px 0 0 0">
      <Div flexDirection="column" alignItems="center" alignItems_tablet="start" justifyContent_tablet="start" padding_tablet="70px 0 0 0" gridColumn_tablet="1 / 7">
        <H1 textAlign_tablet="left" margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1>
        <H2 textAlign_tablet="left" fontSize="50px" lineHeight="60px">{`${yml.header.tagline}`}</H2>
        <Paragraph textAlign_tablet="left" margin="26px 0">{yml.info_box.address} </Paragraph>
        <Paragraph textAlign_tablet="left" >{yml.info_box.phone} </Paragraph>
        {yml.info_box.whatsapp && <Paragraph textAlign_tablet="left" >{yml.info_box.whatsapp} </Paragraph>}
        <Paragraph textAlign_tablet="left" margin="0 0 30px 0">{yml.info_box.email} </Paragraph>
        {/* <Button goTo={goToChooseProgram} color={Colors.blue}>{yml.button_header.button_text}</Button> */}
        <ChooseProgram
          goTo={goToChooseProgram}
          right="15px"
          top="40px"
          // margin="40px 0"
          textAlign="center"
          textAlign_tablet="left"
          // programs={data.allChooseProgramYaml.edges[0].node.programs}
          openLabel={data.allChooseProgramYaml.edges[0].node.open_button_text}
          closeLabel={data.allChooseProgramYaml.edges[0].node.open_button_text}
        />

      </Div>
      <Div height="auto" width="100%" gridColumn_tablet="7 / 15" style={{position: "relative"}}>

        <StyledBackgroundSection
          height={`495px`}
          image={yml.header.image.childImageSharp.fluid}
          bgSize={`contain`}
          alt={yml.header.alt}
        />
      </Div>
    </GridContainerWithImage>

    <Badges lang={pageContext.lang} background={Colors.lightGray} margin="0 0 57px 0" padding="27px 17px 50px 17px" padding_tablet="80px 0 100px 0" />
    <GridContainer columns_tablet="12" padding_tablet="60px 0 77px 0" padding="40px 17px">
      <Div gridColumn_tablet="1 / 4" ><H2 textAlign="left">{images.images_box.heading}</H2></Div>
      <Div flexDirection="column" gridColumn_tablet="5 / 13">
        {images.images_box.content.split("\n").map((m, i) =>
          <Paragraph
            textAlign="left"
            margin="0 0 20px 0"
            fontSize="15px"
            lineHeight="26px"
          >
            {m}
          </Paragraph>
        )}
      </Div>
    </GridContainer>
    <GridContainer columns_tablet="12" gridTemplateRows_tablet="4, 1fr" height_tablet="813px" height="304px">
      {yml.images_box.images.map((m, i) => {
        return (
          <Div
            key={i}
            borderRadius="3px"
            gridArea={imagePositions[`${i + 1}`]}
          >
            <StyledBackgroundSection
              height="auto"
              margin="0"
              borderRadius="3px"
              image={m.path.childImageSharp.fluid}
              bgSize={`cover`}
              alt={m.alt}
            />
          </Div>)
      })}
    </GridContainer>
    <OurPartners images={hiring.partners.images} showFeatured marquee title={hiring.partners.tagline} paragraph={hiring.partners.sub_heading}></OurPartners>
    <ChooseYourProgram chooseProgramRef={chooseProgramRef} lang={pageContext.lang} programs={data.allChooseYourProgramYaml.edges[0].node.programs} />
    <UpcomingDates lang={pageContext.lang} location={yml.breathecode_location_slug} />
    <Loc lang={pageContext.lang} locations={data.test.edges} />
    <Staff lang={pageContext.lang} />
    {/* <Loc lang={pageContext.lang} locations={data.allLocationYaml.edges} title={yml.locations.heading} paragraph={yml.locations.sub_heading} /> */}
    {/* <Container
      variant="fluid"
      background={Colors.verylightGray}
      height_md="300px"
      margin_md="0 0 215px 0"
      margin="0 0 76px 0"
      padding="59px 17px 83px 17px"
      padding_md="17px"
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
    <Container variant="fluid" background={Colors.lightYellow} margin="0 0 67px 0" padding="0 0 86px 0">
      <Container
        variant="fixed"
        margin="0 auto"
      >
        <H2 margin="0 0 15px 0" fontSize="15px" lineHeight="19px" fontWeight="900">Title</H2>
        <Paragraph margin="0 0 50px 0" >Sub Title</Paragraph>
        <Loc lang={pageContext.lang} locations={data.test.edges} />
      </Container>
    </Container> */}
    {/* {
            yml.breathecode_location_slug !== "online" &&
            <Wrapper >
                <Card shadow borders="1.25rem" >
                    <Row display="flex"
                        height="100%"
                        marginLeft="0"
                        marginRight="0"
                        customRespSize
                    >
                        <Column size="6" size_sm="12" padding="20px" alignSelf="center" borderRadius="0 0 0 1.25rem">
                            <H3 align="left" >{yml.info_box.heading}</H3>
                            <Separator variant="primary" left />
                            <Paragraph align="left">{yml.info_box.address}</Paragraph>
                            <H3 margin='10px 0' align="left" >{yml.info_box.contact_heading}</H3>
                            <Paragraph align="left"><a href={`tel:${yml.info_box.phone}`}>{yml.info_box.phone}</a></Paragraph>
                            <Paragraph margin="10px 0 0 0" align="left">{yml.info_box.email}</Paragraph>
                        </Column>
                        <Column
                            size="6" size_sm="12"
                            paddingRight={`0`}
                            paddingLeft={`0`}
                            border="custom"
                            borderRadius="0 1.25rem 1.25rem 0"
                        >
                            <Anchor to={yml.info_box.map_url}>
                                <StyledBackgroundSection
                                    className={`img-right`}
                                    height={`426px`}
                                    h_sm={`326px`}
                                    image={yml.info_box.image && yml.info_box.image.childImageSharp.fluid}
                                    bgSize={`cover`}
                                    alt="Cnn Logo"
                                    borderRadius="1.25rem"
                                />
                            </Anchor>
                        </Column>
                    </Row>
                </Card>
            </Wrapper>
        } */}
    {/* <Wrapper>
            <Title
                size="10"
                title={yml.upcoming.title}
                margin="left"
                variant="primary"
            />
            <Row display="flex">
                {cohorts && cohorts.map((cohort, key) =>
                    <Column
                        key={key}
                        size="4"
                        size_md="4"
                        size_sm="6"
                        size_xs="12"
                        borderRadius="0 0 0 1.25rem"
                    >
                        <Card
                            color={`grey`}
                            borders={`.5rem`}
                            margin={`0 20px 0 0`}
                            margin_sm={"20px auto"}
                            margin_xs={"20px auto"}
                        >
                            <Link to={`/${pageContext.lang}/${cohort.syllabus.certificate.slug}`}><Img
                                src={cohort.syllabus.certificate.logo}
                                className="pointer"
                                height="120px"
                                borderRadius="1rem 1rem 0 0"
                            /></Link>
                            <H4 padding="10px">{cohort.syllabus.certificate.name}</H4>
                            <Div padding="10px">
                                <Icon icon="clock" width="24" color={Colors.blue} fill={Colors.blue} />
                                {pageContext.lang == "us" ?
                                    <Paragraph
                                        margin={`0 0 0 10px`}
                                        fs_xs="18px"
                                        fs_sm="18px"
                                        fs_md="9px"
                                        fs_lg="11px"
                                        fontSize="14px">
                                        <Small display="block">Starting on:</Small>
                                        {dayjs(cohort.kickoff_date).locale("us").add(5, "hour").format("ddd, D MMM YYYY")}
                                    </Paragraph>
                                    : <Paragraph
                                        margin={`0 0 0 10px`}
                                        fs_xs="18px"
                                        fs_sm="18px"
                                        fs_md="9px"
                                        fs_lg="11px"
                                        fontSize="14px">
                                        <Small display="block">Empezando el:</Small>
                                        {dayjs(cohort.kickoff_date).locale("es").add(5, "hour").format("ddd, D MMM YYYY")}
                                    </Paragraph>}

                            </Div>
                            <Div padding="10px" d_lg="block" d_sm="flex" justifyContent="center">
                                <Link to={yml.button.apply_button_link}><Button outline color={Colors.red} padding="10px 12px" textColor={Colors.white}>{yml.button.apply_button_text}</Button></Link>
                                &nbsp;
                                <Link to={`/${pageContext.lang}/${cohort.syllabus.certificate.slug}`}><Button outline color={Colors.blue} padding="10px 17px" textColor={Colors.white}>{yml.button.cohort_more_details_text}</Button></Link>
                            </Div>
                        </Card>
                    </Column>
                )}
            </Row>
        </Wrapper> */}
    {/* <Wrapper >
            <Row display="flex">
                <Column
                    size="12"
                    borderRadius="0 0 0 1.25rem"

                >
                    <Card shadow borders="1.25rem" >
                        <Row display="flex"
                            height="100%"
                            marginLeft="0"
                            marginRight="0"
                            customRespSize
                        >
                            <Column size="6" size_sm="12" paddingLeft="0" paddingRight="0" alignSelf="center" height="100%" backgroundSize="cover" border="custom" borderRadius="1.25rem 0 0 1.25rem" >
                                <Carousel showIndicators={false} showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>

                                    {yml.carousel_box.images.map((item, index) => {
                                        return (
                                            <StyledBackgroundSection
                                                key={index}
                                                className={`img-left`}
                                                height={`426px`}
                                                h_sm={`326px`}
                                                image={item.path.childImageSharp.fluid}
                                                bgSize={`cover`}
                                                alt="Cnn Logo"
                                                borderRadius="1.25rem"
                                            />
                                        )
                                    })}
                                </Carousel>
                            </Column>
                            <Column size="6" size_sm="12" padding="20px" alignSelf="center" borderRadius="0 0 0 1.25rem">
                                <H3 align="left">{yml.carousel_box.heading}</H3>
                                <Paragraph margin="5px 0" align="left" ></Paragraph>
                                <Separator variant="primary" />
                                <Paragraph color={Colors.gray} align="left">
                                    {yml.carousel_box.content}
                                </Paragraph>
                            </Column>
                        </Row>
                    </Card>
                </Column>
            </Row>
        </Wrapper> */}
  </>
  )
};

export const query = graphql`
  query LocationQuery($file_name: String!, $lang: String!) {
    allLocationYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            seo_title
            active_campaign_location_slug
            breathecode_location_slug
            header{
                tagline
                paragraph
                sub_heading
                image {
                    childImageSharp {
                    fluid(maxWidth: 1200, quality: 100){
                        ...GatsbyImageSharpFluid_withWebp
                    }
                    }
                } 
                alt
            }
            button_header{
              button_text
              button_link
            }
            button{
                apply_button_link
                apply_button_text
                cohort_more_details_text
                syllabus_button_text
                syllabus_submit_text
            }
            badges{
              title
              paragraph
            }
            news{
                title
            }
            upcoming{
                title
            }
            info_box{
                heading
                map_url
                address
                phone
                email
                contact_heading
                whatsapp
                image {
                    childImageSharp {
                      fluid(maxWidth: 800, quality: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                alt 
            }
            meta_info{
                title
                description
                image
                keywords
            }
            images_box{
                heading
                content
                images{
                    path{
                        childImageSharp {
                          fluid(maxWidth: 800, quality: 100){
                            ...GatsbyImageSharpFluid_withWebp
                          }
                        }
                      } 
                    alt

                }
                
            }
            
        }
      }
    }
    test : allLocationYaml(filter: {fields: { lang: {eq: $lang}}}) {
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
                full_stack {
                  full_time {
                    slug
                  }
                  part_time {
                    slug
                  }
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
        
    allChooseProgramYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
          node {
            programs{
                text
                link
                location_bc_slug
                schedule
            }
            open_button_text
            close_button_text
          }
        }
    }
  }
`;

export default BaseRender(Location);
