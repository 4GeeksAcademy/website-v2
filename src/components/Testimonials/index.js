import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { H2, H3, H4, Paragraph } from "../Heading";
import { GridContainer, Div } from "../Sections";
import { Colors } from "../Styling";
import { Link } from "gatsby";
import Fragment from "../Fragment";
import Marquee_v2 from "../Marquee_v2";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Icon from "../Icon";

const Testimonials = (props) => {
  let testimonialsArray = props.lang[0].node;
  let testimonialsFiltered = testimonialsArray.testimonials.filter(
    (item) => item.hidden !== true || item.include_in_marquee === true
  );

  return (
    <Fragment github="/components/testimonials">
      <GridContainer
        id={props.id}
        background={props.background || "linear-gradient(#f5f5f5, white)"}
        height={props.noMove ? "580px" : "520px"}
        height_tablet={props.noMove ? "500px" : "450px"}
        margin={props.margin}
        margin_tablet={props.margin_tablet}
        padding="30px 20px 0 20px"
        padding_tablet="48px 0 36px 0"
        childMaxWidth="1280px"
        width="100%"
      >
        <Div
          id="AQUI"
          flexDirection="column"
          padding_lg="0px"
          padding_md="10px 80px"
          padding_tablet="10px 40px"
          padding_xxs="0 20px"
        >
          <H2 lineHeight_tablet="40px" lineHeight_xxs="30px">
            {testimonialsArray.heading}
          </H2>
          <Link to={testimonialsArray.button_link}>
            <Paragraph margin="25px 0 36px 0" color={Colors.blue}>
              {testimonialsArray.button_text}
            </Paragraph>
          </Link>
        </Div>
        {/* MARQUEE_V2 

                    Optional atrributes:
                        speed: number <int | dec>
                        reversed: boolean
                        containerstyle
                */}
        <Marquee_v2
          speed={props.noMove ? 0 : 0.5} // false == no movement
          reversed={false}
          containerstyle={{ height: "240px" }}
          showSlider={props.noMove ? true : false}
        >
          <Div
            className="testimonial-slider"
            display="flex"
            height="auto"
            padding="0 0 50px 0"
          >
            {testimonialsFiltered.map((item, i) => {
              return (
                <Div
                  key={`${i}-${item.student_name}`}
                  display="block"
                  // alignItems="flex-start"
                  background="#ffffff"
                  minWidth="245px"
                  boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
                  width="320px"
                  height="auto"
                  margin="0 12px 0 0"
                  padding="20px 24px 30px 20px"
                  border="1px solid #EBEBEB"
                  textAlign="center"
                >
                  <GatsbyImage
                    // fluid={item.student_thumb.childImageSharp.fluid}
                    image={getImage(
                      item.student_thumb.childImageSharp.gatsbyImageData
                    )}
                    alt={item.student_name}
                    style={{
                      display: "block",
                      height: "59px",
                      minWidth: "59px",
                      width: "59px",
                      backgroundSize: `cover`,
                      textAlign: "center",
                      borderRadius: "100%",
                      margin: "13px auto 0px auto",
                    }}
                  />
                  <Div
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                    height="100%"
                    padding="9px"
                    // style={{ position: "relative" }}
                  >
                    <H3
                      fontSize="12px"
                      fontWeight="900"
                      lineHeight="19px"
                      textAlign="center"
                    >
                      {item.student_name}
                    </H3>
                    <H4 fontSize="12px" lineHeight="22px" textAlign="center">
                      {item.short_content}
                    </H4>
                    {item.linkedin_url != "" && (
                      <a
                        href={item.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        {/* <GatsbyImage
                          // fluid={item.linkedin_image.childImageSharp.fluid}
                          image={getImage(
                            item.linkedin_image.childImageSharp.gatsbyImageData
                          )}
                          alt={`Linkedin - ${item.student_name}`}
                          style={{
                            height: "14px",
                            width: "59px",
                            margin: "auto",
                            backgroundSize: `cover`,
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                          }}
                        /> */}
                        <Icon icon="linkedin-new" width="20px" height="20px" />
                      </a>
                    )}
                  </Div>
                </Div>
              );
            })}
          </Div>
        </Marquee_v2>
      </GridContainer>
    </Fragment>
  );
};
export default Testimonials;
