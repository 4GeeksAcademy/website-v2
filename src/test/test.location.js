var colors = require('colors');
const fetch = require('node-fetch');
const { walk, loadYML, empty, fail, success } = require('./_utils');

let limit_images = 5;
const front_matter_fields = [
  { key: 'breathecode_location_slug', type: 'string', mandatory: true },
];

walk(`${__dirname}/../data/location`, async (err, files) => {
  const academySlug = []
  err && fail('Error reading the YAML files: ', err);
  files.forEach((_path) => {
    const doc = loadYML(_path);
    if (!doc || !doc.yaml) fail('Invalid YML syntax for ' + _path);
  });
  
  console.log("verifying location slugs...")
  const res = await fetch("https://breathecode.herokuapp.com/v1/admissions/academy", {
    headers: {
      'Authorization': `Token ${process.env.DEV_TOKEN}`,
      'Academy': 4
    }
  })
  const academyData = await res.json()
  academyData.map(el => academySlug.push(el.slug))
  console.log("academy available", academySlug)

  const _files = files.filter(
    (f) =>
      (f.indexOf('.yml') > 1 || f.indexOf('.yaml') > 1) &&
      f.indexOf('additional-redirects.yml') === -1 &&
      f.indexOf('call-to-actions.yml') === -1
  );

  for (let i = 0; i < _files.length; i++) {
    const _path = _files[i];
    const doc = loadYML(_path);
    const _slug = await _path.split(".")[0].substr(_path.lastIndexOf("/") +1)
    if (!doc.yaml) fail('Invalid YML syntax for ' + _path);
    if (!doc.lang) fail('Missing language on yml file name for ' + _path);

    try {
      const location = doc.yaml
      const meta_keys = Object.keys(location)
      console.log("\nImages count:", location.images_box.images?.length, "\npath: ", _path, "\n")
      console.log("location need images for next tests".yellow, "\n")

      front_matter_fields.forEach(obj => {
        let slugMatch = academySlug.some(el=> el === location[obj["key"]])

        // TODO: Uncoment when all location have correct images
        // if(location.images_box.images?.length <= limit_images) fail(`The images in locations yml should have exactly 5 images.\n\nConflict: found ${location.images_box.images?.length} of ${limit_images} images in:\n${_path}\n\n`)
        
        if(!meta_keys.includes(obj["key"])) fail(`Missing prop ${obj["key"]} from location on ${_path}`)
        
        else{
          if(obj["type"] === "string"){
            if(obj["mandatory"] === true && slugMatch !== true && (location[obj["key"]] !== _slug)) fail(`\n\nInvalid mandatory prop ${obj["key"]} on ${_path} expected: ${location[obj["key"]].yellow} ${"match with".red} ${_slug.green}\n\n`)
          }
        }
      })
    } catch (error) {
      console.error(`Error on file: ${_path}`.red);
      fail(error.message || error);
    }
  }
  success("All Locations test passed");
});