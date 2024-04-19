import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Div } from "../Sections";
import { H3, H4, Paragraph } from "../Heading";
import { Colors, Anchor } from "../Styling";
import ReactPlayer from "../ReactPlayer";
import Icon from "../Icon";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const TestimonialCard = ({
  lang,
  highlighted,
  featured,
  height,
  minHeight,
  height_tablet,
  studentRating,
  className,
  background,
  image,
  video,
  name,
  short_content,
  description,
  url,
  textUrl,
  linkedin_url,
  location,
  starRating,
  imgStyle,
  style,
  stories,
  width_xxs,
  width_xs,
  width_sm,
  width_tablet,
  width_md,
  width_lg,
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
      padding="16px"
      border={`1px solid ${Colors.lightGray}`}
      boxShadow={`0px 2px 5px rgba(0, 0, 0, 0.1)`}
      style={{ breakInside: "avoid", marginBottom: "32px" }}
      width_xxs={width_xxs}
      width_xs={width_xs}
      width_sm={width_sm}
      width_tablet={width_tablet}
      width_md={width_md}
      width_lg={width_lg}
      height={height}
      minHeight={minHeight}
      gap="24px 0px"
    >
      <Div
        flexDirection={stories ? "row" : "column"}
        justifyContent="between"
        borderBottom={stories ? `1px solid ${Colors.lightGray}` : ""}
        padding={stories ? "0 0 16px 0" : "0"}
      >
        <Div flexDirection={stories ? "row" : "column"}>
          <GatsbyImage
            image={getImage(image && image.childImageSharp.gatsbyImageData)}
            style={style}
            imgStyle={imgStyle}
          />
          {stories ? ( //Where the component is called (true/false)
            <Div flexDirection="column" margin="0 0 0 9px">
              <H3
                fontSize="15px"
                lineHeight="19px"
                textAlign="left"
                fontFamily="Lato-Black"
              >
                {name}
              </H3>
              <H4
                fontSize="12px"
                lineHeight="22px"
                textAlign="left"
                color={Colors.darkGray}
              >
                {short_content}
              </H4>
            </Div>
          ) : (
            <H3
              type="h3"
              textAlign="left"
              fontSize="28px"
              lineHeight="34px"
              margin="12px 0"
            >
              {name}
            </H3>
          )}
        </Div>

        {linkedin_url && (
          <Div>
            <Anchor
              to={linkedin_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Icon
                icon="linkedin-new"
                width="22px"
                height="22px"
                fill="#2867b2"
                stroke="#2867b2"
              />
            </Anchor>
          </Div>
        )}
      </Div>

      {video && (
        <>
          <Div padding_tablet="0" width="100%" style={{ breakInside: "avoid" }}>
            <ReactPlayer
              margin_tablet="0px 0px"
              With_Modal={true}
              className={"react-player-testimonials-small"}
              thumb={image}
              id={video && video}
              width="100%"
              width_tablet="100%"
              style={{ breakInside: "avoid" }}
              videoHeight="286px"
            />
          </Div>
        </>
      )}

      {description && (
        <Paragraph
          textAlign="left"
          margin="12px 0 0 0"
          fontSize="13px"
          lineHeight="22px"
          letterSpacing="0.05em"
          fontWeight="300"
          dangerouslySetInnerHTML={{
            __html:
              description.length > 500 && !isExpanded
                ? description.substring(0, 500) + "..."
                : description,
          }}
        />
      )}

      {description.length > 500 && (
        <Paragraph
          textAlign="left"
          margin="0 0 0 0"
          color={Colors.blue}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {!isExpanded ? readMoreValues[lang] : readLessValues[lang]}
        </Paragraph>
      )}
      {starRating && (
        <Div margin="0">
          <StarRating totalStars={studentRating} />
        </Div>
      )}
      {url && (
        <Paragraph
          style={{ alignItems: "center" }}
          margin="0"
          display="flex"
          fontWeight="700"
          letterSpacing="0.05em"
          lineHeight="26px"
          textAlign="left"
          fontSize="15px"
          color={Colors.blue}
        >
          <Anchor cursor="pointer" to={url}>
            {textUrl}
          </Anchor>
        </Paragraph>
      )}
    </Div>
  );
};

export default TestimonialCard;
