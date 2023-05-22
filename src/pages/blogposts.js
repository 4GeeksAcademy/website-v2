import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../global/Layout";

const Heading = styled.h1`
  font-family: "Lato-Bold", sans-serif;

  text-align: center;
  font-size: 30px;
  margin: 0 0 50px 0;
`;
const CourseLabel = styled.p`
  margin: 0;
  padding: 0;
`;
const Div = styled.div`
  font-family: "Lato-Bold", sans-serif;

  text-align: center;
  margin: 130px 0 40px 0;
`;
const Heading2 = styled.h2`
  font-family: "Lato-Bold", sans-serif;

  margin: 40px 0;
  text-align: center;
  font-size: 25px;
`;
const Anchor = styled(Link)`
  cursor: pointer;
  text-decoration: underline;
`;
const Table = styled.table`
  font-family: "Lato-Bold", sans-serif;
  text-align: left;
  margin: auto;
  max-width: 1200px;
  th {
    font-weight: 500;
    text-transform: capitalize;
  }
  td,
  th {
    padding: 5px;
  }
  tr:hover {
    background: #646464;
  }
`;
const BlogPosts = () => (
  <StaticQuery
    query={graphql`
      query BlogpostsQuery {
        allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
          edges {
            node {
              html
              id
              frontmatter {
                title
                slug
                template
                author
                date
                status
                featured
                cluster
                excerpt
              }
              fields {
                lang
                slug
                file_name
                defaultTemplate
                type
                pagePath
                filePath
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const posts = data.allMarkdownRemark.edges;
      return (
        <Layout
          seo={{
            slug: "blog-posts",
            title: "Blog Posts - 4Geeks Academy",
            description: "Blog Posts Pages 4Geeks Academy",
            image: "",
            keywords: [],
          }}
          context={{
            lang: "us",
          }}
        >
          <Div>
            <Heading>Blog Posts</Heading>
            <Table>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Topic Cluster</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {posts &&
                  posts.map(({ node }) => (
                    <tr>
                      <td>
                        <Anchor to={`/${node.fields.slug}`}>
                          {`[${node.fields.lang}] ${node.frontmatter.title}`}
                        </Anchor>
                      </td>
                      <td>{node.frontmatter.cluster}</td>
                      <td>{node.frontmatter.status}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Div>
        </Layout>
      );
    }}
  />
);
export default BlogPosts;
