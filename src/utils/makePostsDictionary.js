const fs = require("fs");
const { walk, loadMD, fail, success } = require("../test/_utils");
const API = require("../utils/api");
const file = require("./dictionaries/pages.json");

const toKeyValue = (array) => Object.fromEntries(array);

const onCreateBlogLangSwitcher = async () => {
  const All_dictionary = [];
  let posts = [];

  try {
    posts = await API.getAllAssets();
  } catch (err) {
    fail("Error reading the location files: ", err);
    return;
  }

  const blog_ES_US = [];
  const blog_US_ES = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const lang = post.lang;
    const cluster = post.clusters.length > 0 ? post.clusters[0] : "";
    const slug = post.slug;

    let translation;
    if (lang === "es") {
      if ("us" in post.translations)
        translation = posts.find(
          (obj) => obj.slug === post.translations.us && obj.clusters.length > 0
        );
      blog_ES_US.push([
        `/${lang}/${cluster}/${slug}`,
        translation
          ? `/us/${translation.clusters[0]}/${translation.slug}`
          : "/us/blog",
      ]);
    } else {
      if ("es" in post.translations)
        translation = posts.find(
          (obj) => obj.slug === post.translations.es && obj.clusters.length > 0
        );
      blog_US_ES.push([
        `/${lang}/${cluster}/${slug}`,
        translation
          ? `/es/${translation.clusters[0]}/${translation.slug}`
          : "/es/blog-en-espanol",
      ]);
    }
  }

  blog_ES_US.push(...blog_US_ES);
  All_dictionary.push(toKeyValue(blog_ES_US));

  file.md = All_dictionary;
  fs.writeFile(
    `${__dirname}/dictionaries/pages.json`,
    JSON.stringify(file),
    (err) => {
      if (err) return console.log(err);
      success(
        `\✅ DICTIONARY: Posts created => ${__dirname}/dictionaries/pages.json\n`
      );
    }
  );
};
onCreateBlogLangSwitcher();
