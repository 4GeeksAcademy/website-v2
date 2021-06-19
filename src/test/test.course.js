// var colors = require('colors');
// const { walk, loadYML, empty, fail, success } = require('./_utils');

// const front_matter_fields = [
//   { key: 'utm_course', type: 'string', mandatory: true },
//   //     {key: "title", type: "string", mandatory: true},
// ];

// walk(`${__dirname}/../data/course`, async (err, files) => {
//   if (err) fail('Error reading the Markdown files: ', err);
//   // err && fail("Error reading the Markdown files: ", err)

//   files.forEach((_path) => {
//       const doc = loadYML(_path);
//       if (!doc || !doc.yaml) fail('Invalid YML syntax for ' + _path);
//     });

//   const _files = files.filter(
//     (f) =>
//       (f.indexOf('.yml') > 1 || f.indexOf('.yaml') > 1) &&
//       f.indexOf('additional-redirects.yml') === -1 &&
//       f.indexOf('call-to-actions.yml') === -1
//   );

//   for (let i = 0; i < _files.length; i++) {
//     const _path = _files[i];
//     const doc = loadYML(_path);
//     const _slug = _path.split(".")[0].substr(_path.lastIndexOf("/") +1)
//     if (!doc.yaml) fail('Invalid YML syntax for ' + _path);
//     if (!doc.lang) fail('Missing language on yml file name for ' + _path);

//     try {
//       const content = loadYML(_path);
//       const course = content.yaml
//       const meta_keys = Object.keys(course)
      
//       front_matter_fields.forEach(obj => {
//         if(!meta_keys.includes(obj["key"])) fail(`Missing prop ${obj["key"]} on course on ${_path}`)
        
//         else{
//           if(obj["type"] === "string"){
            
//             // TODO: [x] utm_course tiene que coincidir con cualquiera de los nombres de archivo dentro de los ./src/data/course/nombres de archivo (ignorando el idioma). Por ejemplo: pila completa

//             if(obj["mandatory"] === true && (course[obj["key"]] !== _slug)) fail(`Invalid mandatory prop ${obj["key"]} on ${_path} expected ${_slug.green} ${"doesn't match with".red} ${course[obj["key"]].yellow}`)    
//           }
//         }
//       })
//     } catch (error) {
//       console.error(`Error on file: ${_path}`.red);
//       fail(error.message || error);
//     }
//   }
//   success("All course have correct utm_course");
// });
