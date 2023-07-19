import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../global/Layout";
import { Img } from "../components/Styling";

const Heading = styled.h1`
  font-family: "Lato-Bold", sans-serif;

  text-align: center;
  font-size: 30px;
  margin: 10px 0;
`;
const Div = styled.div`
  font-family: "Lato-Bold", sans-serif;

  text-align: center;
  margin: 50px 0;
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
const Paragraph = styled.p`
  font-family: "Lato-Bold", sans-serif;

  margin: 40px 0;
  text-align: center;
`;
const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query NotFoundQuery {
      allFooterYaml {
        edges {
          node {
            footer {
              items {
                name
                link
              }
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);
  let footer = data.allFooterYaml.edges.find(
    ({ node }) => node.fields.lang === "us"
  );
  if (footer && footer.node) {
    footer = [].concat.apply(
      [],
      footer.node.footer.map((f, i) => (i === 0 ? [] : f.items))
    );
  }
  return (
    <Layout
      seo={{
        slug: "404",
        title: "4Geeks Academy - Page not found",
        description: "4Geeks Academy - Page not found",
        image: "",
        keywords: [],
      }}
      context={{
        lang: "us",
      }}
    >
      <Div>
        <Heading>Woops!</Heading>
        <Heading2>The page you are looking for was not found</Heading2>
        <Img
          src={"/images/rigoberto/rigo-book.png"}
          alt={"Rigoberto 4Geeks Academy with a Book"}
          margin="auto"
          height="200px"
          backgroundSize={`contain`}
        ></Img>
        <Paragraph>Maybe you were looking for one of these?</Paragraph>
        <ul
          style={{
            margin: "20px 0",
            columnCount: 3,
            columnGap: "10px",
          }}
        >
          {footer &&
            footer.map((l) => (
              <li style={{ margin: "10px 0" }}>
                <Anchor to={l.link}>{l.name}</Anchor>
              </li>
            ))}
        </ul>
      </Div>
    </Layout>
  );
};
export default NotFoundPage;
