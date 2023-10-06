var colors = require("colors");
const fs = require("fs");
const { walk, loadYML, empty, fail, success } = require("./_utils");
const { log } = require("console");

const metas = [
  { key: "slug", type: "string", mandatory: true },
  { key: "title", type: "string", mandatory: true },
  { key: "description", type: "string", length: 155 },
  { key: "image", type: "string" },
  { key: "keywords", type: "string" },
  { key: "redirects", type: "array" },
];

function linesOf(text, substring) {
  var line = 0,
    matchedChars = 0;
  let lines = [];

  for (var i = 0; i < text.length; i++) {
    text[i] === substring[matchedChars] ? matchedChars++ : (matchedChars = 0);

    if (matchedChars === substring.length) lines.push(line + 1);
    if (text[i] === "\n") line++;
  }

  return lines;
}

walk(`${__dirname}/../data/`, async function (err, files) {
  if (err) fail("Error reding the YML files: ", err);

  files
    .filter(
      (f) => f.indexOf("additional-redirects.yml") > -1
      //|| f.indexOf('call-to-actions.yml') > -1
    )
    .forEach((_path) => {
      const doc = loadYML(_path);
      if (!doc || !doc.yaml) {
        fail("Invalid YML syntax for " + _path);
        console.log(doc)
      }
    });

  const _files = files.filter(
    (f) =>
      (f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1) &&
      f.indexOf("additional-redirects.yml") === -1 &&
      f.indexOf("call-to-actions.yml") === -1
  );

  let slugs = {};
  for (let i = 0; i < _files.length; i++) {
    const _path = _files[i];
    const doc = loadYML(_path);
    if (!doc || !doc.yaml) fail("Invalid YML syntax for " + _path);
    if (!doc.lang) fail("Missing language on yml file name for " + _path);

    const data = fs.readFileSync(_path, "utf8");

    const foundLeftQuotes = linesOf(data, "“");
    const foundRightQuotes = linesOf(data, "”");
    if (foundLeftQuotes.length > 0 || foundRightQuotes.length > 0) {
      let lines = "";
      if (foundLeftQuotes.length > 0) lines = foundLeftQuotes.join(",");
      if (foundRightQuotes.length > 0)
        lines = (lines.length > 0 ? "," : "") + foundRightQuotes.join(",");

      fail(`We found some weird quotes “” that usually come from copy & pasting content from the internet. 
Please make sure to fix them to standard double " or single ' quotes:  \nLine numbers: ${lines}\nFile ${_path}.`);
    }

    if (doc.type == "page") {
      if (doc.yaml.meta_info === undefined)
        fail("Page is missing meta_info: " + _path);
      if (doc.yaml.meta_info.visibility === undefined)
        fail(
          "Page is missing meta_info.visibility details, please specify one of: visible (default), hidden (not indexed) or unlisted (listed but not in sitemap)" +
            _path
        );
    }

    const testPath = __dirname + "/yml/" + doc.name + ".js";
    if (fs.existsSync(testPath)) {
      console.log(`Running tests for ${doc.name} yml file`.blue);
      const test = require(testPath);
      try {
        test(doc);
      } catch (error) {
        console.error(`Error on file: ${_path}`.red);
        fail(error.message || error);
      }
    }
  }
  success("All YML have correct syntax");
});
