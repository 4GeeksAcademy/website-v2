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
  max-width: 700px;
  th {
    font-weight: 500;
    text-transform: capitalize;
  }
  td,
  th {
    padding: 5px;
  }
  tr:hover {
    background: #fbfbfb;
  }
`;
const NotFoundPage = () => (
  <StaticQuery
    query={graphql`
      query DownloadableQuery {
        allDownloadableYaml(
          sort: {meta_info: {current_download: ASC}}
        ) {
          edges {
            node {
              meta_info {
                slug
                current_download
                tag
              }
              fields {
                lang
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const downs = data.allDownloadableYaml.edges;
      return (
        <Layout
          seo={{
            slug: "downloadables",
            title: "Downloadable Pages - 4Geeks Academy",
            description: "Downloadable Pages 4Geeks Academy",
            image: "",
            keywords: [],
          }}
          context={{
            lang: "us",
          }}
        >
          <Div>
            <Heading>Downloadables Pages</Heading>
            <Table>
              <thead>
                <tr>
                  <th scope="col">slug</th>
                  <th scope="col">current_download</th>
                  <th scope="col">tag</th>
                </tr>
              </thead>
              <tbody>
                {downs &&
                  downs.map(({ node }) => (
                    <tr>
                      <td>
                        <Anchor
                          to={`/${node.fields.lang}/downloadable/${node.meta_info.slug}`}
                        >
                          {node.meta_info.slug}
                        </Anchor>
                      </td>
                      <td>{node.meta_info.current_download}</td>
                      <td>{node.meta_info.tag}</td>
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
export default NotFoundPage;
