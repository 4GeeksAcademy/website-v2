import React, {useState, useContext} from 'react';
import {Column, Row, Container, Divider, Wrapper, WrapperImage, Div} from "../components/Sections";
import {Title, H2, H5, Paragraph} from '../components/Heading';
import {Button, Colors, StyledBackgroundSection} from '../components/Styling';
import PricesAndPayment from '../components/PricesAndPayment';
import WhoIsHiring from '../components/WhoIsHiring';
import Img from "gatsby-image"
import BaseRender from './_baseLayout';
import {openGuidebook} from "../actions";
import {SessionContext} from '../session.js'

const Pricing = (props) => {
  const {session} = React.useContext(SessionContext);
  const {data, pageContext, yml} = props;
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;
  console.log("yml", yml);
  let location = null;
  if(session && session.location){

    location = data.allLocationYaml.edges.find(l => l.node.active_campaign_location_slug === session.location.active_campaign_location_slug)
    if(location) location = location.node;
  } 

  return (
    <>
      {/* HEADER SECTION */}
      <WrapperImage
        imageData={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
        className={`img-header`}
        height={`500px`}
        bgSize={`cover`}
        alt={yml.header_data.alt}
        paddingRight={`0`}
        customBorderRadius="0 0 0 1.25rem"
        margin="0 0 50px 0"
      >
        <Divider height="100px" />
        <Title
          size="5"
          color={Colors.white}
          title={yml.header_data.tagline}
          paragraph={yml.header_data.sub_heading}
          variant="main"
          paragraphColor={Colors.white}
          fontSize="46px"
          textAlign="center"

        />
      </WrapperImage>
      <Wrapper>
        <Row m_sm="0px 0px 100px 0">
          <Column size="5" size_sm="12" height="300px" align_sm="center">
          <Img
              fixed={yml.intro.image.childImageSharp.fixed}
              objectFit="cover"
              objectPosition="50% 50%"
              margin="auto"
            />
          </Column>
          <Column size="7" size_sm="12">
            <H2 align="left" margin="30px 0 20px 0" type="h1">{yml.intro.heading}</H2>
            <H5 align="left" fontSize="20px" fontHeight="30px">{yml.intro.content}</H5>
          </Column>
        </Row>
      </Wrapper>
      <Wrapper>
        <Row m_sm="0px 0px 0px 0">
          <Column size="7" size_sm="12">
            <H2 align="left" margin="30px 0 20px 0" type="h1">{yml.intro.heading_second}</H2>
            <H5 align="left" fontSize="20px" fontHeight="30px">{yml.intro.content_second}</H5>
          </Column>
          <Column size="5" disp_sm="none" height="300px" align_sm="center">
            <StyledBackgroundSection
              className={`image`}
              height={`250px`}
              image={yml.intro.image_second.childImageSharp.fluid}
              bgSize={`cover`}
              backgroundColor={Colors.lightGray}
              alt="4Geeks Academy"
              borderRadius={`1.25rem`}
            />
          </Column>
        </Row>
      </Wrapper>
      <Wrapper margin="50px 0px" m_sm="0" right
        customBorderRadius="1.25rem 0 0 1.25rem"
        background={Colors.lightGray}
        border="top"
      >
        <Title
          size="10"
          title={yml.prices.heading}
          paragraph={yml.prices.paragraph}
          paragraphColor={Colors.black}
          variant="primary"
        />
        <PricesAndPayment
          openedLabel={yml.prices.opened_label}
          session={session}
          closedLabel={yml.prices.closed_label}
          type={pageContext.slug}
          lang={pageContext.lang}
          locations={data.allLocationYaml.edges}
        />
      </Wrapper >
      { location && location.documents && location.documents.payment_guidebook && location.documents.payment_guidebook.url && location.documents.payment_guidebook.url != "" &&
        <Wrapper margin="50px 0px">
          <Title
            size="10"
            title={yml.payment_guide.heading}
            paragraph={yml.payment_guide.sub_heading}
            paragraphColor="black"
            variant="primary"
          />
          <Divider height="30px" />
          <Row align="center">
            <Button outline position="relative" width="300px" onClick={() => openGuidebook(location.documents.payment_guidebook.url)} color={Colors.blue}>{yml.payment_guide.button_text}</Button>
          </Row>
        </Wrapper>
      }
      <Wrapper right margin="50px 0px"
        background={Colors.lightGray}
        border="top"
      >
          <Title
            size="10"
            title={yml.ecosystem.heading}
            paragraph={yml.ecosystem.sub_heading}
            paragraphColor="black"
            variant="primary"
          />
        <WhoIsHiring
          margin="50px"
          images={hiring.financials.images}
          footerTagline={hiring.financials.footer_tagline}
          footerLink={hiring.financials.footer_link}
          footerButton={hiring.financials.footer_button}
        />
        <Divider height="150px" />
      </Wrapper>

    </ >
  )
};
export const query = graphql`
  query PricingQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            header_data{
                tagline
                image{
                  childImageSharp {
                    fluid(maxWidth: 1200){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                alt
                sub_heading
            }
            intro{
                image {
                  childImageSharp {
                    fluid(maxHeight: 300, maxWidth: 300){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                    fixed(width: 300, height: 300) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
                image_second {
                  childImageSharp {
                    fluid(maxWidth: 300){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                    fixed(width: 250, height: 250) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
                content
                content_second
                heading_second
                heading
            }
            prices{
                heading
                paragraph
                opened_label
                closed_label
            }
            payment_guide{
                heading
                sub_heading
                button_text
                button_link
                submit_button_text
                submit_button_link
            }
            ecosystem{
                heading
                sub_heading
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
              symbol
              symbol_position
            }
          }
        }
      }
      allLocationYaml(filter: { fields: { lang: {eq: $lang}}}){
        edges {
          
          node {
            id
            city
            country
            hasFinancialsOption
            financials_max_months
            active_campaign_location_slug
            breathecode_location_slug
            fields{
              lang
            }
            meta_info {
              slug
              title
              description
              image
              keywords
              redirects
            }
            header{
              sub_heading
              tagline
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 800){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              } 
            }
            prices {
              full_time {
                center_section {
                  button {
                    button_text
                  }
                  header {
                    sub_heading
                    heading_one
                    heading_two
                  }
                  plans {
                    months
                    payment
                    paymentInfo
                    provider
                    logo
                    message
                  }
                }
                left_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                  }
                  header {
                    heading_one
                    heading_two
                    sub_heading
                  }
                }
                right_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                  }
                  header {
                    sub_heading
                    heading_one
                    heading_two
                  }
                }
              }
              part_time {
                center_section {
                  button {
                    button_text
                  }
                  header {
                    heading_two
                    sub_heading
                    heading_one
                  }
                  plans {
                    months
                    payment
                    paymentInfo
                    provider
                    logo
                    message
                  }
                }
                left_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                  }
                  header {
                    heading_one
                    sub_heading
                    heading_two
                  }
                }
                right_section {
                  button {
                    button_text
                  }
                  content {
                    price
                    price_info
                  }
                  header {
                    heading_one
                    sub_heading
                    heading_two
                  }
                }
              }
            }
            documents{
              payment_guidebook{
                url
              }
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
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              coding {
                images {
                  name
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
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
                      fluid(maxWidth: 100){
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
                      fluid(maxWidth: 200){
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
export default BaseRender(Pricing);