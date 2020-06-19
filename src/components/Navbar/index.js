import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'gatsby';
import {Device} from '../Responsive';
import PropTypes from 'prop-types';
import {Colors, Button} from '../Styling';

export const NavBar = styled.nav`
    background-color: white;
    padding: 0 2rem;
    // position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const Nav = styled.ul`
    display: flex;
    
`
export const NavItem = styled.li`
    text-transform: uppercase;
    margin: 0 .5rem;
    font-family: lato, sans-serif;
    font-size: 12px;
    @media ${Device.xs}{
        font-size: 10px;
    }
    @media ${Device.sm}{
        font-size: 10px;
    }
    @media ${Device.md}{
    
    }
    @media ${Device.lg}{
     
    }
    @media ${Device.xl} {
     
    }
`

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  @media ${Device.xs} {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({open}) => open ? '#ccc' : '#333'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({open}) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({open}) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
  @media ${Device.sm} {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({open}) => open ? '#ccc' : '#333'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({open}) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({open}) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

export const Burger = (props) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div />
                <div />
                <div />
            </StyledBurger>
            <RightNav open={open} />
            {/* <NavButton open={open} /> */}
            <Link to="/apply"><Button width="130px" color={Colors.red} textColor={Colors.white}>{props.test}</Button></Link>
        </>
    )
}
const ButtonStyle = styled.div`
    border: 1px solid;
    background-color:white;
    color: black;
    @media ${Device.sm} {
        
        z-index: 19;
        transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
        
      }
`
export const NavButton = (props) => {
    return (
        <ButtonStyle>Apply</ButtonStyle>
    )
}

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media ${Device.xs} {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    z-index: 19;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 50vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
  @media ${Device.sm} {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    z-index: 19;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 50vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

export const RightNav = ({open}) => {
    return (

        <Ul open={open}>
            <NavItem>Why 4Geeks</NavItem>
            <NavItem>The Program</NavItem>
            <NavItem>Pricing</NavItem>
            <NavItem>For Companies</NavItem>
        </Ul>


    )
}


const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <NavBar>
            <Link to={'/'}><img src="/images/4G_logo_negro.png" width="70" alt=""></img></Link>
            <Burger test={props.lang[0].node.button.button_text} />
        </NavBar>
    )
}
export default Navbar;
