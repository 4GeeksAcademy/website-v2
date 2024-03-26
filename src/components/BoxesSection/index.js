import React from "react";
import Icon from "../Icon";
import { Div } from "../Sections";
import { H2, H3, Paragraph } from "../Heading";

const BoxesSection = ({ data }) => {
  console.log(data);
  return (
    <Div
      display="block"
      margin="0 auto"
      padding="40px 0"
      padding_lg="40px 0"
      padding_md="40px 80px"
      padding_tablet="40px 40px"
      width="100%"
    >
      <Div margin="0 auto" display="block" maxWidth="1366px">
        <Div display="block">
          <H2
            textAlign="center"
            margin="0 0 50px 0"
            fontSize_tablet="32px"
            fontSize="21px"
            lineHeight=""
          >
            {data.title}
          </H2>
        </Div>
        <Div
          margin="15px 0 0 0"
          justifyContent_tablet="between"
          gap="15px"
          flexDirection="column"
          flexDirection_tablet="row"
        >
          {data.boxes.map((box, index) => (
            <Div
              key={index}
              background="#FFF"
              border="3px solid #000"
              width="100%"
              width_md="320px"
              // height_md="320px"
              width_tablet="200px"
              // height_tablet="240px"
              boxShadow="6px 6px 0px 0px rgba(0,0,0,1)"
              boxShadow_tablet="9px 8px 0px 0px rgba(0,0,0,1)"
              flexDirection_tablet="column"
              justifyContent_tablet="center"
              padding="15px"
              alignItems="center"
              alignItems_tablet="normal"
            >
              <Icon icon={box.icon} width="89px" height="89px" color={null} />
              <Div
                margin="0 0 0 15px"
                margin_tablet="30px 0 0 0"
                display="flex"
                flexDirection="column"
                display_tablet="block"
              >
                <H3
                  textAlign="left"
                  fontSize="35px"
                  fontSize_tablet="65px"
                  fontFamily="Archivo-Black"
                  margin="0"
                >
                  {box.title}
                </H3>
                <Paragraph
                  textAlign="left"
                  color="#000"
                  opacity="1"
                  fontSize="21px"
                >
                  {box.text}
                </Paragraph>
              </Div>
            </Div>
          ))}
        </Div>
      </Div>
    </Div>
  );
};

export default BoxesSection;
