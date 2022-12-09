import React, { useState, useEffect } from "react";
import "../assets/css/single-post.css";
import { Link, StaticQuery } from "gatsby";
import styled from "styled-components";
import { H1 } from "../components/Heading";

//FROM components

const ThumbnailPage = () => (
  <StaticQuery
    query={graphql`
      query ThumbnailQuery {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={(data) => {

      const [ post, setPost ] = useState(null);

      useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get("slug");
  
        const posts = data.allMarkdownRemark.edges;
        const _post = posts.find(({ node }) => node.fields.slug == slug);
        if(_post) setPost(_post.node)

        console.log("post title", _post)

      }, []);


      const Div = styled.div`
      background: url("/images/bg/random-bg${Math.floor(Math.random() * 4) +
      1}.png");
      background-repeat: no-repeat;
      background-size: cover;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `;
      return (
        <Div>
          <H1
            type="h1"
            fontSize="40px"
            width="90%"
            fontWeight="bold"
            textAlign="center"
            margin="0 auto"
            lineHeight="normal"
          >
            {post && post.fields.frontmatter?.title}
          </H1>
        </Div>
      );
    }}
  />
);

export default ThumbnailPage;