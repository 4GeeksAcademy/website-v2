import React, {useState, useEffect} from 'react';
import {GridContainer, GridContainerWithImage, Div, Grid} from '../Sections'
import PropTypes from "prop-types"
import {H2, H3, H4, H5, Paragraph} from '../Heading';
import {Colors, Anchor, Button, StyledBackgroundSection, Span} from '../Styling';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {Carousel} from 'react-responsive-carousel';
import Carousel, {Dots} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import {Link} from 'gatsby';
import Fragment from "../Fragment"
import Icon from "../Icon"
import ReactPlayer from '../ReactPlayer';


const AlumniProjects = ({lang, showThumbs, limit, playerHeight, title, paragraph}) => {
    const [projects, setProjects] = useState(lang[0].node.projects.slice(0, limit || lang[0].node.projects.length))
    const [value, setValue] = useState(0);

    const onChange = e => setValue(e);
    return (
        // <Fragment github="/components/alumni_projects">
        <>
            <GridContainer margin="73px 0 60px 0"
            >
                <Div
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    padding_tablet="0 4em"
                    padding="0 2em"
                >
                    <H2 margin="0 0 15px 0" fontWeight="900">{title}</H2>
                    <Paragraph>{paragraph}</Paragraph>
                </Div>
            </GridContainer>
            <Carousel value={value} onChange={onChange} dots={true}>
                {projects.map((item, index) => {
                    return (
                        <GridContainerWithImage imageSide="left" columns_tablet="14" gridGap_tablet="0" margin_tablet="0 0 36px 0" margin="0 0 50px 0">
                            <Div background={Colors.lightGray} height_tablet="auto" padding="17px 51px" gridColumn_tablet="1 / 9">
                                {item.project_video === "" ?

                                    <StyledBackgroundSection
                                        // height={`166px`}
                                        image={item.project_image.childImageSharp.fluid}
                                        bgSize={`cover`}
                                        alt="Cnn Logo"
                                    />
                                    :
                                    <ReactPlayer
                                        id={item.project_video}
                                        thumb={item.project_image}
                                        imageSize="maxresdefault"
                                        right_tablet="-93px"
                                        left_tablet="unset"
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                }
                            </Div>
                            <Div flexDirection="column" gridColumn_tablet="10 / 15 " >
                                <H3
                                    textAlign="left"
                                    margin={`10px 0`}
                                >Project: {`${item.project_name}`}
                                </H3>
                                <H4
                                    textAlign="left"
                                    fontWeight="900"
                                    margin={`24px 0 9px 0`}
                                > {`> MADE BY:`}
                                </H4>
                                {item.alumni.map((alumni, i) => {
                                    return (
                                        <Div key={i} justifyContent="start" margin={`0 0 20px 0`} display="flex" >
                                            <H4
                                                textAlign="left"
                                                fontWeight={`400`}
                                                width="fit-content"
                                                margin="0 20px 0 0"
                                            >{`${alumni.first_name} ${alumni.last_name}`}
                                            </H4>
                                            {alumni.github != "" &&
                                                <>
                                                    <a target="_blank" href={alumni.github} rel="noopener noreferrer nofollow">
                                                        <Icon icon="github" width="22" color={Colors.black} fill={Colors.black} />
                                                    </a>
                                                </>
                                            }
                                            {alumni.linkedin != "" &&
                                                <>
                                                    <a target="_blank" href={alumni.linkedin} rel="noopener noreferrer nofollow">
                                                        <Icon icon="linkedin" width="22" color={Colors.blue} fill={Colors.blue} />
                                                    </a>
                                                </>
                                            }
                                        </Div>
                                    )
                                })}
                                <H4
                                    textAlign="left"
                                    fontWeight="900"
                                    margin={`20px 0 6px 0`}
                                    style={{borderTop: "1px solid #ebebeb"}}
                                > {`> DESCRIPTION:`}
                                </H4>
                                <Paragraph
                                    color={Colors.gray}
                                    textAlign="left"
                                >{item.project_content}
                                </Paragraph>
                                {/* <Div display="flex">
                                    {item.project_video && <Anchor to={`${item.project_video}`} target="_blank" rel="noopener noreferrer nofollow">
                                        <Paragraph margin={`10px 5px 0 0`} height={`20px`} fontSize={`18px`} align_sm={`left`}>Video Demo •</Paragraph>
                                    </Anchor>
                                    }
                                    {item.live_link && <Anchor to={`${item.live_link}`} target="_blank" rel="noopener noreferrer nofollow">
                                        <Paragraph margin={`10px 0`} height={`20px`} fontSize={`18px`} align_sm={`left`}>Live Link </Paragraph>
                                    </Anchor>
                                    }
                                </Div> */}
                            </Div>

                        </GridContainerWithImage>

                    )
                })
                }
                {/* <Div display="block" align="center" padding="150px 0">
                    <H2 width="100%">{lang[0].node.button_section.button_text}</H2>
                    <Link to={lang[0].node.button_section.button_link}>
                        <Button outline width="200px" color={Colors.blue} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">{lang[0].node.button_section.button_text}</Button>
                    </Link>
                </Div> */}
            </Carousel>
            <Dots value={value} onChange={onChange} />
        </>
    )
};
AlumniProjects.propTypes = {
    limit: PropTypes.number
}
AlumniProjects.defaultProps = {
    limit: 0,
    playerHeight: "100%"
}
export default AlumniProjects;




