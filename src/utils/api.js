const axios = require("axios");
const logger = require("./log");

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

const getAllAssets = async () => {
  try {
    const _resp = await axios.get(
      GATSBY_BREATHECODE_HOST +
        `/registry/academy/asset?limit=500&offset=0&category=blog-es,blog-us`,
      options
    );
    if (_resp.status != 200) {
      logger.error(`Status: ${_resp.status}`);
      throw new Error(_resp.data);
    }
    else{
      console.log(
        "Successfully fetched blogposts from the breathecode API"
      );
    }
    return _resp.data;
  } catch (e) {
    console.log(
      "Error fetching blogposts from the breathecode API: ",
      e.toString()
    );
    logger.error(
      "Error fetching blogposts from the breathecode API: ",
      e.toString()
    );
    return [];
  }
};

const getAllClusters = async (host) => {
  try {
    const _resp = await axios.get(
      `${host}/registry/academy/keywordcluster`,
      options
    );
    if (_resp.status != 200) {
      logger.error(`Status: ${_resp.status}`);
      throw new Error(_resp.data);
    }
    return _resp.data;
  } catch (e) {
    console.log(
      "Error fetching clusters from the breathecode API: ",
      e.toString()
    );
    logger.error(
      "Error fetching clusters from the breathecode API: ",
      e.toString()
    );
    return [];
  }
};

const getSingleAsset = async (slug) => {
  try {
    logger.debug(`Fetching article: ${slug}`);
    const _resp = await axios.get(
      GATSBY_BREATHECODE_HOST + `/registry/asset/${slug}`,
      options
    );
    if (_resp.status != 200) {
      logger.error(_resp.data);
      throw new Error(_resp.data);
    }
    return _resp.data.map(async (a) => {
      try {
        a.content = await getContent(a.slug);
      } catch (e) {
        a.content = `<p>Error fetching content</p>`;
      }
      return a;
    });
  } catch (e) {
    logger.error("Error: ", e.toString());
    return false;
  }
};

const getContent = async (slug) => {
  logger.debug(`Fetching markdown for article: ${slug}`);

  if (!slug || typeof slug === "undefined") return null;
  try {
    const _resp = await axios.get(
      GATSBY_BREATHECODE_HOST + `/registry/asset/${slug}.raw`,
      options
    );
    if (_resp.status != 200) {
      logger.error(_resp.data);
      throw new Error(_resp.data);
    }
    return _resp.data;
  } catch (e) {
    logger.error("Error: ", e.toString());
    return false;
  }
};

module.exports = { getContent, getSingleAsset, getAllAssets, getAllClusters };
