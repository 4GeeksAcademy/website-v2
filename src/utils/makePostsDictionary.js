const fs = require("fs");
const { walk, loadMD, fail, success } = require("../test/_utils");
const file = require("./dictionaries/pages.json");

const toKeyValue = (array) => Object.fromEntries(array);

const onCreateBlogLangSwitcher = () => {
  const langES = [];
  const langUS = [];
  const All_dictionary = [];

  walk(`${__dirname}/../data/blog`, (err, files) => {
    const blog_ES_US = [];
    const blog_US_ES = [];
    if (err) fail("Error reding the location files: ", err);
    for (let i = 0; i < files.length; i++) {
      const _path = files[i];
      const doc = loadMD(_path);
      const lang = doc.lang;
      const cluster = doc.attributes.cluster;
      const slug = doc.attributes.slug;
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
  });
};
onCreateBlogLangSwitcher();
