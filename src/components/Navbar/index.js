import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import Img from "gatsby-image"
import {Link, useStaticQuery, graphql} from 'gatsby';
import {Device} from '../Responsive';
import PropTypes from 'prop-types';
import {Colors, Button} from '../Styling';

export const NavBar = styled.nav`
    background-color: white;
    // padding: 0 2rem;
    // display: flex;
    // justify-content: space-between;
    align-items: center;
    height: 55px;
    z-index: 10000;
@media ${Device.xs}{
  position: fixed;
  width: 100%;
}
@media ${Device.sm}{
  position: fixed;
  width: 100%;
}
@media ${Device.md}{

}
@media ${Device.lg}{

}
@media ${Device.xl} {

}
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
      <RightNav open={open} menu={props} />
      {/* {open === true ? <RightNav open={open} menu={props} /> : null} */}
      {/* <NavButton open={open} /> */}

    </>
  )
}
const ButtonStyle = styled.div`
    display: flex;
    flex-flow: row nowrap;
    border: 1px solid;
    background-color:white;
    color: black;
    @media ${Device.sm} {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 19;
      transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    }
`
export const NavButton = ({open}) => {
  return (
    <ButtonStyle open={open}>Apply</ButtonStyle>
  )
}
const Div = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
  @media ${Device.xs} {
    display:${({open}) => open ? '' : 'none'};
    flex-flow: column nowrap;
    background-color: white;
    // background-color: #0D2538;
    position: sticky;
    z-index: 19;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: ${({open}) => open ? '50vh' : '0'};
    width: 100%;
    padding: 0.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
  @media ${Device.sm} {
    display:${({open}) => open ? '' : 'none'};
    flex-flow: column nowrap;
    background-color: white;
    // background-color: #0D2538;
    position: sticky;
    z-index: 19;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: ${({open}) => open ? '50vh' : '0'};
    width: 100%;
    padding: 0.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media ${Device.xs} {
    flex-flow: column nowrap;
    align-items: center;
    li {
      color: black;
      
    }
  }
  @media ${Device.sm} {
    flex-flow: column nowrap;
    align-items: center;
    li {
      color: black;
      font-size: 10px;
    }
  }
  @media ${Device.md} {
    
    li {
      color: black;
      font-size: 10px;
    }
  }
`;

export const RightNav = ({menu, open}) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/4G_logo_negro.png" }) {
        childImageSharp {
          fluid(maxWidth: 225) {
            ...GatsbyImageSharpFluid
          }
          fixed(width: 75) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  console.log("Right:", data)
  return (
    <>

      <Div open={open}>
        <Link to={'/'}>
          <Img fixed={data.file.childImageSharp.fixed} alt="4Geeks Logo"></Img>
          {/* <img src="/images/4G_logo_negro.png" width="70" alt=""></img> */}
        </Link>
        <Ul open={open}>
          {menu.menu.navbar && menu.menu.navbar.map((item, index) => {
            return (
              <Link to={item.link} key={index}><NavItem>{item.name}</NavItem></Link>
            )
          })}
        </Ul>
        <Link to="/apply"><Button width="130px" color={Colors.red} textColor={Colors.white}>Apply</Button></Link>
      </Div>


    </>

  )
}


const Navbar = (props) => {
  console.log("navbar props:", props)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <NavBar>
      {/* <Link to={'/'}><img src="/images/4G_logo_negro.png" width="70" alt=""></img></Link> */}
      <Burger menu={props.lang[0].node} />
    </NavBar>
  )
}
export default Navbar;
