import React from 'react';
import {Div, Grid, GridContainer} from '../Sections'
import {Colors, StyledBackgroundSection} from '../Styling';
import Img from "gatsby-image"
import {H2, H3, H4, Title, Paragraph} from '../Heading'
import Link from 'gatsby-link'
import Card from '../Card';
import Fragment from "../Fragment"

const OurPartners = ({title, paragraph, background, link, showFeatured, images, slider, ...rest}) => {
  return (
    <Fragment github="/components/partner" >
      {title &&
        <GridContainer margin="0 0 40px 0"
          background={background}
        >
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding_tablet="0 4em"
            padding="0 2em"
          >
            <H2 margin="0 0 15px 0" fontSize="15px" lineHeight="19px" fontWeight="900">{title}</H2>
            <Paragraph>{paragraph}</Paragraph>
          </Div>
        </GridContainer>}
      {showFeatured &&
        <>
          <GridContainer columns_tablet="3">
            {/* <Div justifyContent="center" flexDirection="column" flexDirection_md="row"> */}
            {images.filter(f => f.featured == true).map((m, i) => {
              return (
                <Img
                  key={i}
                  style={{height: "55px", minWidth: "100px", margin: "23px 15px"}}
                  imgStyle={{objectFit: "contain"}}
                  alt={m.name}
                  fluid={m.image.childImageSharp.fluid}
                />
              )
            })}
            {/* </Div> */}
          </GridContainer>
          <GridContainer>
            <Div height="1px" background={Colors.lightGray} margin="30px 0" margin_tablet="80px 0" />
          </GridContainer>
        </>
      }
      {slider ? <Div className="badge-slider" justifyContent="between" margin="0 0 60px 0">
        {images.map((l, i) => {
          return (
            <Img
              key={i}
              style={{height: "80px", minWidth: "120px", margin: "0 15px"}}
              imgStyle={{objectFit: "contain"}}
              alt={l.name}
              fluid={l.image.childImageSharp.fluid}
            />
          )
        })}
      </Div>
        :
        <>
          <Div className="badge-slider" justifyContent="between" margin="0 0 60px 0" display_tablet="none">
            {images.map((l, i) => {
              return (
                <Img
                  key={i}
                  style={{height: "80px", minWidth: "120px", margin: "0 15px"}}
                  imgStyle={{objectFit: "contain"}}
                  alt={l.name}
                  fluid={l.image.childImageSharp.fluid}
                />
              )
            })}
          </Div>
          <GridContainer columns_tablet="4" padding_tabletChild="0 80px" display="none">
            {images.map((l, i) => {
              return (
                i < 4 &&
                <Img
                  key={i}
                  style={{height: "40px", minWidth: "100px", margin: "0 15px"}}
                  imgStyle={{objectFit: "contain"}}
                  alt={l.name}
                  fluid={l.image.childImageSharp.fluid}
                />
              )
            })}
          </GridContainer>
          {/* <Grid columns="4" rows="1" margin_md="0 200px" display="none" display_tablet="grid">
          </Grid> */}
          <GridContainer columns_tablet="5" margin_tablet="30px 0" display="none">
            {images.map((l, i) => {
              return (
                i > 3 && i < 9 &&
                <Img
                  key={i}
                  style={{height: "40px", minWidth: "100px", margin: "0 15px"}}
                  imgStyle={{objectFit: "contain"}}
                  alt={l.name}
                  fluid={l.image.childImageSharp.fluid}
                />
              )
            })}
          </GridContainer>
          <GridContainer columns_tablet="2" padding_tabletChild="0 10em" display="none">
            {images.map((l, i) => {
              return (
                i > 8 &&
                <Img
                  key={i}
                  style={{height: "40px", minWidth: "120px", margin: "0 15px"}}
                  imgStyle={{objectFit: "contain"}}
                  alt={l.name}
                  fluid={l.image.childImageSharp.fluid}
                />
              )
            })}
          </GridContainer>
        </>
      }

      {link &&
        <Div gridArea_md="2/3/2/11" justifyContent="center" margin="50px 0 0 0">
          <Link to={rest.props.footer_link}><Paragraph color={Colors.blue}>{rest.props.footer_button}</Paragraph></Link>
        </Div>
      }
    </Fragment>
  )
};

export default OurPartners;
