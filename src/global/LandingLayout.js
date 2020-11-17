import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/SmallNav';
import Footer from '../components/Footer';
import {SessionContext} from '../session';
import '../assets/css/style.css';
import {StaticQuery, graphql} from 'gatsby';
import GlobalStyle from './GlobalStyle';
import SEO from './SEO';

const Layout = ({children, seo, context, withNavbar}) => {
  const { session } = React.useContext(SessionContext);

  return (
    <StaticQuery
      query={graphql`
      query LandingLayoutQuery {
        
        allFooterYaml {
          edges {
            node {
              newsletter{
                heading
                paragraph
                button_text
                thankyou
              }
              footer {
                heading
                width
                items {
                  name
                  link
                }
              }
              fields {
                lang
              }
            }
          }

        }
        allNavbarYaml{
          edges {
            node {
              navbar {
                name
                link
              }
              button {
                button_link
                button_type
                button_color_text
                button_background_color
                next_cohort
                other_dates
              }
              fields {
                lang
              }
            }
          }
        }
      }
    `}
      render={(data) => {
        let myFooter = data.allFooterYaml.edges.find(item => item.node.fields.lang === context.lang)
        let myNavbar = data.allNavbarYaml.edges.find(item => item.node.fields.lang === context.lang)

        let _btnInfo = myNavbar.node.button;
        if(session && session.location) _btnInfo = { ..._btnInfo, ...session.location.button };
        
        return (
          <>
            <SEO {...seo} context={context} />
            {withNavbar && <Navbar onLocationChange={(slug) => setLocation(slug)} menu={myNavbar.node.navbar} button={myNavbar.node.button} lang={context.lang} />}
            <GlobalStyle />
            <>
              {children}
            </>
            <Footer yml={myFooter.node} session={session} />
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

export default Layout;
