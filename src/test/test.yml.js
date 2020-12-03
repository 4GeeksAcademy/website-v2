var colors = require('colors')
const {walk, load, empty, fail, success} = require("./_utils")

const metas = [
    {key: "slug", type: "string", mandatory: true},
    {key: "title", type: "string", mandatory: true},
    {key: "description", type: "string", length: 155},
    {key: "image", type: "string"},
    {key: "keywords", type: "string"},
    {key: "redirects", type: "array"}
]

walk(`${__dirname}/../data/`, function (err, files) {
    if (err) fail("Error reding the YML files: ", err)
    const _files = files.filter(f =>
        (f.indexOf('.yml') > 1 || f.indexOf('.yaml') > 1) &&
        f.indexOf('additional-redirects.yml') === -1 &&
        f.indexOf('call-to-actions.yml') === -1
    )

    let slugs = {};
    _files.forEach(_path => {
        const yml = load(_path);
        console.log(yml.staff)
        if (!yml) fail("Invalid YML syntax for " + _path)
    });
    success("All YML have correct syntax")
});