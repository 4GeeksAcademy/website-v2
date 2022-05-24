import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { Devices } from "../Responsive";
import { Colors, Button, Link } from "../Styling";
import { Div } from "../Sections";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Nav = styled.nav`
  height: 71px;
  gap: 40px;
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

const LandingNavbar = ({ lang, onToggle, buttonUrl, logoUrl, buttonText }) => {
  /* In case of want change the Button text "Aplica" search the key 
       "apply_button_text" in /src/data/location/locationfile.yaml
    */

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
        }
      }
    }
  `);
  return (
    <>
      <Nav display="flex">
        <Link to={logoUrl || "#top"}>
          <GatsbyImage
            loading="eager"
            image={getImage(data.file.childImageSharp.gatsbyImageData)}
            alt="4Geeks Logo"
          />
        </Link>
        <Div alignItems="center" justifyContent="between">
          <Link onClick={onToggle} to={buttonUrl || "#"}>
            <Button
              variant="full"
              width="fit-content"
              color={Colors.black}
              textColor={Colors.white}
            >
              {buttonText}
            </Button>
          </Link>
        </Div>
      </Nav>
    </>
  );
};

export default LandingNavbar;
