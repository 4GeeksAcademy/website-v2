import React, {useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import Card from "../Card"
import {H2, H3, H4, Title, Separator, Paragraph, Span} from '../Heading'
import {Row, Column, Wrapper, Divider} from '../Sections'
import {Colors} from '../Styling'
import {Link} from 'gatsby';
import Fragment from "../Fragment"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const TestimonialsCarrousel = (props) => {
    let testimonialsArray = props.lang[0].node.testimonials;
    return (
        <Fragment github="/components/testimonials">
            <Carousel
                style={{margin: props.margin || 0}}
                showThumbs={false}
                showStatus={false}
                stopOnHover={true}
                autoPlay={true}
                infiniteLoop={true}
                swipeable={true}
            >
                {testimonialsArray.filter(item => item.hidden !== true).map((item, i) => {
                    return (<Card key={i} padding="20px 30px 30px 30px" height="460px" >
                        <GatsbyImage
                            // fluid={item.student_thumb.childImageSharp.fluid}
                            image={getImage(item.student_thumb.childImageSharp.gatsbyImageData)}
                            alt={item.alt}
                            style={{ height: "180px", width: "180px", margin:"auto", backgroundSize: `cover` }}
                            className={`b-corner-50`}
                        />
                        <Paragraph margin="20px 0 0 0" fontSize="20px">
                            {item.content}
                        </Paragraph>
                        <H4 margin="10px 0px">{item.student_name}</H4>
                        {item.source_url_text === "" && item.source_url === "" &&
                            <Link to={item.source_url}>
                                <Paragraph
                                    color={Colors.yellow}
                                >
                                    {item.source_url_text}
                                </Paragraph>
                            </Link>
                        }
                        {item.linkedin_url != "" && item.linkedin_text != null &&
                            <a href={item.linkedin_url} target="_blank" rel="noopener noreferrer nofollow">
                                <Paragraph
                                    align="center"
                                    margin="10px 0 0 0"
                                    color={Colors.blue}
                                >
                                    {item.linkedin_text}
                                </Paragraph>
                            </a>
                        }
                    </Card>
                    )
                })}
            </Carousel>
        </Fragment>
    )
};
export default TestimonialsCarrousel