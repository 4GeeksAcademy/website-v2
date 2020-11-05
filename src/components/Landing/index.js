import React from "react"
import {Row, Column, Wrapper, Divider, Div} from '../Sections'
import {H2, H5, H4, Title} from '../Heading'
import {Colors, Img, Button} from '../Styling'
import WhoIsHiring from '../WhoIsHiring';
import Badges from '../Badges';
import News from '../News'
import {navigate} from "gatsby"
import {requestSyllabus} from "../../actions"

import ReactPlayer from '../ReactPlayer';
import TestimonialsCarrousel from '../Testimonials';
import Why4Geeks from '../Why4Geeks';
import WhyPython from '../WhyPython';
import AlumniProjects from '../AlumniProjects';
import GeeksVsOthers from '../GeeksVsOthers';
import ProgramDetails from '../ProgramDetails';
import ProgramDetailsMobile from '../ProgramDetailsMobile';
import LeadForm from '../LeadForm';

const Side = ({video, image, heading, content, button, bullets}) => {

    if (video) return <ReactPlayer
        thumb={image && image.src}
        id={video}
        style={{
            width: '100%',
            height: '100%'
        }}
    />
    if (image) return <Img
        src={image.src}
        onClick={() => {
            if (image.link) {
                if (image.link.indexOf("http") > -1) window.open(image.link);
                else navigate(image.link);
            }
        }}
        style={image.style ? JSON.parse(image.style) : null}
        borderRadius={"1.25rem"}
        className="pointer"
        alt={"4Geeks Academy Section"}
        margin="auto"
        height="100%"
        width="100%"
        h_sm="250px"
        backgroundSize={`cover`}
    ></Img>

    const [h_xl, h_lg, h_md, h_sm, h_xs] = heading ? heading.font_size : [];
    const [c_xl, c_lg, c_md, c_sm, c_xs] = content ? content.font_size : [];
    return <>
        {heading && <H2 align="left"
            fontSize={h_xl || "20px"} fs_xl={h_xl} fs_md={h_md} fs_sm={h_sm} fs_xs={h_xs}
            margin="30px 0 20px 0" type="h1">{heading.text}</H2>
        }
        {content && <H5 align="left"
            padding={heading ? "0" : "20px"}
            fontSize={c_xl || "16px"} fs_sm={c_sm} fs_md={c_md} fs_sm={c_sm} fs_xs={c_xs}
            fontHeight="30px">{content.text}</H5>
        }
        {button && <Button outline width="200px"
            color={button.color || Colors.blue}
            textColor={Colors.black}
            margin="2rem 0" padding=".35rem.85rem"
            onClick={() => {
                if (button.path && button.path.indexOf("http") > -1) window.open(button.path);
                else navigate(button.path);
            }}
        >
            {button.text}
        </Button>}
    </>
}
export const TwoColumn = ({left, right, proportions}) => {
    const [left_size, right_size] = proportions ? proportions : [];

    return <Row display="flex" m_sm="0px 0px 100px 0">
        <Column size={left_size || 6} size_sm="12" maxHeight="300px" align_sm="center">
            <Side {...left} />
        </Column>
        <Column size={right_size || 6} size_sm="12" align_sm="center">
            <Side {...right} />
        </Column>
    </Row>
}
TwoColumn.defaultProps = {
    proportions: [],
    left: null,
    right: null,
}

