import React, { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { Devices } from "../Responsive";
import { SessionContext } from "../../session";
import { H3, H4, Paragraph } from "../Heading";
import { Colors, Button, Anchor, Link } from "../Styling";
import { Div, Grid } from "../Sections";
import Icon from "../Icon";
import { locByLanguage } from "../../actions";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BurgerIcon = (props) => (
  <svg
    width="28"
    height="23"
    style={props.style}
    onClick={props.onClick}
    viewBox="0 0 28 23"
    fill="none"
    xmlns="https:://www.w3.org/2000/svg"
  >
    <line
      x1="1"
      y1="1"
      x2="27"
      y2="1"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="1"
      y1="11.5"
      x2="17.0645"
      y2="11.5"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="1"
      y1="22"
      x2="27"
      y2="22"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MegaMenuContainer = styled(Div)`
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  transform: ${(props) => props.transform};
`;
const SecondaryMenuContainer = styled(Div)``;
const Nav = styled.nav`
  height: 71px;
  display: ${(props) => props.display};
  position: fixed;
  width: 100%;
  background: white;
  z-index: 10;
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
  flex-direction: column;
  padding: 24px 17px;
`;
const MenuItem = styled.li`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0 30px 0;
  text-align: center;
  font-family: lato, sans-serif;
`;

const langDictionary = {
  us: "es",
  es: "us",
};

const parsedUrl =
  typeof window !== "undefined" ? new URL(window.location.href) : false;

export const isTestMode = parsedUrl
  ? parsedUrl.searchParams.get("test") === "true"
  : false;

export const NavbarMobile = ({
  lang,
  menu,
  open,
  button,
  onToggle,
  languageButton,
  onLocationChange,
  currentURL,
  locationCity,
}) => {
  const { session } = useContext(SessionContext);
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
  // let buttonText = session.location ? session.location.button.apply_button_text : button.apply_button_text

  let city = session && session.location ? session.location.city : [];

  const [contentBar, setContentBar] = useState({});

  let currentLocation = locationCity ? locationCity : [];
  const [buttonText, setButtonText] = useState("");

  /* In case of want change the Button text "Aplica" search the key 
        "apply_button_text" in /src/data/location/locationfile.yaml
    */
  let findCity = currentLocation.find((loc) => loc.node?.city === city);

  let isCustombarActive =
    session && session.location && session.location.custom_bar.active;
  const isContentBarActive =
    (contentBar?.active && isTestMode) ||
    (contentBar?.active && !isDevelopment());

  useEffect(() => {
    if (findCity !== undefined)
      setButtonText(findCity.node.button.apply_button_text);
    setContentBar(findCity?.node.custom_bar);
  }, [findCity]);

  //console.log(contentBar, currentLocation, session, findCity)

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/4geeksacademy-logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED # --> CONSTRAINED || FIXED || FULL_WIDTH
            width: 125
            placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
          )
        }
      }
      allLocationYaml {
        edges {
          node {
            city
            name
            latitude
            longitude
            phone
            socials {
              name
              icon
              link
            }
            country
            country_shortname
            defaultLanguage
            breathecode_location_slug
            active_campaign_location_slug
            gdpr_compliant
            in_person_available
            online_available
            meta_info {
              slug
              visibility
              position
              region
              dialCode
            }
            button {
              apply_button_text
              syllabus_button_text
            }
            custom_bar {
              active
            }
          }
        }
        nodes {
          fields {
            file_name
            lang
            slug
          }
        }
      }
    }
  `);

  const locations = locByLanguage(data.allLocationYaml, langDictionary[lang]);

  const spacer = (isContentBarActive, contentBar) => {
    if (isContentBarActive && contentBar?.button == null) {
      return "50px";
    } else if (isContentBarActive && contentBar?.button != null) {
      return "85px";
    } else {
      return "0px";
    }
  };

  return (
    <>
      <Nav
        display_md="none"
        style={{
          top: `${spacer(isContentBarActive, contentBar)}`,
        }}
        display="flex"
      >
        <Div alignItems="center">
          <BurgerIcon
            style={{ marginRight: "16px", cursor: "pointer" }}
            onClick={() => setStatus({ ...status, toggle: !status.toggle })}
          />
          <Link to={lang == "es" ? "/es/inicio" : "/"}>
            <GatsbyImage
              // fadeIn={false}
              loading="eager"
              image={getImage(data.file.childImageSharp.gatsbyImageData)}
              alt="4Geeks Logo"
            />
          </Link>
        </Div>
        <MegaMenu
          status={status}
          setStatus={setStatus}
          menu={menu}
          session={session}
          currentURL={currentURL}
          languageButton={languageButton}
          locations={locations}
          lang={lang}
        />
        <Div alignItems="center" justifyContent="between">
          <Link onClick={onToggle} to={button.button_link || "#"}>
            <Button
              variant="full"
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
      <Div id="menu-container" width="100%" flexDirection="column">
        <Div
          id="options-container"
          justifyContent_tablet="center"
          justifyContent_xs="between"
          textAlign="center"
        >
          {Array.isArray(menu[status.itemIndex].sub_menu.links) &&
            menu[status.itemIndex].sub_menu.links.map((m, i) => (
              <Button
                color={activeOpt.title === m.title ? Colors.black : Colors.gray}
                width="33%"
                borderBottom={
                  activeOpt.title === m.title
                    ? `5px solid ${Colors.blue}`
                    : null
                }
                borderRadius="none"
                padding="10px"
                display="inline-block"
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
          maxHeight="400px"
          alignContent="flex-start"
          overflowWrap="break-word"
        >
          {activeOpt.sub_links != undefined &&
            Array.isArray(activeOpt.sub_links) &&
            activeOpt.sub_links.map((l, i) => {
              return (
                <Link to={l.link_to} key={i} style={{ maxWidth: "150px" }}>
                  <Div
                    margin_tablet="2px 50px 2px 0"
                    margin_sm="2px 30px 2px 0"
                    margin_xs="2px 10px 2px 0"
                    margin_xxs="2px 5px 2px 0"
                    padding="10px 0 10px 18px"
                    padding_xs="10px 0 10px 0"
                    backgroundHover={`#E6F5FB`}
                    borderRadius="3px"
                    alignItems="baseline"
                    // width_tablet="20%"
                    // width_xs="30%"
                    // maxWidth="50%"
                  >
                    <H3
                      textAlign="left"
                      width="fit-content"
                      // maxWidth="200px"
                      fontSize="15px"
                      lineHeight="20px"
                      fontWeight="400"
                      // margin="0 5px 0 0"
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

