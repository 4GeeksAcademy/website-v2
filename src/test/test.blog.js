var colors = require("colors");
const path = require("path");
const {
  walk,
  loadMD,
  loadYML,
  fail,
  success,
  warn,
  localizeImage,
} = require("./_utils");
const twitterUser = require("../utils/twitter");
const markdownLinkExtractor = require("markdown-link-extractor");
const dictionaryOf = require("../utils/dictionaries/pages.json");
const dictionaryOfRedirects = require("../utils/dictionaries/redirects.json");

const front_matter_fields = [
  { key: "slug", type: "string", mandatory: true },
  { key: "title", type: "string", mandatory: true },
  { key: "excerpt", type: "string", length: 160 },
  { key: "image", type: "string" },
  { key: "image_alt", type: "string" },
  { key: "author", type: "string", mandatory: true },
];

const getLang = (fileAbsolutePath) => {
  const regex = /[\w-]*\/([\w-\]\[]*)\.?(\w{1,2})?\.md/gm;
  let m = regex.exec(fileAbsolutePath);
  if (!m) return false;

  return m[2];
};

const getClusters = () => {
  const ymlUS = loadYML(path.resolve(`${__dirname}/../data/page/blog.us.yml`));
  const ymlES = loadYML(path.resolve(`${__dirname}/../data/page/blog.es.yml`));
  return {
    us: ymlUS.yaml.topics,
    es: ymlES.yaml.topics,
  };
};

