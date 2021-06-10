const path = require("path");
const fs = require("fs");
const { walk, loadYML, empty, fail, success } = require("./_utils");

const onCreateLangSwitcherData = () => {

  let arraySlug= []
  walk(`${__dirname}/../data/page`, (err, files) => {
    if (err) fail("Error reding the Page files: ", err);
    
      for (let i = 0; i < files.length; i++) {
        const _path = files[i];
        const doc = loadYML(_path);
        const fileName = _path.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.').toLowerCase();
        const getName= fileName.split(".")[0]
        const getLang= fileName.split(".")[1]
        // TODO: TENEMOS LO QUE QUERIAMOS dividimos name y lang ahora a usar logica
        console.log("FILENAME::SPLIT:::",getName)
        console.log("FILENAME::SPLIT:::",getLang)

        // arraySlug.push(fileName)


        // console.log("PATH:::", fileName)
        //TODO: buscar forma de enviar.es al inicio como /es/ o /us/
        // console.log("ARRAY::::::::::::::", arraySlug[i] === arraySlug[i-1])
      }

      //TODO esto esta listo ok!!!
      // console.log("ARRAY::::::::::::::", arraySlug)
      // fs.writeFile(`${__dirname}/../utils/langSwitcherData.json`, JSON.stringify(arraySlug), (err) => {
      //   if (err) return console.log(err);
      //   console.log('langSwitcherData > langSwitcherData.json');
      // });
  });

};
onCreateLangSwitcherData();
