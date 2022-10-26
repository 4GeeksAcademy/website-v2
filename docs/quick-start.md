---
video_tutorial: https://www.loom.com/share/f9fb5eb0361f4a9dbabe93bff2baeb36
---

# Table of contents

1. Technologies
2. Installation
3. Website Structure:  
  3.1. Data.  
  3.2. Pages.  
  3.3. Styling.  
  3.4. Components.  
4. Data and Translations
5. Configuration.  
  5.1. gatsby-node.js.  
  5.2. gatsby-browser.js.  

## Technologies

Please make sure you are familiar with these technologies:

Gatsby: The website is built using [gatsby](https://www.gatsbyjs.com/), strongly recomended to do the gatsby quick-start if you haven't work with it already.
Styled Components: Instead of CSS we decided to use StyledComponent and we are really happy so far, please get familiar with it.

> Sidenote: 4Geeks.com API: We are also connecting to the 4Geeks.com APi to retrieve the latest academy events and upcoming cohorts.

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

### Pages

The pages folder is almost empty because any page that needs translation will be be considered a "template" and it will be inside the `./src/templates` directory.

### Styling

We use [Styled Components](https://styled-components.com/) for the entire website styling, no bootstrap, nothing else. I you are not familizar please take some time to understand how styled components work, these are the main folders you need to understand for styling:

- Sections: Contains the Row, Column, Div and other mayor boxes used for the grid system.
- Headings: Title, Paragraph, H1, H2, etc.
- Styling: Other very common styling components like the Anchor, Tooltip, Styled Image, etc.

All the other folders are separate componentes reused thoughout the website, each of those components has its own styles using styled components.

### Components

The `./src/components` folder contains most of the website code, everything is split into components that are heavily re-used on each `./src/template`.

## Data and Translations

The website is multilangual, any file inside the `./src/data` probably needs a translation and you can see which language it has based on the file name:
```
🇪🇸 Spanish: ./src/data/pages/about-us.es.yml
🇺🇸 English Version: ./src/data/pages/about-us.us.yml
```

The YMLs contain inside a list of all the strings used on each template, for example, this is just one small part of one of those YML files for a location:

```yml
meta_info:
  slug: "downtown-miami-usa"
  position: 1
  title: "4Geeks Academy Miami - Bootcamp de programación en Miami, aprende a programar en Miami"
  description: "null"
  image: ""
  keywords: "null"
  redirects: []

seo_title: "Bootcamp de Programación en Miami"
header:
  tagline: "4GEEKS ACADEMY IN MIAMI"
  paragraph: "Miami is una de las ciudades de mayor crecimiento tecnólogico, únete al Bootcamp de Programación part-time numero uno de la ciudad y la mayor comunidad de desarrolladores. \\n El Career Support y Student Support es de por vida."
  image: "../../../static/images/locations/miami-loc.jpg"
  alt: ""
```

Normally each file starts with a "meta_info" section that describes SEO information like URL, title, description, etc. The `redirects` property is also very importnat because it specifies alternative website paths for the same content.
