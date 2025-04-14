const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
dotenv.config();
const { walk, loadYML, fail } = require("../test/_utils");
const { complete } = require("../utils/complete");

const getCourses = () =>
  new Promise((resolve, reject) => {
    var courses = {};
    walk(`${__dirname}/../data/course`, function (err, files) {
      if (err) fail("Error reding the YML files: ", err);
      const _files = files.filter(
        (f) => f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1
      );

      for (let _path of _files) {
        const doc = loadYML(_path);
        //only english
        if (doc.lang == "us") {
          courses[doc.name] = { ...doc.yaml, raw: doc.raw };
        }
      }
      resolve(courses);
    });
  });

const getLocations = () =>
  new Promise((resolve, reject) => {
    let locations = {};
    walk(`${__dirname}/../data/location`, async function (err, files) {
      if (err) fail("Error reding the YML files: ", err);
      const _files = files.filter(
        (f) => f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1
      );

      for (let _path of _files) {
        const doc = loadYML(_path);
        //only english
        if (doc.lang != "us") continue;
        if (["europe", "online"].includes(doc.name)) continue;
        locations[doc.name] = { ...doc.yaml, raw: doc.raw };
      }
      resolve(locations);
    });
  });

const getUpcomingDates = async () => {
  const response = await axios.get(
    `https://breathecode.herokuapp.com/v1/admissions/cohort/all?upcoming=true&never_ends=false&sort=kickoff_date&academy=orlando,europe,sanjose-uruguay,costa-rica,online,madrid-spain,santiago-chile,downtown-miami,caracas-venezuela&limit=100`
  );
  const dates = response.data.results;
  const datesByProgram = {};

  for (let _d of dates) {
    if (!_d.syllabus_version || !_d.syllabus_version?.name) continue;

    if (datesByProgram[_d.syllabus_version.name] == undefined)
      datesByProgram[_d.syllabus_version.name] = [];

    datesByProgram[_d.syllabus_version.name].push({
      kickoff: _d.kickoff_date,
      timezone: _d.timezone,
      schedule: _d.schedule?.name || null,
    });
  }

  return datesByProgram;
};
module.exports = { complete, getLocations, getCourses, getUpcomingDates };