let duplicateDescriptions = {};
walk(`${__dirname}/../data/blog`, async function (err, files) {
  if (err) fail("Error reading the Markdown files: ", err);
  const _files = files.filter((f) => {
    return path.extname(f) == ".md";
  });

  if (_files.length != files.length)
    fail(
      "Only markdown files should be inside the ./data/blog directory, please fix the following: \n\n",
      files
        .filter((f) => {
          return path.extname(f) != ".md";
        })
        .join("\n").red + "\n"
    );

  const global_clusters = getClusters();
  for (let i = 0; i < _files.length; i++) {
    const _path = _files[i];

    try {
      const content = loadMD(_path);
      const regxUrl = /(?:https?|ftp|mailto):[\n\S]+/g;
      const regxExtension = /^[^.]+$|\.(?!(png|jpg|pdf)$)([^.]+$)/;
      const regexSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

      const links = markdownLinkExtractor(content.body, false);
      links.forEach((link) => {
        let webLinks = link.match(regxUrl);
        let filteredExtensions = link.match(regxExtension);

        if (!webLinks && filteredExtensions) {
          const arrOfMDDictionary = Object.keys(dictionaryOf.md[0]);
          const arrOfYMLDictionary = Object.keys(dictionaryOf.yml[0]);

          arrOfMDDictionary.includes(`${link}`) !== true &&
            arrOfYMLDictionary.includes(`${link}`) !== true &&
            dictionaryOfRedirects.includes(`${link}`) !== true &&
            fail(`Non-existent link found: "${link}"\nPATH: ${_path}\n`);
        }
      });

      const frontmatter = content.attributes;
      const meta_keys = Object.keys(frontmatter);
      const autor_keys = Object.keys(twitterUser);
      let _slug = await _path.split(".")[0].substr(_path.lastIndexOf("/") + 1);

      if (_path.includes(" "))
        throw Error(
          "File name cannot have white spaces only letters, numbers and -"
        );
      /*
                changed _path to _slug because it compares with relative local path
                like /Documents/work/... with /documents/work/... and the test fails
            */
      if (_slug.toLowerCase() !== _slug)
        throw Error("File name must be all lowecase");

      const lang = getLang(_path);
      if (!lang)
        throw Error(
          "Missing language information on file name, make sure it has the language info before the extension; For example: my-file.es.md"
        );
      else if (lang === "en")
        throw Error(
          `Please use "us" instead of "en" for english language information on the file name; For example: my-file.us.md`
        );

      if (frontmatter["cluster"] === undefined)
        throw Error("Missing post cluster");
      else if (global_clusters === undefined || global_clusters.length === 0)
        throw Error(
          `Empty or missing global clusters, check the topics property on the ./src/data/page/blog.[lang].md YML files`
        );
      else if (global_clusters[lang] === undefined)
        throw Error(
          `Missing clusters for lang "${lang}", these are the clusters we found: ${JSON.stringify(
            global_clusters
          )}`
        );
      else if (!global_clusters[lang].includes(frontmatter["cluster"]))
        throw Error(
          `Invalid post cluster "${
            frontmatter["cluster"]
          }", it should be one of the following: ${global_clusters[lang].join(
            ","
          )}. To manage topis go to ./src/data/page/blog.[lang].md file and look for the "topics" property list`
        );

      localizeImage(frontmatter.image, "relative_images", _path, "blog");

      front_matter_fields.forEach((m) => {
        let authors_verifying = autor_keys.find(
          (el) => el === frontmatter["author"]
        );
        if (!meta_keys.includes(m["key"]))
          fail(`Missing prop ${m["key"]} on frontmatter on ${_path}`);
        if (!regexSlug.test(frontmatter.slug))
          fail(
            `\n\nslug must be in lowercase, without accents or symbols (?, @, &, etc...) issued in ${_path}\n`
          );

        // Pretty log
        if (authors_verifying === undefined)
          throw Error(
            `${`\nProblem found in: ${_path}`.red}\n\n${
              `Missing author on file, please make if match from this list:`.red
            } \n\n${autor_keys.map((el) => `${el.green}\n`)} \n`
          );
        else {
          if (m["type"] === "array") {
            if (
              m["mandatory"] === true &&
              (!frontmatter[m["key"]] || frontmatter[m["key"]] === "null")
            )
              fail(
                `Invalid mandatory prop ${m["key"]} on ${_path} expected ${
                  m["type"]
                } got ${frontmatter[m["key"]]}`
              );
            else if (
              m["mandatory"] !== true &&
              frontmatter[m["key"]] !== null &&
              frontmatter[m["key"]] !== "null" &&
              !Array.isArray(frontmatter[m["key"]])
            )
              fail(
                `Invalid array ${m["key"]} got "${
                  frontmatter[m["key"]]
                }" on ${_path} `
              );
          } else if (typeof frontmatter[m["key"]] !== m["type"]) {
            if (typeof m["mandatory"] !== "undefined")
              fail(
                `Invalid mandatory prop ${m["key"]} on ${_path} expected ${
                  m["type"]
                } got ${frontmatter[m["key"]]}`
              );
            else if (frontmatter[m["key"]] && frontmatter[m["key"]] !== "null")
              fail(
                `Invalid optional prop ${m["key"]} on ${_path} expected ${
                  m["type"]
                } got ${frontmatter[m["key"]]}`
              );
          } else {
            if (
              typeof m["length"] !== "undefined" &&
              frontmatter[m["key"]].length > m["length"]
            )
              fail(
                `Length of ${m["key"]} should be no more than ${m["length"]} (${
                  frontmatter[m["key"]].length
                }) in ${_path}`
              );
          }
        }
      });

      if (
        frontmatter["excerpt"] === undefined ||
        frontmatter["excerpt"] === null ||
        frontmatter["excerpt"] === ""
      )
        warn("Blog post is missing excerpt: " + _path);
      else {
        if (duplicateDescriptions[frontmatter["excerpt"]] !== undefined)
          warn(
            `Duplicate post excerpt between these two: \n ${_path.red} \n ${
              duplicateDescriptions[frontmatter["excerpt"]].red
            }`
          );
        else duplicateDescriptions[frontmatter["excerpt"]] = _path;
      }
    } catch (error) {
      console.error(`Error on file: ${_path}`.red);
      fail(error.message || error);
    }
  }
  success(
    "All Blog Markdown's have correct syntax and absolute links matched successfully"
  );
});
