const API = require("../src/utils/api");
const matter = require("gray-matter");
const POST_NODE_TYPE = "Post";
const logger = require("../src/utils/log");

const {
  GATSBY_BREATHECODE_HOST,
  GATSBY_BLOG_ACADEMY_TOKEN,
  GATSBY_BLOG_ACADEMY_ID,
} = process.env;

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  config
) => {
  const { createNode } = actions;
  // let clusters = {};
  const defaultCluster = {
    us: "trends-and-tech",
    es: "tendencias-y-tecnologia",
    en: "trends-and-tech",
  };

  // let posts = await cache.get(`blog_posts`);
  // if(!Array.isArray(posts)){
  //   posts = await API.getAllAssets();
  //   await cache.set(`blog_posts`, posts)
  // }
  const posts = await API.getAllAssets();

  logger.debug(
    `${posts.length} posts found, starting to parse them into markdown remark nodes`
  );

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    let content = await API.getContent(post.slug);
    content = matter(content);

    const frontMatter = {
      ...content.data,
      featured: false,
      slug: post.slug,
      title: post.title,
      lang: post.lang,
      visibility: post.visibility.toLowerCase(),
      template: content.data.template || "post",
      author: post.authors_username,
      date: post.updated_at.substring(0, 10),
      excerpt: post.description || "",
      cluster:
        Array.isArray(post.clusters) && post.clusters.length > 0
          ? post.clusters[0]
          : defaultCluster[post.lang],
    };

    const newContent = matter.stringify(
      content.content || content,
      frontMatter
    );

    createNode({
      // slug: post.slug,
      frontmatter: frontMatter,
      id: createNodeId(`${POST_NODE_TYPE}-${post.id}`), // hashes the inputs into an ID
      parent: null,
      children: [],
      internal: {
        content: newContent,
        type: POST_NODE_TYPE,
        mediaType: "text/markdown",
        contentDigest: createContentDigest(post),
      },
    });
  }

  return true;
};
