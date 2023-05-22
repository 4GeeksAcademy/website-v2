import React, { useState, useEffect } from "react";
import { graphql } from 'gatsby';
import {
  Header,
  GridContainer,
  Container,
  Div,
  Grid,
} from "../components/Sections";
import { Title, H1, H2, H3, H4, H5, Paragraph } from "../components/Heading";
import { Button, Colors, StyledBackgroundSection } from "../components/Styling";
import ReactPlayer from "../components/ReactPlayer";
import Icon from "../components/Icon";
import BaseRender from "./_baseLayout";
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
  gridAreaPosition,
  gridRowPosition,
  gridAreaPosition_tablet,
  gridRowPosition_tablet,
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
          // <Icon key={i} style={{marginRight: "8px"}} icon="linkedin" height="12px" width="12px" stroke={Colors.white} fill="#0e76a8" />
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
      // height={height}
      // height_tablet={height_tablet}
      background={background}
      borderRadius="3px"
      // gridColumn_tablet={gridAreaPosition}
      // gridRow_tablet={gridRowPosition}
      padding="20px"
      border={`1px solid ${Colors.lightGray}`}
      boxShadow={`0px 2px 5px rgba(0, 0, 0, 0.1)`}
      style={{ breakInside: "avoid", marginBottom: "1em" }}
    >
      <Div>
        <GatsbyImage
          // fluid={image && image.childImageSharp.fluid}
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
          <Div
            // padding="19px 0 0 25px"
            padding_tablet="0"
            width="100%"
            style={{ breakInside: "avoid" }}
            // height_tablet="310px"
            // alignSelf="baseline"
          >
            <ReactPlayer
              With_Modal={true}
              // className={className}
              className={"react-player-testimonials-small"}
              thumb={image}
              id={video && video}
              width="100%"
              width_tablet="100%"
              // height={"82px"}
              style={{ breakInside: "avoid" }}
            />
          </Div>
        </>
      )}
      {description.length > 500 && (
        <Paragraph
          // style={{position: "absolute", bottom: "20px", left: "21px"}}
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

const SuccessStories = (props) => {
  const { data, pageContext, yml } = props;
  // let testimonials = data.allTestimonialsYaml.edges[0].node.testimonials

  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    data.allTestimonialsYaml.edges[0].node.testimonials.forEach(
      (testim, ind, arr) => {
        arr[ind].isExpanded = false;
      }
    );
    if (yml.filter_indexes) {
      setTestimonials([
        ...data.allTestimonialsYaml.edges[0].node.testimonials.filter(
          (testimonial) =>
            yml.filter_indexes.includes(testimonial.slug) &&
            testimonial.hidden == false
        ),
      ]);
      // testimonials = data.allTestimonialsYaml.edges[0].node.testimonials.filter((testimonial) => yml.filter_indexes.includes(testimonial.slug) && testimonial.hidden === false);
    } else {
      setTestimonials([
        ...data.allTestimonialsYaml.edges[0].node.testimonials.filter(
          (f) => f.hidden == false
        ),
      ]);
    }
  }, []);

  return (
    <>
      {yml.header && (
        <Header
          seo_title={yml.seo_title}
          title={yml.header.title}
          paragraph={yml.header.paragraph}
          padding_tablet="72px 0 40px 0"
          padding="66px 17px 85px 0"
        ></Header>
      )}
      {yml.images && (
        <Div
          display="flex"
          flexDirection="row"
          borderRadius="3px"
          style={{ flexWrap: "wrap" }}
          // columnGap="70px"
          justifyContent="center"
          background={Colors.white}
          padding="25px 0 0 0"
          margin="0 0 50px 0"
        >
          {yml.images.map((l, i) => {
            return (
              <Div
                key={`${i}-${l.name}`}
                margin="0 20px 40px 20px"
                margin_tablet={`0 ${i >= 4 ? "30px" : "30px"} 30px ${
                  i >= 4 ? "30px" : "30px"
                }`}
              >
                <GatsbyImage
                  key={i}
                  style={{ height: "60px", minWidth: "90px" }}
                  imgStyle={{ objectFit: "contain" }}
                  alt={l.name}
                  fluid={l.image.childImageSharp.fluid}
                  image={getImage(l.image.childImageSharp.gatsbyImageData)}
                />
              </Div>
            );
          })}
        </Div>
      )}

      <Div
        display="column"
        columns="3"
        columnCount="3"
        gap="1em"
        style={{ gridAutoFlow: "dense" }}
        padding="0 10% 10% 10%"
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
                lang={pageContext.lang}
              />
            )
          );
        })}
      </Div>
    </>
  );
};
export const query = graphql`
  query SuccessQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            title
            description
            image
            keywords
          }
          seo_title
          header {
            title
            paragraph
          }
          images {
            name
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 150
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxWidth: 150){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
          }
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
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
        }
      }
    }
  }
`;
export default BaseRender(SuccessStories);

export { SuccessStories };
