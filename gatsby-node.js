const path = require("path");
const fs = require("fs");
const YAML = require("yaml");
const frontmatter = require('frontmatter');
const API = require("./src/utils/api")
const { createFilePath } = require(`gatsby-source-filesystem`);

var redirects = [];
var ymls = [];

const saveRedirectLogs = () => {
  console.log("Saving redirect log");
  fs.writeFile(
    "./public/redirects.log",
    JSON.stringify(redirects, null, 1),
    function (err) {
      if (err) return console.log(err);
      console.log("Created redirects file");
    }
  );

  return true;
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // curstom post types for the website
  if (
    [
      "MarkdownRemark",
      "LeadFormYaml",
      "NewsYaml",
      "PartnerYaml",
      "CredentialsYaml",
      "FooterYaml",
      "NavbarYaml",
      "CustomBarYaml",
      "BadgesYaml",
      "PageYaml",
      "LandingYaml",
      "DownloadableYaml",
      "CourseYaml",
      "LocationYaml",
      "JobAlertYaml",
      "JobYaml",
      "AlumniProjects",
      "ChooseProgramYaml",
      "TestimonialsYaml",
      "GeeksVsOthersYaml",
      "JobsStatisticsYaml",
      "Why4GeeksYaml",
      "AlumniProjectsYaml",
      "StaffYaml",
      "ProgramSvgYaml",
      "PricesAndPaymentYaml",
      "WhyPythonYaml",
      "ChooseYourProgramYaml",
      "About4GeeksYaml",
      "LocYaml",
      "UpcomingDatesYaml",
      "GeeksInfoYaml",
      "TechsWeTeachYaml",
      "FullStackTechsYaml",
      "SoftwareEngineeringTechsYaml",
      "MachineLearningTechsYaml",
      "With4GeeksYaml",
    ].includes(node.internal.type)
  ) {
    const url = createFilePath({ node, getNode });
    const meta = getMetaFromPath({ url, ...node });

    // add properties to the graph
    // if (node.internal.type.includes("Choose")) console.log(`Found meta for ${node.internal.type}`, meta)
    if (meta) {
      createNodeField({ node, name: `lang`, value: meta.lang });
      createNodeField({ node, name: `slug`, value: meta.slug });
      createNodeField({ node, name: `file_name`, value: meta.file_name });
      createNodeField({ node, name: `defaultTemplate`, value: meta.template });
      createNodeField({ node, name: `type`, value: meta.type });
      createNodeField({ node, name: `pagePath`, value: meta.pagePath });
      createNodeField({ node, name: `filePath`, value: url });
      ymls.push(meta);
    }
  }
};

// Create all the pages needed
exports.createPages = async (params) =>
  (await createEditPage(params)) &&
  (await createBlog(params)) &&
  (await createPagesfromYml(params)) &&
  //also for the custom post types
  (await createEntityPagesfromYml("Course", params)) &&
  (await createEntityPagesfromYml("Location", params)) &&
  (await createEntityPagesfromYml("Job", params)) &&
  (await createEntityPagesfromYml(
    "Downloadable",
    params,
    (extraFields = ["visibility"]),
    (extraContext = (node) => {
      return {
        visibility: node.meta_info.visibility,
      };
    })
  )) &&
  (await createEntityPagesfromYml(
    "Landing",
    params,
    (extraFields = ["utm_course", "utm_location", "visibility"]),
    (extraContext = (node) => {
      return {
        utm_course: node.meta_info.utm_course + "." + node.fields.lang,
        visibility: node.meta_info.visibility,
      };
    })
  )) &&
  (await addAdditionalRedirects(params)) &&
  saveRedirectLogs();

const createEditPage = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;
  createPage({
    path: "/edit",
    component: path.resolve("src/templates/edit.js"),
    context: {
      ymls,
    },
  });

  return true;
};

