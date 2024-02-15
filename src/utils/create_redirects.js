var colors = require("colors");
const fs = require("fs");
const { walk, loadMD, empty, fail, success } = require("../test/_utils");

const metas = [
  { key: "slug", type: "string", mandatory: true },
  { key: "title", type: "string", mandatory: true },
  { key: "description", type: "string", length: 155 },
  { key: "image", type: "string" },
  { key: "keywords", type: "string" },
  { key: "redirects", type: "array" },
];

walk(`${__dirname}/../data/blog/`, async function (err, files) {
  if (err) fail("Error reding the blog markdown files: ", err);

  const middlewareRedirectsPath = `${__dirname}/../../middleware-redirects.json`;
  let redirects = [];

  for (let i = 0; i < files.length; i++) {
    const _path = files[i];
    const doc = loadMD(_path);
    if (!doc) fail("Invalid Markdown syntax for " + _path);
    if (!doc.lang) fail("Missing language on .md file name for " + _path);

    redirects.push({
      source: `/${doc.lang}/post/${doc.name}`,
      destination: `/${doc.lang}/${doc.attributes.cluster}/${doc.name}`,
      statusCode: 301,
    });
  }

  const fileContent = JSON.stringify(redirects, null, 2);
  try {
    fs.writeFileSync(middlewareRedirectsPath, fileContent, "utf8");
    success("All redirects have been created");
  } catch (err) {
    fail("Error writing redirects on vercel file: " + err);
  }
});
