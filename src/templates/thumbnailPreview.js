import React from 'react'
import { RoundImage, Button } from '../components/Styling'
import LazyLoad from 'react-lazyload';
import twitterUser from '../utils/twitter'
// import Icon from '../components/Icon'
// import {TwitterFollowButton} from 'react-twitter-embed';
import { SessionContext } from '../session'
import CallToAction from '../components/CallToAction'
import "../assets/css/single-post.css"
import rehypeReact from "rehype-react"
import styled from 'styled-components';

//FROM components

export default function Template(props) {
  const post = props.data.markdownRemark;
  const allowed = [`${post.frontmatter.author ? post.frontmatter.author.toLowerCase() : ""}`];


  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      "button": Button,
      "call-to-action": CallToAction,
    }
  }).Compiler

  const markdownAST = renderAst(post.htmlAst).props.children


  const Div = styled.div`
  background:#0e0e0e;
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content:center;
  .lazyload-wrapper{
    .image-container{
      width:70%;
      height:40%;
      margin:auto;
      .thumbnail{
        width:100%;
      }
    }
  }
  `;

  const ImageContainer = styled.div`
  width:70%;
  margin:auto;
  `;

  const Image = styled.img`
  width:100%;
  `;

  return (

    <>
      <LazyLoad scroll={true} height={100} once={true} >
        <Div>
          <ImageContainer className='image-container'>
            <Image src={post.frontmatter.image} className="thumbnail" />
          </ImageContainer>
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