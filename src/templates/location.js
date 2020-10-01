import React, {useState, useEffect, useContext} from 'react';
import { Link, Anchor } from "../components/Styling/index"
import {Card} from '../components/Card'
import ChooseProgram from '../components/ChooseProgram'
import Why4Geeks from '../components/Why4Geeks';
import News from '../components/News'
import dayjs from "dayjs"
import {Div, Row, Column, Wrapper, WrapperImage, Divider} from '../components/Sections'
import {Title, H1, H4, H3, Span, Paragraph, Separator} from '../components/Heading'
import {Button, Colors, Small, ArrowRight, Img, StyledBackgroundSection} from '../components/Styling'
import BaseRender from './_baseRender'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {requestSyllabus} from "../actions";


import {Clock} from '../components/Styling'

import Modal from '../components/Modal';
import LeadForm from "../components/LeadForm/index.js";

const Location = ({data, pageContext, yml}) => {

    const { lang } = pageContext;
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
            setCohorts(data.slice(0,4))
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
            <H1 type="h1"  fontSize="13px" marginTop="50px" color={Colors.white} align="center">{yml.seo_title}</H1>
            <Divider height="20px" />
            <Title
                type="h2"
                title={yml.header.tagline}
                paragraph={yml.header.paragraph}
                variant="main"
                color={Colors.white}
                fontSize="46px"
                textAlign="center"
            />
            <Row align="center" marginBottom="40px">
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
                <LeadForm heading={yml.button.syllabus_button_text} formHandler={requestSyllabus} handleClose={handleClose} 
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
                <News location={yml.breathecode_location_slug} lang={lang}  />
                <Why4Geeks lang={pageContext.lang} playerHeight="250px" />
            </Wrapper>
        }
        { yml.breathecode_location_slug !== "online" &&
            <Wrapper >
                <Row>
                    <Column
                        size="12"
                        borderRadius="0 0 0 1.25rem"

                    >
                        <Card shadow borders="1.25rem" height="426px" >
                            <Row
                                height="100%"
                                marginLeft="0"
                                marginRight="0"
                                customRespSize
                            >
                                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" borderRadius="0 0 0 1.25rem">
                                    <Row align="center" height="100%">
                                        <Column size="10" height="100%">
                                            <Divider height="50px" />
                                            <Row height="5%">
                                                <Column size="12">
                                                    <H3 fs_xs="20px"
                                                        fs_sm="20px"
                                                        fs_md="18px"
                                                        fs_lg="20px"
                                                        fs_xl="24px"
                                                        align="left" >{yml.info_box.heading}</H3>
                                                    <Paragraph primary margin="5px 0" align="left" ></Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="5%" align="around">
                                                <Column size="12" alignSelf="center">
                                                    <Separator  variant="primary" left />
                                                </Column>
                                            </Row>
                                            <Row height="30%">
                                                <Column size="12">
                                                    <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.info_box.address}</Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="5%">
                                                <Column size="12">
                                                    <H3
                                                        fs_xs="20px"
                                                        fs_sm="24px"
                                                        fs_md="18px"
                                                        fs_lg="20px"
                                                        fs_xl="24px"
                                                        align="left" >{yml.info_box.contact_heading}</H3>
                                                    <Paragraph primary margin="5px 0" align="left" ></Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="5%" align="around">
                                                <Column size="12" alignSelf="center">
                                                    <Separator  variant="primary" left />
                                                </Column>
                                            </Row>
                                            <Row height="5%">
                                                <Column size="12">
                                                    <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.info_box.phone}</Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="5%">
                                                <Column size="12">
                                                    <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.info_box.email}</Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="">
                                                <Paragraph color={Colors.gray} fontSize="14px" lineHeight="20px" margin="20px 0 0 0" align="left" ></Paragraph>
                                            </Row>


                                        </Column>
                                    </Row>
                                </Column>
                                <Column
                                    size="6"
                                    customRespSize
                                    respSize="6"
                                    paddingRight={`0`}
                                    border="custom"
                                    borderRadius="0 1.25rem 1.25rem 0"
                                >
                                    <Anchor to={yml.info_box.map_url}>
                                        <StyledBackgroundSection
                                            className={`img-right`}
                                            height={`426px`}
                                            image={yml.info_box.image && yml.info_box.image.childImageSharp.fluid}
                                            bgSize={`cover`}
                                            alt="Cnn Logo"
                                            />
                                    </Anchor>
                                </Column>
                            </Row>
                        </Card>
                    </Column>
                </Row>
            </Wrapper>
        }
        <Divider height="100px" />
        <Wrapper>
            <Title
                size="10"
                title={yml.upcoming.title}
                margin="left"
                variant="primary"
            />
            <Row>
                { cohorts && cohorts.map(cohort => 
                    <Column
                        size="3"
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
                            <Img 
                                src={cohort.certificate.logo} 
                                height="120px" 
                                borderRadius="1rem 1rem 0 0"
                            />
                            <H4 padding="10px">{cohort.certificate.name}</H4>
                            <Div padding="10px">
                                <Clock width="24" color={Colors.blue} fill={Colors.blue} />
                                <Paragraph
                                margin={`0 0 0 10px`}
                                fs_xs="18px"
                                fs_sm="18px"
                                fs_md="9px"
                                fs_lg="11px"
                                fs_xl="14px">
                                    <Small display="block">Starting on:</Small>
                                    {dayjs(cohort.kickoff_date).format("ddd, D MMM YYYY")}
                                </Paragraph>
                            </Div>
                            <Div padding="10px">
                            <Link to={yml.button.apply_button_link}><Button color={Colors.red} textColor={Colors.white}>{yml.button.apply_button_text}</Button></Link>
                            </Div>
                        </Card>
                    </Column>
                )}
            </Row>
        </Wrapper>
        <Wrapper >
            <Row>
                <Column
                    size="12"
                    borderRadius="0 0 0 1.25rem"

                >
                    <Card shadow borders="1.25rem" height="426px" >
                        <Row
                            height="100%"
                            marginLeft="0"
                            marginRight="0"
                            customRespSize
                        >
                            <Column size="6" customRespSize respSize="6" paddingLeft="0" alignSelf="center" height="100%" backgroundSize="cover" border="custom" borderRadius="1.25rem 0 0 1.25rem" >
                                <Carousel showIndicators={false} showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>

                                    {yml.carousel_box.images.map((item, index) => {
                                        return (
                                            <Column
                                                key={index}
                                                size="12"
                                                customRespSize
                                                respSize="12"
                                                paddingLeft={`0`}
                                                border="custom"
                                                borderRadius="1.25rem 0 0 1.25rem"
                                            >
                                                <StyledBackgroundSection
                                                    className={`img-left`}
                                                    height={`426px`}
                                                    image={item.path.childImageSharp.fluid}
                                                    bgSize={`cover`}
                                                    alt="Cnn Logo"
                                                />
                                            </Column>
                                        )
                                    })}
                                </Carousel>

                            </Column>
                            <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" borderRadius="0 0 0 1.25rem">
                                <Row align="center" height="100%">
                                    <Column size="10" height="100%">
                                        <Divider height="50px" />
                                        <Row height="15%">
                                            <Column size="12">
                                                <H3 fs_xs="18px"
                                                    fs_sm="20px"
                                                    fs_md="18px"
                                                    fs_lg="20px"
                                                    fs_xl="24px" 
                                                    align="left" 
                                                >{yml.carousel_box.heading}</H3>
                                                <Paragraph primary margin="5px 0" align="left" ></Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="5%" align="around">
                                            <Column size="12" alignSelf="center">
                                                <Separator  variant="primary" />
                                            </Column>
                                        </Row>
                                        <Row height="30%">
                                            <Column size="12">
                                                <Paragraph
                                                    fs_xs="12px"
                                                    fs_sm="12px"
                                                    fs_md="12px"
                                                    fs_lg="14px"
                                                    fs_xl="14px" color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.carousel_box.content}</Paragraph>
                                            </Column>
                                        </Row>




                                    </Column>
                                </Row>
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
                    fluid(maxWidth: 800){
                        ...GatsbyImageSharpFluid_withWebp
                    }
                    }
                } 
                alt
            }
            button{
                apply_button_link
                apply_button_text
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
                      fluid(maxWidth: 800){
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
                          fluid(maxWidth: 300){
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
