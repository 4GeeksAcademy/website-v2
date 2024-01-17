const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const { walk, loadYML, fail } = require("../test/_utils");

// Define the function to call the OpenAI API with an authorization token
async function complete({ system, user, model, max_tokens }) {
  try {
    // Define the OpenAI API endpoint URL
    // gpt-3.5-turbo-16k, gpt-3.5-turbo-instruct
    if (model == undefined) model = "gpt-3.5-turbo-16k";
    const is_chat = !model.includes("instruct");

    let apiUrl = "https://api.openai.com/v1/completions";
    if (is_chat) apiUrl = "https://api.openai.com/v1/chat/completions";

    // Define the headers with the authorization token
    const headers = {
      Authorization: `Bearer ${process.env.GATSBY_OPENAI_KEY}`, // Include the OpenAI token in the "Bearer" format
      "Content-Type": "application/json", // Set the content type
    };

    // Define the data to send to the OpenAI API

    let requestData = {
      model,
      max_tokens, // Set the maximum number of tokens in the response as needed
    };

    if (is_chat) {
      requestData.messages = [
        {
          role: "system",
          content: system,
        },
        {
          role: "user",
          content: user,
        },
      ];
    } else {
      requestData.prompt = `${system} \n ${user}`;
    }

    // Make an API request to the OpenAI API
    const response = await axios.post(apiUrl, requestData, { headers });

    // Process the OpenAI API response here
    const interpretedContent = is_chat
      ? response.data.choices[0].message.content
      : response.data.choices[0].text; // Extract interpreted content

    // Return the interpreted content
    return interpretedContent;
  } catch (error) {
    console.error("OpenAI API Request Error:", error.toString());
  }
}

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
  
  const response = await axios.get(`https://breathecode.herokuapp.com/v1/admissions/cohort/all?upcoming=true&never_ends=false&sort=kickoff_date&academy=orlando,europe,sanjose-uruguay,costa-rica,online,madrid-spain,santiago-chile,downtown-miami,caracas-venezuela&limit=100`);
  const dates = response.data.results;
  const datesByProgram = {};

  for(let _d of dates){

    if(!_d.syllabus_version || !_d.syllabus_version?.name) continue;

    if(datesByProgram[_d.syllabus_version.name] == undefined) datesByProgram[_d.syllabus_version.name] = []

    datesByProgram[_d.syllabus_version.name].push({
      kickoff: _d.kickoff_date,
      timezone: _d.timezone,
      schedule: _d.schedule?.name || null,
    })
  }

  return datesByProgram;

}
module.exports = { complete, getLocations, getCourses, getUpcomingDates };
