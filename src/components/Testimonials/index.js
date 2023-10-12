import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { H2, H3, H4, Paragraph } from "../Heading";
import { GridContainer, Div } from "../Sections";
import { Colors } from "../Styling";
import { Link } from "gatsby";
import Fragment from "../Fragment";
import Marquee_v2 from "../Marquee_v2";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Testimonials = (props) => {
  let testimonialsArray = props.lang[0].node;
  let testimonialsFiltered = testimonialsArray.testimonials.filter(
    (item) => item.hidden !== true || item.include_in_marquee === true
  );

  return (
    <Fragment github="/components/testimonials">
      <GridContainer
        id={props.id}
        fluid
        background={props.background || "linear-gradient(#f5f5f5, white)"}
        height="425px"
        margin={props.margin}
        margin_tablet={props.margin_tablet}
        padding="30px 20px 60px 20px"
        padding_tablet="48px 0 36px 0"
      >
        <H2>{testimonialsArray.heading}</H2>
        <Link to={testimonialsArray.button_link}>
          <Paragraph margin="25px 0 36px 0" color={Colors.blue}>
            {testimonialsArray.button_text}
          </Paragraph>
        </Link>

        {/* MARQUEE_V2 

                    Optional atrributes:
                        speed: number <int | dec>
                        reversed: boolean
                        containerstyle
                */}
        <Marquee_v2
          speed={0.7}
          reversed={false}
          containerstyle={{ height: "215px" }}
        >
          <Div
            className="testimonial-slider"
            display="flex"
            height="auto"
            padding="0 0 40px 0"
          >
            {testimonialsFiltered.map((item, i) => {
              return (
                <Div
                  key={`${i}-${item.student_name}`}
                  display="flex"
                  background="#ffffff"
                  minWidth="245px"
                  boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
                  width="320px"
                  height="150px"
                  margin="0 12px 0 0"
                  padding="20px 24px 30px 20px"
                  border="1px solid #EBEBEB"
                  alignItems="flex-start"
                >
                  <GatsbyImage
                    // fluid={item.student_thumb.childImageSharp.fluid}
                    image={getImage(
                      item.student_thumb.childImageSharp.gatsbyImageData
                    )}
                    alt={item.student_name}
                    style={{
                      height: "39px",
                      minWidth: "39px",
                      width: "39px",
                      backgroundSize: `cover`,
                    }}
                  />
                  <Div
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    width="100%"
                    height="100%"
                    padding="0 9px 0 9px"
                    style={{ position: "relative" }}
                  >
                    <H3 fontSize="15px" lineHeight="19px" textAlign="left">
                      {item.student_name}
                    </H3>
                    <H4 fontSize="14px" lineHeight="22px" textAlign="left">
                      {item.short_content}
                    </H4>
                    {item.linkedin_url != "" && item.linkedin_image != null && (
                      <a
                        href={item.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        <GatsbyImage
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
                        />
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
