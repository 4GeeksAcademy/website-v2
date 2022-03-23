import React, {useState, useEffect} from 'react';
import {Header, GridContainer, Container, Div, Grid} from "../components/Sections";
import {Title, H1, H2, H3, H4, H5, Paragraph} from '../components/Heading';
import {Button, Colors, StyledBackgroundSection} from '../components/Styling';
import ReactPlayer from '../components/ReactPlayer'
import Icon from '../components/Icon'
import BaseRender from './_baseLayout';
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const TestimonialCard = ({highlighted, featured, height, height_tablet, studentRating, className, background, image, video, name, short_content, description, gridAreaPosition, gridRowPosition, gridAreaPosition_tablet, gridRowPosition_tablet}) => {

    const StarRating = ({totalStars}) => {
        return (
            <div>
                {[...Array(5)].map((m, i) => (
                    // <Icon key={i} style={{marginRight: "8px"}} icon="linkedin" height="12px" width="12px" stroke={Colors.white} fill="#0e76a8" />
                    <Icon key={i} style={{marginRight: "8px"}} icon="star" height="12px" width="12px" stroke={Colors.darkGray} fill={i >= studentRating ? "transparent" : `${Colors.darkGray}`} />
                ))}
            </div>
        );
    };

    return (
        <Div
            flexDirection="column"
            position="relative"
            // height={height}
            // height_tablet={height_tablet}
            background={background}
            borderRadius="3px"
            // gridColumn_tablet={gridAreaPosition}
            // gridRow_tablet={gridRowPosition}
            padding="20px"
            border={`1px solid ${Colors.lightGray}`}
            boxShadow={`0px 2px 5px rgba(0, 0, 0, 0.1)`}
            style={{breakInside: 'avoid', marginBottom:'1em'}}
        >
            <Div>
                <GatsbyImage
                    // fluid={image && image.childImageSharp.fluid}
                    image={getImage(image && image.childImageSharp.gatsbyImageData)}
                    style={{height: "39px", maxWidth: "39px", backgroundSize: `cover`}}
                />
                <Div flexDirection="column" margin="0 0 0 9px">
                    <H3
                        fontSize="15px"
                        lineHeight="19px"
                        textAlign="left"
                    >
                        {name}
                    </H3>
                    <H4
                        fontSize="14px"
                        lineHeight="22px"
                        textAlign="left"
                    >
                        {short_content}
                    </H4>
                </Div>
            </Div>
            <Div margin="30px 0 17px 0">
                <StarRating totalStars={studentRating} />
            </Div>
            {!video && <Paragraph textAlign="left" >{description}</Paragraph>}
            {video &&
                <>
                    <Div
                        // padding="19px 0 0 25px"
                        padding_tablet="0"
                        width="100%"
                        style={{breakInside: 'avoid'}}
                        // height_tablet="310px"
                        // alignSelf="baseline"
                    >
                        <ReactPlayer
                            With_Modal={true}
                            // className={className}
                            className={"react-player-testimonials-small"}
                            thumb={image}
                            id={video && video}
                            width='100%'
                            width_tablet="100%"
                            // height={"82px"}
                            style={{breakInside: 'avoid'}}
                        />
                    </Div>
                </>
            }
            {/* <Paragraph style={{position: "absolute", bottom: "20px", left: "21px"}} textAlign="left" margin="12px 0 0 0" color={Colors.blue}>View Review</Paragraph> */}

        </Div>
    )
}
const featuredPositions = [{
    position: "1 / 5",
    height: "378px",
    height_tablet: "",
    size: "small",
    className: "react-player-testimonials-small "
},
{
    position: "5 / 13",
    height: "378px",
    height_tablet: "",
    size: "big",
    className: "react-player-testimonials-big "
}]