const createBlog = async ({ actions }) => {
  const { createPage, createRedirect } = actions;
  const _createRedirect = (args) => {
    redirects.push(`Redirect from ${args.fromPath} to ${args.toPath}`);
    createRedirect(args);
  };
  const clusterTemplate = path.resolve("src/templates/clusters.js");
  const thumbnailTemplate = path.resolve("src/templates/thumbnailPreview.js");

  let posts = await API.getPosts();

  console.log(`${posts.length} posts found`)
  for(let post of posts){

    post.content = await API.getContent(post.slug);
    if(!post.content || post.content === undefined){
      throw Error(`Error fetching content for post ${post.content}`)
    }
    post.fm = frontmatter(post.content);
    if(!post.fm || post.fm == undefined){
      throw new Error(`Missing frontmatter for post ${post.slug}`)
    } 
    else{
      post.fm = post.fm.data;
    }
    
    const postTemplate = path.resolve(
      `src/templates/${post.fm.template || "post"}.js`
    );
    
    // if a blog post has the "landing_cluster" template its not a real blog post, its more like a landing page meant as a topic cluster
    // and it will not follow the same URL structure, landing_cluster's have a very unique URL.
    const postPath = `${post.lang}/${post.fm.cluster}/${post.slug}`;
    console.log(`Creating post ${postPath}`);
    createPage({
      path:
        post.fm.template != "landing_cluster"
          ? postPath
          : `/${post.slug}`,
      component: postTemplate,
      context: {
        // createNodeField({ node, name: `pagePath`, value: meta.pagePath });
        // createNodeField({ node, name: `filePath`, value: url });
        lang: post.lang,
        slug: post.slug,
        file_name: new URL(post.readme_url).pathname.split('/').pop(),
        defaultTemplate: postTemplate,
        type: post.clusters.length > 0 ? post.clusters[0] : "post",
      },
    });
    
    if (post.fm.template != "landing_cluster") {
      // the old website had the blog posts with this path '/post-name' and we want now '/<lang>/<cluster>/post-name'
      _createRedirect({
        fromPath: `/${post.slug}`,
        toPath: postPath,
        redirectInBrowser: true,
        isPermanent: true,
      });

      console.log(`Redirect for post /us/post/${post.slug}`);
      _createRedirect({
        fromPath: `/us/post/${post.slug}`,
        toPath: postPath,
        redirectInBrowser: true,
        isPermanent: true,
      });
    }
  }

  // CLUSTERS:
  let clusters = {
    us: [],
    es: [],
  };
  // Iterate through each post, putting all found tags into `tags`
  posts.forEach(post => {
    if (post.fm.cluster)
      clusters[post.lang] = clusters[post.lang].concat(
        post.fm.cluster
      );
  });
  // Eliminate duplicate clusters
  Object.keys(clusters).forEach(
    (lang) =>
      (clusters[lang] = clusters[lang].filter(
        (value, index) => clusters[lang].indexOf(value) === index
      ))
  );
  // Make clusters pages
  const langSwitcher = {
    es: "blog-en-espanol",
    us: "blog",
  };
  Object.keys(clusters).forEach((lang) =>
    clusters[lang].forEach((cluster) => {
      let file_name = `clusters.${lang}`;
      let type = "page";
      createPage({
        path: `/${lang}/${langSwitcher[lang]}/${cluster}/`,
        component: clusterTemplate,
        context: {
          cluster,
          file_name,
          lang,
          type,
        },
      });
    })
  );

  posts.forEach(post => {
    Object.keys(clusters).forEach((lang) =>
      clusters[lang].forEach((cluster) => {
        let file_name = `clusters.${lang}`;
        let type = "page";
        createPage({
          path: `/${lang}/${cluster}/${post.slug}/preview`,
          component: thumbnailTemplate,
          context: {
            ...post,
            cluster,
            file_name,
            lang,
            type,
          },
        });
      })
    );
  });

  return true;
};
const createEntityPagesfromYml = async (
  entity,
  { graphql, actions },
  extraFields = [],
  extraContext = null
) => {
  const { createPage, createRedirect } = actions;
  const extraFieldsQuery = extraFields.join("\n");
  const _createRedirect = (args) => {
    redirects.push(`Redirect from ${args.fromPath} to ${args.toPath}`);
    createRedirect(args);
  };
  const result = await graphql(`
        {
          all${entity}Yaml {
            edges {
              node {
                meta_info {
                    slug
                    redirects
                    visibility
                    template
                    ${extraFieldsQuery}
                }
                fields{
                    lang
                    slug
                    file_name
                    defaultTemplate
                    type
                    pagePath
                    filePath
                }
              }
            }
          }
        }`);
  if (result.errors) throw new Error(result.errors);

  const translations = buildTranslations(result.data[`all${entity}Yaml`]);
  result.data[`all${entity}Yaml`].edges.forEach(({ node }) => {
    console.log(
      `Creating entity ${entity} ${
        node.fields.slug === "index" ? "/" : node.fields.pagePath
      } with template ${
        node.meta_info.template || node.fields.defaultTemplate
      }.js`
    );
    const _extraContext = extraContext ? extraContext(node) : {};
    createPage({
      path: node.fields.pagePath,
      component: path.resolve(
        `./src/templates/${
          node.meta_info.template || node.fields.defaultTemplate
        }.js`
      ),
      context: {
        ...node.fields,
        ..._extraContext,
        translations: translations[node.fields.defaultTemplate],
      },
    });

    if (node.fields.lang === "us") {
      _createRedirect({
        fromPath: `/${node.fields.defaultTemplate}/${node.fields.slug}`,
        toPath: node.fields.pagePath,
        redirectInBrowser: true,
        isPermanent: true,
      });

      _createRedirect({
        fromPath: `/en/${node.fields.defaultTemplate}/${node.fields.slug}`,
        toPath: node.fields.pagePath,
        redirectInBrowser: true,
        isPermanent: true,
      });
    }
    if (node.fields.lang === "es") {
      _createRedirect({
        fromPath: `/${node.fields.defaultTemplate}/${node.fields.slug}`,
        toPath: node.fields.pagePath,
        redirectInBrowser: true,
        isPermanent: true,
      });

      // _createRedirect({
      //     fromPath: `/en/${node.fields.template}/${node.fields.slug}`,
      //     toPath: node.fields.pagePath,
      //     redirectInBrowser: true,
      //     isPermanent: true
      // });
    }

    if (node.meta_info && node.meta_info.redirects) {
      node.meta_info.redirects.forEach((path) => {
        if (typeof path !== "string")
          throw new Error(
            `The path in ${node.meta_info.slug} is not a string: ${path}`
          );
        if (path === "") return;
        path = path[0] !== "/" ? "/" + path : path; //and forward slash at the beginning of path
        console.log(`Additional redirect ${path} => ${node.fields.pagePath}`);
        _createRedirect({
          fromPath: path,
          toPath: node.fields.pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        });
      });
    }
  });

  return true;
};

