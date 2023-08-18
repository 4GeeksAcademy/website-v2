const { loadYML, fail } = require("./_utils");
const fs = require("fs");
const pages = require("../utils/dictionaries/pages.json");

async function listDir(dir) {
  try {
    return await fs.promises.readdir(`${__dirname}${dir}`);
  } catch (err) {
    console.error("Error occurred while reading directory!", err);
  }
}

const folders = [
  "course",
  "location",
  "cluster",
  "page",
  "location",
  "landing",
  "downloadable",
];
folders.forEach(async (folder) => {
  const files = await listDir(`/../data/${folder}`);
  files.map((_path) => {
    const file = loadYML(`src/data/${folder}/${_path}`);
    if (
      file.yaml.meta_info.redirects.some((redirect) =>
        Object.keys(pages.yml[0]).includes(redirect)
      )
    )
      fail(
        `${`\nProblem found in: src/data/${folder}/${_path}`.red}\n\n${
          `A path found in the redirects array is already being use by another page`
            .red
        }\n`
      );
  });
});
