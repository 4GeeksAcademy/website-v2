import React, {useState, useEffect} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider, Div} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, Address, Teacher, Glasses, Clock, Linkedin, Github, Button, RoundImage, BackgroundSection} from '../Styling';
import {Card} from '../Card';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Link} from 'gatsby';
import Fragment from "../Fragment"
import ReactPlayer from 'react-player'

const AlumniProjects = props => {
    const [slideIndex, setSlideIndex] = useState()
    let alumniData = props.lang[0].node
    return (
        <Fragment github="/components/alumni_projects">
            <Carousel
                showIndicators={false}
                showThumbs={false}
                selectedItem={slideIndex}
                showStatus={false}
                autoPlay={false}
                infiniteLoop={true}
                showArrows={true}
                interval={5000}
                transitionTime={1000}
            >
                {alumniData != null &&
                    alumniData.projects.map((item, index) => {
                        return (
                            <Card key={index} shadow borders="1.25rem" height="500px">
                                <Row
                                    height="100%"
                                    marginLeft="0"
                                    marginRight="0"
                                    customRespSize
                                >
                                    <Column
                                        size="6"
                                        display={`flex`}
                                        flexDirection={`column`}
                                        justifyContent={`space-between`}
                                        customRespSize
                                        respSize="6"
                                        alignSelf="center"
                                        height="100%"
                                        image="no"
                                        border="bottom"
                                        padding={`25px`}
                                        paddingLeft={`30px`}
                                        paddingRight={`25px`}
                                    >
                                        <Div flexDirection={`column`} alignItems={`start`} alignItems_xs={`center`} alignItems_sm={`center`}>
                                            <H3 primary color={Colors.blue} align="left" >{`Meet  `}</H3>
                                            {item.alumni.map((alumni, i) => {
                                                return (
                                                    <Div key={i} flexDirection={`column`} margin={`10px 0 5px 0`}>
                                                        <Row >
                                                            <Column size="12">
                                                                <H4
                                                                    fs_xs="16px"
                                                                    fs_sm="16px"
                                                                    fs_md="18px"
                                                                    fs_lg="20px"
                                                                    fs_xl="20px"
                                                                    primary align_xs="center"
                                                                    align="left"
                                                                    fontWeight={`400`}
                                                                >{`${alumni.first_name} ${alumni.last_name}`}
                                                                </H4>
                                                            </Column>
                                                        </Row>
                                                        <Row marginBottom="5px">
                                                            <Column size="12" alignSm="center" display={`flex`} flexDirection={`row`} alignItems={`end`}>
                                                                <Paragraph
                                                                    primary
                                                                    fs_xs="12px"
                                                                    fs_sm="12px"
                                                                    fs_md="14px"
                                                                    fs_lg="16px"
                                                                    fs_xl="16px"
                                                                    lineHeight="24px"
                                                                    // margin="5px 0"
                                                                    align="left" >
                                                                    {alumni.job_title}


                                                                </Paragraph>
                                                                {alumni.github != "" && <Span margin="0 5px" ><a target="_blank" href={alumni.github}><Github width="14" color={Colors.gray} fill={Colors.gray} /></a></Span>}
                                                                {/* {alumni.github != "" && <Github width="14" color={Colors.blue} fill={Colors.blue} />} */}
                                                                {alumni.linkedin != "" && <Span ><a target="_blank" href={alumni.linkedin}><Linkedin width="16" color={Colors.gray} fill={Colors.gray} /></a></Span>}
                                                            </Column>
                                                        </Row>
                                                    </Div>
                                                )
                                            })}
                                        </Div>
                                        <Row flexDirection={`column`} >
                                            <Column size="12">
                                                <Row align="left" marginBottom={`10px`}>
                                                    <Column size="10" customRespSize respSize="10" alignSelf="center">
                                                        <H4 color={Colors.gray} align="left" fs_xs="16px"
                                                            fs_sm="16px"
                                                            fs_md="16px"
                                                            fs_lg="16px"
                                                            fs_xl="24px"
                                                            lineHeight="20px"
                                                            fontWeight={`400`}
                                                        >{`${item.project_name}`}</H4>
                                                    </Column>
                                                </Row>
                                            </Column>
                                            <Column size="12">
                                                <Paragraph
                                                    fs_xs="10px"
                                                    fs_sm="11px"
                                                    fs_md="13px"
                                                    fs_lg="11px"
                                                    fs_xl="16px" color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{item.project_content}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row >
                                            <Column size="4">
                                                {item.live_link != "" || undefined || null ?
                                                    <a href={`${item.live_link}`} target="_blank">
                                                        <Card

                                                            color="darkGray"
                                                            padding="5px 5px"
                                                            borders=".75rem"
                                                            margin="5px 3px"
                                                            w_xs="20px"
                                                        >
                                                            <Paragraph
                                                                cursor={`pointer`}
                                                                fs_xs="14px"
                                                                fs_sm="14px"
                                                                fs_md="10px"
                                                                fs_lg="14px"
                                                                fs_xl="16px"
                                                                color={Colors.darkGray}
                                                                align="center"
                                                            // lineHeight="20px"
                                                            >
                                                                Live Link
                                                    </Paragraph>
                                                        </Card>
                                                    </a>
                                                    : null}
                                            </Column>
                                        </Row>




                                    </Column>
                                    {item.project_video === "" ?
                                        <Column
                                            size="6"
                                            customRespSize
                                            respSize="6"
                                            paddingRight={`0`}
                                        >
                                            <BackgroundSection
                                                className={`image`}
                                                height={`500px`}
                                                image={item.project_image.image.childImageSharp.fluid}
                                                bgSize={`cover`}
                                                alt="Cnn Logo"
                                                borderRadius={`0 0 0 1.25rem`}
                                            />
                                        </Column>
                                        :
                                        <Column size="6" paddingRight={`0`}>
                                            <ReactPlayer
                                                className='react-player alumni-player'
                                                file={{forceVideo: true}}
                                                style={{height: props.playerHeight}}
                                                light={item.project_image.image}
                                                controls={true}
                                                url={item.project_video}
                                                width='100%'
                                                height='100%'
                                            /></Column>}

                                </Row>
                            </Card>
                        )
                    })
                }
            </Carousel>
            <Divider height="50px" />
            {props.showThumbs === "true"
                ?
                <Row height="auto" align="center">
                    {alumniData != null &&
                        alumniData.projects.map((project, i) => {
                            return (
                                <Column key={i} size="2" customRespSize respSize="2" padding="0 25px" onClick={() => setSlideIndex(i)}>
                                    <BackgroundSection
                                        className={`img-thumbs`}
                                        height={`40px`}
                                        data={project.project_image.image.childImageSharp.fluid}
                                        bgSize={`cover`}
                                        alt={project.project_image.image_alt}
                                    >
                                        <Row height="100%" align="around">
                                            <Column size="12" alignSelf="center" align="center">
                                                <H4
                                                    color={Colors.white}
                                                    fs_xs="9px"
                                                    fs_sm="12px"
                                                    fs_md="12px"
                                                    fs_lg="14px"
                                                    fs_xl="16px"
                                                >
                                                    {project.project_name}
                                                </H4>
                                            </Column>
                                        </Row>
                                    </BackgroundSection>
                                </Column>
                            )
                        })}
                </Row>
                : props.showThumbs === "false" &&
                <Row height="10%" align="center">
                    <Column size="6" align="center">
                        <Link to={alumniData.button_section.button_link}>
                            <Button outline width="200px" color={Colors.gray} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">{alumniData.button_section.button_text}</Button>
                        </Link>
                    </Column>
                </Row>
            }
        </Fragment>)
};
export default AlumniProjects;




