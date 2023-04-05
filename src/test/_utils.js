const fs = require("fs");
const path = require("path");
const jsyaml = require("js-yaml");
const fm = require("front-matter");
var colors = require("colors");

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

const getEntityTypeFromPath = (path) => {
  const regex = /src\/data\/([\w-]+)\.?(\w{2})?\//gm;
  let m = regex.exec(path);
  if (!m) return false;
  else return m[1];
};

let breadcrumb = [];
const validateObjectProperties = (obj, validations) => {
  for (prop in obj) {
    breadcrumb.push(prop);
    const breadcrumbPath = breadcrumb
      .join(".")
      .replace(/\.\d+([\.$])?/gm, "[]$1");
    try {
      if (
        validations[breadcrumbPath] &&
        !isFunction(validations[breadcrumbPath])
      ) {
        breadcrumb = [];
        throw Error(
          `Object property validation for prop ${breadcrumbPath} should be a funcion`
        );
      } else if (validations[breadcrumbPath]) {
        validations[breadcrumbPath](obj[prop], breadcrumbPath);
      }
    } catch (error) {
      breadcrumb = [];
      throw { message: error.message, path: breadcrumbPath };
    }
    if (typeof obj[prop] == "object")
      validateObjectProperties(obj[prop], validations);
    breadcrumb.pop();
  }
};

const walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const loadYML = (pathToFile) => {
  const content = fs.readFileSync(pathToFile, "utf8");
  try {
    const yaml = jsyaml.load(content);

    const fileName = pathToFile
      .replace(/^.*[\\\/]/, "")
      .split(".")
      .slice(0, -1)
      .join(".")
      .toLowerCase();
    if (typeof yaml == "undefined" || !yaml)
      throw new Error(`The file ${fileName}.yml was impossible to parse`.red);

    const [name, lang] = fileName.split(".");

    const regex = /.*\/([\w-]*)\/([\w-]+)\.?(\w{2})?\//gm;
    let m = regex.exec(pathToFile);
    if (!m) return false;

    const type = m[1] === "data" ? m[2] : m[1];

    return { yaml, name, lang, type, path };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const loadMD = (pathToFile) => {
  let raw = fs.readFileSync(pathToFile, "utf8");
  try {
    const content = fm(raw);

    const fileName = pathToFile
      .replace(/^.*[\\\/]/, "")
      .split(".")
      .slice(0, -1)
      .join(".")
      .toLowerCase();
    if (typeof content == "undefined" || !content)
      throw new Error(`The file ${fileName}.yml was impossible to parse`.red);

    const [name, lang] = fileName.split(".");
    return { ...content, name, lang };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const empty = (data) => {
  if (!data) return true;
  else if (typeof data === "undefined") return true;

  return false;
};

const fail = (msg, ...params) => {
  console.log(msg.red, ...params);
  process.exit(1);
};

const warn = (msg, ...params) => {
  console.log(msg.yellow, ...params);
};

const success = (msg, ...params) => {
  console.log(msg.green, ...params);
  process.exit(0);
};

const regex = {
  relative_images:
    /(:file:\/)?(^(?!http:))+[.\/]+[\w\]|[.]+(\/[\w\.\-]+)+\/?/gm,
  external_images: /!\[.*\]\(https?:\/(\/{1}[^/)]+)+\/?\)/gm,
  url: /(https?:\/\/[a-zA-Z_\-.\/0-9]+)/gm,
  uploadcare: /https:\/\/ucarecdn.com\/(?:.*\/)*([a-zA-Z_\-.\/0-9]+)/gm,
};

const parsePathImage = (types, content) => {
  const validTypes = Object.keys(regex);
  if (!Array.isArray(types)) types = [types];
  let findings = {};
  types.forEach((type) => {
    if (!validTypes.includes(type)) throw Error("Invalid type: " + type);
    else findings[type] = {};
  });

  types.forEach((type) => {
    while ((m = regex[type].exec(content)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      let checkIsRelative = types[0] === "relative_images" ? m[3] : m[1];
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      findings[type][m[0]] = checkIsRelative;
    }
  });
  return findings;
};

/*
  LocalizeImage parameters

  content= /path/of/image.png
  type= "relative_images" || "url"
  _path= necesary for warning and logs in case of error
  folder_of_images= folder name /static/images/('.' || 'bg' || 'locations' || 'etc/more')
*/
const localizeImage = async (content, type, _path, folder_of_images) => {
  let extensions = ["png", "jpg", "jpeg"];
  const findings = parsePathImage(type, content);
  const dirPath = path.join(
    __dirname,
    `/../../static/images/${folder_of_images}`
  );

  const regex_matchFiles = {
    relative_images: /(:file:\/)?[.\/]+[\w\]|[.]+(\/[\w\.\-]+)+\/?/gm,
    external_images: /.*!\[.*\]\(https?:\/(\/{1}[^/)]+)+\/?\).*/gm,
    url: /.*(https?:\/\/[a-zA-Z_\-.\/0-9]+).*/gm,
    uploadcare: /.*https:\/\/ucarecdn.com\/(?:.*\/)*([a-zA-Z_\-.\/0-9]+).*/gm,
  };

  for (expression in findings[type]) {
    let matches = regex_matchFiles[type].exec(expression);

    if (matches) {
      let match = type === "relative_images" ? matches[2] : matches[1];
      let fileName = findings[type][expression].replace("/", "");

      if (fileName.indexOf(".") === -1) {
        if (extensions[fileName])
          fileName = fileName + "." + extensions[fileName];
        else console.log("Extension not found for " + fileName);
      }
      let imagePath = dirPath + "/" + fileName;

      if (fs.existsSync(imagePath)) {
        continue;
      } else {
        fail(
          `\n${match.yellow} ${
            `not found in /static/images/${folder_of_images}`.red
          } \n${`no relation to static folder found at: ${_path}`.red}\n`
        );
      }
    }
  }
};

// It only accepts array([]) of slugs and location name(string)
const checkForLanguages = (slugs, folder_name) => {
  let uniq_slug = slugs.filter(
    (curr, prev, self) => self.indexOf(curr) === prev
  );
  for (let i = 0; i < uniq_slug.length; i++) {
    let slug_es = `${__dirname}/../data/${folder_name}/${uniq_slug[i]}.es.yaml`;
    let slug_us = `${__dirname}/../data/${folder_name}/${uniq_slug[i]}.us.yaml`;

    !fs.existsSync(slug_es)
      ? fail("File language does not exist, expected as", slug_es.green)
      : !fs.existsSync(slug_us)
      ? fail("File language does not exist, expected as", slug_us.green)
      : null;
  }
};

module.exports = {
  walk,
  loadYML,
  loadMD,
  empty,
  fail,
  warn,
  success,
  parsePathImage,
  localizeImage,
  validateObjectProperties,
  checkForLanguages,
  getEntityTypeFromPath,
};
