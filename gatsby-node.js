const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const types = ['PageYaml', 'CourseYaml'];
//   const types = ['CourseYaml'];
  if (types.includes(node.internal.type)) {
    const url = createFilePath({ node, getNode })
    const meta = getMetaFromPath({ url, ...node });
    console.log("meta!! ", meta);
    if(meta){
      createNodeField({ node, name: `lang`, value: meta.lang });
      createNodeField({ node, name: `slug`, value: meta.slug });
      createNodeField({ node, name: `file_name`, value: meta.file_name });
      createNodeField({ node, name: `template`, value: meta.template });
      createNodeField({ node, name: `type`, value: meta.type });
    }
  }
};

exports.createPages = async (params) => 
    await createBlog(params) && 
    await createPagesfromYml(params) &&
    await createEntityPagesfromYml('Course', params) &&
    true;

const createBlog = async ({ actions, graphql }) => {
    const {createPage} = actions;
    const postTemplate = path.resolve('src/templates/blog-post.js');
    const result = await graphql(`
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
    if (result.errors) throw new Error(result.errors);

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
        createPage({
        path: node.frontmatter.path,
        component: postTemplate
        })
    });

    return true;
}
const createEntityPagesfromYml = async (entity, { graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        {
          all${entity}Yaml {
            edges {
              node {
                basic_info {
                    slug
                }
                fields{
                    lang
                    slug
                    file_name
                    template
                    type
                }
              }
            }
          }
        }`
    );
    if (result.errors) throw new Error(result.errors);

    result.data[`all${entity}Yaml`].edges.forEach(({ node }) => {
        createPage({
            path: `${node.fields.lang}/${node.fields.template}/${node.fields.slug}`,
            component: path.resolve(`./src/templates/${node.fields.template}.js`),
            context: {
                ...node.fields
            }
        });
    });

    return true;
};

const createPagesfromYml = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        {
          allPageYaml {
            edges {
              node {
                basic_info {
                    slug
                }
                fields{
                    lang
                    slug
                    file_name
                    template
                    type
                }
              }
            }
          }
        }`
    );
    if (result.errors) throw new Error(result.errors);

    result.data[`allPageYaml`].edges.forEach(({ node }) => {
        createPage({
            path: `${node.fields.lang}/${node.fields.slug}`,
            component: path.resolve(`./src/templates/${node.fields.template}.js`),
            context: {
                ...node.fields
            }
        });
    });

    return true;
};

const getMetaFromPath = ({ url, basic_info }) => {
  const regex = /.*\/([\w-]*)\/([\w-]+)\.?(\w{2})?\//gm;
  let m = regex.exec(url);
  if(!m) return false;
  
  const type = m[1];

  const lang = m[3] || "en-us";
  const customSlug = (typeof basic_info.slug === "string");
  const file_name = m[2];// + (lang == "es" ? "-es": "");
  const slug = (customSlug) ? basic_info.slug : file_name;
  return { lang, slug, file_name: `${file_name}.${lang}`, template: type === "page" ? file_name : type, type, url };
};