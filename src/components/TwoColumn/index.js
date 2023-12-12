import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import ReactPlayer from "../ReactPlayer";
import { H2, Paragraph } from "../Heading";
import Icon from "../Icon";
import { Div } from "../Sections";
import { Button, Colors, Img, StyledBackgroundSection } from "../Styling";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { navigate } from "gatsby";
import { transferQuerystrings, smartRedirecting } from "../../utils/utils";

const Side = ({
  video,
  image,
  header,
  heading,
  sub_heading,
  content,
  button,
  bullets,
  session,
  padding_tablet,
}) => {
  const utm = session && session.utm;
  if (video)
    return (
      <ReactPlayer
        thumb={image && image.src}
        image_thumb={image}
        id={video}
        videoHeight="360px"
        margin_tablet="0px"
        style={{
          width: "100%",
        }}
      />
    );

  if (image) {
    const imgStyles = image.style ? JSON.parse(image.style) : null;
    const [img_h_xl, img_h_lg, img_h_md, img_h_sm, img_h_xs] =
      imgStyles && imgStyles.height
        ? Array.isArray(imgStyles.height)
          ? imgStyles.height
          : [imgStyles.height]
        : ["100%"];
    return image?.src ? (
      <Img
        src={image.src}
        onClick={() => {
          if (image.link) {
            if (image.link.indexOf("http") > -1) window.open(image.link);
            else navigate(image.link);
          }
        }}
        style={imgStyles}
        alt="4Geeks Academy Section"
        margin="0px"
        height={img_h_xl}
        width={imgStyles ? imgStyles.width || "100%" : "100%"}
        h_sm={img_h_sm || "250px"}
        backgroundSize={image.shadow ? "cover" : "contain"}
        //backgroundPosition="center right"
        //border={image.shadow && "3px solid black"}
        boxShadow={image.shadow && "20px 15px 0px 0px rgba(0,0,0,1)"}
      />
    ) : (
      <GatsbyImage
        height_xxs="450px"
        image={getImage(image.childImageSharp.gatsbyImageData)}
        //bgSize={`contain`}
        alt="geekforce image"
      />
    );
  }

  const [h_xl, h_lg, h_md, h_sm, h_xs] =
    heading && heading.font_size ? heading.font_size : [];
  const [sh_xl, sh_lg, sh_md, sh_sm, sh_xs] =
    sub_heading && Array.isArray(sub_heading.font_size)
      ? sub_heading.font_size
      : [];
  const [c_xl, c_lg, c_md, c_sm, c_xs] = content ? content.font_size : [];

  let subHeadingStyles = {};
  if (sub_heading?.style) subHeadingStyles = JSON.parse(sub_heading.style);

  return (
    <Div
      flexDirection_tablet="column"
      flexDirection="column"
      padding_tablet={padding_tablet || "10px 0px 0px 0px"}
    >
      {header && (
        <Div
          margin="0 0 30px 0"
          justifyContent="center"
          justifyContent_md="start"
        >
          {Array.isArray(header) &&
            header.map((item, index) => {
              return (
                <RoundImage
                  key={index}
                  url={item.image}
                  bsize="contain"
                  height="20px"
                  width="130px"
                  position="left"
                />
              );
            })}
        </Div>
      )}
      {heading && (
        <H2
          type="h2"
          textAlign_tablet="left"
          lineHeight="38px"
          lineHeight_tablet="38px"
          fontSize={h_xs || "30px"}
          fs_xl={h_xl}
          fontSize_md={h_md || "30px"}
          fontSize_sm={h_sm}
          margin="30px 0 20px 0"
          style={heading.style ? JSON.parse(heading.style) : null}
        >
          {heading.text}
        </H2>
      )}
      {sub_heading && (
        <Paragraph
          textAlign_tablet="left"
          margin="0"
          fontSize={sh_xl || "18px"}
          fontSize_sm={sh_sm}
          fonSize_md={sh_md}
          fontSize_xs={sh_xs}
          fontHeight="30px"
          fontWeight={subHeadingStyles["font-weight"] || 700}
          opacity="1"
          style={sub_heading.style ? JSON.parse(sub_heading.style) : null}
        >
          {sub_heading.text}
        </Paragraph>
      )}

      {Array.isArray(bullets?.items) && (
        <Div
          display="grid"
          gridAutoFlow="dense"
          gridTemplateColumns="repeat(auto-fill, minmax(40%, 100%))"
          gridAutoRows="auto" //"minmax(100px, auto);"
          margin={sub_heading ? "16px 0 16px 0" : "0 0 16px 0"}
          gridGap="24px"
        >
          {bullets.items?.map((bullet, index) => {
            return (
              <Div
                key={index}
                gridColumn_tablet="1/1"
                height="auto"
                alignItems="center"
                padding="16px 5px 0 0"
                padding_tablet="16px 0 0 0"
                display="grid"
                gridTemplateColumns="100%"
                //gridAutoRows="auto"
                gridGap="0"
                style={
                  bullets.item_style ? JSON.parse(bullets.item_style) : null
                }
              >
                <Div
                  display="flex"
                  flexDirection="row"
                  alignSelf="left"
                  padding="0 8px 0 0"
                >
                  <Icon
                    icon={bullet.icon || "check"}
                    width="13px"
                    display="inline"
                    color={Colors.blue}
                    fill={Colors.yellow}
                    style={{ strokeWidth: "2px" }}
                  />
                  {bullet.heading ? (
                    <H2
                      type="h3"
                      textAlign="left"
                      fontSize="15px"
                      fontWeight="900"
                      lineHeight="19px"
                      textTransform="uppercase"
                      padding="0 0 0 5px"
                    >
                      {bullet.heading}
                    </H2>
                  ) : (
                    <Paragraph
                      textAlign="left"
                      fontSize="18px"
                      fontWeight="400"
                      lineHeight="22px"
                      margin="0px 0px 0px 5px"
                    >
                      {bullet.text}
                    </Paragraph>
                  )}
                </Div>
                {bullet.heading && (
                  <Paragraph
                    textAlign="left"
                    fontSize="15px"
                    fontWeight="400"
                    lineHeight="22px"
                    margin="12px 0 0 0"
                  >
                    {bullet.text}
                  </Paragraph>
                )}
              </Div>
            );
          })}
        </Div>
      )}

      {content && /<\/?[a-z0-9]+>/g.test(content.text) ? (
        <Paragraph
          textAlign="left"
          textAlign_tablet="left"
          margin="10px 0"
          opacity="1"
          fontSize={c_xl || "16px"}
          fontSize_sm={c_sm}
          fonSize_md={c_md}
          fontSize_xs={c_xs}
          style={content.style ? JSON.parse(content.style) : null}
          dangerouslySetInnerHTML={{ __html: content.text }}
        />
      ) : (
        content &&
        content.text.split("\n").map((p, i) => (
          <Paragraph
            key={`${i}-${p}`}
            textAlign="left"
            textAlign_tablet="left"
            margin="10px 0"
            opacity="1"
            fontSize={c_xl || "16px"}
            fontSize_sm={c_sm}
            fonSize_md={c_md}
            fontSize_xs={c_xs}
            style={content.style ? JSON.parse(content.style) : null}
            fontHeight="30px"
          >
            {p}
          </Paragraph>
        ))
      )}

      {button && (
        <Button
          outline
          borderRadius="0"
          colorHoverText={button.hover_color || Colors.blue}
          background={Colors[button.background] || button.background}
          lineHeight="26px"
          textColor={Colors.black}
          textTransform="none"
          color={Colors[button.color] || button.color}
          fontSize="15px"
          textAlign="left"
          margin="2rem 0"
          padding_xxs="0 .5rem"
          padding_xs="0 .85rem"
          //padding_tablet="32px .85rem 0 .85rem"
          onClick={() => {
            if (button.path && button.path.indexOf("http") > -1)
              window.open(transferQuerystrings(button.path, utm));
            else navigate(button.path);
          }}
        >
          {button.text}
        </Button>
      )}
    </Div>
  );
};

