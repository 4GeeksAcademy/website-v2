import React, { useState } from "react";
import { Colors } from "../Styling";
import Icon from "../Icon";
import Card from "../Card";
import { Div } from "../Sections";
import { H3, H4, Paragraph } from "../Heading";

const FaqCard = ({ item, i }) => {
  const [buttonToggle, setButtonToggle] = useState(false);
  const [toggleIndex, setToggleIndex] = useState();

  return (
    <React.Fragment key={`${i}-${item.topic}`}>
      <H3
        type="h3"
        key={i}
        borderBottom="1px solid"
        borderColor="#C4C4C4"
        padding="80px 30px 30px 30px"
      >
        {item.topic}
      </H3>
      {item.questions.map((faq, index) => {
        return (
          <Card
            key={`${index}-${faq.question}`}
            height="auto"
            width="100%"
            borders="0"
            borderBottom="1px solid"
            borderColor=" #C4C4C4"
            padding="20px"
            onClick={() =>
              toggleIndex === faq.question
                ? (setToggleIndex(undefined),
                  setButtonToggle(!buttonToggle))
                : (setToggleIndex(faq.question),
                  setButtonToggle(true))
            }
          >
            <Div key={faq.question} display="block" height="100%">
              <Div
                onClick={() => {
                  setButtonToggle(!buttonToggle),
                    setToggleIndex(
                      toggleIndex != undefined
                        ? undefined
                        : faq.question
                    );
                }}
                display="flex"
                width="100%"
                align={`center`}
                alignSelf="center"
              >
                <H4
                  type="h4"
                  textAlign="left"
                  fontSize="13px"
                  align={`left`}
                  align_sm={`left`}
                  color={Colors.black}
                  paddingRight="5%"
                  textTransform="uppercase"
                  fontWeight="700"
                >
                  {faq.question}
                </H4>
                {buttonToggle === false ? (
                  toggleIndex != faq.question && (
                    <Icon icon="plus" width="24" />
                  )
                ) : buttonToggle === true &&
                  toggleIndex === faq.question ? (
                  <Icon icon="minus" width="24" />
                ) : (
                  <Icon icon="plus" width="24" />
                )}
              </Div>
              <Div size="12" size_sm="12" alignSelf="center">
                {buttonToggle === true &&
                  toggleIndex === faq.question && (
                    <Paragraph
                      textAlign="left"
                      letterSpacing="0.05em"
                      lineHeight="22px"
                      fontWeight="normal"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                      margin={`20px 0 0 0`}
                      align_sm="left"
                      fontFamily="Lato, sans-serif"
                    ></Paragraph>
                  )}
              </Div>
            </Div>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default FaqCard;
