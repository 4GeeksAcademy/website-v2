#!/usr/bin/env bash

node --experimental-modules ./src/test/test.yml.js && 
node ./src/test/test.seo.js && 
node ./src/test/test.plans.js && 
node ./src/test/test.course.js && 
node ./src/test/test.landing.js && 
node ./src/test/test.location.js && 
node ./src/test/test.downloadable.js &&
node ./src/test/test.cluster.js &&
true