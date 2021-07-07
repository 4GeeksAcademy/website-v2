const fs = require("fs");
const { walk, loadYML, empty, fail, success } = require("../test/_utils");

let toKeyValue = (array) => {
  return Object.fromEntries(array);
};

const onCreateLangSwitcherData = () => {
  let arraySlug = [];
  let langES = [];
  let langUS = [];
  let All_dictionary = [];
  let slugType = {
    location: "coding-campus",
    course: "coding-bootcamps",
  };

  // ----------------- PAGE DICTIONARY -----------------
  walk(`${__dirname}/../data/page`, (err, files) => {
    let page_ES_US = [];
    let page_US_ES = [];
    if (err) fail("Error reding the Page files: ", err);
    for (let i = 0; i < files.length; i++) {
      const _path = files[i];
      const doc = loadYML(_path);
      const lang = doc.lang;
      const slug = doc.yaml.meta_info.slug;
      arraySlug.push([`/${lang}/${slug}`]);
    }
    for (let l = 0; l < arraySlug.length; l++) {
      if (l % 2 == 0) {
        langES.push(arraySlug[l]);
      }
      if (l % 2 == 1) {
        langUS.push(arraySlug[l]);
      }
    }
    for (let z = 0; z < langES.length; z++) {
      page_ES_US.push(langES[z].concat(langUS[z]));
      page_US_ES.push(langUS[z].concat(langES[z]));
    }

    Object.fromEntries(page_ES_US);
    Object.fromEntries(page_US_ES);

    page_ES_US.push(...page_US_ES);

    // ----------------- COURSE DICTIONARY -----------------
    walk(`${__dirname}/../data/course`, (err, files) => {
      let course_ES_US = [];
      let course_US_ES = [];
      if (err) fail("Error reding the COURSE files: ", err);
      for (let i = 0; i < files.length; i++) {
        const _path = files[i];
        const doc = loadYML(_path);
        const lang = doc.lang;
        const slug = doc.yaml.meta_info.slug;
        arraySlug.push([`/${lang}/${slugType["course"]}/${slug}`]);
      }
      for (let l = 0; l < arraySlug.length; l++) {
        if (l % 2 == 0) {
          langES.push(arraySlug[l]);
        }
        if (l % 2 == 1) {
          langUS.push(arraySlug[l]);
        }
      }

      for (let z = 0; z < langES.length; z++) {
        course_ES_US.push(langES[z].concat(langUS[z]));
        course_US_ES.push(langUS[z].concat(langES[z]));
      }

      Object.fromEntries(course_ES_US);
      Object.fromEntries(course_US_ES);

      course_ES_US.push(...course_US_ES);

      // ----------------- LOCATION DICTIONARY -----------------
      walk(`${__dirname}/../data/location`, (err, files) => {
        let Location_ES_US = [];
        let Location_US_ES = [];
        if (err) fail("Error reding the location files: ", err);
        for (let i = 0; i < files.length; i++) {
          const _path = files[i];
          const doc = loadYML(_path);
          const lang = doc.lang;
          const slug = doc.yaml.meta_info.slug;
          arraySlug.push([`/${lang}/${slugType["location"]}/${slug}`]);
        }
        for (let l = 0; l < arraySlug.length; l++) {
          if (l % 2 == 0) {
            langES.push(arraySlug[l]);
          }
          if (l % 2 == 1) {
            langUS.push(arraySlug[l]);
          }
        }

        for (let z = 0; z < langES.length; z++) {
          Location_ES_US.push(langES[z].concat(langUS[z]));
          Location_US_ES.push(langUS[z].concat(langES[z]));
        }

        Object.fromEntries(Location_ES_US);
        Object.fromEntries(Location_US_ES);

        Location_ES_US.push(...Location_US_ES);
        All_dictionary.push(toKeyValue(Location_ES_US));

        // WARN: to avoid the disorder of the dictionary this fragment has been commented
        // WARN: uncoment only if there are no pathsDictionary file created

        fs.writeFile(`${__dirname}/pathDictionary.json`,
          JSON.stringify(...All_dictionary),
          (err) => {
            if (err) return console.log(err);
            success(`\npathDictionary => /src/utils/pathDictionary.json\n`);
        });

      });
    });
  });
};
onCreateLangSwitcherData();
