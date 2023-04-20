import React, { useRef } from "react";
import Link from "gatsby-link";
import { H2, H3, H4, Paragraph } from "../Heading";
import Slider from "react-slick";
import { Div, HR } from "../Sections";
import { StyledBackgroundSection } from "../Styling";
import { Button, Colors } from "../Styling";
import Icon from "../Icon";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ScholarshipSuccessCases = ({ content }) => {
  const student = content?.cases[0];
  return (
    <Div display="block" margin="0 0 10px 0">
      <H2>{content.title}</H2>
      <Div padding="0 40px">
        <Div
          display="block"
          width="282px"
          borderRadius="4px"
          border={`2px solid ${Colors.lightGray}`}
        >
          <Div width="100%">
            <StyledBackgroundSection
              borderRadius="4px 4px 0 0"
              height="162px"
              width="100%"
              image={student.img && student.img.childImageSharp.gatsbyImageData}
              bgSize="cover"
            />
          </Div>
          <Div display="block" padding="17px">
            <Div justifyContent="between">
              <H4 fontWeight="700" textAlign="left">
                {student.name}
              </H4>
              <Div
                alignItems="center"
                padding="3px"
                background={Colors.veryLightBlue}
              >
                <Icon
                  icon="graduation"
                  width="19px"
                  height="16px"
                  fill={Colors.blue}
                />
                <Paragraph fontSize="10px" color={Colors.blue}>
                  {student.status}
                </Paragraph>
              </Div>
            </Div>
            <Div>
              <Div className="react-tel-input" margin="0" width="25px">
                <div className={`flag ${student.country.iso}`} />
              </Div>
              <Paragraph
                margin="0 0 0 10px"
                textAlign="left"
                color={Colors.black}
              >
                {student.country.name}
              </Paragraph>
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default ScholarshipSuccessCases;
