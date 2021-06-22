
var colors = require('colors')
const {walk, loadMD, empty, fail, success, findInFile, localizeImage} = require("./_utils")
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
            let extensions = [
                'png',
                'jpg',
            ]

            // let type_path = [
            //     'relative_images',
            //     'url'
            // ]
            localizeImage(frontmatter.image, 'relative_images', extensions, _path, 'blog')

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
// TODO: 8.- [ ] Any relative image on any YML or Markdown (md) should match from its respective image file inside the static folder.

//TODO: 4.- [] Automations and tags have to match with their respective tags or automation coming from the API:
