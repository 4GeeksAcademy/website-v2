import React, {useState} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Card} from "../Card"
import {H2, H3, H4, Title, Separator, Paragraph, Span} from '../Heading'
import {Row, Column, Wrapper, Divider} from '../Sections'
import {Colors, RoundImage} from '../Styling'
import {Link} from 'gatsby';


const Testimonials = (props) => {
    const [carouselHeight, setCarouselHeight] = useState("500px")
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
                          source_url
                          source_url_text
                        }
                      }
                    }
                  }
                }
              `)
    let testimonialsArray = props.lang[0].node.testimonials;
    console.log("Testimonials: ", props.lang[0].node.testimonials)

    return (
        <>
            <Carousel
                showThumbs={false}
                showStatus={false}
                stopOnHover={true}
                autoPlay={true}
                infiniteLoop={true}
                swipeable={true}
                dynamicHeight={true}
            >
                {testimonialsArray.map((item, i) => {
                    console.log("item", item.source_url_text)
                    return (
                        <Row align="center" padding="30px" >
                            <Card width="700px" key={i}>
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
                                <Divider height="10px" />
                                <Row align="center" >
                                    <Column size="12" >
                                        <Paragraph lineHeight="24px">
                                            <Span color={Colors.blue} >"</Span>
                                            {item.content}
                                            <Span color={Colors.blue} >"</Span>
                                        </Paragraph>
                                    </Column>
                                </Row>
                                <Divider height="10px" />
                                <Row align="center">
                                    <Column size="12" >
                                        <H4>
                                            {item.student_name}
                                        </H4>
                                    </Column>
                                </Row>
                                <Row align="center">
                                    {item.source_url_text === "" && item.source_url === "" ? null :
                                        <Column size="12" >
                                            <Link to={item.source_url}>
                                                <Paragraph
                                                    fs_xs="12px"
                                                    fs_sm="12px"
                                                    fs_md="14px"
                                                    fs_lg="14px"
                                                    fs_xl="14px"
                                                    color={Colors.yellow}
                                                >
                                                    {item.source_url_text}
                                                </Paragraph>
                                            </Link>
                                        </Column>}
                                </Row>

                                <Divider height="10px" />

                            </Card>
                        </Row>

                    )
                })}
            </Carousel>
        </>
    )
};

export default Testimonials;