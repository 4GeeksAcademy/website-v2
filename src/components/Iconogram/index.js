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
      display="block"
      margin="0 auto"
      padding="40px 20px"
      padding_lg="40px 0"
      padding_md="40px 80px"
      padding_tablet="40px 40px"
      width="100%"
    >
      <Div margin="0 auto" display="block" maxWidth="1366px">
        {heading.text && (
          <Div display="block">
            <H2
              textAlign="center"
              margin="0 0 50px 0"
              fontSize_tablet="32px"
              fontSize="21px"
              lineHeight="48.96px"
              style={
                heading?.style
                  ? { ...JSON.parse(heading.style) }
                  : { textAlign: "center" }
              }
            >
              {heading.text}
            </H2>
          </Div>
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
            style={
              sub_heading?.style ? { ...JSON.parse(sub_heading.style) } : {}
            }
          />
        ) : sub_heading && sub_heading.text == !"" ? (
          <Paragraph
            padding_xs={heading.text ? "0 10%" : "20px 10%"}
            padding_tablet={heading.text ? "0 10%" : "20px 10%"}
            padding_md={heading.text ? "0 10%" : "20px 10%"}
            margin="15px auto"
            fontSize="16px"
            fontHeight="30px"
            maxWidth="1366px"
            style={
              sub_heading?.style ? { ...JSON.parse(sub_heading.style) } : {}
            }
          >
            {sub_heading.text}
          </Paragraph>
        ) : null}
        <Div
          margin="15px 0 0 0"
          justifyContent_tablet="between"
          gap="15px"
          flexDirection="column"
          flexDirection_tablet="row"
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
                  />
                </React.Fragment>
              );
            })}
        </Div>
        {button && (
          <Button
            outline
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
    </Div>
  );
};

export default Iconogram;
