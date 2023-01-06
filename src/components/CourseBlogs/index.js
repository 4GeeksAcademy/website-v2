import React, { useState } from "react";
import Link from "gatsby-link";
import { navigate, useStaticQuery, graphql } from "gatsby";
import { H1, H2, H3, H4, Title, Separator, Paragraph, Span } from "../Heading";
import {
  Button,
  RoundImage,
  Colors,
  StyledBackgroundSection,
} from "../Styling";
import LazyLoad from "react-lazyload";
import twitterUser from "../../utils/twitter";
import { GridContainer, Div, GridContainerWithImage } from "../Sections";

const Post = ({ item, i, lang }) => {
  return (
    <Div
      key={`${i}-${item.node.frontmatter.title}`}
      flexDirection="Column"
      margin="0 10px"
      width="200px"
    >
      {item.node.frontmatter.image !== "" && (
        <Link
          to={`/${lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
        >
          <LazyLoad height={10} scroll={true} once={true}>
            <RoundImage
              url={
                item.node.frontmatter.image !== null
                  ? item.node.frontmatter.image
                  : yml.banner.no_image
              }
              bsize="cover"
              border="0px"
              position="center"
              width="100%"
              height="130px"
              margin="0 0 10px 0"
            />
          </LazyLoad>
        </Link>
      )}

      {/* Titulo */}
      <Div>
        <Link
          to={`/${lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
        >
          <H4
            textAlign="left"
            align_sm="left"
            margin="0 0 10px 0"
            fontWeight="700"
            fontSize="16px"
          >
            {item.node.frontmatter.title}
          </H4>
        </Link>
      </Div>

      {/* Comentario acerca del post */}
      <Div>
        <Paragraph
          fontWeight="300"
          fontSize="15px"
          color="#000"
          textAlign="left"
          margin="0 0 15px 0"
        >
          {item.node.frontmatter.excerpt}
        </Paragraph>
      </Div>
    </Div>
  );
};

const CourseBlogs = ({ posts, lang }) => {
  const title = {
    us: "Related Articles",
    es: "Artículos Relacionados",
  };
  return (
    <Div
      display="block"
      padding_md="10px 90px"
      padding_tablet="10px 40px"
      padding="10px 60px"
    >
      <H3 textAlign="left" margin="0 0 20px 0">
        {title[lang]}
      </H3>
      <Div justifyContent="between">
        {posts.map((item, i) => (
          <Post item={item} i={i} lang={lang} />
        ))}
      </Div>
    </Div>
  );
};

export default CourseBlogs;
