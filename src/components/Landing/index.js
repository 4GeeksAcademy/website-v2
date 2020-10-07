import React from "react"
import {Row, Column, Wrapper} from '../Sections'
import {H2, H5, H4, Title} from '../Heading'
import styled from "styled-components"
import {Colors} from '../Styling'
import WhoIsHiring from '../WhoIsHiring';
import AlumniProjects from '../AlumniProjects'
import ProgramDetails from '../ProgramDetails'
import ProgramDetailsMobile from '../ProgramDetailsMobile'
import WhyPython from '../WhyPython'
import Why4Geeks from '../Why4Geeks';
import News from '../News'
import { TestimonialsCarrousel } from '../Testimonials'
import GeeksVsOthers from '../GeeksVsOthers'

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
const Side = ({ image, heading, content }) => {
    if(image){
        return <Image
            src={image}
        />
    } 
    else return <>
      <H2 align="left" margin="30px 0 20px 0" type="h1">{heading}</H2>
      <H5 align="left" fontSize="20px" fontHeight="30px">{content}</H5>
    </>
}
export const TwoColumn = ({ left, right }) => {
    return <Row m_sm="0px 0px 100px 0">
    <Column size="5" size_sm="12" height="300px" align_sm="center">
        <Side {...left} />
    </Column>
    <Column size="7" size_sm="12">
        <Side {...right} />
    </Column>
  </Row>
}

export const landingSections = {
    in_the_news: ({ session, pageContext, yml, city, course }) => <Wrapper>
    <H4 align="center" fontSize="18px" color={Colors.darkGray} 
        margin="20px 0px 10px 0px" 
        m_sm="20px auto" 
        maxWidth="350px"
    >{yml.heading}
    </H4>
    <News location={session && session.location && session.location.breathecode_location_slug} lang={pageContext.lang}  />
    </Wrapper>,
    geeks_vs_others: ({ session, pageContext, yml, city, course }) => <Wrapper margin="100px">
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
    program_details: ({ session, pageContext, yml, city, course }) => <Wrapper>
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
    why_python: ({ session, pageContext, yml, city, course }) => <Wrapper margin="50px 0">
    <WhyPython heading={yml.heading} subheading={yml.sub_heading} lang={pageContext.lang} />
    </Wrapper>,
    testimonials: ({ session, data, pageContext, yml, city, course }) => <Wrapper margin="100px">
    <Title
        variant="primary"
        title={yml.testimonial.heading}
        paragraph={yml.testimonial.sub_heading}
        maxWidth="66%"
    // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
    />
    <TestimonialsCarrousel lang={data.allTestimonialsYaml.edges} />
    </Wrapper>,
    why_4geeks: ({ session, pageContext, yml, city, course }) => <Wrapper margin="50px 0">
    <Title
        title={yml.heading + " " + city}
        variant="primary"
    />
    <Why4Geeks lang={pageContext.lang} playerHeight="250px" />
    </Wrapper>,
    alumni_projects: ({ session, data, pageContext, yml, city, course }) => <Wrapper margin="100px">
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
    who_is_hiring: ({ session, data, pageContext, yml, city, course }) => {
        const hiring = data.allPartnerYaml.edges[0].node;
        return <Wrapper margin="100px">
            <Title
                size="10"
                title={hiring.partners.tagline}
                paragraph={hiring.partners.sub_heading}
                paragraphColor={Colors.darkGray}
                maxWidth="66%"
                margin="auto"
                variant="primary"
            />
                <WhoIsHiring
                    images={hiring.partners.images}
                />
            </Wrapper>
    },
    two_column_left: ({ session, data, pageContext, yml, city, course }) => <Wrapper>
        <TwoColumn 
        left={{ image: yml.image }}
        right={{ heading: yml.heading, content: yml.content }}
        />
    </Wrapper>,
    two_column_right: ({ session, data, pageContext, yml, city, course }) => <Wrapper>
    <TwoColumn 
        left={{ heading: yml.heading, content: yml.content }}
        right={{ image: yml.image }}
    />
    </Wrapper>,
}