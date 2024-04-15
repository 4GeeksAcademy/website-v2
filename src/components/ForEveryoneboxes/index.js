import React from "react";
import { Paragraph } from "../Heading";
import { Div } from "../Sections";
import { Colors, Anchor } from "../Styling";

const ForEveryoneBoxes = ({ for_everyone_boxes }) => {
  return (
    <Div background="black">
      <Div
        gap="17px"
        flexDirection="column"
        flexDirection_tablet="row"
        flexWrap="wrap"
        flexWrap_tablet="wrap"
        width="100%"
      >
        {for_everyone_boxes.map((box, index) => (
          <Div
            key={index}
            background={box.color}
            border="3px solid #000"
            width_tablet="calc((100% - 17px)/2)"
            width_md="calc((100% - 34px)/3)"
            width="100%"
            height="140px"
            height_md="140px"
            height_tablet="140px"
            flexDirection_tablet="column"
            justifyContent_tablet="center"
            padding="0"
            alignItems="center"
            alignItems_tablet="center"
            borderRadius="4px"
          >
            <Paragraph
              textAlign="center"
              color={Colors.black}
              opacity="1"
              fontSize="18px"
              fontWeight="900"
              lineHeight="19px"
              fontSize_tablet="18px"
              fontWeight_tablet="900"
              lineHeight_tablet="19px"
            >
              {box.title}
            </Paragraph>
          </Div>
        ))}
      </Div>
    </Div>
  );
};
export default ForEveryoneBoxes;
