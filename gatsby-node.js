const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const types = ['PageYaml', 'CourseYaml'];
  if (types.includes(node.internal.type)) {
    const url = createFilePath({ node, getNode })
    const meta = getMetaFromPath({ url, ...node });
    if(meta){
      createNodeField({ node, name: `lang`, value: meta.lang });
      createNodeField({ node, name: `slug`, value: meta.slug });
      createNodeField({ node, name: `file_name`, value: meta.file_name });
      createNodeField({ node, name: `template`, value: meta.template });
      createNodeField({ node, name: `type`, value: meta.type });
      createNodeField({ node, name: `pagePath`, value: meta.pagePath });
      createNodeField({ node, name: `filePath`, value: url });
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
    const { createPage, createRedirect } = actions;
    const result = await graphql(`
        {
          all${entity}Yaml {
            edges {
              node {
                basic_info {
                    slug
                    redirects
                }
                fields{
                    lang
                    slug
                    file_name
                    template
                    type
                    pagePath
                    filePath
                }
              }
            }
          }
        }`
    );
    if (result.errors) throw new Error(result.errors);

    const translations = buildTranslations(result.data[`all${entity}Yaml`]);
    result.data[`all${entity}Yaml`].edges.forEach(({ node }) => {
        createPage({
            path: node.fields.pagePath,
            component: path.resolve(`./src/templates/${node.fields.template}.js`),
            context: {
                ...node.fields,
                translations: translations[node.fields.template]
            }
        });

        if(node.fields.lang === "us"){
            createRedirect({
                fromPath: `/${node.fields.template}/${node.fields.slug}`,
                toPath: node.fields.pagePath,
                redirectInBrowser: true,
                isPermanent: true
            });

            createRedirect({
                fromPath: `/en/${node.fields.template}/${node.fields.slug}`,
                toPath: node.fields.pagePath,
                redirectInBrowser: true,
                isPermanent: true
            });
        }

        if (node.basic_info && node.basic_info.redirects) {
            node.basic_info.redirects.forEach(path => {
                path = path[0] !== '/' ? '/'+path : path;
                createRedirect({
                    fromPath: path,
                    toPath: node.fields.pagePath,
                    redirectInBrowser: true,
                    isPermanent: true
                });
            })
        }
    });

    return true;
};

const createPagesfromYml = async ({ graphql, actions }) => {
    const { createPage, createRedirect } = actions;
    const result = await graphql(`
        {
          allPageYaml {
            edges {
              node {
                basic_info {
                    slug
                    redirects
                }
                fields{
                    lang
                    slug
                    file_name
                    template
                    type
                    pagePath
                    filePath
                }
              }
            }
          }
        }`
    );
    if (result.errors) throw new Error(result.errors);

    const translations = buildTranslations(result.data[`allPageYaml`]);
    result.data[`allPageYaml`].edges.forEach(({ node }) => {
        createPage({
            path: node.fields.pagePath,
            component: path.resolve(`./src/templates/${node.fields.template}.js`),
            context: {
                ...node.fields,
                translations: translations[node.fields.template]
            }
        });

        if(node.fields.lang === "us"){
            createRedirect({
                fromPath: "/"+node.fields.slug,
                toPath: node.fields.pagePath,
                redirectInBrowser: true,
                isPermanent: true
            });

            createRedirect({
                fromPath: "/en/"+node.fields.slug,
                toPath: node.fields.pagePath,
                redirectInBrowser: true,
                isPermanent: true
            });
        }

        if (node.basic_info && node.basic_info.redirects) {
            node.basic_info.redirects.forEach(path => {
                path = path[0] !== '/' ? '/'+path : path;
                createRedirect({
                    fromPath: path,
                    toPath: node.fields.pagePath,
                    redirectInBrowser: true,
                    isPermanent: true
                });
            })
        }
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
  const template = type === "page" ? file_name : type;

  const pagePath = type === "page" ? `/${lang}/${slug}` : `/${lang}/${template}/${slug}`;

  return { lang, slug, file_name: `${file_name}.${lang}`, template, type, url, pagePath };
};

const buildTranslations = ({ edges }) => {
    let translations = {};
    edges.forEach(({ node }) => {
        const meta = getMetaFromPath({ url: node.fields.filePath, ...node });
        if(typeof translations[meta.template] === 'undefined') translations[meta.template] = {};
        translations[meta.template][meta.lang] = meta.pagePath;
    });
    console.log("Translations", translations);
    return translations;
};