import React, { useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import LeadForm from "../LeadForm";
import { H1, H2, Paragraph } from "../Heading";
import { Div, GridContainer } from "../Sections";
import { Colors } from "../Styling";
import { Circle } from "../BackgroundDrawing";
import Icon from "../Icon";
import LandingContainer from "../LandingContainer";
import Marquee_v2 from "../Marquee_v2";
import { SessionContext } from "../../session.js";
import { processFormEntry } from "../../actions";

const LandingHeader = (props) => {
  const { setLocation } = React.useContext(SessionContext);
  const { pageContext, yml, preData, locations, programs } = props;
  const [inLocation, setInLocation] = React.useState("");

  useEffect(() => {
    if (yml.meta_info && yml.meta_info.utm_location)
      setLocation(yml.meta_info?.utm_location[0]);

    const urlParams = new URLSearchParams(window.location.search);
    const _inLoc = urlParams.get("in") || null;
    if (_inLoc && _inLoc != "")
      setInLocation(_inLoc.replace(/^\w/, (c) => c.toUpperCase()) + " ");
  }, []);

  const bulletIcons = [
    {
      icon: "square-bracket-fill",
      background: "#000",
    },
    {
      icon: "curly-bracket-fill",
      background: "#FFB718",
    },
    {
      icon: "elderly-fill",
      background: "#0097CF",
      transform: "rotate(180deg)",
    },
  ];

  return (
    <>
      <LandingContainer
        filter={yml.header_data.image_filter}
        image={
          yml.header_data?.background_image &&
          yml.header_data.background_image.childImageSharp.gatsbyImageData
        }
        badge={
          yml.header_data?.badge &&
          yml.header_data.badge.childImageSharp.gatsbyImageData
        }
        background={yml.header_data.background || Colors.white}
      >
        <GridContainer
          style={{ maxWidth: "1366px" }}
          margin="0 auto"
          padding="95px 0 35px 0"
          containerGridGap="0"
          containerColumns_tablet="repeat(1,0fr)"
          padding_tablet="72px 0 35px 0"
          columns_tablet="2"
        >
          <Div
            display_tablet="flex"
            flexDirection="column"
            width="100%"
            size_tablet="10"
            size="12"
            alignItems="center"
            alignItems_tablet="flex-start"
            margin="0 0 0 auto"
            padding_xs="0 10px"
            height="auto"
            padding_tablet="40px 0 0 0"
          >
            {yml.header_data.partner_logo_url && (
              <>
                <Div
                  width="242px"
                  flexDirection_tablet="column"
                  height="auto"
                  padding="0 0 25px 0"
                >
                  <GatsbyImage
                    loading="eager"
                    imgStyle={{ objectFit: "contain" }}
                    image={getImage(
                      yml.header_data.partner_logo_url.childImageSharp
                        .gatsbyImageData
                    )}
                    alt="4Geeks Logo"
                  />
                </Div>

                <Div
                  display="none"
                  display_tablet="flex"
                  background="#FFFFFF"
                  width="calc(50% - 30px)"
                  height="2px"
                  margin="7px 0"
                />
              </>
            )}
            <H1
              zIndex="1"
              type="h1"
              variant="main"
              lineHeight="normal"
              lineHeight_tablet="normal"
              margin="20px 0"
              margin_xs="10px 0"
              padding="0 10px 0 0px"
              color={
                yml.header_data.tagline_color
                  ? yml.header_data.tagline_color
                  : yml.header_data.background
                  ? Colors.black
                  : Colors.white
              }
              fontSize="32px"
              fontSize_tablet="52px"
              fontWeight="700"
              textAlign="left"
            >
              {inLocation}
              {yml.header_data.tagline}
            </H1>
            {yml.header_data.sub_heading !== "" && (
              <H2
                zIndex="1"
                type="h2"
                textAlign="left"
                fontSize="18px"
                color={yml.header_data.background ? Colors.black : Colors.white}
                variant="main"
                fontWeight="bolder"
              >
                {yml.header_data.sub_heading}
              </H2>
            )}

            {Array.isArray(yml.features.bullets) &&
              yml.features.bullets.map((f, i) => (
                <Paragraph
                  zIndex="1"
                  key={i}
                  fontSize="21px"
                  style={{
                    ...JSON.parse(yml.features.styles),
                    fontWeight: "bolder",
                  }}
                  margin="8px 0"
                  padding="0px 20px"
                  textAlign="left"
                  color={
                    yml.header_data.background ? Colors.black : Colors.white
                  }
                >
                  <Icon
                    style={{
                      background:
                        bulletIcons[i % bulletIcons.length].background,
                      padding: "5px",
                      transform: bulletIcons[i % bulletIcons.length]?.transform,
                      fontWeight: "bolder",
                    }}
                    width="20px"
                    height="20px"
                    icon={bulletIcons[i % bulletIcons.length].icon}
                    color="white"
                  />

                  {" " + f}
                </Paragraph>
              ))}
            {yml.features.text && (
              <Paragraph
                isActive
                fontSize="18px"
                color={yml.header_data.background ? Colors.black : Colors.white}
                style={JSON.parse(yml.features.styles)}
                margin="7px 0"
                padding_tablet="0px 0px"
                padding="0px 20px"
                textAlign="left"
                dangerouslySetInnerHTML={{ __html: yml.features.text }}
              />
            )}
            {yml.short_badges && (
              <Marquee_v2
                speed={1.5}
                reversed={false}
                containerstyle={{
                  height: "160px",
                  width: "100%",
                }}
              >
                <Div
                  className="badge-slider"
                  justifyContent="center"
                  padding="44px 0"
                >
                  {Array.isArray(yml.short_badges) &&
                    yml.short_badges.map((l, i) => {
                      return (
                        <GatsbyImage
                          key={i}
                          draggable={false}
                          style={{
                            height: "65px",
                            minWidth: "165px",
                            width: "165px",
                          }}
                          imgStyle={{ objectFit: "contain" }}
                          alt={l.alt}
                          image={getImage(
                            l.image != null &&
                              l.image.childImageSharp.gatsbyImageData
                          )}
                        />
                      );
                    })}
                </Div>
              </Marquee_v2>
            )}
          </Div>
          <Div
            position="relative"
            flexDirection="column"
            size="12"
            size_tablet="10"
            width="100%"
            width_tablet="65%"
            // size_lg="4"
            // size_sm="6"
            // size_xs="12"
            margin="0"
            textAlign_sm="center"
            margin_md={yml.form.margin_md || "0 auto 0 70px"}
          >
            <Div
              top="0"
              position="absolute"
              display="none"
              display_tablet="block"
              zIndex="0"
            >
              <Circle color="lightBlue" width="301px" height="301px" />
              <Icon
                style={{ marginTop: "150%" }}
                icon="elderly-unfill"
                width="135px"
                height="184px"
                color="#0097CD"
              />
            </Div>
            <Div
              position="absolute"
              right="50%"
              display_tablet="none"
              zIndex="0"
            >
              <Circle
                color="lightBlue"
                width="301px"
                height="301px"
                position="unset"
              />
              <Div display_tablet="none" margin="100% auto">
                <Icon
                  style={{ marginTop: "90%" }}
                  icon="slash-fill"
                  width="41px"
                  height="111px"
                  color="#C7F3FD"
                />
                <Icon
                  style={{ marginTop: "90%" }}
                  icon="slash-fill"
                  width="41px"
                  height="111px"
                  color="#020203"
                />
                <Icon
                  style={{ marginTop: "90%" }}
                  icon="elderly-fill"
                  width="82px"
                  height="112px"
                  color="#FFB718"
                />
              </Div>
            </Div>
            <LeadForm
              landingTemplate
              headerImage={
                yml.header_data.badge &&
                yml.header_data.badge.childImageSharp.gatsbyImageData
              }
              background={
                yml.header_data.background === "#FFF1D1"
                  ? Colors.white
                  : "#FFF1D1"
              }
              margin_tablet="18px 38px"
              selectProgram={programs}
              selectLocation={locations}
              margin="18px 10px"
              marginTop_tablet="50px"
              // marginTop_xs="20px"
              style={{
                zIndex: "1",
                minHeight: "350px",
                border: "3px solid black",
              }}
              formHandler={processFormEntry}
              heading={yml.form.heading}
              motivation={yml.form.motivation}
              sendLabel={yml.form.button_label}
              redirect={yml.form.redirect}
              inputBgColor="#FFFFFF"
              layout="block"
              lang={pageContext.lang}
              fields={yml.form.fields}
              data={preData}
              justifyContentButton="center"
              marginButton="0 auto 30px auto"
              marginButton_tablet="0 0 30px auto"
              boxShadow="9px 8px 0px 0px rgba(0,0,0,1)"
            />
            <Div display="none" display_tablet="block" margin="20% 0 0 0">
              <Icon
                icon="slash-fill"
                width="41px"
                height="111px"
                color="#C7F3FD"
              />
              <Icon
                icon="slash-fill"
                width="41px"
                height="111px"
                color="#020203"
              />
              <Icon
                icon="elderly-fill"
                width="82px"
                height="112px"
                color="#FFB718"
              />
            </Div>
          </Div>
        </GridContainer>
      </LandingContainer>
    </>
  );
};

export default LandingHeader;