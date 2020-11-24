

# Table of contents

1. Technologies
2. Installation
3. Project structure
  3.1. gatsby-node.js
  3.2. gatsby-browser.js
4. Organizing the components
5. Organizing the YMLs

## Technologies

Please make sure you are familiar with these technologies:

Gatsby: The website is built using [gatsby](https://www.gatsbyjs.com/), strongly recomended to do the gatsby quick-start if you haven't work with it already.
Styled Components: Instead of CSS we decided to use StyledComponent and we are really happy so far, please get familiar with it.

> Sidenote: BreatheCode API: We are also connecting to the breathecode APi to retrieve the latest academy events and upcoming cohorts.

## Installation

Since we are using Gatsby the installation procedure is pretty much the same, `$ npm install` and `$ npm run start` will probally be enough to get you going.

## Project structure

We share the same basic folder structure than gatsby with one big difference: In gatsby all the pages are inside the `./src/pages` directory but here most of the pages are inside the `./src/templates` director.

There reason for that, is because we implemented our own language translation system, and all pages are used at least twice: One time for each translation.

The template: `template/apply.js` is used to generate the HTML for: 
1. 🇺🇸 4geeksacademy.com/apply
2. 🇪🇸 4geeksacademy.com/aplica

### Data (./src/data)

This website has no database, all the data is hosted inside the `./src/data` directory mostly inside `yml` files, for example:

| Template                      | Language  | Data                                     | URL                                 |
| -------------------------     | --------- | -----------------------------            | ----------------------------------- |
| ./src/templates/apply.js      | 🇺🇸        | ./src/data/pages/apply.en.yml            | 4geeks.com/en/apply                  |
| ./src/templates/apply.js      | 🇪🇸        | ./src/data/pages/apply.es.yml            | 4geeks.com/aplica                    |
| ./src/templates/landing_a.js  | 🇺🇸        | ./src/data/landings/learn-to-code.us.yml | 4geeks.com/us/landing/learn-to-code  |
| ./src/templates/location.js   | 🇪🇸        | ./src/data/locations/santiago.es.yml     | 4geeks.com/us/landing/learn-to-code  |

> We've built [this amazing tool](https://dev.4geeksacademy.co/?edit) to help you identify what parts of the website are in which YML

Pages

The pages folder is almost empty because any page that needs translation will be be considered a "template" and it will be inside the `./src/templates` directory.

Styling

