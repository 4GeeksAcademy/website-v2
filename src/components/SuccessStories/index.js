import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Div } from "../Sections";
import { H3, H4, Paragraph } from "../Heading";
import { Colors } from "../Styling";
import ReactPlayer from "../ReactPlayer";
import Icon from "../Icon";
import TestimonialCard from "../TestimonialCard";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const SuccessStoriescomponent = ({ filterIndexes, lang }) => {
  const data = useStaticQuery(graphql`
    {
      allTestimonialsYaml {
        edges {
          node {
            heading
            button_text
            button_link
            testimonials {
              student_name
              slug
              featured
              highlighted
              testimonial_date
              rating
              hidden
              linkedin_url
              linkedin_text
              linkedin_image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    height: 14
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              student_thumb {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 800
                    height: 600
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              student_video
              short_content
              content
              source_url
              source_url_text
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);

  const filteredData = data.allTestimonialsYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  )?.node?.testimonials;
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    filteredData.forEach((testim, ind, arr) => {
      arr[ind].isExpanded = false;
    });
    if (filterIndexes) {
      setTestimonials([
        ...filteredData.filter(
          (testimonial) =>
            filterIndexes.includes(testimonial.slug) &&
            testimonial.hidden == false
        ),
      ]);
    } else {
      setTestimonials([...filteredData.filter((f) => f.hidden == false)]);
    }
  }, []);
  return (
    <>
      <Div
        display="column"
        columns="3"
        columnCount="3"
        gap="1em"
        style={{ gridAutoFlow: "dense" }}
        padding_tablet="0 40px 60px 40px"
        padding_md="0 80px 60px 80px"
        padding_lg="0 0 60px 0"
        columnCount_sm="1"
        columnCount_xs="1"
        columnCount_tablet="3"
      >
        {testimonials.map((m, i) => {
          return (
            i < 9 && (
              <TestimonialCard
                key={i}
                studentRating={m.rating}
                image={m.student_thumb && m.student_thumb}
                background={m.highlighted && Colors.darkYellow}
                name={m.student_name}
                short_content={m.short_content}
                // description={m.content.length > 500 && !m.isExpanded ? m.content.substring(0, 500) + "..." : m.content}
                description={m.content}
                video={m.student_video}
                starRating={true}
                stories={true}
                style={{ 
                  height: "39px", 
                  maxWidth: "39px", 
                  backgroundSize: "contain" }}
                lang={lang}
    
              />
            )
          );
        })}
      </Div>
    </>
  );
};

export default SuccessStoriescomponent;
