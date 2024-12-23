import React, { useRef } from "react";
import { H2, H4, H5, Paragraph } from "../Heading";
import { Div, HR } from "../Sections";
import { StyledBackgroundSection } from "../Styling";
import { Colors } from "../Styling";

const WeMakeEducation = () => {
  return (
    <Div
      display="flex"
      width="100%"
      height="567px"
      padding="50px 80px 50px 80px"
      gap="16px"
      background="#00041A"
      alignItems="center"
      justifyContent="center"
    >
      <Div
        display="flex"
        flexDirection="column"
        width="393px"
        height="299px"
        gap="20px"
      >
        <H2
          color="white"
          height="100%"
          width="auto"
          fontWeight="400"
          fontSize="45px"
          lineHeight="48.96px"
          textAlign="left"
          whiteSpace="pre-wrap"
          overflowWrap="break-word"
        >
          {"We make education\naccessible to everyone"}
        </H2>

        <H5 color="white" fontWeight="400" fontSize="18px" lineHeight="22px" textAlign="left" justifyContent="left">
          You may qualify if you are a{" "}
          <span fontWeight="900"> Miami resident </span> and belong to one of
          these groups:
        </H5>
      </Div>

      <Div
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="19px"
        width="100%"
        height="299px"
        
      >
        <Div
          background="#E0D1FF"
          borderRadius="4px"
          display="flex"
          alignItems="center"
          height="100%"
          weight="100%"
          justifyContent="center"
          padding="8px"
        >
          <H4
            color="black"
            textAlign="center"
            fontWeight="900"
            fontSize="18px"
            lineHeight="19px"
          >
            LGBTQI COMMUNITY
          </H4>
        </Div>
        <Div
          background="#FFB718"
          borderRadius="4px"
          display="flex"
          alignItems="center"
          height="100%"
          weight="100%"
          justifyContent="center"
          padding="8px"
        >
          <H4
            color="black"
            textAlign="center"
            fontWeight="900"
            fontSize="18px"
            lineHeight="19px"
          >
            VETS AND MILITARY
          </H4>
        </Div>
        <Div
          background="#0084FF"
          borderRadius="4px"
          display="flex"
          height="100%"
          weight="100%"
          alignItems="center"
          justifyContent="center"
          padding="8px"
        >
          <H4
            color="black"
            textAlign="center"
            fontWeight="900"
            fontSize="18px"
            lineHeight="19px"
          >
            WOMEN IN TECH
          </H4>
        </Div>
        <Div
          background="#A3DA68"
          borderRadius="4px"
          display="flex"
          alignItems="center"
          height="100%"
          weight="100%"
          justifyContent="center"
          padding="8px"
        >
          <H4
            color="black"
            textAlign="center"
            fontWeight="900"
            fontSize="18px"
            lineHeight="19px"
            whiteSpace="pre-wrap"
            overflowWrap="break-word"
          >
            {"UNDEREMPLOYED OR\nUNEMPLOYED"}
          </H4>
        </Div>
        <Div
          background="white"
          borderRadius="4px"
          display="flex"
          alignItems="center"
          height="100%"
          weight="100%"
          justifyContent="center"
          padding="8px"
        >
          <H4
            color="black"
            textAlign="center"
            fontWeight="900"
            fontSize="18px"
            lineHeight="19px"
          >
            HISPANICS IN USA
          </H4>
        </Div>
        <Div
          background="#F15E64"
          borderRadius="4px"
          display="flex"
          height="100%"
          weight="100%"
          alignItems="center"
          justifyContent="center"
          padding="8px"
        >
          <H4
            color="black"
            textAlign="center"
            fontWeight="900"
            fontSize="18px"
            lineHeight="19px"
          >
            UNDERREPRESENTED
          </H4>
        </Div>
      </Div>
    </Div>
  );
};
export default WeMakeEducation;
