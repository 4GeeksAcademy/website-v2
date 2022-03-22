import React from 'react'
import LazyLoad from 'react-lazyload';
// import Icon from '../components/Icon'
// import {TwitterFollowButton} from 'react-twitter-embed';
import "../assets/css/single-post.css"
import styled from 'styled-components';
import { H1 } from "../components/Heading";

//FROM components

export default function Template(props) {
  const post = props.data.markdownRemark;

  const Div = styled.div`
  background: url('/images/bg/random-bg${Math.floor(Math.random() * 5) + 1}.png');
  background-repeat: no-repeat;
  background-size: cover;
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content:center;
  `;

  return (

    <>
      <LazyLoad scroll={true} height={100} once={true} >
        <Div>
          <H1
            type="h1"
            fontSize="40px"
            width="auto"
            fontWeight="bold"
            textAlign="center"
          >
            {post.frontmatter.title}
          </H1>
        </Div>

      </LazyLoad>

    </>
  )
}
export const postQuery = graphql`
query BlogPostBySlugThumbnailPreview($slug: String!){
  markdownRemark(frontmatter: {slug: {eq: $slug}}){
    html
    htmlAst
    frontmatter{
      slug
      title
      author
      date
      excerpt
      unlisted
      image
      cluster
    }
    fields{
      readingTime {
        text
      }
    }
  }
}


`