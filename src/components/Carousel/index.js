
import React, { useState, useRef, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { H1, H2, H3, H4, Title, Separator, Paragraph } from "../Heading";
import { Anchor, Colors, Button } from "../Styling";
import { Row, GridContainer, Div } from "../Sections";
import Fragment from "../Fragment";
import styled from "styled-components";
import Icon from "../Icon";
import DraggableDiv from "../DraggableDiv";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SessionContext } from "../../session";
import Slider from "react-slick";
import "../../assets/css/carousel.css"


const Carousel = ({
  content,
  main_gap,
  width_container,
  flexDirection,
  width_image,
  height_image,
  gap,
  alignItemsTablet_image,
  scrollX,
}) => {

  var coords = 0;

  useEffect(() => {
    coords = document.querySelector(".scroll-items").getBoundingClientRect();
    
  })

  const scrollLeft = (scroll) => {
    var left = document.querySelector(".scroll-items");
    left?.scrollBy(-1 * scroll, 0);
  };

  const scrollCenter = (coords) => {
    var center = document.querySelector(".scroll-items");
    center?.scrollBy(coords.width / 2, 0);
  };

  const scrollRight = (scroll) => {
    var right = document.querySelector(".scroll-items");
    right?.scrollBy(scroll, 0);
  };

  return (
    <Div
      flexDirection="column"
      padding_xxs="20px 20px"
      padding_md="40px 80px"
      padding_lg="40px 0px"
      padding_tablet="40px 40px 10px 40px"
      margin_tablet="30px auto"
      margin="0 0 36px 0"
      maxWidth="1366px"
      gap="32px 0"
    >

      {(content?.heading || content?.content) &&
        <Div
          flexDirection_md="row"
          flexDirection="column"
          alignItems="center"
          gap="32px"
        >
          {content?.heading &&
            <H2 textAlign="left" lineHeight="36px">
              {content?.heading}
            </H2>
          }

          {content?.content &&
            <Div flexDirection="column" margin="0 0 10px 0">
              {content?.content.split("\n").map((m, i) => (
                <Paragraph
                  key={i}
                  textAlign="left"
                  margin="0 0 0 0"
                  fontSize="15px"
                  lineHeight="20px"
                >
                  {m}
                </Paragraph>
              ))}
            </Div>}
        </Div>
      }

      {content?.images &&
        <>
          <Div
            className="main-scroll-div"
            //width="90%"
            alignItems="center"
            justifyContent="between"
            position="relative"
          >
            <Div
              className="cover"
              position="relative"
              width="90%"
              width_md="95%"
            >
              <Div
                className="scroll-items"
                alignItems="start"
                justifyContent="left"
                overflow="auto"
                position="relative"
                gap={main_gap || "36px"}
              >
                {content?.images.map((item, index) => {
                  return (
                    <Div
                      className="child"
                      key={index}
                      minWidth={width_container || "220px"}
                      height="fit-content"
                      overflow="hidden"
                      flexDirection={flexDirection || "row"}
                      gap={gap || "8px"}
                      id={`slide${index}`}
                    >
                      <Div
                        //minWidth="184px"
                        width={width_image || "100%"}
                        height={height_image || "100%"}
                        //margin="0 10px 0 0"
                        alignItems_tablet={alignItemsTablet_image || "center"}
                      >
                        <GatsbyImage
                          image={getImage(
                            item.path && item.path.childImageSharp.gatsbyImageData
                          )}
                          style={{
                            height: "100%",
                            //width: "220px",
                            //minWidth: "100%",
                            backgroundSize: `cover`,
                          }}
                          alt={item.alt}
                        />
                      </Div>
                      {/* { item.title &&
                  <H3 fontSize="18px" lineHeight="22px" margin="14px 0 0 0">
                    {item.title}
                  </H3>
                }
                {
                  item.sub_title &&
                  <H4 fontSize="15px" lineHeight="18px" margin="8px 0">
                  {item.sub_title}
                </H4>}

                { item.link &&
                  <Anchor
                  to={item.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  textAlign="center"
                >
                  <Icon
                    icon="linkedin-new"
                    width="24px"
                    fill="#2867b2"
                    stroke="#2867b2"
                  />
                </Anchor>} */}
                    </Div>
                  );
                })}

              </Div>
            </Div>
            <Button
              padding="0"
              padding_xs="0"
              padding_tablet="0"
              position="absolute"
              zIndex="101"
              top="50%"
              right="0%"
              right_md="0%"
              right_lg="2%"
              right_tablet="0%"
              height="38px"
              width="24px"
              height_tablet="44px"
              onClick={() => scrollRight(scrollX || 257)}
            >
              <Icon width="100%" height="100%" icon="arrow-right" />
            </Button>
          </Div>

          <Div
            className="dots"
            justifyContent="center"
            gap="16px"
          >
            <Anchor className="dot" onClick={() => scrollLeft(10000)}></Anchor>
            <Anchor className="dot" onClick={() => scrollCenter(coords)}></Anchor>
            <Anchor className="dot" onClick={() => scrollRight(10000)}></Anchor>
          </Div>
        </>}
    </Div>
  )
}

export default Carousel;