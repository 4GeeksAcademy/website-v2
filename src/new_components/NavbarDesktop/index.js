import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import Img from "gatsby-image"
import {useStaticQuery, graphql} from 'gatsby';
import {Devices} from '../Responsive'
import {SessionContext} from '../../session';
import ChooseProgram from '../ChooseProgram'
import {H3, Paragraph} from '../Heading';
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
    cursor: pointer;
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    margin: 0 .5rem;
    text-align: center;
    font-family: lato, sans-serif;
`

export const Navbar = ({lang, menu, open, button, onToggle, onLocationChange}) => {
    const [status, setStatus] = useState(
        {
            toggle: false,
            hovered: false,
            itemIndex: null
        })
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
        <>
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
                            <MenuItem onClick={() => setStatus({...status, toggle: true, itemIndex: index})}>{item.name}</MenuItem>
                        )
                    }
                    )}
                </Menu>
                <Div alignItems="center" justifyContent="between">
                    <H3 fontSize="13px" margin="0 30px 0 0" fontWeight="400" lineHeight="16px">ENG / ESP</H3>
                    <Link onClick={onToggle} to={button.button_link || "#"}><Button minWidth="130px" width="fit-content" color={Colors.black} textColor={Colors.white}>{button.apply_button_text || "Apply Now"}</Button></Link>
                </Div>
            </Nav>
            <MegaMenu status={status} menu={menu} />
        </>
    )
}


export const MegaMenu = ({status, setStatus, menu}) => {
    return (
        <>
            {status.itemIndex != null &&
                <MegaMenuContainer background="white" padding_tablet="30px 30px 45px 30px" position="absolute" zIndex_tablet="1" borderRadius="3px" minWidth_tablet="432px" maxWidth_tablet="100%" minHeight_tablet="347px" boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" >
                    <Grid gridTemplateColumns_tablet="repeat(12, 1fr)" gridTemplateRows="2" >
                        <Div borderBottom_tablet="1px solid #EBEBEB" gridArea_tablet="1/1/1/13" padding="0 0 27px 0">
                            <Div><Icon icon="laptop" width="43px" height="34px" /></Div>
                            <Div flexDirection="column" margin="0 0 0 15px" >
                                <H3 textAlign="left" fontSize="15px" lineHeight="22px" fontWeight="900" margin="0 0 5px 0">{status.itemIndex != null && menu[status.itemIndex].sub_menu.title}</H3>
                                {menu[status.itemIndex].sub_menu.paragraph.split('\n').map((d, i) =>
                                    <Paragraph
                                        textAlign="left"
                                        color={Colors.darkGray}
                                        key={i}                        >
                                        {d}
                                    </Paragraph>
                                )}
                            </Div>
                        </Div>
                        <Div gridArea_tablet="2/1/2/13" >
                            <Grid gridTemplateColumns_tablet={`repeat(${menu[status.itemIndex].sub_menu.links.length}, 1fr)`} >
                                {Array.isArray(menu[status.itemIndex].sub_menu.links) && menu[status.itemIndex].sub_menu.links.map((m, i) => {
                                    return (
                                        <Div flexDirection="column" key={i}>
                                            <H3 textAlign="left" fontSize="15px" lineHeight="22px" fontWeight="900" margin="0 0 5px 0">{m.title}</H3>
                                            {Array.isArray(m.sub_links) && m.sub_links.map((m, i) => {
                                                return (
                                                    <Link to={m.link_to}><Div alignItems="baseline" margin="5px 0 "><H3 textAlign="left" width="fit-content" fontSize="15px" lineHeight="20px" fontWeight="400" margin="0 5px 0 0">{m.title}</H3><Icon icon="arrow-right" color="#A4A4A4" width="8px" height="8px" /></Div></Link>
                                                )
                                            })}
                                        </Div>
                                    )
                                })}
                            </Grid>
                        </Div>
                    </Grid>
                </MegaMenuContainer>
            }
        </>
    )
}