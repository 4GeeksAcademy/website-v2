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
        <Div
          gridArea_md="1/4/1/10"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <H1
            type="h1"
            fontSize="13px"
            lineHeight="16px"
            fontWeight="700"
            letterSpacing="0.05em"
            color="#606060"
          >{yml.seo_title}</H1>
          <H2 fontSize="50px" lineHeight="60px" margin="16px 17px 19px 17px">{`< ${yml.header_data.tagline} >`}</H2>
          <Paragraph margin="0 17px 19px 17px" width_sm="70%" width_tablet="50%">{yml.header_data.sub_heading}</Paragraph>
          <Button width="300px" color={Colors.blue} textColor="white">{yml.button_section.button_text}</Button>

        {/* <Div flexDirection_md="row" flexDirection="column" justifyContent="center">
          <Link to={yml.button_section.button_link}
            state={{course: yml.meta_info.bc_slug}}
          >
            <Button width="fit-content" color={Colors.blue} padding="13px 24px" margin="10px 24px 10px 0" textColor="white">{yml.button_section.button_text}</Button>
          </Link> */}

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
      <OurPartners
        title={partnersData.coding.tagline}
        paragraph={partnersData.coding.sub_heading}
        images={partnersData.coding.images}
        showFeatured={true}
        props={partnersData.partners}
      />
      <GridContainer columns_tablet="12" padding_tablet="0">
        <Div gridColumn_tablet="1 / 7" flexDirection="column" >
          <H2 textAlign_md="left" margin="0 0 30px 0">{`</ ${yml.form.title}`}</H2>
          {yml.form.paragraph.split("\n").map((m, i) =>
            <Paragraph key={i} margin="7px 0" textAlign_md="left" dangerouslySetInnerHTML={{__html: m}}></Paragraph>
          )}
        </Div>
        <Div justifyContent="center" gridColumn_tablet="8 / 13" margin="0 0 81px 0">
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
