import React from "react";
import { Div } from "../Sections";
import { H2, Paragraph } from "../Heading";
import { Colors } from "../Styling";
import IconsBanner from "../IconsBanner";

const Iconogram = ({ yml, index }) => {
  const { heading, sub_heading, icons, button, swipable, background } = yml;

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
      background={Colors[background] || background}
    >
      {heading.text && (
        <H2
          type="h2"
          lineHeight="35px"
          lineHeight_tablet="28px"
          fontSize_tablet="35px"
          fontSize="24px"
          maxWidth="1280px"
          margin="30px auto"
          fontWeight="400"
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
        padding_tablet="0 40px 10px 40px"
        padding_lg="0 0 10px 0"
        className={swipable && "badge-slider hideOverflowX__"}
      >
        {Array.isArray(icons) &&
          icons?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <IconsBanner
                  icon={item.icon}
                  color={item.color}
                  title={item.title}
                  content={item.content}
                  {...item}
                />
              </React.Fragment>
            );
          })}
      </Div>
    </Div>
  );
};

export default Iconogram;
