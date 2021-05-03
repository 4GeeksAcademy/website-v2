
var colors = require('colors')
const fs = require('fs')
const fm = require('front-matter')
const {walk, loadMD, empty, fail, success} = require("./_utils")

const metas = [
    {key: "slug", type: "string", mandatory: true},
    {key: "title", type: "string", mandatory: true},
    {key: "description", type: "string", length: 155},
    {key: "image", type: "string"},
    {key: "keywords", type: "string"},
    {key: "redirects", type: "array"}
]

walk(`${__dirname}/../data/blog`, async function (err, files) {
    if (err) fail("Error reading the Markdown files: ", err)
    const _files = files.filter(f =>
        (f.indexOf('.md') > 1 || f.indexOf('.md') > 1)
    )

    let slugs = {};
    
    for (let i = 0; i < _files.length; i++) {
        const _path = _files[i];
        const content = loadMD(_path)
        const attrib = content.attributes
        
        // 1
        if(!content.frontmatter) fail("Post must have a frontmatter in", _path)

        // 2
        // It takes care that image and alt_image exist (even without returning something)
        if(attrib.image === void 0) fail(`Post must have image in`, _path)
        if(attrib.image_alt === void 0) fail(`Post must have image_alt in`, _path)
        // console.log(`POST_SLUG: ${attrib.slug}, \nIMAGE_PATH: ${attrib.image}, \nIMAGE_ALT: ${attrib.image_alt} \n\n`)
        

        // 3
        if(!attrib.author) fail("Author is necessary in", _path)
        // // console.log(`POST_SLUG: ${attrib.slug}, \nAUTHOR: ${attrib.author} \n\n`)
        
        
        // // 4
        if(attrib.avatar || attrib.avatar !== void 0) fail("Avatar property is obsolete, must be removed", _path)
        // console.log(`${attrib?.avatar ? `__must be removed ❌__ \nAVATAR: ${attrib?.avatar}` : "AVATAR: removed ✅"}, \nPOST_SLUG: ${attrib.slug} \n\n`)

        // // 5
        if(!attrib.slug) fail("Post needs a slug in", _path)
        // console.log(`POST_SLUG: ${attrib.slug}\n\n`)

        // 6
        // Falta Informacion
        // blog no debe tener un h1 encabezado porque ya se creará automáticamente.

        try {
            content

            // if (!doc.yaml) fail("Invalid YML syntax for " + _path)
            // if (!doc.lang) fail("Missing language on yml file name for " + _path)
        }
        catch (error) {
            console.log(`Error on file: ${_path}`.red)
            fail(error.message || error)
        }
    }
    success("All Markdown's have correct syntax")
});     