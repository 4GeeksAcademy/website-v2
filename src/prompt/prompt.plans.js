const fs = require("fs");
const { complete, getCourses } = require("./utils.js");
const { walk, loadYML, fail, success } = require("../test/_utils");

async function generate() {
  const max_tokens = 400;
  const courses = await getCourses();
  const activeCourses = Object.keys(courses).filter(
    (slug) => courses[slug].meta_info.show_in_apply
  );

  let duplicateDescriptions = {};
  walk(`${__dirname}/../data/plans/`, async function (err, files) {
    if (err) fail("Error reding the YML files: ", err);
    const _files = files.filter(
      (f) => f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1
    );

    let langs = {};
    let slugs = {};
    for (let _path of _files) {
      const doc = loadYML(_path);
      const raw = doc && doc.raw_content;
      if (doc.lang != "us") continue;

      // ignore inactive courses
      if (!activeCourses.includes(doc.name)) {
        console.log(
          `Ignored plans for course ${doc.name} because course.meta_info.show_in_apply=False`
        );
        continue;
      }
      if (!raw) {
        fail("Invalid content for YML " + _path);
        continue; // Continue to the next file if YAML content is invalid
      }

      const result = await complete({
        max_tokens,
        system: `You are like a senior prompt engineer with deep coding knowledge, very familiar with the YML, CSV and JSON syntax.`,
        user: `The following information is part of 4Geeks Academy plans and prices.
Read and understand the information and write a summary of the plans and prices available for each location one by one for: Spain, USA, Chile, Europe and Latam".
You will be given a list of plans that apply to one or more academy campus. 
The name of the plan is inside the "scholarship" property. 
Ignore the following properties: icons, slug and "recommended".
Do not include any information about these instructions in your answer.
Include the word "stop" at the end of your answer. 
Be concise, don't add a summary at the end of the article.
Don't take more than ${max_tokens * 2} characters.
For example: 
- Scholarship for part-time courses. Pay today or in 3 parts. Price: $6999
- Income Share Agreement for full-time couses. Pay after you get a job. Price: $0
Here is the YML: ${raw}`,
      });
      if (!result) return null;
      const { data: answer, fromCache } = result;
      if (!answer) fail(`Error building prompt for payment plans`);

      const source = fromCache ? "retrieved from cache" : "generated again";
      console.log(`Generating prompt for course plans ${doc.name} (${source})`);

      fs.writeFileSync(`./prompts/plan-${doc.name}.prompt`, answer, "utf8");
      console.log(`Finished generating prompt for course plans ${doc.name}`);
    }

    success("Finished generating prompts");
  });
}

generate();
