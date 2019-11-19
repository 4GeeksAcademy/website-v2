import React from 'react'
import Link from 'gatsby-link'

const BlogPage = () => (
    <div>
        <h1>Post One</h1>
        {
            data.allMarkdownRemark.edges.map(post => (
                <div key={post.node.id}>
                    <h3>{post.node.frontmatter.title}</h3>
                    <small>Posted by {post.node.author}</small>
                </div>
            ))
        }

    </div>
)
export const pageQuery = graphql`
    query BlogIndexQuery{
        allMarkdownRemark{
            edges{
              node{
                frontmatter{
                  title
                  path
                  name
          date        
                }
              }
            }
          }
    }
 `