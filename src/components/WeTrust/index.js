import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import ReactPlayer from "../ReactPlayer";
import { H2, Paragraph, H3 } from "../Heading";
import Icon from "../Icon";
import { Container, Div } from "../Sections";
import { Button, Colors, Img } from "../Styling";
import { navigate } from "gatsby";
import { transferQuerystrings, smartRedirecting } from "../../utils/utils";

const WeTrust = ({ we_trust }) => {
  return (
    <Container
      id="we-trust"
      display="block"
      padding="0 30px"
      margin="0 auto"
      padding_lg="58px 0 80px 0"
      padding_tablet="40px 40px"
      width="100%"
    >
      <Div display="block">
        <H2
          textAlign="center"
          margin="0 0 22px 0"
          fontSize="35px"
          lineHeight="38.08px"
          fontFamily="Archivo,Lato,sans-serif"
          fontWeight="400"
          color={Colors.black2}
        >
          {we_trust.title}
        </H2>
        <Paragraph
          textAlign="center"
          color={Colors.darkGray}
          opacity="1"
          fontFamily="Archivo,Lato,sans-serif"
          fontWeight="400"
          fontSize="24px"
          lineHeight="26.11px"
          dangerouslySetInnerHTML={{ __html: we_trust.text }}
        />
      </Div>
      <Div
        margin="15px 0 0 0"
        gap="17px"
        flexDirection="column"
        flexDirection_tablet="row"
      >
        {we_trust.boxes.map((box) => (
          <Div
            key={box.title}
            background="#FFF"
            border="3px solid #000"
            width="100%"
            height_md="320px"
            height_tablet="240px"
            boxShadow="-6px 6px 0px 0px rgba(0,0,0,1)"
            boxShadow_tablet="-9px 8px 0px 0px rgba(0,0,0,1)"
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
    </Container>
  );
};
export default WeTrust;
// export default SingleColumn;
