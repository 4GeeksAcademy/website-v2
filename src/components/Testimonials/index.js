import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Card} from "../Card"
import {H2, H3, H4, Title, Separator, Paragraph} from '../Heading'
import {Row, Column, Wrapper, Divider} from '../Sections'
import {Colors, RoundImage} from '../Styling'

const Testimonials = (props) => {
    const data = useStaticQuery(graphql`
              query myQueryTestimonials{
                allTestimonialsYaml {
                    edges {
                      node {
                        testimonials {
                          student_name
                          testimonial_date
                          student_thumb
                          starts
                          content
                        }
                      }
                    }
                  }
                }
              `)
    console.log("Testimonials: ", data.allTestimonialsYaml.edges)
    let testimonialsArray = data.allTestimonialsYaml.edges[0].node.testimonials;

    return (
        <>
            <Carousel showThumbs={false}>
                {testimonialsArray.map((item, i) => {
                    console.log("item", item)
                    return (
                        <Row height="auto" align="center">
                            <Card width="600px" key={i}>
                                <Row align="center">
                                    <RoundImage
                                        url={item.student_thumb}
                                        bsize="cover"
                                        position="center center"
                                        width="200px"
                                        height="200px"
                                        border="50%"
                                    />
                                </Row>
                                <Row align="center">
                                    <H4>
                                        {item.student_name}
                                    </H4>
                                </Row>
                                <Row align="center" >
                                    <Paragraph>
                                        {item.content}
                                    </Paragraph>
                                </Row>
                            </Card>
                        </Row>

                    )
                })}
            </Carousel>
        </>
    )
};

export default Testimonials;