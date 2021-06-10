const fs = require("fs");
const { walk, loadYML, empty, fail, success } = require("./_utils");

const onCreateLangSwitcherData = () => {

  let arraySlug= []
  let langES = []
  let langUS = []
  let SWITCHER_LANG_ES_US = []
  let SWITCHER_LANG_US_ES = []
  walk(`${__dirname}/../data/page`, (err, files) => {
    if (err) fail("Error reding the Page files: ", err);
      for (let i = 0; i < files.length; i++) {
        const _path = files[i];
        const doc = loadYML(_path);
        const lang = doc.lang
        const slug = doc.yaml.meta_info.slug
        arraySlug.push([`/${lang}/${slug}`])
      }
      for(let l=0; l < arraySlug.length; l++){
        if (l % 2 == 0) {
          langES.push(arraySlug[l])
        }
        if (l % 2 == 1) {
          langUS.push(arraySlug[l])
        }
      }

      for(let z=0; z < langES.length; z++){
        SWITCHER_LANG_ES_US.push(langES[z].concat(langUS[z]))
        SWITCHER_LANG_US_ES.push(langUS[z].concat(langES[z]))
      }
      console.log("Total pages in spanish:", langES.length)
      console.log("Total pages in english:", langUS.length)

      Object.fromEntries(SWITCHER_LANG_ES_US)
      Object.fromEntries(SWITCHER_LANG_US_ES)
      
      SWITCHER_LANG_ES_US.push(...SWITCHER_LANG_US_ES)
      let parsedToKeyValue = Object.fromEntries(SWITCHER_LANG_ES_US)

      // console.log("SWITCHER::", parsedToKeyValue)
      //TODO esto esta listo ok!!!

      fs.writeFile(`${__dirname}/../utils/langSwitcherData.json`, JSON.stringify(parsedToKeyValue), (err) => {
        if (err) return console.log(err);
        console.log(`\nlangSwitcherData => /src/utils/langSwitcherData.json\n`);
      });
  });

};
onCreateLangSwitcherData();
