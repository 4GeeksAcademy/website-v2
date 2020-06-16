import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';

import '../assets/css/style.css';

import NavB from '../components/Navbar'
import Footer from '../components/Footer'
import {StaticQuery, graphql} from 'gatsby';
import {withSession} from "../session.js";

import GlobalStyle from './GlobalStyle';
import SEO from './SEO';

const Layout = ({children, seo, context}) => {

  const {slug, title, description, image, keywords} = seo;

  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        
        allFooterYaml {
          edges {
            node {
              lang
              footer {
                heading
                items {
                  name
                  link
                }
              }
            }
          }
        }
        allNavbarYaml {
          edges {
            node {
              lang
              navbar {
                name
                link
              }
              button {
                button_text
                button_link
                button_type
                button_color_text
                button_background_color
              }
            }
          }
        }
      }
    `}
      render={(data) => {
        let myFooter = data.allFooterYaml.edges.filter(item => item.node.lang === context.lang)
        let myNavbar = data.allNavbarYaml.edges.filter(item => item.node.lang === context.lang)
        return (
          <>
            <SEO {...seo} context={context} />
            <NavB lang={myNavbar} />
            <GlobalStyle />
            <>
              {children}
            </>
            <Footer lang={myFooter} />
          </>
        )
      }}
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
