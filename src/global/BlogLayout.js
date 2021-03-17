import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/style.css';
import '../assets/css/utils.css';
import Navbar from '../components/Navbar';
import {StaticQuery, graphql} from 'gatsby';
import CustomBar from '../components/CustomBar';
import Footer from '../components/Footer';


import GlobalStyle from './GlobalStyle';
import SEO from './SEO';

const BlogLayout = ({children, seo, context}) => {
    // const {slug, title, description, image, keywords} = seo;
    const [editMode, setEditMode] = React.useState()
    const [showUpcoming, setShowUpcoming] = React.useState(true)

    React.useEffect(() => {
        if (localStorage.getItem("edit-mode") === "true") setEditMode(true);
        if (RegExp('\/app?l(?:y|ica)').test(window.location.href)) {
            setShowUpcoming(false);
        }
    }, []);
    return (
        <StaticQuery
            query={graphql`
      query SiteTitleBlogQuery {
        allCustomBarYaml {
            edges {
              node {
                bar_content {
                  heading
                  link_to
                  button_text
                  sub_heading
                }
                fields {
                    lang
                  }
              }
            }
          }
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
                let myCustomBar = data.allCustomBarYaml.edges.find(item => item.node.fields.lang === context.lang)

                return (
                    <>
                        {editMode && <div style={{background: "yellow", padding: "15px"}}>
                            <span>You are reviewing the website on edit mode</span>
                            <button
                                style={{border: "1px solid black", float: "right", padding: "5px"}}
                                onClick={() => {
                                    localStorage.setItem("edit-mode", "false");
                                    setEditMode(false);
                                }}
                            > ❌ Clear edit mode</button>
                        </div>}
                        <SEO {...seo} context={context} />
                        {myNavbar && <Navbar onLocationChange={(slug) => setLocation(slug)} menu={myNavbar.node.navbar} button={myNavbar.node.button} lang={context.lang} />}
                        <GlobalStyle />
                        <>
                            {children}
                        </>
                        { showUpcoming && myCustomBar && <CustomBar button={myCustomBar.node.bar_content} lang={context.lang} position="bottom" showOnScrollPosition={400} />}
                        {myFooter && <Footer yml={myFooter.node} />}
                    </>
                )
            }}
        />
    )
};


BlogLayout.propTypes = {
    children: PropTypes.node.isRequired,
    seo: PropTypes.object
};

export default BlogLayout;
