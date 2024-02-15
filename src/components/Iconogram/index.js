import React from "react";
import { GridContainerWithImage, Div, GridContainer } from "../Sections";
import { H3, H2, H5, H4, Paragraph } from "../Heading";
import {
  Colors,
  Img,
  Button,
  StyledBackgroundSection,
  Link,
  Anchor,
} from "../Styling";
import { navigate } from "gatsby";
import IconsBanner from "../IconsBanner";
import Icon from "../Icon";
import ChooseYourProgram from "../ChooseYourProgram";
import StarRating from "../StarRating";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { smartRedirecting, transferQuerystrings } from "../../utils/utils.js";

const Iconogram = ({ session, data, pageContext, yml, index }) => {
  const { heading, sub_heading, icons, button, swipable } = yml;

  return (
    <Div
      key={index}
      padding={heading.text ? "30px 0 30px 0" : "60px 0 60px 0"}
      display="flex"
      flexDirection="column"
      id="iconogram"
      containerColumns_tablet="repeat(14, 1fr)"
      columns="1"
      rows="2"
      margin="auto"
      height="auto"
      width="100%"
      alignItems="center"
      background={Colors.lightYellow}
    >
      {heading.text && (
        <H2
          type="h2"
          lineHeight="35px"
          lineHeight_tablet="28px"
          fontSize_tablet="24px"
          fontSize="24px"
          //margin="30px 0 30px 0"
          maxWidth="1366px"
          margin="30px auto"
          style={heading?.style ? { ...JSON.parse(heading.style) } : { textAlign: "center" }}
        >
          {heading.text}
        </H2>
      )}
      {sub_heading && /<\/?[a-z0-9]+>/g.test(sub_heading.text) ? (
        <Paragraph
          padding_xs={heading.text ? "0 10%" : "20px 10%"}
          padding_tablet={heading.text ? "0 10%" : "20px 10%"}
          padding_md={heading.text ? "0 10%" : "20px 10%"}
          margin="15px auto"
          fontSize="16px"
          fontHeight="30px"
          maxWidth="1366px"
          dangerouslySetInnerHTML={{ __html: sub_heading.text }}
          style={sub_heading?.style ? { ...JSON.parse(sub_heading.style) } : {}}
        />
      ) : sub_heading.text == !"" ? (
        <Paragraph
          padding_xs={heading.text ? "0 10%" : "20px 10%"}
          padding_tablet={heading.text ? "0 10%" : "20px 10%"}
          padding_md={heading.text ? "0 10%" : "20px 10%"}
          margin="15px auto"
          fontSize="16px"
          fontHeight="30px"
          maxWidth="1366px"
          style={sub_heading?.style ? { ...JSON.parse(sub_heading.style) } : {}}
        >
          {sub_heading.text}
        </Paragraph>
      ) : null}
      <Div
        display="flex"
        flexDirection="column"
        flexDirection_xs="row"
        flexDirection_tablet="row "
        flexWrap_xs="wrap"
        flexWrap_tablet="nowrap"
        justifyContent="center"
        // gap="45px"
        gap_tablet={icons.length > 4 ? "0px" : "3%"}
        //gap_md="10%"
        maxWidth="1366px"
        margin="20px auto 0 auto"
        padding_tablet="0 40px"
        padding_md="0 80px"
        padding_lg="0"
        className={swipable && "badge-slider hideOverflowX__"}
        id="accccccccccc"
      >
        {Array.isArray(icons) &&
          icons?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <IconsBanner
                  icon={item.icon}
                  title={item.title}
                  content={item.content}
                />
              </React.Fragment>
            );
          })}
      </Div>
      {button && (
        <Button
          outline
          borderRadius="0"
          colorHoverText={button.hover_color || Colors.blue}
          background={Colors[button.background] || button.background}
          lineHeight="26px"
          textColor={Colors.black}
          textTransform="none"
          textDecorationLine="underline"
          color={Colors[button.color] || button.color}
          fontSize="18px"
          fontFamily="Lato"
          fontWeight="500"
          textAlign="left"
          margin="2rem 0 1rem 0"
          padding="32px .85rem 0 .85rem"
          onClick={() => {
            if (button.path && button.path.indexOf("http") > -1)
              window.open(transferQuerystrings(button.path, utm));
            else navigate(button.path);
          }}
        >
          <Link to={button.path}>{button.text}</Link>
        </Button>
      )}
    </Div>
  );
};

export default Iconogram;
