var colors = require('colors')
const {walk, loadYML, empty, fail, success} = require("./_utils")

const metas = [ 
    { key: "slug", type: "string", mandatory: true }, 
    { key: "title", type: "string", mandatory: true }, 
    { key: "description", type: "string", length: 160}, 
    { key: "image",  type: "string"}, 
    { key: "keywords",  type: "string"},
    { key: "redirects",  type: "array"}
]

walk(`${__dirname}/../data/`, function(err, files) {
    if (err) fail("Error reding the YML files: ", err)
    const _files = files.filter(f => 
        (f.indexOf('.yml') > 1 || f.indexOf('.yaml') > 1)&&
        f.indexOf('additional-redirects.yml') === -1 &&
        f.indexOf('/components/') === -1 && // ignore components
        f.indexOf('call-to-actions.yml') === -1
    )

    let slugs = {};
    _files.forEach(_path => {
        const doc = loadYML(_path);
        const yml = doc.yaml;
        if(!yml) fail("Invalid YML syntax for "+_path)
        else if(empty(yml.meta_info)) fail("Missing meta for "+_path, yml.meta_info)
        else{
            
            // look for duplicated slugs
            if(slugs[yml.meta_info.slug] !== undefined) fail(`Duplicate or invalid slug ${yml.meta_info.slug} on file ${_path}`)
            else slugs[yml.meta_info.slug] = yml.meta_info

            const meta_keys = Object.keys(yml.meta_info)
            metas.forEach(m => {
                if(!meta_keys.includes(m["key"])) fail(`Missing prop ${m["key"]} on metakeys on ${_path}`)
                else{
                    if(m["type"] === "array"){

                        if(m["mandatory"] === true && (!yml.meta_info[m["key"]] || yml.meta_info[m["key"]] === "null")) fail(`Invalid mandatory prop ${m["key"]} on ${_path} expected ${m["type"]} got ${yml.meta_info[m["key"]]}`)
                        else if(m["mandatory"] !== true && yml.meta_info[m["key"]] !== null && yml.meta_info[m["key"]] !== "null" && !Array.isArray(yml.meta_info[m["key"]])) fail(`Invalid array ${m["key"]} got "${yml.meta_info[m["key"]]}" on ${_path} `)
                    } 
                    else if(typeof yml.meta_info[m["key"]] !== m["type"]){
                        if(typeof m["mandatory"] !== "undefined") fail(`Invalid mandatory prop ${m["key"]} on ${_path} expected ${m["type"]} got ${yml.meta_info[m["key"]]}`) 
                        else if(yml.meta_info[m["key"]] && yml.meta_info[m["key"]] !== "null") fail(`Invalid optional prop ${m["key"]} on ${_path} expected ${m["type"]} got ${yml.meta_info[m["key"]]}`)
                    } 
                    else{
                        if(typeof m["length"] !== "undefined" && yml.meta_info[m["key"]].length > m["length"]) fail(`Length of ${m["key"]} should be no more than ${m["length"]} (${yml.meta_info[m["key"]].length}) in ${_path}`)
                    }
                } 
            });
        }
    });
    success("All content is OK!")
});
