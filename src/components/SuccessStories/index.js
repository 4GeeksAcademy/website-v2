import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Div } from "../Sections";
import { H3, H4, Paragraph } from "../Heading";
import { Colors } from "../Styling";
import ReactPlayer from "../ReactPlayer";
import Icon from "../Icon";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const TestimonialCard = ({
  lang,
  highlighted,
  featured,
  height,
  height_tablet,
  studentRating,
  className,
  background,
  image,
  video,
  name,
  short_content,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const readMoreValues = {
    es: "Leer más",
    us: "Read more",
  };

  const readLessValues = {
    es: "Leer menos",
    us: "Read less",
  };

  const StarRating = ({ totalStars }) => {
    return (
      <div>
        {[...Array(5)].map((m, i) => (
          <Icon
            key={i}
            style={{ marginRight: "8px" }}
            icon="star"
            height="12px"
            width="12px"
            stroke={Colors.darkGray}
            fill={i >= studentRating ? "transparent" : `${Colors.darkGray}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Div
      flexDirection="column"
      position="relative"
      background={background}
      borderRadius="3px"
      padding="20px"
      border={`1px solid ${Colors.lightGray}`}
      boxShadow={`0px 2px 5px rgba(0, 0, 0, 0.1)`}
      style={{ breakInside: "avoid", marginBottom: "1em" }}
    >
      <Div>
        <GatsbyImage
          image={getImage(image && image.childImageSharp.gatsbyImageData)}
          style={{ height: "39px", maxWidth: "39px", backgroundSize: `cover` }}
        />
        <Div flexDirection="column" margin="0 0 0 9px">
          <H3 fontSize="15px" lineHeight="19px" textAlign="left">
            {name}
          </H3>
          <H4 fontSize="14px" lineHeight="22px" textAlign="left">
            {short_content}
          </H4>
        </Div>
      </Div>
      <Div margin="30px 0 17px 0">
        <StarRating totalStars={studentRating} />
      </Div>
      {!video && (
        <Paragraph textAlign="left">
          {description.length > 500 && !isExpanded
            ? description.substring(0, 500) + "..."
            : description}
        </Paragraph>
      )}
      {video && (
        <>
          <Div padding_tablet="0" width="100%" style={{ breakInside: "avoid" }}>
            <ReactPlayer
              With_Modal={true}
              className={"react-player-testimonials-small"}
              thumb={image}
              id={video && video}
              width="100%"
              width_tablet="100%"
              style={{ breakInside: "avoid" }}
              videoHeight="600px"
            />
          </Div>
        </>
      )}
      {description.length > 500 && (
        <Paragraph
          textAlign="left"
          margin="12px 0 0 0"
          color={Colors.blue}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {!isExpanded ? readMoreValues[lang] : readLessValues[lang]}
        </Paragraph>
      )}
    </Div>
  );
};

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
        padding="0 10% 60px 10%"
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
                image={m.student_thumb}
                background={m.highlighted && Colors.darkYellow}
                name={m.student_name}
                short_content={m.short_content}
                // description={m.content.length > 500 && !m.isExpanded ? m.content.substring(0, 500) + "..." : m.content}
                description={m.content}
                video={m.student_video}
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