const createPagesfromYml = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const _createRedirect = (args) => {
    redirects.push(`Redirect from ${args.fromPath} to ${args.toPath}`);
    console.log(`Redirect from ${args.fromPath} to ${args.toPath}`);
    createRedirect(args);
  };
  const result = await graphql(`
    {
      allPageYaml {
        edges {
          node {
            meta_info {
              slug
              visibility
              redirects
            }
            fields {
              lang
              slug
              file_name
              defaultTemplate
              type
              pagePath
              filePath
            }
          }
        }
      }
    }
  `);
  if (result.errors) throw new Error(result.errors);

  const translations = buildTranslations(result.data[`allPageYaml`]);

  //for each page found on the YML
  for (let i = 0; i < result.data[`allPageYaml`].edges.length; i++) {
    const { node } = result.data[`allPageYaml`].edges[i];

    // ignore pages with visibility hidden
    if (node.fields.visibility == "hidden") continue;

    const _targetPath =
      node.fields.slug === "index" ? "/" : node.fields.pagePath;
    console.log(
      `Creating page ${
        node.fields.slug === "index" ? "/" : node.fields.pagePath
      } in ${node.fields.lang}`
    );
    // if (node.fields.slug.includes("carrera-de-programacion"))
    //   console.log(node.fields);
    createPage({
      path: _targetPath,
      component: path.resolve(
        `./src/templates/${node.fields.defaultTemplate}.js`
      ),
      context: {
        ...node.fields,
        ...node.meta_info,
        translations: translations[node.fields.defaultTemplate],
      },
    });

    if (node.fields.lang === "us") {
      _createRedirect({
        fromPath: "/" + node.fields.slug,
        toPath: _targetPath,
        // redirectInBrowser: true,
        isPermanent: true,
      });

      _createRedirect({
        fromPath: "/en/" + node.fields.slug,
        toPath: _targetPath,
        // redirectInBrowser: true,
        isPermanent: true,
      });

      if (node.fields.slug === "index") {
        _createRedirect({
          fromPath: "/en",
          toPath: _targetPath,
          // redirectInBrowser: true,
          isPermanent: true,
        });
      }
    }
    if (node.fields.lang === "es") {
      _createRedirect({
        fromPath: "/" + node.fields.slug,
        toPath: _targetPath,
        // redirectInBrowser: true,
        isPermanent: true,
      });
      // _createRedirect({
      //     fromPath: "/es/" + node.fields.slug,
      //     toPath: _targetPath,
      //     // redirectInBrowser: true,
      //     isPermanent: true
      // });
    }

    if (node.meta_info && node.meta_info.redirects) {
      node.meta_info.redirects.forEach((path) => {
        if (typeof path !== "string") {
          throw new Error(
            `The path in ${node.meta_info.slug} its not a string: ${path}`
          );
        }
        path = path[0] !== "/" ? "/" + path : path;
        const exists = redirects.find(
          (p) => p === `Redirect from ${path} to ${_targetPath}`
        );
        if (!exists || exists === undefined)
          _createRedirect({
            fromPath: path,
            toPath: _targetPath,
            // redirectInBrowser: true,
            isPermanent: true,
          });
      });
    }
  }

  return true;
};

