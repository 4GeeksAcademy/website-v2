import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import Img from "gatsby-image"
import {useStaticQuery, graphql} from 'gatsby';
import {Devices} from '../Responsive'
import {SessionContext} from '../../session';
import ChooseProgram from '../ChooseProgram'
import {H3} from '../Heading';
import {Colors, Button, Anchor, Link} from '../Styling';
import {Div, Grid} from '../Sections';
import Icon from "../Icon"
import {NavItem} from '../Navbar';


const MegaMenuContainer = styled(Div)``
const Nav = styled.nav`
    height: 71px;
    display: ${props => props.display};
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    @media ${Devices.xxs}{
    }
    @media ${Devices.xs}{
    }
    @media  ${Devices.sm}{
    }
    @media  ${Devices.tablet}{
        display: ${props => props.display_tablet};
    }
    @media  ${Devices.md}{
        display: ${props => props.display_md};
    }
    @media  ${Devices.lg}{
    }
    @media  ${Devices.xl}{
    }
    @media  ${Devices.xxl}{
    }
`
const Menu = styled.ul`
    display: flex;
`
const MenuItem = styled.li`
    text-transform: uppercase;
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    margin: 0 .5rem;
    text-align: center;
    font-family: lato, sans-serif;
`

export const Navbar = ({lang, menu, open, button, onToggle, onLocationChange}) => {
    const data = useStaticQuery(graphql`
    query {
      allChooseProgramYaml {
        edges {
          node {
            programs{
                text
                link
                location_bc_slug
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
      file(relativePath: { eq: "images/logoweb.png" }) {
        childImageSharp {
          fixed(width: 125) {
            ...GatsbyImageSharpFixed
          } 
        }
      }
    }
  `)
    return (
        <Nav display_md="flex" display="none">
            <Link to={'/'}>
                <Img
                    fadeIn={false}
                    loading="eager"
                    fixed={data.file.childImageSharp.fixed} alt="4Geeks Logo"
                />
            </Link>
            <Menu>
                {menu && menu.map((item, index) => {
                    return (
                        <MenuItem onClick={() => setStatus({toggle: !status.toggle})}>{item.name}</MenuItem>
                    )
                }
                )}
            </Menu>
            <Div alignItems="center" justifyContent="between">
                <H3 fontSize="13px" margin="0 30px 0 0" fontWeight="400" lineHeight="16px">ENG / ESP</H3>
                <Link onClick={onToggle} to={button.button_link || "#"}><Button minWidth="130px" width="fit-content" color={Colors.black} textColor={Colors.white}>{button.apply_button_text || "Apply Now"}</Button></Link>
            </Div>
        </Nav>
    )
}


export const MegaMenu = () => {
    return (
        <MegaMenuContainer background="white" padding_tablet="30px 15px 45px 30px" position="absolute" zIndex_tablet="1" borderRadius="3px" minWidth_tablet="432px" minHeight_tablet="347px" boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" >
            <Grid gridTemplateColumns_tablet="12" gridTemplateRows="2" >
                <Div borderBottom_tablet="1px solid #EBEBEB" gridArea_tablet="1/1/1/13">
                    <Div><Icon icon="laptop" width="43px" height="34px" /></Div>
                    <Div flexDirection="column" margin="0 0 0 15px">
                        <H3 textAlign="left" margin="0 0 20px 0">title</H3>
                        {/* {m.content.split('\\n').map((d, i) =>
                    <Paragraph
                      textAlign="left"
                      color={Colors.darkGray}
                      key={i}                        >
                      {d}
                    </Paragraph>
                  )} */}
                    </Div>
                </Div>
                <Div gridArea_tablet="2/1/2/13">Test</Div>
            </Grid>
        </MegaMenuContainer>
    )
}