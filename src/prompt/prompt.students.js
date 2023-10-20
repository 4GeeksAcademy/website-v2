const fs = require("fs");
const { toYML, loadYML } = require("../test/_utils");

async function generate() {
  const max_tokens = 400;
  console.log(
    `Starting to generate a prompt for all the academy campus and descriptions`
  );

  const doc = loadYML(
    `${__dirname}/../data/components/testimonials/testimonials.us.yaml`
  );
  let testimonials = doc.yaml.testimonials.map((old) => {
    let _new = [`Name: ${old.student_name}`, `Hired as ${old.short_content}`];
    if (old.linkedin_url)
      _new.push(`LinkedIn profile URL: ${old.linkedin_url}`);
    if (old.country) _new.push(`Studied in the ${old.country.name} campus`);
    if (old.student_video) _new.push(`Video testimonial: ${old.student_video}`);
    if (old.content)
      _new.push(
        `Written testimonial: ${old.content}`.replace(/(\r\n|\n|\r)/gm, "")
      );
    return _new.join("\n");
  });

  const doc2 = loadYML(
    `${__dirname}/../data/components/alumni_projects/alumni_projects.us.yaml`
  );
  let alumni_form_projects = doc2.yaml.projects
    .reduce(
      (prev, current) =>
        prev.concat(
          ...current.alumni.map((al) => ({
            ...al,
            student_video: current.project_video,
          }))
        ),
      []
    )
    .map((old) => {
      let _new = [
        `Name: ${old.first_name} ${old.last_name}`,
        `Became a ${old.job_title} after the bootcamp`,
      ];
      if (old.linkedin && old.linkedin != "")
        _new.push(`LinkedIn profile URL: ${old.linkedin}`);
      if (old.github && old.github != "")
        _new.push(`Github profile URL: ${old.github}`);
      if (old.twitter && old.twitter != "")
        _new.push(`Twitter profile URL: ${old.twitter}`);
      if (old.student_video && old.student_video != "")
        _new.push(`Video testimonial: ${old.student_video}`);
      return _new.join("\n");
    });

  fs.writeFileSync(
    `./prompts/students.prompt`,
    `The following are 4Geeks Academy students:\n` +
      testimonials.concat(alumni_form_projects).join("\n\n---\n\n"),
    "utf8"
  );
  console.log(`Finished generating testimonials.`);
}
generate();
