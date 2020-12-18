import React, {useState, useEffect} from 'react';
import {Row, Column, Div} from '../Sections'
import PropTypes from "prop-types"
import {H2, H3, H4, H5, Paragraph} from '../Heading';
import {Colors, Anchor, Button, StyledBackgroundSection, Span} from '../Styling';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Link} from 'gatsby';
import Fragment from "../Fragment"
import Icon from "../Icon"
import ReactPlayer from '../ReactPlayer';


const AlumniProjects = ({lang, showThumbs, limit, playerHeight}) => {
    const [projects, setProjects] = useState(lang[0].node.projects.slice(0, limit || lang[0].node.projects.length))

    return (
        <Fragment github="/components/alumni_projects">
            <Carousel
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                autoPlay={false}
                infiniteLoop={true}
                showArrows={true}
                interval={5000}
                transitionTime={1000}
            >
                {projects.map((item, index) => {
                    return (
                        <Row key={index}
                            borders="1.25rem"
                            marginLeft="0"
                            marginRight="0"
                            display="flex"
                        >
                            <Column
                                size="6"
                                size_sm="12"
                                display={`flex`}
                                flexDirection={`column`}
                                justifyContent={`space-between`}
                                alignSelf="center"
                                height="100%"
                                image="no"
                                borderRadius="0 0 0 1.25rem"
                                paddingLeft={`28px`}
                                paddingRight={`28px`}
                            >
                                <H3
                                    align_sm={`left`}
                                    color={Colors.blue}
                                    fs_lg={`40px`}
                                    fs_sm={`30px`}
                                    fs_xs={`30px`}
                                    align="left"
                                    margin={`10px 0`}
                                >{`Meet  `}
                                </H3>
                                {item.alumni.map((alumni, i) => {
                                    return (
                                        <Div key={i} flexDirection={`column`} margin={`10px 0 5px 0`} display="flex">
                                            <H5
                                                align="left"
                                                align_sm="left"
                                                fontWeight={`400`}
                                            >{`${alumni.first_name} ${alumni.last_name}`}
                                            </H5>
                                            <Row marginBottom="5px" display="flex">
                                                <Column size="12" alignSm="center" display={`flex`} flexDirection={`row`} alignItems={`end`}>
                                                    <Paragraph
                                                        primary
                                                        fs_xs="12px"
                                                        fs_sm="12px"
                                                        fs_md="14px"
                                                        fs_lg="16px"
                                                        fs_xl="16px"
                                                        lineHeight="22px"
                                                        // margin="5px 0"
                                                        align="left" >
                                                        {alumni.job_title}
                                                    </Paragraph>
                                                    {alumni.github != "" &&
                                                        <Span style={{width: "22px", height: "22px"}} margin="0 5px" >
                                                            <a target="_blank" href={alumni.github} rel="noopener noreferrer nofollow">
                                                                <Icon icon="github" width="22" color={Colors.gray} fill={Colors.gray} />
                                                            </a>
                                                        </Span>
                                                    }
                                                    {/* {alumni.github != "" && <Icon icon="github" width="14" color={Colors.blue} fill={Colors.blue} />} */}
                                                    {alumni.linkedin != "" &&
                                                        <Span style={{width: "22px", height: "22px"}}>
                                                            <a target="_blank" href={alumni.linkedin} rel="noopener noreferrer nofollow">
                                                                <Icon icon="linkedin" width="22" color={Colors.gray} fill={Colors.gray} />
                                                            </a>
                                                        </Span>
                                                    }
                                                </Column>
                                            </Row>
                                        </Div>
                                    )
                                })}
                                <H4
                                    margin={`0 0 10px 0`}
                                    color={Colors.gray}
                                    align="left"
                                    fs_lg="18px"
                                    fontSize="28px"
                                    lineHeight="20px"
                                    fontWeight={`400`}
                                >Project: {`${item.project_name}`}</H4>
                                <Paragraph
                                    margin={`0 0 14px 0`}
                                    align_sm={`left`}
                                    fs_xs="10px"
                                    fs_sm="11px"
                                    fs_md="13px"
                                    fs_lg="11px"
                                    fs_xl="16px" color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{item.project_content}
                                </Paragraph>
                                <Div display="flex">
                                    {item.project_video && <Anchor to={`${item.project_video}`} target="_blank" rel="noopener noreferrer nofollow">
                                        <Paragraph margin={`10px 5px 0 0`} height={`20px`} fontSize={`18px`} align_sm={`left`}>Video Demo •</Paragraph>
                                    </Anchor>
                                    }
                                    {item.live_link && <Anchor to={`${item.live_link}`} target="_blank" rel="noopener noreferrer nofollow">
                                        <Paragraph margin={`10px 0`} height={`20px`} fontSize={`18px`} align_sm={`left`}>Live Link </Paragraph>
                                    </Anchor>
                                    }
                                </Div>
                            </Column>

                            {item.project_video === "" ?
                                <Column
                                    size="6"
                                    size_sm="12"
                                    paddingRight={`28px`}
                                    paddingLeft={`28px`}
                                >
                                    <StyledBackgroundSection
                                        className={`image`}
                                        height={`350px`}
                                        image={item.project_image.childImageSharp.fluid}
                                        bgSize={`cover`}
                                        alt="Cnn Logo"
                                        borderRadius={`0 0 0 1.25rem`}
                                    />
                                </Column>
                                :
                                <Column size="6" size_sm="12" paddingRight={`0`}>
                                    <ReactPlayer
                                        id={item.project_video}
                                        thumb={item.project_image}
                                        imageSize="maxresdefault"
                                        style={{
                                            width: "100%",
                                            height: "350px"
                                        }}
                                    />
                                </Column>}
                        </Row>
                    )
                })
                }
                <Div display="block" align="center" padding="150px 0">
                    <H2 width="100%">{lang[0].node.button_section.button_text}</H2>
                    <Link to={lang[0].node.button_section.button_link}>
                        <Button outline width="200px" color={Colors.blue} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">{lang[0].node.button_section.button_text}</Button>
                    </Link>
                </Div>
            </Carousel>
            {limit > 0 && <Row height="10%" justifyContent="center" display="flex">
                <Column size="6" align="center">
                    <Link to={lang[0].node.button_section.button_link}>
                        <Button outline width="200px" color={Colors.gray} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">{lang[0].node.button_section.button_text}</Button>
                    </Link>
                </Column>
            </Row>
            }
        </Fragment>)
};
AlumniProjects.propTypes = {
    limit: PropTypes.number
}
AlumniProjects.defaultProps = {
    limit: 0,
    playerHeight: "100%"
}
export default AlumniProjects;




