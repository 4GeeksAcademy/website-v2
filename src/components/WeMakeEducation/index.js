import React, { useRef } from "react";
import { H2, H4, H5, Paragraph } from "../Heading";
import { Div, Grid, HR } from "../Sections";
import { StyledBackgroundSection } from "../Styling";
import { Colors } from "../Styling";

const WeMakeEducation = () => {
  return (
    <Div
      display="flex"

      height="567px"
      padding="50px 80px 50px 80px"
      padding_tablet="30px 60px 30px 60px"
      gap="16px"
      background="#00041A"
      alignItems="center"
      alignItems_xs="center"
      alignItems_xxs="center"
      justifyContent="center"
      justifyContent_xxs="center"
      justifyContent_tablet="center"
      flexDirection_xs="column"
      flexDirection="row"
      flexDirection_tablet="row"
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
          fontSize_tablet="40px"
          fontSize_xs="30px"
          lineHeight="48.96px"
          textAlign="left" // Default for all screen sizes
          textAlign_md="left" // Explicitly set for medium screens
          textAlign_lg="left" // Explicitly set for large screens
          textAlign_tablet="center" // Override for tablets
          textAlign_xs="center" // Override for extra small screens
          textAlign_xxs="center" // Override for very small screens
          whiteSpace="pre-wrap"
          overflowWrap="break-word"
        >
          {"We make education\naccessible to everyone"}
        </H2>
        <H5
          color="white"
          fontWeight="400"
          fontSize="18px"
          fontSize_xxs="16px"
          lineHeight="22px"
          textAlign="left"
          textAlign_md="left"
          textAlign_lg="left"
          textAlign_tablet="center"
          textAlign_xs="center"
          textAlign_xxs="center"
          justifyContent="left"
          justifyContent_md="left"
          justifyContent_lg="left"
          justifyContent_xxs="center"
          justifyContent_tablet="center"
        >
          You may qualify if you are a{" "}
          <span fontWeight="900"> Miami resident </span> and belong to one of
          these groups:
        </H5>
      </Div>

      <Grid
        gridTemplateColumns="repeat(3, 1fr)"
        gridTemplateColumns_md="repeat(3, 1fr)"
        gridTemplateColumns_lg="repeat(3, 1fr)"
        gridTemplateColumns_xxs="repeat(2, 1fr)"
        gridTemplateColumns_xs="repeat(2, 1fr)"
        gridTemplateColumns_tablet="repeat(2, 1fr)"
        gap="19px"
        width="100%"
        width_xs="160%"
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
      
    </Grid>
    </Div>
  );
};
export default WeMakeEducation;
