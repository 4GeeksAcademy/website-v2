import React, {useState} from 'react';
import {Header, GridContainer, Container, Div, Grid} from "../new_components/Sections";
import {Title, H1, H2, H3, H4, H5, Paragraph} from '../new_components/Heading';
import {Button, Colors, StyledBackgroundSection} from '../new_components/Styling';
import ReactPlayer from '../new_components/ReactPlayer'
import Icon from '../new_components/Icon'
import BaseRender from './_baseLayout';
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const TestimonialCard = ({highlighted, featured, height, height_tablet, studentRating, className, background, image, video, name, short_content, description, gridAreaPosition, gridRowPosition}) => {

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
            height_tablet={height_tablet}
            background={background}
            borderRadius="3px"
            gridColumn_tablet={gridAreaPosition}
            gridRow_tablet={gridRowPosition}
            padding="20px 20px 0 20px"
            border={`1px solid ${Colors.lightGray}`}
            boxShadow={`0px 2px 5px rgba(0, 0, 0, 0.1)`}
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
                        // height_tablet="310px"
                        alignSelf="baseline"
                    >
                        <ReactPlayer
                            With_Modal={true}
                            className={className}
                            thumb={image}
                            id={video && video}
                            width='100%'
                            width_tablet="100%"
                            height={"82px"}

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
        row_position: "1 / 4",
        height: "378px",
        height_tablet: "100%",
        size: "small",
        className: "react-player-testimonials-small "
    },
    {
        position: "5 / 9",
        row_position: "1 / 4",
        height: "378px",
        height_tablet: "100%",
        size: "small",
        className: "react-player-testimonials-small"
    },
    {
        position: "9 / 13",
        row_position: "1 / 6",
        height: "auto",
        height_tablet: "",
        size: "big",
        className: "react-player-testimonials-big "
    },
    {
        position: "1 / 9",
        row_position: "4 / 7",
        height: "378px",
        height_tablet: "507px",
        size: "big",
        className: "react-player-testimonials-big"
    },
    {
        position: "9 / 13",
        row_position: "6 / 9",
        height: "378px",
        height_tablet: "auto",
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
                {/* <Grid height="auto" columns="1" rows="1" columns_tablet="12" gridGap="11px"> */}
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
            <GridContainer columns_tablet="12" gridTemplateRows_tablet="9, 1fr" height_tablet="auto" height="auto">
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

                {/* <Div gridColumn_tablet="1 / 5" gridRow_tablet="1 / 4" background={Colors.lightGray}>test</Div>
                <Div gridColumn_tablet="5 / 9" gridRow_tablet="1 / 4" background={Colors.lightGray}>test</Div>
                <Div gridColumn_tablet="9 / 13" gridRow_tablet="1 / 6" background={Colors.lightGray}>test</Div>
                <Div gridColumn_tablet="1 / 9" gridRow_tablet="4 / 7" background={Colors.lightGray}>test</Div>
                <Div gridColumn_tablet="9 / 13" gridRow_tablet="6 / 9" background={Colors.lightGray}>test</Div> */}
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
                            # fluid(maxHeight: 14){
                            #     ...GatsbyImageSharpFluid_withWebp
                            # }
                        }
                    }
                    student_thumb{
                        childImageSharp {
                            gatsbyImageData(
                                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                width: 200
                                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                            )
                            # fluid(maxHeight: 200){
                            #     ...GatsbyImageSharpFluid_withWebp
                            # }
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
// {/* <GridContainer fixed padding_tablet="0" columns_tablet="12" gridTemplateRows_tablet="4, 1fr" height_tablet="813px" height="304px">
//                 {/* <Grid height="auto" columns_tablet="12" rows_tablet="10" gridGap="11px"> */}
                // {
                //     Array.isArray(testimonials.testimonials) && testimonials.testimonials.filter(f => f.hidden == false).map((m, i) => {
                //         return (
                //             i < 5 &&
                //             <TestimonialCard
                //                 key={i}
                //                 className={defaultPositions[i]['className']}
                //                 studentRating={m.rating}
                //                 image={m.student_thumb}
                //                 height={defaultPositions[i]['height']}
                //                 height_tablet={defaultPositions[i]['height_tablet']}
                //                 background={m.highlighted && Colors.darkYellow}
                //                 name={m.student_name}
                //                 short_content={m.short_content}
                //                 description={defaultPositions[i]['size'] == "small" && m.content.length > 300 ? m.content.substring(0, 300) + "..." : m.content}
                //                 video={m.student_video}
                //                 gridAreaPosition={defaultPositions[i]['position']}
                //             />
                //         )
                //     })
                // }
//                 {/* </Grid> */}
//             </GridContainer> */}