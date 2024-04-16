import React, { useRef } from "react";
import { Div } from "../Sections";
import { H2, H3, Paragraph } from "../Heading";
import { Button, Colors } from "../Styling";
import Icon from "../Icon";
import Iconogram from "../Iconogram";

const BenefitsAndCharts = (props) => {
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
      >
        {data.benefits_and_charts.button_section.button_text}
      </Button>
    </Div>
  );
  return (
    <>
      <Div
        display="flex"
        flexDirection="column"
        gap="24px"
        padding="30px 20px 80px 20px"
        flexDirection_tablet="row"
        margin="auto"
        padding_tablet="40px"
        // padding_md="60px 80px"
        // padding_lg="80px 0"
        maxWidth={props.maxWidth || "1280px"}
      >
        <Div flexDirection="column" flex="1" flex_tablet="1">
          <H2
            type="h2"
            fontFamily="Archivo, Lato, sans-serif"
            fontWeight="400"
            fontSize="30px"
            fontSize_tablet="45px"
            textAlign="center"
            textAlign_tablet="left"
            lineHeight="30px"
            lineHeight_tablet="48.96px"
            margin="0 0 24px 0"
            margin_tablet="0 0 48px 0"
            padding="8px 0 0 0"
          >
            {data.benefits_and_charts.title}
          </H2>
          {data?.benefits_and_charts?.description &&
            data.benefits_and_charts.description !== "" && (
              <Paragraph
                textAlign="left"
                fontSize="15px"
                color="#3A3A3A"
                padding="20px 0 30px 0"
                padding_tablet="20px 0 30px 0"
                letterSpacing="0.05em"
              >
                {data.benefits_and_charts.description}
              </Paragraph>
            )}

          <ButtonPartner />
        </Div>

        <Div
          flexDirection="column"
          flex="1"
          flex_tablet="1"
          padding="0 0 40px 0"
          padding_tablet="0"
        >
          {Array.isArray(data.benefits_and_charts.bullets) && (
            <>
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
                  padding="8px 0 4px 0"
                >
                  <Div
                    flexDirection="column"
                    // alignSelf="center"
                    alignSelf="flex-start"
                    padding="0 10px 0 0"
                  >
                    <Icon
                      icon="check"
                      width="18px"
                      color={Colors.yellow}
                      fill={Colors.yellow}
                    />
                  </Div>
                  <H2
                    type="h3"
                    textAlign="left"
                    fontSize="15px"
                    fontWeight="400"
                    lineHeight="22px"
                  >
                    {p}
                  </H2>
                </Div>
              ))}
            </>
          )}
        </Div>
      </Div>
      <Iconogram yml={data.benefits_and_charts.charts} textSize="15px" />
    </>
  );
};

export default BenefitsAndCharts;
