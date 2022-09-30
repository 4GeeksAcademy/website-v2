import React, { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { Devices } from "../Responsive";
import { SessionContext } from "../../session";
import ChooseProgram from "../ChooseProgram";
import { H3, H4, Paragraph } from "../Heading";
import { Colors, Button, Anchor, Link } from "../Styling";
import { Div, Grid } from "../Sections";
import Icon from "../Icon";
import { NavItem } from "../Navbar";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import CustomBar from "../CustomBar";

const MegaMenuContainer = styled(Div)`
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  transform: ${(props) => props.transform};
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid white;
  top: -20px;
  left: ${(props) => props.left};
`;
const MegaMenuPositions = [
  {
    top: "",
    left: "",
    leftTriangle: "30%",
    width: "100%",
    margin: "0 0 50px 0",
  },
  {
    top: "",
    left: "50%",
    leftTriangle: "36%",
    transform: "translateX(-480px)",
    width: "815px",
    margin: "10px",
  },
  {
    top: "",
    left: "50%",
    leftTriangle: "32%",
    transform: "translateX(-200px)",
    width: "377px",
    margin: "0",
  },
  {
    top: "",
    left: "50%",
    leftTriangle: "32%",
    transform: "translateX(-150px)",
    width: "610px",
    margin: "10px",
  },
];
const Nav = styled.nav`
  height: 71px;
  display: ${(props) => props.display};
  position: fixed;
  width: 100%;
  background: white;
  z-index: 100;
  top: 0;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  @media ${Devices.xxs} {
  }
  @media ${Devices.xs} {
  }
  @media ${Devices.sm} {
  }
  @media ${Devices.tablet} {
    display: ${(props) => props.display_tablet};
  }
  @media ${Devices.md} {
    display: ${(props) => props.display_md};
  }
  @media ${Devices.lg} {
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;
const Menu = styled.ul`
  display: flex;
`;
const MenuItem = styled.li`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0.5rem;
  text-align: center;
  font-family: lato, sans-serif;
`;

export const Navbar = ({
  lang,
  currentURL,
  menu,
  open,
  button,
  onToggle,
  languageButton,
  onLocationChange,
  locationCity,
}) => {
  const { session, setSession } = useContext(SessionContext);
  const [status, setStatus] = useState({
    toggle: false,
    hovered: false,
    itemIndex: null,
  });

  //This Function prevents troubles when component renders during cypress test process
  const isDevelopment = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      return true;
      // dev code
    }
    return false;
  };

  let city = session && session.location ? session.location.city : [];
  let currentLocation = locationCity ? locationCity : [];
  const [buttonText, setButtonText] = useState("");
  const [contentBar, setContentBar] = useState({});
  /* In case of want change the Button text "Aplica" search the key 
       "apply_button_text" in /src/data/location/locationfile.yaml
    */
  let findCity = currentLocation.find((loc) => loc.node?.city === city);
  useEffect(() => {
    if (findCity !== undefined && findCity.node) {
      setButtonText(findCity.node.button.apply_button_text);
      setContentBar(findCity.node.custom_bar);
    }
  }, [findCity]);

  const data = useStaticQuery(graphql`
    query {
      allChooseProgramYaml {
        edges {
          node {
            programs {
              text
              link
              visibility
              location_bc_slug
              schedule
            }
            fields {
              lang
            }
            open_button_text
            close_button_text
          }
        }
      }
      file(relativePath: { eq: "images/4geeks-logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED # --> CONSTRAINED || FIXED || FULL_WIDTH
            width: 125
            placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
          )
          #   fixed(width: 125) {
          #     ...GatsbyImageSharpFixed
          #   }
        }
      }
    }
  `);
  const parsedUrl =
    typeof window !== "undefined" ? new URL(window.location.href) : false;
  const isTestMode = parsedUrl
    ? parsedUrl.searchParams.get("test") === "true"
    : false;
  const isContentBarActive =
    (contentBar.active && isTestMode) ||
    (contentBar.active && !isDevelopment());
  return (
    <>
      <CustomBar
        isContentBarActive={isContentBarActive}
        contentBar={contentBar}
      />
      <Nav
        display_md="flex"
        display="none"
        style={{ top: `${isContentBarActive ? "50px" : "0px"}` }}
      >
        <Link to={lang == "es" ? "/es/inicio" : "/"}>
          <GatsbyImage
            // fadeIn={false}
            loading="eager"
            image={getImage(data.file.childImageSharp.gatsbyImageData)}
            // fixed={data.file.childImageSharp.fixed}
            alt="4Geeks Logo"
          />
        </Link>
        <Menu>
          {menu &&
            menu.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() =>
                    setStatus({
                      ...status,
                      toggle: !status.toggle,
                      itemIndex: index,
                    })
                  }
                >
                  <H3
                    type="h3"
                    margin="0 5px 0 0"
                    fontSize="13px"
                    lineHeight="16px"
                    fontWeight="400"
                  >
                    {index === menu.length - 1 ? (
                      <Link to={item.link}>{item.name}</Link>
                    ) : (
                      item.name
                    )}
                  </H3>
                  {index !== menu.length - 1 && <Icon icon="arrowdown" />}
                </MenuItem>
              );
            })}
          <MegaMenu status={status} setStatus={setStatus} menu={menu} />
        </Menu>
        <Div alignItems="center" justifyContent="between">
          <Link
            to={
              session && session.pathsDictionary && currentURL
                ? `${session.pathsDictionary[currentURL] || ""}${
                    languageButton.link
                  }`
                : "/?lang=en#home"
            }
          >
            <Paragraph
              dangerouslySetInnerHTML={{ __html: languageButton.text }}
              fontSize="13px"
              margin="0 50px 0 0"
              fontWeight="400"
              lineHeight="16px"
            ></Paragraph>
          </Link>
          <Link onClick={onToggle} to={button.button_link || "#"}>
            <Button
              variant="full"
              width="fit-content"
              color={Colors.black}
              textColor={Colors.white}
            >
              {buttonText || button.apply_button_text}
            </Button>
          </Link>
        </Div>
      </Nav>
    </>
  );
};

const CampusMenu = ({ status, setStatus, menu }) => {
  let campusIndex = menu.map((e) => e.name).indexOf("Campus");
  const [activeOpt, setActiveOpt] = useState({
    ...menu[campusIndex].sub_menu.links[0],
  });

  return (
    <>
      <Div id="menu-container" width="100%">
        <Div id="options-container" flexDirection="column" width="33%">
          {Array.isArray(menu[status.itemIndex].sub_menu.links) &&
            menu[status.itemIndex].sub_menu.links.map((m, i) => (
              <Button
                color={activeOpt.title === m.title ? Colors.black : Colors.gray}
                borderLeft={
                  activeOpt.title === m.title
                    ? `5px solid ${Colors.blue}`
                    : null
                }
                borderRadius="none"
                padding="10px"
                onClick={() => {
                  setActiveOpt({ ...m });
                }}
              >
                {m.title}
              </Button>
            ))}
        </Div>
        <Div
          id="links-container"
          flexDirection="column"
          flexWrap="wrap"
          maxHeight="330px"
        >
          {activeOpt.sub_links != undefined &&
            Array.isArray(activeOpt.sub_links) &&
            activeOpt.sub_links.map((l, i) => {
              return (
                <Link to={l.link_to} key={i}>
                  <Div
                    margin="2px 5px 2px 0"
                    padding="10px 0 10px 18px"
                    backgroundHover={`#E6F5FB`}
                    borderRadius="3px"
                    alignItems="baseline"
                  >
                    <H3
                      textAlign="left"
                      width="fit-content"
                      fontSize="15px"
                      lineHeight="20px"
                      fontWeight="400"
                      margin="0 5px 0 0"
                    >
                      {l.title}
                    </H3>
                    <Icon
                      icon="arrow-right"
                      color="#A4A4A4"
                      width="8px"
                      height="8px"
                    />
                  </Div>
                </Link>
              );
            })}
        </Div>
      </Div>
    </>
  );
};

