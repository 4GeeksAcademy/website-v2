require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const robots = process.env.GATSBY_ROBOTS || "show";
module.exports = {
  siteMetadata: {
    defaultTitle: '4Geeks Academy - Miami Coding Bootcamp, Madrid España, Santiago de Chile and Caracas',
    titleTemplate: "%s · 4Geeks Academy",
    siteUrl: `https://4geeksacademy.com`,
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
    'gatsby-transformer-yaml',
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
          {
            resolve: "gatsby-remark-component",
            options: { components: ["button", "call-to-action"] }
          },
          `gatsby-remark-lazy-load`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_self",
              rel: "nofollow"
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `80`,
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 24 24"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>`,
              className: `heading-link`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: [`h2`],
            },
          },
        ]
      }
    },
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
          families: ["Lato"],
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
    'gatsby-plugin-styled-components',
    'gatsby-plugin-zeit-now',
    'gatsby-remark-reading-time',
    // 'gatsby-plugin-meta-redirect',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/admin`, `/tags`, `/edit`, `/landings`],
        // output: `/some-other-sitemap.xml`,
        query: `
        {
            site {
                siteMetadata {
                    siteUrl
                }
            }
            allSitePage(
              filter: {context: {visibility: {nin: ["hidden", "unlisted"]}}}
            ) {
                nodes {
                    path
                }
            }
        }`,
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
            policy: robots !== "hidden" ? [{ userAgent: '*' }] : [{ userAgent: '*', disallow: ['/'] }]
          },
          development: {
            policy: [{userAgent: '*', disallow: ['/']}]
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
