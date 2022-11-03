const axios = require("axios");

const {
  GATSBY_BREATHECODE_HOST,
  GATSBY_BLOG_ACADEMY_TOKEN,
  GATSBY_BLOG_ACADEMY_ID,
} = process.env;

const options = {
  headers: {
    Academy: GATSBY_BLOG_ACADEMY_ID,
    Authorization: "Token " + GATSBY_BLOG_ACADEMY_TOKEN,
  },
};

const getPosts = async () => {
  const result = await axios.get(
    GATSBY_BREATHECODE_HOST +
      "/registry/academy/asset?category=blog-es,blog-us",
    options
  );
  if (result.status != 200) {
    console.log(result.data);
    throw new Error("Error fetching blog posts from blog at 4Geeks.com");
  }

  return result.data;
};

const getContent = async (slug) => {
  try {
    console.log(`Fetching lesson: ${slug}`);
    const _resp = await axios.get(
      GATSBY_BREATHECODE_HOST + `/registry/asset/${slug}.raw`,
      options
    );
    if (_resp.status != 200) {
      console.error(_resp.data);
      throw new Error(_resp.data);
    }
    return _resp.data;
  } catch (e) {
    console.error("Error: ", e.toString());
    return false;
  }
};

module.exports = { getPosts, getContent };