export const MegaMenu = ({ status, setStatus, menu }) => {
  return (
    <>
      {status.toggle &&
        status.itemIndex !== null &&
        status.itemIndex !== menu.length - 1 && (
          <MegaMenuContainer
            onMouseLeave={() => {
              setStatus({ ...status, hovered: false });
              setTimeout(() => {
                setStatus((_status) => ({
                  ..._status,
                  toggle: _status.hovered,
                }));
              }, 300);
            }}
            display="block"
            maxHeight="500px"
            background="white"
            transform={MegaMenuPositions[status.itemIndex].transform}
            width={MegaMenuPositions[status.itemIndex].width}
            padding_tablet="30px 30px 45px 30px"
            position="absolute"
            top="100px"
            left={
              status.itemIndex == 0
                ? "0"
                : MegaMenuPositions[status.itemIndex].left
            }
            zIndex_tablet="1"
            borderRadius="3px"
            minWidth_tablet={status.itemIndex == 0 ? "100%" : "432px"}
            maxWidth_tablet="100%"
            minHeight_tablet="347px"
            boxShadow_tablet="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
            boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
          >
            <Triangle left={MegaMenuPositions[status.itemIndex].leftTriangle} />
            <Grid
              gridTemplateColumns_tablet="repeat(12, 1fr)"
              gridTemplateRows="2"
              width="100%"
            >
              <Div
                borderBottom_tablet="1px solid #EBEBEB"
                gridArea_tablet="1/1/1/13"
                padding="0 0 27px 0"
                margin={MegaMenuPositions[status.itemIndex].margin}
              >
                {menu[status.itemIndex].sub_menu.icon && (
                  <Div margin="0 15px 0 0">
                    <Icon
                      icon={menu[status.itemIndex].sub_menu.icon}
                      width="43px"
                      height="34px"
                    />
                  </Div>
                )}
                <Div flexDirection="column">
                  {status.itemIndex != null && (
                    <Link
                      to={
                        menu[status.itemIndex].sub_menu.link &&
                        menu[status.itemIndex].sub_menu.link
                      }
                    >
                      <Div alignItems="baseline" margin="5px 0 ">
                        <H3
                          textAlign="left"
                          width="fit-content"
                          fontSize="15px"
                          lineHeight="20px"
                          fontWeight="400"
                          margin="0 5px 0 0"
                        >
                          {menu[status.itemIndex].sub_menu.title}
                        </H3>
                        {menu[status.itemIndex].sub_menu.link && (
                          <Icon
                            icon="arrow-right"
                            color="#A4A4A4"
                            width="8px"
                            height="8px"
                          />
                        )}
                      </Div>
                    </Link>
                  )}
                  {/* <H3 textAlign="left" fontSize="15px" lineHeight="22px" fontWeight="900" margin="0 0 5px 0">{status.itemIndex != null && menu[status.itemIndex].sub_menu.title}</H3> */}
                  {menu[status.itemIndex].sub_menu.paragraph
                    .split("\n")
                    .map((d, i) => (
                      <Paragraph
                        textAlign="left"
                        color={Colors.darkGray}
                        key={i}
                      >
                        {d}
                      </Paragraph>
                    ))}
                </Div>
              </Div>

              <Div gridArea_tablet="2/1/2/13">
                <Grid
                  gridTemplateColumns_tablet={`repeat(${
                    menu[status.itemIndex].sub_menu.links.length
                  }, 1fr)`}
                  width="100%"
                >
                  {menu[status.itemIndex].name !== "Campus" &&
                    Array.isArray(menu[status.itemIndex].sub_menu.links) &&
                    menu[status.itemIndex].sub_menu.links.map((m, i) => {
                      return (
                        <Div flexDirection="column" key={i}>
                          {m.icon && (
                            <Icon icon={m.icon} width="100px" height="73px" />
                          )}
                          {m.level && (
                            <H4
                              textAlign="left"
                              margin="19px 0 5px 0"
                              fontSize="15px"
                              fontWeight="400"
                              lineHeight="22px"
                            >
                              {m.level}
                            </H4>
                          )}
                          <H3
                            textAlign="left"
                            fontSize="15px"
                            lineHeight="22px"
                            fontWeight="900"
                            margin="0 0 5px 0"
                          >
                            {m.title != "-" ? m.title : <span>&nbsp;</span>}
                          </H3>
                          {m.paragraph && (
                            <Paragraph textAlign="left">
                              {m.paragraph}
                            </Paragraph>
                          )}
                          {m.buttons != undefined && (
                            <Div>
                              {Array.isArray(m.buttons) &&
                                m.buttons.map((m, i) => {
                                  return (
                                    <Link to={m.link} key={i}>
                                      <Button
                                        variant="outline"
                                        color="black"
                                        font='"Lato", sans-serif'
                                        width="fit-content"
                                        margin="20px 10px 0 0"
                                        pointer
                                        textColor={Colors.black}
                                        fontSize={"13px"}
                                        borderRadius="3px"
                                        padding="10px"
                                      >
                                        {m.text}
                                      </Button>
                                    </Link>
                                  );
                                })}
                            </Div>
                          )}
                          {m.sub_links != undefined &&
                            Array.isArray(m.sub_links) &&
                            m.sub_links.map((m, i) => {
                              return (
                                <Link to={m.link_to} key={i}>
                                  <Div
                                    margin="2px 0"
                                    padding="10px 0 10px 18px"
                                    backgroundHover={`#E6F5FB`}
                                    borderRadius="3px"
                                    alignItems="baseline"
                                  >
                                    <H3
                                      textAlign="left"
                                      width="fit-content"
                                      fontSize="15px"
                                      lineHeight="20px"
                                      fontWeight="400"
                                      margin="0 5px 0 0"
                                    >
                                      {m.title}
                                    </H3>
                                    <Icon
                                      icon="arrow-right"
                                      color="#A4A4A4"
                                      width="8px"
                                      height="8px"
                                    />
                                  </Div>
                                </Link>
                              );
                            })}
                        </Div>
                      );
                    })}
                </Grid>
              </Div>
            </Grid>
            {menu[status.itemIndex].name === "Campus" && (
              <CampusMenu status={status} setStatus={setStatus} menu={menu} />
            )}
          </MegaMenuContainer>
        )}
    </>
  );
};
