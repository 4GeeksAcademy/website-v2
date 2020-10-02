import React from 'react';
import PropTypes from 'prop-types';
import {SessionContext} from '../session';
import '../assets/css/style.css';
import '../assets/css/utils.css';
import Navbar from '../components/Navbar';
import {Nav} from '../components/Navbar';
import NavB from '../components/Navbar'
import Footer from '../components/Footer'
import {StaticQuery, graphql} from 'gatsby';
import UpcomingProgram from "../components/UpcomingProgram"

import GlobalStyle from './GlobalStyle';
import SEO from './SEO';

const Layout = ({children, seo, context}) => {

  const { session } = React.useContext(SessionContext);
  // const {slug, title, description, image, keywords} = seo;
  const [ editMode, setEditMode ] = React.useState()
  const [ showUpcoming, setShowUpcoming ] = React.useState(true)
  
  React.useEffect(() => {
    setEditMode(localStorage.getItem("edit-mode") === "true");
    if(RegExp('\/app?l(?:y|ica)').test(window.location.href)){
      setShowUpcoming(false);
    } 
  },[]);

  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        
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
            {editMode && <div style={{ background: "yellow", padding: "15px" }}>
                <span>You are reviewing the website on edit mode</span>
                <button 
                  style={{ border: "1px solid black", float: "right", padding: "5px" }}
                  onClick={() => {
                    localStorage.setItem("edit-mode", "false");
                    setEditMode(false);
                  }}
                > ❌ Clear edit mode</button>
            </div>}
            <SEO {...seo} context={context} />
            {/* <NavB lang={myNavbar} /> */}
            <Navbar menu={myNavbar.node.navbar} button={_btnInfo} lang={context.lang} />
            <GlobalStyle />
            <>
              {children}
            </>
            { showUpcoming && <UpcomingProgram location={session ? session.location : null} button={_btnInfo} lang={context.lang} position="bottom" showOnScrollPosition={400} />}
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
NavB.defaultProps = {
  seo: {}
}

export default Layout;
