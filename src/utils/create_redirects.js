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

  const vercelPath = `${__dirname}/../../now.json`;
  const content = fs.readFileSync(vercelPath, "utf8");

  if (!content)
    fail(
      "Error loading vercel configuration file for redirects: " + vercelPath
    );

  let vercel = JSON.parse(content);
  if (!vercel)
    fail(
      "Error parsing vercel configuration JSON for redirects: " + vercelPath
    );

  for (let i = 0; i < files.length; i++) {
    const _path = files[i];
    const doc = loadMD(_path);
    if (!doc) fail("Invalid Markdown syntax for " + _path);
    if (!doc.lang) fail("Missing language on .md file name for " + _path);

    const hasRedirect = vercel.redirects.find(
      (r) => r.source === "/" + doc.name
    );
    if (!hasRedirect) {
      //console.log(`/${doc.lang}/post/${doc.name} => /${doc.lang}/${doc.attributes.cluster}/${doc.name}`);
      vercel.redirects.push({
        source: `/${doc.lang}/post/${doc.name}`,
        destination: `/${doc.lang}/${doc.attributes.cluster}/${doc.name}`,
        statusCode: 301,
      });
    } else {
      hasRedirect.source = `/${doc.lang}/post/${doc.name}`;
      hasRedirect.destination = `/${doc.lang}/${doc.attributes.cluster}/${doc.name}`;
    }
  }
  console.log(vercel);

  const fileContent = JSON.stringify(vercel, null, 2);
  try {
    fs.writeFileSync(vercelPath, fileContent, "utf8");
    success("All redirects have been created");
  } catch (err) {
    fail("Error writing redirects on vercel file: " + err);
  }
});
