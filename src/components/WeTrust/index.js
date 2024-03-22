import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import ReactPlayer from "../ReactPlayer";
import { H2, Paragraph, H3 } from "../Heading";
import Icon from "../Icon";
import { Div } from "../Sections";
import { Button, Colors, Img } from "../Styling";
import { navigate } from "gatsby";
import { transferQuerystrings, smartRedirecting } from "../../utils/utils";

const WeTrust = ({ we_trust }) => {
  return (
    <Div
      id="we-trust"
      display="block"
      margin="0 auto"
      padding="0"
      padding_lg="0"
      padding_tablet="40px 40px"
      width="100%"
    >
      <Div
        padding="50px 30px"
        padding_md="40px 80px"
        padding_lg="40px"
        padding_tablet="40px 40px"
        margin="0 auto"
        background={Colors.lightBlue}
        display="block"
        maxWidth="1366px"
      >
        <Div display="block">
          <H2
            textAlign="left"
            margin="0 0 22px 0"
            fontSize_tablet="32px"
            fontSize="21px"
            lineHeight=""
          >
            {we_trust.title}
          </H2>
          <Paragraph
            textAlign="left"
            color={Colors.darkGray}
            opacity="1"
            fontSize_tablet="18px"
            fontSize="16px"
            dangerouslySetInnerHTML={{ __html: we_trust.text }}
          />
        </Div>
        <Div
          margin="15px 0 0 0"
          justifyContent_tablet="between"
          gap="15px"
          flexDirection="column"
          flexDirection_tablet="row"
        >
          {we_trust.boxes.map((box) => (
            <Div
              key={box.title}
              background="#FFF"
              border="3px solid #000"
              width="100%"
              width_md="320px"
              height_md="320px"
              width_tablet="200px"
              height_tablet="240px"
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
                  margin="0 0 30px 0"
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
export default WeTrust;
// export default SingleColumn;
