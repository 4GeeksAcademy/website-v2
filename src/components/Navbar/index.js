import React from 'react';
import styled from 'styled-components';
import {Link} from 'gatsby';
import PropTypes from 'prop-types';

const Navbar = ({siteTitle, menuLinks}) => (

    <header
        style={{
            background: "rebeccapurple",
            marginBottom: "1.45rem",
        }}
    >
        <div
            style={{
                background: "white",
                marginBottom: "1.45rem",
            }}
        >
            <div
                style={{
                    margin: "0 auto",
                    // width: "100%",
                    // padding: "1.45rem 1.0875rem",
                    // display: "flex",
                    justifyItems: "space-between",
                    alignItems: "center",
                }}
            >
                <h1 style={{margin: 0, flex: 1}}>
                    <Link
                        to="/"
                        style={{
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        {/* {siteTitle} */}
                    </Link>
                </h1>
                <div>
                    <nav>
                        <ul style={{display: "flex", flex: 1}}>
                            {menuLinks.map(link => (
                                <li
                                    key={link.name}
                                    style={{

                                        listStyleType: `none`,
                                        padding: `1rem`,
                                    }}
                                >
                                    <Link style={{color: `black`, fontSize: 14, textAlign: `center`}} to={link.link}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header >
)
Navbar.propTypes = {
    siteTitle: PropTypes.string,
}
Navbar.defaultProps = {
    siteTitle: ``,
}
export default Navbar