const addAdditionalRedirects = ({ graphql, actions }) => {
  const { createRedirect } = actions;
  const _createRedirect = (args) => {
    redirects.push(`Redirect from ${args.fromPath} to ${args.toPath}`);
    createRedirect(args);
  };
  const URL = "./src/data/additional-redirects.yml";
  try {
    const contents = fs.readFileSync(URL, "utf8");
    if (!contents) throw Error("Error reading the redirect file");
    const file = YAML.parse(contents);
    if (!file) throw Error("Error persing the " + URL);

    file.redirects.forEach((r) => {
      _createRedirect({
        fromPath: r.fromPath,
        toPath: r.toPath,
        redirectInBrowser: r.redirectInBrowser,
        isPermanent: r.redirectInBrowser,
      });
    });
  } catch (error) {
    throw Error(error);
  }

  return true;
};

const getMetaFromPath = ({ url, meta_info, frontmatter }) => {
  let slugigy = (entity) => {
    let slugMap = {
      location: "coding-campus",
      course: "coding-bootcamps",
    };
    return slugMap[entity] || entity;
  };

  //if its a blog post the meta_info comes from the front-matter
  if (typeof meta_info == "undefined") meta_info = frontmatter;

  const regex = /.*\/([\w-]*)\/([\w-]+)\.?(\w{2})?\//gm;
  let m = regex.exec(url);
  if (!m) return false;
  const _cluster =
    meta_info !== undefined && typeof meta_info.cluster === "string"
      ? meta_info.cluster
      : "post";
  const type = frontmatter ? _cluster : m[1];

  const lang = m[3] || "us";
  const customSlug =
    meta_info !== undefined && typeof meta_info.slug === "string";
  const file_name = m[2]; // + (lang == "es" ? "-es": "");
  const slug = customSlug ? meta_info.slug : file_name;
  const template = type === "page" ? file_name : type;

  const pagePath =
    type === "page"
      ? `/${lang}/${slug}`
      : `/${lang}/${slugigy(template)}/${slug}`;

  const meta = {
    lang,
    slug,
    file_name: `${file_name}.${lang}`,
    template,
    type,
    url,
    pagePath,
  };

  return meta;
};

const buildTranslations = ({ edges }) => {
  let translations = {};
  edges.forEach(({ node }) => {
    const meta = getMetaFromPath({ url: node.fields.filePath, ...node });
    if (typeof translations[meta.template] === "undefined")
      translations[meta.template] = {};
    translations[meta.template][meta.lang] = meta.pagePath;
  });
  return translations;
};

exports.onCreateWebpackConfig = ({
  actions: { replaceWebpackConfig },
  getConfig,
}) => {
  const config = getConfig();

  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: "workerize-loader" },
  });

  config.output.globalObject = "this";

  replaceWebpackConfig(config);
};
