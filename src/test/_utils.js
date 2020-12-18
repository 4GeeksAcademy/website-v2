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

module.exports = { walk, loadYML, loadMD, empty, fail, success }