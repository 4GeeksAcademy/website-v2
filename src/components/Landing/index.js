import React from "react"
import {Row, Column, Wrapper, Divider} from '../Sections'
import {H2, H5, H4, Title} from '../Heading'
import styled from "styled-components"
import {Colors,Img, Button} from '../Styling'
import WhoIsHiring from '../WhoIsHiring';
import Badges from '../Badges';
import AlumniProjects from '../AlumniProjects'
import ProgramDetails from '../ProgramDetails'
import ProgramDetailsMobile from '../ProgramDetailsMobile'
import WhyPython from '../WhyPython'
import Why4Geeks from '../Why4Geeks';
import News from '../News'
import { TestimonialsCarrousel } from '../Testimonials'
import GeeksVsOthers from '../GeeksVsOthers'
import ReactPlayer from 'react-player'
import {navigate} from "gatsby"

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
const Side = ({ video, image, heading, content, button }) => {

    if(video) return <ReactPlayer
        className='react-player alumni-player'
        file={{forceVideo: true}}
        light={image}
        controls={true}
        url={video}
        width='100%'
        height='100%'
    />
    if(image) return <Img
        src={image}
        borderRadius={"1.25rem"}
        alt={"4Geeks Academy Section"}
        margin="auto"
        height="100%"
        width="100%"
        backgroundSize={`cover`}
    ></Img>
    
    const [ h_xl, h_lg, h_md, h_sm, h_xs ] = heading.font_size;
    const [ c_xl, c_lg, c_md, c_sm, c_xs ] = content.font_size;
    return <>
        <H2 align="left" 
            fontSize={h_xl || "20px"}  fs_xl={h_xl}  fs_md={h_md} fs_sm={h_sm} fs_xs={h_xs} 
            margin="30px 0 20px 0" type="h1">{heading.text}</H2>
        <H5 align="left" 
            fontSize={c_xl || "16px"} fs_sm={c_sm} fs_md={c_md} fs_sm={c_sm} fs_xs={c_xs} 
            fontHeight="30px">{content.text}</H5>
        {button && <Button outline width="200px" 
            color={button.color || Colors.blue} 
            textColor={Colors.black} 
            margin="2rem 0" padding=".35rem.85rem"
            onClick={() => {
                if(button.path && button.path.indexOf("http") > -1) window.open(button.path);
                else navigate(button.path);
            }}
        >
            {button.text}
        </Button>}
    </>
}
export const TwoColumn = ({ left, right }) => {
    return <Row m_sm="0px 0px 100px 0">
    <Column size="6" size_sm="12" maxHeight="300px" align_sm="center">
        <Side {...left} />
    </Column>
    <Column size="6" size_sm="12">
        <Side {...right} />
    </Column>
  </Row>
}

export const landingSections = {
    in_the_news: ({ session, pageContext, yml, course, location }) => <Wrapper p_sm="0" p_xs="30 0 0 0">
        <H4 align="center" fontSize="18px" color={Colors.darkGray} 
            margin="20px 0px 10px 0px" 
            m_sm="20px auto" 
            maxWidth="350px"
        >{yml.heading}
        </H4>
        <News location={location ? location : session && session.location && session.location.breathecode_location_slug} lang={pageContext.lang}  />
    </Wrapper>,
    badges: ({ session, data, pageContext, yml, course }) => 
    <Wrapper p_sm="0" p_xs="0"><Badges lang={pageContext.lang} /></Wrapper>,
    geeks_vs_others: ({ session, pageContext, yml, course }) => 
    <Wrapper margin="100px" m_sm="50px 0" p_sm="0" p_xs="0">
        <Title
            type="h2"
            title={yml.heading}
            paragraph={yml.sub_heading}
            paragraphColor={Colors.blue}
            variant="primary"
            size="10"
        />
        <GeeksVsOthers lang={pageContext.lang} limit={yml.total_rows} />
    </Wrapper>,
    program_details: ({ session, pageContext, yml, course }) => <Wrapper p_xs="0">
        <Title
            size="10"
            marginTop="40px"
            title={yml.heading}
            paragraph={yml.sub_heading}
            variant="primary"
        />
        <ProgramDetails details={course && course.details} />
        <ProgramDetailsMobile details={course && course.details} />
    </Wrapper>,
    why_python: ({ session, pageContext, yml, course }) => <Wrapper margin="50px 0" p_sm="0">
        <WhyPython heading={yml.heading} subheading={yml.sub_heading} lang={pageContext.lang} />
    </Wrapper>,
    testimonials: ({ session, data, pageContext, yml, course }) => <Wrapper margin="100px" m_sm="0" p_xs="0">
    <Title
        variant="primary"
        title={yml.testimonial.heading}
        paragraph={yml.testimonial.sub_heading}
        maxWidth="66%"
    // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
    />
    <TestimonialsCarrousel lang={data.allTestimonialsYaml.edges} />
    </Wrapper>,
    why_4geeks: ({ session, pageContext, yml, course }) => <Wrapper margin="50px 0" p_xs="0">
    <Title
        title={yml.heading}
        variant="primary"
    />
    <Why4Geeks lang={pageContext.lang} playerHeight="250px" />
    </Wrapper>,
    alumni_projects: ({ session, data, pageContext, yml, course }) => <Wrapper margin="100px" m_sm="0" p_xs="0">
    <Title
        size="10"
        title={yml.heading}
        paragraph={yml.sub_heading}
        paragraphColor={Colors.darkGray}
        maxWidth="66%"
        margin="auto"
        variant="primary"
    />
    <AlumniProjects lang={data.allAlumniProjectsYaml.edges} hasTitle showThumbs="false"  limit={2} />
    </Wrapper>,
    who_is_hiring: ({ session, data, pageContext, yml, course }) => {
        const hiring = data.allPartnerYaml.edges[0].node;
        return <Wrapper margin="100px" m_sm="0" p_xs="0">
            <Title
                size="10"
                title={hiring.partners.tagline}
                paragraph={hiring.partners.sub_heading}
                paragraphColor={Colors.darkGray}
                maxWidth="800px"
                margin="auto"
                variant="primary"
            />
                <WhoIsHiring
                    images={hiring.partners.images}
                />
            </Wrapper>
    },
    divider: ({ session, data, pageContext, yml, course }) => <Divider 
        height={yml.height[0]} 
        lg={yml.height[1]} 
        md={yml.height[2]} 
        sm={yml.height[3]} 
        xs={yml.height[4]} 
    />,
    two_column_left: ({ session, data, pageContext, yml, course }) => <Wrapper margin="50px 0">
        <TwoColumn 
        left={{ image: yml.image, video: yml.video }}
        right={{ heading: yml.heading, content: yml.content, button: yml.button }}
        />
    </Wrapper>,
    two_column_right: ({ session, data, pageContext, yml, course }) => <Wrapper margin="50px 0">
    <TwoColumn 
        left={{ heading: yml.heading, content: yml.content, button: yml.button }}
        right={{ image: yml.image, video: yml.video }}
    />
    </Wrapper>,
}