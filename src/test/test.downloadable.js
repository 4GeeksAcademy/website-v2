const fetch = require('node-fetch');
const { walk, loadYML, empty, fail, success, localizeImage } = require('./_utils');
const front_matter_fields = [
  { key: 'utm_course', type: 'array', mandatory: true },
  { key: 'utm_location', type: 'string', mandatory: true },
  { key: 'current_download', type: 'string', mandatory: true },
];

walk(`${__dirname}/../data/downloadable`, async (err, files) => {
  console.log("\nScanning downloadables...")
  err && fail('Error reading the YAML files: ', err);
  files.forEach((_path) => {
      const doc = loadYML(_path);
      if (!doc || !doc.yaml) fail('Invalid YML syntax for ' + _path);
    });

  let courses = [
    "full-stack-ft",
    "full-stack",
    "software-engineering",
    "machine-learning"
  ];

  const _files = files.filter(
    (f) =>
      (f.indexOf('.yml') > 1 || f.indexOf('.yaml') > 1) &&
      f.indexOf('additional-redirects.yml') === -1 &&
      f.indexOf('call-to-actions.yml') === -1
  );

  for (let i = 0; i < _files.length; i++) {
    const _path = _files[i];
    const doc = loadYML(_path);
    if (!doc.yaml) fail('Invalid YML syntax for ' + _path);
    if (!doc.lang) fail('Missing language on yml file name for ' + _path);

    let meta_info_image = doc.yaml.meta_info.image
    let header_image = doc.yaml.header_data.image

    localizeImage(header_image, 'relative_images', _path, '.')
    localizeImage(meta_info_image, 'relative_images', _path, 'bg')

    try {
      const data = doc.yaml
      const meta_keys = Object.keys(data.meta_info)
      const current_download = data.meta_info.current_download

      const resp = await fetch(`https://breathecode-test.herokuapp.com/v1/marketing/downloadable`);
      const downloadables = await resp.json()
      const scanResult = downloadables.some(el => el.slug === current_download)
      if(scanResult === false) {
        console.log("The list of downloadables available is:".green, downloadables.map(el => el.slug))
        fail(`${`\nProblem found in: ${_path}`.red}\n\n${`Property current_download with value ${`${current_download}`.yellow} ${`not found in the downloadables list`.red}`.red}\n\n`)
      }

      

      front_matter_fields.forEach(obj => {
        let utm_course = data.meta_info.utm_course

        let verifying = courses.some(el => utm_course.includes(el))

        if(!meta_keys.includes(obj["key"])) fail(`Missing prop ${obj["key"]} from course on ${_path}`)
        if( verifying === false ) fail(`${`\nProblem found in: ${_path}`.red}\n\n${`utm_course ${`${utm_course}`.yellow} ${`not match with the utm_course list:`.red}`.red} \n\n${courses.map(el => `${el.green}\n`)} \n`)
        if(Array.isArray(utm_course) !== true) fail(`\n${`utm_course`.yellow} ${`expected an array in ${_path}`.red}\n`)
      })
    } catch (error) {
      console.error(`Error on file: ${_path}`.red);
      fail(error.message || error);
    }
  }
  success("All Downloadables yml have correct properties");
});
