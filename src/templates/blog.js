import React from "react";
// import Link from "gatsby-link";
import { graphql, Link } from "gatsby";
import { H1, H2, H4, Paragraph } from "../components/Heading";
import {
  Button,
  RoundImage,
  Colors,
  StyledBackgroundSection,
} from "../components/Styling";
import LazyLoad from "react-lazyload";
import BaseBlogRender from "./_baseBlogLayout";
import twitterUser from "../utils/twitter";
import {
  GridContainer,
  Div,
  GridContainerWithImage,
} from "../components/Sections";

//Functional Component: Blog
const Blog = ({ data, pageContext, yml }) => {
  const langSwitcher = {
    es: "blog-en-espanol",
    us: "blog",
  };
  //Banner (Info+ Image)
  const Banner = () => {
    return (
      <GridContainerWithImage
        background="rgba(199, 243, 253, 0.5)"
        padding="24px 0 "
        padding_tablet="36px 40px 54px 0"
        columns_tablet="14"
        margin="70px 0 0 0"
      >
        <Div
          flexDirection="column"
          justifyContent_tablet="start"
          padding_tablet="70px 0 0 0"
          gridColumn_tablet="1 / 7"
        >
          <H1
            type="h1"
            textAlign_tablet="left"
            margin="0 0 11px 0"
            color="#606060"
          >
            {yml.seo_title}
          </H1>
          <H2
            textAlign_tablet="left"
            fontSize="50px"
            lineHeight="60px"
          >{`${yml.header.title}`}</H2>
          <Paragraph textAlign_tablet="left" margin="26px 0">
            {yml.header.paragraph}{" "}
          </Paragraph>
        </Div>
        <Div
          display="none"
          display_tablet="flex"
          height="auto"
          width="100%"
          gridColumn_tablet="8 / 15"
          style={{ position: "relative" }}
        >
          <StyledBackgroundSection
            height="450px"
            width="100%"
            image={
              yml.header.image &&
              yml.header.image.childImageSharp.gatsbyImageData
            }
            bgSize="contain"
            alt={yml.header.alt}
          />
        </Div>
      </GridContainerWithImage>
    );
  };

  //Post - Returns one card by item
  const Post = ({ item, i }) => {
    return (
      <Div
        key={`${i}-${item.node.frontmatter.title}`}
        flexDirection="Column"
        margin="0 0 87px 0"
      >
        {item.node.frontmatter.image !== "" && (
          <Link
            to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
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
            to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
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
            to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
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
              to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
            >
              {`Read more >`}
            </Link>
          </Paragraph>
        </Div>
      </Div>
    );
  };

  //Topics Buttons Grid
  const Topics = () => {
    return (
      <>
        <GridContainer
          columns_tablet="1"
          margin="0 0 78px 0"
          background={Colors.verylightGray}
          height="auto"
          width="100%"
          columns="1"
          padding="0 0 0 0"
        >
          <Div margin="56px 0 0 0">
            <H2>{yml.question}</H2>
          </Div>

          <Div
            width="100%"
            margin="auto"
            textAlign="center"
            justifyContent="center"
            padding="45px 0px 40px 0px"
            style={{ zIndex: 1, flexWrap: "wrap" }}
          >
            {pageContext.clusters?.map((topic, i) => {
              return (
                <Link
                  key={`${i}-${topic}`}
                  to={`/${pageContext.lang}/${
                    langSwitcher[pageContext.lang]
                  }/${topic}`}
                >
                  <Button
                    variant="outline"
                    border={`1px solid ${Colors.darkGray}`}
                    color={Colors.darkGray}
                    font='"Lato", sans-serif'
                    margin="20px 10px 0 0"
                    pointer
                    textColor={Colors.darkGray}
                    fontSize={"13px"}
                  >
                    {topic.replace(/-|_/g, " ")}
                  </Button>
                </Link>
              );
            })}
          </Div>
        </GridContainer>
      </>
    );
  };
  //---------------------------------------------------

  data.pageContext = pageContext;

  //Render component
  return (
    <>
      <Banner />
      <Topics />

      {/* Grid with posts (cards) */}
      <GridContainer columns_tablet="3">
        {data.allMarkdownRemark?.edges?.map((post, i) => (
          <Post key={post.node.frontmatter.slug} item={post} i={i} />
        ))}
      </GridContainer>
    </>
  );
};

//GraphQL Data Query
export const postQuery = graphql`
  query BlogQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            slug
            title
            description
            image
            keywords
          }
          banner {
            tagline
            sub_heading
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 400
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            no_image
          }
          question
          topics
          seo_title
          header {
            title
            paragraph
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1500
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            image_alt
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { status: { eq: "published" } }
        fields: { lang: { eq: $lang } }
      }
    ) {
      edges {
        node {
          frontmatter {
            author
            date
            image
            slug
            title
            excerpt
            featured
            status
            cluster
          }
        }
      }
    }
  }
`;
export default BaseBlogRender(Blog);
