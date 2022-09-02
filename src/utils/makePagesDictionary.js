const fs = require("fs");
const { walk, loadYML, fail, success } = require("../test/_utils");
const file = require("./dictionaries/pages.json");

let toKeyValue = (array) => {
  return Object.fromEntries(array);
};

const sortFunction = (a, b) => {
  if (a[0] === b[0]) {
    return 0;
  }
  else {
    return (a[0] < b[0]) ? -1 : 1;
  }
}

const onCreateLangSwitcherData = () => {
  let All_dictionary = [];
  let slugType = {
    location: "coding-campus",
    course: "coding-bootcamps",
  };

  // ----------------- PAGE DICTIONARY -----------------
  walk(`${__dirname}/../data/page`, (err, files) => {
    let page_langES = [];
    let page_langUS = [];
    let page_ES_US = [];
    let page_US_ES = [];
    if (err) fail("Error reding the Page files: ", err);
    const _files = files.filter(
      (f) =>
        (f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1) &&
        f.indexOf("test.us.yml") === -1
    );

    for (let i = 0; i < _files.length; i++) {
      const _path = _files[i];
      const doc = loadYML(_path);
      const lang = doc.lang;
      const slug = doc.yaml.meta_info.slug;
      if (lang === 'es') page_langES.push([_path,`/${lang}/${slug}`]);
      else page_langUS.push([_path,`/${lang}/${slug}`]);
    }

    page_langES.sort(sortFunction);
    page_langUS.sort(sortFunction);

    page_langES = page_langES.map((val) => {
      return val.slice(1);
    });

    page_langUS = page_langUS.map((val) => {
      return val.slice(1);
    });

    for (let z = 0; z < page_langES.length; z++) {
      page_ES_US.push(page_langES[z].concat(page_langUS[z]));
      page_US_ES.push(page_langUS[z].concat(page_langES[z]));
    }

    page_ES_US.push(...page_US_ES);

    // ----------------- COURSE DICTIONARY -----------------
    walk(`${__dirname}/../data/course`, (err, files) => {
      let course_ES_US = [];
      let course_US_ES = [];
      let course_langES = [];
      let course_langUS = [];
      if (err) fail("Error reding the COURSE files: ", err);
      for (let i = 0; i < files.length; i++) {
        const _path = files[i];
        const doc = loadYML(_path);
        const lang = doc.lang;
        const slug = doc.yaml.meta_info.slug;
        if (lang === 'es') course_langES.push([_path,`/${lang}/${slugType["course"]}/${slug}`]);
        else course_langUS.push([_path,`/${lang}/${slugType["course"]}/${slug}`]);
      }

      course_langES.sort(sortFunction);
      course_langUS.sort(sortFunction);

      course_langES = course_langES.map((val) => {
        return val.slice(1);
      });

      course_langUS = course_langUS.map((val) => {
        return val.slice(1);
      });

      for (let z = 0; z < course_langES.length; z++) {
        course_ES_US.push(course_langES[z].concat(course_langUS[z]));
        course_US_ES.push(course_langUS[z].concat(course_langES[z]));
      }

      course_ES_US.push(...course_US_ES);

      // ----------------- LOCATION DICTIONARY -----------------
      walk(`${__dirname}/../data/location`, (err, files) => {
        let Location_langES = [];
        let Location_langUS = [];
        let Location_ES_US = [];
        let Location_US_ES = [];
        if (err) fail("Error reding the location files: ", err);
        for (let i = 0; i < files.length; i++) {
          const _path = files[i];
          const doc = loadYML(_path);
          const lang = doc.lang;
          const slug = doc.yaml.meta_info.slug;
          if (lang === 'es') Location_langES.push([_path,`/${lang}/${slugType["location"]}/${slug}`]);
          else Location_langUS.push([_path,`/${lang}/${slugType["location"]}/${slug}`]);
        }

        Location_langES.sort(sortFunction);
        Location_langUS.sort(sortFunction);

        Location_langES = Location_langES.map((val) => {
          return val.slice(1);
        });

        Location_langUS = Location_langUS.map((val) => {
          return val.slice(1);
        });

        for (let z = 0; z < Location_langES.length; z++) {
          Location_ES_US.push(Location_langES[z].concat(Location_langUS[z]));
          Location_US_ES.push(Location_langUS[z].concat(Location_langES[z]));
        }

        Location_ES_US = [
          ...Location_ES_US,
          ...Location_US_ES,
          ...course_ES_US,
          ...page_ES_US,
        ];
        All_dictionary.push(toKeyValue(Location_ES_US));

        file.yml = All_dictionary;
        fs.writeFile(
          `${__dirname}/dictionaries/pages.json`,
          JSON.stringify(file),
          (err) => {
            if (err) return console.log(err);
            success(
              `\✅ DICTIONARY: Pages created => ${__dirname}/dictionaries/pages.json\n`
            );
          }
        );
      });
    });
  });
};
onCreateLangSwitcherData();
