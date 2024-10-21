const {
  walk,
  loadYML,
  empty,
  fail,
  success,
  localizeImage,
  validateObjectProperties,
} = require("./_utils");
const fs = require("fs");
const front_matter_fields = [
  { key: "utm_course", type: "array", mandatory: true },
  { key: "utm_location", type: "array", mandatory: true },
];

const landingSections = [
  "in_the_news",
  "about4Geeks",
  "iconogram",
  "badges",
  "rating_reviews",
  "syllabus",
  "geeks_vs_others",
  "program_details",
  "overlaped",
  "cards_carousel",
  "choose_your_program",
  "testimonials",
  "geeksInfo",
  "testimonials_new",
  "why_4geeks",
  "alumni_projects",
  "who_is_hiring",
  "divider",
  "two_column_left",
  "two_column_right",
  "multi_column",
  "single_column",
  "columns",
  "simple_cards",
  "job_guarantee_small",
  "faq",
];

async function listDir(dir) {
  try {
    return await fs.promises.readdir(`${__dirname}${dir}`);
  } catch (err) {
    console.error("Error occurred while reading directory!", err);
  }
}

const validateUtmCourse = (val, courses, _path) => {
  if (!Array.isArray(val))
    fail(`\n${`utm_course`.yellow} ${`expected an array in ${_path}`.red}\n`);
  if (val.length === 0)
    fail(`\n${`utm_course`.yellow} ${`must not be empty in ${_path}`.red}\n`);
  if (!val.every((el) => courses.includes(el)))
    fail(
      `${`\nProblem found in: ${_path}`.red}\n\n${
        `utm_course ${`${val}`.yellow} ${
          `not match with the utm_course list:`.red
        }`.red
      } \n\n${courses.map((el) => `${el.green}\n`)} \n`
    );
};

const validateUtmLocation = (val, locations, _path) => {
  if (!Array.isArray(val))
    fail(`\n${`utm_location`.yellow} ${`expected an array in ${_path}`.red}\n`);
  if (val.length === 0)
    fail(`\n${`utm_location`.yellow} ${`must not be empty in ${_path}`.red}\n`);
  if (!val.every((el) => locations.includes(el)))
    fail(
      `${`\nProblem found in: ${_path}`.red}\n\n${
        `utm_location ${`${val}`.yellow} ${
          `not match with the location list:`.red
        }`.red
      } \n\n${locations.map((el) => `${el.green}\n`)} \n`
    );
};

const validateComponents = (val, components, _path) => {
  if (!Array.isArray(val))
    fail(`\n${`components`.yellow} ${`expected an array in ${_path}`.red}\n`);
  const unMatchingComponent = val.find((el) => !components.includes(el.layout));
  if (unMatchingComponent)
    fail(
      `${`\nProblem found in: landing ${_path}`.red}\n\n${
        `using a component layout that does not exist: ${
          `${unMatchingComponent.layout}`.yellow
        } ${`not match with available components:`.red}`.red
      }\n\n${components.map((el) => `${el.green}\n`)} \n`
    );
};

walk(`${__dirname}/../data/landing`, async (err, files) => {
  const courseFiles = await listDir("/../data/course");
  const locationFiles = await listDir("/../data/location");
  let coursesYml = [];
  let locationsYml = [];

  courseFiles.forEach((_path) => {
    const file = loadYML(`src/data/course/${_path}`);
    coursesYml.push(file.yaml.meta_info.bc_slug);
    coursesYml = [...new Set(coursesYml)];
  });
  locationFiles.forEach((_path) => {
    const file = loadYML(`src/data/location/${_path}`);
    locationsYml.push(file.yaml.breathecode_location_slug);
    locationsYml = [...new Set(locationsYml)];
  });
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
      const landing = doc.yaml;

      validateObjectProperties(landing, {
        meta_info: (val) => {
          validateUtmCourse(val.utm_course, coursesYml, _path);
          validateUtmLocation(val.utm_location, locationsYml, _path);
        },
        components: (val) => {
          validateComponents(val, landingSections, _path);
        },
      });
    } catch (error) {
      console.error(`Error on file: ${_path}`.red);
      fail(error.message || error);
    }
  }
  success("All Landing yml have correct utm_course");
});
