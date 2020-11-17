import React, {useState, useEffect, useContext} from 'react';
import {Link, Anchor} from "../components/Styling/index"
import Card from '../components/Card'
import ChooseProgram from '../components/ChooseProgram'
import News from '../components/News'
import dayjs from "dayjs"
import {Div, Row, Column, Wrapper, WrapperImage, Divider} from '../components/Sections'
import {Title, H1, H4, H3, Span, Paragraph, Separator} from '../components/Heading'
import {Button, Colors, Small, Img, StyledBackgroundSection} from '../components/Styling'
import BaseRender from './_baseLayout'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {requestSyllabus} from "../actions";
import Icon from '../components/Icon'
import LeadForm from '../components/LeadForm';
import Modal from '../components/Modal';
import Why4Geeks from '../components/Why4Geeks';


const Location = ({data, pageContext, yml}) => {

    const {lang} = pageContext;
    const [open, setOpen] = React.useState(false);
    const [cohorts, setCohorts] = React.useState([]);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const loadCohorts = async () => {
            const resp = await fetch(`${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true&academy=${yml.breathecode_location_slug}`)
            const data = await resp.json();
            setCohorts(data.slice(0, 3))
        }
        loadCohorts();
    }, []);

    return (<>
        <WrapperImage
            github={`/location`}
            imageData={yml.header.image && yml.header.image.childImageSharp.fluid}
            filter="brightness(0.4)"
            className={`img-header`}
            bgSize={`cover`}
            alt={yml.header.alt}
            customBorderRadius="0 0 0 1.25rem"
        >
            <H1 type="h1" fontSize="13px" marginTop="50px" color={Colors.white} align="center">{yml.seo_title}</H1>
            <Divider height="20px" />
            <Title
                type="h2"
                title={yml.header.tagline}
                paragraph={yml.header.paragraph}
                paragraphColor={Colors.lightGray}
                variant="main"
                color={Colors.white}
                fontSize="46px"
                textAlign="center"
            />
            <Row display="flex" justifyContent="center" marginBottom="40px">
                <Column align="right" align_sm="center" m_sm="0 0 15px 0" size="6" size_sm="12">
                    <ChooseProgram
                        right="15px"
                        top="40px"
                        programs={data.allChooseProgramYaml.edges[0].node.programs}
                        openLabel={data.allChooseProgramYaml.edges[0].node.close_button_text}
                        closeLabel={data.allChooseProgramYaml.edges[0].node.open_button_text}
                    />
                </Column>
                <Column align="left" align_sm="center" size="6" size_sm="12">
                    <Button width="220px" onClick={handleOpen} color={Colors.red} margin="0" textColor=" white">{yml.button.syllabus_button_text}</Button>
                </Column>
            </Row>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <LeadForm
                    heading={yml.button.syllabus_button_text}
                    formHandler={requestSyllabus}
                    handleClose={handleClose}
                    lang={pageContext.lang}
                />
            </Modal>
        </WrapperImage>
        <Divider height="100px" />
        {yml.news &&
            <Wrapper >
                <Title
                    size="10"
                    title={yml.news.title}
                    margin="left"
                    variant="small"
                />
                <News location={yml.breathecode_location_slug} lang={lang} />
                <Why4Geeks lang={pageContext.lang} playerHeight="250px" />
            </Wrapper>
        }
        { yml.breathecode_location_slug !== "online" &&
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
        }
        <Wrapper>
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
                            <Link to={`/${pageContext.lang}/${cohort.certificate.slug}`}><Img
                                src={cohort.certificate.logo}
                                className="pointer"
                                height="120px"
                                borderRadius="1rem 1rem 0 0"
                            /></Link>
                            <H4 padding="10px">{cohort.certificate.name}</H4>
                            <Div padding="10px">
                                <Icon icon="clock" width="24" color={Colors.blue} fill={Colors.blue} />
                                <Paragraph
                                    margin={`0 0 0 10px`}
                                    fs_xs="18px"
                                    fs_sm="18px"
                                    fs_md="9px"
                                    fs_lg="11px"
                                    fontSize="14px">
                                    <Small display="block">Starting on:</Small>
                                    {dayjs(cohort.kickoff_date).format("ddd, D MMM YYYY")}
                                </Paragraph>
                            </Div>
                            <Div padding="10px" d_lg="block" d_sm="flex" justifyContent="center">
                                <Link to={yml.button.apply_button_link}><Button outline color={Colors.red} padding="10px 12px" textColor={Colors.white}>{yml.button.apply_button_text}</Button></Link>
                                &nbsp;
                                <Link to={`/${pageContext.lang}/${cohort.certificate.slug}`}><Button outline color={Colors.blue} padding="10px 17px" textColor={Colors.white}>{yml.button.cohort_more_details_text}</Button></Link>
                            </Div>
                        </Card>
                    </Column>
                )}
            </Row>
        </Wrapper>
        <Wrapper >
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
        </Wrapper>
        <Divider height="100px" />
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
            button{
                apply_button_link
                apply_button_text
                cohort_more_details_text
                syllabus_button_text
                syllabus_submit_text
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
            carousel_box{
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
