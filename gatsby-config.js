require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    defaultTitle: 'Gatsby Storybook Starter',
    titleTemplate: "%s · 4Geeks Academy",
    siteUrl: `https://www.4geeksacademy.com`,
    defaultDescription: "4Geeks Academy is a world-wide leading coding bootcamp/academy focused specially part-time studies, you don't have to quite your job to become a web developer. Career support for life, coding mentoring for life.",
    defaultKeywords: ["coding bootcamp", "coding classes", "learn to code", "programing classes", "curso de programacion", "curso de informatica", "escuela de codigo", "escuela de programacion"],
    defaultImage: "/images/4geeks-main.jpg",
    social: {
        defaultTwitterUsername: "@4geeksacademy",
        defaultFacebookUsername: "/4geeksacademy",
        defaultInstagramUsername: "@4geeksacademy",
        youtube: "https://www.youtube.com/channel/UC1ZyAx5eyV9gTFWpHPs9-GA",
        github: "https://github.com/4geeksacademy",
    },
    org: {
        name: "4Geeks Academy",
        logo: "/images/4geeks-logo.png"
    },
    siteVerification: {
        google: "",
        bing: ""
    },
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
                name: '4Geeks Academy - Coding Bootcamp, Academia de programacion: Miami, Madrid, Santiago de Chile y Venezuela',
                short_name: '4Geeks Academy - Coding Bootcamp',
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
        'gatsby-plugin-styled-components',
        'gatsby-transformer-remark',
        'gatsby-transformer-yaml',
        {
        resolve: `gatsby-plugin-sitemap`,
            options: {
                exclude: [`/admin`, `/tags/links`]
            }
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
            policy: [{ userAgent: '*', allow: '/' }]
            }
        },
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
