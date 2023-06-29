const fs = require("fs");
const {
  walk,
  loadYML,
  empty,
  fail,
  success,
  localizeImage,
} = require("./_utils");
const front_matter_fields = [
  { key: "bc_slug", type: "string", mandatory: true },
  {
    key: "related_clusters",
    type: "array",
    mandatory: true,
    allowEmpty: false,
  },
];

walk(`${__dirname}/../data/course`, async (err, files) => {
  err && fail("Error reading the YAML files: ", err);
  files.forEach((_path) => {
    const doc = loadYML(_path);
    if (!doc || !doc.yaml) fail("Invalid YML syntax for " + _path);
  });

  const _files = files.filter(
    (f) =>
      (f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1) &&
      f.indexOf("additional-redirects.yml") === -1 &&
      f.indexOf("call-to-actions.yml") === -1
  );

  let slugs = [];
  for (let i = 0; i < _files.length; i++) {
    const _path = _files[i];
    const doc = loadYML(_path);

    let header_image = doc.yaml.header.image;
    localizeImage(header_image, "relative_images", _path, "bg");

    let _slug = await _path.substr(_path.lastIndexOf("/") + 1).split(".")[0];
    slugs.push(_slug);
    if(!_slug || _slug == "") fail("Empty slug. Error while trying to retreibve the course slug from the path: "+_path)

    if (slugs.length === _files.length) {
      let uniq_slug = slugs.filter(
        (curr, prev, self) => self.indexOf(curr) === prev
      );

      for (let i = 0; i < uniq_slug.length; i++) {
        let slug_es = `${__dirname}/../data/course/${uniq_slug[i]}.es.yaml`;
        let slug_us = `${__dirname}/../data/course/${uniq_slug[i]}.us.yaml`;

        !fs.existsSync(slug_es)
          ? fail("File language does not exist, expected as", slug_es.green)
          : !fs.existsSync(slug_us)
          ? fail("File language does not exist, expected as", slug_us.green)
          : null;
      }
    }

    if (!doc.yaml) fail("Invalid YML syntax for " + _path);
    if (!doc.lang) fail("Missing language on yml file name for " + _path);

    try {
      const course = doc.yaml;
      const meta_keys = Object.keys(course.meta_info);
      front_matter_fields.forEach((obj) => {
        if (!meta_keys.includes(obj["key"]))
          fail(`Missing prop ${obj["key"]} from course on ${_path}`);
        else {
          if (obj["type"] === "string") {
            if (
              obj["mandatory"] === true &&
              course.meta_info[obj["key"]] !== _slug
            )
              fail(
                `\n\nInvalid mandatory prop ${
                  obj["key"]
                } on ${_path} expected: ${
                  course.meta_info[obj["key"]].yellow
                } ${"to match with".red} "${_slug.green}" \n\n`
              );
          } else if (obj["type"] === "array") {
            if (!Array.isArray(course.meta_info[obj["key"]]))
              fail(
                `\n\nInvalid mandatory prop ${
                  obj["key"]
                } on ${_path}. expected: array of string. found: ${typeof course
                  .meta_info[obj["key"]]} \n\n`
              );
            if (!obj.allowEmpty && course.meta_info[obj["key"]].length === 0)
              fail(
                `\n\nInvalid mandatory prop ${obj["key"]} on ${_path}. ${obj["key"]} must not be empty \n\n`
              );
          }
        }
      });
    } catch (error) {
      console.error(`Error on file: ${_path}`.red);
      fail(error.message || error);
    }
  }
  success("All Courses have correct slug");
});
