import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import ReactPlayer from "../ReactPlayer";
import { H2, Paragraph, H3 } from "../Heading";
import Icon from "../Icon";
import { Container, Div } from "../Sections";
import { Button, Colors, Img, Anchor } from "../Styling";
import { navigate } from "gatsby";
import { transferQuerystrings, smartRedirecting } from "../../utils/utils";

const HowItWorks = ({ how_it_works }) => {
  return (
    <Div background="black">
      <Container
        id="how-it-works"
        display="block"
        padding="67px 30px"
        margin="0 auto"
        padding_lg="67px 0"
        padding_md="67px 80px"
        padding_tablet="40px 40px"
        width="100%"
      >
        <Div display="block">
          <H2
            textAlign="center"
            margin="0 0 22px 0"
            // fontSize_tablet="35px"
            fontSize="35px"
            lineHeight="38.08px"
            fontFamily="Archivo,Lato,sans-serif"
            fontWeight="400"
            color={Colors.white}
          >
            {how_it_works.title}
          </H2>
          <Paragraph
            textAlign="center"
            color={Colors.white}
            opacity="1"
            fontFamily="Archivo,Lato,sans-serif"
            fontWeight="400"
            fontSize="24px"
            lineHeight="26.11px"
          >
            {how_it_works.text1}
          </Paragraph>
        </Div>

        <Div
          margin="22px 0"
          // justifyContent_tablet="between"
          gap="17px"
          flexDirection="column"
          flexDirection_tablet="row"
          flexWrap="wrap"
          flexWrap_tablet="no-wrap"
        >
          {how_it_works.steps.map((step, index) => (
            <Div
              key={step.title}
              background="#FFF"
              border="3px solid #000"
              width_md="32%"
              width_lg="32%"
              width="100%"
              height_md="240px"
              height_tablet="240px"
              flexDirection_tablet="column"
              justifyContent_tablet="center"
              padding="15px"
              alignItems="center"
              alignItems_tablet="center"
            >
              <Icon icon={step.icon} width="89px" height="89px" color={null} />
              <Div
                margin="0 0 0 15px"
                margin_tablet="30px 0 0 0"
                display="flex"
                flexDirection="column"
                display_tablet="block"
              >
                <Paragraph
                  textAlign="center"
                  color="#000"
                  opacity="1"
                  fontSize="21px"
                >
                  {`${index + 1}. ${step.title}`}
                </Paragraph>
              </Div>
            </Div>
          ))}
        </Div>

        <Div display="block">
          <Paragraph
            textAlign="center"
            color={Colors.white}
            opacity="1"
            fontFamily="Archivo,Lato,sans-serif"
            fontWeight="400"
            fontSize="24px"
            lineHeight="26.11px"
          >
            {how_it_works.text2}
          </Paragraph>
        </Div>

        <Paragraph
          margin="30px 0 0 0"
          fontSize="18px"
          color={Colors.black}
          opacity="1"
          textDecoration="underline"
        >
          <Anchor
            color={`${Colors.white} !important`}
            to={how_it_works.link.url}
          >
            {how_it_works.link.label}
          </Anchor>
        </Paragraph>
      </Container>
    </Div>
  );
};
export default HowItWorks;
// export default SingleColumn;
