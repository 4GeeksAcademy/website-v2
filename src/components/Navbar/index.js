import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import Img from "gatsby-image"
import {Link, useStaticQuery, graphql} from 'gatsby';
import {Device} from '../Responsive';
import ChooseProgram from '../ChooseProgram'
import {Card} from '../Card'
import PropTypes from 'prop-types';
import {Colors, Button} from '../Styling';
import Fragment from "../Fragment"

export const NavBar = styled.nav`
    background-color: ${props => props.open ? "white" : null};
    // padding: 0 2rem;
    // display: flex;
    // justify-content: space-between;
    align-items: center;
    height: 55px;
    z-index: 999;
    @media ${Device.xs}{
      height: ${props => props.open ? "100vh" : null};
      position: fixed;
      width: 100%;
    }
    @media ${Device.sm}{
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
    @media ${Device.xs}{
      font-size: ${props => "16px"};
    }
    @media ${Device.sm}{
      font-size: ${props => "16px"};
    }
    @media ${Device.md}{
      font-size: ${props => props.fontSize || "10px"};
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
  const [open, setOpen] = React.useState(false)
  return (
    <NavBar open={open}>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav lang={props.lang} open={open} menu={props.menu} button={props.button} />
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
  color: black;
  li {
    padding: 18px 10px;
    color: black;
  }
  @media ${Device.xs} {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
  @media ${Device.sm} {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
  @media ${Device.md} {
    li {
      color: black;
      font-size: 10px;
    }
  }
`;

export const RightNav = ({lang, menu, open, button}) => {
  const data = useStaticQuery(graphql`
    query {
      allChooseProgramYaml {
        edges {
          node {
            programs{
                text
                link
                schedule
            }
            fields{
              lang
            }
            open_button_text
            close_button_text
          }
        }
      }
      file(relativePath: { eq: "images/4G_logo_negro.png" }) {
        childImageSharp {
          fluid(maxWidth: 225) {
            ...GatsbyImageSharpFluid_withWebp
          }
          fixed(width: 75) {
            ...GatsbyImageSharpFixed
          } 
        }
      }
    }
  `)
  const content = data.allChooseProgramYaml.edges.find(({node}) => node.fields.lang === lang);
  return (
      <Div open={open}>
        <Link to={'/'}>
          <Img fixed={data.file.childImageSharp.fixed} alt="4Geeks Logo"></Img>
        </Link>
        <Ul open={open}>
          {menu && menu.map((item, index) => 
            (item.name === "The Programs" || item.name==="Programas") ?
                <ChooseProgram
                  key={index}
                  left="15px"
                  programs={content.node.programs}
                  marginTop="-3px"
                  borderRadius="0 .75rem .75rem .75rem"
                  openLabel={content.node.close_button_text}
                  closeLabel={content.node.open_button_text}
                  selector={({ status, setStatus }) => 
                    !status.toggle ?
                      <NavItem fontSize="16px" onClick={() => setStatus({ toggle: !status.toggle })}>{item.name}</NavItem>
                      :
                      <Card shadow borders="1.25rem 1.25rem 0 0">
                        <NavItem fontSize="16px" onClick={() => setStatus({ toggle: !status.toggle })}>{item.name}</NavItem>
                      </Card>
                  }
                />
                :
                <NavItem key={index} fontSize="16px"><Link to={item.link} key={index}>{item.name}</Link></NavItem>
          )}
        </Ul>
        <Link to={button.button_link}><Button width="130px" color={Colors.red} textColor={Colors.white}>{button.button_text}</Button></Link>
      </Div>
  )
}



