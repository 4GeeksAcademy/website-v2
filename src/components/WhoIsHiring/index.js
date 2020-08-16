import React, {useState} from 'react';
import {Column, Row, Divider} from '../../components/Sections'
import {useStaticQuery, graphql} from 'gatsby';
import {RoundImage, Colors, BackgroundSection} from '../Styling';
import {H2, H3, H4, Title, Paragraph} from '../Heading'
import Link from 'gatsby-link'
import {Card} from '../Card';
import Img from "gatsby-image"
import Fragment from "../Fragment"
const WhoIsHiring = props => {
  const partners = props.lang[0].node
  return (
    <Fragment github="/components/partner">
      {props.source === "partners"
        ?
        <>
          <Title
            title={partners.partners.tagline}
            primary
            size="8"
            paragraph={partners.partners.sub_heading}
            customParagraphSize="8"
          />
          <Divider height="100px" />
          <Row >
            {partners.partners.images.map((partner, index) => (
              <Column size="3" customRespSize respSize="3" key={index} margin="5px 0">
                <Card width="100%"
                  p_xs="0"
                  p_sm="0"
                  p_md="20px"
                  p_lg="20px"
                  p_xl="20px">
                  {/* <Img className={`image`} fluid={partner.image.childImageSharp.fluid} alt="Cnn Logo"></Img> */}
                  <BackgroundSection
                    data={partner.image.childImageSharp.fluid}
                    alt={partner.alt}
                    height={`60px`}
                    bgSize={`contain`}
                    margin={`1rem`}
                  ></BackgroundSection>
                  {/* <RoundImage
                    h_xs="50px"
                    h_sm="70px"
                    h_md="80px"
                    h_lg="90px"
                    h_xl="80px"
                    width="100%"
                    url={partner.image}
                    border=".75rem"
                    bsize="contain"
                    position="center center"

                    backgroundColor="transparent"
                  /> */}
                </Card>
              </Column>
            ))}
          </Row>
          <Divider height="50px" />
          <Row align="center">
            <H4 primary>{partners.partners.footer_tagline}</H4>
          </Row>
          <Row align="center" marginTop="15px">
            {partners.partners.footer_link != undefined
              ?
              <Link to={partners.partners.footer_link}>
                <Paragraph color={Colors.blue}>{partners.partners.footer_button}</Paragraph>
              </Link> :
              <Paragraph color={Colors.blue}>{partners.partners.footer_button}</Paragraph>}
          </Row>
        </>
        : props.source === "coding"
          ?
          <>
            <Title
              title={partners.coding.tagline}
              primary
              size="8"
              paragraph={partners.coding.sub_heading}
            />
            <Divider height="100px" />
            <Row>
              {partners.coding.images.map((partner, index) => (
                <Column size="3" customRespSize respSize="3" key={index} margin="5px 0">
                  <Card width="100%"
                    p_xs="0px"
                    p_sm="0px"
                    p_md="20px"
                    p_lg="20px"
                    p_xl="20px">
                    <BackgroundSection
                      data={partner.image.childImageSharp.fluid}
                      alt={partner.alt}
                      height={`60px`}
                      margin={`1rem`}
                      bgSize={`contain`}
                    ></BackgroundSection>
                    {/* <RoundImage
                      h_xs="50px"
                      h_sm="50px"
                      h_md="80px"
                      h_lg="90px"
                      h_xl="80px"
                      width="100%"
                      url={partner.image}
                      border=".75rem"
                      bsize="contain"
                      position="center"
                      backgroundColor="transparent"
                    /> */}
                  </Card>
                </Column>
              ))}
            </Row>
          </>
          : props.source === "influencers"
            ?
            <>
              <Title
                title={partners.influencers.tagline}
                primary
                size="8"
                paragraph={partners.influencers.sub_heading}
              />
              <Divider height="100px" />
              <Row>
                {partners.influencers.images.map((partner, index) => (
                  <Column size="3" customRespSize respSize="3" key={index} margin="5px 0">
                    <Card
                      width="100%"
                      p_xs="0"
                      p_sm="0"
                      p_md="20px"
                      p_lg="20px"
                      p_xl="20px"
                    >
                      <BackgroundSection
                        data={partner.image.childImageSharp.fluid}
                        alt={partner.alt}
                        height={`60px`}
                        margin={`1rem`}
                        bgSize={`contain`}
                      ></BackgroundSection>
                      {/* <RoundImage
                        h_xs="50px"
                        h_sm="50px"
                        h_md="80px"
                        h_lg="90px"
                        h_xl="80px"
                        width="100%"
                        url={partner.image}
                        border=".75rem"
                        bsize="contain"
                        position="center"
                        backgroundColor="transparent" /> */}
                    </Card>
                  </Column>
                ))}
              </Row>
            </>
            : props.source === "financials" &&
            <>
              <Title
                title={partners.financials.tagline}
                primary
                size="8"
                paragraph={partners.financials.sub_heading}
              />
              <Divider height="100px" />
              <Row>
                {partners.financials.images.map((partner, index) => (
                  <Column size="4" customRespSize respSize="4" key={index} margin="5px 0">
                    <Card width="100%"
                      p_xs="0"
                      p_sm="0"
                      p_md="20px"
                      p_lg="20px"
                      p_xl="20px"
                    >
                      <BackgroundSection
                        data={partner.image.childImageSharp.fluid}
                        alt={partner.alt}
                        height={`60px`}
                        margin={`1rem`}
                        bgSize={`contain`}
                      ></BackgroundSection>
                      {/* <RoundImage
                        h_xs="50px"
                        h_sm="50px"
                        h_md="80px"
                        h_lg="90px"
                        h_xl="40px"
                        width="100%"
                        url={partner.image}
                        border=".75rem"
                        bsize="contain"
                        position="center"
                        backgroundColor="transparent" /> */}
                    </Card>
                  </Column>
                ))}
              </Row>
            </>
      }
    </Fragment>
  )
};

export default WhoIsHiring;
