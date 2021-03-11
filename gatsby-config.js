require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    defaultTitle: '4Geeks Academy - Miami Coding Bootcamp, Madrid España, Santiago de Chile and Caracas',
    titleTemplate: "%s · 4Geeks Academy",
    siteUrl: `https://www.4geeksacademy.com`,
    defaultDescription: {
      "us": "4Geeks Academy is a world-wide leading coding school focused specially in part-time studies, you don't have to quite your job to become a web developer. Career support for life, coding mentoring for life. We have Miami Coding bootcamps; in Madrid, Spain; Santiago de Chile and Caracas, Venezuela. ",
      "es": "4Geeks Academy es un coding bootcamp a nivel mundial que se especializa en la programación e informatica, en estudios principalmente part-time donde no tienes que dejar tu trabajo para aprender a programar.",
    },
    defaultKeywords: {
      "us": ["coding bootcamp", "coding classes", "learn to code", "programming classes", "miami coding bootcamp", "soding school", "learn python", "python classes", "learn javascript", "learn node", "learn programming", "become a developer", "time to code", "4geeks academy", "coding bootcamp online"],
      "es": ["coding bootcamp", "curso de programacion", "curso de informatica", "escuela de codigo", "miami coding bootcamp", "escuela de programacion", "grado medio informatica", "grado medio progamacion", "informatica", "bootcamp de informatica", "estudios de informatica", "estudios de programacion", "coding bootcamp online", "aprender a programar online", "cursos de programción online"],
    },
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

  },
  plugins: [
    // 'gatsby-plugin-force-trailing-slashes',
    'gatsby-plugin-loadable-components-ssr',
    {
      resolve: "gatsby-plugin-rollbar",
      options: {
        accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
        // For all configuration options, see https://docs.rollbar.com/docs/rollbarjs-configuration-reference
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: {
          environment: process.env.NODE_ENV,
          server: {
            branch: process.env.VERCEL_GITHUB_COMMIT_REF,
            host: process.env.VERCEL_URL,
          }
        }
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg/ // See below to configure properly
        }
      }
    },
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
        name: '4Geeks Academy - Miami Coding Bootcamp, Madrid España, Santiago de Chile and Caracas',
        short_name: '4Geeks Academy - Miami Coding Bootcamp and worldwide',
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
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/`,
        name: 'static',
      },
    },
    'gatsby-plugin-root-import',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
            {
                resolve: `gatsby-remark-images`,
                options: {
                maxWidth: 800,
                loading: 'lazy'
                },
            },
            `gatsby-remark-lazy-load`,
            {
                resolve: "gatsby-remark-external-links",
                options: {
                target: "_self",
                rel: "nofollow"
                }
            },
        ]
      }
    },
    'gatsby-transformer-yaml',
    'gatsby-plugin-zeit-now',
    'gatsby-remark-reading-time',
    // 'gatsby-plugin-meta-redirect',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/admin`, `/tags/links`, `/edit`, `/landings`],
        // output: `/some-other-sitemap.xml`,
        // query: `
        // {
        //     site {
        //         siteMetadata {
        //             siteUrl
        //         }
        //     }
        //     allSitePage {
        //         nodes {
        //             path
        //         }
        //     }
        // }`,
        // serialize: ({ site, allSitePage }) =>
        //     allSitePage.nodes.map(node => {
        //         return {
        //             url: `${site.siteMetadata.siteUrl}${node.path}`,
        //             changefreq: `daily`,
        //             priority: 0.7,
        //         }
        //     })
        }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        env: {
          production: {
            policy: [{ userAgent: '*' }]
          },
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
        }
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
        defaultDataLayer: {platform: "gatsby"},
        routeChangeEventName: "website-route-change",
      }
    }
  ],
};
