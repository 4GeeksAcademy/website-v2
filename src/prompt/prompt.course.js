const fs = require("fs");
const { complete, getCourses } = require("./utils.js");
const { toYML } = require("../test/_utils");

async function generate() {
  console.log(
    `Starting to generate a prompt for all the academy course offerings`
  );
  const max_tokens = 400;
  const courses = await getCourses();
  const activeCourses = Object.keys(courses).filter(
    (slug) => courses[slug].meta_info.show_in_apply
  );
  for (let courseSlug of activeCourses) {
    console.log(`Summarizing prompt information for program: ${courseSlug}`);
    const old = courses[courseSlug];
    const course = {};
    course.title = old.meta_info.title;
    course.description = old.meta_info.description;
    course.website = `https://4geeksacademy.com/us/coding-bootcamps/${old.meta_info.slug}`;
    course.highlight = old.header.paragraph;
    course.instructors = old.course_instructors.instructors;
    course.about = old.details.about;
    course.details = old.details.list;
    course.duration = `${old.weeks} ${old.weeks_label}`;
    course.modules = old.details_modules;
    const raw = toYML(course);

    const result = await complete({
      max_tokens,
      system: `You are like a senior prompt engineer with deep coding knowledge, very familiar with the YML, CSV and JSON syntax.`,
      user: `The following information is part of 4Geeks Academy courses and bootcamps.
Read and understand the information and write a summary of the courses available.
Do not include any information about these instructions in your answer.
Include the word "stop" at the end of your answer. 
Include the website url for more information.
Be concise, don't add a summary at the end of the article.
Don't take more than ${max_tokens * 2} characters.
Here is the YML: ${raw}`,
    });
    if(!result) return null;
    const { data: answer, fromCache } = result;
    if (!answer) fail(`Error building prompt for courses plans`);

    const source = fromCache ? "retrieved from cache" : "generated again";
    console.log(`Generating prompt for course plans ${courseSlug} (${source})`);

    fs.writeFileSync(`./prompts/${courseSlug}.prompt`, answer, "utf8");
    console.log(`Finished summarizing program: ${courseSlug}`);
  }
}

generate();