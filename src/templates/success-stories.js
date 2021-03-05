import React, {useState} from 'react';
import {Column, Row, Container, Div, Grid} from "../new_components/Sections";
import {Title, H1, H2, H3, H4, H5, Paragraph} from '../new_components/Heading';
import {Button, Colors, StyledBackgroundSection} from '../new_components/Styling';
import ReactPlayer from '../new_components/ReactPlayer'
import Icon from '../new_components/Icon'
import BaseRender from './_baseLayout';
import Img from 'gatsby-image';


const TestimonialCard = ({highlighted, featured, height, height_md, studentRating, className, background, image, video, name, short_content, description, gridAreaPosition}) => {

    const StarRating = ({totalStars}) => {
        console.log("tot", totalStars)
        return (
            <div>
                {[...Array(totalStars)].map((m, i) => (
                    <Icon key={i} style={{marginRight: "8px"}} icon="star" height="12px" width="12px" stroke={Colors.darkGray} />
                ))}
                {totalStars < 5 && [...Array(5 - totalStars)].map((m, i) => (
                    <Icon key={i} style={{marginRight: "8px"}} icon="star" height="12px" width="12px" fill="transparent" stroke={Colors.darkGray} />
                ))}


            </div>
        );
    };

    return (
        <Div
            flexDirection="column"
            position="relative"
            height={height}
            height_md={height_md}
            background={background}
            borderRadius="3px"
            gridArea_md={gridAreaPosition}
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
    position: "1/1/6/5",
    height: "378px",
    height_md: "",
    size: "small",
    className: "react-player-testimonials-small"
},
{
    position: "1/5/6/13",
    height: "378px",
    height_md: "",
    size: "big",
    className: "react-player-testimonials-big"
}]

const defaultPositions = [
    {
        position: "1/1/4/5",
        height: "378px",
        height_md: "",
        size: "small",
        className: "react-player-testimonials-small"
    },
    {
        position: "1/5/4/9",
        height: "378px",
        height_md: "",
        size: "small",
        className: "react-player-testimonials-small"
    },
    {
        position: "1/9/6/13",
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

            {/* <Grid columns="9" rows="4" gridGap="11px" height_md="813px" height="304px">

        {yml.images_box.images.map((m, i) => {
          return (
            <Div
              key={i}
              borderRadius="3px"
              gridArea={imagePositions[`${m.position}`]}
            >
              <StyledBackgroundSection
                height="auto"
                margin="0"
                borderRadius="3px"
                image={m.path.childImageSharp.fluid}
                bgSize={`cover`}
                alt={m.alt}
              />
            </Div>)
        })}


      </Grid> */}
            <Container
                variant="fluid"
                margin="120px auto">
                <Div
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <H1
                        fontSize="13px"
                        lineHeight="16px"
                        fontWeight="700"
                        letterSpacing="0.05em"
                        color="#606060"
                    >{yml.seo_title}</H1>
                    <H2 fontSize="50px" lineHeight="60px" margin="16px 17px 19px 17px">{yml.header.tagline}</H2>
                    <Paragraph margin="0 17px 19px 17px" width_sm="70%" width_tablet="50%">Aprende desde cero hasta tener tu primer trabajo como programador. Recibe mentoría ilimitada, soporte de por vida
        y consigue un trabajo como programador en 16 semanas después de empezar.</Paragraph>

                </Div>
                <Container variant="fixed">
                    {/* <Badges lang={pageContext.lang} /> */}
                </Container>
            </Container>
            <Container variant="fixed">
                <Grid height="auto" columns="1" rows="1" columns_md="12" gridGap="11px">
                    {
                        Array.isArray(testimonials.testimonials) && testimonials.testimonials.filter(f => f.featured == true && f.hidden == false).map((m, i) => {
                            console.log("huhouo", m)
                            return (
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
                </Grid>
            </Container>
            <Container variant="fixed">
                <Div height="7px" background={Colors.lightGray} />
            </Container>
            <Container variant="fixed">
                <Grid height="auto" columns_md="12" rows_md="10" gridGap="11px">
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

                    {/* <Div
                        borderRadius="3px"
                        height="378px"

                        border={`1px solid ${Colors.lightGray}`}
                        gridArea_md="1/1/4/5"
                    >
                    </Div>
                    <Div
                        borderRadius="3px"
                        height="378px"

                        border={`1px solid ${Colors.lightGray}`}
                        gridArea_md="1/5/4/9"
                    >
                    </Div>
                    <Div
                        flexDirection="column"
                        height="636px"
                        background={Colors.darkYellow}
                        borderRadius="3px"
                        gridArea_md="1/9/6/13"
                        padding="20px"
                    >
                        <Div>
                            <Img
                                fluid={testimonials.testimonials[0].student_thumb.childImageSharp.fluid}
                                style={{height: "39px", minWidth: "39px", backgroundSize: `cover`}}
                            />
                            <Div flexDirection="column" margin="0 0 0 9px">
                                <H3
                                    fontSize="15px"
                                    lineHeight="19px"
                                    textAlign="left"
                                >
                                    {testimonials.testimonials[0].student_name}
                                </H3>
                                <H4
                                    fontSize="14px"
                                    lineHeight="22px"
                                    textAlign="left"
                                >
                                    {testimonials.testimonials[0].short_content}
                                </H4>
                            </Div>
                        </Div>
                        <Paragraph textAlign="left" margin="49px 0 0 0">{testimonials.testimonials[0].content}</Paragraph>
                    </Div>
                    <Div
                        borderRadius="3px"
                        height="378px"
                        height_md="507px"
                        border={`1px solid ${Colors.lightGray}`}
                        gridArea_md="4/1/8/9"
                    >
                    </Div>
                    <Div
                        borderRadius="3px"
                        height="378px"
                        border={`1px solid ${Colors.lightGray}`}
                        gridArea_md="6/9/9/13"
                    >
                    </Div> */}
                </Grid>
            </Container>
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
                    tagline
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
