const fs = require('fs');
var colors = require('colors');
const fetch = require('node-fetch');
const { walk, loadYML, empty, fail, warn, success, localizeImage } = require('./_utils');

require('dotenv').config()

const content_fields = [
  { key: 'breathecode_location_slug', type: 'string', mandatory: true },
];

const locations_fields = [
  { key: 'active_campaign_location_slug', type: 'string', mandatory: true },
  { key: 'city', type: 'string', mandatory: true },
  { key: 'phone', type: 'string', mandatory: false },
  { key: 'latitude', type: 'string', mandatory: true },
  { key: 'longitude', type: 'string', mandatory: true },
]

let allLocations = {}

walk(`${__dirname}/../data/location`, async (err, files) => {
  const academySlug = []
  err && fail('Error reading the YAML files: ', err);
  console.log("verifying location slugs...")

  files.forEach((_path) => {
    const doc = loadYML(_path);
    if (!doc || !doc.yaml) fail('Invalid YML syntax for ' + _path);
    doc.filePath = _path
    let pieces = _path.split(".")
    if(pieces.length !== 3) fail('The file path for this location can\'t contain dot(".") and it most include the languague, ex: miami.us.yaml' + _path)
    // if (!doc.lang) fail('Missing language on yml file name for ' + _path);
    const fileSlug = pieces[0].substr(_path.lastIndexOf("/") +1)
    const fileLang = pieces[1]

    // If the first file is undefined replace the value with an object (in this case bogota-colombia[es/us])
    if(allLocations[fileLang] === undefined) allLocations[fileLang] = {}
    else {
    // Replace file language inside the file yaml because the filename lang must prevail
      doc.lang = fileLang
      allLocations[fileLang][fileSlug] = doc
    }
  });

  

    // let academyData = null;
    // const res = await fetch('https://breathecode.herokuapp.com/v1/admissions/academy') 
    // if(res.status !== 200) fail(res.status + ': Unable to retreive academy API location Information: ', await res.json());
    // else academyData = await res.json()

    // if(!academyData || !Array.isArray(academyData)) fail("Invalid academy data", academyData)
    // academyData.map(el => academySlug.push(el.slug))

  const _files = files.filter(
    (f) =>
      (f.indexOf('.yml') > 1 || f.indexOf('.yaml') > 1) &&
      f.indexOf('additional-redirects.yml') === -1 &&
      f.indexOf('call-to-actions.yml') === -1
  );

  let slugs = []
  let active_campaign_location_slug = []
  let city = []
  let phone = []
  let latitude = []
  let longitude = []

  for (let i = 0; i < _files.length; i++) {
    const _path = _files[i];
    const doc = loadYML(_path);
    const location = doc.yaml
    
    // TODO: remover await que no devuelvan promesas
    let _slug = _path.split(".")[0].substr(_path.lastIndexOf("/") +1)
    slugs.push(_slug)
    // await active_campaign_location_slug.push(location.active_campaign_location_slug)
    // await city.push(location.city)
    // await phone.push(location.phone)
    // await latitude.push(location.latitude)
    // await longitude.push(location.longitude)

    // ask if we already looped thru all the files
    // TODO: No hay necesidad de usar este if si movemos este codigo debajo del for
    if(slugs.length === _files.length){

      // TODO: Crear una funcion CheckForLanguages con este codigo
      let uniq_slug = slugs.filter((curr, prev, self) => self.indexOf(curr) === prev)
      for (let i = 0; i < uniq_slug.length; i++) {
        let slug_es = `${__dirname}/../data/location/${uniq_slug[i]}.es.yaml`
        let slug_us = `${__dirname}/../data/location/${uniq_slug[i]}.us.yaml`

        !fs.existsSync(slug_es) ? fail("File language does not exist, expected as", slug_es.green)
        : !fs.existsSync(slug_us) ? fail("File language does not exist, expected as", slug_us.green) 
        : null
      }
    }


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
        // console.log("\nlocation needs images as soon as possible".yellow)
        // console.log("Images count:", location.images_box.images?.length, "\npath: ", _path, "\n")
      }

      content_fields.forEach(obj => {
        let slugMatch = academySlug.some(el=> el === location.breathecode_location_slug)

        // TODO: Uncoment when all location have correct images
        // if(!location.images_box.images?.length === limit_images) fail(`The images in locations yml should have exactly 5 images.\n\nConflict: found ${location.images_box.images?.length} of ${limit_images} images in:\n${_path}\n\n`)
        
        if(!meta_keys.includes(obj["key"])) fail(`Missing prop ${obj["key"]} from location on ${_path}`)
        
        else{
          if(obj["type"] === "string"){
            if(obj["mandatory"] === true && slugMatch !== true && (location[obj["key"]] !== _slug)) fail(`\n\nInvalid mandatory prop ${obj["key"]} on ${_path} expected: ${location[obj["key"]].yellow} ${"match with".red} ${_slug.yellow}\n\n`)
          }
        }
      })

      locations_fields.forEach(field => {
        if(!meta_keys.includes(field["key"]) && field["mandatory"] === true) warn(`Missing prop ${field["key"]} from location on ${_path}`)
        Object.keys(allLocations['us']).forEach(slug => {
          const location_es = allLocations['es'][slug]['yaml'][field["key"]]
          const location_us = allLocations['us'][slug]['yaml'][field["key"]]
          const path = allLocations['es'][slug]['filePath']
          // console.log("FIELD:::", field["key"])
          // console.log(`runing ${field["key"]}, ${allLocations['es'][slug]['lang']} ${location_es} === ${allLocations['us'][slug]['lang']} ${location_us}\nin::: ${allLocations['us'][slug]['filePath']} or \n${allLocations['es'][slug]['filePath']}\n\n`)
          console.log(`runing ${field["key"]}`,location_es === location_us, 'on PATH\n', path, '\n\n')
          
          // console.log("FIELDS:::", allLocations['es'][slug]['filePath'])
        })

        // if(Object.keys(allLocations['us'])){
        //   if(allLocations['us'][slug][field] !== allLocations['es'][slug][field]){
        //     fail(`❌ ERROR: key ${field.yellow} trying match ${allLocations['us'][slug][field].yellow} and ${allLocations['es'][slug][field].yellow} in ${allLocations['us'][slug].filePath}.yaml`)
        //   }
        // }
      })


      // locations_fields.forEach(field => {
      //   if(!meta_keys.includes(obj["key"]) && obj["mandatory"] === true) warn(`Missing prop ${obj["key"]} from location on ${_path}`)
          // if(Object.keys(allLocations['us']).forEach(slug => {
      //       if(allLocations['us'][slug][field] !== allLocations['es'][slug][field]){
      //         fail(`❌ ERROR: key ${field.yellow} trying match ${allLocations['us'][slug][field].yellow} and ${allLocations['es'][slug][field].yellow} in ${allLocations['us'][slug].filePath}.yaml`)
      //       }
      //     }))
      //   })

    } catch (error) {
      console.error(`Error on file: ${_path}`.red);
      fail(error.message || error);
    }
  }
  success("All Locations test passed");
});