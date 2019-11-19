import React from 'react'
import Link from 'gatsby-link'

const BlogPage = () => (
    <div>
        <h1>Post One</h1>

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