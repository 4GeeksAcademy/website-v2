const fs = require("fs");
const { walk, loadYML, fail, success, loadMD } = require("../test/_utils");

const onCreateRedirectsData = () => {
  console.log("🔧 Creating Dictionary of Redirects...");
  let redirectsDict = [];

  //NOTE: ----------------- PAGE REDIRECTS -----------------
  walk(`${__dirname}/../data/page`, (err, files) => {
    if (err) fail("Error reding the Page files: ", err);
    const _files = files.filter(
      (f) =>
        (f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1) &&
        f.indexOf("test.us.yml") === -1
    );
    for (let i = 0; i < _files.length; i++) {
      const _path = _files[i];
      const doc = loadYML(_path);
      const redirects = doc.yaml.meta_info.redirects;
      redirectsDict.push(...redirects);
    }

    //NOTE: ----------------- COURSE REDIRECTS -----------------
    walk(`${__dirname}/../data/course`, (err, files) => {
      if (err) fail("Error reding the COURSE files: ", err);
      for (let i = 0; i < files.length; i++) {
        const _path = files[i];
        const doc = loadYML(_path);
        const redirects = doc.yaml.meta_info.redirects;
        redirectsDict.push(...redirects);
      }

      //NOTE: ----------------- LANDING REDIRECTS -----------------
      walk(`${__dirname}/../data/landing`, (err, files) => {
        if (err) fail("Error reding the Landing files: ", err);
        const _files = files.filter(
          (f) =>
            (f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1) &&
            f.indexOf("template.us.yml") === -1
        );
        for (let i = 0; i < _files.length; i++) {
          const _path = _files[i];
          const doc = loadYML(_path);
          const redirects = doc.yaml.meta_info.redirects;
          redirectsDict.push(...redirects);
        }

        //NOTE: ----------------- JOB REDIRECTS -----------------
        walk(`${__dirname}/../data/job`, (err, files) => {
          if (err) fail("Error reding the COURSE files: ", err);
          for (let i = 0; i < files.length; i++) {
            const _path = files[i];
            const doc = loadYML(_path);
            const redirects = doc.yaml.meta_info.redirects;
            redirectsDict.push(...redirects);
          }

          //NOTE: ----------------- LOCATION REDIRECTS -----------------
          walk(`${__dirname}/../data/location`, (err, files) => {
            if (err) fail("Error reding the location files: ", err);
            for (let i = 0; i < files.length; i++) {
              const _path = files[i];
              const doc = loadYML(_path);
              const redirects = doc.yaml.meta_info.redirects;
              redirectsDict.push(...redirects);
            }
            const reducedRedirects = redirectsDict.filter(
              (item, index) => redirectsDict.indexOf(item) === index
            );

            fs.writeFile(
              `${__dirname}/dictionaries/redirects.json`,
              JSON.stringify(reducedRedirects),
              (err) => {
                if (err) return console.log(err);
                success(
                  `\✅ DICTIONARY: Redirects created => ${__dirname}/dictionaries/redirects.json\n`
                );
              }
            );
          });
        });
      });
    });
  });
};
onCreateRedirectsData();
