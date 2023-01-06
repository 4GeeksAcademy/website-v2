import React from "react";
import Link from "gatsby-link";
import { H3, H4, Paragraph, } from "../Heading";
import {
  RoundImage,
} from "../Styling";
import LazyLoad from "react-lazyload";
import { Div } from "../Sections";

const Post = ({ item, i, lang }) => {
  return (
    <Link
      to={`/${lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
    >
      <Div
        key={`${i}-${item.node.frontmatter.title}`}
        flexDirection="Column"
        margin_tablet="0 10px"
        margin="0  0 20px 0"
        width_tablet="200px"
        width="80%"
      >
        {item.node.frontmatter.image !== "" && (
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
        )}

        {/* Titulo */}
        <Div>
          <H4
            textAlign="left"
            align_sm="left"
            margin="0 0 10px 0"
            fontWeight="700"
            fontSize="16px"
          >
            {item.node.frontmatter.title}
          </H4>
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
    </Link>
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
      padding_md="10px 90px 30px 90px"
      padding_tablet="10px 40px"
      padding="10px 20px"
    >
      <H3 textAlign_tablet="left" margin="0 0 20px 0">
        {title[lang]}
      </H3>
      <Div justifyContent_tablet="between" justifyContent="center" flexWrap="wrap">
        {posts.map((item, i) => (
          <Post item={item} i={i} lang={lang} />
        ))}
      </Div>
    </Div>
  );
};

export default CourseBlogs;
