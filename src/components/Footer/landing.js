import React from "react";
import styled from "styled-components";
import { Div, GridContainer } from "../Sections";
import { Colors, RoundImage, Anchor } from "../Styling";
import { H4 } from "../Heading";
import { Link } from "gatsby";
import { Devices } from "../Responsive";
import { SessionContext } from "../../session";
import Icon from "../Icon";

const LandingFooter = ({ yml }) => {
  const { session } = React.useContext(SessionContext);
  let socials = session && session.location ? session.location.socials : [];

  return (
    <>
      <GridContainer margin="44px 0" margin_tablet="0 0 40px 0">
        <Div background="#EBEBEB" height="1px" />
      </GridContainer>
      <GridContainer
        github="/components/footer"
        // gridTemplateRows_tablet="2"
        // columns_tablet="12"
        justifyItems="center"
        padding="0 17px"
        margin="0 0 60px 0"
      >
        <Div
          justifyContent="center"
          alignItems="center"
          height="143px"
          width="230px"
          justifySelf="center"
          width_tablet="320px"
          height_tablet="100%"
          borderRadius="3px"
          // gridArea_tablet="1/1/2/3"
        >
          <RoundImage
            url="/images/4geeksacademy-logo.png"
            height="125px"
            width="70%"
            backgroundColor="transparent"
            position="center"
            bsize="contain"
          />
        </Div>
        <Div
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="43px"
          width="100%"
          // width_tablet="100%"
          height_tablet="100%"
          borderRadius="3px"
          // gridArea_tablet="1/10/2/13"
        >
          <H4 margin="0 0 10px 0" display="none" display_md="block">
            {yml.newsletter.heading}
          </H4>
          <Div alignItems="center" gap="8px">
            {socials?.map((ln, i) => (
              <Anchor
                key={i}
                cursor="pointer"
                to={ln.link}
                textAlign="left"
                margin="0 0 5px 0"
                fontSize="13px"
                lineHeight="22px"
                fontWeight="400"
                textTransform="uppercase"
                color={Colors.black}
              >
                {ln.icon && (
                  <Icon
                    icon={ln.icon}
                    style={{ margin: "0 0 0 0" }}
                    color={Colors.black}
                    fill={Colors.black}
                    height="32px"
                    width="32px"

                  />
                )}
              </Anchor>
            ))}
          </Div>
        </Div>
      </GridContainer>
      <GridContainer
        columns_tablet="12"
        background={Colors.lightGray}
        padding="11px 17px 29px 17px"
        padding_tablet="31px 0"
      >
        <Div
          gridArea_tablet="1/6/1/13"
          justifyContent="end"
          alignItems="center"
          flexDirection="row"
          width="100%"
          width_tablet="100%"
          height_tablet="100%"
        >
          {yml.policy &&
            yml.policy.map((item, i) => (
              <Link key={i} to={item.link}>
                <H4
                  border={i % 2 == 1 && "1px solid"}
                  borderWidth={i % 2 == 1 && "0px 1px 0px 1px"}
                  key={item.name}
                  fontSize="13px"
                  lineHeight="16px"
                  width="fit-content"
                  color={Colors.darkGray}
                  padding="0 15px"
                >
                  {item.name}
                </H4>
              </Link>
            ))}
        </Div>

        <Div
          gridArea_tablet="1/1/1/6"
          justifyContent="center"
          alignItems="center"
          height_tablet="100%"
        >
          <H4
            fontSize="13px"
            lineHeight="22px"
            textAlign_tablet="left"
            color={Colors.darkGray}
          >
            @ 4Geeks Academy LLC 2019
          </H4>
        </Div>
      </GridContainer>
    </>
  );
};

export default LandingFooter;
