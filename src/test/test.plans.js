var colors = require("colors");
const {
  walk,
  loadYML,
  empty,
  fail,
  warn,
  success,
  validateObjectProperties,
  getEntityTypeFromPath,
} = require("./_utils");

const metas = [
  { key: "slug", type: "string", mandatory: true },
  { key: "title", type: "string", mandatory: true },
  { key: "description", type: "string", length: 160 },
  { key: "image", type: "string" },
  { key: "keywords", type: "string" },
  { key: "redirects", type: "array" },
];

let duplicateDescriptions = {};
walk(`${__dirname}/../data/plans/`, function (err, files) {
  if (err) fail("Error reding the YML files: ", err);
  const _files = files.filter(
    (f) =>
      (f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1)
  );

  let slugs = {};
  _files.forEach((_path) => {
    const doc = loadYML(_path);
    const yml = doc && doc.yaml;
    if (!yml) fail("Invalid YML syntax for " + _path);
    else if (empty(yml.full_time))
      fail("Missing full_time pricing plans for " + _path);
    else if (empty(yml.part_time))
      fail("Missing part_time pricing plans for " + _path);
    else {
      // look for duplicated slugs
      try {
        validateObjectProperties(doc.yaml, {
          academies: (val) => {
            if (!Array.isArray(val)) throw Error("academies property should be an array");
            else if (val.length) throw Error("Pricing plan has no academies assigned, comment the plan instead of leaving the academies array empty");
          },
        });
      } catch (error) {
        warn(`${error.message} in ${error.path} for file: \n ${_path}`);
      }
    }
  });
  success("All the pricing plans are OK!");
});