const defaultPositions = [
    {
        position: "1 / 5",
        // row_position: "1 / 4",
        height: "378px",
        height_tablet: "100%",
        size: "small",
        className: "react-player-testimonials-small "
    },
    {
        position: "5 / 9",
        // row_position: "1 / 4",
        height: "378px",
        height_tablet: "100%",
        size: "small",
        className: "react-player-testimonials-small"
    },
    {
        position: "9 / 13",
        // row_position: "1 / 6",
        height: "auto",
        height_tablet: "430px",
        size: "big",
        className: "react-player-testimonials-big "
    },
    {
        position: "1 / 5",
        // row_position: "4 / 7",
        height: "378px",
        height_tablet: "507px",
        size: "big",
        className: "react-player-testimonials-big"
    },
    {
        position: "5 / 9",
        // row_position: "4 / 7",
        height: "378px",
        height_tablet: "auto",
        size: "small",
        className: "react-player-testimonials-small"
    },
]
const SuccessStories = (props) => {
    const {data, pageContext, yml} = props;
    let testimonials = data.allTestimonialsYaml.edges[0].node

    useEffect(()=>{
        if(yml.filter_indexes){
            testimonials.testimonials = data.allTestimonialsYaml.edges[0].node.testimonials.filter((num,ind) => yml.filter_indexes.includes(ind));
            console.log(testimonials.testimonials, 'testimonials.testimonials');
        }
    }, []);
    
    
    // console.log(yml, 'testimonials yml');
    // console.log(testimonials, 'testimonials');
    // console.log(testimonials.testimonials.filter((num,ind) => yml.filter_indexes.includes(ind)), 'filter');
    return (
        <>
            {yml.header && <Header
                seo_title={yml.seo_title}
                title={yml.header.title}
                paragraph={yml.header.paragraph}
                padding_tablet="72px 0 40px 0"
                padding="66px 17px 85px 0"
            >
            </Header>}
            {/* <GridContainer variant="fixed" padding_tablet="0" columns_tablet="12">
                
                {
                    Array.isArray(testimonials.testimonials) && testimonials.testimonials.filter(f => f.featured == true && f.hidden == false).map((m, i) => {
                        return (
                            i < 2 &&
                            <TestimonialCard
                                key={i}
                                height="507px"
                                studentRating={m.rating}
                                className={featuredPositions[i]['className']}
                                image={m.student_thumb}
                                background={m.highlighted && Colors.darkYellow}
                                name={m.student_name}
                                short_content={m.short_content}
                                description={featuredPositions[i]['size'] == "small" && m.content.length > 300 ? m.content.substring(0, 300) + "..." : m.content}
                                video={m.student_video}
                                gridAreaPosition={featuredPositions[i]['position']}
                            />
                        )
                    })
                }
                
            </GridContainer >
            {yml.header && 
                <GridContainer variant="fixed" margin_tablet="30px 0" margin="30px 0" padding_tablet="0">
                    <Div height="7px" background={Colors.lightGray} />
                </GridContainer>
            } */}
            <Div
                display="column"
                columns="3"
                columnCount="3"
                gap="1em"
                style={{gridAutoFlow:'dense'}}
                padding="0 10%"
                columnCount_sm="1"
                columnCount_xs="1"
                columnCount_tablet="3"
            >
                {
                    Array.isArray(testimonials.testimonials) && testimonials.testimonials.filter(f => f.hidden == false).map((m, i) => {
                        return (
                            i < 9 &&
                            <TestimonialCard
                                key={i}
                                // className={defaultPositions[i]['className']}
                                studentRating={m.rating}
                                image={m.student_thumb}

                                // height={defaultPositions[i]['height']}
                                // height_tablet={defaultPositions[i]['height_tablet']}
                                background={m.highlighted && Colors.darkYellow}
                                name={m.student_name}
                                short_content={m.short_content}
                                // description={defaultPositions[i]['size'] == "small" && m.content.length > 300 ? m.content.substring(0, 300) + "..." : m.content}
                                description={m.content.length > 500 ? m.content.substring(0, 500) + "..." : m.content}
                                video={m.student_video}
                                // gridAreaPosition={defaultPositions[i]['position']}
                                // gridRowPosition={defaultPositions[i]['row_position']}

                            />
                        )
                    })
                }
            </Div>
            <GridContainer variant="fixed" columns_tablet="12" height_tablet="auto" height="auto" margin={"0 0 30px 0"}>
                
                {
                    Array.isArray(testimonials.testimonials) && testimonials.testimonials.filter(f => f.hidden == false).map((m, i) => {
                        return (
                            i < 5 &&
                            <TestimonialCard
                                key={i}
                                className={defaultPositions[i]['className']}
                                studentRating={m.rating}
                                image={m.student_thumb}

                                height={defaultPositions[i]['height']}
                                height_tablet={defaultPositions[i]['height_tablet']}
                                background={m.highlighted && Colors.darkYellow}
                                name={m.student_name}
                                short_content={m.short_content}
                                description={defaultPositions[i]['size'] == "small" && m.content.length > 300 ? m.content.substring(0, 300) + "..." : m.content}
                                video={m.student_video}
                                gridAreaPosition={defaultPositions[i]['position']}
                                gridRowPosition={defaultPositions[i]['row_position']}

                            />
                        )
                    })
                }

            </GridContainer>

        </>
    )
};
export const query = graphql`
query SuccessQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
        edges{
            node{
                meta_info{
                    title
                    description
                    image
                    keywords
                }
                seo_title
                header{
                    title
                    paragraph   
                }
            }
        }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
            node {
                heading
                button_text
                button_link
                testimonials {
                    student_name
                    featured
                    highlighted
                    testimonial_date
                    rating
                    hidden
                    linkedin_url
                    linkedin_text
                    linkedin_image{
                        childImageSharp {
                            gatsbyImageData(
                                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                height: 14
                                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                            )
                        }
                    }
                    student_thumb{
                        childImageSharp {
                            gatsbyImageData(
                                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                width: 800
                                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                            )
                        }
                    }
                    student_video
                    short_content
                    content
                    source_url
                    source_url_text
                }
            }
        }
    }
    
}
`;
export default BaseRender(SuccessStories);

export { SuccessStories }