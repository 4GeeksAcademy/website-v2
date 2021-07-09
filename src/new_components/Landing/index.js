import React from "react"
import {GridContainerWithImage, Div, GridContainer} from '../Sections'
import {H2, H5, H4, Paragraph} from '../Heading'
import {Colors, Img, Button, StyledBackgroundSection} from '../Styling'
// import WhoIsHiring from '../../components/WhoIsHiring';
import Badges from '../Badges';
import News from '../News'
import {navigate} from "gatsby"
import {requestSyllabus} from "../../actions"
import ReactPlayer from '../ReactPlayer';
import TestimonialsCarrousel from '../Testimonials';
import Why4Geeks from '../With4Geeks';
// import WhyPython from '../WhyPython';
import AlumniProjects from '../AlumniProjects';
import GeeksVsOthers from '../GeeksVsOthers';
import ProgramDetails from '../ProgramDetails';
import ProgramDetailsMobile from '../ProgramDetailsMobile';
import LeadForm from '../LeadForm';
import OurPartners from "../OurPartners";
import About4Geeks from '../About4Geeks';
import IconsBanner from '../IconsBanner';
import ChooseYourProgram from '../ChooseYourProgram';


const Title = ({title, paragraph}) => {
    return (
        <GridContainer margin="40px 0 0 0">
            <H2 type="h2">{title}</H2>
            <Paragraph margin="26px 0" >{paragraph}</Paragraph>
        </GridContainer>
    )
}

