const fs = require("fs");
const { getUpcomingDates } = require("./utils.js");

function formatCohortDates(cohorts) {
  let output = "The following are 4Geeks Academy upcoming cohort dates:\n";

  for (const syllabus in cohorts) {
    output += `For the program and syllabus: ${syllabus} we have the following upcoming dates:\n`;

    for (const session of cohorts[syllabus]) {
      const kickoffDate = new Date(session.kickoff).toLocaleDateString(
        "en-US",
        { timeZone: session.timezone }
      );
      output += `- Starting on ${kickoffDate} on ${session.timezone} timezone and ${session.schedule} schedule.\n`;
    }
  }

  return output;
}

async function generate() {
  const _dates = await getUpcomingDates();

  console.log(`Generating prompt for upcoming dates`);
  fs.writeFileSync(`./prompts/dates.prompt`, formatCohortDates(_dates), "utf8");
}

generate();
