import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css';

import NavB from '../components/Navbar'
import Footer from '../components/Footer'
import {StaticQuery, graphql} from 'gatsby';
import {withSession} from "../session.js";

import GlobalStyle from './GlobalStyle';
import SEO from './SEO';

const Layout = ({children, seo, context }) => {
    const { slug, title, description, image, keywords } = seo;
  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
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
          <SEO {...seo} context={context} />
          <NavB menuLinks={data.site.siteMetadata.menuLinks} />
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
  seo: PropTypes.object
};
NavB.defaultProps = {
  seo: {}
}

export default withSession(Layout);
