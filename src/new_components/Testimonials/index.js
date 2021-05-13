import React, {useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import Card from "../Card"
import {H2, H3, H4, Paragraph} from '../Heading'
import { GridContainer, Div} from '../Sections'
import {Colors} from '../Styling'
import {Link} from 'gatsby';
import Img from 'gatsby-image';
import Fragment from "../Fragment"
import Marquee_v2 from '../Marquee_CSAV'

const Testimonials = (props) => {
    let testimonialsArray = props.lang[0].node;

      let testimonialsFiltered = testimonialsArray.testimonials.filter(item => item.hidden !== true)
    return (        
        
        <Fragment github="/components/testimonials">

            {/* <Container variant="fluid" background="linear-gradient(#f5f5f5, white)" height="425px" padding="48px 0 36px 0" margin="50px 0"></Container> */}
                <GridContainer fluid background="linear-gradient(#f5f5f5, white)" height="425px" margin={props.margin} margin_tablet={props.margin_tablet} padding="30px 17px 60px 17px" padding_tablet="48px 0 36px 0">
                    
                    <H2>{testimonialsArray.heading}</H2>
                    
                    <Link to="/us/success-stories"><Paragraph margin="25px 0 36px 0" color={Colors.blue}>{testimonialsArray.button_text}</Paragraph></Link>
                    

                    {/* TODO: adjust time with lenght of content and change the css */}
                    {/* CREATED: MARQUEE with hooks*/}
                    <Marquee_v2 containerStyle={{height: "215px"}} >
                    <Div className="testimonial-slider" display="flex" height="auto" background="linear-gradient(#f5f5f5, white)" padding="0 0 40px 0">
                        {testimonialsFiltered.map((item, i) => {
                    
                            return (
                                <Div display="flex" background="#ffffff" minWidth="245px" height="150px" margin="0 12px 0 0" padding="20px 24px 30px 20px" border="1px solid #EBEBEB" alignItems="flex-start">
                                    <Img
                                        fluid={item.student_thumb.childImageSharp.fluid}
                                        alt={item.alt}
                                        style={{height: "39px", minWidth: "39px", backgroundSize: `cover`}}
                                    />
                                    <Div display="flex" flexDirection="column" alignItems="flex-start" width="100%" height="100%" padding="0 9px 0 9px" style={{position: "relative"}}>

                                        <H3
                                            fontSize="15px"
                                            lineHeight="19px"
                                            textAlign="left"
                                        >
                                            {item.student_name}
                                        </H3>
                                        <H4
                                            fontSize="14px"
                                            lineHeight="22px"
                                            textAlign="left"
                                        >
                                            {item.short_content}
                                        </H4>
                                        {
                                            item.linkedin_url != "" && item.linkedin_image != null &&
                                            <a href={item.linkedin_url} target="_blank" rel="noopener noreferrer">
                                                <Img
                                                    fluid={item.linkedin_image.childImageSharp.fluid}
                                                    alt={item.alt}
                                                    style={{
                                                        height: "14px", width: "59px", margin: "auto", backgroundSize: `cover`, position: "absolute", bottom: "0", right: "0"
                                                    }}
                                                />
                                            </a>
                                        }
                                    </Div>
                                </Div>
                            )
                        })}
                    </Div>
                    </Marquee_v2>
                </GridContainer>
        </Fragment>
    )
};
export default Testimonials