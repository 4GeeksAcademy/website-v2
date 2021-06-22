const fs = require('fs');
const path = require('path');
const jsyaml = require("js-yaml");
const fm = require('front-matter');
var colors = require('colors');

const walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
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
    const content = fs.readFileSync(pathToFile, 'utf8');
    try{
        const yaml = jsyaml.load(content);
        
        const fileName = pathToFile.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.').toLowerCase();
        if(typeof yaml == 'undefined' || !yaml) throw new Error(`The file ${fileName}.yml was impossible to parse`.red);

        const [name, lang] = fileName.split(".");
        return {yaml,name, lang}
    }
    catch(error){
        console.error(error);
        return null;
    }
    
}


const loadMD = (pathToFile) => {
  let raw = fs.readFileSync(pathToFile, 'utf8');
  try{
      const content = fm(raw);
      
      const fileName = pathToFile.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.').toLowerCase();
      if(typeof content == 'undefined' || !content) throw new Error(`The file ${fileName}.yml was impossible to parse`.red);

      const [name, lang] = fileName.split(".");
      return { ...content,name, lang}
  }
  catch(error){
      console.error(error);
      return null;
  }
  
}

const empty = (data) => {
    if(!data) return true
    else if(typeof data === "undefined") return true

    return false
}

const fail = (msg, ...params) => {
    console.log(msg.red, ...params);
    process.exit(1);
}

const success = (msg, ...params) => {
    console.log(msg.green, ...params);
    process.exit(0);
}

const regex = {
  relative_images: /(:file:\/)?(^(?!http:))+[.\/]+[\w\]|[.]+(\/[\w\.\-]+)+\/?/gm, 
  external_images: /!\[.*\]\(https?:\/(\/{1}[^/)]+)+\/?\)/gm,
  url: /(https?:\/\/[a-zA-Z_\-.\/0-9]+)/gm,
  uploadcare: /https:\/\/ucarecdn.com\/(?:.*\/)*([a-zA-Z_\-.\/0-9]+)/gm
}

const findInFile = (types, content) => {
  const validTypes = Object.keys(regex);
  if(!Array.isArray(types)) types = [types];
  let findings = {}
  types.forEach(type => {
    if(!validTypes.includes(type)) throw Error("Invalid type: "+type)
    else findings[type] = {};
  });

  types.forEach(type => {

    let count = 0;
    while ((m = regex[type].exec(content)) !== null) {

      // This is necessary to avoid infinite loops with zero-width matches
      let checkIsRelative = types[0] === 'relative_images' ? m[3] : m[1]
      // console.log("File to find:", checkIsRelative)

      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      
      // The result can be accessed through the `m`-variable.
      // m.forEach((match, groupIndex) => values.push(match));
      const txt = m[0];
      count++;
      findings[type][m[0]] = checkIsRelative;
    }
  })
  return findings;
}

const localizeImage = async (content, type, extensions, _path, folder_of_images) => {

  const findings = findInFile(type, content);
  const dirPath = path.join(__dirname, `/../../static/images/${folder_of_images}`);

  const regex_matchFiles = {
    relative_images: /(:file:\/)?[.\/]+[\w\]|[.]+(\/[\w\.\-]+)+\/?/gm, 
    external_images: /.*!\[.*\]\(https?:\/(\/{1}[^/)]+)+\/?\).*/gm,
    url: /.*(https?:\/\/[a-zA-Z_\-.\/0-9]+).*/gm,
    uploadcare: /.*https:\/\/ucarecdn.com\/(?:.*\/)*([a-zA-Z_\-.\/0-9]+).*/gm
  }

  for(expression in findings[type]){
      
      let matches = regex_matchFiles[type].exec(expression);

      if(matches){
          let match = type === 'relative_images' ? matches[2] : matches[1];
          let fileName = findings[type][expression].replace("/","");

          // console.log("MATCHESS", findings[type], '\n')

          if(fileName.indexOf(".") === -1){
              if(extensions[fileName]) fileName = fileName + "." + extensions[fileName];
              else console.log("Extension not found for "+fileName)
          } 
          let imagePath = dirPath + "/" + fileName;
          // console.log("PATH_IMAGE FOUND", imagePath)

          if(fs.existsSync(imagePath)){
              // console.log(`Image ${match} in ${_path} was found\n`)
              continue
          }else{
              fail(`\n${match.yellow} ${`not found in /static/images/${folder_of_images}`.red} \n${`no relation to static folder found at: ${_path}`.red}\n`)
          }
      }
  }
}

module.exports = { walk, loadYML, loadMD, empty, fail, success, findInFile, localizeImage }