const Side = ({video, image, heading, content, button, bullets}) => {

    if (video) return <ReactPlayer
        thumb={image && image.src}
        id={video}
        style={{
            width: '100%',
            height: '260px'
        }}
    />


    if (image) {
        const imgStyles = image.style ? JSON.parse(image.style) : null;
        const [img_h_xl, img_h_lg, img_h_md, img_h_sm, img_h_xs] = imgStyles && imgStyles.height ? Array.isArray(imgStyles.height) ? imgStyles.height : [imgStyles.height] : ["100%"];
        return <Img
            src={image.src}
            onClick={() => {
                if (image.link) {
                    if (image.link.indexOf("http") > -1) window.open(image.link);
                    else navigate(image.link);
                }
            }}
            style={imgStyles}
            // borderRadius={"1.25rem"}
            borderRadius={"3px"}
            className="pointer"
            alt={"4Geeks Academy Section"}
            margin="auto"
            height={img_h_xl}
            width={imgStyles ? imgStyles.width || "100%" : "100%"}
            h_sm={img_h_sm || "250px"}
            backgroundSize={`contain`}
        />
    }

    const [h_xl, h_lg, h_md, h_sm, h_xs] = heading ? heading.font_size : [];
    const [c_xl, c_lg, c_md, c_sm, c_xs] = content ? content.font_size : [];
    return <Div flexDirection_tablet="column" flexDirection="column" padding="36px 17px">
        {heading && <H2 
            textAlign_tablet="left"
            lineHeight="60px"
            fontSize={h_xs || "50px"} fs_xl={h_xl} fontSize_md={h_md} fontSize_sm={h_sm}
            margin="30px 0 20px 0" type="h1">{heading.text}</H2>
        }
        {content && 
        content.text.split('\n').map((p, i) =>
            <Paragraph 
                key={i}
                textAlign_tablet="left"
                padding={heading ? "0" : "20px"}
                margin="26px 0" 
                fontSize={c_xl || "16px"} fontSize_sm={c_sm} fonSize_md={c_md} fontSize_sm={c_sm} fontSize_xs={c_xs}
                fontHeight="30px">
                    {p}
            </Paragraph>
        )}

        {button && <Button outline width="200px"
            colorHoverText={Colors.white}
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
    </Div>
}

export const TwoColumn = ({left, right, proportions}) => {
    const [left_size, right_size] = proportions ? proportions : [];
    console.log("LEFT:::", left)
    console.log("RIGHT:::", right)
    // background: yml.background

    return <Div flexDirection="column" gap="0px" flexDirection_tablet="row"  m_sm="0px 0px 100px 0">
        <Div flexDirection="column" size_tablet={left_size || 6} size="12" maxHeight="300px" textAlign="center">
            <Side {...left} />
        </Div>
        <Div flexDirection="column" size_tablet={right_size || 6} size="12" textAlign="center">
            <Side {...right} />
        </Div>
    </Div>
}
TwoColumn.defaultProps = {
    proportions: [],
    left: null,
    right: null,
}

export const SingleColumn = ({column}) => {
    return <Div flexDirection="row" m_sm="0px 0px 100px 0">
        <Div flexDirection="column" size={12} size_sm="12" align_sm="center">
            <Side {...column} />
        </Div>
    </Div>
}
TwoColumn.defaultProps = {
    column: null,
}

export const Columns = ({columns, proportions}) => {
    return <Div flexDirection="row" m_sm="0px 0px 100px 0">
        {columns.map(c =>
            <Div flexDirection="column" size={c.size[0]} size_sm={c.size[2]} size_xs={c.size[3]} textAlign={c.align}>
                <Img
                    src={c.image.src}
                    onClick={() => {
                        if (c.image.link) {
                            if (c.image.link.indexOf("http") > -1) window.open(c.image.link);
                            else navigate(c.image.link);
                        }
                    }}
                    style={c.image.style ? JSON.parse(c.image.style) : null}
                    borderRadius={"1.25rem"}
                    className="pointer"
                    alt={"4Geeks Academy Section"}
                    margin="auto"
                    height="100%"
                    width="100%"
                    h_sm="250px"
                    backgroundSize={`cover`}
                ></Img>
                <Paragraph lineHeight="30px">{c.content.text}</Paragraph>
            </Div>
        )}
    </Div>
}
Columns.defaultProps = {
    columns: [],
    proportions: [],
}

export const landingSections = {
    
    in_the_news: ({session, pageContext, yml, course, location, index}) => <GridContainer key={index} p_sm="0" p_xs="30 0 0 0">
        <H4 align="center" fontSize="18px" color={Colors.darkGray}
            margin="20px 0px 10px 0px"
            m_sm="20px auto"
            maxWidth="350px"
        >{yml.heading}
        </H4>

        <News
            margin="40px 0 40px"
            limit={yml.limit || 3}
            location={location ? location : session && session.location && session.location.breathecode_location_slug}
            lang={pageContext.lang}
            filter={!Array.isArray(yml.filter) ? null : (n) => yml.filter.includes(n.name)}
        />
    </GridContainer>,

    about4Geeks: ({session, data, pageContext, yml, index}) => {
        return(
            <About4Geeks 
                lang={data.allLandingYaml.edges[0].node.about4Geeks}
            />
        )
    },

    iconogram: ({session, data, pageContext, yml, index}) => {
        let content = data.allLandingYaml.edges[0].node.iconogram
        return(
            <GridContainer background={Colors.lightYellow} columns="2" rows="2" columns_tablet="4" margin="0 0 58px 0" height="470px" height_tablet="320px" margin_tablet="0 0 78px 0">
            {Array.isArray(content.icons) && content.icons?.map((item, i) => {
              return (
                <IconsBanner icon={item.icon} index={i} title={item.title} />
              )
            })}
          </GridContainer>
        )
    },

    badges: ({session, data, pageContext, yml, course, index}) =>{
        let badges = data.allLandingYaml.edges[0].node.badges
        return(
            <Badges
                lang={pageContext.lang}
                background={Colors.verylightGray}
                paragraph={badges.heading}
                short_text
                padding="60px 0"
                padding_tablet="68px 0"
                margin="0"
                margin_tablet="0 0 78px 0"
            />
        )
    },
        // <GridContainer key={index} p_sm="0" p_xs="0"><Badges lang={pageContext.lang} /></GridContainer>,

    syllabus: ({session, data, pageContext, yml, course, location, index}) =>
        <GridContainer padding_tabletChild="0 8em" id="Syllabus" key={index} padding="50px 40px" padding_tablet="50px 40px" background={Colors.lightGray}>
            <Div
                key={index}
                flexDirection="column"
                size="12"
                size_tablet="12"
                width="100%"
                width_tablet="100%"
                // size_lg="4"
                // size_sm="6"
                // size_xs="12"
                margin="0"
                textAlign_sm="center"
                // margin_md="0 auto 0 70px"
            >
                <H5 type="h5" fontSize="20px" padding="0 0 35px 0">{yml.heading.text}</H5>
                <LeadForm
                    landingTemplate
                    layout="block"
                    background={Colors.lightGray}
                    margin="0"
                    marginButton={`15px 0 30px auto`}
                    buttonBorderRadius="3px"
                    justifyContentButton="center"
                    inputBgColor="#F9F9F9"
                    // style={{padding: "10px 0px", maxWidth: "100%"}}
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

            {/* <LeadForm
              landingTemplate
              layout="block"
              background={Colors.verylightGray}
              margin="0"
              formHandler={requestSyllabus}
              heading={yml.form.heading}
              motivation={yml.form.motivation}
              sendLabel={yml.form.button_label}
              redirect={yml.form.redirect}
              inputBgColor="#F9F9F9"
              lang={pageContext.lang}
              fields={yml.form.fields}
              data={preData}
              justifyContentButton="center"
              marginButton={`15px 0 30px auto`}
            /> */}
            </Div>
        </GridContainer>
    ,
    geeks_vs_others: ({session, pageContext, yml, course, index}) => {
        return (
            <React.Fragment id="Geeks_vs_others" key={index}>
                <Title title={yml.heading} paragraph={yml.sub_heading} />
                <GeeksVsOthers key={index} lang={pageContext.lang} limit={yml.total_rows} title={yml.heading} paragraph={yml.sub_heading} />,
            </React.Fragment>

        )
    },

    program_details: ({session, pageContext, yml, data, index}) => {
        const course = data.allCourseYaml.edges.length > 0 ? data.allCourseYaml.edges[0].node : {};
        return (
            <React.Fragment id="Program_details" key={index}>
                {/* <Title title={yml.heading} paragraph={yml.sub_heading} /> */}
                <ProgramDetails details={course?.details} lang={pageContext.lang} />
                <ProgramDetailsMobile details={course && course.details} />
            </React.Fragment>
        )
    },

    choose_your_program: ({session, pageContext, yml, data, index}) => {
        // const course = data.allCourseYaml.edges.length > 0 ? data.allCourseYaml.edges[0].node : {};
        let chooseYourProgram = data.allLandingYaml.edges[0].node?.choose_your_program
        return (
            <React.Fragment id="choose_your_programs" key={index}>
                <Div width="100%" flexDirection="column">
                    <Div background={Colors.lightGray} alignSelf="center" height="2px" width="94%" width_tablet="63.4%"/>
                </Div>
                <ChooseYourProgram 
                    // chooseProgramRef={chooseProgramRef}
                    landingTemplate
                    title={chooseYourProgram.title}
                    paragraph={chooseYourProgram.paragraph}
                    lang={pageContext.lang}
                    programs={chooseYourProgram.programs} />

            </React.Fragment>
        )
    },

    language_banner: ({session, pageContext, yml, data, index}) => {

        const banner = data.allLandingYaml.edges[0].node?.language_banner
        return(
            <GridContainerWithImage height_tablet="100%" background="#E3F9FE" padding="36px 17px" padding_tablet="36px 0 54px 0" columns_tablet="14" margin="0 0 36px 0" margin_tablet="0 0 75px 0" >
                <Div flexDirection="column" justifyContent_tablet="start" padding_tablet="70px 0 0 0" gridColumn_tablet="2 / 8">
                    <H2 textAlign_tablet="left" fontSize="50px" lineHeight="60px">{`${banner.title}`}</H2>
                    {/* <Paragraph textAlign_tablet="left" margin="26px 0">{banner.paragraph} </Paragraph> */}
                    {banner.paragraph.split('\n').map((p, i) =>
                        <Paragraph textAlign_tablet="left" margin="26px 0" key={i}>{p}</Paragraph>
                    )}
                </Div>
                <Div display_tablet="flex" height="auto" width="100%" gridColumn_tablet="8 / 15" style={{position: "relative"}}>
                    <StyledBackgroundSection
                        height_tablet="450px"
                        height="200px"
                        width="100%"
                        image={banner.image && banner.image.childImageSharp.gatsbyImageData}
                        bgSize={`contain`}
                        alt={banner.image_alt}
                    />
                </Div>
            </GridContainerWithImage>
        )
    },

    testimonials: ({session, data, pageContext, yml, index}) => <Div id="Testimonials" key={index} flexDirection="column" margin="50px" margin_tablet="100px" m_sm="0" p_xs="0">
        <TestimonialsCarrousel lang={data.allTestimonialsYaml.edges} />
    </Div>,

    why_4geeks: ({session, pageContext, yml, index}) => <Div id="Why_4Geeks" key={index} flexDirection="column" margin="0" padding="0">
        <Title
            title={yml.heading}
            paragraph={yml.sub_heading}
            paragraphColor={Colors.gray}
            variant="primary"
        />
        <Why4Geeks landingTemplate lang={pageContext.lang} playerHeight="auto" />
    </Div>,
    alumni_projects: ({session, data, pageContext, yml, index}) => <Div id="Alumni_Projects" key={index} flexDirection="column" margin="0" margin_tablet="100px" padding="0">
        {/* <Title
            size="10"
            title={yml.heading}
            paragraph={yml.sub_heading}
            paragraphColor={Colors.darkGray}
            maxWidth="66%"
            margin="auto"
            variant="primary"
        /> */}
        <AlumniProjects lang={data.allAlumniProjectsYaml.edges} hasTitle showThumbs="false" limit={2} />
    </Div>,
    who_is_hiring: ({session, data, pageContext, yml, location, index}) => {
        const hiring = data.allPartnerYaml.edges[0].node;
        let landingHiriging = data.allLandingYaml.edges[0].node?.who_is_hiring

        return <Div id="Who_is_hiring" key={index} flexDirection="column" margin="100px 0" margin_tablet="100px" m_sm="0" p_xs="0">
            <OurPartners
                images={hiring.partners.images} 
                margin="0"
                padding="0 ​0 75px 0"
                marquee
                paddingFeatured="0 0 70px 0"
                featuredImages={landingHiriging?.featured}
                showFeatured
                withoutLine
                title={landingHiriging ? landingHiriging.heading : hiring.partners.tagline} 
                paragraph={landingHiriging ? landingHiriging.sub_heading : hiring.partners.sub_heading} 
            />

        </Div>
    },


    divider: ({session, data, pageContext, yml, index}) => <Div flexDirection="column" key={index}
        height={yml.height[0]}
        lg={yml.height[1]}
        md={yml.height[2]}
        sm={yml.height[3]}
        xs={yml.height[4]}
    />,
    two_column_left: ({session, data, pageContext, yml, index}) => <Div key={index} background={Colors[yml.background] || yml.background} flexDirection="column" padding="0 0 50px 0" padding_tablet="50px 14%" margin="0 0 75px 0">
        <TwoColumn
            left={{image: yml.image, video: yml.video}}
            right={{heading: yml.heading, content: yml.content, button: yml.button,}}
            proportions={yml.proportions}
        />
    </Div>,
    two_column_right: ({session, data, pageContext, yml, index}) => <Div key={index} background={Colors[yml.background] || yml.background} flexDirection="column" padding="0 0 50px 0" padding_tablet="50px 14%" margin="0 0 75px 0">
        <TwoColumn
            left={{heading: yml.heading, content: yml.content, button: yml.button}}
            right={{image: yml.image, video: yml.video,}}
            proportions={yml.proportions}
        />
    </Div>,
    single_column: ({session, data, pageContext, yml, index}) => <Div key={index} flexDirection="column" padding="0px 0" padding_tablet="50px 14%">
        <SingleColumn
            column={{
                heading: yml.heading,
                content: yml.content,
                button: yml.button,
                image: yml.image,
                video: yml.video
            }}
        />
    </Div>,
    columns: ({session, data, pageContext, yml, index}) => <Div key={index} flexDirection="column" margin="50px 0">
        {/* <Title
            size="10"
            title={yml.heading.text}
            paragraph={yml.sub_heading}
            paragraphColor={Colors.darkGray}
            maxWidth="800px"
            margin="auto"
            variant="primary"
        /> */}
        <Columns columns={yml.columns} proportions={yml.proportions} />
    </Div>
}