import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import {
  Div,
  GridContainerWithImage,
  GridContainer,
  Divider,
} from "../Sections";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { H4, Paragraph } from "../Heading";

const MosaicImages = ({
  images,
  heading,
  paragraph,
  padding_xxs,
  padding_md,
  padding_lg,
  padding_tablet,
}) => {
  if (images?.length > 5) {
    const limitedImages = images.pop();
  } else {
    const limitedImages = images;
  }

  return (
    <>
      {heading && (
        <Div
          flexDirection="column"
          padding="20px 20px"
          padding_md="40px 80px"
          padding_lg="40px 0px"
          padding_tablet="40px 40px 10px 40px"
          margin_tablet="0 auto 30px auto"
          margin="0 0 36px 0"
          maxWidth={"1366px"}
        >
          <Div
            alignItems="start"
            flexDirection="column"
            flexDirection_tablet="row"
            padding_lg="0 5%"
            gap="24px"
          >
            <Div width_tablet="30%">
              <H4
                fontSize="30px"
                //textTransform="uppercase"
                lineHeight="36px"
                fontWeight="700"
                textAlign="center"
                textAlign_tablet="start"
              >
                {heading}
              </H4>
            </Div>
            <Div width_tablet="70%">
              <Paragraph
                fontSize="15px"
                textAlign="center"
                textAlign_tablet="start"
                margin="0 0 50px 0"
              >
                {paragraph}
              </Paragraph>
            </Div>
          </Div>
        </Div>
      )}
      {images && (
        <GridContainer
          margin="0 auto"
          padding_xxs={padding_xxs || "20px 20px"}
          padding_md={padding_md || "20px 80px"}
          padding_lg={padding_lg || "20px 0px"}
          padding_tablet={padding_tablet || "20px 40px"}
          width_tablet="100%"
          maxWidth="1366px"
          columns_tablet="10"
          containerColumns_tablet="12"
          containerGridGap="0px"
          gridTemplateRows_tablet="repeat(4, 1fr)"
          gridTemplateAreas={`
        'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
        'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
        'image3 image3 image3 image3 image5 image5 image5 image5 image5 image5'
        'image4 image4 image4 image4 image5 image5 image5 image5 image5 image5'
        `}
          gridTemplateAreas_tablet={`
        'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
        'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
        'image3 image3 image3 image3 image5 image5 image5 image5 image5 image5'
        'image4 image4 image4 image4 image5 image5 image5 image5 image5 image5'
        `}
          height_tablet="fit-content"
          height="fit-content"
          childHeight="inherit"
        >
          {images.map((m, i) => {
            console.log(m);
            return (
              <GatsbyImage
                style={{ gridArea: `image${i + 1}`, borderRadius: "3px" }}
                key={i}
                image={getImage(m?.path?.childImageSharp.gatsbyImageData)}
                alt={m.alt}
              />
            );
          })}
        </GridContainer>
      )}
    </>
  );
};

export default MosaicImages;
