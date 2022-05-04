const {
  walk,
  loadYML,
  empty,
  fail,
  success,
  localizeImage,
} = require("./_utils");
const front_matter_fields = [
  { key: "utm_course", type: "array", mandatory: true },
  { key: "utm_location", type: "string", mandatory: true },
];

walk(`${__dirname}/../data/landing`, async (err, files) => {
  err && fail("Error reading the YAML files: ", err);
  files.forEach((_path) => {
    const doc = loadYML(_path);
    if (!doc || !doc.yaml) fail("Invalid YML syntax for " + _path);
  });

  let courses = [
    "full-stack-ft",
    "full-stack",
    "software-engineering",
    "machine-learning",
    "node-js",
  ];

  const _files = files.filter(
    (f) =>
      (f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1) &&
      f.indexOf("additional-redirects.yml") === -1 &&
      f.indexOf("call-to-actions.yml") === -1
  );

  for (let i = 0; i < _files.length; i++) {
    const _path = _files[i];
    const doc = loadYML(_path);
    if (!doc.yaml) fail("Invalid YML syntax for " + _path);
    if (!doc.lang) fail("Missing language on yml file name for " + _path);

    let meta_info_image = doc.yaml.meta_info.image;
    let header_image = doc.yaml.header_data.image;

    localizeImage(header_image, "relative_images", _path, ".");
    localizeImage(meta_info_image, "relative_images", _path, "bg");

    try {
      const course = doc.yaml;
      const meta_keys = Object.keys(course.meta_info);

      front_matter_fields.forEach((obj) => {
        let utm_course = course.meta_info.utm_course;
        let verifying = courses.some((el) => utm_course.includes(el));

        if (!meta_keys.includes(obj["key"]))
          fail(`Missing prop ${obj["key"]} from course on ${_path}`);
        if (verifying === false)
          fail(
            `${`\nProblem found in: ${_path}`.red}\n\n${
              `utm_course ${`${utm_course}`.yellow} ${
                `not match with the utm_course list:`.red
              }`.red
            } \n\n${courses.map((el) => `${el.green}\n`)} \n`
          );
        if (Array.isArray(utm_course) !== true)
          fail(
            `\n${`utm_course`.yellow} ${`expected an array in ${_path}`.red}\n`
          );
      });
    } catch (error) {
      console.error(`Error on file: ${_path}`.red);
      fail(error.message || error);
    }
  }
  success("All Landing yml have correct utm_course");
});
