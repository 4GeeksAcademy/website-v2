import React from "react";
import { Button, Colors, StyledBackgroundSection } from "../Styling";
import { GridContainerWithImage, Div } from "../Sections";
import { H2, H4, Paragraph } from "../Heading";
import { Link } from "gatsby";
import Icon from "../Icon";

const About4Geeks = ({ id, lang }) => {
  const about = lang[0]?.node || lang;
  return (
    <GridContainerWithImage
      id={id}
      columns_tablet="12"
      margin_tablet="100px 0 108px 0"
      margin="80px 0 64px 0"
    >
      <Div flexDirection="column" gridColumn_tablet="1 / 6">
        <H2 textAlign="left" margin="0 0 20px 0">
          {about.heading}
        </H2>
        {about.sub_heading.split("\n").map((m, i) => (
          <H4
            key={i}
            textAlign="left"
            fontSize="15px"
            lineHeight="22px"
            color={Colors.darkGray}
          >
            {m}
          </H4>
        ))}
        {about.list !== null &&
          about.list.map((m, i) => {
            return (
              <Div
                key={`${m.title}- ${i}`}
                margin={i == 0 && "20px 0 0 0"}
                padding="10px 0"
                display="flex"
                alignItems="center"
                style={{ borderBottom: "1px solid #EBEBEB" }}
              >
                <Icon
                  icon="check"
                  width="14px"
                  height="14px"
                  style={{ marginRight: "10px" }}
                  color={Colors.yellow}
                  fill={Colors.yellow}
                />
                <H4
                  textAlign="left"
                  fontSize="15px"
                  lineHeight="26px"
                  color={Colors.darkGray}
                >
                  {m.title}
                </H4>
              </Div>
            );
          })}
        {about.paragraph.split("\n").map((m, i) => (
          <Paragraph
            key={i}
            dangerouslySetInnerHTML={{ __html: m }}
            margin="22px 0 0 0"
            color={Colors.darkGray}
            textAlign="left"
            fontSize="15px"
            lineHeight="22px"
          />
        ))}

        {
          <Link to={about.button_link}>
            <Div display="flex" justifyContent_lg="flex-start">
              <Button
                variant="full"
                font='"Lato", sans-serif'
                colorHover={Colors.black}
                background={Colors.black}
                margin="20px 0"
                pointer
                textColor={Colors.white}
                fontSize={"13px"}
                borderRadius="3px"
              >
                {about.button_text}
              </Button>
            </Div>
          </Link>
        }
      </Div>
      <Div
        style={{ position: "relative" }}
        height="468px"
        gridColumn_tablet="7 / 14"
      >
        <Div
          style={{
            position: "absolute",
            background: "#00A0DA",
            width: "101%",
            height: "216px",
            top: "-10px",
            left: "-10px",
            borderRadius: "3px",
            zIndex: -1,
          }}
        ></Div>
        <Div
          style={{
            position: "absolute",
            background: "#FFB718",
            width: "50%",
            height: "216px",
            bottom: "-10px",
            right: "-10px",
            borderRadius: "3px",
            zIndex: -1,
          }}
        ></Div>
        <StyledBackgroundSection
          className={`image`}
          height={`468px`}
          image={about.image.childImageSharp.gatsbyImageData}
          bgSize={`cover`}
          alt="Cnn Logo"
          borderRadius={`0 0 0 3px`}
        />
      </Div>
    </GridContainerWithImage>
  );
};

export default About4Geeks;
