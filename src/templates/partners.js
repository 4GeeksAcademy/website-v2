import React, {useState} from 'react';
import Link from 'gatsby-link'
import {Column, Row, GridContainer, Header, Div, Grid} from "../new_components/Sections"
import {H1, H2, H3, H4, Paragraph} from '../new_components/Heading'
import {Button, Colors, StyledBackgroundSection} from '../new_components/Styling'
import Badges from '../new_components/Badges'
import OurPartners from '../new_components/OurPartners'
import BaseRender from './_baseLayout'
import {beHiringPartner} from "../actions";
import LeadForm from "../new_components/LeadForm/index.js";

function rand () {
  return Math.round(Math.random() * 20) - 10;
}

const Partners = (props) => {
  const {data, pageContext, yml} = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const partnersData = data.allPartnerYaml.edges[0].node;
  return (
    <>      
      <Header
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        padding_tablet="72px 0 40px 0"
      >
        <Div flexDirection_tablet="row" flexDirection="column" justifyContent="center">
          <Link to={yml.button_section.button_link}
            state={{course: yml.meta_info.bc_slug}}
          >
            <Button width="fit-content" color={Colors.blue} padding="13px 24px" margin="10px 24px 10px 0" textColor="white">{yml.button_section.button_text}</Button>
          </Link>
        </Div>
      </Header>

      <Grid gridTemplateColumns_tablet="14" margin_tablet="0 0 73px 0" margin="0 0 36px 0">
        <Div grid_column_tablet="1 / span 14">
          <StyledBackgroundSection
            height={`389px`}
            image={yml.header.image.childImageSharp.fluid}
            bgSize={`cover`}
            alt={yml.header.image_alt}
          />
        </Div>
      </Grid>

      <Badges lang={pageContext.lang} link />

      <Div height="5px" display="none" margin_tablet="73px 0" display_md="flex" background={Colors.lightGray}></Div>
    
      <OurPartners
        images={partnersData.partners.images}
        title={partnersData.partners.tagline}
        paragraph={partnersData.partners.sub_heading}
        showFeatured={true}
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
            showFeatured={true}
            props={partnersData.partners}                               
          />
        </GridContainer>
      </GridContainer>

      <GridContainer columns_tablet="12" padding="99px  17px 80px 17px" padding_tablet="0" margin_tablet="0 0 81px 0">
        <Div gridColumn_tablet="1 / 7" gridRow_tablet="1 / 1" flexDirection="column" >
          <H2 textAlign_md="left" margin="0 0 30px 0">{`</ ${yml.form.title}`}</H2>
        </Div>
        <Div gridColumn_tablet="1 / 7" gridRow_tablet="2 / 2" flexDirection="column" >
          {yml.form.paragraph.split("\n").map((m, i) =>
            <Paragraph key={i} margin="7px 0" textAlign_md="left" dangerouslySetInnerHTML={{__html: m}}></Paragraph>
          )}
        </Div>
        <Div justifyContent="center" gridColumn_tablet="8 / 13" gridRow_tablet="2 / 2" margin="0 0 81px 0">
          <LeadForm formHandler={beHiringPartner} handleClose={handleClose} lang={pageContext.lang} inputBgColor={Colors.white} />
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
                    fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                      ...GatsbyImageSharpFluid_withWebp
                    }
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
              fluid(maxWidth: 1600, quality: 100){
                ...GatsbyImageSharpFluid_withWebp
              }
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
                fluid(maxWidth: 150){
                  ...GatsbyImageSharpFluid_withWebp
                }
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
                fluid(maxWidth: 150){
                  ...GatsbyImageSharpFluid_withWebp
                }
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
                fluid(maxWidth: 150){
                  ...GatsbyImageSharpFluid_withWebp
                      }
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
                      fluid(maxWidth: 150){
                        ...GatsbyImageSharpFluid_withWebp
                      }
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
