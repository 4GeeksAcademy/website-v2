const fs = require("fs");
const { toYML, loadYML } = require("../test/_utils");

async function generate() {
  const max_tokens = 400;
  console.log(`Starting to generate a prompt for all the academy awards`);

  const doc = loadYML(`${__dirname}/../data/page/awards.us.yml`);
  let awards = doc.yaml.awards_list.map((old) => {
    let _new = [
      `Award title: ${old.title}`,
      `Description of the award: as ${old.paragraph}`,
    ];
    // if(old.linkedin_url) _new.push(`LinkedIn profile URL: ${old.linkedin_url}`);
    return _new.join("\n");
  });

  fs.writeFileSync(
    `./prompts/awards.prompt`,
    [
      `The following are awards and recognitions 4Geeks Academy has received thru the years:`,
      awards.join("\n\n---\n\n"),
      `You can learn more about the awards here: https://4geeksacademy.com/us/${doc.yaml.meta_info.slug}`,
    ].join("\n\n"),
    "utf8"
  );
  console.log(`Finished generating awards.`);
}
generate();
