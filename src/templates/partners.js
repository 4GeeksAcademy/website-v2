import React, {useState, useRef} from 'react';
import Link from 'gatsby-link'
import {navigate} from 'gatsby';
import {Column, Row, GridContainer, Header, Div, Grid} from "../components/Sections"
import {H1, H2, H3, H4, Paragraph} from '../components/Heading'
import {Button, Colors, StyledBackgroundSection} from '../components/Styling'
import Badges from '../components/Badges'
import OurPartners from '../components/OurPartners'
import BaseRender from './_baseLayout'
import {beHiringPartner} from "../actions";
import {Circle} from '../components/BackgroundDrawing'
import Modal from '../components/Modal';
import {SessionContext} from '../session'
import LeadForm from "../components/LeadForm/index.js";

function rand () {
  return Math.round(Math.random() * 20) - 10;
}

const Partners = (props) => {
  const {session} = React.useContext(SessionContext);
  const {data, pageContext, yml, path} = props;
  const [open, setOpen] = React.useState(false);
  const joinPartnersRef = useRef(null)
  // console.log("SESSION: ", session)
  // session.pathsDictionary && console.log("slug: ", session.pathsDictionary[`${window.location?.pathname}`])
  // session.pathsDictionary && console.log("slug: ", session.pathsDictionary[path])

  const goToForm = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: joinPartnersRef.current?.offsetTop - "100",
      behavior: "smooth"
    })
  }
  const handleClose = () => {
    setOpen(false);
  };
  const partnersData = data.allPartnerYaml.edges[0].node;
  // React.useEffect(() => {
  //   console.log("HASHcourse: ", window.location)
  //   if (session.language === "es" && window.location.hash === "" && !RegExp('\/es\/alianzas').test(window.location.href)) navigate("/es/alianzas")
  // }, [session])
  return (
    <>

      <Header
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        padding_tablet="65px 0 60px 0"
        padding="0 17px 30px 17px"
        position="relative"
        paddingTitle_tablet="0 15%"
        paddingParagraph_tablet="0 16%"
        
      // height_tablet="350px"
      >
        <Circle color="grey" width="17px" height="17px" top="20px" left="90px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="black" width="17px" height="17px" top="20px" left="125px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="20px" left="168px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="20px" left="205px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="20px" left="304px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="yellow" width="17px" height="17px" top="52px" left="35px" zIndex="1" display="none" display_tablet="inline" opacity="0.2" />
        <Circle color="black" width="17px" height="17px" top="52px" left="70px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="52px" left="125px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="52px" left="168px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="blue" width="17px" height="17px" top="52px" left="249px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="lightBlue" width="57px" height="57px" top="52px" left="-28px" display="inline" display_tablet="none" />
        <Circle color="red" width="27px" height="27px" top="183px" left="125px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="yellow" width="116px" height="116px" bottom="-58px" left="-58px" zIndex="10" />

        <Circle color="yellow" width="250px" height="250px" bottom="-100px" right="-68px" opacity="0.2" zIndex="10" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="120px" right="50px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="black" width="17px" height="17px" top="120px" right="89px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="120px" right="128px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="black" width="119px" height="11px" border="10px" bottom="115px" right="40px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="black" width="77px" height="11px" border="10px" bottom="115px" right="175px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="yellow" width="21px" height="21px" top="10px" right="320px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="blue" width="57px" height="57px" top="32px" right="61px" display="none" display_tablet="inline" />

        <Div flexDirection_tablet="row" flexDirection="column" justifyContent="center" alignItems="center">
          <Link to={yml.button_section.button_link}
            state={{course: yml.meta_info.bc_slug}}
          >
            <Button onClick={goToForm} variant="full" color={Colors.blue} margin="10px 24px 10px 0" textColor="white">{yml.button_section.button_text}</Button>
          </Link>
        </Div>
      </Header>

      <Grid gridTemplateColumns_tablet="14" margin_tablet="0 0 73px 0" margin="0 0 36px 0">
        <Div grid_column_tablet="1 / span 14">
          <StyledBackgroundSection
            height={`389px`}
            image={yml.header.image.childImageSharp.gatsbyImageData}
            bgSize={`cover`}
            alt={yml.header.image_alt}
          />
        </Div>
      </Grid>

      <Badges lang={pageContext.lang} link padding="10px 0 60px 0" padding_tablet="10px 0 60px 0" />
      <Div height="5px" display="none" margin_tablet="40px 0" display_md="flex" background={Colors.lightGray}></Div>
      <OurPartners
        images={partnersData.partners.images}
        title={partnersData.partners.tagline}
        paragraph={partnersData.partners.sub_heading}
        showFeatured
        props={partnersData.partners}
      />
      <GridContainer fluid background={Colors.verylightGray} padding="36px 17px 80px 17px" padding_tablet="75px 0 133px 0" margin_tablet="115px 0 100px 0">
        <GridContainer columns_tablet="12" margin_tablet="0 0 50px 0">
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            gridColumn_tablet="3 /11"
          >
            <H2 margin="0 0 15px 0">{partnersData.coding.tagline}</H2>
            <Paragraph>{partnersData.coding.sub_heading}</Paragraph>
          </Div>
        </GridContainer>
        <GridContainer backgroundChild={Colors.white} padding_tablet="42px 0 80px 0">
          <OurPartners
            images={partnersData.coding.images}
            showFeatured
            props={partnersData.partners}
          />
        </GridContainer>
      </GridContainer>
      <GridContainer columns_tablet="12" padding="99px  17px 80px 17px" padding_tablet="0" margin_tablet="0 0 81px 0">
        <Div ref={joinPartnersRef} gridColumn_tablet="1 / 7" flexDirection="column" >
          <H2 textAlign_md="left" margin="0 0 30px 0">{`</ ${yml.form.title}`}</H2>
          {yml.form.paragraph.split("\n").map((m, i) =>
            <Paragraph 
              key={i}
              margin="7px 0"
              textAlign_md="left"
              dangerouslySetInnerHTML={{__html: m}}
            />
          )}
        </Div>
        <Div flexDirection="column" gridColumn_tablet="7 / 13">
          <LeadForm
            formHandler={beHiringPartner}
            handleClose={handleClose}
            lang={pageContext.lang}
            inputBgColor={Colors.white}
            fields={['full_name', 'email', 'phone', 'client_comments']}
          />
        </Div>

      </GridContainer>
    </>
  )
};
export const query = graphql`
query PartnersQuery($file_name: String!, $lang: String!) {
  allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
    edges{
      node{
        meta_info{
          slug
          title
          description
          image
          keywords
        }
        seo_title
        header{
          title
          paragraph
          image_alt
          button
          image{
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                width: 1200
                quality: 100
                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                breakpoints:	[200, 340, 520, 890]
              )
              # fluid(maxWidth: 1200, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
              #   ...GatsbyImageSharpFluid_withWebp
              # }
            }
          }
        }
        form{
          title
          paragraph
        }
        footer_data{
          alt
          image{
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                width: 1600
                quality: 100
                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
              )
              # fluid(maxWidth: 1600, quality: 100){
              #   ...GatsbyImageSharpFluid_withWebp
              # }
            }
          }
        }
        button_section{
          button_text
        }
      }
    }
  }
  allCredentialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
    edges {
      node {
        credentials {
          title
          icon
          value
        }
      }
    }
  }
  allPartnerYaml(filter: { fields: { lang: { eq: $lang }}}) {
    edges {
      node {
        partners {
          images {
            name
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 150
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxWidth: 150){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
            featured
          }
          tagline
          sub_heading
          footer_button
          footer_link
        }
        coding {
          images {
            name
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 150
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxWidth: 150){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
            featured
          }
          tagline
          sub_heading
        }
        influencers {
          images {
            name
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 150
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )

                # fluid(maxWidth: 150){
                #   ...GatsbyImageSharpFluid_withWebp
                #       }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              financials {
                images {
                  name
                  image {
                    childImageSharp {
                      gatsbyImageData(
                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                        width: 150
                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                      )
                      # fluid(maxWidth: 150){
                      #   ...GatsbyImageSharpFluid_withWebp
                      # }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
            }
          }
        }
      }
      `;
export default BaseRender(Partners);
