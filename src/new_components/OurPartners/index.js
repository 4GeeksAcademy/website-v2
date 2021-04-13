import React from 'react';
import { Div, Grid, GridContainer } from '../Sections'
import { Colors, StyledBackgroundSection } from '../Styling';
import Img from "gatsby-image"
import { H2, H3, H4, Title, Paragraph } from '../Heading'
import Link from 'gatsby-link'
import Card from '../Card';
import Fragment from "../Fragment"

// Funcion que muestra TITULO + PARAGRAFO centrados
const Title_Paragraph = (props) =>{
  
  return(
    <>
      <GridContainer margin="0 0 40px 0" background={props.background} >

        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding_tablet="0 4em"
          padding="0 2em"
        >
          {/*<H2 margin="0 0 15px 0" fontSize="15px" lineHeight="19px" fontWeight="900">{title}</H2>*/}
          <H2 fontFamily="Lato"
            fontWeight="900"
            fontSize="15px"
            lineHeight="19px"
            letterSpacing="0.05em"
            color="#3A3A3A"
            width="100%"
            margin="0 0 15px 0"
            style={{ fontStyle: "normal", textTransform: "uppercase" }}
          >
            {props.title}
          </H2>

          {/*<Paragraph>{paragraph}</Paragraph>*/}
          <Paragraph fontFamily="Lato"
            fontWeight="normal"
            fontSize="15px"
            lineHeight="22px"
            letterSpacing="0.05em"
            color="#3A3A3A"
            width="100%"
            margin="0 0 15px 0"
            style={{ fontStyle: "normal" }}
          >
            {props.paragraph}
          </Paragraph>

        </Div>

      </GridContainer>
    </>
  )
}


//Funcion que muestra las imagenes dentro de un slider
const Images_With_Slider = (props) => {
  return (
    <>      
      <Div className="badge-slider" justifyContent="between" margin="0 0 50px 0" >
        {props.images.map((l, i) => {
          return (
            <Img
              key={i}
              style={{ height: "80px", minWidth: "120px", margin: "0 15px" }}
              imgStyle={{ objectFit: "contain" }}
              alt={l.name}
              fluid={l.image.childImageSharp.fluid}
            />
          )
        })}
      </Div>
    </>
  )
}


//Funcion que muestra las imagenes en columna y centradas
const Images_Centered = (props) => {
  return(
    <Div
      display="flex"
      flexDirection="row"
      style={{ flexWrap: "wrap" }}
      justifyContent="center"
      background={Colors.white}
      padding="50px 20px 0px 20px"
      margin="0 25px 50px 25px" >

      {props.images.map((l, i) => {
        return (
          <Div margin="0 61px 40px 0">
            <Img
              key={i}
              style={{ height: "80px", minWidth: "120px" }}
              imgStyle={{ objectFit: "contain" }}
              alt={l.name}
              fluid={l.image.childImageSharp.fluid}
            />
          </Div>
        )
      })}
    </Div>
  )
}


//Imagenes con propiedad featured==true
const Images_Featured = (props) =>{
  return (
    <>      
      <GridContainer columns_tablet="3">
        {/* <Div justifyContent="center" flexDirection="column" flexDirection_md="row"> */}
        {props.images.filter(f => f.featured == true).map((m, i) => {
          return (
            <Img
              key={i}
              style={{ height: "55px", minWidth: "100px", margin: "23px 15px" }}
              imgStyle={{ objectFit: "contain" }}
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
  )
}

//Punto de entrada al componente
const OurPartners = ({ title, paragraph, background, link, showFeatured, images, slider, ...rest }) => {

  return (
    <Fragment github="/components/partner" >      
      {        
        title && <Title_Paragraph title={title} paragraph={paragraph} background={background} />
      }      
      {
        showFeatured && <Images_Featured images={images}/>          
      }
      {
        slider ? 
              <Images_With_Slider images={images} /> 
              : 
              <Images_Centered images={images} />          
      }
      {
        link &&
        <Div gridArea_md="2/3/2/11" justifyContent="center" margin="50px 0 0 0">
          <Link to={rest.props.footer_link}><Paragraph color={Colors.blue}>{rest.props.footer_button}</Paragraph></Link>
        </Div>
      }    
    </Fragment>
  )
};

export default OurPartners;