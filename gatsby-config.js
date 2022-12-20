require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const robots = process.env.GATSBY_ROBOTS || "show";
module.exports = {
  siteMetadata: {
    defaultTitle:
      "4Geeks Academy - Miami Coding Bootcamp, Madrid España, Santiago de Chile and Caracas",
    titleTemplate: "%s · 4Geeks Academy",
    siteUrl: `https://4geeksacademy.com`,
    defaultDescription: {
      us: "4Geeks Academy is a world-wide leading coding school focused specially in part-time studies, you don't have to quite your job to become a web developer. Career support for life, coding mentoring for life. We have Miami Coding bootcamps; in Madrid, Spain; Santiago de Chile and Caracas, Venezuela. ",
      es: "4Geeks Academy es un coding bootcamp a nivel mundial que se especializa en la programación e informatica, en estudios principalmente part-time donde no tienes que dejar tu trabajo para aprender a programar.",
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
      logo: "/images/4geeks-logo.png",
    },
    siteVerification: {
      google: "",
      bing: "",
    },
  },
  plugins: [
    "gatsby-transformer-yaml",
    `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-remove-console",
      options: {
        exclude: ["error", "warn"], // <- will be removed all console calls except these
      },
    },
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        src: `https://www.google.com/recaptcha/api.js?render=${process.env.GATSBY_CAPTCHA_KEY}`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-component",
            options: { components: ["button", "call-to-action"] },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_self",
              rel: "nofollow",
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `0`,
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22.548 9l.452-2h-5.364l1.364-6h-2l-1.364 6h-5l1.364-6h-2l-1.364 6h-6.184l-.452 2h6.182l-1.364 6h-5.36l-.458 2h5.364l-1.364 6h2l1.364-6h5l-1.364 6h2l1.364-6h6.185l.451-2h-6.182l1.364-6h5.366zm-8.73 6h-5l1.364-6h5l-1.364 6z"/></svg>`,
              className: `heading-link`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: false,
              elements: [`h2`],
            },
          },
        ],
      },
    },
    "gatsby-plugin-loadable-components-ssr",
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
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg/, // See below to configure properly
        },
      },
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
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "4Geeks Academy - Miami Coding Bootcamp, Madrid España, Santiago de Chile and Caracas",
        short_name: "4Geeks Academy - Miami Coding Bootcamp and worldwide",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#744C9E",
        display: "standalone",
        icon: "src/assets/logos/favicon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src`,
        name: "src",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/`,
        name: "static",
      },
    },
    "gatsby-plugin-root-import",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-zeit-now",
    "gatsby-remark-reading-time",
    // 'gatsby-plugin-meta-redirect',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/admin`, `/tags`, `/edit`, `/landings`, `/preview`],
        // output: `/some-other-sitemap.xml`,
        query: `
        {
            site {
                siteMetadata {
                    siteUrl
                }
            }
            allSitePage(
              filter: {
                context: {visibility: {nin: ["hidden", "unlisted"]}}
                path: { regex: "/^((?!\/preview).)*$/" }
              }
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
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        env: {
          production: {
            sitemap: `https://4geeksacademy.com/sitemap.xml`,
            policy:
              robots !== "hidden"
                ? [{ userAgent: "*" }]
                : [{ userAgent: "*", disallow: ["/"] }],
          },
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
          },
        },
      },
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
        defaultDataLayer: { platform: "gatsby" },
        routeChangeEventName: "website-route-change",
      },
    },
  ],
};
