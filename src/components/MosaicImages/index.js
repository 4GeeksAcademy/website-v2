import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import {
  Div,
  GridContainerWithImage,
  GridContainer,
  Divider,
} from "../Sections";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const MosaicImages = (props) => {
  const { yml } = props;

  return (
    <>
      {yml?.images && (
        <GridContainer
          margin="0 auto"
          padding_xxs="40px 20px"
          padding_md="40px 80px"
          padding_lg="40px 0px"
          padding_tablet="40px 40px"
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
          {yml?.images.map((m, i) => {
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
