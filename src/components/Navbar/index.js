import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'gatsby';
import PropTypes from 'prop-types';
import '../../assets/css/style.scss'
import {Colors, Button} from '../Styling';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';


const NavB = ({siteTitle, menuLinks}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar color="light" className="navbar sticky-top navbar-expand-lg navbar-light bg-white py-0 px-3" light expand="md">
            <NavbarBrand href="/"><img src="../images/logo.png" width="50" height="40" alt="" /></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} className="mb-2 text-center" navbar>
                <Nav className="mr-auto" style={{display: "flex", justifyContent: "center", flex: 1}} navbar>
                    {menuLinks.map(link => (
                        <NavItem
                            key={link.name}
                            style={{

                                listStyleType: `none`,
                                padding: `1rem`,
                                fontFamily: `lato, sans-serif`,
                                fontSize: `12px`,
                                color: `${Colors.black}`,
                                textAlign: `center`,
                            }}
                        >
                            <NavLink href={link.link}>{link.name}</NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <Link to="/apply"><Button color={Colors.red} textColor={Colors.white}>APPLY NOW</Button></Link>
            </Collapse>
        </Navbar>
        // <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white py-0 px-3">
        //     <a className="navbar-brand" href="#">
        // <img src="../images/logo.png" width="50" height="40" alt="" />
        //     </a>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>

        //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //         <ul style={{display: "flex", justifyContent: "center", flex: 1}}>
        //             {menuLinks.map(link => (
        //                 <li
        //                     key={link.name}
        // style={{

        //     listStyleType: `none`,
        //     padding: `1rem`,
        //     fontFamily: `lato, sans-serif`
        // }}
        //                 >
        //                     <Link style={{color: `black`, fontSize: 14, textAlign: `center`}} to={link.link}>
        //                         {link.name}
        //                     </Link>
        //                 </li>
        //             ))}
        //         </ul>
        //         <form className="form-inline my-2 my-lg-0">
        //             <Link to="/apply"><Button color={Colors.red} textColor={Colors.white}>APPLY NOW</Button></Link>
        //             {/* <button className="btn btn-outline-primary rounded-pill my-2 my-sm-0" type="submit">APPLY NOW</button> */}
        //         </form>
        //     </div>
        // </nav>

    )
}
NavB.propTypes = {
    siteTitle: PropTypes.string,
}
NavB.defaultProps = {
    siteTitle: ``,
}
export default NavB