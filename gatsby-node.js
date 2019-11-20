const path = require('path');

exports.createPages = ({boundActionCreators, graphql}) => {
    const {createPage} = boundActionCreators
    const postTemplate = path.resolve('src/templates/blog-post.js');
    return graphql(`
    {
        
            allMarkdownRemark{
                edges{
                  node{
                      html
                      id
                    frontmatter{
                      title
                      path
                      author
                      date        
                    }
                  }
                }
              }

    }
    `)

}