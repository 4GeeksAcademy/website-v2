import React, { useState } from "react";
import Link from "gatsby-link";
import { navigate, useStaticQuery, graphql } from "gatsby";
import {
  H1,
  H2,
  H3,
  H4,
  Title,
  Separator,
  Paragraph,
  Span,
} from "../Heading";
import {
  Button,
  RoundImage,
  Colors,
  StyledBackgroundSection,
} from "../Styling";
import LazyLoad from "react-lazyload";
import twitterUser from "../../utils/twitter";
import {
  GridContainer,
  Div,
  GridContainerWithImage,
} from "../Sections";

const Post = ({item, i, lang}) => {
  return (
    <Div
      key={`${i}-${item.node.frontmatter.title}`}
      flexDirection="Column"
      margin="0 0 87px 0"
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
              height="329px"
            />
          </LazyLoad>
        </Link>
      )}

      {/* Boton */}
      <Div
        flexDirection_md="row"
        flexDirection="column"
        justifyContent="left"
      >
        <Link
          to={`/${lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
        >
          <Button
            variant="outline"
            border={`1px solid ${Colors.darkGray}`}
            color={Colors.darkGray}
            font='"Lato", sans-serif'
            margin="20px 10px 20px 0"
            pointer
            textColor={Colors.darkGray}
            fontSize={"13px"}
          >
            {item.node.frontmatter.cluster?.replace(/-|_/g, " ") || "4Geeks"}
          </Button>
        </Link>
      </Div>

      {/* Titulo */}
      <Div>
        <Link
          to={`/${lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
        >
          <H4
            textAlign="left"
            align_sm="left"
            margin="0 0 30px 0"
            fs_xs="20px"
            fs_sm="24px"
            fs_md="16px"
            fs_lg="20px"
            fontSize="22px"
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
          color="#3A3A3A"
          textAlign="left"
          margin="0 0 15px 0"
        >
          {item.node.frontmatter.excerpt}
        </Paragraph>
      </Div>

      {/* Link de leer articulo */}
      <Div>
        <Paragraph
          fontSize="13px"
          color="#0097cd"
          margin="0 0 0 0"
          textAlign="left"
        >
          <Link
            to={`/${lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
          >
            {`Read more >`}
          </Link>
        </Paragraph>
      </Div>
    </Div>
  );
};

const CourseBlogs = ({ posts, lang }) => {
  const data = useStaticQuery(graphql`
    query CourseBlogs {
      content: allCourseBlogsYaml {
        edges {
          node {
            fields {
              lang
            }
            title
          }
        }
      }
    }
  `);
  console.log('data');
  console.log(data);
  // const content = data.allCourseBlogsYaml;
  let info = data.content.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (info) info = info.node;
  return (
    <Div>
      <H3>{info.title}</H3>
    </Div>
  )
}

export default CourseBlogs;