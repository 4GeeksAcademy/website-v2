import React from 'react';
import {Div} from '../Sections'
import {Colors, StyledBackgroundSection} from '../Styling';
import Img from "gatsby-image"
import {H2, H3, H4, Title, Paragraph} from '../Heading'
import Link from 'gatsby-link'
import Card from '../Card';
import Fragment from "../Fragment"
const OurPartners = props => {
  return (
    <Fragment margin={props.margin} padding="20px 0" github="/components/partner" >
      <Div className="badge-slider" justifyContent="between" margin="0 0 60px 0">
        {props.images.map((l, i) => {
          return (
            // <Div key={i} minWidth="200px" height="60px" margin="0 15px" >
            <Img
              style={{height: "80px", minWidth: "120px", margin: "0 15px"}}
              imgStyle={{objectFit: "contain"}}
              alt={l.name}
              fluid={l.image.childImageSharp.fluid}
            />
            // </Div>
          )
        })}

      </Div>
    </Fragment>

    // <Div display="flex" height="auto" style={{overflowX: "auto"}}>
    //   {/* <Fragment margin={props.margin} padding="20px 0" github="/components/partner"> */}
    //   {/* <Div style={{overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap"}}> */}
    //   {props.images.map((item, index) => {
    //     console.log("******: ", item)
    //     return (

    //       <Img key={index} className={`image`} fluid={item.image.childImageSharp.fluid} alt="Florida Education Logo"></Img>

    //       // <img width="250" height="100" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*" alt="Bhutan" />
    //       // <Div key={index} width="300px" height="100px" background="blue" margin="0 5px">

    //       // </Div>
    //       // <div key={index} style={{width: "250px", height: "100px", background: "blue", marginRight: "10px"}} height="100px" background="blue" margin="0 5px">Test</div>
    //     )
    //   })}
    // </Div>
    // </Fragment>
  )
};

export default OurPartners;

{/* <Row display="flex">
    {props.images.map((item, index) => (
      <Column key={index} size="3" size_sm="4" margin="5px 0">
        <Card width="100%" padding="20px" p_xs="3px">
          <StyledBackgroundSection
            image={item.image.childImageSharp.fluid}
            alt={item.alt}
            margin="auto"
            height="60px"
            maxWidth="150px"
            bgSize={`contain`}
          ></StyledBackgroundSection>
        </Card>
      </Column>
    ))}
  </Row>
  {props.footerTagline &&
    <div>
      <H4 margin="20px 0 10px 0" fs_xs="20px" fs_sm="20px" fs_md="20px" fs_lg="20px" fontSize="20px" primary>{props.footerTagline}</H4>
      <Link to={props.footerLink}>
        <Paragraph align="center" color={Colors.blue}>{props.footerButton}</Paragraph>
      </Link>
    </div>
  } */}

{/* // <Div width="350px">
        //   <StyledBackgroundSection
        //     image={item.image.childImageSharp.fluid}
        //     alt={item.alt}
        //     margin="0 5px"
        //     height="30px"
        //     width="100%"
        //     bgSize={`contain`}
        //   />
        // </Div> */}