export const landingSections = {
    in_the_news: ({session, pageContext, yml, course, location}) => <Wrapper p_sm="0" p_xs="30 0 0 0">
        <H4 align="center" fontSize="18px" color={Colors.darkGray}
            margin="20px 0px 10px 0px"
            m_sm="20px auto"
            maxWidth="350px"
        >{yml.heading}
        </H4>
        <News
            limit={yml.limit || 3}
            location={location ? location : session && session.location && session.location.breathecode_location_slug}
            lang={pageContext.lang}
            filter={!Array.isArray(yml.filter) ? null : (n) => yml.filter.includes(n.name)}
        />
    </Wrapper>,
    badges: ({session, data, pageContext, yml, course}) =>
        <Wrapper p_sm="0" p_xs="0"><Badges lang={pageContext.lang} /></Wrapper>,
    syllabus: ({session, data, pageContext, yml, course, location}) => <Div
        display="block"
        margin="50px 0px 0px 0px"
        m_sm="50px 0px"
        background={Colors.lightGray}
    >
        <Wrapper>
            <H5 fontSize="20px">{yml.heading.text}</H5>
            <LeadForm
                style={{padding: "10px 0px", maxWidth: "100%"}}
                inputBgColor={Colors.white}
                layout="flex"
                lang={pageContext.lang}
                sendLabel={yml.button ? yml.button.text : "SEND"}
                formHandler={requestSyllabus}
                data={{
                    course: {type: "hidden", value: course, valid: true},
                    utm_location: {type: "hidden", value: location, valid: true}
                }}
            />
        </Wrapper>
    </Div>,
    geeks_vs_others: ({session, pageContext, yml, course}) =>
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
    program_details: ({session, pageContext, yml, course}) => <Wrapper p_xs="0">
        <Title
            size="10"
            marginTop="40px"
            title={yml.heading}
            paragraph={yml.sub_heading}
            paragraphColor={Colors.gray}
            variant="primary"
        />
        <ProgramDetails details={course && course.details} lang={pageContext.lang} />
        <ProgramDetailsMobile details={course && course.details} />
    </Wrapper>,
    why_python: ({session, pageContext, yml, course}) => <Wrapper margin="50px 0" p_sm="0">
        <WhyPython heading={yml.heading} subheading={yml.sub_heading} lang={pageContext.lang} />
    </Wrapper>,
    testimonials: ({session, data, pageContext, yml, course}) => <Wrapper margin="100px" m_sm="0" p_xs="0">
        <Title
            variant="primary"
            title={yml.testimonial.heading}
            paragraph={yml.testimonial.sub_heading}
            paragraphColor={Colors.gray}
            maxWidth="66%"
        // paragraph={`Cities: ${yml.cities.map(item => {return (item)})}`}
        />
        <TestimonialsCarrousel lang={data.allTestimonialsYaml.edges} />
    </Wrapper>,
    why_4geeks: ({session, pageContext, yml, course}) => <Wrapper margin="50px 0" p_xs="0">
        <Title
            title={yml.heading}
            paragraph={yml.sub_heading}
            paragraphColor={Colors.gray}
            variant="primary"
        />
        <Why4Geeks lang={pageContext.lang} playerHeight="250px" />
    </Wrapper>,
    alumni_projects: ({session, data, pageContext, yml, course}) => <Wrapper margin="100px" m_sm="0" p_xs="0">
        <Title
            size="10"
            title={yml.heading}
            paragraph={yml.sub_heading}
            paragraphColor={Colors.darkGray}
            maxWidth="66%"
            margin="auto"
            variant="primary"
        />
        <AlumniProjects lang={data.allAlumniProjectsYaml.edges} hasTitle showThumbs="false" limit={2} />
    </Wrapper>,
    who_is_hiring: ({session, data, pageContext, yml, course, location}) => {
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
                images={hiring.partners.images.filter(p => !p.locations || p.locations === "all" || p.locations.includes(location))}
            />
        </Wrapper>
    },
    divider: ({session, data, pageContext, yml, course}) => <Divider
        height={yml.height[0]}
        lg={yml.height[1]}
        md={yml.height[2]}
        sm={yml.height[3]}
        xs={yml.height[4]}
    />,
    two_column_left: ({session, data, pageContext, yml, course}) => <Wrapper margin="50px 0">
        <TwoColumn
            left={{image: yml.image, video: yml.video}}
            right={{heading: yml.heading, content: yml.content, button: yml.button}}
            proportions={yml.proportions}
        />
    </Wrapper>,
    two_column_right: ({session, data, pageContext, yml, course}) => <Wrapper margin="50px 0">
        <TwoColumn
            left={{heading: yml.heading, content: yml.content, button: yml.button}}
            right={{image: yml.image, video: yml.video}}
            proportions={yml.proportions}
        />
    </Wrapper>
}