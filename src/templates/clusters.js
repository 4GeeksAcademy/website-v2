import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  Title,
  Separator,
  Paragraph,
  Span,
} from "../components/Heading";
import {
  Container,
  Row,
  Grid,
  Div,
  GridContainerWithImage,
  GridContainer,
} from "../components/Sections";
import {
  StyledBackgroundSection,
  RoundImage,
  Colors,
  Button,
} from "../components/Styling";
import LazyLoad from "react-lazyload";
import BaseBlogRender from "./_baseBlogLayout";
import Link from "gatsby-link";

const Tags = ({ pageContext, data, yml }) => {
  const cluster = data.allClusterYaml.edges.find(
    (c) => c.node.meta_info.slug === pageContext.cluster
  )?.node;
  const { edges, totalCount } = data.allMarkdownRemark;
  function GetFormattedDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  function OrganizeColumns(arr) {
    let posts = [[], [], []];
    for (let i = 0; i < arr.length; i += 3) {
      posts[0].push(arr[i]);
    }
    for (let i = 1; i < arr.length; i += 3) {
      posts[1].push(arr[i]);
    }
    for (let i = 2; i < arr.length; i += 3) {
      posts[2].push(arr[i]);
    }
    return posts;
  }
  const blog_posts = OrganizeColumns(edges);
  const tagHeader = `${yml.about.heading} "${pageContext.tag}" (${totalCount})`;
  const clusterTitle =
    pageContext.cluster && pageContext.cluster.replace(/-|_/g, " ");
  return (
    <>
      <GridContainerWithImage
        padding="24px 0 "
        padding_tablet="36px 40px 54px 0"
        columns_tablet="14"
        margin="120px 0 24px 0"
      >
        <Div
          flexDirection="column"
          justifyContent_tablet="start"
          padding_tablet="70px 0 0 0"
          gridColumn_tablet="1 / 7"
        >
          <H1 textAlign_tablet="left" margin="0 0 11px 0" color="#606060">
            {cluster?.seo_title}
          </H1>
          <H2
            textAlign_tablet="left"
            fontSize="50px"
            lineHeight="60px"
            textTransform="capitalize"
          >
            {cluster?.header?.title}
          </H2>
          <Paragraph textAlign_tablet="left" margin="26px 0">
            {cluster?.header?.paragraph}
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
              cluster?.header?.image &&
              cluster.header.image.childImageSharp.gatsbyImageData
            }
            bgSize="contain"
            alt={cluster?.header.image_alt}
          />
        </Div>
      </GridContainerWithImage>
      <GridContainer columns_tablet="3">
        <Grid
          gridColumn_tablet="1/3"
          gridTemplateColumns_tablet="repeat(2, 1fr)"
          gridGap="15px"
        >
          {Array.isArray(edges) &&
            edges.map((item, i) => {
              return (
                <Div
                  key={`${i}-${item.node.frontmatter.title}`}
                  flexDirection="Column"
                  margin="0 0 87px 0"
                >
                  {item.node.frontmatter.image && (
                    <Link
                      to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
                    >
                      <LazyLoad height={10} scroll={true} once={true}>
                        <RoundImage
                          url={item.node.frontmatter.image}
                          bsize="cover"
                          border="0px"
                          position="center"
                          width="100%"
                          height="329px"
                          margin="0 0 25px 0"
                          h_lg="140px"
                          h_md="120px"
                          h_sm="200px"
                          h_xs="150px"
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
                        {(item.node.frontmatter.cluster &&
                          item.node.frontmatter.cluster.replace(/-|_/g, " ")) ||
                          "4Geeks"}
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
            })}
        </Grid>
        <Div
          background={Colors.verylightGray}
          flexDirection_tablet="column"
          padding_tablet="20px"
          height="fit-content"
          borderRadius="3px"
        >
          {
            <>
              <H3 textAlign="left">{yml.sidebar.title}</H3>
              {Array.isArray(edges) &&
                edges.map((m, i) => {
                  return (
                    <Link
                      key={i}
                      to={`/${pageContext.lang}/${m.node.frontmatter.cluster}/${m.node.frontmatter.slug}`}
                    >
                      <H4
                        borderBottom="1px solid #ebebeb"
                        padding="20px 0"
                        margin="20px 0"
                        textAlign="left"
                        lineHeight="19px"
                        fontWeight="700"
                        color={Colors.darkGray}
                        key={i}
                      >
                        {m.node.frontmatter.title}
                      </H4>
                    </Link>
                  );
                })}
            </>
          }
        </Div>
      </GridContainer>
    </>
  );
};

export const pageQuery = graphql`
  query clusterPage($cluster: String, $file_name: String, $lang: String) {
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
          sidebar {
            title
          }
          about {
            heading
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { cluster: { in: [$cluster] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            type
          }
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
    allClusterYaml {
      edges {
        node {
          seo_title
          meta_info {
            slug
            title
            visibility
            description
            image
            keywords
          }
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
  }
`;

export default BaseBlogRender(Tags);
