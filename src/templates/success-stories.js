import React, {useState} from 'react';
import {Header, GridContainer, Container, Div, Grid} from "../new_components/Sections";
import {Title, H1, H2, H3, H4, H5, Paragraph} from '../new_components/Heading';
import {Button, Colors, StyledBackgroundSection} from '../new_components/Styling';
import ReactPlayer from '../new_components/ReactPlayer'
import Icon from '../new_components/Icon'
import BaseRender from './_baseLayout';
import Img from 'gatsby-image';


const TestimonialCard = ({highlighted, featured, height, height_md, studentRating, className, background, image, video, name, short_content, description, gridAreaPosition}) => {

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
            height={height}
            height_tablet={height_md}
            background={background}
            borderRadius="3px"
            gridColumn_tablet={gridAreaPosition}
            padding="20px 20px 0 20px"
            border={`1px solid ${Colors.lightGray}`}
            boxShadow={`0px 2px 5px rgba(0, 0, 0, 0.1)`}
        >
            <Div>
                <Img
                    fluid={image && image.childImageSharp.fluid}
                    style={{height: "39px", minWidth: "39px", backgroundSize: `cover`}}
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
                        padding_md="0"
                        width_md="100%"
                        // height_md="310px"
                        alignSelf="baseline"
                    >
                        <ReactPlayer
                            className={className}
                            thumb={image}
                            id={video && video}
                            width='100%'
                            width_md="100%"

                        />
                    </Div>
                </>
            }
            <Paragraph style={{position: "absolute", bottom: "20px", left: "21px"}} textAlign="left" margin="12px 0 0 0" color={Colors.blue}>View Review</Paragraph>

        </Div>
    )
}
const featuredPositions = [{
    position: "1 / 5",
    height: "378px",
    height_md: "",
    size: "small",
    className: "react-player-testimonials-small"
},
{
    position: "5 / 13",
    height: "378px",
    height_md: "",
    size: "big",
    className: "react-player-testimonials-big"
}]

const defaultPositions = [
    {
        position: "1 / 5",
        height: "378px",
        height_md: "",
        size: "small",
        className: "react-player-testimonials-small"
    },
    {
        position: "5 / 9",
        height: "378px",
        height_md: "",
        size: "small",
        className: "react-player-testimonials-small"
    },
    {
        position: "9 / 13",
        height: "636px",
        height_md: "",
        size: "big",
        className: "react-player-testimonials-big"
    },
    {
        position: "4/1/8/9",
        height: "378px",
        height_md: "507px",
        size: "big",
        className: "react-player-testimonials-big"
    },
    {
        position: "6/9/9/13",
        height: "378px",
        height_md: "",
        size: "small",
        className: "react-player-testimonials-small"
    },
]
const SuccessStories = (props) => {
    const {data, pageContext, yml} = props;
    let testimonials = data.allTestimonialsYaml.edges[0].node
    return (
        <>
            <Header
                seo_title={yml.seo_title}
                title={yml.header.title}
                paragraph={yml.header.paragraph}
                padding_tablet="72px 0 40px 0"
                padding="66px 17px 85px 0"
            >
            </Header>
            <GridContainer variant="fixed" padding_tablet="0" columns_tablet="12">
                {/* <Grid height="auto" columns="1" rows="1" columns_md="12" gridGap="11px"> */}
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
                {/* </Grid> */}
            </GridContainer >
            <GridContainer variant="fixed" margin_tablet="30px 0" margin="30px 0" padding_tablet="0">
                <Div height="7px" background={Colors.lightGray} />
            </GridContainer>
            <GridContainer variant="fixed" padding_tablet="0">
                {/* <Grid height="auto" columns_md="12" rows_md="10" gridGap="11px"> */}
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
                                height_md={defaultPositions[i]['height_md']}
                                background={m.highlighted && Colors.darkYellow}
                                name={m.student_name}
                                short_content={m.short_content}
                                description={defaultPositions[i]['size'] == "small" && m.content.length > 300 ? m.content.substring(0, 300) + "..." : m.content}
                                video={m.student_video}
                                gridAreaPosition={defaultPositions[i]['position']}
                            />
                        )
                    })
                }
                {/* </Grid> */}
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
                            fluid(maxHeight: 14){
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                    student_thumb{
                        childImageSharp {
                            fluid(maxHeight: 200){
                                ...GatsbyImageSharpFluid_withWebp
                            }
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
