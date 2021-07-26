const fs = require('fs');
var colors = require('colors');
const fetch = require('node-fetch');
const { walk, loadYML, empty, fail, success, localizeImage } = require('./_utils');

require('dotenv').config()

let limit_images = 5;
const front_matter_fields = [
  { key: 'breathecode_location_slug', type: 'string', mandatory: true },
];

walk(`${__dirname}/../data/location`, async (err, files) => {
  const academySlug = []
  err && fail('Error reading the YAML files: ', err);
  console.log("verifying location slugs...")

  files.forEach((_path) => {
    const doc = loadYML(_path);
    if (!doc || !doc.yaml) fail('Invalid YML syntax for ' + _path);
  });

  const res = fetch(`https://breathecode.herokuapp.com/v1/admissions/academy`, {
    headers: {
      'Authorization': `Token ${process.env.WEBSITE_BC_API_TOKEN}`,
      'Academy': 4
    }
  }).then(resData => resData.json()).catch(err => fail(res.status + ': Unable to retreive academy API location Information: ', err))
  // if(res.status !== 200) fail(res.status + ': Unable to retreive academy API location Information: ', await res.json());

  const academyData = await res
  academyData.map(el => academySlug.push(el.slug))
  console.log("academy available", academySlug)

  const _files = files.filter(
    (f) =>
      (f.indexOf('.yml') > 1 || f.indexOf('.yaml') > 1) &&
      f.indexOf('additional-redirects.yml') === -1 &&
      f.indexOf('call-to-actions.yml') === -1
  );

  let slugs = []
  for (let i = 0; i < _files.length; i++) {
    const _path = _files[i];
    const doc = loadYML(_path);
    
    let _slug = await _path.split(".")[0].substr(_path.lastIndexOf("/") +1)
    slugs.push(_slug)

    if(slugs.length === _files.length){
      let uniq_slug = slugs.filter((curr, prev, self) => self.indexOf(curr) === prev)
      for (let i = 0; i < uniq_slug.length; i++) {
        let slug_es = `${__dirname}/../data/location/${uniq_slug[i]}.es.yaml`
        let slug_us = `${__dirname}/../data/location/${uniq_slug[i]}.us.yaml`

        !fs.existsSync(slug_es) ? fail("File language does not exist, expected as", slug_es.green)
        : !fs.existsSync(slug_us) ? fail("File language does not exist, expected as", slug_us.green) 
        : null
       
      }
    }

    if (!doc.yaml) fail('Invalid YML syntax for ' + _path);
    if (!doc.lang) fail('Missing language on yml file name for ' + _path);

    try {
      const location = doc.yaml
      const meta_keys = Object.keys(location)


      if(location.images_box.images !== null ){
        for(let i = 0; i < location.images_box.images.length; i++){

          let images_box = location.images_box.images[i].path
          let header_image = location.header.image
          let info_box = location.info_box.image

          localizeImage(info_box, 'relative_images', _path, 'locations')
          localizeImage(header_image, 'relative_images', _path, 'locations')
          localizeImage(images_box, 'relative_images', _path, 'locations')
        }
      }

      //NOTE: warn if location not have any image
      if(location.images_box.images?.length < 5 || location.images_box.images?.length === undefined){
        console.log("\nlocation needs images as soon as possible".yellow)
        console.log("Images count:", location.images_box.images?.length, "\npath: ", _path, "\n")
      }

      front_matter_fields.forEach(obj => {
        let slugMatch = academySlug.some(el=> el === location.breathecode_location_slug)

        // NOTE: Uncoment when all location have correct images
        // if(!location.images_box.images?.length === limit_images) fail(`The images in locations yml should have exactly 5 images.\n\nConflict: found ${location.images_box.images?.length} of ${limit_images} images in:\n${_path}\n\n`)
        
        if(!meta_keys.includes(obj["key"])) fail(`Missing prop ${obj["key"]} from location on ${_path}`)
        
        else{
          if(obj["type"] === "string"){
            if(obj["mandatory"] === true && slugMatch !== true && (location[obj["key"]] !== _slug)) fail(`\n\nInvalid mandatory prop ${obj["key"]} on ${_path} expected: ${location[obj["key"]].yellow} ${"match with".red} ${_slug.yellow}\n\n`)
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