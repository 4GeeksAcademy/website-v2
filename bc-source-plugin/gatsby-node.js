const API = require("../src/utils/api");
const matter = require("gray-matter");
const POST_NODE_TYPE = "Post";
const logger = require("../src/utils/log");

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

  console.log(
    `${posts.length} posts found, starting to parse them into markdown remark nodes.`
  );
  logger.debug(
    `${posts.length} posts found, starting to parse them into markdown remark nodes.`
  );

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    let content = await API.getContent(post.slug);
    if (!content) {
      logger.error(
        `Skipping blog post ${post.slug} because it was imposible to fetch markdown content`
      );
      continue;
    }

    const wordCount = (text) => {
      let count = 0;
      const split = text.split(" ");
      for (let i = 0; i < split.length; i++) {
        if (split[i] != "") {
          count++;
        }
      }
      return count;
    };
    const count = wordCount(content);

    try{
      content = matter(content);
    }catch(e){
      throw Error(`There was an error while processing blog post frontmatter for: ${post.slug}. \n ${e}`)
    }

    const frontMatter = {
      ...content.data,
      image: post.preview ? post.preview : content.data.image || null,
      status: post.status
        ? post.status.toLowerCase()
        : content.data.status || null,
      featured: false,
      slug: post.slug,
      wordcount: count,
      title: post.title,
      lang: post.lang,
      visibility: post.visibility.toLowerCase(),
      template: content.data.template || "post",
      author: post.authors_username || content.data.author || null,
      date: post.updated_at.substring(0, 10),
      translations: post.translations,
      excerpt:
        post.description || content.data.excerpt || content.data.subtitle || "",
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
