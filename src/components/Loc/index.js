import React, {useContext} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Title, H1, H2, H3, H4, Span, Paragraph, Separator} from '../Heading';
import {Container, Row, Column, Wrapper, Divider} from '../Sections'
import {Button, Colors, Check, ArrowRight, RoundImage, Over, StyledBackgroundSection} from '../Styling'
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Card} from '../Card';
import Link from 'gatsby-link'

const Loc = (props) => {

  let loc = props.locations.filter(l => l.node.meta_info.unlisted != true).sort((a, b) => a.node.meta_info.position > b.node.meta_info.position ? 1 : -1)
  return (
    <>
      <Row
        github={"/location"}
      >
        <Column
          size="12"
          border="bottom"
          image="no"
          color={Colors.white}
        ><Carousel
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
          showArrows={true}
          interval={5000}
          transitionTime={1000}
        >
            {loc != null &&
              loc.map((item, index) => {
                return (
                  <Card key={index} shadow borders="1.25rem" height="500px">
                    <Row
                      height="100%"
                      marginLeft="0"
                      marginRight="0"
                      customRespSize

                    >
                      <Column
                        size="6"
                        customRespSize
                        respSize="6"
                        alignSelf="center"
                        height="100%"
                        paddingLeft={`0`}
                      >
                        <StyledBackgroundSection
                          className={`image`}
                          height={`500px`}
                          image={item.node.header.image && item.node.header.image.childImageSharp.fluid}
                          bgSize={`cover`}
                          alt="Cnn Logo"
                        />
                      </Column>
                      <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" border="bottom">
                        <Row align="center" height="100%">
                          <Column size="9" height="100%">
                                <H3
                                  margin="20px 0"
                                  fs_xs="20px"
                                  fs_sm="22px"
                                  fs_md="20px"
                                  fs_lg="20px"
                                  fs_xl="20px"
                                  align="left"
                                >
                                  {item.node.city}
                                </H3>
                              <Separator left variant="primary" />
                              <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{item.node.carousel_box.content}</Paragraph>
                          </Column>
                        </Row>


                      </Column>
                    </Row>
                  </Card>
                )
              })

            }
          </Carousel>
        </Column>
      </Row>
      <Divider height="10px" />
      <Row height="auto" align="center">
        {loc.map((pic, i) => {
          let randLocImgIndex = Math.floor(Math.random() * pic.node.carousel_box.images.length)
          return (
            <Column key={i} size="2" customRespSize respSize="2" padding="0 25px">
              {/* <Card width="100%" > */}
              <Link to={`/${props.lang}/location/${pic.node.meta_info.slug}`}>
                <StyledBackgroundSection
                  className={`img-thumbs`}
                  height={`60px`}
                  image={pic.node.carousel_box.images[randLocImgIndex].path && pic.node.carousel_box.images[randLocImgIndex].path.childImageSharp.fluid}
                  bgSize={`cover`}
                  alt={pic.node.carousel_box.images[randLocImgIndex].alt}
                >
                  <Row
                    height="100%"
                    align="around"
                    backgroundHover={Colors.blue}
                    marginHover="0"
                    borderRadiusHover=".25rem"
                  >
                    <Column size="12" alignSelf="center" align="center">

                      <H4
                        bg={`rgba(0,0,0,0.4)`}
                        bgHover={`initial`}
                        color={Colors.white}
                        fs_xs="9px"
                        fs_sm="12px"
                        fs_md="12px"
                        fs_lg="14px"
                        fs_xl="16px"

                      >
                        {pic.node.city}
                      </H4>

                    </Column>
                  </Row>
                </StyledBackgroundSection>
                {/* </RoundImage> */}
              </Link>
              {/* </Card> */}
            </Column>
          )
        })}
      </Row>
    </>)
};


export default Loc;