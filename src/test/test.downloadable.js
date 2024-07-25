const fetch = require("node-fetch");
const {
  walk,
  loadYML,
  empty,
  fail,
  success,
  localizeImage,
} = require("./_utils");
const front_matter_fields = [
  { key: "current_download", type: "string", mandatory: true },
];

walk(`${__dirname}/../data/downloadable`, async (err, files) => {
  console.log("\nScanning downloadables...");
  err && fail("Error reading the YAML files: ", err);
  files.forEach((_path) => {
    const doc = loadYML(_path);
    if (!doc || !doc.yaml) fail("Invalid YML syntax for " + _path);
  });
  let _path = "";
  try {
    const resp = await fetch(
      `https://breathecode.herokuapp.com/v1/marketing/downloadable`
    );
    console.log(`wewewe`);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const downloadables = await resp.json();

    const _files = files.filter(
      (f) =>
        (f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1) &&
        f.indexOf("additional-redirects.yml") === -1 &&
        f.indexOf("call-to-actions.yml") === -1
    );

    for (let i = 0; i < _files.length; i++) {
      _path = _files[i];
      const doc = loadYML(_path);
      if (!doc.yaml) fail("Invalid YML syntax for " + _path);
      if (!doc.lang) fail("Missing language on yml file name for " + _path);

      let meta_info_image = doc.yaml.meta_info.image;
      let header_image = doc.yaml.header_data.image;

      localizeImage(header_image, "relative_images", _path, ".");
      localizeImage(meta_info_image, "relative_images", _path, "bg");

      const data = doc.yaml;
      const meta_keys = Object.keys(data.meta_info);
      const current_download = data.meta_info.current_download;

      const scanResult = downloadables.some(
        (el) => el.slug === current_download
      );
      if (scanResult === false) {
        console.log(
          "The list of downloadables available is:".green,
          downloadables.map((el) => el.slug)
        );
        fail(
          `${`\nProblem found in: ${_path}`.red}\n\n${
            `Property current_download with value ${
              `${current_download}`.yellow
            } ${`not found in the downloadables list`.red}`.red
          }\n\n`
        );
      }

      front_matter_fields.forEach((obj) => {
        if (!meta_keys.includes(obj["key"]))
          fail(`Missing prop ${obj["key"]} from course on ${_path}`);
      });
    }
    success("All Downloadables yml have correct properties");
  } catch (error) {
    console.error(`Error on file: ${_path}`.red);
    fail(error.message || error);
  }
});
