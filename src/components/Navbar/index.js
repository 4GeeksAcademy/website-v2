import React from 'react';
import styled from 'styled-components';
import {Link} from 'gatsby';
import PropTypes from 'prop-types';
import '../../assets/css/style.scss'
import {Colors, Button} from '../Styling'

const Navbar = ({siteTitle, menuLinks}) => (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white py-0 px-3">
        <a className="navbar-brand" href="#">
            <img src="../images/logo.png" width="50" height="40" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul style={{display: "flex", justifyContent: "center", flex: 1}}>
                {menuLinks.map(link => (
                    <li
                        key={link.name}
                        style={{

                            listStyleType: `none`,
                            padding: `1rem`,
                            fontFamily: `lato, sans-serif`
                        }}
                    >
                        <Link style={{color: `black`, fontSize: 14, textAlign: `center`}} to={link.link}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <form className="form-inline my-2 my-lg-0">
                <Button color={Colors.red} textColor={Colors.white}>APPLY NOW</Button>
                {/* <button className="btn btn-outline-primary rounded-pill my-2 my-sm-0" type="submit">APPLY NOW</button> */}
            </form>
        </div>
    </nav>

)
Navbar.propTypes = {
    siteTitle: PropTypes.string,
}
Navbar.defaultProps = {
    siteTitle: ``,
}
export default Navbar