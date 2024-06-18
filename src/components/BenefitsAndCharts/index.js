import React, { useRef } from "react";
import { Div } from "../Sections";
import { H2, H3, Paragraph } from "../Heading";
import { Button, Colors } from "../Styling";
import Icon from "../Icon";

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
        flexDirection="column"
        gap="50px"
        padding="30px 20px 80px 20px"
        flexDirection_tablet="row"
        margin="auto"
        padding_tablet="40px 40px"
        padding_md="60px 80px"
        padding_lg="80px 0"
        maxWidth={props.maxWidth || "1280px"}
      >
        <Div flexDirection="column" flex="1" flex_tablet="1">
          <H2 type="h2" textAlign="left">
            {data.benefits_and_charts.title}
          </H2>
          <Paragraph
            textAlign="left"
            padding="20px 0 30px 0"
            padding_tablet="20px 0 30px 0"
            letterSpacing="0.05em"
          >
            {data.benefits_and_charts.description}
          </Paragraph>

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
                  borderBottom={`${
                    index !== data.benefits_and_charts.bullets.length - 1
                      ? "1px solid #EBEBEB"
                      : "0"
                  }`}
                  height="auto"
                  alignItems="center"
                  padding="0"
                  padding_tablet="0 10% 0 0"
                >
                  <Div
                    flexDirection="column"
                    // alignSelf="center"
                    alignSelf="flex-start"
                    padding="22px 10px 20px 0"
                  >
                    <Icon
                      icon="check"
                      width="18px"
                      color={Colors.yellow}
                      fill={Colors.yellow}
                    />
                  </Div>
                  <H3
                    type="h3"
                    padding="20px 0"
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

          <ButtonPartner />
        </Div>

        <Div
          flexDirection="column"
          flex="1"
          flex_tablet="1"
          padding="20px 10px 40px 10px"
          padding_tablet="4% 30px 2% 30px"
          background={Colors.lightYellow}
        >
          <Div
            height="auto"
            alignItems="center"
            gap="40px"
            padding="0 5px 0 20px"
            padding_tablet="0 5px 0 10px"
          >
            <Div
              flexDirection="column"
              alignSelf="center"
              padding="0 8px 0 0"
              style={{ opacity: 0 }}
            >
              <Icon icon="job" width="65px" />
            </Div>
            <H3
              type="h3"
              textAlign="left"
              fontSize="16px"
              textTransform="uppercase"
              letterSpacing="0.05em"
            >
              {data.benefits_and_charts.charts.title}
            </H3>
          </Div>
          <Div flexDirection="column" gap="48px">
            {data.benefits_and_charts.charts.list.map((chart, index) => (
              <Div
                height="auto"
                key={`${chart.icon}-${index}`}
                alignItems="center"
                padding="0 5px 0 20px"
                padding_tablet="0 5px 0 10px"
                gap="40px"
              >
                <Div
                  flexDirection="column"
                  alignSelf="center"
                  padding="0 8px 0 0"
                >
                  <Icon icon={chart.icon} width="65px" />
                </Div>
                <Paragraph
                  textAlign="left"
                >
                  {chart.description}
                </Paragraph>
              </Div>
            ))}
          </Div>
        </Div>
      </Div>
    </>
  );
};

export default BenefitsAndCharts;
