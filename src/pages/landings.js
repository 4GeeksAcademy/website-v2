import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../global/Layout";
import Tooltip from "../components/Tooltip";
import { Input } from "../components/Form";

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
const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query LandingQuery {
      allLandingYaml(sort: { meta_info: { utm_location: ASC } }) {
        edges {
          node {
            meta_info {
              slug
              utm_course
              utm_location
              template
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);
  const [filter, setFilter] = useState("");
  const landings = data.allLandingYaml.edges;
  const filterByLocation = ({ node }) => {
    if (filter === "") return true;
    if (node.meta_info.utm_location.some((slug) => slug.includes(filter)))
      return true;
    if (node.meta_info.slug.includes(filter)) return true;
    return false;
  };
  return (
    <Layout
      seo={{
        slug: "landings",
        title: "Landing Pages - 4Geeks Academy",
        description: "Landing Pages 4Geeks Academy",
        image: "",
        keywords: [],
      }}
      context={{
        lang: "us",
      }}
    >
      <Div>
        <Heading>Landing Pages</Heading>
        <Input
          style={{ maxWidth: "740px" }}
          margin="20px auto"
          border="1px solid hsl(0,0%,80%)"
          borderRadius="3px"
          type="text"
          placeholder="Filter by slug or campus (location)"
          onChange={(value) => {
            setFilter(value);
          }}
          value={filter}
        />
        <Table>
          <thead>
            <tr>
              <th scope="col">slug</th>
              <th scope="col">location</th>
              <th scope="col">course</th>
              <th scope="col">template</th>
            </tr>
          </thead>
          <tbody>
            {landings &&
              landings.filter(filterByLocation).map(({ node }) => (
                <tr>
                  <td>
                    <Anchor
                      to={`/${node.fields.lang}/landing/${node.meta_info.slug}`}
                    >
                      {node.meta_info.slug}
                    </Anchor>
                    {" - "}
                    <a
                      target="_blank"
                      href={`https://github.com/4GeeksAcademy/website-v2/blob/master/src/data/landing/`}
                    >
                      edit
                    </a>
                  </td>
                  <td>
                    {node.meta_info.utm_location.length === 1 ? (
                      node.meta_info.utm_location
                    ) : (
                      <Tooltip text={node.meta_info.utm_location.join(", ")}>
                        Many locations
                      </Tooltip>
                    )}
                  </td>
                  <td>
                    {node.meta_info.utm_course.map((s) => (
                      <CourseLabel key={s}>{s}</CourseLabel>
                    ))}
                  </td>
                  <td>{node.meta_info.template}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Div>
    </Layout>
  );
};
export default NotFoundPage;
