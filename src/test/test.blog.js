
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
        try {
            const content = loadMD(_path)
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