import React from "react";
import { H2, H4, Paragraph } from "../Heading";
import { Div, HR, GridContainer } from "../Sections";
import { StyledBackgroundSection } from "../Styling";
import { Colors } from "../Styling";
import Icon from "../Icon";
import Marquee_v2 from "../Marquee_v2";
import Fragment from "../Fragment";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ScholarshipSuccessCases = ({ content }) => {
  return (
    <Fragment>
      <GridContainer fluid height="520px" display="block" margin="0 0 10px 0">
        <H2 margin="30px 0">{content.title}</H2>
        <Marquee_v2
          speed={0.7}
          reversed={false}
          containerstyle={{ height: "435px" }}
        >
          <Div height="435px">
            {content?.cases.map((student, i) => (
              <Div
                key={`${student.name}-${i}`}
                display="flex"
                flexDirection="column"
                width="282px"
                minWidth="282px"
                borderRadius="4px"
                border={`2px solid ${Colors.lightGray}`}
                margin="0 20px 0 0"
              >
                <Div width="100%">
                  <StyledBackgroundSection
                    borderRadius="4px 4px 0 0"
                    height="162px"
                    width="100%"
                    image={
                      student.img && student.img.childImageSharp.gatsbyImageData
                    }
                    bgSize="cover"
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
                  <Div margin="10px 0 0 0">
                    <Div className="react-tel-input" margin="0" width="25px">
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
                    <HR
                      background={Colors.lightGray}
                      width="100%"
                      height="1px"
                    />
                  </Div>
                  <Div>
                    <Paragraph
                      textAlign="left"
                      color={Colors.black}
                      opacity="1"
                    >
                      {student.description.length > 120
                        ? student.description.substring(0, 120) + "..."
                        : student.description}
                    </Paragraph>
                  </Div>
                  <Div
                    alignItems="center"
                    width="fit-content"
                    padding="3px 5px"
                    background={Colors.lightYellow}
                    position="absolute"
                    bottom="17px"
                    right="17px"
                  >
                    <Icon icon="flag-check" color={Colors.yellow} />
                    <Paragraph
                      margin="0 0 0 5px"
                      fontSize="9px"
                      color={Colors.yellow}
                    >
                      {student.achievement}
                    </Paragraph>
                  </Div>
                </Div>
              </Div>
            ))}
          </Div>
        </Marquee_v2>
      </GridContainer>
    </Fragment>
  );
};

export default ScholarshipSuccessCases;
