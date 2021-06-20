
var colors = require('colors')
const {walk, loadMD, empty, fail, success} = require("./_utils")
const twitterUser = require('../utils/twitter')

const front_matter_fields = [
    {key: "slug", type: "string", mandatory: true},
    {key: "title", type: "string", mandatory: true},
    {key: "excerpt", type: "string", length: 160},
    {key: "image", type: "string"},
    {key: "image_alt", type: "string"},
    {key: "author", type: "string", mandatory: true},
]

walk(`${__dirname}/../data/blog`, async function (err, files) {
    if (err) fail("Error reading the Markdown files: ", err)
    const _files = files.filter(f =>
        (f.indexOf('.md') > 1 || f.indexOf('.md') > 1)
    )
    
    for (let i = 0; i < _files.length; i++) {
        const _path = _files[i];

        try {
            const content = loadMD(_path)
            const frontmatter = content.attributes
            const meta_keys = Object.keys(frontmatter)
            const autor_keys = Object.keys(twitterUser)            
            front_matter_fields.forEach((m) => {
                let authors_verifying = autor_keys.find(el => el === frontmatter["author"])
                if(!meta_keys.includes(m["key"])) fail(`Missing prop ${m["key"]} on frontmatter on ${_path}`)
                
                // Pretty log
                if(authors_verifying === undefined) fail(`${`\nProblem found in: ${_path}`.red}\n\n${`The author ${authors_verifying} not match with the username list:`.red} \n\n${autor_keys.map(el => `${el.green}\n`)} \n`)

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
    success("All Markdown's have correct syntax")
});     

// TODO: 1.- [x] locations have to match with any yml in the ./src/data/location.yml specifically the property breathecode_location_slug inside the yml.
// TODO: 2.- [x] utm_course has to match with any of the file names inside the ./src/data/course/ file names (ignoring language). For example: full-stack
// TODO: 3.- [x] Los nombres de archivo ./src/data/course deben coincidir con la propiedad bc_slug dentro de ellos

// TODO: 5.- [x]Las ubicaciones en ./src/data/location, la propiedad breathecode_location_slugtiene que coincidir con una de las ubicaciones de breathecode.
// TODO: 6.- [x] The author property in the blog post frontmatter has to match any of the ./src/utils/twitter.js usernames.


// TODO: 7.- [ ] Any YML must have a Spanish and English version unless is called "example.yml".
// TODO: 8.- [ ] Any relative image on any YML or Markdown (md) should match from its respective image file inside the static folder.
// TODO: 9.- [x] The image gallery for each location should have exactly 5 images.

//TODO: can't understand task 4
//TODO: 4.- [] Automations and tags have to match with their respective tags or automation coming from the API:

// TODO: 7.5hrs from now