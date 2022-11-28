const fs = require("fs");
const { walk, loadMD, fail, success } = require("../test/_utils");
const API = require("../utils/api");
const file = require("./dictionaries/pages.json");

const toKeyValue = (array) => Object.fromEntries(array);

const onCreateBlogLangSwitcher = async () => {
  const langES = [];
  const langUS = [];
  const All_dictionary = [];
  let posts = [];
  
  try{
    const resp = await API.getAllAssets();
    if (resp.status != 200) {
      fail("Error reading the location files: ", await resp.data);
      return;
    }
    else posts = resp.data;
  }
  catch(err){
    fail("Error reading the location files: ", err);
    return;
  }
  
  
  const blog_ES_US = [];
  const blog_US_ES = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const lang = post.lang;
    const cluster = post.clusters.length > 0 ? post.clusters[0] : '';
    const slug = post.slug;
    if (lang === "es") langES.push([`/${lang}/${cluster}/${slug}`]);
    else langUS.push([`/${lang}/${cluster}/${slug}`]);
  }
  for (let x = 0; x < langES.length; x++) {
    blog_ES_US.push(langES[x].concat(["/us/blog"]));
  }
  for (let z = 0; z < langUS.length; z++) {
    blog_US_ES.push(langUS[z].concat("/es/blog-en-espanol"));
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
