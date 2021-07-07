
var colors = require('colors')
const path = require("path")
const {walk, loadMD, empty, fail, success, localizeImage} = require("./_utils")
const twitterUser = require('../utils/twitter')

const front_matter_fields = [
    {key: "slug", type: "string", mandatory: true},
    {key: "title", type: "string", mandatory: true},
    {key: "excerpt", type: "string", length: 160},
    {key: "image", type: "string"},
    {key: "image_alt", type: "string"},
    {key: "author", type: "string", mandatory: true},
]

const getLang = (fileAbsolutePath) => {
    const regex = /[\w-]*\/([\w-\]\[]*)\.?(\w{1,2})?\.md/gm;
    let m = regex.exec(fileAbsolutePath);
    if(!m) return false;
  
    return m[2];
  };

walk(`${__dirname}/../data/blog`, async function (err, files) {
    if (err) fail("Error reading the Markdown files: ", err)
    const _files = files.filter(f => {
        return path.extname(f) == ".md"
    })

    if(_files.length != files.length) fail("Only markdown files should be inside the ./data/blog directory, please fix the following: \n\n", files.filter(f => {
        return path.extname(f) != ".md"
    }).join("\n").red + "\n")


    for (let i = 0; i < _files.length; i++) {
        const _path = _files[i];

        try {
            const content = loadMD(_path)
            const frontmatter = content.attributes
            const meta_keys = Object.keys(frontmatter)
            const autor_keys = Object.keys(twitterUser)

            if(_path.includes(" ")) throw Error("File name cannot have white spaces only letters, numbers and -")

            const lang = getLang(_path);
            if(!lang) throw Error("Missing language information on file name, make sure it has the language info before the extension; For example: my-file.es.md")
            else if(lang === "en") throw Error(`Please use "us" instead of "en" for english language information on the file name; For example: my-file.us.md`)

            localizeImage(frontmatter.image, 'relative_images', _path, 'blog')

            front_matter_fields.forEach((m) => {
                let authors_verifying = autor_keys.find(el => el === frontmatter["author"])
                if(!meta_keys.includes(m["key"])) fail(`Missing prop ${m["key"]} on frontmatter on ${_path}`)
                
                // Pretty log
                if(authors_verifying === undefined) throw Error(`${`\nProblem found in: ${_path}`.red}\n\n${`Missing author on file, please make if match from this list:`.red} \n\n${autor_keys.map(el => `${el.green}\n`)} \n`)

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
            console.error(`Error on file: ${_path}`.red)
            fail(error.message || error)
        }
    }
    success("All Blog Markdown's have correct syntax")
});
