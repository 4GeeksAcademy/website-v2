const API = require("../src/utils/api");
const matter = require("gray-matter");
const POST_NODE_TYPE = "Post";

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
  const defaultCluster = {
    us: "trends-and-tech",
    es: "tendencias-y-tecnologia",
    en: "trends-and-tech",
  };

  const posts = await API.getAllAssets();
  posts.forEach(async (post) => {
    let content = await API.getContent(post.slug);
    content = matter(content);

    const frontMatter = {
      ...content.data,
      featured: false,
      slug: post.slug,
      title: post.title,
      visibility: post.visibility.toLowerCase(),
      template: content.data.template || "post",
      author: post.authors_username,
      date: post.updated_at,
      excerpt: post.description || "",
      cluster:
        Array.isArray(post.clusters) && post.clusters.length > 0
          ? post.clusters[0]
          : defaultCluster[post.lang],
    };

    content = matter.stringify(content.content || content, frontMatter);

    createNode({
      ...post,
      id: createNodeId(`${POST_NODE_TYPE}-${post.id}`), // hashes the inputs into an ID
      parent: null,
      children: [],
      internal: {
        content,
        type: POST_NODE_TYPE,
        mediaType: "text/markdown",
        contentDigest: createContentDigest(post),
      },
    });
  });
};
