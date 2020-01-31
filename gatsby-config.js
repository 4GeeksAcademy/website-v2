require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: 'Gatsby Storybook Starter',
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
    'gatsby-transformer-yaml', {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src',
        name: 'src',
      },
    },
  ],
};
