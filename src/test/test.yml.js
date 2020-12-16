
var colors = require('colors')
const fs = require('fs')
const {walk, load, empty, fail, success} = require("./_utils")

const metas = [
    {key: "slug", type: "string", mandatory: true},
    {key: "title", type: "string", mandatory: true},
    {key: "description", type: "string", length: 155},
    {key: "image", type: "string"},
    {key: "keywords", type: "string"},
    {key: "redirects", type: "array"}
]

walk(`${__dirname}/../data/`, async function (err, files) {
    if (err) fail("Error reding the YML files: ", err)
    const _files = files.filter(f =>
        (f.indexOf('.yml') > 1 || f.indexOf('.yaml') > 1) &&
        f.indexOf('additional-redirects.yml') === -1 &&
        f.indexOf('call-to-actions.yml') === -1
    )

    let slugs = {};
    for (let i = 0; i < _files.length; i++) {
        const _path = _files[i];
        const doc = load(_path);
        if (!doc.yaml) fail("Invalid YML syntax for " + _path)
        const testPath = __dirname + "/yml/" + doc.name + ".js";
        if (fs.existsSync(testPath)) {

            console.log(`Running tests for ${doc.name} yml file`.blue)
            const test = require(testPath);
            try {
                console.log(test);
                test(doc)
            }
            catch (error) {
                console.log(`Error on file: ${_path}`.red)
                fail(error.message || error)
            }
        }
    }
    success("All YML have correct syntax")
});     