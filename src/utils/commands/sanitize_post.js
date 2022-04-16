const { walk, indexContent, updateFrontMatter, sanitize } = require("../files");

module.exports = {
  args: {
    // Types
    "--slug": String,
    // '--version': Boolean,
    // '--verbose': arg.COUNT,   // Counts the number of times --verbose is passed
    // '--port':    Number,      // --port <number> or --port=<number>
    // '--name':    String,      // --name <string> or --name=<string>
    // '--tag':     [String],    // --tag <string> or --tag=<string>
  },
  defaults: {
    "--slug": null,
  },
  run: (args) => {
    walk("src/data/blog", function (err, results) {
      if (err) {
        console.log("Error scanning lesson files".red);
        process.exit(1);
      }

      try {
        const result = indexContent(results);
        console.log(result);
        if (args["--slug"] !== "all") {
          const post = result.posts.find(
            (l) => l.originalSlug === args["--slug"]
          );
          if (posts) updateFrontMatter(post, sanitize(post));
          else console.log(`Post ${args["--slug"]} not found`, post);
        } else {
          result.posts.forEach((post) => {
            updateFrontMatter(post, sanitize(post));
          });
        }
        process.exit(0);
      } catch (error) {
        console.log("Error", error);
        process.exit(1);
      }
    });
  },
};
