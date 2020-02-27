const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const {createFilePath} = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions;
    const types = ['PageYaml', 'CourseYaml', 'LocationYaml', 'JobYaml'];
    if (types.includes(node.internal.type)) {
        const url = createFilePath({node, getNode})
        const meta = getMetaFromPath({url, ...node});
        // const ctas = callToActions();
        if (meta) {
            createNodeField({node, name: `lang`, value: meta.lang});
            createNodeField({node, name: `slug`, value: meta.slug});
            createNodeField({node, name: `file_name`, value: meta.file_name});
            createNodeField({node, name: `template`, value: meta.template});
            createNodeField({node, name: `type`, value: meta.type});
            createNodeField({node, name: `pagePath`, value: meta.pagePath});
            createNodeField({node, name: `filePath`, value: url});
            //   createNodeField({ node, name: `ctas`, value: ctas });
        }
    }
};

exports.createPages = async (params) =>
    await createBlog(params) &&
    await createPagesfromYml(params) &&
    await createEntityPagesfromYml('Course', params) &&
    await createEntityPagesfromYml('Location', params) &&
    await createEntityPagesfromYml('Job', params) &&
    await addAdditionalRedirects(params) &&
    true;

const createBlog = async ({actions, graphql}) => {
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
                    excerpt
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
const createEntityPagesfromYml = async (entity, {graphql, actions}) => {
    const {createPage, createRedirect} = actions;
    const result = await graphql(`
        {
          all${entity}Yaml {
            edges {
              node {
                meta_info {
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
    result.data[`all${entity}Yaml`].edges.forEach(({node}) => {
        createPage({
            path: node.fields.pagePath,
            component: path.resolve(`./src/templates/${node.fields.template}.js`),
            context: {
                ...node.fields,
                translations: translations[node.fields.template]
            }
        });

        if (node.fields.lang === "us") {
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

        if (node.meta_info && node.meta_info.redirects) {
            node.meta_info.redirects.forEach(path => {
                if (typeof (path) !== "string") {
                    throw new Error(`The path in ${node.meta_info.slug} its not a string: ${path}`);
                }
                path = path[0] !== '/' ? '/' + path : path;
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

const createPagesfromYml = async ({graphql, actions}) => {
    const {createPage, createRedirect} = actions;
    const result = await graphql(`
        {
          allPageYaml {
            edges {
              node {
                meta_info {
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
    result.data[`allPageYaml`].edges.forEach(({node}) => {
        const _targetPath = node.fields.slug === "index" ? "/" : node.fields.pagePath;
        console.log(`Creating page ${node.fields.slug === "index" ? "/" : node.fields.pagePath}`);
        createPage({
            path: _targetPath,
            component: path.resolve(`./src/templates/${node.fields.template}.js`),
            context: {
                ...node.fields,
                translations: translations[node.fields.template]
            }
        });

        if (node.fields.lang === "us") {
            console.log(`Redirect from /${node.fields.slug} to ${_targetPath}`);
            createRedirect({
                fromPath: "/" + node.fields.slug,
                toPath: _targetPath,
                redirectInBrowser: true,
                isPermanent: true
            });

            console.log(`Redirect from /en/${node.fields.slug} to ${_targetPath}`);
            createRedirect({
                fromPath: "/en/" + node.fields.slug,
                toPath: _targetPath,
                redirectInBrowser: true,
                isPermanent: true
            });

            if (node.fields.slug === "index") {
                console.log("Redirect from /en to " + _targetPath);
                createRedirect({
                    fromPath: "/en",
                    toPath: _targetPath,
                    redirectInBrowser: true,
                    isPermanent: true
                });
            }
        }

        if (node.meta_info && node.meta_info.redirects) {
            node.meta_info.redirects.forEach(path => {
                if (typeof (path) !== "string") {
                    throw new Error(`The path in ${node.meta_info.slug} its not a string: ${path}`);
                }
                path = path[0] !== '/' ? '/' + path : path;
                createRedirect({
                    fromPath: path,
                    toPath: _targetPath,
                    redirectInBrowser: true,
                    isPermanent: true
                });
            })
        }
    });

    return true;
};

const addAdditionalRedirects = ({graphql, actions}) => {
    const {createRedirect} = actions;
    const URL = './src/data/additional-redirects.yml';
    try {
        const contents = fs.readFileSync(URL, 'utf8');
        if (!contents) throw Error("Error reading the redirect file");
        const file = YAML.parse(contents);
        if (!file) throw Error("Error persing the " + URL);

        file.redirects.forEach(r => {
            createRedirect({
                fromPath: r.fromPath,
                toPath: r.toPath,
                redirectInBrowser: r.redirectInBrowser,
                isPermanent: r.redirectInBrowser
            });
        });
    }
    catch (error) {
        throw Error(error);
    }

    return true;
};

// const callToActions = () => {
//     const URL = './src/data/call-to-actions.yml';
//     try{
//         const contents = fs.readFileSync(URL, 'utf8');
//         if(!contents) throw Error("Error reading the redirect file");
//         const config = YAML.parse(contents);
//         if(!config) throw Error("Error parsing the "+URL);


//         return {
//             getFromSlug: (slug) => config.call_to_actions.filter(cta => {
//                 if(cta.excludes && cta.excludes.excludes > 0){
//                     const isExcluded = cta.excludes.find(s => s === slug);
//                     if(isExcluded) return false;
//                 } 
//                 if(isExcluded)
//                 const isIncluded = cta.includes
//             }).map().concat(config.excludes),
//             includes: [].concat(config.includes),
//             type: config.type || "next-cohort"
//         }
//     }
//     catch(error){
//         throw Error(error);
//     }

//     return true;
// };

const getMetaFromPath = ({url, meta_info}) => {
    const regex = /.*\/([\w-]*)\/([\w-]+)\.?(\w{2})?\//gm;
    let m = regex.exec(url);
    if (!m) return false;

    const type = m[1];

    const lang = m[3] || "en-us";
    const customSlug = (typeof meta_info.slug === "string");
    const file_name = m[2];// + (lang == "es" ? "-es": "");
    const slug = (customSlug) ? meta_info.slug : file_name;
    const template = type === "page" ? file_name : type;

    const pagePath = type === "page" ? `/${lang}/${slug}` : `/${lang}/${template}/${slug}`;

    const meta = {lang, slug, file_name: `${file_name}.${lang}`, template, type, url, pagePath};
    //   console.log("meta: ", meta);
    return meta;
};

const buildTranslations = ({edges}) => {
    let translations = {};
    edges.forEach(({node}) => {
        const meta = getMetaFromPath({url: node.fields.filePath, ...node});
        if (typeof translations[meta.template] === 'undefined') translations[meta.template] = {};
        translations[meta.template][meta.lang] = meta.pagePath;
    });
    return translations;
};