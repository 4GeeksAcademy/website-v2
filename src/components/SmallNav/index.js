import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import { useStaticQuery, graphql} from 'gatsby';
import {Break} from '../Responsive';
import {SessionContext} from '../../session';
import ChooseProgram from '../ChooseProgram'
import Card from '../Card'
import {Colors, Button, Anchor, Link} from '../Styling';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const NavBar = styled.nav`
    background-color: ${props => props.open ? "white" : null};
    align-items: center;
    height: 55px;
    z-index: 999;
    @media ${Break.sm}{
      height: ${props => props.open ? "100vh" : null};
      position: fixed;
      width: 100%;
    }
    @media ${Break.xs}{
      height: ${props => props.open ? "100vh" : null};
      position: fixed;
      width: 100%;
    }

`
export const Nav = styled.ul`
    display: flex;
    
`
export const NavItem = styled.li`
    text-transform: uppercase;
    margin: 0 .5rem;
    text-align: center;
    font-family: lato, sans-serif;
    font-size: 12px;
    @media ${Break.md}{
      font-size: ${props => props.fontSize || "10px"};
    }
    @media ${Break.sm}{
      font-size: 16px;
    }
    @media ${Break.xs}{
      font-size: 16px;
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
  @media ${Break.sm} {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  @media ${Break.xs} {
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
  const { session } = React.useContext(SessionContext);
  const [open, setOpen] = React.useState(false)
  const handleToggle = () => setOpen(!open)

  let _btnInfo = {};
  if(session && session.location) _btnInfo = { ...props.button, ...session.location.button };

  return (
    <NavBar open={open}>
      <StyledBurger open={open} onClick={handleToggle}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav onLocationChange={(slug) => props.onLocationChange(slug)} lang={props.lang} open={open} onToggle={handleToggle} menu={props.menu} button={_btnInfo} />
    </NavBar>
  )
}
export default Burger;
const ButtonStyle = styled.div`
    display: flex;
    flex-flow: row nowrap;
    border: 1px solid;
    background-color:white;
    color: black;
    @media ${Break.sm} {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 19;
      transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    }
`
const Div = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: 1024px;
  margin: auto;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
  @media ${Break.sm} {
    display:${({open}) => open ? '' : 'none'};
    flex-flow: column nowrap;
    background-color: white;
    position: sticky;
    z-index: 19;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: ${({open}) => open ? '50vh' : '0'};
    padding: 0.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
  @media ${Break.xs} {
    display:${({open}) => open ? '' : 'none'};
    flex-flow: column nowrap;
    background-color: white;
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
  color: black;
  li {
    padding: 18px 10px;
    color: black;
  }
  @media ${Break.md} {
    li {
      color: black;
      font-size: 10px;
    }
  }
  @media ${Break.sm} {
    width: 100%;
    flex-flow: column nowrap;
    li {
      font-size: 16px;
    }
    align-items: center;
  }
  @media ${Break.xs} {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;
// gatsbyImageData(
//   layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
//   width: 500
//   quality: 100
//   placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
//   breakpoints:	[200, 340, 520, 890]
// )

export const RightNav = ({lang, menu, open, button, onToggle, onLocationChange}) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/4G_logo_negro.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED # --> CONSTRAINED || FIXED || FULL_WIDTH
            width: 75
            placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
          )
          # fixed(width: 75) {
          #   ...GatsbyImageSharpFixed
          # } 
        }
      }
    }
  `)
  return (
      <Div open={open}>
        <Link to={'/'}>
          <GatsbyImage 
            // fadeIn={false}
            loading="eager"
            // fixed={data.file.childImageSharp.fixed}
            image={getImage(data.file.childImageSharp.fixed)}
            alt="4Geeks Logo" 
          />
        </Link>
        <Ul open={open}>
          {menu && menu.map((item, index) => 
            <NavItem fs_sm="18px" key={index}><Anchor onClick={onToggle} to={item.link} key={index}>{item.name}</Anchor></NavItem>
          )}
        </Ul>
      </Div>
  )
}



