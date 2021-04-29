
var colors = require('colors')
const fs = require('fs')
const fm = require('front-matter')
const {walk, loadMD, empty, fail, success} = require("./_utils")

const front_matter_fields = [
    {key: "slug", type: "string", mandatory: true},
    {key: "title", type: "string", mandatory: true},
    {key: "excerpt", type: "string", length: 156},
    {key: "image", type: "string"},
    {key: "author", type: "string"},
]

walk(`${__dirname}/../data/blog`, async function (err, files) {
    if (err) fail("Error reading the Markdown files: ", err)
    const _files = files.filter(f =>
        (f.indexOf('.md') > 1 || f.indexOf('.md') > 1)
    )

    let slugs = {};
    for (let i = 0; i < _files.length; i++) {
        const _path = _files[i];
        try {
            const content = loadMD(_path)
            console.log("cadasdasdasdasdadadadsads", content)
            const frontmatter = content.attributes
            // if (!doc.yaml) fail("Invalid YML syntax for " + _path)
            // if (!doc.lang) fail("Missing language on yml file name for " + _path)

            const meta_keys = Object.keys(frontmatter)
            front_matter_fields.forEach(m => {
                if(!meta_keys.includes(m["key"])) fail(`Missing prop ${m["key"]} on frontmatter on ${_path}`)
                else{
                    if(m["type"] === "array"){
                        if(m["mandatory"] === true && (!frontmatter[m["key"]] || frontmatter[m["key"]] === "null")) fail(`Invalid mandatory prop ${m["key"]} on ${_path} expected ${m["type"]} got ${frontmatter[m["key"]]}`)
                        else if(m["mandatory"] !== true && frontmatter[m["key"]] !== null && frontmatter[m["key"]] !== "null" && !Array.isArray(frontmatter[m["key"]])) fail(`Invalid array ${m["key"]} got "${frontmatter[m["key"]]}" on ${_path} `)
                    } 
                    else if(typeof frontmatter[m["key"]] !== m["type"]){
                        if(typeof m["mandatory"] !== "undefined") fail(`Invalid mandatory prop ${m["key"]} on ${_path} expected ${m["type"]} got ${frontmatter[m["key"]]}`) 
                        else if(frontmatter[m["key"]] && frontmatter[m["key"]] !== "null") fail(`Invalid optional prop ${m["key"]} on ${_path} expected ${m["type"]} got ${frontmatter[m["key"]]}`)
                    } 
                    else{
                        if(typeof m["length"] !== "undefined" && frontmatter[m["key"]].length > m["length"]) fail(`Length of ${m["key"]} should be no more than ${m["length"]} (${frontmatter[m["key"]].length}) in ${_path}`)
                    }
                } 
            });
        }
        catch (error) {
            console.log(`Error on file: ${_path}`.red)
            fail(error.message || error)
        }
    }
    success("All Markdown's have correct syntax")
});     