require("dotenv").config({
  path: `.env.development`,
});
const {
  walk,
  loadYML,
  empty,
  fail,
  warn,
  success,
  validateObjectProperties,
  getEntityTypeFromPath,
} = require("./_utils");
const API = require("../utils/api");

const validateEmptyHeader = (val, breathecrumb) => {
  
  if (!val.title || val.title === "") throw Error("Missing title " + breathecrumb);
  if (!val.paragraph || val.paragraph === "") throw Error("Missing paragraph " + breathecrumb);
  if (!val.image || val.image === "") throw Error("Missing image " + breathecrumb);
  if (!val.image_alt || val.image_alt === "") throw Error("Missing image_alt " + breathecrumb);
};

walk(`${__dirname}/../data/cluster/`, async function (err, files) {
  if (err) fail("Error reding the YML files: ", err);
  const _files = files.filter(
    (f) => f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1
  );
  let clusters;
  try{
    clusters = await API.getAllClusters('https://breathecode.herokuapp.com/v1');
  } catch (e){
    console.log('could not retrieve clusters: ', e);
  }

  let langs = {};
  const slugs = [];
  _files.forEach((_path) => {
    const doc = loadYML(_path);
    langs[doc.lang] = true;

    const yml = doc && doc.yaml;
    slugs.push(yml.meta_info.slug);
    if (!yml) fail("Invalid YML syntax for " + _path);
    else {
      try {

        if (!yml.header) fail("Missing Header in " + _path);
        if (!yml.seo_title || yml.seo_title === '') fail("Missing seo_title in " + _path);

        validateObjectProperties(yml, {
          "header": validateEmptyHeader,
        });
      } catch (error) {
        fail(`${error.message} in ${error.path} for file: \n ${_path}`);
      }
    }
  });

  clusters.map((cluster) => {
    if (!slugs.includes(cluster.slug)) warn(`Cluster ${cluster.slug} does not have a YML File`);
  });

  success("All the culters are OK!");
});
