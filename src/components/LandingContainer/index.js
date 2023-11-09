import React from "react";
import { Colors, StyledBackgroundSection } from "../Styling";
import { Div } from "../Sections";

const LandingContainer = ({ background, children, filter, image, badge }) => {
  return (
    <>
      {!image && (badge || background) ? (
        <Div
          id="top"
          // className={`image`}
          bgSize={`cover`}
          width_tablet="100%"
          height="auto"
          margin="0 auto"
          filter={filter}
          background={background || Colors.white}
        >
          {children}
        </Div>
      ) : (
        <StyledBackgroundSection
          id="top"
          className={`image`}
          image={image}
          bgSize={`cover`}
          width_tablet="100%"
          height="auto"
          margin="0 0 auto 0"
          filter_xxs={filter}
          backgroundColor={Colors.lightGray}
          align="center"
          alt="4Geeks Academy"
          borderRadius="0"
        >
          {children}
        </StyledBackgroundSection>
      )}
    </>
  );
};
export default LandingContainer;
