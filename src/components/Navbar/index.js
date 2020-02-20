import React, {useState} from 'react';
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
            <NavbarBrand href="/"><img src="../images/4G_logo_negro.png" width="70" alt="" /></NavbarBrand>
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
                <Link to="/apply"><Button width="200px" color={Colors.red} textColor={Colors.white}>APPLY NOW</Button></Link>
            </Collapse>
        </Navbar>
    )
}
NavB.propTypes = {
    siteTitle: PropTypes.string,
}
NavB.defaultProps = {
    siteTitle: ``,
}
export default NavB