const TwoColumn = ({ left, right, proportions, session }) => {
  const [left_size, right_size] = proportions ? proportions : [];

  return (
    <Div
      flexDirection="column"
      gap={left?.gap || right?.gap || "0px"}
      gap_tablet={left?.gap_tablet || right?.gap_tablet || "20px"}
      flexDirection_tablet="row"
      m_sm="0px auto 100px auto"
      margin="auto"
      padding_xxs="40px 20px"
      padding_md="40px 80px"
      padding_lg="40px 0px"
      padding_tablet="40px 40px"
      width_tablet="100%"
      maxWidth_md="1366px"
    >
      <Div
        justifyContent={left?.video && "center"}
        flexDirection="column"
        size_tablet={left_size || 6}
        size="12"
        padding_xs="0"
        padding_md={right?.image?.shadow ? "0 20px 0 0 " : "0px"}
        // maxHeight="300px"
        textAlign="center"
      >
        <Side session={session} {...left} />
      </Div>
      <Div
        justifyContent={right?.video && "center"}
        flexDirection="column"
        size_tablet={right_size || 6}
        padding_xs="0"
        padding_md={left?.image?.shadow ? "0 0 0 20px" : "0px"}
        size="12"
        textAlign="center"
      >
        <Side session={session} {...right} />
      </Div>
    </Div>
  );
};
TwoColumn.defaultProps = {
  proportions: [],
  left: null,
  right: null,
};

export default TwoColumn;

export const SingleColumn = ({ column }) => {
  return (
    <Div flexDirection="row" m_sm="0px 0px 100px 0">
      <Div flexDirection="column" size={12} size_sm="12" align_sm="center">
        <Side {...column} />
      </Div>
    </Div>
  );
};
TwoColumn.defaultProps = {
  column: null,
};

// export default SingleColumn;