export const MegaMenu = ({
  status,
  setStatus,
  menu,
  languageButton,
  currentURL,
  session,
  locations,
  lang,
}) => {
  const { setSession } = useContext(SessionContext);
  return (
    <>
      {status.toggle && (
        <MegaMenuContainer
          // onMouseLeave={() => {
          //   setStatus({ ...status, hovered: false });
          //   setTimeout(() => {
          //     setStatus((_status) => ({ ..._status, toggle: _status.hovered }));
          //   }, 300);
          // }}
          flexDirection="column"
          position="absolute"
          background={Colors.white}
          borderRadius="3px"
          top="60px"
          width="85%"
          left="0"
          bottom="0"
          height="100vh"
          zIndex="100"
          boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
        >
          <Div
            background={Colors.lightGray}
            height="61px"
            alignItems="center"
            padding="24px 17px"
            justifyContent="between"
          >
            {status.toggle &&
            status.itemIndex != null &&
            status.itemIndex != menu.length - 1 ? (
              <>
                {status.itemIndex != null && (
                  <Link
                    to={
                      menu[status.itemIndex].sub_menu.link &&
                      menu[status.itemIndex].sub_menu.link
                    }
                    style={{ display: "contents" }}
                  >
                    <Icon
                      icon="arrowleft"
                      color="#000000"
                      width="16px"
                      height="16px"
                      style={{ cursor: "pointer" }}
                      onClick={() => setStatus({ ...status, itemIndex: null })}
                    />

                    <Div alignItems="center">
                      {menu[status.itemIndex].sub_menu.icon && (
                        <Icon
                          icon={menu[status.itemIndex].sub_menu.icon}
                          width="43px"
                          height="34px"
                        />
                      )}
                      <H3
                        textAlign="center"
                        fontSize="13px"
                        margin="0 30px 0 0"
                        fontWeight="400"
                        lineHeight="16px"
                      >
                        {menu[status.itemIndex].sub_menu.title}
                      </H3>
                    </Div>
                  </Link>
                )}
                <Icon
                  icon="cross"
                  color="#000000"
                  width="12px"
                  height="12px"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setStatus({ ...status, toggle: false, itemIndex: null })
                  }
                />
              </>
            ) : (
              <Link
                onClick={() =>
                  setSession({
                    ...session,
                    language: langDictionary[lang],
                    locations,
                  })
                }
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
                  fontWeight="400"
                  lineHeight="16px"
                ></Paragraph>
              </Link>
            )}
            {/* {
                            
                        }
                        <H3 textAlign="center" fontSize="13px" margin="0 30px 0 0" fontWeight="400" lineHeight="16px">{status.toggle && status.itemIndex != null && status.itemIndex != menu.length - 1 ? menu[status.itemIndex].sub_menu.title : "ENG / ESP"}</H3>
                        {status.toggle && status.itemIndex != null && status.itemIndex != menu.length - 1 && } */}
          </Div>

          {status.toggle && status.itemIndex == null && (
            <Menu>
              {menu &&
                menu.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => setStatus({ ...status, itemIndex: index })}
                    >
                      {index != menu.length - 1 ? (
                        <>
                          <H3
                            textAlign="left"
                            width="fit-content"
                            margin="0 5px 0 0"
                            fontSize="13px"
                            lineHeight="16px"
                            fontWeight="400"
                          >
                            {item.name}
                          </H3>
                          <Icon
                            icon="arrow-right"
                            color="#000000"
                            width="12px"
                            height="12px"
                          />
                        </>
                      ) : (
                        <Link to={item.link}>
                          <H3
                            textAlign="left"
                            width="fit-content"
                            margin="0 5px 0 0"
                            fontSize="13px"
                            lineHeight="16px"
                            fontWeight="400"
                          >
                            {item.name}
                          </H3>
                        </Link>
                      )}
                    </MenuItem>
                  );
                })}
            </Menu>
          )}
          <Div flexDirection="column" padding="24px 17px">
            {status.itemIndex != null &&
              menu[status.itemIndex].name === "Campus" && (
                <CampusMenu status={status} setStatus={setStatus} menu={menu} />
              )}
            {status.itemIndex != null &&
              menu[status.itemIndex].name !== "Campus" &&
              status.itemIndex != menu.length - 1 && (
                <>
                  {Array.isArray(menu[status.itemIndex].sub_menu.links) &&
                    menu[status.itemIndex].sub_menu.links.map((m, i) => {
                      return (
                        <React.Fragment key={i}>
                          {m.title != "-" && (
                            <H3
                              textAlign="left"
                              fontSize="15px"
                              lineHeight="22px"
                              fontWeight="900"
                              margin="15px 0 5px 0"
                            >
                              {m.title}
                            </H3>
                          )}
                          {m.sub_links != undefined &&
                            Array.isArray(m.sub_links) &&
                            m.sub_links.map((m, i) => {
                              return (
                                <Link to={m.link_to} key={i}>
                                  <Div alignItems="baseline" margin="10px 0 ">
                                    <H3
                                      textAlign="left"
                                      width="fit-content"
                                      fontSize="15px"
                                      lineHeight="22px"
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
                          {m.buttons != undefined && (
                            <Div flexDirection="column">
                              {Array.isArray(m.buttons) &&
                                m.buttons.map((m, i) => {
                                  return (
                                    <Link to={m.link} key={i}>
                                      <Div alignItems="baseline">
                                        <H3
                                          textAlign="left"
                                          width="fit-content"
                                          fontSize="15px"
                                          lineHeight="22px"
                                          fontWeight="400"
                                          margin="10px 5px 0 0"
                                        >
                                          {m.text}
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
                          )}
                        </React.Fragment>
                      );
                    })}
                </>
              )}
          </Div>
        </MegaMenuContainer>
      )}
    </>
  );
};

// {status.toggle && status.itemIndex != null && status.itemIndex != menu.length - 1 &&
//     <MegaMenuContainer
//         onMouseLeave={() => {
//             setStatus({...status, hovered: false});
//             setTimeout(() => {
//                 setStatus(_status => ({..._status, toggle: _status.hovered}));
//             }, 300)
//         }}
//         background="white" transform={MegaMenuPositions[status.itemIndex].transform} padding_tablet="30px 30px 45px 30px" position="absolute" top="100px" left={status.itemIndex == 0 ? "0" : MegaMenuPositions[status.itemIndex].left} zIndex_tablet="1" borderRadius="3px" minWidth_tablet={status.itemIndex == 0 ? "100%" : "432px"} maxWidth_tablet="100%" minHeight_tablet="347px" boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" >
//         <Grid gridTemplateColumns_tablet="repeat(12, 1fr)" gridTemplateRows="2" width="100%">
//             <Div borderBottom_tablet="1px solid #EBEBEB" gridArea_tablet="1/1/1/13" padding="0 0 27px 0" margin="0 0 50px 0">
//                 {menu[status.itemIndex].sub_menu.icon && <Div margin="0 15px 0 0"><Icon icon={menu[status.itemIndex].sub_menu.icon} width="43px" height="34px" /></Div>}
//                 <Div flexDirection="column" >
//                     <H3 textAlign="left" fontSize="15px" lineHeight="22px" fontWeight="900" margin="0 0 5px 0">{status.itemIndex != null && menu[status.itemIndex].sub_menu.title}</H3>
// {menu[status.itemIndex].sub_menu.paragraph.split('\n').map((d, i) =>
//     <Paragraph
//         textAlign="left"
//         color={Colors.darkGray}
//         key={i}                        >
//         {d}
//     </Paragraph>
// )}
//                 </Div>
//             </Div>
//             <Div gridArea_tablet="2/1/2/13" >
//                 <Grid gridTemplateColumns_tablet={`repeat(${menu[status.itemIndex].sub_menu.links.length}, 1fr)`} width="100%">
//                     {Array.isArray(menu[status.itemIndex].sub_menu.links) && menu[status.itemIndex].sub_menu.links.map((m, i) => {
//                         return (
//                             <Div flexDirection="column" key={i}>
//                                 {m.icon && <Icon icon={m.icon} width="100px" height="73px" />}
//                                 {m.level && <H4 textAlign="left" margin="19px 0 5px 0" fontSize="15px" fontWeight="400" lineHeight="22px">{m.level}</H4>}
//                                 <H3 textAlign="left" fontSize="15px" lineHeight="22px" fontWeight="900" margin="0 0 5px 0">{m.title}</H3>
//                                 {m.paragraph && <Paragraph textAlign="left">{m.paragraph}</Paragraph>}
//                                 {m.buttons != undefined &&
//                                     <Div>
//                                         {Array.isArray(m.buttons) && m.buttons.map((m, i) => {
//                                             return (
//                                                 <Button
//                                                     outline
//                                                     color="black"
//                                                     font='"Lato", sans-serif'
//                                                     width="fit-content"
//                                                     margin="20px 10px 0 0"
//                                                     pointer
//                                                     textColor={Colors.black}
//                                                     fontSize={"13px"}
//                                                     borderRadius="3px" padding="10px"
//                                                 >
//                                                     {m.text}
//                                                 </Button>
//                                             )
//                                         })}
//                                     </Div>
//                                 }
// {m.sub_links != undefined && Array.isArray(m.sub_links) && m.sub_links.map((m, i) => {
//     return (
//         <Link to={m.link_to} key={i}><Div alignItems="baseline" margin="5px 0 "><H3 textAlign="left" width="fit-content" fontSize="15px" lineHeight="20px" fontWeight="400" margin="0 5px 0 0">{m.title}</H3><Icon icon="arrow-right" color="#A4A4A4" width="8px" height="8px" /></Div></Link>
//     )
// })}

//                             </Div>
//                         )
//                     })}
//                 </Grid>
//             </Div>
//         </Grid>
//     </MegaMenuContainer>
// }
