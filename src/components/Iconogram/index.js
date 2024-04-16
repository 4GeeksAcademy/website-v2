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

const Iconogram = ({ session, data, pageContext, yml, index, textSize }) => {
  const { heading, sub_heading, icons, button, swipable } = yml;

  return (
    <Div
      key={index}
      display="block"
      margin="0 auto"
      padding="40px 20px"
      padding_lg="40px 0"
      padding_md="40px 80px"
      padding_tablet="40px 40px"
      width="100%"
    >
      {heading.text && (
        <H2
          type="h2"
          lineHeight="35px"
          lineHeight_tablet="28px"
          fontSize_tablet="24px"
          fontSize="24px"
          //margin="30px 0 30px 0"
          maxWidth="1280px"
          margin="30px auto"
          style={
            heading?.style
              ? { ...JSON.parse(heading.style) }
              : { textAlign: "center" }
          }
        >
          {heading.text}
        </H2>
      )}
      {/<\/?[a-z0-9]+>/g.test(sub_heading?.text) ? (
        <Paragraph
          padding_xs={heading.text ? "0 10%" : "20px 10%"}
          padding_tablet={heading.text ? "0 10%" : "20px 10%"}
          padding_md={heading.text ? "0 10%" : "20px 10%"}
          margin="15px auto"
          fontSize="16px"
          fontHeight="30px"
          maxWidth="1280px"
          dangerouslySetInnerHTML={{ __html: sub_heading.text }}
          style={sub_heading?.style ? { ...JSON.parse(sub_heading.style) } : {}}
        />
      ) : sub_heading && sub_heading?.text !== "" ? (
        <Paragraph
          padding_xs={heading.text ? "0 10%" : "20px 10%"}
          padding_tablet={heading.text ? "0 10%" : "20px 10%"}
          padding_md={heading.text ? "0 10%" : "20px 10%"}
          margin="15px auto"
          fontSize="16px"
          fontHeight="30px"
          maxWidth="1280px"
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
        maxWidth="1280px"
        margin="20px auto 0 auto"
        padding_tablet="0 40px"
        padding_lg="0"
        className={swipable && "badge-slider hideOverflowX__"}
      >
        {Array.isArray(icons) &&
          icons?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <IconsBanner
                  icon={item.icon}
                  title={item.title}
                  content={item.content}
                  textSize={textSize}
                />
              </React.Fragment>
            );
          })}
      </Div>
    </Div>
  );
};

export default Iconogram;
