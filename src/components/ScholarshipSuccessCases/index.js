import React, { useRef } from "react";
import { H2, H4, Paragraph } from "../Heading";
import { Div, HR } from "../Sections";
import { StyledBackgroundSection } from "../Styling";
import { Colors } from "../Styling";
import Icon from "../Icon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "../Styling";
import CarouselV2 from "../CarouselV2";

const ScholarshipSuccessCases = ({ content, maxWidth, padding, ...props }) => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Div height="590px" display="block" margin="60px 0 60px 0" {...props}>
      <H2 margin="30px 0">{content.title}</H2>

      <CarouselV2
        margin="20px 0"
        background="#FBFCFC"
        padding="20px"
        settings={settings}
      >
        {content?.cases.map((student, i) => (
          <Div
            key={`${student.name}-${i}`}
            display="flex"
            flexDirection="column"
            width="282px"
            minWidth="282px"
            height="500px" // Set fixed height
            borderRadius="4px"
            border={`2px solid ${Colors.lightGray}`}
            margin="0 10px"
            overflow="hidden" // Ensure content doesn't overflow
          >
            <Div width="100%" height="162px">
              <StyledBackgroundSection
                borderRadius="4px 4px 0 0"
                height="100%"
                width="100%"
                image={
                  student.img && student.img.childImageSharp.gatsbyImageData
                }
                bgSize="cover"
                style={{ objectFit: "cover" }} // Ensure image covers the entire space
              />
            </Div>
            <Div
              display="block"
              padding="17px"
              height="100%"
              position="relative"
            >
              <Div justifyContent="between">
                <H4 fontWeight="700" textAlign="left">
                  {student.name}
                </H4>
                <Div
                  alignItems="center"
                  padding="4px"
                  radius="4px"
                  gap="8px"
                  background="#FFF1D1"
                >
                  <Icon
                    icon="graduation"
                    width="19px"
                    height="16px"
                    fill="#FFB718"
                  />
                  <Paragraph
                    fontSize="9px"
                    fontWeight="600"
                    color={Colors.yellow}
                  >
                    {student.status}
                  </Paragraph>
                </Div>
              </Div>
              <Div margin="10px 0 0 0" alignItems="center">
                <Div
                  className="react-tel-input"
                  margin="0"
                  style={{ width: "25px" }}
                >
                  <div className={`flag ${student.country.iso}`} />
                </Div>
                <Paragraph
                  margin="0 0 0 10px"
                  textAlign="left"
                  opacity="1"
                  color={Colors.black}
                >
                  {student.country.name}
                </Paragraph>
              </Div>
              <Div display="block" margin="10px 0">
                <Paragraph
                  margin="5px 0 0 0"
                  textAlign="left"
                  opacity="1"
                  color={Colors.black}
                >
                  {`${content.contributor}: ${student.contributor}`}
                </Paragraph>
                <HR background={Colors.lightGray} width="100%" height="1px" />
              </Div>
              <Div>
                <Paragraph textAlign="left" color={Colors.black} opacity="1">
                  {student.description.length > 280
                    ? student.description.substring(0, 280) + "..."
                    : student.description}
                </Paragraph>
              </Div>
              <Div
                alignItems="center"
                width="fit-content"
                padding="3px 5px"
                background={Colors.veryLightBlue}
                position="absolute"
                bottom="17px"
                right="17px"
              >
                <Icon icon="flag-check" color={Colors.blue} />
                <Paragraph
                  margin="0 0 0 5px"
                  fontSize="9px"
                  color={Colors.blue}
                >
                  {student.achievement}
                </Paragraph>
              </Div>
            </Div>
          </Div>
        ))}
      </CarouselV2>
    </Div>
  );
};

export default ScholarshipSuccessCases;
