import React, {useState} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Card} from "../Card"
import {H2, H3, H4, Title, Separator, Paragraph, Span} from '../Heading'
import {Row, Column, Wrapper, Divider} from '../Sections'
import {Colors, StyledBackgroundSection} from '../Styling'
import {Link} from 'gatsby';
import Img from "gatsby-image"
import Fragment from "../Fragment"

const Testimonials = (props) => {
    const [carouselHeight, setCarouselHeight] = useState("500px")
    let testimonialsArray = props.lang[0].node.testimonials;

    return (
        <Fragment github="/components/testimonials">
            <Carousel
                style={{ margin: props.margin || 0 }}
                showThumbs={false}
                showStatus={false}
                stopOnHover={true}
                autoPlay={true}
                infiniteLoop={true}
                swipeable={true}
                dynamicHeight={true}
            >
                {testimonialsArray.filter(item => item.hidden !== true).map((item, i) => {
                    return (
                        <Row align="center" padding="30px" key={i}>
                            <Card width="700px" >
                                <Row align="center">
                                    <StyledBackgroundSection
                                        image={item.student_thumb.childImageSharp.fluid}
                                        alt={item.alt}
                                        height={`200px`}
                                        width={`200px`}
                                        bgSize={`cover`}
                                        className={`b-corner-50`}
                                    ></StyledBackgroundSection>
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
        </Fragment>
    )
};

export default Testimonials;