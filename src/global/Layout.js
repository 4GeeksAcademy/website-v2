import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import NavB from '../components/Navbar'
import Footer from '../components/Footer'
import {StaticQuery, graphql} from 'gatsby';
import {withSession} from "../session.js";

import GlobalStyle from './GlobalStyle';

const Layout = ({children}) => {
  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
              menuLinks{
                name
                link
              
            }
          }
        }
      }
    `}
      render={(data) => (
        <>
          <Helmet>
            <title>{data.site.siteMetadata.title}</title>
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="default"
            />
          </Helmet>
          <NavB menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title} />
          <GlobalStyle />
          <>
            {children}
          </>
          <Footer />
        </>
      )}
    />
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withSession(Layout);
