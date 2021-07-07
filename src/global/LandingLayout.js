import React from 'react';
import PropTypes from 'prop-types';
import {Navbar} from '../new_components/NavbarDesktop';
import {NavbarMobile} from '../new_components/NavbarMobile';
import Footer from '../new_components/Footer';
import {SessionContext} from '../session';
import '../assets/css/style.css';
import {StaticQuery, graphql} from 'gatsby';
import GlobalStyle from './GlobalStyle';
import SEO from './SEO';

const Layout = ({children, seo, context, withNavbar}) => {
  const {session} = React.useContext(SessionContext);

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
              socials{
                name
                icon
                link
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
                sub_menu{
                  icon
                  title
                  link
                  paragraph
                  links{
                    title
                    level
                    paragraph
                    icon
                    buttons{
                      text
                      link
                    }
                    sub_links{
                      title
                      link_to
                    }
                  }
                }
              }
              language_button{
                text
                link
              }
              button {
                apply_button_text
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
          cookiebotYaml {
            domain_ID {
              id
            }
          }
      }
    `}
      render={(data) => {
        let myFooter = data.allFooterYaml.edges.find(item => item.node.fields.lang === context.lang)
        let myNavbar = data.allNavbarYaml.edges.find(item => item.node.fields.lang === context.lang)

        if (!myNavbar || myNavbar == undefined) throw Error("Navbar not found, yml is missing language information?")
        let _btnInfo = myNavbar.node.button;
        if (session && session.location) _btnInfo = {..._btnInfo, ...session.location.button};

        return (
          <>
            <SEO {...seo} context={context} />
            {withNavbar &&
              <>
                <Navbar onLocationChange={(slug) => setLocation(slug)} menu={myNavbar.node.navbar} languageButton={myNavbar.node.language_button} button={myNavbar.node.button} lang={context.lang} />
                <NavbarMobile onLocationChange={(slug) => setLocation(slug)} menu={myNavbar.node.navbar} languageButton={myNavbar.node.language_button} button={myNavbar.node.button} lang={context.lang} />
              </>
            }
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
