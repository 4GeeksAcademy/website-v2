require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: 'Gatsby Storybook Starter',
    siteUrl: `https://www.4geeksacademy.com`,
    menuLinks: [
      {
        name: 'HOME',
        link: '/'
      },
      {
        name: 'WHY 4GEEKS',
        link: '/why'
      },
      {
        name: 'THE PROGRAM',
        link: '/program'
      },
      {
        name: 'PRICING',
        link: '/pricing'
      },
      {
        name: 'FOR COMPANIES',
        link: '/partners'
      },
    ]
  },
  plugins: [
        {
        resolve: "gatsby-plugin-web-font-loader",
        options: {
            custom: {
            families: ["Futura, Lato"],
            urls: ["/fonts/fonts.css"],
            },
        },
        },
        {
        resolve: 'gatsby-plugin-manifest',
        options: {
            name: 'Gatsby Storybook Starter',
            short_name: 'Gatsby Storybook Starter',
            start_url: '/',
            background_color: '#ffffff',
            theme_color: '#744C9E',
            display: 'standalone',
            icon: 'src/assets/logos/icon.png',
        },
        }, {
        resolve: 'gatsby-source-filesystem',
        options: {
            path: `${__dirname}/src`,
            name: 'src',
        },
        },
        'gatsby-plugin-root-import',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-offline',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        'gatsby-plugin-sass',
        'gatsby-plugin-styled-components',
        'gatsby-transformer-remark',
        'gatsby-transformer-yaml',
        `gatsby-plugin-sitemap`,
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: "GTM-PGGRR6",
                // Include GTM in development.
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: false,

                // datalayer to be set before GTM is loaded
                // should be an object or a function that is executed in the browser
                // Defaults to null
                defaultDataLayer: { platform: "gatsby" }
            }
        }
    ],
};
