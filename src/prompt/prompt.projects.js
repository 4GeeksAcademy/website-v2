const fs = require("fs");
const { toYML, loadYML } = require("../test/_utils");

async function generate() {
  const max_tokens = 400;
  console.log(`Starting to generate a prompt for all the academy awards`);

  const doc = loadYML(
    `${__dirname}/../data/components/alumni_projects/alumni_projects.us.yaml`
  );
  let projects = doc.yaml.projects.map((old) => {
    let _new = [
      `Project name: ${old.project_name}`,
      `Description: ${old.project_content.replace(/(\r\n|\n|\r)/gm, "")}`,
      `Video demonstration: ${old.project_video}`,
      `Github URL: ${old.github_repo}`,
      `Live URL: ${old.live_link}`,
      `Buit by: ${old.alumni
        .map((a) => `${a.first_name} ${a.last_name}`)
        .join(" and ")} during the ${old.course} bootcamp`,
    ];
    // if(old.linkedin_url) _new.push(`LinkedIn profile URL: ${old.linkedin_url}`);
    return _new.join("\n");
  });

  fs.writeFileSync(
    `./prompts/projects.prompt`,
    [
      `The following are capstone projects built by our students during our bootcamps:`,
      projects.join("\n\n---\n\n"),
      ``,
    ].join("\n\n"),
    "utf8"
  );
  console.log(`Finished generating awards.`);
}
generate();
