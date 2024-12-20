import React, { useRef } from "react";
import { Div } from "../Sections";
import { H2, H3, Paragraph } from "../Heading";
import { Button, Colors } from "../Styling";
import Icon from "../Icon";

const BenefitsAndChartsV2 = (props) => {
  const { data, goToForm } = props;

  const ButtonPartner = () => (
    <Div
      flexDirection_tablet="row"
      flexDirection="column"
      justifyContent="left"
      alignItems="center"
    >
      <Button
        onClick={goToForm}
        variant="full"
        color={Colors.blue}
        margin="0 auto"
        margin_tablet="10px 24px 10px 0"
        textColor="white"
        borderRadius="4px"
      >
        {data.benefits_and_charts.button_section.button_text}
      </Button>
    </Div>
  );
  return (
    <>
      <Div
        className="benefits_and_charts"
        display="flex"
        flexDirection="row"
        gap="24px"
        padding="30px 20px 80px 20px"
        flexDirection_tablet="row"
        margin="auto"
        padding_tablet="40px 40px"
        padding_md="60px 80px"
        padding_lg="80px 0"
        maxWidth={props.maxWidth || "1280px"}
      >
        <Div flexDirection="column" flex="1" flex_tablet="1">
          <H2
            type="h2"
            textAlign="left"
            height="98px"
            fontSize="45px"
            lineHeight="48.96px"
          >
            {data.benefits_and_charts.title}
          </H2>

          <ButtonPartner />
        </Div>
        {Array.isArray(data.benefits_and_charts.bullets) && (
          <Div
            display="flex"
            flexDirection="column"
            gridGap="0"
            padding="0 0 30px 0"
            padding_tablet="0 0 30px 0"
          >
            {data.benefits_and_charts.bullets.map((p, index) => (
              <Div
                key={index}
                // borderBottom={`${
                //   index !== data.benefits_and_charts.bullets.length - 1
                //     ? "1px solid #EBEBEB"
                //     : "0"
                // }`}
                height="auto"
                alignItems="center"
                padding="0"
                padding_tablet="0 10% 0 0"
              >
                <Div
                  flexDirection="column"
                  // alignSelf="center"
                  alignSelf="flex-start"
                  padding="10px 10px 10px 0"
                >
                  <Icon
                    icon="check"
                    width="18px"
                    color={Colors.blue}
                    fill={Colors.blue}
                  />
                </Div>
                <H3
                  type="h3"
                  // padding="20px 0"
                  textAlign="left"
                  fontSize="16px"
                  fontWeight="400"
                >
                  {p}
                </H3>
              </Div>
            ))}
          </Div>
        )}
      </Div>
    </>
  );
};

export default BenefitsAndChartsV2;
