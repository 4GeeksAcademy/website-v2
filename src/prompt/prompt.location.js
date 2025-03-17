const fs = require("fs");
const { complete, getLocations } = require("./utils.js");
const { toYML } = require("../test/_utils");

async function generate() {
  console.log(
    `Starting to generate a prompt for all the academy campus and descriptions`
  );
  let allLocationsPrompts = "";
  const max_tokens = 250;
  const locations = await getLocations();
  const allSlugs = Object.keys(locations);
  let campuses = {};
  for (let locationSlug of allSlugs) {
    const old = locations[locationSlug];
    campuses[locationSlug] = {};
    campuses[locationSlug].region = old.meta_info.region;
    campuses[locationSlug].available_modes = old.header.sub_header_highlighted;
    campuses[locationSlug].phone_number = old.info_box.phone;
    campuses[locationSlug].contact_email = old.meta_info.email;
    campuses[locationSlug].relevant_information = old.images_box.content;
    campuses[locationSlug].city = old.city;
    campuses[locationSlug].country = old.country;
    campuses[
      locationSlug
    ].website = `https://4geeksacademy.com/us/coding-campus/${old.meta_info.slug}`;
    campuses[locationSlug].social_media_urls = old.socials?.map((s) => ({
      network: s.name,
      url: s.link,
    }));

    const raw = toYML(campuses[locationSlug]);

    console.log(`Generating summary for campus ${locationSlug}.`);
    const result = await complete({
      max_tokens,
      system: `You are like a senior prompt engineer with deep coding knowledge, very familiar with the YML, CSV and JSON syntax.`,
      user: `The followings are the details about 4Geeks Academy ${
        old.city
      }, ${old.country},
Read and understand the information and write a summary of the campus.
Do not include any information about these instructions in your answer.
Start your summary with the location city and country, available modes, contact information, social media, address and relevant information.
Include the website url for more information about that campus.
Be concise, do not speak about the city in general, keep your focus on the campus offer.
Don't take more than ${max_tokens * 2} characters.
Here is the YML: ${raw}`,
    });

    if(!result) return null;
    const { data: answer, fromCache } = result;
    if (!answer) fail(`Error building prompt for campus ${locationSlug}`);

    const source = fromCache ? "retrieved from cache" : "generated again";
    console.log(`Generating prompt for campus ${locationSlug} (${source})`);

    allLocationsPrompts += `\n\nNext campus: ${answer}`;
  }
  fs.writeFileSync(
    `./prompts/locations.prompt`,
    "4Geeks Academy is available in the following locations:" +
      allLocationsPrompts,
    "utf8"
  );
  console.log(`Finished generating campus information prompt.`);
}

generate();